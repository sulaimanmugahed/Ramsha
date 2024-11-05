
using Ramsha.Domain.Suppliers;
using Ramsha.Domain.Suppliers.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Ramsha.Persistence.Contexts.Configurations;
internal class SupplierConfigurations : IEntityTypeConfiguration<Supplier>
{
	public void Configure(EntityTypeBuilder<Supplier> builder)
	{

		builder
			  .ToTable("Suppliers", schema: "Core");

		builder
		 .HasKey(p => p.Id);

		builder
			.Property(p => p.Id)
			.HasConversion(id => id.Value, value => new SupplierId(value));

		builder.HasOne(x => x.Address)
		.WithOne()
		.HasForeignKey<SupplierAddress>(x => x.Id)
		.OnDelete(DeleteBehavior.Restrict);


		builder
			.HasQueryFilter(p => !p.IsDeleted);
	}
}
