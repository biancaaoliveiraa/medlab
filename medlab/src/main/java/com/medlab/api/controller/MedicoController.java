package com.medlab.api.controller;

import com.medlab.api.model.Medico;
import com.medlab.api.repository.MedicoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/medicos")
@CrossOrigin(origins = "*")
public class MedicoController {

    private final MedicoRepository medicoRepository;

    public MedicoController(MedicoRepository medicoRepository) {
        this.medicoRepository = medicoRepository;
    }

   @PostMapping("/login")
public ResponseEntity<?> loginMedico(@RequestBody Map<String, String> dadosLogin) {
    String identificador = dadosLogin.get("email");

    if (identificador == null || identificador.isBlank()) {
        identificador = dadosLogin.get("crm");
    }

    String senha = dadosLogin.get("senha");

    if (identificador == null || identificador.isBlank()) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Informe o CRM ou e-mail.");
    }

    Optional<Medico> medicoOpt;

    if (identificador.contains("@")) {
        medicoOpt = medicoRepository.findByEmail(identificador);
    } else {
        medicoOpt = medicoRepository.findByCrm(identificador);
    }

    if (medicoOpt.isEmpty()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Este médico não existe.");
    }

    Medico medico = medicoOpt.get();

    if (medico.getStatus() != null && !medico.getStatus()) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body("Este médico está inativo.");
    }

    if (medico.getSenha() == null || !medico.getSenha().equals(senha)) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Senha incorreta.");
    }

    return ResponseEntity.ok(medico);
}

    @GetMapping
    public List<Medico> listar() {
        return medicoRepository.findAll();
    }

    @GetMapping("/{id}")
    public Medico buscarPorId(@PathVariable Long id) {
        return medicoRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Medico cadastrar(@RequestBody Medico medico) {
        if (medico.getStatus() == null) {
            medico.setStatus(true);
        }

        return medicoRepository.save(medico);
    }

    @PutMapping("/{id}")
    public Medico atualizar(@PathVariable Long id, @RequestBody Medico medicoAtualizado) {
        return medicoRepository.findById(id).map(medico -> {
            medico.setNome(medicoAtualizado.getNome());
            medico.setCrm(medicoAtualizado.getCrm());
            medico.setUf(medicoAtualizado.getUf());
            medico.setEspecialidade(medicoAtualizado.getEspecialidade());
            medico.setEmail(medicoAtualizado.getEmail());
            medico.setTelefone(medicoAtualizado.getTelefone());
            medico.setSenha(medicoAtualizado.getSenha());
            medico.setStatus(medicoAtualizado.getStatus());

            return medicoRepository.save(medico);
        }).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        medicoRepository.deleteById(id);
    }
}