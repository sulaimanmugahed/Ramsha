
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Suppliers;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Suppliers.Entities;
using Ramsha.Domain.Suppliers.Enums;
using MediatR;

namespace Ramsha.Application.Features.Suppliers.Commands.SendSupplyRequest;

public class SendSupplyRequestCommandHandler(

    ISupplyRequestRepository supplyRequestRepository,
    IAuthenticatedUserService authenticatedUser,
    ISupplierRepository supplierRepository,
    ISupplyRepository supplyRepository,
    IUnitOfWork unitOfWork
) : IRequestHandler<SendSupplyRequestCommand, BaseResult>
{
    public async Task<BaseResult> Handle(SendSupplyRequestCommand request, CancellationToken cancellationToken)
    {
        if (authenticatedUser.UserName is null)
            return new Error(ErrorCode.ErrorInIdentity);

        var supplyRequest = await supplyRequestRepository.GetWithDetails(
           x => x.Supplier == authenticatedUser.UserName);

        if (supplyRequest is null)
            return new Error(ErrorCode.EmptyData);

        var supply = Supply.Create(authenticatedUser.UserName, request.Currency);
        int totalQuantity = 0;
        decimal totalPrice = 0;



        foreach (var item in supplyRequest.Items)
        {
            var itemSupplied = new ItemSupplied(item.ProductId, item.ProductVariantId, item.Product.Name, item.SupplierVariant.Code);
            var supplyItem = SupplyItem.Create(itemSupplied, item.SupplierVariant.WholesalePrice, item.Quantity);
            supply.AddItem(supplyItem);
            totalQuantity += item.Quantity;
            totalPrice += item.SupplierVariant.WholesalePrice * item.Quantity;
        }
        supply.SetTotal(totalPrice, totalQuantity);

        await supplyRepository.AddAsync(supply);

        supplyRequestRepository.Delete(supplyRequest);

        await unitOfWork.SaveChangesAsync();

        return BaseResult.Ok();
    }
}
