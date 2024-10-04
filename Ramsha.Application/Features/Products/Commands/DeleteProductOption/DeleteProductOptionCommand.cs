using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Application.Wrappers;
using MediatR;

namespace Ramsha.Application.Features.Products.Commands.DeleteProductOption;

public class DeleteProductOptionCommand : IRequest<BaseResult>
{
    public Guid ProductId { get; set; }
    public Guid OptionId { get; set; }
}
