using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Reto2.Dominio.DTOS;
using Reto2.LogicaNegocio.Servicios.Interfaces;

namespace Reto2.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ActividadController : ControllerBase
    {
        private readonly IServicioActividad _servicioActividad;
        // Constructor
        public ActividadController(IServicioActividad servicioActividad)
        {
            _servicioActividad = servicioActividad;
        }

        [HttpGet]
        [Route("ObtenerActividades")]
        public async Task<IActionResult> ObtenerActividades(int? id)
        {

            if (id != null)
            {
                var actividad = await _servicioActividad.ObtenerActividadPorIdAsync(id.Value);

                if (actividad == null)
                    return NotFound("No se encontró la actividad con el ID proporcionado.");
                return Ok(actividad);
            }

            var actividades = await _servicioActividad.ObtenerActividadesAsync();
            return Ok(actividades);
        }

        [HttpGet]
        [Route("ObtenerActividadesPorFechaFin")]
        public async Task<IActionResult> ObtenerActividadesPorFechaInicio(DateTime fechaFin)
        {
            var actividades = await _servicioActividad.ObtenerActividadesPorFechaFinAsync(fechaFin);
            return Ok(new { CantidadActividades = actividades.Count(), Actividades = actividades });
        }

        [HttpGet]
        [Route("ObtenerActividadesPorCedulas")]
        public async Task<IActionResult> ObtenerActividadesPorCedulas(string cedula)
        {

            var actividades = await _servicioActividad.ObtenerActividadesPorCedulaAsync(cedula);
            return Ok(new { CantidadActividades = actividades.Count(), Actividades = actividades });
        }

        [HttpGet]
        [Route("ObtenerActividadesPorEstado")]
        public async Task<IActionResult> ObtenerActividadesPorEstado(string estado)
        {
            var actividades = await _servicioActividad.ObtenerActividadesPorEstadoAsync(estado);
            return Ok(new { CantidadActividades = actividades.Count(), Actividades = actividades });
        }

        [HttpGet]
        [Route("ObtenerActividadEntreFechasConId")]
        public async Task<IActionResult> ObtenerActividadEntreFechasConId(DateTime fechaInicio, DateTime fechaFin, string cedula)
        {
            var cantidadHorasTrabajadas = await _servicioActividad.ObtenerActividadEntreFechasConIdAsync(fechaInicio,fechaFin,cedula);
            return Ok(new { CantidadHoras=cantidadHorasTrabajadas});
        }

        [HttpPost]
        [Route("CrearActividad")]
        public async Task<IActionResult> CrearActividad([FromBody] ActividadDTO actividad)
        {
            if (actividad == null)
                return BadRequest("La actividad no puede ser nula.");
            try
            {
                if (actividad.FechaFin < actividad.FechaInicio)
                    return BadRequest("La fecha de fin no puede ser anterior a la fecha de inicio.");

                var resultado = await _servicioActividad.CrearActividadAsync(actividad);
                return Ok(new { Mensaje = "Actividad creada con éxito.", Actividad = resultado });
            }
            catch (Exception ex)
            {
                return BadRequest($"Error al validar las fechas: {ex.Message}");
            }

        }
        [HttpPut]
        [Route("ActualizarActividadEstado")]
        public async Task<IActionResult> ActualizarActividadEstado(int id, string estado)
        {
            try
            {
                var resultado = await _servicioActividad.ActualizarActividadEstadoAsync(id, estado);
                return Ok(new { Mensaje = "Actividad actualizada con éxito.", Actividad = resultado });
            }
            catch (Exception ex)
            {
                return BadRequest($"Error al validar las fechas: {ex.Message}");
            }
        }

        [HttpPut]
        [Route("ActualizarActividad")]
        public async Task<IActionResult> ActualizarActividad([FromBody] ActividadDTO actividad)
        {
            if (actividad == null)
                return BadRequest("La actividad no puede ser nula.");
            if (actividad.Id <= 0)
                return BadRequest("El ID de la actividad no puede ser menor o igual a cero.");
            try
            {
                if (actividad.FechaFin < actividad.FechaInicio)
                    return BadRequest("La fecha de fin no puede ser anterior a la fecha de inicio.");
                var resultado = await _servicioActividad.ActualizarActividadAsync(actividad);
                return Ok(new { Mensaje = "Actividad actualizada con éxito.", Actividad = resultado });
            }
            catch (Exception ex)
            {
                return BadRequest($"Error al validar las fechas: {ex.Message}");
            }
        }

    }

}
