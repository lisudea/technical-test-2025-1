package com.proyectolis.registro_actividades_backend.repository;

import com.proyectolis.registro_actividades_backend.model.Actividad;
import com.proyectolis.registro_actividades_backend.model.EstadoActividad;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface Repository extends JpaRepository<Actividad, Long> {
    List<Actividad> findByInicio(LocalDateTime fecha);
    List<Actividad> findByCedulaAuxiliar(String cedula);
    Actividad findActividadByCedulaAuxiliar(String cedula);
    List<Actividad> findByEstado(EstadoActividad estado);
}
