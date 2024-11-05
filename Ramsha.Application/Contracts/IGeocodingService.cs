using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ramsha.Application.Contracts;

public interface IGeocodingService
{
    (double Latitude, double Longitude) GenerateRandomCoordinates(string location);
    Task<(double Latitude, double Longitude)> GetCoordinatesAsync(string address);
    double CalculateDistance((double Latitude, double Longitude) coord1, (double Latitude, double Longitude) coord2);
    string GenerateRandomAddress();
}


