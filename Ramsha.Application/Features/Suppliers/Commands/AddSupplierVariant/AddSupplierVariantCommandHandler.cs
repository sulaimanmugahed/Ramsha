using MediatR;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Extensions;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Products;
using Ramsha.Domain.Products.Entities;
using Ramsha.Domain.Suppliers.Entities;

namespace Ramsha.Application.Features.Suppliers.Commands.AddSupplierVariant;

public class AddSupplierVariantCommandHandler(
    IVariantRepository variantRepository,
    ISupplierProductRepository supplierProductRepository,
    ISupplierRepository supplierRepository,
    IAuthenticatedUserService authenticatedUserService,
    IUnitOfWork unitOfWork,
    ICodeGenerator codeGenerator
) : IRequestHandler<AddSupplierVariantCommand, BaseResult>
{
    public async Task<BaseResult> Handle(AddSupplierVariantCommand request, CancellationToken cancellationToken)
    {
        var productId = new ProductId(request.ProductId);
        var variantId = new ProductVariantId(request.ProductVariantId);

        var supplier = await supplierRepository.GetAsync(x => x.Username == authenticatedUserService.UserName);
        if (supplier is null)
            return new Error(ErrorCode.ErrorInIdentity);

        var variant = await variantRepository
        .GetAsync(x => x.Id == variantId && x.ProductId == productId, x => x.Product);

        if (variant is null)
        {
            return new Error(ErrorCode.RequestedDataNotExist, "no variant exist");
        }
        var existVariant = await supplierProductRepository.GetVariant(
            supplier.Id,
            productId,
            variantId
        );

        if (existVariant is not null)
        {
            return new Error(ErrorCode.ThisDataAlreadyExist, "the variant already exist");
        }

        var supplierProduct = await supplierProductRepository.GetAsync(x => x.ProductId == productId && x.SupplierId == supplier.Id);

        if (supplierProduct is null)
        {
            supplierProduct = SupplierProduct.Create(productId, supplier.Id);
            supplierProduct.SetCode(codeGenerator.GenerateSupplierProductCode(supplier.Username, variant.Product.Code));
            await supplierProductRepository.AddAsync(supplierProduct);
            await unitOfWork.SaveChangesAsync();
        }

        var supplierVariant = SupplierVariant.Create(supplier.Id, productId, variantId);

        supplierVariant.SetDescription(request.Description);
        supplierVariant.SetPrice(request.WholesalePrice);

        supplierVariant.SetCode(codeGenerator.GenerateSupplierVariantCode(supplier.Username, variant.Code));

        var variantImage = request.VariantImagesToAdd;

        if (request.VariantImagesToAdd.HasItems())
        {
            for (var index = 0; index < variantImage.Count; index++)
            {
                supplierVariant.AddImage(
                    variantImage[index].Url,
                    variantImage[index].FullPath,
                    index == 0
                );
            }
        }

        supplierProduct.AddVariant(supplierVariant);

        await unitOfWork.SaveChangesAsync();

        return BaseResult.Ok();
    }

}
