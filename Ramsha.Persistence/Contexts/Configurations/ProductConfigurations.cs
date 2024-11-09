using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Ramsha.Domain.Products;
using Ramsha.Domain.Products.Entities;


namespace Ramsha.Persistence.Contexts.Configurations;
public class ProductConfigurations : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder
              .ToTable("Products", schema: "Core");

        builder
            .HasKey(p => p.Id);

        builder
            .Property(p => p.Id)
            .HasConversion(id => id.Value, value => new ProductId(value));

        builder.Property(p => p.BrandId)
            .HasConversion(
                v => v.Value,
                v => new BrandId(v)
            );


        builder
        .HasOne(p => p.Category)
        .WithMany(c => c.Products)
        .HasForeignKey(p => p.CategoryId);


        // builder
        //   .HasMany<ProductImage>()
        //   .WithOne()
        //   .HasForeignKey(p=> p.ProductId)
        //   .OnDelete(DeleteBehavior.Cascade);


        builder.OwnsOne(p => p.SeoSettings, seo =>
        {
            seo.Property(s => s.MetaTitle).HasColumnName("SeoSettings_MetaTitle");
            seo.Property(s => s.MetaDescription).HasColumnName("SeoSettings_MetaDescription");
            seo.Property(s => s.Keywords).HasColumnName("SeoSettings_Keywords");
            seo.Property(s => s.UrlSlug).HasColumnName("SeoSettings_UrlSlug");
        });

        ////

        ////

        builder
            .HasQueryFilter(p => !p.IsDeleted);

    }
}

