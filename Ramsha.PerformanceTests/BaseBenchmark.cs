
// // using System.Reflection;
// // using BenchmarkDotNet.Attributes;
// // using FluentValidation;
// // using Ramsha.Application.Contracts;
// // using Ramsha.Application.Contracts.Persistence;
// // using Ramsha.Persistence.Contexts;
// // using Ramsha.Persistence.Repositories;
// // using MediatR;
// // using Microsoft.AspNetCore.Hosting;
// // using Microsoft.AspNetCore.Mvc.Testing;
// // using Microsoft.EntityFrameworkCore;
// // using Microsoft.Extensions.Configuration;
// // using Microsoft.Extensions.DependencyInjection;
// // using Microsoft.Extensions.Logging;

// // namespace Ramsha.PerformanceTests;

// // public abstract class BaseBenchmark
// // {
// //     protected static HttpClient _httpClient;
// //     protected static ILogger<BaseBenchmark> _logger;
// //     [GlobalSetup]
// //     public void Setup()
// //     {
// //         // var serviceProvider = CreateServiceProvider();

// //         var factory = new WebApplicationFactory<Program>().WithWebHostBuilder(configuration =>
// //              {
// //                  configuration.ConfigureLogging(logging =>
// //                  {
// //                      logging.ClearProviders();
// //                      logging.AddConsole();
// //                  });
// //              });

// //         _httpClient = factory.CreateClient();

// //         var loggerFactory = LoggerFactory.Create(logging =>
// //        {
// //            logging.ClearProviders();
// //            logging.AddConsole();
// //        });
// //         _logger = loggerFactory.CreateLogger<BaseBenchmark>();


// //     }



// //     // private static IServiceProvider CreateServiceProvider()
// //     // {
// //     //     var services = new ServiceCollection();

// //     //     services.AddDbContext<ApplicationDbContext>(options =>
// //     //      options.UseSqlServer("DefaultConnection",
// //     //         b => b.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)));

// //     //     services.AddScoped<IUnitOfWork, UnitOfWork>();
// //     //     services.AddTransient(typeof(IGenericRepository<,>), typeof(GenericRepository<,>));

// //     //     var interfaceType = typeof(IGenericRepository<,>);
// //     //     var interfaces = Assembly.GetAssembly(interfaceType).GetTypes()
// //     //         .Where(p => p.GetInterface(interfaceType.Name.ToString()) != null);

// //     //     foreach (var item in interfaces)
// //     //     {
// //     //         var implimentation = Assembly.GetAssembly(typeof(GenericRepository<,>)).GetTypes()
// //     //             .FirstOrDefault(p => p.GetInterface(item.Name.ToString()) != null);
// //     //         services.AddTransient(item, implimentation);

// //     //     }

// //     //     ///application
// //     //     services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
// //     //     services.AddMediatR(Assembly.GetExecutingAssembly());

// //     //     return services.BuildServiceProvider();
// //     // }



// //     [GlobalCleanup]
// //     public void Cleanup()
// //     {
// //         _httpClient?.Dispose();
// //     }
// // }

// using BenchmarkDotNet.Attributes;
// using Ramsha.Domain.Inventory.Services;
// using Ramsha.Domain.Products.Entities;
// using Microsoft.AspNetCore.Hosting;
// using Microsoft.AspNetCore.Mvc.Testing;
// using Microsoft.Extensions.Logging;

// public class BenchmarkAPIPerformance
// {
//     private static HttpClient _httpClient;



//     [GlobalSetup]
//     public void GlobalSetup()
//     {
//         var factory = new WebApplicationFactory
//         <Program>().WithWebHostBuilder(configuration =>
//         {
//             configuration.ConfigureLogging(logging =>
//             {
//                 logging.ClearProviders();
//             });
//         });

//         _httpClient = factory.CreateClient();

//     }

 



//     // [Benchmark]
//     // public async Task GetResponseTime()
//     // {
//     //     var response = await _httpClient.GetAsync("/api/v1/products/details");
//     // }
// }

