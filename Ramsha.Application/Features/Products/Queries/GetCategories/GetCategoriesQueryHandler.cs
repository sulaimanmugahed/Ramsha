using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Products;
using Ramsha.Application.Extensions;
using Ramsha.Application.Wrappers;
using MediatR;

namespace Ramsha.Application.Features.Products.Queries.GetCategories;

public class GetCategoriesQueryHandler(
    ICategoryRepository categoryRepository
) : IRequestHandler<GetCategoriesQuery, BaseResult<List<CategoryDto>>>
{
    public async Task<BaseResult<List<CategoryDto>>> Handle(GetCategoriesQuery request, CancellationToken cancellationToken)
    {
        var result = await categoryRepository.GetMainCategories();

        return result.Select(x=> x.AsCategoryDto()).ToList();
    }
}
