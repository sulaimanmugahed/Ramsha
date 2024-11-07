using MediatR;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Orders.Commands.DeliverFulfillmentRequest;

public class DeliverFulfillmentRequestCommandHandler(
    IOrderRepository orderRepository,
    IUnitOfWork unitOfWork
) : IRequestHandler<DeliverFulfillmentRequestCommand, BaseResult>
{
    public async Task<BaseResult> Handle(DeliverFulfillmentRequestCommand request, CancellationToken cancellationToken)
    {
        var order = await orderRepository.GetAsync(x => x.Id == new Domain.Orders.OrderId(request.OrderId)
       , x => x.FulfillmentRequests);

        if (order is null)
            return new Error(ErrorCode.RequestedDataNotExist, "no order found");

        if (order is null)
            return new Error(ErrorCode.RequestedDataNotExist, "no fulfillmentRequest found");

        order.ShipFulfillmentRequest(new Domain.Orders.FulfillmentRequestId(request.FulfillmentRequestId));

        await unitOfWork.SaveChangesAsync();
        return BaseResult.Ok();
    }
}
