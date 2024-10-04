using Ramsha.Domain.Customers.Entities;
using Ramsha.Domain.Suppliers;
using Ramsha.Domain.Suppliers.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ramsha.Application.Contracts.Persistence;
public interface ISupplierRepository:IGenericRepository<Supplier,SupplierId>
{
	Task<Supplier?> FindByUsername(string username);
}
