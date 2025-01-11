using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Brands.Commands.UpdateBrand;

public class UpdateBrandCommand:IRequest<BaseResult>
{
    public Guid Id { get; set; }
    public string Name { get; set; }
}
