package com.prueba.lis.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

/**
 * {@code Activity} representa la entidad de dominio para las actividades
 * que se persisten en la base de datos. Cada instancia de esta clase
 * corresponde a una fila en la tabla 'activities'.
 */
@Entity
@Table(name = "activities")
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column (name = "assist_name")
    private String assistName;

    @Column (name = "assist_id")
    private Integer assistId;

    @Column (name = "date_init")
    private LocalDateTime dateInit;

    @Column (name = "date_end")
    private LocalDateTime dateEnd;

    private String description;
    private String estado;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

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

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

}
