using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ramsha.Domain.Common;

public class GeoCoordinate
{
    public double Latitude { get; private set; }
    public double Longitude { get; private set; }

    public GeoCoordinate(double latitude, double longitude)
    {
        if (latitude < -90.0 || latitude > 90.0)
        {
            throw new ArgumentOutOfRangeException(nameof(latitude), "Latitude must be between -90 and 90 degrees.");
        }

        if (longitude < -180.0 || longitude > 180.0)
        {
            throw new ArgumentOutOfRangeException(nameof(longitude), "Longitude must be between -180 and 180 degrees.");
        }

        Latitude = latitude;
        Longitude = longitude;
    }

    // Override ToString for easier logging/debugging
    public override string ToString() => $"{Latitude}, {Longitude}";

    // Optionally, you can implement equality and hash code methods
    public override bool Equals(object? obj)
    {
        return obj is GeoCoordinate coordinate &&
               Latitude == coordinate.Latitude &&
               Longitude == coordinate.Longitude;
    }

    public override int GetHashCode()
    {
        return HashCode.Combine(Latitude, Longitude);
    }
}
