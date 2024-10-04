using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Domain;
using Ramsha.Domain.Inventory.Services;
using Ramsha.Domain.Products.Entities;
using Ramsha.Domain.Products.Enums;
using Microsoft.VisualBasic;

namespace Ramsha.Persistence.Repositories;

public class StudentRepository : IStudentRepository
{
    public List<Discount> Discounts { get; set; } = [];
    public decimal RetailPrice { get; private set; } = 5000m;
    public bool Create(Student student)
    {
        throw new NotImplementedException();
    }

    public bool Delete(Student student)
    {
        throw new NotImplementedException();
    }

    public Student Get(int id)
    {
        throw new NotImplementedException();
    }

    public List<Student> GetAll()
    {
        var studenst = StudentsDatabase();
        return studenst;
    }

    public decimal GetFinalPrice()
    {
        decimal finalPrice = RetailPrice;
        // Discounts.Add(Discount.Create(10m, DateTime.Now, DateTime.Now.AddDays(10), DiscountType.Percentage));
        // Discounts.Add(Discount.Create(500m, DateTime.Now, DateTime.Now.AddDays(10),  DiscountType.FixedAmount));
        // Discounts.Add(Discount.Create(10m, DateTime.Now, DateTime.Now.AddDays(10), 0, DiscountType.Percentage));
        // Discounts.Add(Discount.Create(5000m, DateTime.Now, DateTime.Now.AddDays(10), 0, DiscountType.FixedAmount));


        if (Discounts.Count > 0)
        {
            var discountChain = DiscountChain.Create();

            foreach (var discount in Discounts)
            {
                var strategy = DiscountStrategyFactory.Create(discount);

                if (strategy is not null)
                    discountChain.AddDiscount(strategy);

            }
            finalPrice = discountChain.ApplyDiscount(finalPrice);

        }
        return finalPrice;
    }

    private List<Student> StudentsDatabase()
    {
        return [
            new Student{
                Id = 1,
                Name = "fateh",
                Age = 29
                            },
                             new Student{
                Id = 2,
                Name = "saeed",
                Age = 9
                            }, new Student{
                Id = 3,
                Name = "abdo",
                Age = 19
                            },
        ];
    }
}
