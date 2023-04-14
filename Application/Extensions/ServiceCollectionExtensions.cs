using Application.Photos.Options;
using Application.Photos.Services;
using FluentValidation;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Application.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddApplication(this IServiceCollection services, IConfiguration config)
    {
        services.AddMediator(options => { options.ServiceLifetime = ServiceLifetime.Scoped; });
        services.AddValidatorsFromAssemblyContaining<IApplicationMarker>();
        services.AddScoped<IPhotoService, PhotoService>();

        services.Configure<CloudinaryOptions>(options =>
        {
            options.ApiKey = config["CLOUDINARY_API_KEY"] ?? throw new InvalidOperationException();
            options.ApiSecret = config["CLOUDINARY_API_SECRET"] ?? throw new InvalidOperationException();
            options.CloudName = config["CLOUDINARY_CLOUD_NAME"] ?? throw new InvalidOperationException();
        });

        return services;
    }
}