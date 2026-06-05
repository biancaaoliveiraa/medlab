package com.medlab.api.controller;

import com.medlab.api.model.Relatorio;
import com.medlab.api.repository.RelatorioRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/relatorios")
@CrossOrigin(origins = "*")
public class RelatorioController {

    private final RelatorioRepository relatorioRepository;

    public RelatorioController(RelatorioRepository relatorioRepository) {
        this.relatorioRepository = relatorioRepository;
    }

    @GetMapping
    public List<Relatorio> listar() {
        return relatorioRepository.findAll();
    }

    @PostMapping
    public Relatorio cadastrar(@RequestBody Relatorio relatorio) {
        return relatorioRepository.save(relatorio);
    }
}