using API.Converters;
using API.Extensions;
using API.Security;
using API.SignalR;
using API.Swagger;
using Application.Extensions;
using Application.Interfaces;
using DotNetEnv;
using Microsoft.Extensions.Options;
using Persistence.Extensions;
using Swashbuckle.AspNetCore.SwaggerGen;

Env.Load();

const string corsPolicy = "CorsPolicy";

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers()
    .AddJsonOptions(options => { options.JsonSerializerOptions.Converters.Add(new DateTimeJsonConverter()); });
builder.Services.AddProblemDetails();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddTransient<IConfigureOptions<SwaggerGenOptions>, ConfigureSwaggerOptions>();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options => { options.AddPolicy(corsPolicy, _ => { }); });
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<IUserAccessor, UserAccessor>();
builder.Services.AddSignalR();

builder.Services.AddPersistence(builder.Configuration);
builder.Services.AddApplication(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);

var app = builder.Build();

app.UseExceptionHandler();
app.UseStatusCodePages();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();
}
else
{
    app.Use(async (context, next) =>
    {
        context.Response.Headers.Add("Strict-Transport-Security", "max-age=31536000");
        await next.Invoke();
    });
}

app.UseHttpsRedirection();
app.UseCors(corsPolicy);
app.UseXContentTypeOptions();
app.UseReferrerPolicy(options => options.NoReferrer());
app.UseXXssProtection(options => options.EnabledWithBlockMode());
app.UseXfo(options => options.Deny());
app.UseCsp(options =>
{
    options.BlockAllMixedContent()
        .DefaultSources(s => s.Self())
        .StyleSources(s => s.Self().CustomSources("https://fonts.googleapis.com"))
        .FontSources(s => s.Self().CustomSources("https://fonts.gstatic.com", "data:"))
        .ImageSources(s => s.Self().CustomSources("blob:", "https://res.cloudinary.com"))
        .ScriptSources(s => s.Self().CustomSources("sha256-p7PoC97FO+Lu90RNjGWxhbm13yALSR4xzV8vaDhaQBo=",
            "sha256-+5XkZFazzJo8n0iOP4ti/cLCMUudTf//Mzkb7xNPXIc="))
        .FormActions(s => s.Self())
        .FrameAncestors(s => s.Self())
        .BaseUris(s => s.Self())
        .ObjectSources(s => s.Self())
        .FrameSources(s => s.Self());
});
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapHub<ChatHub>("/hubs/chat");

if (File.Exists(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "index.html")))
{
    app.UseDefaultFiles();
    app.UseStaticFiles();
    app.MapFallbackToController("Index", "Fallback");
}

using var scope = app.Services.CreateScope();
var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
await scope.UseDatabaseSetup(logger);

app.Run();