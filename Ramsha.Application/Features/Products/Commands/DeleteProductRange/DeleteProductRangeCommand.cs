using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Application.Wrappers;
using MediatR;

namespace Ramsha.Application.Features.Products.Commands.DeleteProductRange;

public class DeleteProductRangeCommand : IRequest<BaseResult>
{
    public List<Guid> Products { get; set; }
}
