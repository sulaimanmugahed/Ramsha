using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Application.Dtos.Products;
using Ramsha.Application.Wrappers;
using MediatR;

namespace Ramsha.Application.Features.Brands.Queries.GetBrand;

public class GetBrandQuery : IRequest<BaseResult<BrandDto>>
{
    public Guid Id { get; set; }
}
