
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Domain.Products;
using Ramsha.Domain.Products.Entities;
using Ramsha.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace Ramsha.Persistence.Repositories;

public class OptionRepository(ApplicationDbContext context)
: GenericRepository<Option, OptionId>(context),
IOptionRepository
{
    private readonly DbSet<Option> _option = context.Set<Option>();

}
