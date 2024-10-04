
using Ramsha.Application.Dtos.Common;
using Ramsha.Application.Wrappers;
using MediatR;

namespace Ramsha.Application.Features.Common.Queries.GetOption;

public class GetOptionQuery : IRequest<BaseResult<OptionDto?>>
{
    public Guid Id { get; set; }
}
