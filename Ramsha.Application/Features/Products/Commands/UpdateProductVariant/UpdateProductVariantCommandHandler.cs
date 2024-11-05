using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Extensions;
using Ramsha.Application.Wrappers;
using MediatR;

namespace Ramsha.Application.Features.Products.Commands.UpdateProductVariant;

public class UpdateProductVariantCommandHandler(
    IProductRepository productRepository,
    IOptionRepository optionRepository,
    IVariantService variantService,
    IStorageService storageService,
    IUnitOfWork unitOfWork
) : IRequestHandler<UpdateProductVariantCommand, BaseResult>
{
    public async Task<BaseResult> Handle(UpdateProductVariantCommand request, CancellationToken cancellationToken)
    {
        var product = await productRepository.GetProductWithVariantsAndOptions(new Domain.Products.ProductId(request.ProductId));
        if (product is null)
            return new Error(ErrorCode.EmptyData, nameof(request.ProductId));

        var variant = product.Variants.SingleOrDefault(v => v.Id.Value == request.VariantId);
        if (variant is null)
            return new Error(ErrorCode.EmptyData, nameof(request.VariantId));


        if (variant is null)
            return new Error(ErrorCode.RequestedDataNotExist);

        if (request.VariantValuesToRemove.HasItems())
        {
            foreach (var variantValue in request.VariantValuesToRemove)
            {
                variant.RemoveValue(new Domain.Products.OptionId(variantValue.Option)
                , new Domain.Products.OptionValueId(variantValue.Value));
            }
        }


        if (request.VariantValuesToAdd.HasItems())
        {
            if (variantService.IsVariantExists(product.Variants, request.VariantValuesToAdd))
                return new Error(ErrorCode.ThisDataAlreadyExist, "this variant is already exist");

            foreach (var variantValue in request.VariantValuesToAdd)
            {
                var option = product.Options.SingleOrDefault(x => x.OptionId.Value == variantValue.Option)?.Option;
                option ??= await optionRepository.GetAsync(o => o.Id == new Domain.Products.OptionId(variantValue.Option),
                o => o.OptionValues);

                var value = option?.OptionValues.SingleOrDefault(v => v.Id.Value == variantValue.Value);
                if (option is null || value is null)
                    return new Error(ErrorCode.EmptyData, nameof(request.VariantValuesToAdd));

                variant.AddValue(option.Id, value.Id);
            }
        }

        // variant.SetSKU(variantService.GenerateSKU(product.Name,))
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
