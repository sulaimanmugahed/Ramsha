﻿


using Ramsha.Domain.Products;
using Ramsha.Domain.Products.Entities;
using Ramsha.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Ramsha.Application.Contracts;
using Ramsha.Domain.Products.Enums;
using Ramsha.Domain.Common;

namespace Ramsha.Persistence.Seeds;

public class DefaultData
{
    public static async Task SeedAsync(ApplicationDbContext context, ILogger<DefaultData> logger, ICodeGenerator codeGenerator)
    {
        await context.Database.EnsureCreatedAsync();

        if (!context.Currencies.Any())
        {
            var currencies = Enum.GetValues(typeof(CurrencyCode))
            .Cast<CurrencyCode>()
            .Select(x => x)
            .ToArray();

            foreach (var currency in currencies)
            {
                var currencyRateToAdd = Currency.Create(currency, 1);
                await context.Currencies.AddAsync(currencyRateToAdd);
            }
            logger.LogInformation("seeding currencies Completed");

        }


        if (!context.Brand.Any())
        {
            List<string> brands = [
                "Nike",
"Adidas",
"Puma",
"Reebok",
"Under Armour",
"New Balance",
"ASICS",
"Converse",
"Vans",
"Skechers",
"Fila",
"Hoka One One",
"Lululemon",
"Salomon",
"Brooks",
"Saucony",
"Timberland",
"Columbia Sportswear",
"Patagonia",
"North Face",
"Merrell",
"Arc'teryx",
"Helly Hansen",
"Mizuno"
            ];


            foreach (var brand in brands)
            {
                await context.Brand.AddAsync(Brand.Create(brand));
            }
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

