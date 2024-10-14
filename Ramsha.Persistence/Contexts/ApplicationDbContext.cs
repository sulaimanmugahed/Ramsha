using Microsoft.EntityFrameworkCore;

using Ramsha.Domain.Products.Entities;
using Ramsha.Domain.Common;
using Ramsha.Application.Contracts;
using Ramsha.Domain.Products;
using Ramsha.Domain.Customers.Entities;
using Ramsha.Domain.Suppliers.Entities;
using Ramsha.Domain.Inventory.Entities;
using Ramsha.Domain.Suppliers;
using Ramsha.Domain.Orders.Entities;
using MediatR;


namespace Ramsha.Persistence.Contexts;
public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, IAuthenticatedUserService authenticatedUserService, IPublisher publisher)
    : DbContext(options)
{
    public DbSet<Product> Products { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Supplier> Suppliers { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<SupplyRequest> SupplyRequests { get; set; }
    public DbSet<InventoryItem> InventoryItems { get; set; }
    public DbSet<Basket> Baskets { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Option> Options { get; set; }
    public DbSet<Coupon> Coupons { get; set; }
    public DbSet<ProductVariant> ProductVariant { get; set; }
    public DbSet<Rating> Ratings { get; set; }
    public DbSet<Tag> Tags { get; set; }

    public DbSet<Brand> Brand { get; set; }



    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
    {
        var userId = Guid.Parse(authenticatedUserService.UserId ?? "00000000-0000-0000-0000-000000000000");

        foreach (var entry in ChangeTracker.Entries())
        {
            if (entry.Entity is IAuditable auditableEntity)
            {
                switch (entry.State)
                {
                    case EntityState.Added:
                        auditableEntity.Create(userId);
                        break;
                    case EntityState.Modified:
                        auditableEntity.Update(userId);
                        break;
                }
            }

            if (entry.Entity is ISoftDeletable fakeDeletableEntity && entry.State == EntityState.Deleted)
            {
                entry.State = EntityState.Modified;
                fakeDeletableEntity.Delete(userId);
            }
        }

        var result = await base.SaveChangesAsync(cancellationToken);

        await PublishDomainEventsAsync();

        return result;
    }

    private async Task PublishDomainEventsAsync()
    {
        // Get all domain events from all entities
        var domainEntities = ChangeTracker
            .Entries<BaseEntity>()
            .Where(e => e.Entity.DomainEvents.Any())
            .Select(e => e.Entity)
            .ToList();

        foreach (var entity in domainEntities)
        {
            var events = entity.DomainEvents.ToList();
            entity.ClearDomainEvent();

            foreach (var domainEvent in events)
            {
                await publisher.Publish(domainEvent);
            }
        }
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {

        foreach (var property in builder.Model.GetEntityTypes()
        .SelectMany(t => t.GetProperties())
        .Where(p => p.ClrType == typeof(decimal) || p.ClrType == typeof(decimal?)))
        {
            property.SetColumnType("decimal(18,6)");
        }
        builder.ApplyConfigurationsFromAssembly(GetType().Assembly);

        builder.HasDefaultSchema("Core");

        builder.Ignore<BaseEntity>();




        builder.Entity<Brand>(entity =>
     {
         entity.HasKey(b => b.Id);

         entity.Property(x => x.Id)
        .HasConversion(id => id.Value, value => new BrandId(value));

         entity.Property(b => b.Name)
               .IsRequired()
               .HasMaxLength(100);

         // Relationship: Brand has many products
         entity.HasMany(b => b.Products)
               .WithOne(p => p.Brand)
               .HasForeignKey(p => p.BrandId)
               .OnDelete(DeleteBehavior.Restrict); // Prevent cascade delete if desired
     });


        /// 
        builder.Entity<Rating>(builder =>
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id)
          .HasConversion(id => id.Value, value => new RatingId(value));

            builder
                .HasOne<Product>()
                .WithMany(pv => pv.Ratings)
                .HasForeignKey(r => r.ProductId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        //tags

        builder.Entity<Tag>(entity =>
       {
           entity.HasKey(b => b.Id);

           entity.Property(x => x.Id)
          .HasConversion(id => id.Value, value => new TagId(value));

       });

        builder.Entity<ProductTag>(entity =>
        {
            entity.HasKey(pt => new { pt.ProductId, pt.TagId });

            entity
                 .HasOne(pt => pt.Product)
                 .WithMany(p => p.Tags)
                 .HasForeignKey(pt => pt.ProductId);

            entity
                .HasOne(pt => pt.Tag)
                .WithMany(t => t.ProductTags)
                .HasForeignKey(pt => pt.TagId);

            entity.HasQueryFilter(x => !x.Product.IsDeleted);



        });




        builder.Entity<Coupon>(builder =>
        {
            builder.ToTable("Coupons");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id)
            .HasConversion(id => id.Value, value => new CouponId(value));
        });

        builder.Entity<SupplyRequestItem>(builder =>
        {
            builder.HasOne(x => x.SupplyRequest)
            .WithMany(x => x.Items)
            .HasForeignKey(x => x.SupplyRequestId);

            builder.HasOne(x => x.Product)
            .WithMany()
            .HasForeignKey(x => x.ProductId);

            builder.HasOne(x => x.ProductVariant)
            .WithMany()
            .HasForeignKey(x => new { x.ProductId, x.ProductVariantId });

            builder.HasQueryFilter(x => !x.Product.IsDeleted);


            builder.Property(sr => sr.Id)
          .HasConversion(id => id.Value, value => new SupplyRequestItemId(value));
        });

        builder.Entity<Option>()
        .HasKey(o => o.Id);

        builder.Entity<Option>()
        .Property(o => o.Id)
        .HasConversion(id => id.Value, value => new OptionId(value));

        builder.Entity<OptionValue>()
       .Property(o => o.Id)
       .HasConversion(id => id.Value, value => new OptionValueId(value));





        builder.Entity<OptionValue>()
        .HasKey(ov => new { ov.OptionId, ov.Id });

        builder.Entity<ProductOption>()
        .HasKey(po => new { po.ProductId, po.OptionId });
        builder.Entity<ProductOption>()
       .HasQueryFilter(x => !x.Product.IsDeleted);

        builder.Entity<ProductVariant>()
        .HasKey(pv => new { pv.ProductId, pv.Id });
        builder.Entity<ProductVariant>()
              .Property(o => o.Id)
              .HasConversion(id => id.Value, value => new ProductVariantId(value));

        builder.Entity<ProductVariant>()
        .HasQueryFilter(x => !x.Product.IsDeleted);





        builder.Entity<VariantValue>()
        .HasKey(vv => new { vv.ProductId, vv.ProductVariantId, vv.OptionId, vv.OptionValueId });

        builder.Entity<VariantValue>()
        .HasQueryFilter(x => !x.ProductVariant.Product.IsDeleted);


        builder.Entity<Option>()
        .HasMany(o => o.OptionValues)
        .WithOne(ov => ov.Option)
        .HasForeignKey(ov => ov.OptionId)
         .OnDelete(DeleteBehavior.Cascade);


        builder.Entity<VariantValue>()
        .HasOne(vv => vv.ProductVariant)
        .WithMany(vv => vv.VariantValues)
        .HasForeignKey(vv => new { vv.ProductId, vv.ProductVariantId })
         .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<VariantValue>()
        .HasOne(vv => vv.OptionValue)
        .WithMany()
        .HasForeignKey(vv => new { vv.OptionId, vv.OptionValueId })
         .OnDelete(DeleteBehavior.Restrict);




        //InventoryItem
        builder.Entity<InventoryItem>(builder =>
        {
            builder.HasKey(ii => ii.Id);

            builder.Property(x => x.Id)
            .HasConversion(id => id.Value, value => new Domain.Inventory.InventoryItemId(value));


            builder
                .HasOne(x => x.Product)
                .WithMany(x => x.Inventories)
                .HasForeignKey(ii => ii.ProductId);

            builder.HasQueryFilter(x => !x.Product.IsDeleted);


            builder.HasQueryFilter(x => !x.Supplier.IsDeleted);

            builder
                .HasOne(x => x.Supplier)
                .WithMany()
                .HasForeignKey(ii => ii.SupplierId);

            builder
           .HasOne(x => x.ProductVariant)
           .WithMany(x => x.InventoryItems)
           .HasForeignKey(ii => new { ii.ProductId, ii.ProductVariantId })
           .OnDelete(DeleteBehavior.Restrict);


            builder
           .OwnsMany(x => x.Discounts);

            builder
           .OwnsMany(x => x.Prices);

        });






        // SupplyRequest
        builder.Entity<SupplyItem>(builder =>
        {
            builder.HasKey(sri => sri.Id);
            builder.Property(x => x.Id)
            .HasConversion(id => id.Value, value => new SupplyItemId(value));
            builder.OwnsOne(sri => sri.ItemSupplied, sp =>
            {
                sp.Property(x => x.ProductId)
               .HasConversion(id => id.Value, value => new ProductId(value));

                sp.Property(x => x.ProductVariantId)
                .HasConversion(id => id.Value, value => new ProductVariantId(value));
            });
        });



        builder.Entity<Order>(builder =>
        {
            builder.HasOne(x => x.Customer)
            .WithMany()
            .HasForeignKey(x => x.CustomerId);

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
            .HasConversion(id => id.Value, value => new Domain.Orders.OrderId(value));

            builder.HasQueryFilter(x => !x.Customer.IsDeleted);

            builder.OwnsOne(x => x.ShippingAddress);
        });


        builder.Entity<OrderItem>(builder =>
        {
            builder.OwnsOne(x => x.ItemOrdered, item =>
            {
                item.Property(i => i.InventoryItemId)
                .HasConversion(id => id.Value, value => new Domain.Inventory.InventoryItemId(value));
            });
        });


        // SupplyRequest
        builder.Entity<SupplyRequest>(builder =>
        {
            builder.Property(sr => sr.Id)
           .HasConversion(id => id.Value, value => new SupplyRequestId(value));

        });

        builder.Entity<Supply>(builder =>
         {
             builder.Property(sr => sr.Id)
         .HasConversion(id => id.Value, value => new SupplyId(value));

             builder.HasOne(x => x.Supplier)
             .WithMany(x => x.Supplies)
             .HasForeignKey(x => x.SupplierId);

             builder.HasQueryFilter(x => !x.Supplier.IsDeleted);


             builder.Property(x => x.SupplierId)
             .HasConversion(id => id.Value, value => new SupplierId(value));
         });




        // Category
        builder.Entity<Category>()
        .Property(sr => sr.Id)
        .HasConversion(id => id.Value, value => new CategoryId(value));

        builder.Entity<Category>()
        .HasOne(c => c.ParentCategory)
        .WithMany(c => c.SubCategories)
        .HasForeignKey(c => c.ParentCategoryId)
        .OnDelete(DeleteBehavior.Restrict);


        builder.Entity<ProductVariant>()
          .HasMany(pv => pv.Images)
          .WithOne()
          .HasForeignKey(pi => new { pi.ProductId, pi.ProductVariantId })
          .OnDelete(DeleteBehavior.Cascade);




        builder.Entity<InventoryItemImage>()
        .HasOne(x => x.InventoryItem)
        .WithMany(x => x.InventoryItemImages)
        .HasForeignKey(i => i.InventoryItemId);



        base.OnModelCreating(builder);
    }

}


