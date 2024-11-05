using Ramsha.Domain.Baskets;
using Ramsha.Domain.Customers.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ramsha.Application.Contracts.Persistence;
public interface IBasketRepository:IGenericRepository<Basket,BasketId>
{
	Task<Basket?> FindByBuyer(string buyer);
	Task<Basket?> GetDetail(string buyer);
}
