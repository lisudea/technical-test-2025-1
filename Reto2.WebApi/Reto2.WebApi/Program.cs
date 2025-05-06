using Microsoft.EntityFrameworkCore;
using Reto2.Infraestructura.Persistencia;
using Reto2.LogicaNegocio.Servicios.Interfaces;
using Reto2.LogicaNegocio.Servicios.Implementaciones;
using System.Text.Json.Serialization;

namespace Reto2.WebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
            builder.Services.AddScoped<IServicioActividad, ServicioActividad>();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddCors(options => {
                options.AddPolicy("AllowAll", // Solo para desarrollo
                    builder => builder.AllowAnyOrigin()
                                    .AllowAnyMethod()
                                    .AllowAnyHeader());
            });

            // comentar esta linea cuando este haciendo debug

            //builder.WebHost.UseUrls("http://0.0.0.0:80");

            var app = builder.Build();
            app.UseSwagger();
            app.UseSwaggerUI();
            app.UseCors("AllowAll");
            app.UseAuthorization();
            

            app.MapControllers();

            app.Run();
        }
    }
}
