using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Domain.Common;
using Ramsha.Domain.Products.Entities;

namespace Ramsha.Application.Contracts.Persistence;

public interface IVariantRepository:IGenericRepository<ProductVariant,CompositeKey>
{
    
}
