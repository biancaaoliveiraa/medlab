package com.medlab.api.controller;

import com.medlab.api.model.Convenio;
import com.medlab.api.repository.ConvenioRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/convenios")
@CrossOrigin(origins = "*")
public class ConvenioController {

    private final ConvenioRepository convenioRepository;

    public ConvenioController(ConvenioRepository convenioRepository) {
        this.convenioRepository = convenioRepository;
    }

    @GetMapping
    public List<Convenio> listar() {
        return convenioRepository.findAll();
    }

    @GetMapping("/{id}")
    public Convenio buscarPorId(@PathVariable Long id) {
        return convenioRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Convenio cadastrar(@RequestBody Convenio convenio) {
        if (convenio.getStatus() == null) {
            convenio.setStatus(true);
        }

        return convenioRepository.save(convenio);
    }

    @PutMapping("/{id}")
    public Convenio atualizar(@PathVariable Long id, @RequestBody Convenio convenioAtualizado) {
        return convenioRepository.findById(id).map(convenio -> {
            convenio.setNome(convenioAtualizado.getNome());
            convenio.setCodigo(convenioAtualizado.getCodigo());
            convenio.setTipo(convenioAtualizado.getTipo());
            convenio.setValorCoparticipacao(convenioAtualizado.getValorCoparticipacao());
            convenio.setObservacoes(convenioAtualizado.getObservacoes());
            convenio.setStatus(convenioAtualizado.getStatus());

            return convenioRepository.save(convenio);
        }).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        convenioRepository.deleteById(id);
    }
}