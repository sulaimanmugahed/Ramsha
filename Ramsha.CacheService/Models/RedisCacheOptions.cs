using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ramsha.CacheService.Models;

public class RedisCacheOptions
{
    public string ConnectionString { get; set; }
    public int DefaultDatabase { get; set; } = 0; 
    public int ConnectTimeout { get; set; } = 5000;
    public int RetryCount { get; set; } = 3; 
    public TimeSpan? DefaultExpiration { get; set; }
}

