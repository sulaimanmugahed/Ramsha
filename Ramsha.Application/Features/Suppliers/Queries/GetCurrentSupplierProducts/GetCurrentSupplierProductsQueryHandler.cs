using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Suppliers;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Products.Entities;

namespace Ramsha.Application.Features.Suppliers.Queries.GetCurrentSupplierProducts;

public class GetCurrentSupplierProductsQueryHandler(
    ISupplierProductRepository supplierProductRepository,
    ISupplierRepository supplierRepository,
    IAuthenticatedUserService authenticatedUserService,
    IHttpService httpService
) : IRequestHandler<GetCurrentSupplierProductsQuery, BaseResult<List<SupplierProductDto>>>
{
    public async Task<BaseResult<List<SupplierProductDto>>> Handle(GetCurrentSupplierProductsQuery request, CancellationToken cancellationToken)
    {
        var supplier = await supplierRepository.GetAsync(x => x.Username == authenticatedUserService.UserName);
        if (supplier is null)
            return new Error(ErrorCode.ErrorInIdentity);

        var result = await supplierProductRepository.GetPaged(supplier.Id, request.PaginationParams);

        httpService.AddPagedHeader(result.MetaData);

        return result.Data;

    }
}
