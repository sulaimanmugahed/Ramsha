using MediatR;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Orders.Commands.DeliverFulfillmentRequest;

public class DeliverFulfillmentRequestCommandHandler(
    IFulfillmentRequestRepository fulfillmentRequestRepository
) : IRequestHandler<DeliverFulfillmentRequestCommand, BaseResult>
{
    public async Task<BaseResult> Handle(DeliverFulfillmentRequestCommand request, CancellationToken cancellationToken)
    {
        var fulfillmentRequest = await fulfillmentRequestRepository.GetByIdAsync(new Domain.Orders.FulfillmentRequestId(request.FulfillmentRequestId));
        if (fulfillmentRequest is null)
            return new Error(ErrorCode.RequestedDataNotExist, "no fulfillmentRequest found");

        fulfillmentRequest.SetStatus(Domain.Orders.Enums.FulfillmentRequestStatus.Delivered);
        return BaseResult.Ok();
    }
}
