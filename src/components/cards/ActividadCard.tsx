import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Chip, 
  Stack, 
  Divider,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ActividadDTO } from '../../models/dtos';

interface ActividadCardProps {
  actividad: ActividadDTO;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onChangeStatus?: (id: number, newStatus: string) => void;
}

const ESTADOS = {
  APROBADO: 'Aprobado',
  RECHAZADO: 'Rechazado',
  PENDIENTE: 'Pendiente'
} as const;

export default function ActividadCard({ 
  actividad,
  onEdit,
  onDelete,
  onChangeStatus
}: ActividadCardProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getStatusColor = () => {
    switch(actividad.estado) {
      case ESTADOS.APROBADO: return 'success';
      case ESTADOS.RECHAZADO: return 'error';
      default: return 'warning';
    }
  };

  const handleAction = (action?: (id: number, ...args: any[]) => void, ...args: any[]) => {
    handleClose();
    if (action) {
      action(actividad.id, ...args);
    }
  };

  return (
    <Card sx={{ minWidth: 275, mb: 2, boxShadow: 3 }}>
      <CardContent>
        <Stack 
          direction="row" 
          justifyContent="space-between" 
          alignItems="center"
          mb={1}
        >
          <Typography variant="h6" component="div">
            {actividad.descripcion.substring(0, 30)}...
          </Typography>
          
          <div>
            <IconButton
              aria-label="more"
              aria-controls={open ? 'actividad-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="actividad-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={() => handleAction(onEdit)}>Editar</MenuItem>
              <MenuItem onClick={() => handleAction(onChangeStatus, ESTADOS.APROBADO)}>
                Aprobar
              </MenuItem>
              <MenuItem onClick={() => handleAction(onChangeStatus, ESTADOS.RECHAZADO)}>
                Rechazar
              </MenuItem>
              <MenuItem onClick={() => handleAction(onDelete)}>Eliminar</MenuItem>
            </Menu>
          </div>
        </Stack>

        <Divider sx={{ my: 1 }} />

        <Stack spacing={1}>
          <Typography variant="body2">
            <strong>Auxiliar:</strong> {actividad.auxiliar?.nombre || actividad.cedulaAuxiliar}
          </Typography>
          
          <Typography variant="body2">
            <strong>Fecha Inicio:</strong> {actividad.fechaInicio.toLocaleDateString()}
          </Typography>
          
          <Typography variant="body2">
            <strong>Fecha Fin:</strong> {actividad.fechaFin.toLocaleDateString()}
          </Typography>

          {actividad.fechaAprobacion && (
            <Typography variant="body2">
              <strong>Fecha Aprobación:</strong> {actividad.fechaAprobacion.toLocaleDateString()}
            </Typography>
          )}
          
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body2"><strong>Estado:</strong></Typography>
            <Chip 
              label={actividad.estado} 
              color={getStatusColor()}
              size="small"
            />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}