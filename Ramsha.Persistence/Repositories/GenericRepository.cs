using Microsoft.EntityFrameworkCore;

using Ramsha.Application.Contracts.Persistence;
using Ramsha.Domain.Common;
using Ramsha.Persistence.Contexts;

using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore.Query;
using Ramsha.Application.DTOs.Common;
using Ramsha.Application.Wrappers;
using Ramsha.Persistence.Helpers;
using System.Linq.Dynamic.Core;

namespace Ramsha.Persistence.Repositories;

public class GenericRepository<TEntity, TId>(ApplicationDbContext context)
    : IGenericRepository<TEntity, TId>
    where TEntity : BaseEntity

{
    public async Task<TEntity?> GetByIdAsync(TId id)
    {
        if (id is CompositeKey compositeKey)
            return await context.Set<TEntity>()
                    .FindAsync(compositeKey.Keys);

        return await context.Set<TEntity>()
            .FindAsync(id);
    }


    public async Task<bool> IsExist(TId id)
    {
        if (id is CompositeKey compositeKey)
            return await context.Set<TEntity>()
                    .FindAsync(compositeKey.Keys) != null;

        return await context.Set<TEntity>().FindAsync(id) != null;
    }

    public async Task<TEntity> AddAsync(TEntity entity)
    {

        await context.Set<TEntity>()
             .AddAsync(entity);
        return entity;
    }

    public TEntity Delete(TEntity entity)
    {
        context.Set<TEntity>()
           .Remove(entity);
        return entity;
    }





    public async Task<TEntity?> GetAsync(Expression<Func<TEntity, bool>> criteria, params Expression<Func<TEntity, object>>[] includes)
    {
        IQueryable<TEntity> query = context.Set<TEntity>();

        foreach (var include in includes)
        {
            query = query.Include(include);
        }
        return await query.FirstOrDefaultAsync(criteria);
    }



    public async Task<IEnumerable<TEntity?>> GetAllAsync(Expression<Func<TEntity, bool>> criteria, params Expression<Func<TEntity, object>>[] includes)
    {
        IQueryable<TEntity> query = context.Set<TEntity>();

        foreach (var include in includes)
        {
            query = query.Include(include);
        }
        return await query.Where(criteria).ToListAsync();
    }

    public async Task<IEnumerable<TEntity?>> GetAllWithIncludeAsync(params Expression<Func<TEntity, object>>[] includes)
    {
        IQueryable<TEntity> query = context.Set<TEntity>();

        foreach (var include in includes)
        {
            query = query.Include(include);
        }
        return await query.ToListAsync();
    }


    public async Task<IReadOnlyList<TEntity>> GetAllAsync()
        => await context.Set<TEntity>()
            .ToListAsync();




    protected async Task<PaginationResponseDto<T>> Paged<T>(IQueryable<T> query, PaginationParams paginationParams)
    {
        var count = await query.CountAsync();
        var pagedResult = await query
            .Skip((paginationParams.PageNumber - 1) * paginationParams.PageSize)
            .Take(paginationParams.PageSize)
            .ToListAsync();

        return new(pagedResult, paginationParams, count);
    }
}
