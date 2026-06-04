package com.medlab.api.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "agendamentos")
public class Agendamentos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "paciente_id", nullable = false)
    private Paciente paciente;

    @Column(nullable = false)
    private String tipo;

    @Column(nullable = false)
    private String especialidadeVaga;

    private String profissionalNome;

    @Column(nullable = false)
    private LocalDateTime dataHora;

    private String status = "Pendente";

    public Agendamentos() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Paciente getPaciente() { return paciente; }
    public void setPaciente(Paciente paciente) { this.paciente = paciente; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }

    public String getEspecialidadeVaga() { return especialidadeVaga; }
    public void setEspecialidadeVaga(String especialidadeVaga) { this.especialidadeVaga = especialidadeVaga; }

    public String getProfissionalNome() { return profissionalNome; }
    public void setProfissionalNome(String profissionalNome) { this.profissionalNome = profissionalNome; }

    public LocalDateTime getDataHora() { return dataHora; }
    public void setDataHora(LocalDateTime dataHora) { this.dataHora = dataHora; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}