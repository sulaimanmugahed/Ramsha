
using System.Linq.Expressions;
using System.Security.Cryptography.X509Certificates;
using Microsoft.EntityFrameworkCore;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Suppliers;
using Ramsha.Application.DTOs.Common;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Common;
using Ramsha.Domain.Products;
using Ramsha.Domain.Products.Entities;
using Ramsha.Domain.Suppliers;
using Ramsha.Domain.Suppliers.Entities;
using Ramsha.Persistence.Contexts;

namespace Ramsha.Persistence.Repositories;

public class SupplierProductRepository(ApplicationDbContext applicationDbContext) : GenericRepository<SupplierProduct, CompositeKey>(applicationDbContext), ISupplierProductRepository
{
    private readonly DbSet<SupplierProduct> _supplierProducts = applicationDbContext.Set<SupplierProduct>();
    private readonly DbSet<SupplierVariant> _supplierVariants = applicationDbContext.Set<SupplierVariant>();


    public async Task<PaginationResponseDto<SupplierProductDto>> GetPaged(SupplierId supplierId, PaginationParams paginationParams)
    {
        var productsQuery = _supplierProducts
        .Include(x => x.SupplierVariants)
       .Include(sp => sp.Product)
       .ThenInclude(x => x.Category)
       .Where(x => x.SupplierId == supplierId)
       .OrderBy(x => x.Product.Name)
       .AsQueryable();

        return await Paged(
         productsQuery.Select(p => new SupplierProductDto(
            p.ProductId.Value,
            p.Product.Name,
            p.Product.Category.Name,
            p.Product.Description,
            p.Product.ImageUrl,
            p.SupplierVariants.Count)),
            paginationParams
         );
    }

    public async Task<SupplierVariant?> GetVariant(SupplierId supplierId, ProductId productId, ProductVariantId productVariantId)
    {
        return await _supplierVariants
       .FindAsync(supplierId, productId, productVariantId);
    }
    
    public async Task<SupplierVariant?> GetVariantDetail(SupplierId supplierId, ProductId productId, ProductVariantId productVariantId)
    {
        return await _supplierVariants
       .AsSplitQuery()
       .Include(x => x.SupplierProductImages)
       .Include(x => x.ProductVariant)
       .ThenInclude(x => x.VariantValues)
       .ThenInclude(x => x.Option)
        .Include(x => x.ProductVariant)
       .ThenInclude(x => x.VariantValues)
       .ThenInclude(x => x.OptionValue)
       .FirstOrDefaultAsync(x => x.ProductId == productId && x.SupplierId == supplierId && x.ProductVariantId == productVariantId);
    }

    public async Task<List<SupplierVariant>> GetVariantList(SupplierId supplierId, ProductId productId)
    {
        return await _supplierVariants
        .AsSplitQuery()
        .Include(x => x.SupplierProductImages)
        .Include(x => x.ProductVariant)
        .ThenInclude(x => x.VariantValues)
        .ThenInclude(x => x.Option)
         .Include(x => x.ProductVariant)
        .ThenInclude(x => x.VariantValues)
        .ThenInclude(x => x.OptionValue)
        .Where(x => x.SupplierId == supplierId && x.ProductId == productId)
        .ToListAsync();
    }
}
