using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Domain.Common;
using Ramsha.Domain.Products;
using Ramsha.Domain.Products.Entities;
using Ramsha.Domain.Suppliers;

namespace Ramsha.Application.Contracts.Persistence;

public interface ISupplierProductRepository : IGenericRepository<SupplierProduct, CompositeKey>
{

}
