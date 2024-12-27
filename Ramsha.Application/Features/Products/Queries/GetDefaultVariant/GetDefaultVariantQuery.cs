using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Dtos.Products;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Products.Queries.GetDefaultVariant;

public class GetDefaultVariantQuery : IRequest<BaseResult<ProductVariantDto?>>
{
    public Guid ProductId { get; set; }
}
