


using Ramsha.Application.Constants;
using Ramsha.Application.Services;
using Ramsha.Domain.Common;

const decimal BaseDeliveryFee = 1.00m;
const decimal DistanceRate = 0.10m;
const decimal WeightRate = 0.50m;
const decimal ExpressSurcharge = 2.00m;



var permissions = ApplicationPermissions.All();
foreach (var p in permissions)
{
    Console.WriteLine(p);
}



class Test
{
    public Price TestPrice { get; set; }
}

