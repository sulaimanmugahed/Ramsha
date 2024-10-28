using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Products;
using Ramsha.Application.Dtos.Suppliers;
using Ramsha.Application.Extensions;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Suppliers.Queries.GetCurrentSupplierProductVariant;

public class GetCurrentSupplierProductVariantQueryHandler(
    ISupplierProductRepository supplierProductRepository,
    ISupplierRepository supplierRepository,
    IAuthenticatedUserService authenticatedUserService
) : IRequestHandler<GetCurrentSupplierProductVariantQuery, BaseResult<SupplierVariantDto?>>
{
    public async Task<BaseResult<SupplierVariantDto?>> Handle(GetCurrentSupplierProductVariantQuery request, CancellationToken cancellationToken)
    {
        var supplier = await supplierRepository.GetAsync(x => x.Username == authenticatedUserService.UserName);
        if (supplier is null)
            return new Error(ErrorCode.ErrorInIdentity);

        var variant = await supplierProductRepository.GetVariantDetail(
           supplier.Id,
           new Domain.Products.ProductId(request.ProductId),
           new Domain.Products.ProductVariantId(request.VariantId)
        );

        return variant?.AsSupplierVariantDto();
    }
}
