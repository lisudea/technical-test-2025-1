import React, { useEffect, useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  CircularProgress,
  Typography,
  TablePagination,
  Chip
} from '@mui/material';
import { fetchActividades } from '../api/actividadService';
import { ActividadDTO } from '../models/dtos';

const ActividadList: React.FC = () => {
  const [actividades, setActividades] = useState<ActividadDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  useEffect(() => {
    const loadActividades = async () => {
      try {
        setLoading(true);
        const data = await fetchActividades();
        setActividades(data);
      } catch (err) {
        setError('Error al cargar las actividades');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };
    loadActividades();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getEstadoColor = (estado: string) => {
    switch(estado.toLowerCase()) {
      case 'aprobado': return 'success';
      case 'pendiente': return 'warning';
      case 'rechazado': return 'error';
      default: return 'default';
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (actividades.length === 0) return <Typography>No hay actividades registradas</Typography>;

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Cédula</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Fecha Inicio</TableCell>
              <TableCell>Fecha Fin</TableCell>
              <TableCell>Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {actividades
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((actividad) => (
                <TableRow key={actividad.id}>
                  <TableCell>{actividad.id}</TableCell>
                  <TableCell>{actividad.cedulaAuxiliar}</TableCell>
                  <TableCell sx={{ maxWidth: 200 }}>
                    <Typography noWrap>{actividad.descripcion}</Typography>
                  </TableCell>
                  <TableCell>
                    {new Date(actividad.fechaInicio).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(actividad.fechaFin).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={actividad.estado} 
                      color={getEstadoColor(actividad.estado)}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={actividades.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página:"
      />
    </Paper>
  );
};

export default ActividadList;