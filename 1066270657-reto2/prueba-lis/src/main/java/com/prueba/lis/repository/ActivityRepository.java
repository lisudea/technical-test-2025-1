package com.prueba.lis.repository;

import com.prueba.lis.entity.Activity;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDateTime;
import java.util.List;

/**
 * {@code ActivityRepository} es un repositorio Spring Data JPA que proporciona
 * mecanismos para interactuar con la tabla 'activities' y realizar operaciones CRUD.
 * También define métodos para consultas personalizadas basadas en los atributos
 * de la entidad.
 */
public interface ActivityRepository extends CrudRepository<Activity, Integer> {

    List<Activity> findByDateInitBetween(LocalDateTime start, LocalDateTime end);
    List<Activity> findByAssistId(Integer assistId);
    Long countByDateInitBetween(LocalDateTime startOfDay, LocalDateTime endOfDay);
    List<Activity> findByAssistIdAndDateInitBetween(Integer assistId, LocalDateTime startOfDay, LocalDateTime endOfDay);
    List<Activity> findByEstado(String estado);

}
