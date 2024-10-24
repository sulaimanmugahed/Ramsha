using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Domain.Inventory;
using Ramsha.Domain.Inventory.Entities;

namespace Ramsha.Application.Contracts.Persistence;

public interface IStockRepository : IGenericRepository<Stock, StockId>
{

}
