using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;
using Reto2.Dominio.Entidades;

namespace Reto2.Infraestructura.Persistencia
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Rol> Roles { get; set; }
        public DbSet<Auxiliar> Auxiliares { get; set; }
        public DbSet<EstadoActividad> EstadosActividad { get; set; }
        public DbSet<Actividad> Actividades { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Relaciones explícitas
            modelBuilder.Entity<Auxiliar>()
                .HasOne(a => a.Rol)
                .WithMany(r => r.Auxiliares)
                .HasForeignKey(a => a.RolId);

            modelBuilder.Entity<Actividad>()
                .HasOne(a => a.Auxiliar)
                .WithMany(ax => ax.Actividades)
                .HasForeignKey(a => a.CedulaAuxiliar);

            modelBuilder.Entity<Actividad>()
                .HasOne(a => a.EstadoActividad)
                .WithMany(es => es.Actividades)
                .HasForeignKey(a => a.Estado);
        }
    }
}
