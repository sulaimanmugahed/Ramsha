
using MediatR;
using Ramsha.Application.Contracts;
using Ramsha.Domain.Common;

namespace Ramsha.Persistence.Contexts;

public class UnitOfWork(ApplicationDbContext dbContext) : IUnitOfWork
{
    public async Task<bool> SaveChangesAsync()
    {
        var result = await dbContext.SaveChangesAsync() > 0;
      
        return result;

    }
    public bool SaveChanges()
    {
        return dbContext.SaveChanges() > 0;
    }

   
}
