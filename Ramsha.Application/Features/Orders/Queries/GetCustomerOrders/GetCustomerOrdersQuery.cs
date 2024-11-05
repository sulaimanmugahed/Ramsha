using Ramsha.Application.Dtos.Orders;
using Ramsha.Application.Wrappers;
using MediatR;

namespace Ramsha.Application.Features.Orders.Queries.GetCustomerOrders;

public class GetCustomerOrdersQuery : IRequest<BaseResult<List<OrderDto>>>
{

}
