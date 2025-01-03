using Ramsha.Api.Infrastructure.Extensions;
using Ramsha.Api.Infrastructure.Middlewares;
using Ramsha.Api.Infrastructure.Services;
using Ramsha.Application.Contracts;
using Ramsha.Application;
using Ramsha.Persistence;
using Ramsha.FileStorage;
using Ramsha.Identity;
using Ramsha.Persistence.Seeds;
using Ramsha.Persistence.Contexts;
using Microsoft.AspNetCore.Identity;
using Ramsha.Identity.Models;
using Ramsha.Identity.Seeds;
using Serilog;
using FluentValidation.AspNetCore;
using System.Reflection;
using Ramsha.Mail;
using System.Text.Json.Serialization;
using Ramsha.Domain.Settings;
using Ramsha.PaymentService;
using Ramsha.Identity.Contexts;
using Ramsha.CacheService;
using Ramsha.BackgroundJobs;
using Hangfire;

var builder = WebApplication.CreateBuilder(args);
builder.Configuration.AddJsonFile("appsettings.firebase.json", false, reloadOnChange: true);

IConfiguration appConfiguration = builder.Configuration;


builder.Services.AddControllers().AddJsonOptions(o =>
    {
        o.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    })
    .AddFluentValidation(options =>
{
    options.ImplicitlyValidateChildProperties = true;
    options.RegisterValidatorsFromAssembly(Assembly.GetExecutingAssembly());
});


builder.Services.AddAuthorization();


builder.Services
    .AddApplicationLayer(appConfiguration)
.AddPersistenceInfrastructure(appConfiguration)
.AddIdentityInfrastructure(appConfiguration)
.AddFileStorage(appConfiguration)
.AddEmailServices(appConfiguration)
.AddRedisCache(appConfiguration)
.AddBackgroundJobsServices(appConfiguration)
.AddAppPaymentServices(appConfiguration);

builder.Services.Configure<DeliveryFeeSettings>(appConfiguration.GetSection(nameof(DeliveryFeeSettings)));
builder.Services.Configure<CurrencySettings>(appConfiguration.GetSection(nameof(CurrencySettings)));





builder.Services.AddScoped<IAuthenticatedUserService, AuthenticatedUserService>();
builder.Services.AddScoped<IGeocodingService, GeocodingService>();


builder.Services.AddDistributedMemoryCache();
builder.Services.AddJwt(appConfiguration);
builder.Services.AddSwaggerWithVersioning();

builder.Services.AddScoped<ICookieService, CookieService>();
builder.Services.AddScoped<IHttpService, HttpService>();




builder.Services.AddCors(options =>
{


    options.AddPolicy("WebClient", builder =>

    {
        builder
        .SetIsOriginAllowed(origin =>
        {
            return true;
            //string.Equals(origin, "http://localhost:3000");
        })
                .AllowAnyMethod()
                .AllowAnyHeader()
            .AllowCredentials();
    });
});

builder.Services.AddScoped<IAuthenticatedUserService, AuthenticatedUserService>();

builder.Host.UseSerilog((context, configuration) => configuration.ReadFrom.Configuration(context.Configuration));

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var logger = services.GetRequiredService<ILogger<DefaultData>>();
    var codeGenerator = services.GetRequiredService<Ramsha.Application.Contracts.ICodeGenerator>();
    var roleManager = services.GetRequiredService<RoleManager<ApplicationRole>>();
    var userManager = services.GetRequiredService<UserManager<Account>>();
    var identityContext = services.GetRequiredService<IdentityContext>();


    await DefaultData.SeedAsync(services.GetRequiredService<ApplicationDbContext>(), logger, codeGenerator);
    await DefaultRoles.SeedAsync(roleManager);
    await DefaultUser.SeedAsync(userManager);
    await DefaultPermissions.SeedAsync(identityContext, roleManager, userManager);
}

app.UseCors("WebClient");


app.UseAuthentication();
app.UseAuthorization();

app.UseErrorHandlerMiddleware();

app.MapControllers();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(option =>
    {
        var descriptions = app.DescribeApiVersions();
        foreach (var desc in descriptions)
        {
            string url = $"/swagger/{desc.GroupName}/swagger.json";
            string name = desc.GroupName.ToUpperInvariant();
            option.SwaggerEndpoint(url, name);
        }
    });

}
app.UseHangfireDashboard("/jobs");


app.Run();

public partial class Program
{

}

