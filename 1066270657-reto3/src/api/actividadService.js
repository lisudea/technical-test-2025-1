import api from './axiosConfig';

export const actividadService = {
    // Crear una nueva actividad
    crearActividad: async (actividad) => {
        try {
            const response = await api.post('', actividad);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Obtener todas las actividades
    obtenerActividades: async () => {
        try {
            const response = await api.get('');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Obtener actividades por documento de auxiliar
    obtenerActividadesPorAuxiliar: async (documento) => {
        try {
            const response = await api.get(`/assistant/${documento}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Actualizar estado de una actividad
    actualizarEstadoActividad: async (id, estado) => {
        try {
            const response = await api.patch(`/${id}`, { estado });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}; 