


using Ramsha.Application.Services;
using Ramsha.Domain.Common;

const decimal BaseDeliveryFee = 1.00m;
const decimal DistanceRate = 0.10m;
const decimal WeightRate = 0.50m;
const decimal ExpressSurcharge = 2.00m;


List<Test> data = [
    new() { TestPrice = new Price(100) },
    new() { TestPrice = new Price(100,Ramsha.Domain.Products.Enums.Currency.SAR) },

    ];

foreach (var item in data)
{
    Console.WriteLine($"item Price: {item.TestPrice.ConvertTo(Ramsha.Domain.Products.Enums.Currency.SAR, 3.76m)}");
}


class Test
{
    public Price TestPrice { get; set; }
}

