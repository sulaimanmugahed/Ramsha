using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Tags.Commands.CreateTag;

public class CreateTagCommand : IRequest<BaseResult<string>>
{
    public string Name { get; set; }
}
