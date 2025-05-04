using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Reto2.Dominio.Entidades
{
    [Table("roles")]
    public class Rol
    {
        [Key]
        [Column("id")]
        public short Id { get; set; }

        [Column("rol")]
        public string RolNombre { get; set; } = null!;

        public ICollection<Auxiliar> Auxiliares { get; set; } = new List<Auxiliar>();
    }
}
