

namespace Ramsha.Application.Contracts.Persistence;
public class DistanceService : IDistanceService
{
    private const double EarthRadiusKm = 6371.0;

    public double CalculateDistance(double lat1 = 40.7128, double lon1 = -74.0060, double lat2 = 34.0522, double lon2 = -118.2437)
    {
        var dLat = ToRadians(lat2 - lat1);
        var dLon = ToRadians(lon2 - lon1);

        var a =
            Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
            Math.Cos(ToRadians(lat1)) * Math.Cos(ToRadians(lat2)) *
            Math.Sin(dLon / 2) * Math.Sin(dLon / 2);

        var c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));
        return EarthRadiusKm * c; // Distance in km
    }

    private static double ToRadians(double angle)
    {
        return angle * Math.PI / 180;
    }
}

