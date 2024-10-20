using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Products.Commands.RemoveCategory;

public class RemoveCategoryCommand : IRequest<BaseResult>
{
    public Guid Id { get; set; }
}
