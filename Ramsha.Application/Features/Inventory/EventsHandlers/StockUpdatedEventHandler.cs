using System.Security.Cryptography.X509Certificates;
using MediatR;
using Microsoft.Extensions.Options;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Domain.Common;
using Ramsha.Domain.Inventory.Events;
using Ramsha.Domain.Products.Services;
using Ramsha.Domain.Settings;

namespace Ramsha.Application.Features.Inventory.EventsHandlers;
public class StockAddedEventHandler(
    IProductRepository productRepository,
    IOptionsSnapshot<GlobalAppSettings> settings,
    IInventoryItemRepository inventoryItemRepository,
    IUnitOfWork unitOfWork

) : INotificationHandler<StockUpdatedEvent>
{
    public async Task Handle(StockUpdatedEvent notification, CancellationToken cancellationToken)
    {
        var product = await productRepository
        .GetAsync(x => x.Id == notification.ProductId);

        var inventories = await inventoryItemRepository.GetAllAsync(x => x.ProductId == notification.ProductId);

        if (product == null) return;
        var strategy = ProductPricingStrategyFactory.Create(settings.Value.ProductPricingStrategy);

        if (notification.ProductVariantId is not null)
        {
            var variant = await productRepository.GetVariant(notification.ProductId, notification.ProductVariantId);
            if (variant is null)
                return;

            var variantInventories = inventories

            .Where(x => x.ProductVariantId == variant.Id)
            .ToList();

            (Price variantBasePrice, Price variantFinalPrice) = strategy.CalculatePrice([.. variantInventories]) ?? (new(0),new(0));

            variant.UpdateQuantity(variantInventories
            .Sum(x => x.AvailableQuantity),
             variantInventories.Sum(x => x.AvailableQuantity));
            variant.UpdatePrice(variantBasePrice.Amount, variantFinalPrice.Amount);
        }

        (Price basePrice, Price finalPrice) = strategy.CalculatePrice([.. inventories]) ?? (new(0),new(0));

        product.UpdatePrice(basePrice.Amount, finalPrice.Amount);
        product.UpdateQuantity(inventories
              .Sum(x => x.AvailableQuantity),
               inventories.Sum(x => x.TotalQuantity));

        await unitOfWork.SaveChangesAsync();
    }
}
