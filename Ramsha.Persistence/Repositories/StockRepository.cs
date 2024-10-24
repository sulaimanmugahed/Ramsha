using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Domain.Inventory;
using Ramsha.Domain.Inventory.Entities;
using Ramsha.Persistence.Contexts;

namespace Ramsha.Persistence.Repositories;

public class StockRepository(ApplicationDbContext context) : GenericRepository<Stock, StockId>(context), IStockRepository
{

}
