using bcaAPI.DBContext;
using bcaAPI.Models;
using bcaAPI.Services;
using bcaAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
var config = builder.Configuration;
builder.Services.AddAuthentication(opt =>
{
    opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    opt.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(jwt =>
{
    jwt.TokenValidationParameters = new TokenValidationParameters
    {
        ValidIssuer = config["JwtSettings:Issuer"],
        ValidAudience = config["JwtSettings:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["JwtSettings:Key"]!)),
        ValidateIssuer = false,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
    };
});

builder.Services.AddAuthorization();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var mongoDbSettings = config.GetSection("MongoDBSettings").Get<MongoDBSettings>();
builder.Services.Configure<MongoDBSettings>(builder.Configuration.GetSection("MongoDBSettings"));

builder.Services.AddScoped<IJwtService>(ProviderAliasAttribute =>
{
    var secret = config["JwtSettings:Key"];
    return new JwtService(secret);
});
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IAddressService, AddressService>();
builder.Services.AddScoped<ITournamentService, TournamentService>();
builder.Services.AddScoped<PasswordService>();
builder.Services.AddDbContext<BCAContextDb>(
    option => option.UseMongoDB(mongoDbSettings.AtlasURI, mongoDbSettings.DatabaseName)
    ) ;

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();

// Enable CORS
app.UseCors(options => options
    .WithOrigins("http://localhost:5173") // Allow requests from this origin
    .AllowAnyMethod()
    .AllowAnyHeader()
    .AllowCredentials() // Allow credentials (cookies, authorization headers, etc.)
);

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
