// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;
// using Ramsha.Application.Contracts.Persistence;
// using Ramsha.Domain.Products;
// using Ramsha.Domain.Products.Entities;
// using Ramsha.Domain.Suppliers;
// using Ramsha.Persistence.Contexts;
// using Microsoft.EntityFrameworkCore;

// namespace Ramsha.Persistence.Repositories;

// public class DiscountRepository(ApplicationDbContext context)
// : GenericRepository<Discount, int>(context),
//  IDiscountRepository
// {

//     private readonly DbSet<Discount> _discounts = context.Set<Discount>();

//     public async Task<IEnumerable<Discount>> GetActiveDiscountsAsync(ProductId? productId, SupplierId? supplierId, DateTime currentDate)
//     {
//         // return await _discounts
//         //     .Where(d =>
//         //         (d.ProductId == productId || d.SupplierId == supplierId) &&
//         //         d.StartDate <= currentDate &&
//         //         d.EndDate >= currentDate)
//         //     .ToListAsync();
//         return default;
//     }
// }
