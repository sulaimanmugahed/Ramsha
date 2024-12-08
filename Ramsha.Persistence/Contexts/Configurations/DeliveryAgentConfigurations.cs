using Ramsha.Domain.Customers;
using Ramsha.Domain.Customers.Entities;
using Ramsha.Domain.Products;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Ramsha.Domain.DeliveryAgents;

namespace Ramsha.Persistence.Contexts.Configurations;
internal class DeliveryAgentConfigurations : IEntityTypeConfiguration<DeliveryAgent>
{
	public void Configure(EntityTypeBuilder<DeliveryAgent> builder)
	{
		builder
			  .ToTable("DeliveryAgents", schema: "Core");

		builder
		 .HasKey(p => p.Id);

		builder
			.Property(p => p.Id)
			.HasConversion(id => id.Value, value => new DeliveryAgentId(value));

		builder
			.HasQueryFilter(p => !p.IsDeleted);

	}
}
