
using MediatR;
using Ramsha.Application.Contracts.BackgroundJobs;
using Ramsha.Application.Contracts.Caching;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Catalog;
using Ramsha.Application.Helpers;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Catalog.Queries.GetCatalogCategories;

public class GetCatalogCategoriesQueryHandler(
    ICategoryRepository categoryRepository,
    ICacheService redisCacheService,
    IBackgroundJobService backgroundJobService
) : IRequestHandler<GetCatalogCategoriesQuery, BaseResult<List<CatalogCategoryDto>>>
{
    public async Task<BaseResult<List<CatalogCategoryDto>>> Handle(GetCatalogCategoriesQuery request, CancellationToken cancellationToken)
    {
        var key = CacheKeysHelper.CatalogCacheKeys.GetCategoriesKey();
        var categoriesDTOs = await redisCacheService.GetObject<List<CatalogCategoryDto>>(key);
        if (categoriesDTOs is null)
        {
            categoriesDTOs = await categoryRepository.GetCatalogCategories();
            backgroundJobService.Enqueue(()=>  redisCacheService.SetObject(key, categoriesDTOs, TimeSpan.FromDays(1)));
        }

        return categoriesDTOs;
    }
}
