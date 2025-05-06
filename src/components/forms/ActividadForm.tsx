// FilterForm.tsx
import { useState } from 'react';
import { ActividadDTO } from '../../models/dtos';
import { 
  TextField, 
  Button, 
  Stack, 
  MenuItem,
  Paper,
  Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { 
  fetchActividadesPorEstado, 
  fetchActividadesPorFechaFin, 
  fetchActividadesPorCedula 
} from '../../api/actividadService';

export default function FilterForm({ onFilter, onLoading }: FilterFormProps) {
  const [filters, setFilters] = useState({
    estado: '',
    fechaFin: null as Date | null,
    cedula: ''
  });

  const handleFilter = async () => {
    onLoading(true);
    try {
      let data: ActividadDTO[] = [];
      
      if (filters.estado) {
        data = await fetchActividadesPorEstado(filters.estado);
      } 
      else if (filters.fechaFin) {
        const fechaFormateada = filters.fechaFin.toISOString().split('T')[0];
        data = await fetchActividadesPorFechaFin(fechaFormateada);
      } 
      else if (filters.cedula) {
        data = await fetchActividadesPorCedula(filters.cedula);
      }

      onFilter(data || []);
    } catch (error) {
      console.error("Error al filtrar:", error);
      onFilter([]); // Envía array vacío en caso de error
    } finally {
      onLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>Filtrar Actividades</Typography>
      <Stack spacing={2}>
        <TextField
          select
          label="Estado"
          value={filters.estado}
          onChange={(e) => setFilters({
            ...filters, 
            estado: e.target.value, 
            fechaFin: null,
            cedula: ''
          })}
          fullWidth
        >
          <MenuItem value="">Todos los estados</MenuItem>
          <MenuItem value="Pendiente">Pendiente</MenuItem>
          <MenuItem value="Aprobado">Aprobado</MenuItem>
          <MenuItem value="Rechazado">Rechazado</MenuItem>
        </TextField>

        <DatePicker
          label="Fecha fin"
          value={filters.fechaFin}
          onChange={(newValue) => setFilters({
            ...filters, 
            fechaFin: newValue,
            estado: '',
            cedula: ''
          })}
          slotProps={{ textField: { fullWidth: true } }}
        />

        <TextField
          label="Cédula auxiliar"
          value={filters.cedula}
          onChange={(e) => setFilters({
            ...filters, 
            cedula: e.target.value,
            estado: '',
            fechaFin: null
          })}
          fullWidth
        />

        <Button 
          variant="contained" 
          onClick={handleFilter}
          disabled={!filters.estado && !filters.fechaFin && !filters.cedula}
          sx={{ mt: 2 }}
        >
          Aplicar Filtros
        </Button>
      </Stack>
    </Paper>
  );
}