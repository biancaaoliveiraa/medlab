package com.medlab.api.repository;

import com.medlab.api.model.Relatorio;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RelatorioRepository extends JpaRepository<Relatorio, Long> {
}