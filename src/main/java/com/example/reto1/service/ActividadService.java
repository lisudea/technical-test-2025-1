package com.example.reto1.service;

import com.example.reto1.model.Actividad;
import com.example.reto1.repository.ActividadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ActividadService {

    @Autowired
    private ActividadRepository actividadRepository;

    public Actividad save(Actividad actividad) {
        return actividadRepository.save(actividad);
    }

    public Actividad update (Actividad actividad) {
        return actividadRepository.save(actividad);
    }

    public Optional<Actividad> findById (Long id) {
        return actividadRepository.findById(id);
    }

    public void deleteById (Long id) {
        actividadRepository.deleteById(id);
    }

    public List<Actividad> findAll () {
        return actividadRepository.findAll();
    }

    public List<Actividad> findByDate(LocalDateTime date) {
        return actividadRepository.findByDate(date);
    }

    public List<Actividad> findByDocumentAux(String documentAux) {
        return actividadRepository.findByDocumentAux(documentAux);
    }

    public Integer countByDate(LocalDateTime date) {
        return actividadRepository.countByDate(date);
    }

    public Double countWorkedHours(String DocumentAux, LocalDateTime start, LocalDateTime end) {
        return actividadRepository.countWorkedHours(DocumentAux, start, end);
    }

    public List<Actividad> findByStatus(String status) {
        return actividadRepository.findByStatus(status);
    }

    public Integer countByDocumentAux(String documentAux) {
        return actividadRepository.countByDocumentAux(documentAux);
    }

}
