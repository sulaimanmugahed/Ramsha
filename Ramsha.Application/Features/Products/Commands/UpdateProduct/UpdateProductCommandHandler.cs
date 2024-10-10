using MediatR;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Extensions;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Products.Entities;

namespace Ramsha.Application.Features.Products.Commands.UpdateProduct;

public class UpdateProductCommandHandler(
    IProductRepository productRepository,
    IUnitOfWork unitOfWork,
    IBrandRepository brandRepository,
    ICategoryRepository categoryRepository,
    ITagRepository tagRepository
) : IRequestHandler<UpdateProductCommand, BaseResult>
{
    public async Task<BaseResult> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
    {
        var productToEdit = await productRepository.GetProductDetails(new Domain.Products.ProductId(request.ProductId));
        if (productToEdit is null)
            return new Error(ErrorCode.RequestedDataNotExist);

        var basicData = request.ProductBasicCommand;
        var additionalData = request.ProductAdditionalCommand;

        if (basicData is not null)
        {
            productToEdit.SetName(basicData.Name);
            productToEdit.SetDescription(basicData.Description);

            if (basicData.Brand.HasValue)
            {
                var brand = await brandRepository.GetByIdAsync(new Domain.Products.BrandId(basicData.Brand.Value));
                if (brand is null)
                    return new Error(ErrorCode.RequestedDataNotExist, nameof(basicData.Brand));
                productToEdit.SetBrand(brand.Id);
            }

            if (basicData.Category.HasValue)
            {
                var category = await categoryRepository.GetByIdAsync(new Domain.Products.CategoryId(basicData.Category.Value));
                if (category is null)
                    return new Error(ErrorCode.RequestedDataNotExist, nameof(basicData.Category));
                productToEdit.SetCategory(category.Id);
            }

            if (basicData.ImageUrl is not null)
                productToEdit.SetImage(basicData.ImageUrl);
        }


        if (additionalData is not null)
        {
            if (additionalData.SeoSettings is not null)
                productToEdit.SetSeoSettings(additionalData.SeoSettings);

            if (additionalData.TagsToAdd.HasItems())
            {
                foreach (var tag in additionalData.TagsToAdd!)
                {
                    var existTag = await tagRepository.GetAsync(x => x.Name.ToLower() == tag.ToLower());
                    if (existTag is null)
                    {
                        existTag = Tag.Create(tag);
                        await tagRepository.AddAsync(existTag);
                        await unitOfWork.SaveChangesAsync();
                    }
                    productToEdit.AddTag(existTag);
                }
            }

            if (additionalData.TagsToRemove.HasItems())
            {
                productToEdit.RemoveTags(additionalData.TagsToRemove!);
            }
        }

        await unitOfWork.SaveChangesAsync();

        return BaseResult.Ok();
    }
}
