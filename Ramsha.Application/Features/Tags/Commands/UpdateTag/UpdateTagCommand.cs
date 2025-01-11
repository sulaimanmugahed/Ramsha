using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Tags.Commands.UpdateTag;

public class UpdateTagCommand:IRequest<BaseResult>
{
    public Guid Id { get; set; }
    public string Name { get; set; }
}
