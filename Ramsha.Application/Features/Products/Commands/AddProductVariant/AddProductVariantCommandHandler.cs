
using System.Text;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Products;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Products.Entities;
using MediatR;

namespace Ramsha.Application.Features.Products.Commands.AddProductVariant;

public class AddProductVariantCommandHandler(
    IProductRepository productRepository,
    IUnitOfWork unitOfWork,
    IStorageService storageService,
    IOptionRepository optionRepository
) : IRequestHandler<AddProductVariantCommand, BaseResult>
{
    public async Task<BaseResult> Handle(AddProductVariantCommand request, CancellationToken cancellationToken)
    {
        var product = await productRepository.GetProductWithVariantsAndOptions(new Domain.Products.ProductId(request.ProductId));
        if (product is null)
            return new Error(ErrorCode.EmptyData, nameof(request.ProductId));


        if (IsVariantExists(product.Variants, request.VariantValues))
            return new Error(ErrorCode.ThisDataAlreadyExist, "this variant is already exist");

        var productVariant = ProductVariant.Create(product.Id,
                 request.Name ?? product.Name,
                  request.Description ?? product.Description);

        if (request.BasePrice.HasValue)
            productVariant.SetBasePrice(request.BasePrice.Value);

        List<string> optionValuesNames = [];

        foreach (var variantValue in request.VariantValues)
        {
            var option = product.Options.SingleOrDefault(x => x.OptionId.Value == variantValue.Option)?.Option;
            option ??= await optionRepository.GetAsync(o => o.Id == new Domain.Products.OptionId(variantValue.Option),
            o => o.OptionValues);

            var value = option?.OptionValues.SingleOrDefault(v => v.Id.Value == variantValue.Value);
            if (option is null || value is null)
                return new Error(ErrorCode.EmptyData, nameof(request.VariantValues));

            optionValuesNames.Add(value.Name);
            productVariant.AddValue(option.Id, value.Id);
        }

        var sku = GenerateSKU(product.Name, optionValuesNames);

        productVariant.SetSKU(sku);

        var variantImage = request.VariantImages;


        if (variantImage is not null && variantImage.Count > 0)
        {
            for (var index = 0; index < variantImage.Count; index++)
            {
                productVariant.AddImage(
                    variantImage[index].Url,
                    variantImage[index].FullPath,
                    index == 0
                );
            }
        }

        product.AddVariant(productVariant);





        // var images = request.Images;

        // if (images is not null)
        // {
        //     for (var index = 0; index < images.Count; index++)
        //     {
        //         var imagePath = await storageService.UploadFile(
        //          images[index],
        //          ApplicationFoldersNames.ProductImagesFolderName + $"/{sku}");
        //         if (imagePath is null)
        //             return new Error(ErrorCode.Exception);

        //         var imageUrl = storageService.GetImageUrl(imagePath);

        //         productVariant.AddImage(
        //             imageUrl,
        //             imagePath,
        //             index == 0
        //         );
        //     }
        // }

        await unitOfWork.SaveChangesAsync();

        return BaseResult.Ok();
    }

    private string GenerateSKU(string productCode, List<string> optionValuesNames)
    {
        var sku = new StringBuilder(productCode.Trim());

        foreach (var valueName in optionValuesNames)
        {
            char letter = valueName.First();
            sku.Append($"-{letter}");
        }

        return sku.ToString().ToUpper();
    }


    private bool IsVariantExists(List<ProductVariant> existingVariants, List<VariantValuesCommand> variantValues)
    {

        foreach (var variant in existingVariants)
        
        {
            if (variant.VariantValues.Count != variantValues.Count)
                continue;

            bool allValuesMatch = variant.VariantValues.All(vv =>
                variantValues.Any(nvv => nvv.Option == vv.OptionId.Value && nvv.Value == vv.OptionValueId.Value)
            );

            if (allValuesMatch)
                return true;
        }

        return false;
    }
}
