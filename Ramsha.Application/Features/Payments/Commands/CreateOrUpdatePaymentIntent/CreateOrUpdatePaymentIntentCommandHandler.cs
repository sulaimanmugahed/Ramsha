using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Identity.UserInterfaces;
using Ramsha.Application.Contracts.Payment;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Baskets;
using Ramsha.Application.Extensions;
using Ramsha.Application.Services;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Payments.Commands.CreateOrUpdatePaymentIntent;

public class CreateOrUpdatePaymentIntentCommandHandler(
    BasketService basketService,
    IBasketRepository basketRepository,
    IAuthenticatedUserService authenticatedUserService,
    IUserService userService,
    IPaymentService paymentService,
    IUnitOfWork unitOfWork

) : IRequestHandler<CreateOrUpdatePaymentIntentCommand, BaseResult<BasketDto>>
{
    public async Task<BaseResult<BasketDto>> Handle(CreateOrUpdatePaymentIntentCommand request, CancellationToken cancellationToken)
    {
        var customerAddress = await userService.GetUserAddress(authenticatedUserService.UserName);
        if (customerAddress is null)
            return new Error(ErrorCode.EmptyData, "no customer Address found");

        var basket = await basketRepository.GetDetail(authenticatedUserService.UserName);

        if (basket is null)
            return new Error(ErrorCode.EmptyData, "no basket found");

        var subtotal = basket.Items.Sum(item => item.Quantity * item.InventoryItem.FinalPrice.Amount);

        var deliveryFee = await basketService.CalculateTotalDeliveryFees(basket, customerAddress);

        var finalPrice = subtotal + deliveryFee;

        var intentResponse = await paymentService.CreateOrUpdatePaymentIntent(basket.PaymentIntentId, finalPrice);

        if (intentResponse is null)
            return new Error(ErrorCode.EmptyData, "error while update the payment");


        basket.PaymentIntentId ??= intentResponse.PaymentIntentId;
        basket.ClientSecret ??= intentResponse.ClientSecret;

        await unitOfWork.SaveChangesAsync();

        return basket.ToDto();
    }
}
