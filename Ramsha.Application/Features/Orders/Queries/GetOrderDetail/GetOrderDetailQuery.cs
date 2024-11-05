using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Dtos.Orders;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Orders.Queries.GetOrderDetail;

public class GetOrderDetailQuery : IRequest<BaseResult<OrderDetailDto?>>
{
    public Guid OrderId { get; set; }
}
