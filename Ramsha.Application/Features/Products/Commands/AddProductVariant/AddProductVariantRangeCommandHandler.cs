using System.Text;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Products;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Products.Entities;
using MediatR;

namespace Ramsha.Application.Features.Products.Commands.AddProductVariant;

public class AddProductVariantRangeCommandHandler(
    IProductRepository productRepository,
    IUnitOfWork unitOfWork,
    IOptionRepository optionRepository,
    ICodeGenerator codeGenerator

) : IRequestHandler<AddProductVariantRangeCommand, BaseResult>
{
    public async Task<BaseResult> Handle(AddProductVariantRangeCommand request, CancellationToken cancellationToken)
    {
        var product = await productRepository.GetProductWithVariantsAndOptions(new Domain.Products.ProductId(request.ProductId));
        if (product is null)
            return new Error(ErrorCode.EmptyData, nameof(request.ProductId));

        // foreach (var variant in request.Variants)
        // {
        //     if (IsVariantExists(product.Variants, variant.VariantValues))
        //         return new Error(ErrorCode.ThisDataAlreadyExist, "this variant is already exist");

        //     var productVariant = ProductVariant.Create(product.Id,
        //         product.Name,
        //         product.Description);

        //     if (!string.IsNullOrEmpty(variant.ImageUrl))
        //         productVariant.SetImage(variant.ImageUrl);


        //     List<string> optionValuesNames = [];

        //     foreach (var variantValue in variant.VariantValues)
        //     {
        //         var option = product.Options.SingleOrDefault(x => x.OptionId.Value == variantValue.Option)?.Option;
        //         if (option is null)
        //         {
        //             option = await optionRepository.GetAsync(o => o.Id == new Domain.Products.OptionId(variantValue.Option), o => o.OptionValues);
        //             if (option is null)
        //                 return new Error(ErrorCode.RequestedDataNotExist, "invalid option", nameof(variant.VariantValues));
        //             product.AddOption(option);
        //         }

        //         var value = option?.OptionValues.SingleOrDefault(v => v.Id.Value == variantValue.Value);
        //         if (value is null)
        //             return new Error(ErrorCode.EmptyData, "invalid option value", nameof(variant.VariantValues));

        //         optionValuesNames.Add(value.Name);
        //         productVariant.AddValue(option.Id, value.Id);
        //     }



        //     productVariant.SetCode(codeGenerator.GenerateVariantCode(product.Code, optionValuesNames));

        //     product.AddVariant(productVariant);

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
