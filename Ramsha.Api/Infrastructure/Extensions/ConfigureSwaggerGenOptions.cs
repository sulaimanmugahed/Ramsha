using Asp.Versioning.ApiExplorer;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Reflection;

namespace Ramsha.Api.Infrastructure.Extensions;

public class ConfigureSwaggerGenOptions(IApiVersionDescriptionProvider provider)
    : IConfigureNamedOptions<SwaggerGenOptions>
{
    public void Configure(string? name, SwaggerGenOptions options)
    {
        foreach (var description in provider.ApiVersionDescriptions)
        {
            OpenApiInfo openApiInfo = new()
            {
                Title = $"Ramsha Api v{description.ApiVersion}",
                Version = description.ApiVersion.ToString(),
                Description = $"Welcome to the Ramsha API v{description.ApiVersion}! Ramsha is a fully functional e-commerce platform designed with a comprehensive set of features to mimic real-world e-commerce operations. This API is publicly accessible, making it a perfect resource for developers, especially frontend developers, to practice and learn by building real-world applications. Ramsha offers a large collection of endpoints, covering all aspects of an e-commerce ecosystem, from product management to order processing ."
            };

            if (description.IsDeprecated)
                openApiInfo.Description += "\n\nNote: This API version has been deprecated.";

            options.SwaggerDoc(description.GroupName, openApiInfo);

            var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
            var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
            options.IncludeXmlComments(xmlPath);
        }
    }

    public void Configure(SwaggerGenOptions options)
    {
        Configure(options);
    }
}
