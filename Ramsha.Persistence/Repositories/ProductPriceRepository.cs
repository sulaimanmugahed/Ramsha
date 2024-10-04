using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Domain.Products;
using Ramsha.Domain.Products.Entities;
using Ramsha.Domain.Suppliers;
using Ramsha.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace Ramsha.Persistence.Repositories;

public class ProductPriceRepository(ApplicationDbContext context)
: GenericRepository<ProductPrice, int>(context),
IProductPriceRepository
{

    private readonly DbSet<ProductPrice> _productPrices = context.Set<ProductPrice>();

    public async Task<ProductPrice?> GetProductPriceAsync(ProductId productId, SupplierId supplierId)
    {
        // return await _productPrices
        //     .Where(pp => pp.ProductId == productId && pp.SupplierId == supplierId)
        //     .OrderByDescending(pp => pp.EffectiveDate)
        //     .FirstOrDefaultAsync();
        return null;
    }
}
