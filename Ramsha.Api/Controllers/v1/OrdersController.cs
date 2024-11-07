using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Ramsha.Application.Dtos.Orders;
using Ramsha.Application.Features.Orders.Commands.CreateOrder;
using Ramsha.Application.Features.Orders.Commands.DeliverFulfillmentRequest;
using Ramsha.Application.Features.Orders.Commands.ShipFulfillmentRequest;
using Ramsha.Application.Features.Orders.Queries.GetCurrentSupplierFulfillmentRequests;
using Ramsha.Application.Features.Orders.Queries.GetCustomerOrders;
using Ramsha.Application.Features.Orders.Queries.GetFulfillmentRequestDetail;
using Ramsha.Application.Features.Orders.Queries.GetOrderDetail;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Constants;

namespace Ramsha.Api.Controllers.v1;

[ApiVersion("1.0"), Authorize]
public class OrdersController : BaseApiController
{
    [Authorize(Roles = Roles.Customer)]
    [HttpPost]
    public async Task<BaseResult<string>> Create(CreateOrderCommand createOrderCommand)
        => await Mediator.Send(createOrderCommand);

    [HttpGet]
    public async Task<BaseResult<List<OrderDto>>> GetMyOrders()
    => await Mediator.Send(new GetCustomerOrdersQuery());

    [HttpGet("{orderId}/detail")]
    public async Task<BaseResult<OrderDetailDto?>> GetOrderDetail(Guid orderId)
    => await Mediator.Send(new GetOrderDetailQuery { OrderId = orderId });


    [Authorize(Roles = Roles.Supplier)]
    [HttpPost("supplier-fulfillment-requests/paged")]
    public async Task<BaseResult<List<FulfillmentRequestDto>>> Getfulfillments(GetCurrentSupplierFulfillmentRequestsQuery query)
    => await Mediator.Send(query);


    [HttpGet("fulfillment-requests/{id}/detail")]
    public async Task<BaseResult<FulfillmentRequestDetailDto?>> FulfillDetail(Guid id)
    => await Mediator.Send(new GetFulfillmentRequestDetailQuery { Id = id });

    [Authorize(Roles = Roles.Supplier)]
    [HttpPost("{orderId}/fulfillment-requests/{fulfillmentId}/ship")]
    public async Task<BaseResult> ShipRequest(Guid orderId, Guid fulfillmentId)
   => await Mediator.Send(new ShipFulfillmentRequestCommand { OrderId = orderId, FulfillmentRequestId = fulfillmentId });

    [HttpPost("{orderId}/fulfillment-requests/{fulfillmentId}/deliver")]
    public async Task<BaseResult> DeliverRequest(Guid orderId, Guid fulfillmentId)
    => await Mediator.Send(new DeliverFulfillmentRequestCommand { OrderId = orderId, FulfillmentRequestId = fulfillmentId });

}
