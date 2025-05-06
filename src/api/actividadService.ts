import axios from 'axios';
import { ActividadDTO } from '../models/dtos';

// Configuración mejorada de Axios
const api = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  }
});

// Interceptor de solicitudes para debug
api.interceptors.request.use(config => {
  console.log(`[Request] ${config.method?.toUpperCase()} ${config.url}`);
  return config;
});

// Interceptor de respuestas mejorado
api.interceptors.response.use(
  response => {
    console.log(`[Response] ${response.status} ${response.config.url}`);
    return response;
  },
  error => {
    const errorInfo = {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.message,
      data: error.response?.data
    };
    console.error('[API Error]', errorInfo);
    throw new Error(error.response?.data?.message || 'Error de conexión con el servidor');
  }
);

// Endpoints corregidos y validados
const ACTIVIDAD_ENDPOINT = '/api/Actividad';

export const fetchActividades = async (id?: number): Promise<ActividadDTO[]> => {
  try {
    const params = id ? { id } : {};
    const response = await api.get(`${ACTIVIDAD_ENDPOINT}/ObtenerActividades`, { 
      params,
      paramsSerializer: { indexes: null } // Para mejor serialización
    });
    return Array.isArray(response.data) ? response.data : [response.data];
  } catch (error) {
    console.error('Error al obtener actividades:', error);
    throw error;
  }
};

export const fetchActividadesPorEstado = async (estado: string): Promise<ActividadDTO[]> => {
  try {
    const response = await api.get(`${ACTIVIDAD_ENDPOINT}/ObtenerActividadesPorEstado`, {
      params: { estado }
    });
    return response.data?.actividades || response.data || [];
  } catch (error) {
    console.error('Error al filtrar por estado:', error);
    throw error;
  }
};

export const fetchActividadesPorFechaFin = async (fechaFin: string | Date): Promise<ActividadDTO[]> => {
  try {
    // Asegura formato YYYY-MM-DD
    const fecha = typeof fechaFin === 'string' ? fechaFin : fechaFin.toISOString().split('T')[0];
    const response = await api.get(`${ACTIVIDAD_ENDPOINT}/ObtenerActividadesPorFechaFin`, {
      params: { fechaFin: fecha }
    });
    return response.data?.actividades || response.data || [];
  } catch (error) {
    console.error('Error al filtrar por fecha:', error);
    throw error;
  }
};

export const fetchActividadesPorCedula = async (cedula: string): Promise<ActividadDTO[]> => {
  try {
    const response = await api.get(`${ACTIVIDAD_ENDPOINT}/ObtenerActividadesPorCedulas`, {
      params: { cedula }
    });
    return response.data?.actividades || response.data || [];
  } catch (error) {
    console.error('Error al filtrar por cédula:', error);
    throw error;
  }
};

export const createActividad = async (actividad: Omit<ActividadDTO, 'id'>): Promise<ActividadDTO> => {
  try {
    // Validación básica
    if (!actividad.descripcion || !actividad.cedulaAuxiliar) {
      throw new Error('Datos requeridos faltantes');
    }

    const response = await api.post(`${ACTIVIDAD_ENDPOINT}/CrearActividad`, actividad);
    return response.data;
  } catch (error) {
    console.error('Error al crear actividad:', error);
    throw error;
  }
};

export const updateActividadEstado = async (id: number, estado: string): Promise<void> => {
  try {
    await api.put(`${ACTIVIDAD_ENDPOINT}/ActualizarActividadEstado`, null, {
      params: { id, estado }
    });
  } catch (error) {
    console.error('Error al actualizar estado:', error);
    throw error;
  }
};

// Función para verificar conexión
export const checkAPIHealth = async (): Promise<boolean> => {
  try {
    await api.get(`${ACTIVIDAD_ENDPOINT}/ObtenerActividades`, {
      params: { test: 1 } // Parámetro opcional para pruebas
    });
    return true;
  } catch (error) {
    console.error('Health check failed:', error);
    return false;
  }
};