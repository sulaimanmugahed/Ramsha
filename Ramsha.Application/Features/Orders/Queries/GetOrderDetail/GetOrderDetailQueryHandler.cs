
using MediatR;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Orders;
using Ramsha.Application.Extensions;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Orders.Queries.GetOrderDetail;

public class GetOrderDetailQueryHandler(
    IOrderRepository orderRepository
) : IRequestHandler<GetOrderDetailQuery, BaseResult<OrderDetailDto?>>
{
    public async Task<BaseResult<OrderDetailDto?>> Handle(GetOrderDetailQuery request, CancellationToken cancellationToken)
    {
        var order = await orderRepository.GetAsync(
            x => x.Id == new Domain.Orders.OrderId(request.OrderId),
            x => x.ShippingAddress, X => X.FulfillmentRequests);

        return order?.AsDetailDto();
    }
}
