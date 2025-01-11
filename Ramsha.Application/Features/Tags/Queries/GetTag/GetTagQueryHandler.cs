using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Products;
using Ramsha.Application.Extensions;
using Ramsha.Application.Wrappers;
using MediatR;
using Ramsha.Domain.Products.Entities;

namespace Ramsha.Application.Features.Tags.Queries.GetTag;

public class GetTagQueryHandler(
    ITagRepository tagRepository
) : IRequestHandler<GetTagQuery, BaseResult<TagDto>>
{
    public async Task<BaseResult<TagDto>> Handle(GetTagQuery request, CancellationToken cancellationToken)
    {
        var existTag = await tagRepository.GetByIdAsync(new TagId(request.Id));
        if (existTag is null)
            return new Error(ErrorCode.RequestedDataNotExist, "no tag with this id");


        return existTag.AsDto();
    }
}
