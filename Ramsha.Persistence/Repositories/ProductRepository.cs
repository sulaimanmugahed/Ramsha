using Microsoft.EntityFrameworkCore;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Domain.Products;
using Ramsha.Domain.Products.Entities;
using Ramsha.Persistence.Contexts;
using Ramsha.Application.DTOs.Common;
using Ramsha.Application.Dtos.Products;
using Ramsha.Application.Wrappers;
using Ramsha.Application.Extensions;

using Ramsha.Persistence.Helpers;
using Ramsha.Application.Dtos.Catalog;
using Ramsha.Application.Dtos.Common;



namespace Ramsha.Persistence.Repositories;
public class ProductRepository(ApplicationDbContext context)
    : GenericRepository<Product, ProductId>(context),
    IProductRepository
{
   private readonly DbSet<Product> _product = context.Set<Product>();
   private readonly DbSet<ProductVariant> _productsVariants = context.Set<ProductVariant>();
   private readonly DbSet<VariantValue> _variantValues = context.Set<VariantValue>();
   private readonly DbSet<Category> _category = context.Set<Category>();
   private readonly DbSet<ProductOption> _options = context.Set<ProductOption>();



   public async Task<IEnumerable<Product>> GetAllProductsDetails()
   {
      return await _product
     .AsSplitQuery()
     .Include(p => p.Brand)
     .Include(p => p.Category)
     .Include(x => x.Variants)
     .ThenInclude(p => p.SupplierVariants)
       .Include(p => p.Variants)
     .ThenInclude(v => v.Images)
     .Include(p => p.Variants)
       .ThenInclude(v => v.VariantValues)
       .ThenInclude(vv => vv.Option)
       .Include(p => p.Variants)
       .ThenInclude(v => v.VariantValues)
       .ThenInclude(vv => vv.OptionValue)
  .ToListAsync();
   }

   public async Task<Product?> GetProductCatalogDetail(ProductId productId)
   {
      return await _product
     .AsSplitQuery()
     .Include(p => p.Brand)
     .Include(p => p.Category)
     .Include(x => x.Variants)
      .ThenInclude(p => p.SupplierVariants)
     .Include(p => p.Variants)
       .ThenInclude(v => v.Images)
     .Include(p => p.Variants)
       .ThenInclude(v => v.VariantValues)
       .ThenInclude(vv => vv.Option)
     .Include(p => p.Variants)
       .ThenInclude(v => v.VariantValues)
       .ThenInclude(vv => vv.OptionValue)
  .SingleOrDefaultAsync(x => x.Id == productId);
   }

   public async Task<Option?> GetProductOption(ProductId productId, OptionId optionId)
   => (await _options.Include(x => x.Option).SingleOrDefaultAsync(x => x.ProductId == productId && x.OptionId == optionId))?.Option;

   public async Task<List<ProductOption>> GetProductOptions(ProductId productId)
   {
      var options = await _options.Include(x => x.Option)
      .Where(x => x.ProductId == productId)
      .OrderBy(x => x.Priority).ToListAsync();
      return options;
   }





   public async Task<IEnumerable<Product>> FindAllWithDetails()
   {
      return await _product
      .Include(x => x.Category)
      .Include(x => x.SupplierProducts)
      .Include(x => x.Options)
      .ThenInclude(x => x.Option)
      .ThenInclude(x => x.OptionValues)
      .ToListAsync();
   }

   public async Task<Product?> GetProductWithOptions(ProductId productId)
   {
      return await _product
      .Include(x => x.Options)
      .ThenInclude(x => x.Option)
      .ThenInclude(x => x.OptionValues)
      .SingleOrDefaultAsync(x => x.Id == productId);
   }

   public async Task<Product?> GetProductWithVariantsAndOptions(ProductId productId)
   {
      return await _product
      .Include(p => p.Options)
      .ThenInclude(o => o.Option)
      .ThenInclude(o => o.OptionValues)
      .Include(x => x.Variants)
      .ThenInclude(v => v.Images)
     .Include(x => x.Variants)
        .ThenInclude(v => v.VariantValues)
           .ThenInclude(vv => vv.Option)
     .Include(x => x.Variants)
        .ThenInclude(x => x.VariantValues)
           .ThenInclude(x => x.OptionValue)
     .SingleOrDefaultAsync(x => x.Id == productId);
   }

   public async Task<ProductVariant?> GetProductVariant(ProductId productId, ProductVariantId productVariantId)
   {
      return await _productsVariants.FindAsync(productId, productVariantId);
   }

   public async Task<ProductVariant?> GetVariantDetails(ProductId productId, ProductVariantId productVariantId)
   {
      return await _productsVariants
      .AsSplitQuery()
      .Include(x => x.SupplierVariants)
      .Include(x => x.Product)
      .Include(v => v.Images)
        .Include(v => v.VariantValues)
           .ThenInclude(vv => vv.Option)
        .Include(x => x.VariantValues)
           .ThenInclude(x => x.OptionValue)
     .FirstOrDefaultAsync(x => x.Id == productVariantId && x.ProductId == productId);
   }


   public async Task<IEnumerable<ProductVariant?>> GetVariants(ProductId productId)
   {
      return await _productsVariants
     .AsSplitQuery()
     .Include(x => x.Images)
       .Include(v => v.VariantValues)
          .ThenInclude(vv => vv.Option)
       .Include(x => x.VariantValues)
          .ThenInclude(x => x.OptionValue)
    .Where(x => x.ProductId == productId)
    .ToListAsync();
   }

   public async Task<IEnumerable<ProductVariant?>> GetVariantsDetails(ProductId productId)
   {
      return await _productsVariants
     .AsSplitQuery()
       .Include(v => v.VariantValues)
          .ThenInclude(vv => vv.Option)
       .Include(x => x.VariantValues)
          .ThenInclude(x => x.OptionValue)
       .Include(x => x.SupplierVariants)
    .Where(x => x.ProductId == productId)
    .ToListAsync();
   }


   public async Task<bool> IsOptionExist(OptionId optionId)
   {
      return await _variantValues.AnyAsync(x => x.OptionId == optionId);
   }

   public async Task<PaginationResponseDto<CatalogProductDto>> GetCatalogProductsPaged(PaginationParams paginationParams)
   {
      var productsQuery = _product
     .Include(p => p.Category)
     .Include(p => p.Brand)
     .OrderBy(x => x.Created)
     .AsQueryable();

      return await Paged(
       productsQuery.Select(p => p.AsProductCatalogDto()),
       paginationParams
       );
   }


   public async Task<PaginationResponseDto<ProductDto>> GetProductsPaged(PaginationParams paginationParams, FilterParams? filterParams = null, SortingParams? sortingParams = null)
   {
      var productsQuery = _product
      .Include(p => p.Category)
      .Include(p => p.Brand)
      .AsQueryable();


      productsQuery = sortingParams is not null && sortingParams.ColumnsSort.Count > 0
       ? productsQuery.OrderByColumnName(sortingParams.ColumnsSort)
       : productsQuery.OrderBy(x => x.Created);

      if (filterParams is not null)
      {
         var globalFilter = filterParams.GlobalFilterValue;

         if (!string.IsNullOrEmpty(globalFilter))
            productsQuery = productsQuery.Where(p => p.Name.Contains(globalFilter));


         if (filterParams.ColumnsFilter is not null && filterParams.ColumnsFilter.Count != 0)
            productsQuery = productsQuery.FilterByColumn(filterParams.ColumnsFilter);

         if (filterParams?.Categories != null && filterParams.Categories.Count != 0)
         {
            var allCategoryIds = await GetChildCategoryIds(filterParams.Categories);
            productsQuery = productsQuery.Where(p => allCategoryIds.Contains(p.CategoryId));
         }
      }

      return await Paged(
        productsQuery.Select(p => p.AsDto()),
        paginationParams
        );
   }

   private async Task<List<CategoryId>> GetChildCategoryIds(List<CategoryId> categoryIds)
   {
      var allCategoryIds = new List<CategoryId>();

      foreach (var categoryId in categoryIds)
      {
         var childCategories = await _category
             .Where(c => c.ParentCategoryId == categoryId || c.Id == categoryId)
             .Select(c => c.Id)
             .ToListAsync();

         allCategoryIds.AddRange(childCategories);
      }

      return allCategoryIds.Distinct().ToList();
   }

   public async Task RemoveRange(List<ProductId> productIds)
   {
      await _product
      .Where(p => productIds.Contains(p.Id))
      .ExecuteDeleteAsync();
   }

   public Task RemoveVariant(ProductVariant productVariant)
   {
      _productsVariants.Remove(productVariant);
      return Task.CompletedTask;
   }

   public async Task<ProductVariant?> GetVariant(ProductId productId, ProductVariantId productVariantId)
   {
      return await _productsVariants.FindAsync(productId, productVariantId);
   }

   public async Task<Product?> GetProductDetails(ProductId productId)
   {
      return await _product
      .AsSplitQuery()
      .Include(p => p.Tags)
        .ThenInclude(x => x.Tag)
      .Include(p => p.Variants)
        .ThenInclude(v => v.VariantValues)
          .ThenInclude(vv => vv.Option)
      .Include(p => p.Variants)
        .ThenInclude(v => v.VariantValues)
          .ThenInclude(vv => vv.OptionValue)
      .Include(x => x.Variants)
        .ThenInclude(x => x.Images)
      .Include(x => x.Category)
      .Include(x => x.Brand)
      .SingleOrDefaultAsync(x => x.Id == productId);
   }

}
