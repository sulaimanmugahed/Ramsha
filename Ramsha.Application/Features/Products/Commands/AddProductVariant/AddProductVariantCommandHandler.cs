
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
    IOptionRepository optionRepository,
    IVariantService variantService,
    ICodeGenerator codeGenerator

) : IRequestHandler<AddProductVariantCommand, BaseResult>
{
    public async Task<BaseResult> Handle(AddProductVariantCommand request, CancellationToken cancellationToken)
    {
        var product = await productRepository.GetProductWithVariantsAndOptions(new Domain.Products.ProductId(request.ProductId));
        if (product is null)
            return new Error(ErrorCode.EmptyData, nameof(request.ProductId));


        if (variantService.IsVariantExists(product.Variants, request.VariantValues))
            return new Error(ErrorCode.ThisDataAlreadyExist, "this variant is already exist");

        var productVariant = ProductVariant.Create(product.Id,
                product.Name,
                product.Description);

        if (!string.IsNullOrEmpty(request.ImageUrl))
            productVariant.SetImage(request.ImageUrl);


        List<string> optionValuesNames = [];

        foreach (var variantValue in request.VariantValues)
        {
            var option = product.Options.SingleOrDefault(x => x.OptionId.Value == variantValue.Option)?.Option;
            if (option is null)
            {
                option = await optionRepository.GetAsync(o => o.Id == new Domain.Products.OptionId(variantValue.Option), o => o.OptionValues);
                if (option is null)
                    return new Error(ErrorCode.RequestedDataNotExist, "invalid option", nameof(request.VariantValues));
                product.AddOption(option);
            }

            var value = option?.OptionValues.SingleOrDefault(v => v.Id.Value == variantValue.Value);
            if (value is null)
                return new Error(ErrorCode.EmptyData, "invalid option value", nameof(request.VariantValues));

            optionValuesNames.Add(value.Name);
            productVariant.AddValue(option.Id, value.Id);
        }

        productVariant.SetCode(codeGenerator.GenerateVariantCode(product.Code, optionValuesNames));


        product.AddVariant(productVariant);

        await unitOfWork.SaveChangesAsync();

        return BaseResult.Ok();
    }
}
