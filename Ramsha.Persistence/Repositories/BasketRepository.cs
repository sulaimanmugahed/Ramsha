using Ramsha.Application.Contracts.Persistence;
using Ramsha.Domain.Baskets;
using Ramsha.Domain.Customers.Entities;
using Ramsha.Persistence.Contexts;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ramsha.Persistence.Repositories;
public class BasketRepository(ApplicationDbContext context)
	: GenericRepository<Basket, BasketId>(context)
	, IBasketRepository
{
	private DbSet<Basket> _baskets = context.Set<Basket>();


	public async Task<Basket?> FindByBuyer(string buyer)
	{
		return await _baskets.AsSplitQuery()
		.Include(b => b.Items)
		.ThenInclude(x => x.InventoryItem)
		.FirstOrDefaultAsync(b => b.Buyer == buyer);
	}

	public async Task<Basket?> GetDetail(string buyer)
	{
		return await _baskets.AsSplitQuery()
		.Include(b => b.Items)

			.ThenInclude(i => i.InventoryItem)
			.ThenInclude(x => x.ProductVariant)
			.ThenInclude(x => x.Dimensions)
			.Include(b => b.Items)
			.ThenInclude(i => i.InventoryItem)
			.ThenInclude(x => x.Supplier)
			.Include(b => b.Items)
			.ThenInclude(i => i.InventoryItem)
			.ThenInclude(i => i.Stocks)
			.FirstOrDefaultAsync(b => b.Buyer == buyer);
	}


}
