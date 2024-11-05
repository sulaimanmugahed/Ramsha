
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Ramsha.Application.Dtos.Orders;
using Ramsha.Application.Features.Orders.Commands.CreateOrder;
using Ramsha.Application.Features.Orders.Queries.GetCustomerOrders;
using Ramsha.Application.Features.Orders.Queries.GetOrderDetail;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Constants;

namespace Ramsha.Api.Controllers.v1;

[ApiVersion("1.0")]
[Authorize(Roles = Roles.Customer)]
public class OrdersController : BaseApiController
{
    [HttpPost]
    public async Task<BaseResult<string>> Create(CreateOrderCommand createOrderCommand)
    => await Mediator.Send(createOrderCommand);

    [HttpGet]
    public async Task<BaseResult<List<OrderDto>>> GetMyOrders()
    => await Mediator.Send(new GetCustomerOrdersQuery());

    [HttpGet("{orderId}/detail")]
    public async Task<BaseResult<OrderDetailDto?>> GetOrderDetail(Guid orderId)
    => await Mediator.Send(new GetOrderDetailQuery { OrderId = orderId });
}
