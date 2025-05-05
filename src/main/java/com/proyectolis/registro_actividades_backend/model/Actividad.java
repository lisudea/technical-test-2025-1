package com.proyectolis.registro_actividades_backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
public class Actividad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private String nombreAuxiliar;
    @Column
    private String cedulaAuxiliar;

    @Column
    private LocalDateTime inicio;
    @Column
    private LocalDateTime fin;

    @Column
    private String descripcionActividad;

    @Enumerated(EnumType.STRING)
    @Column
    private EstadoActividad estado;

}
