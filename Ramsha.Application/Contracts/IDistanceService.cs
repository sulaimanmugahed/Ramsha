using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ramsha.Application.Contracts;

public interface IDistanceService
{
    double CalculateDistance(double lat1, double lon1, double lat2, double lon2);
}

