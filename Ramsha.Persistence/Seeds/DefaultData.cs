


using Ramsha.Domain.Products;
using Ramsha.Domain.Products.Entities;
using Ramsha.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Ramsha.Application.Contracts;

namespace Ramsha.Persistence.Seeds;

public class DefaultData
{
    public static async Task SeedAsync(ApplicationDbContext context, ILogger<DefaultData> logger, ICodeGenerator codeGenerator)
    {
        context.Database.EnsureCreated();

        if (!context.Brand.Any())
        {
            var brands = new List<Brand>([

    new Brand { Id = new BrandId(Guid.NewGuid()), Name = "Nike" },
    new Brand { Id = new BrandId(Guid.NewGuid()), Name = "Adidas" },
    new Brand { Id = new BrandId(Guid.NewGuid()), Name = "Puma" },
    new Brand { Id = new BrandId(Guid.NewGuid()), Name = "Reebok" },
    new Brand { Id = new BrandId(Guid.NewGuid()), Name = "Under Armour" },
    new Brand { Id = new BrandId(Guid.NewGuid()), Name = "New Balance" },
    new Brand { Id = new BrandId(Guid.NewGuid()), Name = "ASICS" },
    new Brand { Id = new BrandId(Guid.NewGuid()), Name = "Converse" },
    new Brand { Id = new BrandId(Guid.NewGuid()), Name = "Vans" },
    new Brand { Id = new BrandId(Guid.NewGuid()), Name = "Skechers" },
    new Brand { Id = new BrandId(Guid.NewGuid()), Name = "Fila" },
    new Brand { Id = new BrandId(Guid.NewGuid()), Name = "Hoka One One" },
    new Brand { Id = new BrandId(Guid.NewGuid()), Name = "Lululemon" },
    new Brand { Id = new BrandId(Guid.NewGuid()), Name = "Salomon" },
    new Brand { Id = new BrandId(Guid.NewGuid()), Name = "Brooks" },
    new Brand { Id = new BrandId(Guid.NewGuid()), Name = "Saucony" },
    new Brand { Id = new BrandId(Guid.NewGuid()), Name = "Timberland" },
    new Brand { Id = new BrandId(Guid.NewGuid()), Name = "Columbia Sportswear" },
    new Brand { Id = new BrandId(Guid.NewGuid()), Name = "Patagonia" },
    new Brand { Id = new BrandId(Guid.NewGuid()), Name = "North Face" },
    new Brand { Id = new BrandId(Guid.NewGuid()), Name = "Merrell" },
    new Brand { Id = new BrandId(Guid.NewGuid()), Name = "Arc'teryx" },
    new Brand { Id = new BrandId(Guid.NewGuid()), Name = "Helly Hansen" },
    new Brand { Id = new BrandId(Guid.NewGuid()), Name = "Mizuno" }


            ]);

            await context.Brand.AddRangeAsync(brands);
        }


        if (!context.Categories.Any())
        {
            logger.LogInformation("seeding categories ...");
            Dictionary<string, List<string>> categories = new()
            {
                {"Electronic",["Mobiles", "Laptops", "Speakers"]},
                { "Furniture",["Sofas", "Beds", "Tables", "Chairs", "Wardrobes"]},
                { "Clothing", ["Men's Wear", "Women's Wear", "Kids' Wear", "Footwear", "Accessories"] },
            };

            foreach (var category in categories.Keys)
            {
                var categoryToAdd = Category.Create(category);
                categoryToAdd.SetCode(codeGenerator.GenerateCategoryCode(categoryToAdd.Id.Value));

                foreach (var child in categories[category])
                {
                    var childTpAdd = Category.Create(child);
                    childTpAdd.SetCode(codeGenerator.GenerateCategoryCode(childTpAdd.Id.Value));
                    categoryToAdd.AddChild(childTpAdd);
                }

                await context.Categories.AddAsync(categoryToAdd);
            }
            await context.SaveChangesAsync();
            logger.LogInformation("seeding categories Completed");

        }

        if (!context.Options.Any())
        {
            logger.LogInformation("seeding Options ...");

            Dictionary<string, List<string>> options = new()
            {
                {"Size",["Large", "Medium", "Small"]},
                {"Color",["Red", "Green", "Yellow"]},
                { "Material", [ "Cotton", "Polyester", "Wool", "Leather", "Nylon" ]},
            };

            foreach (var option in options.Keys)
            {
                var optionToAdd = Option.Create(option);
                optionToAdd.AddValues(options[option]);

                await context.Options.AddAsync(optionToAdd);
            }

            await context.SaveChangesAsync();
            logger.LogInformation("seeding options Completed");

        }

        if (!context.Tags.Any())
        {
            logger.LogInformation("seeding tags ...");

            var electronicsTagId = new TagId(Guid.NewGuid());
            var fashionTagId = new TagId(Guid.NewGuid());
            var homeAppliancesTagId = new TagId(Guid.NewGuid());
            var booksTagId = new TagId(Guid.NewGuid());
            var sportsTagId = new TagId(Guid.NewGuid());
            var toysTagId = new TagId(Guid.NewGuid());
            var healthBeautyTagId = new TagId(Guid.NewGuid());
            var automotiveTagId = new TagId(Guid.NewGuid());
            var groceryTagId = new TagId(Guid.NewGuid());
            var officeSuppliesTagId = new TagId(Guid.NewGuid());
            var homeDecorTagId = new TagId(Guid.NewGuid());
            var outdoorTagId = new TagId(Guid.NewGuid());
            var bagsTagId = new TagId(Guid.NewGuid());
            var jewelryTagId = new TagId(Guid.NewGuid());
            var musicTagId = new TagId(Guid.NewGuid());
            var gamingTagId = new TagId(Guid.NewGuid());
            var petsTagId = new TagId(Guid.NewGuid());
            var stationeryTagId = new TagId(Guid.NewGuid());

            var tags = new List<Tag>([
                 new Tag { Id = electronicsTagId, Name = "Electronics" },
            new Tag { Id = fashionTagId, Name = "Fashion" },
            new Tag { Id = homeAppliancesTagId, Name = "Home Appliances" },
            new Tag { Id = booksTagId, Name = "Books" },
            new Tag { Id = sportsTagId, Name = "Sports" },
            new Tag { Id = toysTagId, Name = "Toys" },
            new Tag { Id = healthBeautyTagId, Name = "Health & Beauty" },
            new Tag { Id = automotiveTagId, Name = "Automotive" },
            new Tag { Id = groceryTagId, Name = "Grocery" },
            new Tag { Id = officeSuppliesTagId, Name = "Office Supplies" },
            new Tag { Id = homeDecorTagId, Name = "Home Decor" },
            new Tag { Id = outdoorTagId, Name = "Outdoor" },
            new Tag { Id = bagsTagId, Name = "Bags" },
            new Tag { Id = jewelryTagId, Name = "Jewelry" },
            new Tag { Id = musicTagId, Name = "Music" },
            new Tag { Id = gamingTagId, Name = "Gaming" },
            new Tag { Id = petsTagId, Name = "Pets" },
            new Tag { Id = stationeryTagId, Name = "Stationery" }
            ]);

            await context.Tags.AddRangeAsync(tags);
        }

        // if (!context.Products.Any())
        // {
        //     logger.LogInformation("seeding Products ...");

        //     var options = await context.Options.Include(o => o.OptionValues).ToListAsync();
        //     var categories = await context.Categories
        //     .Where(x => x.ParentCategoryId == null)
        //     .Include(x => x.SubCategories)
        //     .ToListAsync();

        //     for (var index = 0; index < categories.Count; index++)
        //     {
        //         var productCategory = categories[index].SubCategories.First();
        //         var product = Product.Create($"{index} - Product Name", $"This Product join {productCategory.Name} group");
        //         product.SetCategory(productCategory.Id);

        //         foreach (var option in options)
        //         {
        //             product.AddOption(option.Id);
        //         }
        //         await context.Products.AddAsync(product);
        //     }

        await context.SaveChangesAsync();
        logger.LogInformation("seeding products Completed");

        // }

    }
}

