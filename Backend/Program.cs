using Backend.Data;
using Backend.Services;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    });
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configurar CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173") // URL de Vite por defecto
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Registrar servicios
builder.Services.AddSingleton<SqlConnectionFactory>();
builder.Services.AddScoped<IDocumentoIdentidadService, DocumentoIdentidadService>();
builder.Services.AddScoped<IBeneficiarioService, BeneficiarioService>();

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
