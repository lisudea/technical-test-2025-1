// En src/main/java/com/prueba/lis/utils/EntityUpdater.java
package com.prueba.lis.utils;

import com.prueba.lis.entity.Activity;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.time.LocalDateTime;
import java.util.Map;

/**
 * Clase destinada a identificar los campos seleccionados para modificación
 */
public class EntityUpdater {

    public static Activity updateFields(Activity activity, Map<String, Object> updates) {
        if (updates == null || updates.isEmpty()) {
            throw new IllegalArgumentException("No se proporcionaron campos para actualizar.");
        }

        for (Map.Entry<String, Object> entry : updates.entrySet()) {
            String fieldName = entry.getKey();
            Object value = entry.getValue();

            /* Convertir el nombre del campo a el nombre del método setter (ej: assistName -> setAssistName) */
            String setterMethodName = "set" + fieldName.substring(0, 1).toUpperCase() + fieldName.substring(1);

            try {
                Method setter = Activity.class.getMethod(setterMethodName, value.getClass());
                setter.invoke(activity, value);
            } catch (NoSuchMethodException e) {
                // El campo no existe o el tipo no coincide, podrías loggear o lanzar una excepción
                System.err.println("No se encontró el método setter para el campo: " + fieldName);
            } catch (InvocationTargetException | IllegalAccessException e) {
                // Error al invocar el setter
                e.printStackTrace();
            }
        }
        return activity;
    }
}