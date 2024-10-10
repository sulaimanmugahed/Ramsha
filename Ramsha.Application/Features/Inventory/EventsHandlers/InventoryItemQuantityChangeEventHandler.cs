using MediatR;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Domain.Inventory.Events;

namespace Ramsha.Application.Features.Inventory.EventsHandlers;

public class InventoryItemQuantityChangeEventHandler(
    IProductRepository productRepository,
    IUnitOfWork unitOfWork
) : INotificationHandler<InventoryItemQuantityChangeEvent>
{

    public async Task Handle(InventoryItemQuantityChangeEvent notification, CancellationToken cancellationToken)
    {
        var product = await productRepository.GetAsync(
            x => x.Id == notification.ProductId,
            x => x.Variants,
            x => x.Inventories);

        if (product == null) return;

        if (notification.ProductVariantId is not null)
        {
            var variant = product.Variants.FirstOrDefault(x => x.Id == notification.ProductVariantId);
            if (variant == null) return;

            variant.AdjustQuantity(notification.QuantityChange);
            product.UpdateQuantityFromInventories();
        }
        else
        {
            product.AdjustQuantity(notification.QuantityChange);
        }

        await unitOfWork.SaveChangesAsync();
    }


}
