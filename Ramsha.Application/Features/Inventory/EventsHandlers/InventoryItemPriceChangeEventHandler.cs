using MediatR;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Domain.Inventory.Events;

namespace Ramsha.Application.Features.Inventory.EventsHandlers;

public class InventoryItemPriceChangeEventHandler(
    IProductRepository productRepository,
    IUnitOfWork unitOfWork
)
: INotificationHandler<InventoryItemPriceChangeEvent>
{
    public async Task Handle(InventoryItemPriceChangeEvent notification, CancellationToken cancellationToken)
    {
        var product = await productRepository.GetAsync(
            x => x.Id == notification.ProductId,
            x => x.Variants);

        if (product == null) return;

        if (notification.ProductVariantId is not null)
        {
            var variant = product.Variants.FirstOrDefault(x => x.Id == notification.ProductVariantId);
            if (variant == null) return;

            variant.UpdatePrice(notification.RetailPrice.Amount, notification.FinalPrice.Amount);
            product.UpdatePriceFromVariants();
        }
        else
        {
            product.UpdatePrice(notification.RetailPrice.Amount, notification.FinalPrice.Amount);
        }

        await unitOfWork.SaveChangesAsync();
    }
}
