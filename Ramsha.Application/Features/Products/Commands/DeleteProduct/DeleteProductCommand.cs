using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Products.Commands.DeleteProduct;

public class DeleteProductCommand : IRequest<BaseResult>
{
    public Guid Id { get; set; }
}
