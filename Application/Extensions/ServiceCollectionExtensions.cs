using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

namespace Application.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddMediator(options => { options.ServiceLifetime = ServiceLifetime.Scoped; });
        services.AddValidatorsFromAssemblyContaining<IApplicationMarker>();
        return services;
    }
}