using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Products.Commands.DeleteProductVariant;

public class DeleteProductVariantCommand : IRequest<BaseResult>
{
    public Guid ProductId { get; set; }
    public Guid VariantId { get; set; }
}
