using System.Collections.Generic;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.DTOs.Common
{
    public class PaginationResponseDto<T>
    {
        public List<T> Data { get; set; }
        public PagedMetaData MetaData { get; set; }

        public PaginationResponseDto() { }

        public PaginationResponseDto(List<T> data, PaginationParams paginationParams, int totalCount)
        {
            Data = data;
            MetaData = PagedMetaData.Create(paginationParams, totalCount);
        }

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
