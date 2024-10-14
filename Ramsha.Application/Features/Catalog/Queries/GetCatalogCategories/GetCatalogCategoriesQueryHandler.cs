using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Catalog;
using Ramsha.Application.Extensions;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Catalog.Queries.GetCatalogCategories;

public class GetCatalogCategoriesQueryHandler(
    ICategoryRepository categoryRepository
) : IRequestHandler<GetCatalogCategoriesQuery, BaseResult<List<CatalogCategoryDto>>>
{
    public async Task<BaseResult<List<CatalogCategoryDto>>> Handle(GetCatalogCategoriesQuery request, CancellationToken cancellationToken)
    {
        return await categoryRepository.GetCatalogCategories();
    }
}
