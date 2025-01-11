using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using Ramsha.Application.Dtos.Products;
using Ramsha.Application.Features.Brands.Commands.CreateBrand;
using Ramsha.Application.Features.Brands.Commands.DeleteBrand;
using Ramsha.Application.Features.Brands.Commands.UpdateBrand;
using Ramsha.Application.Features.Brands.Queries.GetBrand;
using Ramsha.Application.Features.Brands.Queries.GetBrands;
using Ramsha.Application.Wrappers;

namespace Ramsha.Api.Controllers.v1;


[ApiVersion("1.0")]
public class BrandsController : BaseApiController
{
    [HttpGet]
    public async Task<BaseResult<List<BrandDto>>> GetBrands()
   => await Mediator.Send(new GetBrandsQuery());

    [HttpGet("{id}")]
    public async Task<BaseResult<BrandDto>> GetBrand(Guid id)
   => await Mediator.Send(new GetBrandQuery { Id = id });

    [HttpPost]
    public async Task<BaseResult<string>> CreateBrands(CreateBrandCommand command)
   => await Mediator.Send(command);

    [HttpPut("{id}")]
    public async Task<BaseResult> UpdateBrands(Guid id, UpdateBrandCommand command)
    {
        command.Id = id;
        return await Mediator.Send(command);
    }

    [HttpDelete("{id}")]
    public async Task<BaseResult> DeleteBrands(Guid id)
   => await Mediator.Send(new DeleteBrandCommand { Id = id });

}
