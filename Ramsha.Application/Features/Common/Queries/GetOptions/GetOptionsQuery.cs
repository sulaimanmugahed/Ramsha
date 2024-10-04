
using Ramsha.Application.Dtos.Common;
using Ramsha.Application.Wrappers;
using MediatR;

namespace Ramsha.Application.Features.Common.Queries.GetOption;

public class GetOptionsQuery : IRequest<BaseResult<List<OptionDto?>>>
{
}
