package com.medlab.api.controller;

import com.medlab.api.repository.PacienteRepository;
import com.medlab.api.repository.MedicoRepository;
import com.medlab.api.repository.ConvenioRepository;
import com.medlab.api.repository.RelatorioRepository;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    private final PacienteRepository pacienteRepository;
    private final MedicoRepository medicoRepository;
    private final ConvenioRepository convenioRepository;
    private final RelatorioRepository relatorioRepository;

    public DashboardController(
            PacienteRepository pacienteRepository,
            MedicoRepository medicoRepository,
            ConvenioRepository convenioRepository,
            RelatorioRepository relatorioRepository
    ) {
        this.pacienteRepository = pacienteRepository;
        this.medicoRepository = medicoRepository;
        this.convenioRepository = convenioRepository;
        this.relatorioRepository = relatorioRepository;
    }

    @GetMapping
    public Map<String, Long> buscarDadosDashboard() {
        Map<String, Long> dados = new HashMap<>();

        dados.put("usuarios", pacienteRepository.count());
        dados.put("medicos", medicoRepository.count());
        dados.put("convenios", convenioRepository.count());
        dados.put("relatorios", relatorioRepository.count());

        return dados;
    }
}