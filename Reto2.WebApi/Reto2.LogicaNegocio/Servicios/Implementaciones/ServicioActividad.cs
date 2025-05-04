using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Reto2.Dominio.DTOS;
using Reto2.Dominio.Entidades;
using Reto2.Infraestructura.Persistencia;
using Reto2.LogicaNegocio.Servicios.Interfaces;

namespace Reto2.LogicaNegocio.Servicios.Implementaciones
{
    public class ServicioActividad : IServicioActividad
    {
        private readonly AppDbContext _dbContext;
        public ServicioActividad(AppDbContext appDbContext)
        {
            _dbContext = appDbContext;
        }

        public Task<List<ActividadDTO>> ObtenerActividadesAsync()
        {
            return _dbContext.Actividades
                    .Include(a => a.Auxiliar)
                        .ThenInclude(a => a.Rol)
                    .Select(a => new ActividadDTO
                    {
                        Id = a.Id,
                        CedulaAuxiliar = a.CedulaAuxiliar,
                        FechaInicio = a.FechaInicio,
                        FechaFin = a.FechaFin,
                        Descripcion = a.Descripcion,
                        Estado = a.Estado,
                        FechaAprobacion = a.FechaAprobacion,
                        Auxiliar = new AuxiliarDTO
                        {
                            Cedula = a.Auxiliar.Cedula,
                            Nombre = a.Auxiliar.Nombre,
                            Usuario = a.Auxiliar.Usuario,
                            Contrasena = a.Auxiliar.Contrasena,
                            RolId = a.Auxiliar.RolId,
                            Rol = new RolDTO
                            {
                                Id = a.Auxiliar.Rol.Id,
                                RolNombre = a.Auxiliar.Rol.RolNombre
                            }
                        }
                    }).ToListAsync();

        }

        public async Task<List<ActividadDTO>> ObtenerActividadesPorFechaFinAsync(DateTime fechaFin)
        {
            var actividad = _dbContext.Actividades
                    .Include(a => a.Auxiliar)
                        .ThenInclude(a => a.Rol)
                    .Where(a => a.FechaFin.Date == fechaFin.Date)
                    .Select(a => new ActividadDTO
                    {
                        Id = a.Id,
                        CedulaAuxiliar = a.CedulaAuxiliar,
                        FechaInicio = a.FechaInicio,
                        FechaFin = a.FechaFin,
                        Descripcion = a.Descripcion,
                        Estado = a.Estado,
                        FechaAprobacion = a.FechaAprobacion,
                        Auxiliar = new AuxiliarDTO
                        {
                            Cedula = a.Auxiliar.Cedula,
                            Nombre = a.Auxiliar.Nombre,
                            Usuario = a.Auxiliar.Usuario,
                            Contrasena = a.Auxiliar.Contrasena,
                            RolId = a.Auxiliar.RolId,
                            Rol = new RolDTO
                            {
                                Id = a.Auxiliar.Rol.Id,
                                RolNombre = a.Auxiliar.Rol.RolNombre
                            }
                        }
                    }).ToListAsync();

            if (actividad == null)
                return null;

            return await actividad;
        }

        public async Task<ActividadDTO> ObtenerActividadPorIdAsync(int id)
        {
            var actividad = await _dbContext.Actividades
                    .Include(a => a.Auxiliar)
                        .ThenInclude(a => a.Rol)
                    .FirstOrDefaultAsync(a => a.Id == id);
            if (actividad == null)
                return null;

            return new ActividadDTO
            {
                Id = actividad.Id,
                CedulaAuxiliar = actividad.CedulaAuxiliar,
                FechaInicio = actividad.FechaInicio,
                FechaFin = actividad.FechaFin,
                Descripcion = actividad.Descripcion,
                Estado = actividad.Estado,
                FechaAprobacion = actividad.FechaAprobacion,
                Auxiliar = new AuxiliarDTO
                {
                    Cedula = actividad.Auxiliar.Cedula,
                    Nombre = actividad.Auxiliar.Nombre,
                    Usuario = actividad.Auxiliar.Usuario,
                    Contrasena = actividad.Auxiliar.Contrasena,
                    RolId = actividad.Auxiliar.RolId,
                    Rol = new RolDTO
                    {
                        Id = actividad.Auxiliar.Rol.Id,
                        RolNombre = actividad.Auxiliar.Rol.RolNombre
                    }
                }
            };

        }
        public async Task<int?> ObtenerActividadEntreFechasConIdAsync(DateTime fechaInicio, DateTime fechaFin, string cedula)
        {
            var actividades = await _dbContext.Actividades
                    .Include(a => a.Auxiliar)
                        .ThenInclude(a => a.Rol)
                    .Where(a => a.FechaFin.Date <= fechaFin && a.FechaInicio>=fechaInicio && a.CedulaAuxiliar.Equals(cedula))
                    .Select(a => new ActividadDTO
                    {
                        Id = a.Id,
                        CedulaAuxiliar = a.CedulaAuxiliar,
                        FechaInicio = a.FechaInicio,
                        FechaFin = a.FechaFin,
                        Descripcion = a.Descripcion,
                        Estado = a.Estado,
                        FechaAprobacion = a.FechaAprobacion,
                        Auxiliar = new AuxiliarDTO
                        {
                            Cedula = a.Auxiliar.Cedula,
                            Nombre = a.Auxiliar.Nombre,
                            Usuario = a.Auxiliar.Usuario,
                            Contrasena = a.Auxiliar.Contrasena,
                            RolId = a.Auxiliar.RolId,
                            Rol = new RolDTO
                            {
                                Id = a.Auxiliar.Rol.Id,
                                RolNombre = a.Auxiliar.Rol.RolNombre
                            }
                        }
                    }).ToListAsync();
            if (actividades == null)
                return null;

            var horasTrabajadas = 0;
            foreach (var actividad in actividades)
            {
                TimeSpan diferencia = actividad.FechaFin - actividad.FechaInicio;
                horasTrabajadas += (int)diferencia.TotalHours;
            }
            return horasTrabajadas;

        }
    
   
        public async Task<bool> CrearActividadAsync(ActividadDTO actividadDTO)
        {
            var actividad = new Actividad
            {
                CedulaAuxiliar = actividadDTO.CedulaAuxiliar,
                FechaInicio = actividadDTO.FechaInicio,
                FechaFin = actividadDTO.FechaFin,
                Descripcion = actividadDTO.Descripcion,
                FechaAprobacion = actividadDTO.FechaAprobacion
            };
            _dbContext.Actividades.Add(actividad);
            return await _dbContext.SaveChangesAsync() > 0;
        }

