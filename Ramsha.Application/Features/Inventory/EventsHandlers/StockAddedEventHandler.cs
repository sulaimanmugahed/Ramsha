using System.Security.Cryptography.X509Certificates;
using MediatR;
using Microsoft.Extensions.Options;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Domain.Inventory.Events;
using Ramsha.Domain.Settings;

namespace Ramsha.Application.Features.Inventory.EventsHandlers;
public class StockAddedEventHandler(
    IProductRepository productRepository,
    IOptionsSnapshot<GlobalAppSettings> settings,
    IUnitOfWork unitOfWork

) : INotificationHandler<StockAddedEvent>
{
    public async Task Handle(StockAddedEvent notification, CancellationToken cancellationToken)
    {
        var product = await productRepository
        .GetAsync(x => x.Id == notification.ProductId, x => x.Inventories);

        if (product == null) return;

        if (notification.ProductVariantId is not null)
        {
            var variant = await productRepository.GetVariant(notification.ProductId, notification.ProductVariantId);
            if (variant is null)
                return;

            variant.IncreaseQuantity(notification.Quantity);
            variant.UpdatePriceBasedOnStrategy(
                settings.Value.ProductPricingStrategy,
                product.Inventories.Where(x => x.ProductVariantId == variant.Id)
                .ToList());
        }

        product.UpdatePriceBasedOnStrategy(settings.Value.ProductPricingStrategy);
        product.IncreaseQuantity(notification.Quantity);

        await unitOfWork.SaveChangesAsync();
    }
}
