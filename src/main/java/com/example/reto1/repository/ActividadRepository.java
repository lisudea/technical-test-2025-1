package com.example.reto1.repository;

import com.example.reto1.model.Actividad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ActividadRepository extends JpaRepository<Actividad, Long> {
    public Actividad save(Actividad actividad);

    public Optional<Actividad> findById (Long id);

    public void deleteById (Long id);

    public List<Actividad> findAll ();

    @Query("SELECT a FROM Actividad a " +
            "WHERE (CAST(a.startDate AS date) = CAST(:date AS date)) " + // Comenzó ese día
            "OR (CAST(a.endDate AS date) = CAST(:date AS date)) " +     // Terminó ese día
            "OR (a.startDate <= :date AND a.endDate >= :date)")        // Estaba en progreso ese día
    List<Actividad> findByDate(@Param("date") LocalDateTime date);

    public List<Actividad> findByDocumentAux(String documentAux);


    @Query("SELECT COUNT(a) FROM Actividad a " +
            "WHERE (CAST(a.startDate AS date) = CAST(:date AS date)) " + // Comenzó ese día
            "OR (CAST(a.endDate AS date) = CAST(:date AS date)) " +     // Terminó ese día
            "OR (a.startDate <= :date AND a.endDate >= :date)")        // Estaba en progreso ese día
    Integer countByDate(@Param("date") LocalDateTime date);

    @Query("SELECT SUM(TIMESTAMPDIFF(SECOND, a.startDate, a.endDate)) / 3600.0 FROM Actividad a " +
            "WHERE a.documentAux = :documentAux " +
            "AND a.startDate BETWEEN :start AND :end " +
            "AND a.status = 'aprobado'")
    public Double countWorkedHours(
            @Param("documentAux") String documentAux,
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end
    );

    public List<Actividad> findByStatus(String status);

    @Query("SELECT COUNT(a) FROM Actividad a WHERE a.documentAux = :documentAux")
    public Integer countByDocumentAux(@Param("documentAux") String documentAux);

}
