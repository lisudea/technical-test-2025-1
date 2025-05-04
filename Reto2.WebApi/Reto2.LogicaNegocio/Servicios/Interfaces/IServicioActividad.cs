using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Reto2.Dominio.DTOS;
using Reto2.Dominio.Entidades;

namespace Reto2.LogicaNegocio.Servicios.Interfaces
{
    public interface IServicioActividad 
    {
        Task<List<ActividadDTO>> ObtenerActividadesAsync();
        Task<ActividadDTO> ObtenerActividadPorIdAsync(int id);
        Task<List<ActividadDTO>> ObtenerActividadesPorFechaFinAsync(DateTime fechaFin);
        Task<List<ActividadDTO>> ObtenerActividadesPorCedulaAsync(string cedula);
        Task<List<ActividadDTO>> ObtenerActividadesPorEstadoAsync(string estado);
        Task<int?> ObtenerActividadEntreFechasConIdAsync(DateTime fechaInicio,DateTime fechaFin, string cedula);
        Task<bool> CrearActividadAsync(ActividadDTO actividad);
        Task<bool> ActualizarActividadEstadoAsync(int id, string estado);
        Task<bool> ActualizarActividadAsync(ActividadDTO actividad);

    }
}

