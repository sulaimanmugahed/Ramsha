using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Baskets;
using Ramsha.Application.Features.Payments.Commands.CreateOrUpdatePaymentIntent;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Constants;
using Ramsha.Domain.Orders.Enums;
using Ramsha.Domain.Settings;
using Stripe;

namespace Ramsha.Api.Controllers.v1;

/// <summary>
/// Manages payment-related operations.
/// </summary>
[ApiVersion("1.0")]
[Authorize(Roles = Roles.Customer)]
public class PaymentsController(IOptionsSnapshot<StripeSettings> settings, IOrderRepository orderRepository, IUnitOfWork unitOfWork) : BaseApiController
{
    /// <summary>
    /// Creates or updates a payment intent.
    /// </summary>
    /// <remarks>
    /// This endpoint creates or updates a payment intent for the current user's basket.
    /// </remarks>
    [HttpPost]
    public async Task<BaseResult<BasketDto>> CreateOrUpdatePaymentIntent(CreateOrUpdatePaymentIntentCommand command)
        => await Mediator.Send(command);

    /// <summary>
    /// Handles Stripe webhook events.
    /// </summary>
    /// <remarks>
    /// This endpoint processes Stripe webhook events, such as payment success, to update the order status.
    /// It is publicly accessible and should only be called by Stripe.
    /// </remarks>
    [AllowAnonymous]
    [HttpPost("webhook")]
    public async Task<ActionResult> StripeWebhook()
    {
        var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
        var stripeEvent = EventUtility.ConstructEvent(
            json,
            Request.Headers["Stripe-Signature"],
            settings.Value.WhSecretKey,
            throwOnApiVersionMismatch: false
        );

        var charge = (Charge)stripeEvent.Data.Object;

        var order = await orderRepository.GetAsync(x => x.PaymentIntentId == charge.PaymentIntentId, x => x.FulfillmentRequests);

        if (order is not null && charge.Status == "succeeded")
            order.ConfirmPaymentReceived();

        await unitOfWork.SaveChangesAsync();
        return new EmptyResult();
    }
}