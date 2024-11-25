using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Orders;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Orders.Queries.GetOrdersPaged;

public class GetOrdersPagedQueryHandler(
    IOrderRepository orderRepository,
    IHttpService httpService
) : IRequestHandler<GetOrdersPagedQuery, BaseResult<List<OrderDto>>>
{
    public async Task<BaseResult<List<OrderDto>>> Handle(GetOrdersPagedQuery request, CancellationToken cancellationToken)
    {
        var response = await orderRepository.GetPaged(request);
        response.AddFilterMetaData(request.FilterParams);
        response.AddSortingMetaData(request.SortingParams);

        httpService.AddPagedHeader(response.MetaData);

        return response.Data;
    }
}
