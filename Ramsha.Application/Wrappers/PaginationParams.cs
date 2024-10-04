namespace Ramsha.Application.Wrappers;

public class PaginationParams
{
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    public PaginationParams()
    {
        PageNumber = 1;
        PageSize = 20;
    }
    public PaginationParams(int pageNumber, int pageSize)
    {
        PageNumber = pageNumber < 1 ? 1 : pageNumber;
        PageSize = pageSize;
    }
}