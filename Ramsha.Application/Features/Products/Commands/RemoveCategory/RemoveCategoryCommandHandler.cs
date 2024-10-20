using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Products.Commands.RemoveCategory;

public class RemoveCategoryCommandHandler(
    ICategoryRepository categoryRepository,
    IUnitOfWork unitOfWork
) : IRequestHandler<RemoveCategoryCommand, BaseResult>
{
    public async Task<BaseResult> Handle(RemoveCategoryCommand request, CancellationToken cancellationToken)
    {
        var category = await categoryRepository.GetByIdAsync(new Domain.Products.CategoryId(request.Id));
        if (category is null)
            return new Error(ErrorCode.RequestedDataNotExist);

        categoryRepository.Delete(category);

        await unitOfWork.SaveChangesAsync();

        return BaseResult.Ok();
    }
}
