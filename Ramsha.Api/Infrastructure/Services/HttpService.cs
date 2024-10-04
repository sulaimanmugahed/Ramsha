using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Ramsha.Application.Contracts;
using Ramsha.Application.Wrappers;

namespace Ramsha.Api.Infrastructure.Services;

public class HttpService(IHttpContextAccessor httpContextAccessor) : IHttpService
{

    public void AddPagedHeader(PagedMetaData metaData)
    {
        var options = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };

        var headers = httpContextAccessor.HttpContext?.Response.Headers;
        headers?.Append("Pagination", JsonSerializer.Serialize(metaData, options));
        headers?.Append("Access-Control-Expose-Headers", "Pagination");
    }
}
