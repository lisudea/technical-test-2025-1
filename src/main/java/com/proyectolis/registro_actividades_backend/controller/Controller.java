package com.proyectolis.registro_actividades_backend.controller;

import com.proyectolis.registro_actividades_backend.model.Actividad;
import com.proyectolis.registro_actividades_backend.model.EstadoActividad;
import com.proyectolis.registro_actividades_backend.service.ActividadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/actividades")
public class Controller {

    @Autowired
    private ActividadService actividadService;

    // Crear una nueva actividad
    @PostMapping
    public ResponseEntity<Actividad> crearActividad(@RequestBody Actividad actividad) {
        Actividad actividadCreada = actividadService.crearActividad(actividad);
        return ResponseEntity.status(HttpStatus.CREATED).body(actividadCreada);
    }

    // Obtener todas las actividades
    @GetMapping
    public ResponseEntity<List<Actividad>> obtenerTodasLasActividades() {
        List<Actividad> actividades = actividadService.obtenerTodasLasActividades();
        return ResponseEntity.ok(actividades);
    }

    // Obtener actividades por fecha
    @GetMapping("/fecha/{fecha}")
    public ResponseEntity<List<Actividad>> obtenerActividadesPorFecha(@PathVariable String fecha) {
        LocalDateTime fechaConvertida = LocalDateTime.parse(fecha);  // Convertir string a LocalDateTime
        List<Actividad> actividades = actividadService.obtenerActividadesPorFecha(fechaConvertida);
        return ResponseEntity.ok(actividades);
    }

    // Obtener actividades por cédula
    @GetMapping("/cedula/{cedula}")
    public ResponseEntity<List<Actividad>> obtenerActividadesPorCedula(@PathVariable String cedula) {
        List<Actividad> actividades = actividadService.obtenerActividadesPorCedula(cedula);
        return ResponseEntity.ok(actividades);
    }

    // Marcar actividad como Aprobada/Rechazada
    @PutMapping("/estado/{id}")
    public ResponseEntity<Actividad> actualizarEstado(
            @PathVariable Long id,
            @RequestParam String estado // Recibe el estado como parámetro de consulta
    ) {
        EstadoActividad estadoEnum;
        try {
            estadoEnum = EstadoActividad.valueOf(estado.toUpperCase()); // Convertir el string a enum (case-insensitive)
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null); // Manejar si el estado enviado no es válido
        }
        Actividad actividadActualizada = actividadService.actualizarEstado(id, estadoEnum);
        return ResponseEntity.ok(actividadActualizada);
    }


}
