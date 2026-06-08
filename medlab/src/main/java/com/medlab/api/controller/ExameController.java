package com.medlab.api.controller;

import com.medlab.api.model.Exame;
import com.medlab.api.model.Medico;
import com.medlab.api.model.Paciente;
import com.medlab.api.repository.ExameRepository;
import com.medlab.api.repository.MedicoRepository;
import com.medlab.api.repository.PacienteRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/exames")
@CrossOrigin(origins = "*")
public class ExameController {

    private final ExameRepository exameRepository;
    private final MedicoRepository medicoRepository;
    private final PacienteRepository pacienteRepository;

    public ExameController(ExameRepository exameRepository,
                           MedicoRepository medicoRepository,
                           PacienteRepository pacienteRepository) {
        this.exameRepository = exameRepository;
        this.medicoRepository = medicoRepository;
        this.pacienteRepository = pacienteRepository;
    }

    // Lista todos os exames de um médico
    @GetMapping("/medico/{medicoId}")
    public List<Exame> listarPorMedico(@PathVariable Long medicoId) {
        return exameRepository.findByMedicoId(medicoId);
    }

    // Lista todos os exames de um paciente
    @GetMapping("/paciente/{pacienteId}")
    public List<Exame> listarPorPaciente(@PathVariable Long pacienteId) {
        return exameRepository.findByPacienteId(pacienteId);
    }

    // Lista todos
    @GetMapping
    public List<Exame> listarTodos() {
        return exameRepository.findAll();
    }

    // Resumo/métricas dos exames de um médico (para os cards do Dashboard)
    @GetMapping("/medico/{medicoId}/resumo")
    public Map<String, Object> resumoPorMedico(@PathVariable Long medicoId) {
        List<Exame> todos = exameRepository.findByMedicoId(medicoId);
        LocalDate hoje = LocalDate.now();

        long laudadosHoje = todos.stream()
                .filter(e -> "Concluído".equals(e.getStatus()) && hoje.equals(e.getDataRealizacao()))
                .count();
        long pendentes = todos.stream()
                .filter(e -> "Pendente".equals(e.getStatus()))
                .count();
        long urgentes = todos.stream()
                .filter(e -> "Urgente".equals(e.getPrioridade()) && !"Concluído".equals(e.getStatus()))
                .count();
        long totalMes = todos.stream()
                .filter(e -> e.getDataRealizacao() != null &&
                        e.getDataRealizacao().getMonthValue() == hoje.getMonthValue() &&
                        e.getDataRealizacao().getYear() == hoje.getYear())
                .count();

        Map<String, Object> resumo = new HashMap<>();
        resumo.put("laudadosHoje", laudadosHoje);
        resumo.put("pendentes", pendentes);
        resumo.put("urgentes", urgentes);
        resumo.put("totalMes", totalMes);
        return resumo;
    }

    // Cadastrar novo exame
    @PostMapping
    public ResponseEntity<Exame> cadastrar(@RequestBody Map<String, Object> body) {
        Exame exame = new Exame();

        if (body.get("pacienteId") != null) {
            Long pacienteId = Long.valueOf(body.get("pacienteId").toString());
            pacienteRepository.findById(pacienteId).ifPresent(exame::setPaciente);
        }
        if (body.get("medicoId") != null) {
            Long medicoId = Long.valueOf(body.get("medicoId").toString());
            medicoRepository.findById(medicoId).ifPresent(exame::setMedico);
        }
        if (body.get("tipoExame") != null) exame.setTipoExame(body.get("tipoExame").toString());
        if (body.get("prioridade") != null) exame.setPrioridade(body.get("prioridade").toString());
        if (body.get("status") != null) exame.setStatus(body.get("status").toString());
        if (body.get("dataRealizacao") != null) exame.setDataRealizacao(LocalDate.parse(body.get("dataRealizacao").toString()));

        return ResponseEntity.status(HttpStatus.CREATED).body(exameRepository.save(exame));
    }

    // Atualizar status / adicionar laudo
    @PutMapping("/{id}")
    public ResponseEntity<Exame> atualizar(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        Optional<Exame> opt = exameRepository.findById(id);
        if (opt.isEmpty()) return ResponseEntity.notFound().build();

        Exame exame = opt.get();
        if (body.get("status") != null) exame.setStatus(body.get("status").toString());
        if (body.get("laudo") != null) exame.setLaudo(body.get("laudo").toString());
        if (body.get("prioridade") != null) exame.setPrioridade(body.get("prioridade").toString());

        return ResponseEntity.ok(exameRepository.save(exame));
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        exameRepository.deleteById(id);
    }
}
