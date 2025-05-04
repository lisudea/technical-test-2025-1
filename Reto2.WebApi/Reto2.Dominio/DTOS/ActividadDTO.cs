using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Reto2.Dominio.Entidades;

namespace Reto2.Dominio.DTOS
{
    public class ActividadDTO
    {

        public int Id { get; set; }
        public string CedulaAuxiliar { get; set; } = null!;
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
        public string Descripcion { get; set; } = null!;
        public string Estado { get; set; } = null!;
        public DateTime? FechaAprobacion { get; set; }
        public AuxiliarDTO? Auxiliar { get; set; } = null!;
    }
  
}
