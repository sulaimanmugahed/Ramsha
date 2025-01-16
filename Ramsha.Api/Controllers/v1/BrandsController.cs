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

/// <summary>
/// Manages brand-related operations.
/// </summary>
[ApiVersion("1.0")]
public class BrandsController : BaseApiController
{
    /// <summary>
    /// Retrieves all brands.
    /// </summary>
    /// <remarks>
    /// This endpoint returns a list of all available brands.
    /// </remarks>
    [HttpGet]
    public async Task<BaseResult<List<BrandDto>>> GetBrands()
   => await Mediator.Send(new GetBrandsQuery());

    /// <summary>
    /// Retrieves a specific brand by ID.
    /// </summary>
    /// <remarks>
    /// This endpoint returns the details of a brand identified by its unique ID.
    /// </remarks>

    [HttpGet("{id}")]
    public async Task<BaseResult<BrandDto>> GetBrand(Guid id)
   => await Mediator.Send(new GetBrandQuery { Id = id });


    /// <summary>
    /// Creates a new brand.
    /// </summary>
    /// <remarks>
    /// This endpoint creates a new brand with the provided details.
    /// Returns the ID of the newly created brand.
    /// </remarks>
    [HttpPost]
    public async Task<BaseResult<string>> CreateBrand(CreateBrandCommand command)
   => await Mediator.Send(command);

    /// <summary>
    /// Updates an existing brand.
    /// </summary>
    /// <remarks>
    /// This endpoint updates the details of an existing brand identified by its ID.
    /// </remarks>
    [HttpPut("{id}")]
    public async Task<BaseResult> UpdateBrand(Guid id, UpdateBrandCommand command)
    {
        command.Id = id;
        return await Mediator.Send(command);
    }

    /// <summary>
    /// Deletes a brand by ID.
    /// </summary>
    /// <remarks>
    /// This endpoint deletes a brand identified by its unique ID.
    /// </remarks>
    [HttpDelete("{id}")]
    public async Task<BaseResult> DeleteBrand(Guid id)
   => await Mediator.Send(new DeleteBrandCommand { Id = id });

}
