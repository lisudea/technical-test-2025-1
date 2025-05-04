using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Reto2.Dominio.Entidades
{
    [Table("actividad")]
    public class Actividad
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("cedula_auxiliar")]
        public string CedulaAuxiliar { get; set; } = null!;

        [Column("fecha_inicio")]
        public DateTime FechaInicio { get; set; }

        [Column("fecha_fin")]
        public DateTime FechaFin { get; set; }

        [Column("descripcion")]
        public string Descripcion { get; set; } = null!;

        [Column("estado")]
        public string Estado { get; set; } = null!;

        [Column("fecha_aprobacion")]
        public DateTime? FechaAprobacion { get; set; }

        public Auxiliar Auxiliar { get; set; } = null!;
        public EstadoActividad EstadoActividad { get; set; } = null!;
    }
}
