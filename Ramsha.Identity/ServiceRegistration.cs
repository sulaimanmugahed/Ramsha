using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Ramsha.Application.Contracts.Identity;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Settings;
using Ramsha.Identity.Contexts;
using Ramsha.Identity.Models;
using Ramsha.Identity.Services;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Security.Claims;
using System.Text;
using Ramsha.Application.Contracts.Identity.UserInterfaces;

namespace Ramsha.Identity;

public static class ServiceRegistration
{

    public static void AddIdentityCookie(this IServiceCollection services, IConfiguration configuration)
    {
        var identitySettings = configuration.GetSection(nameof(IdentitySettings)).Get<IdentitySettings>();
        services.AddSingleton(identitySettings);
        services.AddIdentity<Account, ApplicationRole>(options =>
        {

            options.SignIn.RequireConfirmedAccount = false;
            options.SignIn.RequireConfirmedEmail = false;
            options.User.RequireUniqueEmail = false;

            options.Password.RequireDigit = identitySettings.PasswordRequireDigit;
            options.Password.RequiredLength = identitySettings.PasswordRequiredLength;
            options.Password.RequireNonAlphanumeric = identitySettings.PasswordRequireNonAlphanumic;
            options.Password.RequireUppercase = identitySettings.PasswordRequireUppercase;
            options.Password.RequireLowercase = identitySettings.PasswordRequireLowercase;
        })
            .AddEntityFrameworkStores<IdentityContext>()
            .AddDefaultTokenProviders();
    }
    public static IServiceCollection AddIdentityInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<IdentityContext>(options =>
        options.UseSqlServer(
            configuration.GetConnectionString("IdentityConnection"),
            b => b.MigrationsAssembly(typeof(IdentityContext).Assembly.FullName)));


        services.AddTransient<IUpdateUserServices, UpdateUserServices>();
        services.AddTransient<ITokenService, TokenService>();
        services.AddTransient<IAccountServices, AccountServices>();

        services.AddTransient<IUserService, UserService>();

        return services;

    }
    public static void AddJwt(this IServiceCollection services, IConfiguration configuration)
    {
        var serializerSettings = new JsonSerializerSettings()
        {
            ContractResolver = new CamelCasePropertyNamesContractResolver()
        };

        services.AddIdentity<Account, ApplicationRole>().AddEntityFrameworkStores<IdentityContext>().AddDefaultTokenProviders();

        var jwtSettings = configuration.GetSection(nameof(JWTSettings)).Get<JWTSettings>();
        //services.AddSingleton(jwtSettings);

        services.Configure<JWTSettings>(configuration.GetSection(nameof(JWTSettings)));

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
            .AddJwtBearer(async o =>
            {
                o.RequireHttpsMetadata = false;
                o.SaveToken = false;
                o.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero,
                    ValidIssuer = jwtSettings.Issuer,
                    ValidAudience = jwtSettings.Audience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Key))
                };
                o.Events = new JwtBearerEvents()
                {
                    OnChallenge = context =>
                    {
                        context.HandleResponse();
                        context.Response.StatusCode = 401;
                        context.Response.ContentType = "application/json";
                        var result = JsonConvert.SerializeObject(BaseResult.Failure(new Error(ErrorCode.AccessDenied, "You are not Authorized")), serializerSettings);
                        return context.Response.WriteAsync(result);
                    },
                    OnForbidden = context =>
                    {
                        context.Response.StatusCode = 403;
                        context.Response.ContentType = "application/json";
                        var result = JsonConvert.SerializeObject(BaseResult.Failure(new Error(ErrorCode.AccessDenied, "You are not authorized to access this resource")), serializerSettings);
                        return context.Response.WriteAsync(result);
                    },
                    OnTokenValidated = async context =>
                    {
                        var signInManager = context.HttpContext.RequestServices.GetRequiredService<SignInManager<Account>>();
                        var claimsIdentity = context.Principal.Identity as ClaimsIdentity;
                        if (claimsIdentity.Claims?.Any() != true)
                            context.Fail("This token has no claims.");

                        var securityStamp = claimsIdentity.FindFirst("AspNet.Identity.SecurityStamp");
                        if (securityStamp is null)
                            context.Fail("This token has no secuirty stamp");

                        var validatedUser = await signInManager.ValidateSecurityStampAsync(context.Principal);
                        if (validatedUser == null)
                            context.Fail("Token secuirty stamp is not valid.");
                    },

                };
            });
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously

    }

}
