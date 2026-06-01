package com.medlab.api.controller;

import com.medlab.api.model.Paciente;
import com.medlab.api.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/pacientes")
public class PacienteController {

    @Autowired
    private PacienteRepository repository;

    @PostMapping
    public Paciente cadastrar(@RequestBody Paciente paciente) {
        paciente.setStatus("Aguardando Triagem");
        return repository.save(paciente);
    }

    @GetMapping
    public List<Paciente> listar() {
        return repository.findAll();
    }
}