# Próximos Passos para a Evolução do CRM

Este documento descreve as próximas etapas e funcionalidades sugeridas para aprimorar ainda mais o CRM Financeiro da Elitte Capital.

## 1. Backend Completo e Banco de Dados

- **[ ] Substituir Dados Mocado por um Banco de Dados Real:**
  - Implementar um banco de dados (ex: PostgreSQL, MongoDB) com um ORM (ex: Prisma, TypeORM) para persistir todos os dados da aplicação (clientes, parceiros, transações, etc.).

- **[ ] Desenvolver APIs CRUD Completas:**
  - Criar rotas de API para todas as operações de Criar, Ler, Atualizar e Deletar para cada entidade do sistema.

- **[ ] Implementar Autenticação de Usuários:**
  - Adicionar um sistema de login/logout com JWT (JSON Web Tokens) para proteger a aplicação e permitir o gerenciamento de permissões por assessor.

- **[ ] Implementar a Busca com IA no Backend:**
  - Conectar a rota `/api/search` à API do Gemini para que a busca na interface principal funcione de forma real, consultando o banco de dados.

## 2. Aprimoramentos de Funcionalidades

- **[ ] Lógica de Cálculo de Comissão:**
  - Desenvolver o backend para calcular automaticamente o extrato de comissão dos parceiros com base na receita gerada pelos clientes indicados.

- **[ ] Integração Real com Google Agenda:**
  - Utilizar a API do Google Calendar para criar e sincronizar eventos diretamente na agenda do assessor, em vez de apenas gerar um link.

- **[ ] Sistema de Upload de Documentos:**
  - Implementar o upload de arquivos no backend (ex: para um serviço como AWS S3 ou armazenamento local) para os contratos de parceiros e documentos de clientes.

- **[ ] Workflows e Automações Avançadas:**
  - Criar um sistema de "gatilhos" onde ações na plataforma disparam outras. Ex: Mover uma oportunidade para "Ganho" cria automaticamente um cliente e uma atividade de onboarding.

## 3. Melhorias de UI/UX

- **[ ] Conectar o Frontend às APIs do Backend:**
  - Substituir todos os `MOCK_DATA` por chamadas de API (`fetch` ou `axios`) para buscar e enviar dados para o servidor.

- **[ ] Página de Detalhes da Atividade:**
  - Criar uma visualização detalhada para cada atividade, permitindo adicionar notas, atualizar o status e ver o histórico.

- **[ ] Refinamento da Responsividade:**
  - Otimizar todas as telas para garantir uma experiência de usuário perfeita em dispositivos móveis e tablets.

- **[ ] Notificações em Tempo Real:**
  - Implementar WebSockets para que as notificações (novas oportunidades, tarefas, etc.) apareçam em tempo real na interface, senza necessidade de recarregar a página.

## 4. Funcionalidades a Finalizar (Código Existente)

Esta seção lista funcionalidades que já possuem código-fonte no projeto, mas que precisam de trabalho adicional para se tornarem totalmente funcionais.

- **[ ] Ativar a Busca com IA no Frontend (`TopBar.tsx`):**
  - A função `handleSearch` atualmente está desativada. É preciso implementar a chamada à API do backend (`/api/search`) e desenvolver a UI para exibir os resultados da busca de forma eficaz.

- **[ ] Lógica de Submissão dos Formulários:**
  - Os formulários de "Nova Atividade" (`NewActivityForm.tsx`) e "Novo Parceiro" (`NewPartnerForm.tsx`) atualmente não possuem a lógica completa de `handleSubmit`. É preciso implementar o envio dos dados para o estado da aplicação (e, futuramente, para a API).

- **[ ] Funcionalidade de Upload de Documentos (`NewPartnerForm.tsx`):**
  - O campo de upload de arquivo para o contrato do parceiro existe na UI, mas não possui a lógica para processar e armazenar o arquivo.

- **[ ] Lógica de Filtros nas Páginas:**
  - As páginas de `Transactions.tsx` e `Reports.tsx` possuem filtros na UI (ex: por período, por assessor), mas a lógica de filtragem dos dados mocados ainda não está totalmente implementada para todos eles.

- **[ ] Ações nos Detalhes do Cliente (`ClientDetail.tsx`):**
  - Os botões de "Aprovar" e "Rejeitar" na aba de Compliance e as ações nos lembretes são placeholders e precisam ter sua lógica de atualização de estado implementada.
