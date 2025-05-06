// src/models/dtos.ts
export interface ActividadDTO {
    id: number;  // Cambiado de string a number para coincidir con el backend
    cedulaAuxiliar: string;
    fechaInicio: Date;
    fechaFin: Date;
    descripcion: string;
    estado: string;
    fechaAprobacion?: Date | null;
    auxiliar?: AuxiliarDTO | null;
  }
  
  export interface AuxiliarDTO {
    cedula: string;
    nombre: string;
    usuario: string;
    contrasena: string;
    rolId: number;  // Cambiado de short a number (TypeScript no tiene short)
    rol: RolDTO;
  }
  
  export interface EstadoActividadDTO {
    estado: string;
  }
  
  export interface RolDTO {
    id: number;  // Cambiado de short a number
    rolNombre: string;
  }