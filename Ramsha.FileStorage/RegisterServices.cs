using Ramsha.Application.Contracts;
using Ramsha.FileStorage.Services;
using Ramsha.FileStorage.Settings;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;


namespace Ramsha.FileStorage;
public static class RegisterServices
{
	public static IServiceCollection AddFileStorage(this IServiceCollection services,IConfiguration configuration)
	{
		services.Configure<FirebaseStorageSettings>(configuration.GetSection(nameof(FirebaseStorageSettings)));

		services.AddSingleton<IStorageService, FirebaseStorageService>();

		return services;
	}
}
