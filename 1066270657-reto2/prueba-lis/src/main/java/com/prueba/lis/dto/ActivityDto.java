package com.prueba.lis.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

/**
 * DTO para transferir datos de la entidad {@code Activity} entre Controller y Service.
 * Contiene campos para la información de la actividad y validaciones de entrada.
 */
public class ActivityDto {


    private Integer id;
    @NotBlank(message = "El nombre del auxiliar no puede estar vacío")
    private String assistName;

    @NotBlank(message = "El ID del auxiliar no puede estar vacío")
    private Integer assistId;

    @NotNull(message = "La fecha de inicio no puede ser nula")
    private LocalDateTime dateInit;

    @NotNull(message = "La fecha de fin no puede ser nula")
    private LocalDateTime dateEnd;

    private String description;
    private String estado;

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    // Getters y Setters
    public String getAssistName() {
        return assistName;
    }

    public void setAssistName(String assistName) {
        this.assistName = assistName;
    }

    public Integer getAssistId() {
        return assistId;
    }

    public void setAssistId(Integer assistId) {
        this.assistId = assistId;
    }

    public LocalDateTime getDateInit() {
        return dateInit;
    }

    public void setDateInit(LocalDateTime dateInit) {
        this.dateInit = dateInit;
    }

    public LocalDateTime getDateEnd() {
        return dateEnd;
    }

    public void setDateEnd(LocalDateTime dateEnd) {
        this.dateEnd = dateEnd;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}
