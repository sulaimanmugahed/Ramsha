using MediatR;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Suppliers.Commands.UpdateSupplyRequestItem;

public class UpdateSupplyRequestItemCommandHandler(
ISupplyRequestRepository supplyRequestRepository,
IAuthenticatedUserService authenticatedUserService,
IUnitOfWork unitOfWork

) : IRequestHandler<UpdateSupplyRequestItemCommand, BaseResult>
{
    public async Task<BaseResult> Handle(UpdateSupplyRequestItemCommand request, CancellationToken cancellationToken)
    {
        var supplyRequest = await supplyRequestRepository
        .GetWithDetails(x => x.Supplier == authenticatedUserService.UserName);

        if (supplyRequest is null)
            return new Error(ErrorCode.RequestedDataNotExist, "no supplyRequest exist");

        var item = supplyRequest.Items.FirstOrDefault(x => x.Id.Value == request.SupplyRequestItemId);
        if (item is null)
            return new Error(ErrorCode.RequestedDataNotExist, "no item exist", nameof(request.SupplyRequestItemId));

        item.SetQuantity(request.Quantity);

        await unitOfWork.SaveChangesAsync();

        return BaseResult.Ok();
    }
}
