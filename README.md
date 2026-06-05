MedLab

Sistema web para gerenciamento de clínicas médicas desenvolvido como projeto acadêmico, com o objetivo de centralizar processos administrativos, gerenciamento de pacientes, médicos, convênios e agendamentos em uma única plataforma.

Sobre o Projeto

O MedLab foi desenvolvido para atender às necessidades de gestão de uma clínica médica, oferecendo funcionalidades voltadas para diferentes perfis de usuários, incluindo pacientes, médicos e administradores.

O sistema foi construído utilizando uma arquitetura cliente-servidor, composta por uma aplicação Front-end desenvolvida em React e uma API REST desenvolvida com Spring Boot, utilizando PostgreSQL como banco de dados.

Funcionalidades
Área do Paciente
Cadastro de pacientes
Login no sistema
Atualização de dados pessoais
Gerenciamento de endereço
Visualização de informações cadastrais
Preenchimento e consulta de anamnese
Agendamento de consultas
Visualização de agendamentos realizados
Área Médica
Login de médicos
Acesso às informações profissionais cadastradas
Consulta de agenda e atendimentos vinculados ao profissional
Visualização dos pacientes agendados

Os médicos são cadastrados exclusivamente pelo administrador do sistema.

Área Administrativa
Dashboard gerencial
Cadastro, edição e exclusão de médicos
Cadastro, edição e exclusão de pacientes
Cadastro, edição e exclusão de convênios
Controle de status de médicos e convênios
Emissão e consulta de relatórios administrativos
Gerenciamento geral das informações da clínica
Arquitetura do Sistema
Frontend (React + Vite)
        │
        ▼
API REST (Spring Boot)
        │
        ▼
Banco de Dados PostgreSQL
Tecnologias Utilizadas
Front-end
React
Vite
JavaScript (ES6+)
Axios
React Router DOM
React Icons
CSS3
Back-end
Java 17
Spring Boot 3
Spring Data JPA
Hibernate
Maven
Banco de Dados
PostgreSQL
Estrutura do Projeto
medlab-integrado
│
├── medlab-front
│   ├── src
│   ├── public
│   └── package.json
│
├── medlab
│   ├── src
│   ├── pom.xml
│   └── resources
│
└── README.md
Configuração do Banco de Dados

Criar um banco de dados PostgreSQL:

CREATE DATABASE medlab;

Exemplo de configuração:

spring.datasource.url=jdbc:postgresql://localhost:5432/medlab
spring.datasource.username=SEU_USUARIO
spring.datasource.password=SUA_SENHA

spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
Executando o Back-end

Acesse a pasta da API:

cd medlab

Execute a aplicação:

mvn spring-boot:run

Servidor padrão:

http://localhost:8080
Executando o Front-end

Acesse a pasta do Front-end:

cd medlab-front

Instale as dependências:

npm install

Execute o projeto:

npm run dev

Servidor padrão:

http://localhost:5173
Equipe de Desenvolvimento

Projeto desenvolvido como requisito acadêmico para a disciplina de desenvolvimento de sistemas da Universidade Católica do Salvador (UCSAL).

Objetivos Acadêmicos
Aplicação prática dos conceitos de Engenharia de Software.
Desenvolvimento de aplicações Web Full Stack.
Integração entre Front-end, Back-end e Banco de Dados.
Utilização de APIs REST.
Aplicação de conceitos de persistência de dados com JPA/Hibernate.
Trabalho colaborativo utilizando Git e GitHub.
Licença

Projeto desenvolvido exclusivamente para fins acadêmicos e educacionais.

Esse formato passa muito mais credibilidade para professor e banca avaliadora do que um README simples.
