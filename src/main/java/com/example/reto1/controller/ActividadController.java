package com.example.reto1.controller;

import com.example.reto1.model.Actividad;
import com.example.reto1.service.ActividadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/actividades")
public class ActividadController {

    @Autowired
    private ActividadService actividadService;

    @PostMapping
    public ResponseEntity<Actividad> create(@RequestBody Actividad actividad) {
        return ResponseEntity.ok(actividadService.save(actividad));
    }

    @PutMapping()
    public ResponseEntity<Actividad> update(@RequestBody Actividad actividad) {
        return ResponseEntity.ok(actividadService.update(actividad));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Actividad> findById(@PathVariable Long id) {
        return actividadService.findById(id).map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        actividadService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Actividad>> findAll() {
        return ResponseEntity.ok(actividadService.findAll());
    }

    @GetMapping("/date")
    public ResponseEntity<List<Actividad>> findByDate(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime date) {
        return ResponseEntity.ok(actividadService.findByDate(date));
    }

    @GetMapping("/auxiliar/{documentAux}")
    public ResponseEntity<List<Actividad>> findByAux(@PathVariable String documentAux) {
        return ResponseEntity.ok(actividadService.findByDocumentAux(documentAux));
    }

    @GetMapping("/date/count")
    public ResponseEntity<Integer> countByDate(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime date) {
        return ResponseEntity.ok(actividadService.countByDate(date));
    }

    @GetMapping("/date/count/worked")
    public ResponseEntity<Double> countWorkedHours(
            @RequestParam String documentAux,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        return ResponseEntity.ok(actividadService.countWorkedHours(documentAux, start, end));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Actividad>> findByStatus(
            @PathVariable String status) {
        return ResponseEntity.ok(actividadService.findByStatus(status));
    }

    @GetMapping("/auxiliar/count/{documentAux}")
    public ResponseEntity<Integer> countByAux(
            @PathVariable String documentAux) {
        return ResponseEntity.ok(actividadService.countByDocumentAux(documentAux));
    }
}
