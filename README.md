#  MedLab

Sistema Web para Gestão de Clínicas Médicas

---

##  Sobre o Projeto

O **MedLab** é um sistema web desenvolvido para auxiliar no gerenciamento administrativo e operacional de clínicas médicas, centralizando informações de pacientes, médicos, convênios, agendamentos e relatórios em uma única plataforma.

O sistema foi desenvolvido utilizando arquitetura cliente-servidor, com Front-end em React, API REST em Spring Boot e banco de dados PostgreSQL.

---

##  Objetivos do Sistema

* Centralizar informações da clínica.
* Facilitar o gerenciamento de pacientes e profissionais.
* Automatizar processos administrativos.
* Organizar agendamentos e atendimentos.
* Disponibilizar indicadores e relatórios gerenciais.
* Aplicar conceitos de desenvolvimento Full Stack em ambiente acadêmico.

---

##  Perfis de Usuário

### Paciente

O paciente possui acesso às funcionalidades relacionadas ao seu atendimento:

* Cadastro no sistema;
* Login;
* Atualização de dados pessoais;
* Gerenciamento de endereço;
* Preenchimento de anamnese;
* Agendamento de consultas;
* Consulta dos próprios agendamentos.

---

### Médico

Os médicos são cadastrados exclusivamente pelo administrador do sistema.

Funcionalidades disponíveis:

* Login no sistema;
* Consulta da agenda de atendimentos;
* Visualização de pacientes agendados;
* Acompanhamento de consultas vinculadas ao profissional.

---

### Administrador

Responsável pelo gerenciamento completo da clínica.

#### Gestão de Pacientes

* Cadastro;
* Edição;
* Exclusão;
* Controle de status.

#### Gestão de Médicos

* Cadastro;
* Edição;
* Exclusão;
* Controle de status;
* Definição de credenciais de acesso.

#### Gestão de Convênios

* Cadastro;
* Edição;
* Exclusão;
* Controle de status.

#### Relatórios

* Visualização de indicadores;
* Consulta de relatórios administrativos.

#### Dashboard

* Resumo geral das informações da clínica.

---

## Arquitetura do Sistema

```text
┌─────────────────────┐
│      Front-end      │
│   React + Vite      │
└──────────┬──────────┘
           │
           │ HTTP / JSON
           ▼
┌─────────────────────┐
│      Back-end       │
│ Spring Boot API     │
└──────────┬──────────┘
           │
           │ JPA / Hibernate
           ▼
┌─────────────────────┐
│     PostgreSQL      │
│   Banco de Dados    │
└─────────────────────┘
```

---

##  Tecnologias Utilizadas

### Front-end

* React
* Vite
* React Router DOM
* Axios
* React Icons
* CSS3

### Back-end

* Java 17
* Spring Boot 3
* Spring Data JPA
* Hibernate
* Maven

### Banco de Dados

* PostgreSQL

### Controle de Versão

* Git
* GitHub

---

##  Estrutura do Projeto

```text
medlab-integrado
│
├── medlab-front
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   └── App.jsx
│   │
│   └── package.json
│
├── medlab
│   ├── src
│   │   └── main
│   │       ├── java
│   │       │   └── com.medlab.api
│   │       │       ├── controller
│   │       │       ├── model
│   │       │       └── repository
│   │       │
│   │       └── resources
│   │           └── application.properties
│   │
│   └── pom.xml
│
└── README.md
```

---

## 🗄 Banco de Dados

Criação do banco:

```sql
CREATE DATABASE medlab;
```

Configuração da aplicação:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/medlab
spring.datasource.username=SEU_USUARIO
spring.datasource.password=SUA_SENHA

spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

---

##  Executando o Back-end

Acesse a pasta da API:

```bash
cd medlab
```

Execute a aplicação:

```bash
mvn spring-boot:run
```

Servidor padrão:

```text
http://localhost:8080
```

---

##  Executando o Front-end

Acesse a pasta do Front-end:

```bash
cd medlab-front
```

Instale as dependências:

```bash
npm install
```

Execute a aplicação:

```bash
npm run dev
```

Servidor padrão:

```text
http://localhost:5173
```

---

##  Conceitos Aplicados

* Programação Orientada a Objetos (POO)
* Desenvolvimento Full Stack
* Arquitetura Cliente-Servidor
* APIs REST
* Persistência de Dados
* Spring Data JPA
* Integração Front-end e Back-end
* Controle de Versão com Git e GitHub

---

##  Projeto Acadêmico

Projeto desenvolvido como requisito acadêmico do curso de **Análise e Desenvolvimento de Sistemas**, aplicando conceitos de desenvolvimento web, banco de dados, engenharia de software e integração entre sistemas.

---

##  Licença

Projeto desenvolvido exclusivamente para fins acadêmicos e educacionais.
