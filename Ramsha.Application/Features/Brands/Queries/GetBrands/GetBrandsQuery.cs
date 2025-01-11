using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Application.Dtos.Products;
using Ramsha.Application.Wrappers;
using MediatR;

namespace Ramsha.Application.Features.Brands.Queries.GetBrands;

public class GetBrandsQuery : IRequest<BaseResult<List<BrandDto>>>
{

}
