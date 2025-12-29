using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using webapi.EF;
using webapi.Services;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("https://localhost:7157/api");
                      });
});

// Add services to the container.
builder.Services.AddControllers();
//builder.Services.AddDbContext<webapi.Models.CMCContext>(
//       options => options.UseSqlServer(builder.Configuration.GetConnectionString("name=ConnectionStrings:CMCContextConnection")));
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});
builder.Services.AddDbContext<CMCContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("CMCContextConnection")));
builder.Services.AddIdentityCore<IdentityUser>()
    .AddEntityFrameworkStores<CMCContext>()
    .AddApiEndpoints();

builder.Services.AddAuthentication().AddBearerToken(IdentityConstants.BearerScheme);
builder.Services.AddAuthorizationBuilder();


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IUtilisateurServices, UtilisateurServices>();
builder.Services.AddScoped<IActeurServices, ActeurServices>();
builder.Services.AddScoped<IOrateurServices, OrateurServices>();
builder.Services.AddScoped<IEgliseServices, EgliseServices>();
builder.Services.AddScoped<ITypeMediaServices, TypeMediaServices>();
builder.Services.AddScoped<ILangueServices, LangueServices>();
builder.Services.AddScoped<ICategorieServices, CategorieServices>();
builder.Services.AddScoped<IMediaServices, MediaServices>();

var app = builder.Build();


app.UseCors("AllowAll");
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapIdentityApi<IdentityUser>();

app.MapControllers();
//app.MapGet("/test", (ClaimsPrincipal user) => $"Hello {user.Identity!.Name}").RequireAuthorization();

app.UseCors(MyAllowSpecificOrigins);
app.Run();
