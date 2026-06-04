package com.medlab.api.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

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

    @Column(columnDefinition = "TEXT")
    private String sintomasAtuais;

    @Column(columnDefinition = "TEXT")
    private String historicoDoencas;

    @Column(columnDefinition = "TEXT")
    private String medicamentosEmUso;

    @Column(columnDefinition = "TEXT")
    private String allergies;
}