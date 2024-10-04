using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Ramsha.Domain.Baskets.Entities;
namespace Ramsha.Persistence.Contexts.Configurations;
internal class BasketItemConfigurations : IEntityTypeConfiguration<BasketItem>
{
	public void Configure(EntityTypeBuilder<BasketItem> builder)
	{
		builder.ToTable("BasketItems", "Core");

		builder.HasKey(x => new { x.InventoryItemId, x.BasketId });

		builder.HasOne(x => x.InventoryItem);

		builder.HasOne(x => x.Basket)
			.WithMany(x => x.Items)
			.HasForeignKey(x => x.BasketId);

	}
}
