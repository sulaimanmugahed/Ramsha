using MediatR;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Products.Entities;

namespace Ramsha.Application.Features.Suppliers.Commands.AddSupplierProduct;

public class AddSupplierProductCommandHandler(
    ISupplierRepository supplierRepository,
    IUnitOfWork unitOfWork,
    ISupplierProductRepository supplierProductRepository,
    IProductRepository productRepository,
    IAuthenticatedUserService authenticatedUserService,
    ICodeGenerator codeGenerator

) : IRequestHandler<AddSupplierProductCommand, BaseResult>
{
    public async Task<BaseResult> Handle(AddSupplierProductCommand request, CancellationToken cancellationToken)
    {
        var productId = new Domain.Products.ProductId(request.ProductId);
        var supplier = await supplierRepository.GetAsync(x => x.Username == authenticatedUserService.UserName);
        if (supplier is null)
            return new Error(ErrorCode.ErrorInIdentity);

        var product = await productRepository.GetByIdAsync(productId);

        if (product is null)
        {
            return new Error(ErrorCode.RequestedDataNotExist, "invalid product id");
        }

        var supplierProduct = SupplierProduct.Create(product.Id, supplier.Id);

        supplierProduct.SetCode(codeGenerator.GenerateSupplierProductCode(supplier.Username, product.Code));

        await supplierProductRepository.AddAsync(supplierProduct);

        await unitOfWork.SaveChangesAsync();
        return BaseResult.Ok();

    }
}
