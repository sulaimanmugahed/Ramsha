
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Products.Entities;
using MediatR;

namespace Ramsha.Application.Features.Products.Commands.CreateCategory;

public class CreateCategoryCommandHandler(
    ICategoryRepository categoryRepository,
    IUnitOfWork unitOfWork,
    ICodeGenerator codeGenerator
) : IRequestHandler<CreateCategoryCommand, BaseResult<string>>
{
    public async Task<BaseResult<string>> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
    {
        var newCategory = Category.Create(request.Name);

        if (request.ParentId != Guid.Empty)
        {
            newCategory.SetParent(new Domain.Products.CategoryId(request.ParentId));
        }

        newCategory.SetCode(codeGenerator.GenerateCategoryCode(newCategory.Id.Value));

        await categoryRepository.AddAsync(newCategory);
        await unitOfWork.SaveChangesAsync();

        return newCategory.Id.Value.ToString();
    }
}
