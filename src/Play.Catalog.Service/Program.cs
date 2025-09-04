using MassTransit;
using Play.Catalog.Service.Entities;
using Play.Common.MongoDB;
using Play.Common.MassTransit;
using Play.Common.Settings;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

var configuration = builder.Configuration;
Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(configuration)
    .Enrich.FromLogContext()
    .CreateLogger();

builder.Host.UseSerilog();

var rabbitMQSettings = configuration.GetSection(nameof(RabbitMQSettings)).Get<RabbitMQSettings>();
var serviceSettings = configuration.GetSection(nameof(ServiceSettings)).Get<ServiceSettings>();

builder.Services.AddMongoDB()
    .AddMongoRepository<Item>("Items");

builder.Services.AddMassTransitWithRabbitMQ();

builder.Services.AddControllers(options => { options.SuppressAsyncSuffixInActionNames = false; });
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors(builder =>
    {
        builder.WithOrigins(configuration["AllowedOrigin"])
        .AllowAnyHeader()
        .AllowAnyMethod();
    }
    );
}

//app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();