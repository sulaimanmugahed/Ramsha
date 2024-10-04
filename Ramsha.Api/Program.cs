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
using Ramsha.Api.Infrastructure.Filters;
using FluentValidation.AspNetCore;
using System.Reflection;
using Ramsha.Mail;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Persistence.Repositories;
using System.Text.Json.Serialization;
using Ramsha.Domain.Common.Events;

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


DomainEventRegistrar.RegisterHandlers();


builder.Services
    .AddApplicationLayer();
builder.Services

.AddPersistenceInfrastructure(appConfiguration)
.AddIdentityInfrastructure(appConfiguration)
.AddFileStorage(appConfiguration)
.AddEmialServices(appConfiguration);


builder.Services.AddScoped<IAuthenticatedUserService, AuthenticatedUserService>();

builder.Services.AddScoped<IStudentRepository, StudentRepository>();



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
    await DefaultData.SeedAsync(services.GetRequiredService<ApplicationDbContext>(), logger);
    await DefaultRoles.SeedAsync(services.GetRequiredService<RoleManager<ApplicationRole>>());
    await DefaultUser.SeedAsync(services.GetRequiredService<UserManager<Account>>());
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

app.Run();

public partial class Program
{

}

