using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Dtos.Catalog;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Catalog.Queries.GetCatalogCategories;

public class GetCatalogCategoriesQuery : IRequest<BaseResult<List<CatalogCategoryDto>>>
{

}
