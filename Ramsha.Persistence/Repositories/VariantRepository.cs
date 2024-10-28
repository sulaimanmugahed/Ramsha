using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Domain.Common;
using Ramsha.Domain.Products.Entities;
using Ramsha.Persistence.Contexts;

namespace Ramsha.Persistence.Repositories;

public class VariantRepository(ApplicationDbContext context) : GenericRepository<ProductVariant, CompositeKey>(context), IVariantRepository
{
    
}
