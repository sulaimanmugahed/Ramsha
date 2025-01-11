using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Ramsha.Application.Contracts.Caching;
using Ramsha.CacheService.Models;
using Ramsha.CacheService.Services;
using StackExchange.Redis;

namespace Ramsha.CacheService
{
    /// <summary>
    /// Provides extension methods to register Redis cache services in the dependency injection container.
    /// </summary>
    public static class RegisterServices
    {
        /// <summary>
        /// Registers Redis cache services using configuration from the provided <see cref="IConfiguration"/>.
        /// </summary>
        /// <param name="services">The <see cref="IServiceCollection"/> to add the Redis cache services to.</param>
        /// <param name="configuration">The <see cref="IConfiguration"/> that holds Redis configuration values.</param>
        /// <returns>The <see cref="IServiceCollection"/> for method chaining.</returns>
        public static IServiceCollection AddRedisCache(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<RedisCacheOptions>(configuration.GetSection(nameof(RedisCacheOptions)));

            services.AddSingleton<IConnectionMultiplexer>(serviceProvider =>
            {
                var options = serviceProvider.GetRequiredService<IOptions<RedisCacheOptions>>().Value;

                var config = new ConfigurationOptions
                {
                    EndPoints = { options.ConnectionString },
                    DefaultDatabase = options.DefaultDatabase,
                    ConnectTimeout = options.ConnectTimeout,
                    ConnectRetry = options.RetryCount
                };

                return ConnectionMultiplexer.Connect(config);
            });

            services.AddScoped<ICacheService, RedisCacheService>();

            return services;
        }

        /// <summary>
        /// Registers Redis cache services using a provided connection string.
        /// </summary>
        /// <param name="services">The <see cref="IServiceCollection"/> to add the Redis cache services to.</param>
        /// <param name="connectionString">The Redis connection string (default is "localhost:6379").</param>
        /// <returns>The <see cref="IServiceCollection"/> for method chaining.</returns>
        public static IServiceCollection AddRedisCache(this IServiceCollection services, string connectionString = "localhost:6379")
        {
            services.AddSingleton<IConnectionMultiplexer>(serviceProvider =>
            {
                return ConnectionMultiplexer.Connect(connectionString);
            });

            services.AddScoped<ICacheService, RedisCacheService>();

            return services;
        }

        /// <summary>
        /// Registers Redis cache services using the provided <see cref="RedisCacheOptions"/>.
        /// </summary>
        /// <param name="services">The <see cref="IServiceCollection"/> to add the Redis cache services to.</param>
        /// <param name="redisCacheOptions">The <see cref="RedisCacheOptions"/> containing configuration settings for Redis.</param>
        /// <returns>The <see cref="IServiceCollection"/> for method chaining.</returns>
        public static IServiceCollection AddRedisCache(this IServiceCollection services, RedisCacheOptions redisCacheOptions)
        {
            services.AddSingleton<IConnectionMultiplexer>(serviceProvider =>
            {
                var config = new ConfigurationOptions
                {
                    EndPoints = { redisCacheOptions.ConnectionString },
                    DefaultDatabase = redisCacheOptions.DefaultDatabase,
                    ConnectTimeout = redisCacheOptions.ConnectTimeout,
                    ConnectRetry = redisCacheOptions.RetryCount
                };

                return ConnectionMultiplexer.Connect(config);
            });

            services.AddScoped<ICacheService, RedisCacheService>();

            return services;
        }
    }
}
