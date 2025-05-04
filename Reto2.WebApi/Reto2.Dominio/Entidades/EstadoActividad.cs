using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Reto2.Dominio.Entidades
{
    [Table("estadoActividad")]
    public class EstadoActividad
    {
        [Key]
        [Column("estado")]
        public string Estado { get; set; } = null!;

        public ICollection<Actividad> Actividades { get; set; } = new List<Actividad>();
    }
}

