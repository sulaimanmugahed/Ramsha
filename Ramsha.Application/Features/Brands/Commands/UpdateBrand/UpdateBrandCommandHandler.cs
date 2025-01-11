using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Brands.Commands.UpdateBrand;

public class UpdateBrandCommandHandler(
    IBrandRepository brandRepository,
    IUnitOfWork unitOfWork
) : IRequestHandler<UpdateBrandCommand, BaseResult>
{
    public async Task<BaseResult> Handle(UpdateBrandCommand request, CancellationToken cancellationToken)
    {
        var existBrand = await brandRepository.GetByIdAsync(new Domain.Products.BrandId(request.Id));
        if (existBrand is null)
            return new Error(ErrorCode.RequestedDataNotExist, "no brand with this id");

        existBrand.Update(request.Name);
        await unitOfWork.SaveChangesAsync();

        return BaseResult.Ok();
    }
}
