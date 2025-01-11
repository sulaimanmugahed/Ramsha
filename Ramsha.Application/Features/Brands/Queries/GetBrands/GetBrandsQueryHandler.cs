using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Products;
using Ramsha.Application.Extensions;
using Ramsha.Application.Wrappers;
using MediatR;

namespace Ramsha.Application.Features.Brands.Queries.GetBrands;

public class GetBrandsQueryHandler(
    IBrandRepository brandRepository
) : IRequestHandler<GetBrandsQuery, BaseResult<List<BrandDto>>>
{
    public async Task<BaseResult<List<BrandDto>>> Handle(GetBrandsQuery request, CancellationToken cancellationToken)
    {
        var result = await brandRepository.GetAllAsync();
        return result.Select(x => x.AsDto()).ToList();
    }
}
