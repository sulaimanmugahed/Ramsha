using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Domain.Products;
using Ramsha.Domain.Products.Entities;
using Ramsha.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

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
}
