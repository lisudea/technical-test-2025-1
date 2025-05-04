using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Reto2.Dominio.Entidades
{
    [Table("auxiliaresLis")]
    public class Auxiliar
    {
        [Key]
        [Column("cedula")]
        public string Cedula { get; set; } = null!;

        [Column("nombre")]
        public string Nombre { get; set; } = null!;

        [Column("usuario")]
        public string Usuario { get; set; } = null!;

        [Column("contraseña")]
        public string Contrasena { get; set; } = null!;

        [Column("rol_id")]
        public short RolId { get; set; }

        public Rol Rol { get; set; } = null!;
        public ICollection<Actividad> Actividades { get; set; } = new List<Actividad>();
    }
}
