package com.medlab.api.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import com.fasterxml.jackson.annotation.JsonIgnore; // Import necessário

@Entity
@Table(name = "anamneses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Anamnese {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore // Adicionado para evitar o erro de recursão infinita
    @OneToOne
    @JoinColumn(name = "paciente_id")
    private Paciente paciente;

    @Column(name = "possui_doenca_cronica")
    private String possuiDoencaCronica;

    @Column(name = "doenca_cronica_detalhe", columnDefinition = "TEXT")
    private String doencaCronicaDetalhe;

    @Column(name = "medicamentos_continuos")
    private String medicamentosContinuos;

    @Column(name = "medicamentos_detalhe", columnDefinition = "TEXT")
    private String medicamentosDetalhe;

    @Column(name = "possui_alergias")
    private String possuiAlergias;

    @Column(name = "alergias_detalhe", columnDefinition = "TEXT")
    private String alergiasDetalhe;

    @Column(name = "realizou_cirurgias")
    private String realizouCirurgias;

    @Column(name = "cirurgias_detalhe", columnDefinition = "TEXT")
    private String cirurgiasDetalhe;

    @Column(name = "tipo_sanguineo")
    private String tipoSanguineo;
}