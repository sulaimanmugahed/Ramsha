using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Tags.Commands.DeleteTag;

public class DeleteTagCommand : IRequest<BaseResult>
{
    public Guid Id { get; set; }
}
