using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Products.Entities;

namespace Ramsha.Application.Features.Brands.Commands.CreateBrand;

public class CreateBrandCommandHandler(
    IBrandRepository brandRepository,
    IUnitOfWork unitOfWork
) : IRequestHandler<CreateBrandCommand, BaseResult<string>>
{
    public async Task<BaseResult<string>> Handle(CreateBrandCommand request, CancellationToken cancellationToken)
    {
        var brand = Brand.Create(request.Name);

        await brandRepository.AddAsync(brand);

        await unitOfWork.SaveChangesAsync();

        return brand.Id.Value.ToString();
    }
}
