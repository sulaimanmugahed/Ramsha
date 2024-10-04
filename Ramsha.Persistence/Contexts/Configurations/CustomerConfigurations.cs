using Ramsha.Domain.Customers;
using Ramsha.Domain.Customers.Entities;
using Ramsha.Domain.Products;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ramsha.Persistence.Contexts.Configurations;
internal class CustomerConfigurations : IEntityTypeConfiguration<Customer>
{
	public void Configure(EntityTypeBuilder<Customer> builder)
	{
		builder
			  .ToTable("Customers", schema: "Core");

		builder
		 .HasKey(p => p.Id);

		builder
			.Property(p => p.Id)
			.HasConversion(id => id.Value, value => new CustomerId(value));

		builder
			.HasQueryFilter(p => !p.IsDeleted);

		builder.HasOne(x => x.Address)
		.WithOne()
		.HasForeignKey<CustomerAddress>(x => x.Id)
		.OnDelete(DeleteBehavior.Restrict);


	}
}
