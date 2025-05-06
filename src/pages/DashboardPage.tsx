import React from 'react';
import { Grid, Typography } from '@mui/material';
import FilterForm from '../components/forms/FilterForm';
import ActividadesTable from '../components/tables/ActividadesTable';
import { ActividadDTO } from '../models/dtos';

// Datos de ejemplo tipados correctamente
const sampleData: ActividadDTO[] = [];

export default function DashboardPage() {
  return (
    <div>
      <Typography variant="h4" sx={{ mb: 4 }} gutterBottom>
        Gestión de Actividades
      </Typography>
      
      <Grid container spacing={4}>
        <Grid xs={12} md={4}>
          <FilterForm 
            onFilter={() => {}} 
            onLoading={() => {}} 
          />
        </Grid>
        
        <Grid xs={12}>
          <ActividadesTable 
            actividades={sampleData} 
            onUpdateEstado={() => {}} 
          />
        </Grid>
      </Grid>
    </div>
  );
}