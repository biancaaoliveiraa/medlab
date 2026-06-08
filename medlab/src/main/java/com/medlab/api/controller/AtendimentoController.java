package com.medlab.api.controller;

import com.medlab.api.model.Agendamentos;
import com.medlab.api.repository.AgendamentosRepository;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/atendimentos")
@CrossOrigin(origins = "*")
public class AtendimentoController {

    private final AgendamentosRepository agendamentosRepository;

    public AtendimentoController(AgendamentosRepository agendamentosRepository) {
        this.agendamentosRepository = agendamentosRepository;
    }

    // Lista agendamentos por médico (profissionalNome) e data
    @GetMapping("/medico/{medicoNome}")
    public List<Agendamentos> listarPorMedicoEData(
            @PathVariable String medicoNome,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate data) {

        List<Agendamentos> todos = agendamentosRepository.findAll();

        return todos.stream()
                .filter(a -> medicoNome.equals(a.getProfissionalNome()))
                .filter(a -> data == null || (a.getDataHora() != null && a.getDataHora().toLocalDate().equals(data)))
                .sorted((a, b) -> a.getDataHora().compareTo(b.getDataHora()))
                .collect(Collectors.toList());
    }

    // Resumo do dia para dashboard do médico
    @GetMapping("/medico/{medicoNome}/resumo")
    public Map<String, Long> resumoDoDia(@PathVariable String medicoNome) {
        LocalDate hoje = LocalDate.now();
        List<Agendamentos> todos = agendamentosRepository.findAll();

        List<Agendamentos> doMedico = todos.stream()
                .filter(a -> medicoNome.equals(a.getProfissionalNome()))
                .collect(Collectors.toList());

        long atendidosHoje = doMedico.stream()
                .filter(a -> "Atendido".equals(a.getStatus()) &&
                        a.getDataHora() != null && a.getDataHora().toLocalDate().equals(hoje))
                .count();

        long agendadosHoje = doMedico.stream()
                .filter(a -> a.getDataHora() != null && a.getDataHora().toLocalDate().equals(hoje))
                .count();

        long pendentes = doMedico.stream()
                .filter(a -> "Pendente".equals(a.getStatus()) || "Agendado".equals(a.getStatus()))
                .count();

        Map<String, Long> resumo = new HashMap<>();
        resumo.put("atendidosHoje", atendidosHoje);
        resumo.put("agendadosHoje", agendadosHoje);
        resumo.put("pendentes", pendentes);
        return resumo;
    }

    // Atualizar status de um agendamento (ex: Atendido, Faltou)
    @PutMapping("/{id}/status")
    public ResponseEntity<Agendamentos> atualizarStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {

        Optional<Agendamentos> opt = agendamentosRepository.findById(id);
        if (opt.isEmpty()) return ResponseEntity.notFound().build();

        Agendamentos ag = opt.get();
        if (body.get("status") != null) ag.setStatus(body.get("status"));

        return ResponseEntity.ok(agendamentosRepository.save(ag));
    }
}
