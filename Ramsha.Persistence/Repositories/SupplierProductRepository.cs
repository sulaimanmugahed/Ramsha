
using Microsoft.EntityFrameworkCore;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Domain.Common;
using Ramsha.Domain.Products;
using Ramsha.Domain.Products.Entities;
using Ramsha.Domain.Suppliers;
using Ramsha.Persistence.Contexts;

namespace Ramsha.Persistence.Repositories;

public class SupplierProductRepository(ApplicationDbContext applicationDbContext) : GenericRepository<SupplierProduct, CompositeKey>(applicationDbContext), ISupplierProductRepository
{
    private DbSet<SupplierProduct> _supplierProducts = applicationDbContext.Set<SupplierProduct>();
}
