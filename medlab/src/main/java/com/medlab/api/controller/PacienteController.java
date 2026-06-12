package com.medlab.api.controller;

import com.medlab.api.model.Paciente;
import com.medlab.api.model.Agendamentos;
import com.medlab.api.repository.PacienteRepository;
import com.medlab.api.repository.AgendamentosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/pacientes")
@CrossOrigin(origins = "*")
public class PacienteController {

    @Autowired
    private PacienteRepository pacienteRepository;

    @Autowired
    private AgendamentosRepository agendamentosRepository;

    @GetMapping
    public ResponseEntity<List<Paciente>> listarPacientes() {
        return ResponseEntity.ok(pacienteRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Paciente> buscarPacientePorId(@PathVariable Long id) {
        return pacienteRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginPaciente(@RequestBody Map<String, String> dadosLogin) {
        String email = dadosLogin.get("email");
        String senha = dadosLogin.get("senha");

        Optional<Paciente> pacienteOpt = pacienteRepository.findByEmail(email);
        if (pacienteOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Este usuário não existe. Por favor, faça o cadastro.");
        }

        if (!pacienteOpt.get().getSenha().equals(senha)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Senha incorreta. Tente novamente.");
        }

        return ResponseEntity.ok(pacienteOpt.get());
    }

    @PostMapping
    public ResponseEntity<Paciente> cadastrarPaciente(@RequestBody Paciente paciente) {
        if (paciente.getAnamnese() != null) {
            paciente.getAnamnese().setPaciente(paciente);
        }

        Paciente novoPaciente = pacienteRepository.save(paciente);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoPaciente);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> alterarDadosConta(@PathVariable Long id, @RequestBody Paciente dadosAtualizados) {
        return pacienteRepository.findById(id).map(paciente -> {
            paciente.setNomeCompleto(dadosAtualizados.getNomeCompleto());
            paciente.setCpf(dadosAtualizados.getCpf());
            paciente.setDataNascimento(dadosAtualizados.getDataNascimento());
            paciente.setTelefone(dadosAtualizados.getTelefone());
            paciente.setEmail(dadosAtualizados.getEmail());
            paciente.setSenha(dadosAtualizados.getSenha());


            pacienteRepository.save(paciente);
            return ResponseEntity.ok(paciente);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> apagarContaDeVez(@PathVariable Long id) {
        if (!pacienteRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        List<Agendamentos> agendamentos = agendamentosRepository.findByPacienteId(id);
        agendamentosRepository.deleteAll(agendamentos);

        pacienteRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }


    @PostMapping("/{id}/agendamentos")
    public ResponseEntity<?> adicionarAgendamento(@PathVariable Long id, @RequestBody Agendamentos agendamento) {
        return pacienteRepository.findById(id).map(paciente -> {
            agendamento.setPaciente(paciente);
            Agendamentos novoAgendamento = agendamentosRepository.save(agendamento);
            return ResponseEntity.status(HttpStatus.CREATED).body(novoAgendamento);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/agendamentos/{agendamentoId}")
    public ResponseEntity<?> apagarAgendamento(@PathVariable Long agendamentoId) {
        if (!agendamentosRepository.existsById(agendamentoId)) {
            return ResponseEntity.notFound().build();
        }
        agendamentosRepository.deleteById(agendamentoId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}/agendamentos")
    public ResponseEntity<List<Agendamentos>> listarAgendamentosDoPaciente(@PathVariable Long id) {
        return ResponseEntity.ok(agendamentosRepository.findByPacienteId(id));
    }
}