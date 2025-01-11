using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Brands.Commands.DeleteBrand;

public class DeleteBrandCommandHandler(
        IBrandRepository brandRepository,
    IUnitOfWork unitOfWork
) : IRequestHandler<DeleteBrandCommand, BaseResult>
{
    public async Task<BaseResult> Handle(DeleteBrandCommand request, CancellationToken cancellationToken)
    {
        var existBrand = await brandRepository.GetByIdAsync(new Domain.Products.BrandId(request.Id));
        if (existBrand is null)
            return new Error(ErrorCode.RequestedDataNotExist, "no brand with this id");

        brandRepository.Delete(existBrand);
        await unitOfWork.SaveChangesAsync();

        return BaseResult.Ok();
    }
}
