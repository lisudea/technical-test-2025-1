package com.prueba.lis.controller;

import com.prueba.lis.dto.ActivityDto;
import com.prueba.lis.entity.Activity;
import com.prueba.lis.service.ActivityService;
import com.prueba.lis.mapper.ActivityMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/activities")
public class ActivityController {

    private final ActivityService service;
    private final ActivityMapper mapper;

    @Autowired
    public ActivityController(ActivityService service, ActivityMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    //Metodo para obtener todas las actividades registradas
    @GetMapping
    public List<ActivityDto> getAll() {
        return service.getAll()
                .stream()
                .map(mapper::toDto)  // Convertimos a DTO
                .toList();
    }

    //Metodo para obtener una actividad segun su id
    @GetMapping("/{id}")
    public Optional<ActivityDto> getById(@PathVariable Integer id) {
        Optional<Activity> activity = service.getById(id);
        return activity.map(mapper::toDto);  // Convertimos a DTO si existe
    }

    //Metodo para obtener todas las actividades realizadas por un auxilair
    @GetMapping("/assistant/{assistantId}")
    public List<ActivityDto> findByAssistId(@PathVariable Integer assistantId) {
        return service.findByAssistId(assistantId)
                .stream()
                .map(mapper::toDto)  // Convertimos a DTO
                .toList();
    }

    //Metodo para obtener todas las actividades realizadas en un dia
    @GetMapping("/fecha")
    public List<ActivityDto> getActivitiesByDateRange(
            @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        return service.getActivitiesByDateRange(startDate, endDate)
                .stream()
                .map(mapper::toDto)
                .toList();
    }

    //Metodo para obtener todas las actividades realizadas en un dia ingresando las fechas
    @PostMapping("/fecha")
    public List<ActivityDto> getActivitiesByDateRangeFromBody(
            @RequestBody Map<String, String> dateRange) {
        LocalDateTime startDate = LocalDateTime.parse(dateRange.get("startDate"));
        LocalDateTime endDate = LocalDateTime.parse(dateRange.get("endDate"));
        List<Activity> activities = service.getActivitiesByDateRange(startDate, endDate);
        return activities.stream()
                .map(mapper::toDto)
                .toList();
    }

    //Metodo para contar las actividades hechas en un dia
    @GetMapping("/count/date")
    public Long countActivitiesByDate(@RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return service.countActivitiesOnDate(date);
    }

    //Metodo para registrar una actividad
    @PostMapping
    public ActivityDto save(@RequestBody ActivityDto activityDto) {
        Activity activity = mapper.toEntity(activityDto);  // Convertimos a entidad
        Activity savedActivity = service.save(activity);  // Guardamos la actividad
        return mapper.toDto(savedActivity);  // Convertimos el resultado a DTO
    }

    //Metodo para calcular las horas realizadas por un auxiliar en un dia
    @GetMapping("/hours/assistant/{assistId}")
    public Long getHoursByAssistantAndDate(
            @PathVariable Integer assistId,
            @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return service.calculateHoursByAssistantAndDate(assistId, date);
    }

    //Metodo para modificar campos de una actividad
    @PatchMapping("/{id}") // Endpoint para modificar un campo específico
    public ResponseEntity<?> updateActivityField(@PathVariable Integer id, @RequestBody Map<String, Object> updates) {
        Optional<Activity> existingActivity = service.getById(id);

        if (existingActivity.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        try {
            Activity updatedActivity = service.updateActivityField(existingActivity.get(), updates);
            return ResponseEntity.ok(mapper.toDto(updatedActivity));
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    //Metodo para mostrar todas las actividades en estado: en espera, aprobado o rechazado
    @GetMapping("/estado/{estado}")
    public List<ActivityDto> getActivitiesByEstado(@PathVariable String estado) {
        return service.getActivitiesByEstado(estado)
                .stream()
                .map(mapper::toDto)
                .toList();
    }
}