        public async Task<List<ActividadDTO>> ObtenerActividadesPorCedulaAsync(string cedula)
        {
            return await _dbContext.Actividades
                    .Include(a => a.Auxiliar)
                        .ThenInclude(a => a.Rol)
                    .Where(a => a.Auxiliar.Cedula == cedula)
                    .Select(cedula => new ActividadDTO
                    {
                        Id = cedula.Id,
                        CedulaAuxiliar = cedula.CedulaAuxiliar,
                        FechaInicio = cedula.FechaInicio,
                        FechaFin = cedula.FechaFin,
                        Descripcion = cedula.Descripcion,
                        Estado = cedula.Estado,
                        FechaAprobacion = cedula.FechaAprobacion,
                        Auxiliar = new AuxiliarDTO
                        {
                            Cedula = cedula.Auxiliar.Cedula,
                            Nombre = cedula.Auxiliar.Nombre,
                            Usuario = cedula.Auxiliar.Usuario,
                            Contrasena = cedula.Auxiliar.Contrasena,
                            RolId = cedula.Auxiliar.RolId,
                            Rol = new RolDTO
                            {
                                Id = cedula.Auxiliar.Rol.Id,
                                RolNombre = cedula.Auxiliar.Rol.RolNombre
                            }
                        }
                    }).ToListAsync();
        }

        public async Task<List<ActividadDTO>> ObtenerActividadesPorEstadoAsync(string estado)
        {
            return await _dbContext.Actividades
                    .Include(a => a.Auxiliar)
                        .ThenInclude(a => a.Rol)
                    .Where(a => a.Estado.Equals(estado))
                    .Select(cedula => new ActividadDTO
                    {
                        Id = cedula.Id,
                        CedulaAuxiliar = cedula.CedulaAuxiliar,
                        FechaInicio = cedula.FechaInicio,
                        FechaFin = cedula.FechaFin,
                        Descripcion = cedula.Descripcion,
                        Estado = cedula.Estado,
                        FechaAprobacion = cedula.FechaAprobacion,
                        Auxiliar = new AuxiliarDTO
                        {
                            Cedula = cedula.Auxiliar.Cedula,
                            Nombre = cedula.Auxiliar.Nombre,
                            Usuario = cedula.Auxiliar.Usuario,
                            Contrasena = cedula.Auxiliar.Contrasena,
                            RolId = cedula.Auxiliar.RolId,
                            Rol = new RolDTO
                            {
                                Id = cedula.Auxiliar.Rol.Id,
                                RolNombre = cedula.Auxiliar.Rol.RolNombre
                            }
                        }
                    }).ToListAsync();
        }
        public async Task<bool> ActualizarActividadEstadoAsync(int id, string estado)
        {
            var actividad = await _dbContext.Actividades.FindAsync(id);
            if (actividad == null)
                return false;
            actividad.Estado = estado;
            actividad.FechaAprobacion = DateTime.Now;
            _dbContext.Actividades.Update(actividad);
            return await _dbContext.SaveChangesAsync() > 0;

        }
        public async Task<bool> ActualizarActividadAsync(ActividadDTO actividadDTO)
        {
            var actividad = await _dbContext.Actividades.FirstOrDefaultAsync(a => a.Id == actividadDTO.Id);
            if (actividad == null)
                return false;
            if (actividadDTO.FechaFin != actividad.FechaFin || actividadDTO.FechaInicio != actividad.FechaInicio)
            {
                actividad.Estado = "en espera";
                actividad.FechaAprobacion = null;
            }
            actividad.CedulaAuxiliar = actividadDTO.CedulaAuxiliar;
            actividad.FechaInicio = actividadDTO.FechaInicio;
            actividad.FechaFin = actividadDTO.FechaFin;
            actividad.Descripcion = actividadDTO.Descripcion;
            _dbContext.Actividades.Update(actividad);
            return await _dbContext.SaveChangesAsync() > 0;
        }
    }
}
