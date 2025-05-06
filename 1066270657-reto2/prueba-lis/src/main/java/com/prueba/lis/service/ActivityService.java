package com.prueba.lis.service;

import com.prueba.lis.entity.Activity;
import com.prueba.lis.repository.ActivityRepository;
import com.prueba.lis.utils.EntityUpdater;
import com.prueba.lis.utils.ValidationUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.*;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.BiConsumer;

/**
 * {@code ActivityService} es la capa de servicio que contiene la lógica de negocio
 * relacionada con las entidades {@code Activity}. Actúa como intermediario
 * entre la capa de presentación (Controller) y la capa de acceso a datos (Repository).
 */
@Service
public class ActivityService {
    @Autowired
    private ActivityRepository repository;

    private final Map<String, BiConsumer<Object, String>> fieldValidators = new HashMap<>();

    public ActivityService() {
        fieldValidators.put("assistName", (value, fieldName) -> ValidationUtils.validateNotBlank(value.toString(), fieldName));
        fieldValidators.put("assistId", (value, fieldName) -> ValidationUtils.validatePositiveInteger(value.toString(), fieldName));
        fieldValidators.put("dateInit", (value, fieldName) -> ValidationUtils.validateLocalDateTimeFormat(value.toString(), fieldName));
        fieldValidators.put("dateEnd", (value, fieldName) -> ValidationUtils.validateLocalDateTimeFormat(value.toString(), fieldName));
        fieldValidators.put("estado", (value, fieldName) -> ValidationUtils.validateEstado(value.toString()));

    }

    public List<Activity> getAll() {
        return (List<Activity>) repository.findAll();
    }

    public Optional<Activity> getById(Integer id) {
        return repository.findById(id);
    }
    public void delete(Activity activity){repository.delete(activity);}

    public Activity save(Activity activity) {
        activity.setEstado("en espera");
        return repository.save(activity);
    }

    public List<Activity> getActivitiesByDateRange(LocalDateTime start, LocalDateTime end) {
        return repository.findByDateInitBetween(start, end);
    }

    public List<Activity> findByAssistId(Integer assistId){
        return repository.findByAssistId(assistId);
    }
    public Long countActivitiesOnDate(LocalDate date) {
        ValidationUtils.validateNotNull(date, "Fecha");
        LocalDateTime startOfDay = LocalDateTime.of(date, LocalTime.MIN); // Inicio del día (00:00:00)
        LocalDateTime endOfDay = LocalDateTime.of(date.plusDays(1), LocalTime.MIN); // Inicio del siguiente día (00:00:00)
        return repository.countByDateInitBetween(startOfDay, endOfDay);
    }

    public Long calculateHoursByAssistantAndDate(Integer assistId, LocalDate date) {
        ValidationUtils.validateNotNull(assistId, "ID del auxiliar");
        ValidationUtils.validateNotNull(date, "Fecha");
        LocalDateTime startOfDay = LocalDateTime.of(date, LocalTime.MIN);
        LocalDateTime endOfDay = LocalDateTime.of(date.plusDays(1), LocalTime.MIN);
        List<Activity> activities = repository.findByAssistIdAndDateInitBetween(assistId, startOfDay, endOfDay);

        long totalHours = 0;
        for (Activity activity : activities) {
            if (activity.getDateInit() != null && activity.getDateEnd() != null) {
                long hours = ChronoUnit.HOURS.between(activity.getDateInit(), activity.getDateEnd());
                totalHours += hours;
            }
        }
        return totalHours;
    }

    public Activity updateActivityField(Activity activity, Map<String, Object> updates) {
        ValidationUtils.validateUpdatesMap(updates); // Valida que el mapa no esté vacío

        for (Map.Entry<String, Object> entry : updates.entrySet()) {
            String fieldName = entry.getKey();
            Object value = entry.getValue();

            if (fieldValidators.containsKey(fieldName)) {
                fieldValidators.get(fieldName).accept(value, fieldName);
            }
            // Si el campo no tiene una validación específica, simplemente se actualiza
        }

        // Actualización genérica de los campos
        Activity updatedActivity = EntityUpdater.updateFields(activity, updates);
        return repository.save(updatedActivity);
    }

    public List<Activity> getActivitiesByEstado(String estado) {
        ValidationUtils.validateNotBlank(estado, "Estado");
        ValidationUtils.validateEstado(estado);
        return repository.findByEstado(estado);
    }
}
