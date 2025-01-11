using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Application.Dtos.Products;
using Ramsha.Application.Wrappers;
using MediatR;

namespace Ramsha.Application.Features.Tags.Queries.GetTags;

public class GetTagsQuery : IRequest<BaseResult<List<TagDto>>>
{

}
