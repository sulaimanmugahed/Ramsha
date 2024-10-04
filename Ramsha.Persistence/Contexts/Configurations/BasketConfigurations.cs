using Ramsha.Domain.Baskets;
using Ramsha.Domain.Customers.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Ramsha.Persistence.Contexts.Configurations;
public class BasketConfigurations : IEntityTypeConfiguration<Basket>
{
	public void Configure(EntityTypeBuilder<Basket> builder)
	{
		builder.ToTable("Baskets", "Core");

		builder.HasKey(x => x.Id);
		builder.Property(x => x.Id)
			.HasConversion(id => id.Value, value => new BasketId(value));

	}
}
