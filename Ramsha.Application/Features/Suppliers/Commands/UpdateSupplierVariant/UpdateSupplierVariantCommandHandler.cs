
using MediatR;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Extensions;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Suppliers.Commands.UpdateSupplierVariant;

public class UpdateSupplierVariantCommandHandler(
ISupplierRepository supplierRepository,
ISupplierProductRepository supplierProductRepository,
IAuthenticatedUserService authenticatedUserService,
IStorageService storageService,
IUnitOfWork unitOfWork
) : IRequestHandler<UpdateSupplierVariantCommand, BaseResult>
{
    public async Task<BaseResult> Handle(UpdateSupplierVariantCommand request, CancellationToken cancellationToken)
    {
        var supplier = await supplierRepository.GetAsync(x => x.Username == authenticatedUserService.UserName);
        if (supplier is null)
        {
            return new Error(ErrorCode.ErrorInIdentity);
        }

        var variant = await supplierProductRepository.GetVariantDetail(
            supplier.Id,
            new Domain.Products.ProductId(request.ProductId),
            new Domain.Products.ProductVariantId(request.VariantId));

        if (variant is null)
        {
            return new Error(ErrorCode.RequestedDataNotExist, "no variant found");
        }

        variant.SetDescription(request.Description);
        if (request.WholesalePrice.HasValue)
        {
            variant.SetPrice(request.WholesalePrice.Value);
        }




        if (request.VariantImagesUrlToRemove.HasItems())
        {
            foreach (var imageUrl in request.VariantImagesUrlToRemove)
            {
                var imageToRemove = variant.GetImageByUrl(imageUrl);
                if (imageToRemove is not null)
                {
                    var isDeleted = await storageService.DeleteFile(imageToRemove.Path);
                    if (!isDeleted)
                        return new Error(ErrorCode.Exception, "we couldn't remove the image file");

                    variant.RemoveImage(imageToRemove);
                }
            }
        }
        var variantImage = request.VariantImagesToAdd;

        if (request.VariantImagesToAdd.HasItems())
        {
            for (var index = 0; index < variantImage.Count; index++)
            {
                variant.AddImage(
                    variantImage[index].Url,
                    variantImage[index].FullPath,
                    index == 0
                );
            }
        }

        await unitOfWork.SaveChangesAsync();

        return BaseResult.Ok();
    }
}