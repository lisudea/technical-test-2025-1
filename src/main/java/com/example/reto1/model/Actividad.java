package com.example.reto1.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "actividad")
public class Actividad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; //Un identificador único para la actividad.
    @Column(name = "name_aux")
    private String nameAux; //El nombre y número de documento del auxiliar que realizó la actividad.
    @Column(name = "document_aux")
    private String documentAux;
    @Column(name = "startDate")
    private LocalDateTime startDate; //La fecha y hora en la que inició la actividad.
    @Column(name = "endDate")
    private LocalDateTime endDate; //La fecha y hora en la que terminó la actividad.
    @Column(name = "description")
    private String description; //Descripción de la actividad.
    @Column(name = "status")
    private String status; //Estado de la actividad (aprobado/rechazado/en espera).

    public Actividad() {
    }

    public Actividad(Long id, String nameAux, String documentAux, LocalDateTime startDate, LocalDateTime endDate, String description, String status) {
        this.id = id;
        this.nameAux = nameAux;
        this.documentAux = documentAux;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameAux() {
        return nameAux;
    }

    public void setNameAux(String nameAux) {
        this.nameAux = nameAux;
    }

    public String getDocumentAux() {
        return documentAux;
    }

    public void setDocumentAux(String documentAux) {
        this.documentAux = documentAux;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
