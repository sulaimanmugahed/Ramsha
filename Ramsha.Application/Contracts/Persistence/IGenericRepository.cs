using System.Linq.Expressions;
using Ramsha.Domain.Common;


namespace Ramsha.Application.Contracts.Persistence;
public interface IGenericRepository<TEntity, TId> where TEntity : BaseEntity
{
    Task<IReadOnlyList<TEntity>> GetAllAsync();
    Task<TEntity?> GetByIdAsync(TId id);
    Task<TEntity?> GetAsync(Expression<Func<TEntity, bool>> criteria, params Expression<Func<TEntity, object>>[] includes);

    Task<IEnumerable<TEntity?>> GetAllWithIncludeAsync(params Expression<Func<TEntity, object>>[] includes);

    Task<IEnumerable<TEntity?>> GetAllAsync(Expression<Func<TEntity, bool>> criteria, params Expression<Func<TEntity, object>>[] includes);
    Task<TEntity> AddAsync(TEntity entity);
    TEntity Delete(TEntity entity);
    Task<bool> IsExist(TId id);

}
