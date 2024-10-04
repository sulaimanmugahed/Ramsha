using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Products;
using Ramsha.Application.Extensions;
using Ramsha.Application.Wrappers;
using MediatR;

namespace Ramsha.Application.Features.Products.Queries.GetTags;

public class GetTagsQueryHandler(
    ITagRepository tagRepository
) : IRequestHandler<GetTagsQuery, BaseResult<List<TagDto>>>
{
    public async Task<BaseResult<List<TagDto>>> Handle(GetTagsQuery request, CancellationToken cancellationToken)
    {
        var result = await tagRepository.GetAllAsync();
        return result.Select(t => t.AsDto()).ToList();
    }
}
