
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Domain.Products.Entities;
using Ramsha.Domain.Products;

using Ramsha.Persistence.Contexts;

namespace Ramsha.Persistence.Repositories;

public class BrandRepository(ApplicationDbContext context)
: GenericRepository<Brand, BrandId>(context), IBrandRepository
{

}
