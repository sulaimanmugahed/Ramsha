using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Ramsha.Application.Dtos.Orders;
using Ramsha.Application.Features.Orders.Commands.CreateOrder;
using Ramsha.Application.Features.Orders.Commands.DeliverFulfillmentRequest;
using Ramsha.Application.Features.Orders.Commands.ShipFulfillmentRequest;
using Ramsha.Application.Features.Orders.Queries.GetAllFulfillmentRequestsPaged;
using Ramsha.Application.Features.Orders.Queries.GetCurrentDeliveryAgentFulfillments;
using Ramsha.Application.Features.Orders.Queries.GetCurrentSupplierFulfillmentRequests;
using Ramsha.Application.Features.Orders.Queries.GetCustomerOrders;
using Ramsha.Application.Features.Orders.Queries.GetFulfillmentRequestDetail;
using Ramsha.Application.Features.Orders.Queries.GetOrderDetail;
using Ramsha.Application.Features.Orders.Queries.GetOrdersPaged;
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

  [HttpGet("my-orders")]
  public async Task<BaseResult<List<OrderDto>>> GetMyOrders()
  => await Mediator.Send(new GetCustomerOrdersQuery());

  [HttpPost("paged")]
  public async Task<BaseResult<List<OrderDto>>> GetPaged(GetOrdersPagedQuery query)
=> await Mediator.Send(query);

  [HttpGet("{orderId}/detail")]
  public async Task<BaseResult<OrderDetailDto?>> GetOrderDetail(Guid orderId)
  => await Mediator.Send(new GetOrderDetailQuery { OrderId = orderId });


  [Authorize(Roles = Roles.Supplier)]
  [HttpPost("supplier-fulfillment-requests/paged")]
  public async Task<BaseResult<List<FulfillmentRequestDto>>> GetSupplierFulfillments(GetCurrentSupplierFulfillmentRequestsQuery query)
  => await Mediator.Send(query);

  [Authorize(Roles = Roles.DeliveryAgent)]
  [HttpPost("deliveryAgent-fulfillment-requests/paged")]
  public async Task<BaseResult<List<FulfillmentRequestDto>>> GetDeliveryAgentFulfillments(GetCurrentDeliveryAgentFulfillmentsQuery query)
=> await Mediator.Send(query);

  [Authorize]
  [HttpPost("fulfillment-requests/paged")]
  public async Task<BaseResult<List<FulfillmentRequestDto>>> GetAllFulfillments(GetAllFulfillmentRequestsPagedQuery query)
 => await Mediator.Send(query);


  [HttpGet("fulfillment-requests/{id}/detail")]
  public async Task<BaseResult<FulfillmentRequestDetailDto?>> FulfillDetail(Guid id)
  => await Mediator.Send(new GetFulfillmentRequestDetailQuery { Id = id });

  [Authorize(Roles = Roles.SuperAdmin)]
  [HttpPost("{orderId}/fulfillment-requests/{fulfillmentId}/ship")]
  public async Task<BaseResult> ShipRequest(Guid orderId, Guid fulfillmentId, [FromQuery] Guid deliveryAgentId)
 => await Mediator.Send(new ShipFulfillmentRequestCommand { OrderId = orderId, FulfillmentRequestId = fulfillmentId, DeliveryAgentId = deliveryAgentId });

  [HttpPost("{orderId}/fulfillment-requests/{fulfillmentId}/deliver")]
  public async Task<BaseResult> DeliverRequest(Guid orderId, Guid fulfillmentId)
  => await Mediator.Send(new DeliverFulfillmentRequestCommand { OrderId = orderId, FulfillmentRequestId = fulfillmentId });

}
