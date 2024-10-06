

using Ramsha.Application.Constants;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Products;
using Ramsha.Application.Extensions;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Products.Entities;
using MediatR;

namespace Ramsha.Application.Features.Products.Commands.CreateProduct;

public class CreateProductCommandHandler(
    ICategoryRepository categoryRepository,
    IProductRepository productRepository,
    ITagRepository tagRepository,
    IBrandRepository brandRepository,
    IVariantService variantService,
    IOptionRepository optionRepository,
    IUnitOfWork unitOfWork
) : IRequestHandler<CreateProductCommand, BaseResult<string?>>
{
    public async Task<BaseResult<string?>> Handle(CreateProductCommand request, CancellationToken cancellationToken)
    {
        var product = Product.Create(request.Name, request.Description);

        var category = await categoryRepository.GetByIdAsync(new Domain.Products.CategoryId(request.Category));
        if (category is null)
            return new Error(ErrorCode.EmptyData);

        product.SetCategory(category.Id);

        var brand = await brandRepository.GetByIdAsync(new Domain.Products.BrandId(request.Brand));
        if (brand is null)
            return new Error(ErrorCode.EmptyData);

        product.SetBrand(brand.Id);


        if (!string.IsNullOrEmpty(request.ImageUrl))
            product.SetImage(request.ImageUrl);

        if (request.Tags.HasItems())
        {
            foreach (var tag in request.Tags)
            {
                var existTag = await tagRepository.GetAsync(x => x.Name.ToLower() == tag.ToLower());
                if (existTag is null)
                {
                    existTag = Tag.Create(tag);
                    await tagRepository.AddAsync(existTag);
                    await unitOfWork.SaveChangesAsync();
                }
                product.AddTag(existTag);
            }
        }

        if (request.SeoSettings is not null)
        {
            product.SetSeoSettings(request.SeoSettings);
        }

        if (request.Variants.HasItems())
        {
            foreach (var variant in request.Variants)
            {
                var IsVariantExists = variantService.IsVariantExists(product.Variants, variant.VariantValues);
                if (IsVariantExists)
                    return new Error(ErrorCode.ThisDataAlreadyExist, "this variant is already exist");

                var productVariant = ProductVariant.Create(product.Id,
                 variant.Name ?? product.Name,
                  variant.Description ?? product.Description);

                if (variant.BasePrice.HasValue)
                    productVariant.SetBasePrice(variant.BasePrice.Value);

                List<string> optionValuesNames = [];

                foreach (var variantValue in variant.VariantValues)
                {
                    var option = product.Options.SingleOrDefault(x => x.OptionId.Value == variantValue.Option)?.Option;
                    option ??= await optionRepository.GetAsync(o => o.Id == new Domain.Products.OptionId(variantValue.Option),
                    o => o.OptionValues);

                    var value = option?.OptionValues.SingleOrDefault(v => v.Id.Value == variantValue.Value);
                    if (option is null || value is null)
                        return new Error(ErrorCode.EmptyData, nameof(variant.VariantValues));

                    optionValuesNames.Add(value.Name);
                    productVariant.AddValue(option.Id, value.Id);
                }

                var variantImage = variant.VariantImages;

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

                var sku = variantService.GenerateSKU(product.Name, optionValuesNames);

                productVariant.SetSKU(sku);

                product.AddVariant(productVariant);
            }
        }

        await productRepository.AddAsync(product);

        await unitOfWork.SaveChangesAsync();

        return product.Id.Value.ToString();
    }
}
