
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Orders;
using Ramsha.Application.Extensions;
using Ramsha.Application.Wrappers;
using MediatR;

namespace Ramsha.Application.Features.Orders.Queries.GetCustomerOrders;

public class GetCustomerOrdersQueryHandler(
    IOrderRepository orderRepository,
    ICustomerRepository customerRepository,
    IAuthenticatedUserService authenticatedUser

) : IRequestHandler<GetCustomerOrdersQuery, BaseResult<List<OrderDto>>>
{
    public async Task<BaseResult<List<OrderDto>>> Handle(GetCustomerOrdersQuery request, CancellationToken cancellationToken)
    {
        var customer = await customerRepository.FindByUsername(authenticatedUser.UserName);
        if (customer is null)
            return new Error(ErrorCode.ErrorInIdentity);


        var orders = await orderRepository.GetAllAsync(x => x.CustomerId == customer.Id);
        return orders.Select(o => o.AsDto()).ToList();
    }
}
