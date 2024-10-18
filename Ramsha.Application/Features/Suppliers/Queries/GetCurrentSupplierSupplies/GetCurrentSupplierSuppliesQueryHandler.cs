using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Suppliers;
using Ramsha.Application.Wrappers;
using MediatR;

namespace Ramsha.Application.Features.Suppliers.Queries.GetSupplyRequestsBySupplier;

public class GetCurrentSupplierSuppliesQueryHandler(
    ISupplyRepository supplyRepository,
    IAuthenticatedUserService authenticatedUser,
    IHttpService httpService
) : IRequestHandler<GetCurrentSupplierSuppliesQuery, BaseResult<List<SupplyDto>>>
{
    public async Task<BaseResult<List<SupplyDto>>> Handle(GetCurrentSupplierSuppliesQuery request, CancellationToken cancellationToken)
    {
        if (authenticatedUser.UserName is null)
            return new Error(ErrorCode.ErrorInIdentity);

        var responseDto = await supplyRepository
        .GetSuppliesPaged(
            new()
            {
                PaginationParams = request.PaginationParams,
                FilterParams = request.FilterParams,
                SortingParams = request.SortingParams
            }, x => x.Supplier == authenticatedUser.UserName);

        responseDto.AddFilterMetaData(request.FilterParams);
        responseDto.AddSortingMetaData(request.SortingParams);
        httpService.AddPagedHeader(responseDto.MetaData);

        return responseDto.Data;
    }
}
