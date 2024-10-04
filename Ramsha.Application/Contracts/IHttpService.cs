
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Contracts;

public interface IHttpService
{
    void AddPagedHeader(PagedMetaData metaData);
}
