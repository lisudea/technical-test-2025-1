package com.proyectolis.registro_actividades_backend.service;

import com.proyectolis.registro_actividades_backend.model.Actividad;
import com.proyectolis.registro_actividades_backend.model.EstadoActividad;
import com.proyectolis.registro_actividades_backend.repository.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ActividadService {
    @Autowired
    private Repository actividadRepository;

    public Actividad crearActividad(Actividad actividad) {
        return actividadRepository.save(actividad);
    }

    public List<Actividad> obtenerActividadesPorFecha(LocalDateTime fecha) {
        return actividadRepository.findByInicio(fecha);
    }

    public List<Actividad> obtenerActividadesPorCedula(String cedula) {
        return actividadRepository.findByCedulaAuxiliar(cedula);
    }

    public List<Actividad> obtenerTodasLasActividades() {
        return actividadRepository.findAll();
    }

    public Actividad obtenerActividadPorId(Long id) {
        return actividadRepository.findById(id).orElseThrow(() -> new RuntimeException("Actividad no encontrada"));
    }

    public Actividad actualizarEstado(Long id, EstadoActividad estado) {
        Optional<Actividad> actividadOptional = actividadRepository.findById(id);
        if (actividadOptional.isPresent()) {
            Actividad actividad = actividadOptional.get();
            actividad.setEstado(estado);  // Actualiza solo el estado
            return actividadRepository.save(actividad);  // Guarda la actividad con el estado actualizado
        } else {
            throw new RuntimeException("Actividad no encontrada con ID: " + id);  // Si no existe la actividad, lanzar error
        }
    }
}

