
using Ramsha.Application.Dtos.Catalog;
using Ramsha.Domain.Products;
using Ramsha.Domain.Products.Entities;

namespace Ramsha.Application.Contracts.Persistence;

public interface ICategoryRepository : IGenericRepository<Category, CategoryId>
{
    Task<List<Category>> GetMainCategories();

    Task<List<CatalogCategoryDto>> GetCatalogCategories();

    Task<List<CategoryId>> GetChildCategoryIds(CategoryId categoryId);


}
