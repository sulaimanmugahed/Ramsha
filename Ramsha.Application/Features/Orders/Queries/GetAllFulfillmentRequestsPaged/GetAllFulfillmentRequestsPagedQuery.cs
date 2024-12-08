using MediatR;
using Ramsha.Application.Dtos.Orders;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Orders.Queries.GetAllFulfillmentRequestsPaged;

public class GetAllFulfillmentRequestsPagedQuery : PagedParams, IRequest<BaseResult<List<FulfillmentRequestDto>>>
{

}
