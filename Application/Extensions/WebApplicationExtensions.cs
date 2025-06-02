using Clean.Net;
using Domain;
using Infrastructure;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SharpGrip.FluentValidation.AutoValidation.Mvc.Extensions;

namespace Application;

internal static class WebApplicationExtensions
{
    public static WebApplication Configure(this WebApplicationBuilder builder)
    {
        var appSettings = builder.Configuration.GetAppSettings<AppSettings>();

        builder.Services
            .AddInfrastructure(appSettings.Connectionstring, builder.Environment.IsProduction())
            .AddDomain();

        builder.Services
            .AddCorsPolicies(appSettings.CorsSettings)
            .AddSwaggerGen()
            .AddFluentValidationAutoValidation()
            .AddControllers(options => options.Conventions.Add(new RouteTokenTransformerConvention(new KebabCaseOutboundParameterTransformer())));

        return builder
            .Build()
            .UseServices(appSettings, builder.Environment);
    }

    private static WebApplication UseServices(this WebApplication app, AppSettings appsettings, IWebHostEnvironment environment)
    {
        app
            .UseCors(appsettings.DefaultPolicyName)
            .UseSwagger()
            .UseSwaggerUI()
            .UseDeveloperExceptionPage(environment.IsDevelopment());

        app.MapControllers();

        return app;
    }

    private static IApplicationBuilder UseDeveloperExceptionPage(this IApplicationBuilder builder, bool isDevelopment) =>
        isDevelopment ? builder.UseDeveloperExceptionPage() : builder;
}