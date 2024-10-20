using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Suppliers.Commands.RemoveSupplyRequestItem;

public class RemoveSupplyRequestItemCommandHandler(
    ISupplyRequestRepository supplyRequestRepository,
    IAuthenticatedUserService authenticatedUserService,
    IUnitOfWork unitOfWork
) : IRequestHandler<RemoveSupplyRequestItemCommand, BaseResult>
{
    public async Task<BaseResult> Handle(RemoveSupplyRequestItemCommand request, CancellationToken cancellationToken)
    {
        var supplyRequest = await supplyRequestRepository
       .GetWithDetails(x => x.Supplier == authenticatedUserService.UserName);

        if (supplyRequest is null)
            return new Error(ErrorCode.RequestedDataNotExist, "no supplyRequest exist");

        supplyRequest.RemoveItem(new Domain.Suppliers.SupplyRequestItemId(request.SupplyRequestItemId));

        await unitOfWork.SaveChangesAsync();

        return BaseResult.Ok();
    }
}

