package com.medlab.api.repository;

import com.medlab.api.model.Convenio;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConvenioRepository extends JpaRepository<Convenio, Long> {
}