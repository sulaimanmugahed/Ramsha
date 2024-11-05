


using Ramsha.Application.Services;

const decimal BaseDeliveryFee = 1.00m;
const decimal DistanceRate = 0.10m;
const decimal WeightRate = 0.50m;
const decimal ExpressSurcharge = 2.00m;


var taizCoord = (13.575392728091156, 44.02151487642243);
var ibbCoord = (13.971916812653864, 44.16244421103169);


var distance = CalculateDistance(taizCoord, ibbCoord);
Console.WriteLine($"distance {distance}");


var fee = CalculateDeliveryFee(0.0108m, distance);

Console.WriteLine($"fee {fee}");





double CalculateDistance((double Latitude, double Longitude) coord1, (double Latitude, double Longitude) coord2)
{
    var R = 6371e3; // metres
    var lat1 = coord1.Latitude * Math.PI / 180;
    var lat2 = coord2.Latitude * Math.PI / 180;
    var deltaLat = (coord2.Latitude - coord1.Latitude) * Math.PI / 180;
    var deltaLon = (coord2.Longitude - coord1.Longitude) * Math.PI / 180;

    var a = Math.Sin(deltaLat / 2) * Math.Sin(deltaLat / 2) +
            Math.Cos(lat1) * Math.Cos(lat2) *
            Math.Sin(deltaLon / 2) * Math.Sin(deltaLon / 2);
    var c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));

    var distance = R * c; // in meters
    return distance / 1000; // return distance in meters
}

//  "BaseDeliveryFee": 1.00,
//     "WeightRate": 0.50,
//     "DistanceRate": 0.10,
//     "ExpressSurcharge": 2.00




decimal CalculateDeliveryFee(decimal shippingWeight, double distance, bool isExpress = false)
{
    decimal totalFee = BaseDeliveryFee;
    totalFee += shippingWeight * WeightRate;
    totalFee += (decimal)distance * DistanceRate;

    if (isExpress)
    {
        totalFee += ExpressSurcharge;
    }

    return totalFee;
}



