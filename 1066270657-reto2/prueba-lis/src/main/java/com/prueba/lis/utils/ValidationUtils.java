package com.prueba.lis.utils;

import java.time.LocalDateTime;
import java.util.Map;

/**
 * Clase destinada a las validaciones basicas de las entradas por el cliente
 */
public class ValidationUtils {

    public static void validateNotBlank(String value, String fieldName) {
        if (value == null || value.trim().isEmpty()) {
            throw new IllegalArgumentException(fieldName + " no puede estar vacío.");
        }
    }

    public static void validateNotNull(Object value, String fieldName) {
        if (value == null) {
            throw new IllegalArgumentException(fieldName + " no puede ser nulo.");
        }
    }

    public static void validatePositiveInteger(String value, String fieldName) {
        validateNotBlank(value, fieldName);
        try {
            Integer intValue = Integer.parseInt(value);
            if (intValue <= 0) {
                throw new IllegalArgumentException(fieldName + " debe ser un número entero positivo.");
            }
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException(fieldName + " debe ser un número entero válido.");
        }
    }

    public static void validateLocalDateTimeFormat(String value, String fieldName) {
        validateNotBlank(value, fieldName);
        try {
            LocalDateTime.parse(value); // Intenta parsear con el formato ISO 8601 por defecto
        } catch (Exception e) {
            throw new IllegalArgumentException(fieldName + " debe tener un formato de fecha y hora válido (ISO 8601: YYYY-MM-DDTHH:MM:SS).");
        }
    }

    public static void validateEstado(String value) {
        validateNotBlank(value, "Estado");
        if (!value.equalsIgnoreCase("aprobado") &&
                !value.equalsIgnoreCase("rechazado") &&
                !value.equalsIgnoreCase("en espera")) {
            throw new IllegalArgumentException("Estado debe ser 'aprobado', 'rechazado' o 'en espera'.");
        }
    }

    // Puedes agregar más funciones de validación según tus necesidades,
    // por ejemplo, para rangos de fechas, longitudes máximas, formatos específicos, etc.

    public static void validateUpdatesMap(Map<String, Object> updates) {
        if (updates == null || updates.isEmpty()) {
            throw new IllegalArgumentException("No se proporcionaron campos para actualizar.");
        }
    }
}