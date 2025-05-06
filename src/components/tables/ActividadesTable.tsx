// Agregar al inicio del archivo:
import React, { useState } from 'react';
import { ActividadDTO } from '../../models/dtos';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper, 
    Chip,
    IconButton,
    Menu,
    MenuItem
  } from '@mui/material';

  interface ActividadesTableProps {
    actividades: ActividadDTO[];
    onUpdateEstado: (id: number, estado: string) => void;
  }
  
  export default function ActividadesTable({ actividades, onUpdateEstado }: ActividadesTableProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedId, setSelectedId] = useState<number | null>(null);
  
    const handleClick = (event: React.MouseEvent<HTMLElement>, id: number) => {
      setAnchorEl(event.currentTarget);
      setSelectedId(id);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
      setSelectedId(null);
    };
  
    const handleEstadoChange = (estado: string) => {
      if (selectedId) {
        onUpdateEstado(selectedId, estado);
      }
      handleClose();
    };
  
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Auxiliar</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Fechas</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {actividades.map((actividad) => (
              <TableRow key={actividad.id}>
                <TableCell>
                  {actividad.auxiliar?.nombre}
                  <br />
                  <small>{actividad.cedulaAuxiliar}</small>
                </TableCell>
                <TableCell>{actividad.descripcion}</TableCell>
                <TableCell>
                  Inicio: {new Date(actividad.fechaInicio).toLocaleDateString()}
                  <br />
                  Fin: {new Date(actividad.fechaFin).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Chip 
                    label={actividad.estado}
                    color={
                      actividad.estado === 'Aprobado' ? 'success' : 
                      actividad.estado === 'Rechazado' ? 'error' : 'warning'
                    }
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    aria-label="more"
                    onClick={(e) => handleClick(e, actividad.id)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl) && selectedId === actividad.id}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={() => handleEstadoChange('Pendiente')}>
                      Marcar como Pendiente
                    </MenuItem>
                    <MenuItem onClick={() => handleEstadoChange('Aprobado')}>
                      Aprobar
                    </MenuItem>
                    <MenuItem onClick={() => handleEstadoChange('Rechazado')}>
                      Rechazar
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }