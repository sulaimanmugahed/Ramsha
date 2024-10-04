using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Inventory;
using Ramsha.Domain.Inventory.Entities;
using Ramsha.Domain.Orders.Entities;
using MediatR;

namespace Ramsha.Application.Features.Orders.Commands.CreateOrder;

public class CreateOrderCommandHandler(
    IBasketRepository basketRepository,
    IInventoryItemRepository inventoryItemRepository,
    IUnitOfWork unitOfWork,
    IAuthenticatedUserService authenticatedUser
) : IRequestHandler<CreateOrderCommand, BaseResult<string>>
{
    public async Task<BaseResult<string>> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
    {
        var basket = await basketRepository.FindByBuyer(authenticatedUser.UserName);
        if (basket is null)
            return new Error(ErrorCode.EmptyData);

        foreach (var item in basket.Items)
        {
            var inventoryItem = await inventoryItemRepository.GetWithDetails(
                x => x.Id == item.InventoryItemId
            );

            if (inventoryItem is null)
                return new Error(ErrorCode.EmptyData);

            var itemOrdered = new ProductItemOrdered(
                item.InventoryItemId,
                inventoryItem.ProductName,
                inventoryItem.InventorySKU,
                inventoryItem.ImageUrl
            );

            // var finalProductPrice = 

            var orderItem = new OrderItem(itemOrdered, 5, 5);






        }

        return "";
    }
}
