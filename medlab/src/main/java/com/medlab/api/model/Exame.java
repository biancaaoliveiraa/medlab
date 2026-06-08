package com.medlab.api.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "exames")
public class Exame {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "paciente_id", nullable = false)
    private Paciente paciente;

    @ManyToOne
    @JoinColumn(name = "medico_id")
    private Medico medico;

    @Column(nullable = false)
    private String tipoExame;

    private String prioridade = "Normal";

    private String status = "Pendente";

    private LocalDate dataRealizacao;

    private String laudo;

    public Exame() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Paciente getPaciente() { return paciente; }
    public void setPaciente(Paciente paciente) { this.paciente = paciente; }

    public Medico getMedico() { return medico; }
    public void setMedico(Medico medico) { this.medico = medico; }

    public String getTipoExame() { return tipoExame; }
    public void setTipoExame(String tipoExame) { this.tipoExame = tipoExame; }

    public String getPrioridade() { return prioridade; }
    public void setPrioridade(String prioridade) { this.prioridade = prioridade; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDate getDataRealizacao() { return dataRealizacao; }
    public void setDataRealizacao(LocalDate dataRealizacao) { this.dataRealizacao = dataRealizacao; }

    public String getLaudo() { return laudo; }
    public void setLaudo(String laudo) { this.laudo = laudo; }
}
