package com.medlab.api.repository;

import com.medlab.api.model.Medico;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MedicoRepository extends JpaRepository<Medico, Long> {
    Optional<Medico> findByEmail(String email);
    Optional<Medico> findByCrm(String crm);
}