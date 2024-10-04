using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ramsha.Application.Wrappers;

public class PagedParams
{
    public PaginationParams PaginationParams { get; set; }
    public FilterParams? FilterParams { get; set; }
    public SortingParams? SortingParams { get; set; }
}
