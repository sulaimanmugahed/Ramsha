using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Application.Wrappers;
using MediatR;

namespace Ramsha.Application.Features.Products.Commands.CreateCategory;

public class CreateCategoryCommand : IRequest<BaseResult<string>>
{
    public string Name { get; set; }
    public Guid ParentId { get; set; }

}
