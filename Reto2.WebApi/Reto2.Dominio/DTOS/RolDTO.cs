using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reto2.Dominio.DTOS
{
    public class RolDTO
    {
        public short Id { get; set; }
        public string RolNombre { get; set; } = null!;

    }
}
