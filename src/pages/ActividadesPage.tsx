import React, { useState, useEffect } from 'react';
import { 
  Grid, 
  Typography, 
  CircularProgress,
  Snackbar,
  Alert,
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { ActividadDTO } from '../models/dtos';
import FilterForm from '../components/forms/FilterForm';
import ActividadesTable from '../components/tables/ActividadesTable';
import ActividadForm from '../components/forms/ActividadForm';
import { 
  fetchActividades, 
  createActividad,
  updateActividadEstado
} from '../api/actividadService';

export default function ActividadesPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [actividades, setActividades] = useState<ActividadDTO[]>([]);
  const [filteredActividades, setFilteredActividades] = useState<ActividadDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formKey, setFormKey] = useState(0); // Para resetear el formulario

  useEffect(() => {
    loadActividades();
  }, []);

  const loadActividades = async () => {
    try {
      setLoading(true);
      const data = await fetchActividades();
      setActividades(data);
      setFilteredActividades(data); // Inicialmente muestra todos
    } catch (err) {
      handleError('Error al cargar actividades', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateActividad = async (actividad: Omit<ActividadDTO, 'id'>) => {
    try {
      await createActividad(actividad);
      await loadActividades();
      setFormKey(prev => prev + 1); // Resetear formulario
      handleSuccess('Actividad creada correctamente');
    } catch (err) {
      handleError('Error al crear actividad', err);
    }
  };

  const handleUpdateEstado = async (id: number, estado: string) => {
    try {
      await updateActividadEstado(id, estado);
      await loadActividades();
      handleSuccess('Estado actualizado correctamente');
    } catch (err) {
      handleError('Error al actualizar estado', err);
    }
  };

  const handleFilter = (filteredData: ActividadDTO[]) => {
    setFilteredActividades(filteredData);
  };

  const handleError = (message: string, error: any) => {
    console.error(message, error);
    setError(message);
    setSuccess('');
  };

  const handleSuccess = (message: string) => {
    setSuccess(message);
    setError('');
  };

  const handleCloseSnackbar = () => {
    setError('');
    setSuccess('');
  };

  return (
    <Box sx={{ 
      flexGrow: 1, 
      p: isMobile ? 1 : 3,
      backgroundColor: theme.palette.background.default
    }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom sx={{ color: theme.palette.primary.main }}>
            Gestión de Actividades
          </Typography>
        </Grid>
  
        <Grid item xs={12} md={4}>
          <ActividadForm 
            key={formKey} // Key para resetear
            onSubmit={handleCreateActividad} 
          />
        </Grid>
  
        <Grid item xs={12} md={8}>
          <FilterForm 
            onFilter={handleFilter} 
            onLoading={setLoading} 
            actividades={actividades}
          />
          
          {loading ? (
            <Box display="flex" justifyContent="center" mt={4}>
              <CircularProgress size={60} />
            </Box>
          ) : (
            <ActividadesTable 
              actividades={filteredActividades} 
              onUpdateEstado={handleUpdateEstado}
            />
          )}
        </Grid>
      </Grid>
  
      {/* Notificaciones */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={handleCloseSnackbar} sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
  
      <Snackbar
        open={!!success}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={handleCloseSnackbar} sx={{ width: '100%' }}>
          {success}
        </Alert>
      </Snackbar>
    </Box>
  );
}