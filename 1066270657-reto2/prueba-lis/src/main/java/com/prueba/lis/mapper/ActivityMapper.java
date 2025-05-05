package com.prueba.lis.mapper;

import com.prueba.lis.dto.ActivityDto;
import com.prueba.lis.entity.Activity;

import org.mapstruct.Mapper;

/**
 * {@code ActivityMapper} define las reglas para la conversión bidireccional
 * entre la entidad {@code Activity} y el DTO {@code ActivityDto} utilizando MapStruct.
 */
@Mapper(componentModel = "spring")
public class ActivityMapper {

    // Convertir de ActivityDto a Activity
    public Activity toEntity(ActivityDto dto) {
        Activity activity = new Activity();
        activity.setId(dto.getId());
        activity.setAssistName(dto.getAssistName());
        activity.setAssistId(dto.getAssistId());
        activity.setDateInit(dto.getDateInit());
        activity.setDateEnd(dto.getDateEnd());
        activity.setDescription(dto.getDescription());
        activity.setEstado("en espera");  // O un valor predeterminado, dependiendo del caso
        return activity;
    }

    // Convertir de Activity a ActivityDto
    public ActivityDto toDto(Activity activity) {
        ActivityDto dto = new ActivityDto();
        dto.setId(activity.getId());
        dto.setAssistId(activity.getAssistId());
        dto.setAssistName(activity.getAssistName());
        dto.setAssistId(activity.getAssistId());
        dto.setDateInit(activity.getDateInit());
        dto.setDateEnd(activity.getDateEnd());
        dto.setDescription(activity.getDescription());
        dto.setEstado("en espera");
        return dto;
    }
}

