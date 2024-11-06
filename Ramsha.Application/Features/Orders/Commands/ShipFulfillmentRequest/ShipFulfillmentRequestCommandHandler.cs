

using MediatR;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Orders.Commands.ShipFulfillmentRequest;

public class ShipFulfillmentRequestCommandHandler(
    IFulfillmentRequestRepository fulfillmentRequestRepository
) : IRequestHandler<ShipFulfillmentRequestCommand, BaseResult>
{
    public async Task<BaseResult> Handle(ShipFulfillmentRequestCommand request, CancellationToken cancellationToken)
    {
        var fulfillmentRequest = await fulfillmentRequestRepository.GetByIdAsync(new Domain.Orders.FulfillmentRequestId(request.FulfillmentRequestId));
        if (fulfillmentRequest is null)
            return new Error(ErrorCode.RequestedDataNotExist, "no fulfillmentRequest found");

        fulfillmentRequest.SetStatus(Domain.Orders.Enums.FulfillmentRequestStatus.Shipped);
        return BaseResult.Ok();
    }
}
