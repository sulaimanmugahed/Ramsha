using System.Collections.Generic;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.DTOs.Common
{
    public class PaginationResponseDto<T>(List<T> data, PaginationParams paginationParams, int totalCount)
    {
        public PagedMetaData MetaData { get; set; } = PagedMetaData.Create(paginationParams, totalCount);
        public List<T> Data { get; set; } = data;

        public void AddSortingMetaData(SortingParams? sorting)
        {
            if (sorting is not null)
                MetaData.SetSorting(sorting);
        }
        public void AddFilterMetaData(FilterParams? filter)
        {
            if (filter is not null)
                MetaData.SetFilter(filter);
        }
    }
}
