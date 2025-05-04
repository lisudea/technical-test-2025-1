using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reto2.Dominio.DTOS
{
    public class AuxiliarDTO
    {
        public string Cedula { get; set; }
        public string Nombre { get; set; } = null!;
        public string Usuario { get; set; } = null!;
        public string Contrasena { get; set; } = null!;
        public short RolId { get; set; }
        public RolDTO Rol { get; set; } = null!;
    }
}
