// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;
// using BenchmarkDotNet.Attributes;
// using Microsoft.Extensions.Logging;

// namespace Ramsha.PerformanceTests;

// public class ProductsBenchmark : BaseBenchmark
// {
//     [Benchmark]
//     public async Task GetAllProductsDetailsBenchmark()
//     {
//         _logger.LogInformation("Starting the benchmark for GetAllProductsDetails.");
//         var response = await _httpClient.GetAsync("/api/v1/products/details");
//         _logger.LogInformation("Received response with status code: {StatusCode}", response.StatusCode);
//     }
// }
