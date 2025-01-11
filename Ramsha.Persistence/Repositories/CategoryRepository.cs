using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Domain.Products;
using Ramsha.Domain.Products.Entities;
using Ramsha.Persistence.Contexts;
using Ramsha.Application.Dtos.Catalog;
using Ramsha.Application.Extensions;
using Ramsha.Application.Dtos.Statistics;

namespace Ramsha.Persistence.Repositories;

public class CategoryRepository(ApplicationDbContext context) : GenericRepository<Category, CategoryId>(context), ICategoryRepository
{
    private DbSet<Category> _categories = context.Set<Category>();

    public async Task<List<Category>> GetMainCategories()
    {
        return await _categories.Where(c => c.ParentCategoryId == null).Include(x => x.SubCategories).ToListAsync();
    }

    public async Task<List<CategoryId>> GetChildCategoryIds(CategoryId categoryId)
    {
        var categoryIds = await _categories
            .Where(c => c.Id == categoryId || c.ParentCategoryId == categoryId)
            .Select(c => c.Id)
            .ToListAsync();

        return categoryIds;
    }

    public Task<List<CatalogCategoryDto>> GetCatalogCategories()
    {
        var categories = _categories
        .Include(x => x.SubCategories)
        .Include(x => x.Products)
        .AsQueryable();
        return categories.Select(x => x.AsCatalogCategoryDto()).ToListAsync();
    }

   public async Task<List<TotalCategoryProducts>> GetTotalMainCategoriesProducts()
{
    var categories = await _categories
        .Include(x => x.SubCategories)
        .Include(x => x.Products)
        .Where(x => x.ParentCategoryId == null)
        .ToListAsync();

    var result = categories
        .Select(x => new TotalCategoryProducts(x.Name,GetTotalProductCount(x)))
        .ToList();

    return result;
}

private int GetTotalProductCount(Category category)
{
    int totalCount = category.Products.Count;

    foreach (var subCategory in category.SubCategories)
    {
        totalCount += GetTotalProductCount(subCategory);
    }

    return totalCount;
}
}
