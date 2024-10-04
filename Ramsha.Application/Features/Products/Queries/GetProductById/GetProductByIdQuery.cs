using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Application.Dtos.Products;
using Ramsha.Application.Wrappers;
using MediatR;

namespace Ramsha.Application.Features.Products.Queries.GetProductById;

public class GetProductByIdQuery : IRequest<BaseResult<ProductDto?>>
{
    public Guid Id { get; set; }
}
