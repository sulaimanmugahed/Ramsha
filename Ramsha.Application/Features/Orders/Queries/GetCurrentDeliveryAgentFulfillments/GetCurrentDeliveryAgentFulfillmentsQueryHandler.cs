
using MediatR;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Orders;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Orders.Queries.GetCurrentDeliveryAgentFulfillments;

public class GetCurrentDeliveryAgentFulfillmentsQueryHandler(
    IDeliveryAgentRepository deliveryAgentRepository,
    IAuthenticatedUserService authenticatedUserService,
    IFulfillmentRequestRepository fulfillmentRequestRepository,
    IHttpService httpService
) : IRequestHandler<GetCurrentDeliveryAgentFulfillmentsQuery, BaseResult<List<FulfillmentRequestDto>>>
{
    public async Task<BaseResult<List<FulfillmentRequestDto>>> Handle(GetCurrentDeliveryAgentFulfillmentsQuery request, CancellationToken cancellationToken)
    {
        var agent = await deliveryAgentRepository.GetAsync(x => x.Username == authenticatedUserService.UserName);
        if (agent is null)
            return new Error(ErrorCode.ErrorInIdentity);

        var responseDto = await fulfillmentRequestRepository.GetPaged(request.PaginationParams, request.FilterParams, request.SortingParams, x => x.DeliveryAgentId == agent.Id);

        responseDto.AddFilterMetaData(request.FilterParams);
        responseDto.AddSortingMetaData(request.SortingParams);

        httpService.AddPagedHeader(responseDto.MetaData);

        return responseDto.Data;
    }
}
