package com.medlab.api.repository;

import com.medlab.api.model.Exame;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExameRepository extends JpaRepository<Exame, Long> {
    List<Exame> findByMedicoId(Long medicoId);
    List<Exame> findByPacienteId(Long pacienteId);
}
