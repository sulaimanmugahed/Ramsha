using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ramsha.Application.Dtos.Catalog;

public record CatalogCategoryDto(
Guid Id,
Guid? ParentId,
string Label,
string ImageUrl,
int NumberOfProducts,
bool HasChildren
);

