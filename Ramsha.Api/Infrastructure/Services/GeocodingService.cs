using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Ramsha.Application.Contracts;

namespace Ramsha.Api.Infrastructure.Services
{
    public class GeocodingService : IGeocodingService
    {
        public GeocodingService()
        {
        }

        public (double Latitude, double Longitude) GenerateRandomCoordinates(string location)
        {
            if (!LocationBounds.TryGetValue(location, out var bounds))
            {
                throw new ArgumentException($"Location '{location}' is not supported.");
            }

            Random random = new Random();
            double latitude = random.NextDouble() * (bounds.MaxLat - bounds.MinLat) + bounds.MinLat;
            double longitude = random.NextDouble() * (bounds.MaxLon - bounds.MinLon) + bounds.MinLon;

            return (latitude, longitude);
        }

        public async Task<(double Latitude, double Longitude)> GetCoordinatesAsync(string address)
        {
            var addressParts = address.Split(',');
            if (addressParts.Length < 2)
            {
                throw new ArgumentException("Address format is invalid. Expecting 'Street, City, Country'.");
            }

            var city = addressParts[1].Trim();

            if (!LocationBounds.ContainsKey(city))
            {
                throw new Exception("Address not found");
            }

            return GenerateRandomCoordinates(city);
        }

        public double CalculateDistance((double Latitude, double Longitude) coord1, (double Latitude, double Longitude) coord2)
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
            return distance / 1000; // return distance in km meters
        }

        public string GenerateRandomAddress()
        {
            Random random = new Random();
            var locationKeys = LocationBounds.Keys.ToList();
            var randomLocation = locationKeys[random.Next(locationKeys.Count)];

            var streetNumber = random.Next(1, 10000);
            var streetName = $"Main St";
            var city = randomLocation;
            var country = GetCountryFromLocation(randomLocation);

            return $"{streetNumber} {streetName}, {city}, {country}";
        }

        private string GetCountryFromLocation(string location)
        {
            return location switch
            {
                "New York City" => "USA",
                "Los Angeles" => "USA",
                "Chicago" => "USA",
                "Houston" => "USA",
                "Miami" => "USA",
                "Toronto" => "Canada",
                "Vancouver" => "Canada",
                "London" => "UK",
                "Tokyo" => "Japan",
                "Sydney" => "Australia",
                "Berlin" => "Germany",
                "Paris" => "France",
                "Rio de Janeiro" => "Brazil",
                "Mexico City" => "Mexico",
                "Istanbul" => "Turkey",
                "Moscow" => "Russia",
                _ => "Unknown Country"
            };
        }

        private class GeocodingResult
        {
            public double Latitude { get; set; }
            public double Longitude { get; set; }
        }

        private static readonly Dictionary<string, (double MinLat, double MaxLat, double MinLon, double MaxLon)> LocationBounds = new()
    {
        // Countries
        { "USA", (24.396308, 49.384358, -125.0, -66.93457) },
        { "Canada", (41.676555, 83.23324, -141.0, -52.648098) },
        { "Australia", (-43.634597, -10.668185, 113.338953, 153.569469) },
        { "Germany", (47.2701, 55.0581, 5.8663, 15.0419) },
        { "France", (41.303, 51.124, -5.142, 9.602) },

        // Major Cities
        { "New York City", (40.4774, 45.01585, -74.25909, -73.700171) },
        { "Los Angeles", (33.70365, 34.33739, -118.66876, -118.15529) },
        { "Chicago", (41.64454, 42.02303, -87.94010, -87.52399) },
        { "Houston", (29.534, 30.096, -95.763, -95.052) },
        { "Miami", (25.2867, 25.878, -80.365, -80.105) },
        { "Toronto", (43.5988, 43.8552, -79.6393, -79.1238) },
        { "Vancouver", (49.1969, 49.3043, -123.3656, -123.0738) },
        { "London", (51.28676, 51.6918741, -0.5103751, 0.3340155) },
        { "Tokyo", (35.535, 35.758, 139.569, 139.913) },
        { "Sydney", (-34.1184, -33.578, 150.521, 151.341) },
        { "Berlin", (52.3383, 52.6755, 13.0884, 13.7612) },
        { "Paris", (48.815573, 48.902145, 2.224199, 2.469920) },
        { "Rio de Janeiro", (-23.159, -22.746, -43.790, -43.100) },
        { "Mexico City", (19.2493, 19.4952, -99.3005, -99.0654) },
        { "Istanbul", (40.9773, 41.299, 28.8478, 29.4957) },
        { "Moscow", (55.4122, 55.965, 36.5533, 38.3394) },

        // Notable Places
        { "Grand Canyon", (36.061, 36.281, -112.195, -111.056) },
        { "Eiffel Tower", (48.8584, 48.8625, 2.2945, 2.2993) },
        { "Statue of Liberty", (40.6892, 40.6931, -74.0452, -74.0446) },
        { "Great Wall of China", (39.7163, 40.6855, 115.7035, 117.2200) },
        { "Machu Picchu", (-13.1631, -13.1433, -72.5451, -72.5055) },
        { "Sydney Opera House", (-33.8586, -33.8545, 151.2140, 151.2180) },
        { "Mount Everest", (27.9881, 28.1000, 86.9250, 87.0999) },
        { "Sagrada Familia", (41.4036, 41.4125, 2.1527, 2.1657) },
    };
    }

}
