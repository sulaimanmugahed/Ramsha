using MediatR;
using Ramsha.Application.Dtos.Orders;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Orders.Queries.GetCurrentSupplierFulfillmentRequests;

public class GetCurrentSupplierFulfillmentRequestsQuery : PagedParams, IRequest<BaseResult<List<FulfillmentRequestDto>>>
{

}
