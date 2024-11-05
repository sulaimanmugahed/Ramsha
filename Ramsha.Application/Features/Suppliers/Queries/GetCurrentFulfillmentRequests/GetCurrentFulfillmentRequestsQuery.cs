using MediatR;
using Ramsha.Application.Dtos.Suppliers;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Suppliers.Queries.GetCurrentSupplierFulfillmentRequests;

public class GetCurrentSupplierFulfillmentRequestsQuery : IRequest<BaseResult<List<FulfillmentRequestDto>>>
{

}
