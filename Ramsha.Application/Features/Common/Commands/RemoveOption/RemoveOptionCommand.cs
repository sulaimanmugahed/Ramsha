

using Ramsha.Application.Wrappers;
using MediatR;

namespace Ramsha.Application.Features.Common.Commands.RemoveOption;

public class RemoveOptionCommand : IRequest<BaseResult>
{
    public Guid OptionId { get; set; }
}
