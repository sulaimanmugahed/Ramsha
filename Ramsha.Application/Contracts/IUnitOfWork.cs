

namespace Ramsha.Application.Contracts;

public interface IUnitOfWork
{
    Task<bool> SaveChangesAsync();
}
