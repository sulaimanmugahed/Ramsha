using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Application.Dtos.Products;
using Ramsha.Application.Wrappers;
using MediatR;

namespace Ramsha.Application.Features.Tags.Queries.GetTag;

public class GetTagQuery : IRequest<BaseResult<TagDto>>
{
    public Guid Id { get; set; }
}
