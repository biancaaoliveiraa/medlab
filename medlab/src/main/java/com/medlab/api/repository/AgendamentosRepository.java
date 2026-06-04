package com.medlab.api.repository;

import com.medlab.api.model.Agendamentos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AgendamentosRepository extends JpaRepository<Agendamentos, Long> {
    List<Agendamentos> findByPacienteId(Long pacienteId);
}