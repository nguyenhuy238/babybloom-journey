using BabyFirst.Api.Middleware;
using BabyFirst.Api.Services;
using BabyFirst.Application;
using BabyFirst.Application.Common.Interfaces;
using BabyFirst.Infrastructure;
using BabyFirst.Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Configure Serilog
Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .Enrich.FromLogContext()
    .WriteTo.Console()
    .CreateLogger();

builder.Host.UseSerilog();

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// Swagger with JWT support
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "BabyFirst API",
        Version = "v1",
        Description = "BabyFirst Educational Platform API"
    });

    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Enter 'Bearer' [space] and then your token.",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

// Add Application and Infrastructure services
builder.Services.AddApplicationServices();
builder.Services.AddInfrastructureServices(builder.Configuration);

// Add HttpContextAccessor for CurrentUserService
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<ICurrentUserService, CurrentUserService>();

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline
app.UseSwagger();
app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "BabyFirst API v1"));

if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}
app.UseCors("AllowAll");

// Global exception handling
app.UseMiddleware<ExceptionHandlingMiddleware>();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Log startup
Console.WriteLine(">>> BabyFirst API starting up...");
Log.Information("BabyFirst API starting up...");

// Auto-migrate and seed database
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<ApplicationDbContext>();
    
    // 1. Wait for database connection
    var iterations = 0;
    var connected = false;
    while (iterations < 15 && !connected)
    {
        try
        {
            // Try to open connection to verify it's ready
            var canConnect = await context.Database.CanConnectAsync();
            if (canConnect)
            {
                connected = true;
                Console.WriteLine(">>> Database connection established.");
                Log.Information("Database connection established.");
            }
            else
            {
                throw new Exception("CanConnect returned false");
            }
        }
        catch (Exception ex)
        {
            iterations++;
            Console.WriteLine($">>> Database connection attempt {iterations} failed. Retrying in 3s...");
            await Task.Delay(3000);
        }
    }

    if (!connected)
    {
        Console.WriteLine(">>> FATAL: Could not connect to database after multiple attempts.");
        Log.Fatal("Could not connect to database after multiple attempts.");
        return;
    }

    // 2. Perform Migrations
    try
    {
        var provider = context.Database.ProviderName;
        Console.WriteLine($">>> Database provider: {provider}");
        
        if (context.Database.IsSqlServer() || context.Database.IsNpgsql())
        {
            Console.WriteLine(">>> Applying pending migrations...");
            await context.Database.MigrateAsync();
            Console.WriteLine(">>> Migrations applied successfully.");
        }

        // 3. Seed Data
        var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();
        var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
        
        Console.WriteLine(">>> Seeding database...");
        await ApplicationDbContextSeed.SeedAsync(context, userManager, roleManager);
        Console.WriteLine(">>> Seeding completed.");
        
        Console.WriteLine(">>> Database initialization completed successfully.");
        Log.Information("Database initialization completed successfully.");
    }
    catch (Exception ex)
    {
        Console.WriteLine($">>> FAIL: Database initialization error: {ex.Message}");
        Log.Error(ex, "An error occurred during database migration or seeding.");
        // We still run the app so logs can be inspected via API if needed
    }
}

app.Run();
