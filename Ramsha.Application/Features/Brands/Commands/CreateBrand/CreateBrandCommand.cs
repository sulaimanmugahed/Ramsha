using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Brands.Commands.CreateBrand;

public class CreateBrandCommand : IRequest<BaseResult<string>>
{
    public string Name { get; set; }
}
