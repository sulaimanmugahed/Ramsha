using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Application.Wrappers;
using MediatR;

namespace Ramsha.Application.Features.Common.Commands.AddNewOption;

public class AddNewOptionCommand : IRequest<BaseResult<string>>
{
    public string OptionName { get; set; }
    public List<string> OptionValues { get; set; } = [];
}
