using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Products.Commands.UpdateCategory;

public class UpdateCategoryCommandHandler(
ICategoryRepository categoryRepository,
    IUnitOfWork unitOfWork
) : IRequestHandler<UpdateCategoryCommand, BaseResult>
{
    public async Task<BaseResult> Handle(UpdateCategoryCommand request, CancellationToken cancellationToken)
    {
        var category = await categoryRepository.GetByIdAsync(new Domain.Products.CategoryId(request.Id));
        if (category is null)
            return new Error(ErrorCode.RequestedDataNotExist);

        category.SetName(request.Name);

        await unitOfWork.SaveChangesAsync();

        return BaseResult.Ok();
    }
}
