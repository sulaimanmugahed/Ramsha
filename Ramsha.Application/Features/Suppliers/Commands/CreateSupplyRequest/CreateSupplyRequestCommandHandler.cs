using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Suppliers;
using Ramsha.Application.Extensions;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Suppliers.Entities;
using MediatR;

namespace Ramsha.Application.Features.Suppliers.Commands.CreateSupplyRequest;

public class CreateSupplyRequestCommandHandler(
    ISupplyRequestRepository supplyRequestRepository,
    ISupplierRepository supplierRepository,
    IUnitOfWork unitOfWork,
    IAuthenticatedUserService authenticatedUser
)
 : IRequestHandler<CreateSupplyRequestCommand, BaseResult<string?>>
{
    public async Task<BaseResult<string?>> Handle(CreateSupplyRequestCommand request, CancellationToken cancellationToken)
    {
        var supplier = await supplierRepository.FindByUsername(authenticatedUser.UserName);
        if (supplier is null)
            return new Error(ErrorCode.ErrorInIdentity);

        var supplyRequest = SupplyRequest.Create(supplier.Username);


        await supplyRequestRepository.AddAsync(supplyRequest);
        await unitOfWork.SaveChangesAsync();

        return supplyRequest.Id.Value.ToString();
    }
}
