using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Brands.Commands.DeleteBrand;

public class DeleteBrandCommand:IRequest<BaseResult>
{
    public Guid Id { get; set; }
}
