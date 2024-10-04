using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Application.Dtos.Products;
using Ramsha.Application.Wrappers;
using MediatR;

namespace Ramsha.Application.Features.Products.Queries.GetProductVariants;

public class GetProductVariantQuery : IRequest<BaseResult<ProductVariantDto>>
{
    public Guid ProductId { get; set; }

    public Guid VariantId { get; set; }
}
