using MediatR;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Products.Entities;

namespace Ramsha.Application.Features.Suppliers.Commands.AddSupplierVariant;

public class AddSupplierVariantCommandHandler(
    ISupplierRepository supplierRepository,
    ISupplierProductRepository supplierProductRepository,
    IUnitOfWork unitOfWork,
    IAuthenticatedUserService authenticatedUserService
) : IRequestHandler<AddSupplierVariantCommand, BaseResult>
{
    public async Task<BaseResult> Handle(AddSupplierVariantCommand request, CancellationToken cancellationToken)
    {
        var supplier = await supplierRepository.GetAsync(x => x.Username == authenticatedUserService.UserName);
        if (supplier is null)
            return new Error(ErrorCode.ErrorInIdentity);

        var newProduct = SupplierProduct.Create(new Domain.Products.ProductId(request.ProductId), supplier.Id);

        newProduct.AddVariant(new Domain.Products.ProductVariantId(request.ProductVariantId));

        await supplierProductRepository.AddAsync(newProduct);

        await unitOfWork.SaveChangesAsync();
        return BaseResult.Ok();

    }
}
