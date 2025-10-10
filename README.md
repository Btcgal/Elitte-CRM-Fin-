# Elitte Capital Financial CRM

Este é um CRM financeiro completo para a Elitte Capital, construído com React, TypeScript e Vite. O CRM permite o gerenciamento de clientes, oportunidades, tarefas e transações, além de fornecer um painel de controle com KPIs e um painel de compliance.

## Funcionalidades

- **Dashboard:** Visualize os principais KPIs, como receita projetada, conversão de pipeline, inadimplência e pendências de KYC. Acompanhe as aplicações e resgates mensais com um gráfico interativo.
- **Clientes:** Gerencie seus clientes, filtre-os por perfil de risco, status de compliance e tipo. Visualize os detalhes de cada cliente, incluindo informações de perfil, composição da carteira e checklist de documentos.
- **Oportunidades:** Acompanhe o pipeline de oportunidades com um quadro Kanban interativo. Arraste e solte as oportunidades entre os estágios e adicione novas oportunidades facilmente.
- **Transações:** Visualize todas as transações, filtre-as por período e adicione novas transações.
- **Tarefas:** Gerencie suas tarefas em uma lista ou agrupe-as por cliente ou oportunidade.
- **Relatórios:** Gere relatórios de performance, compliance, taxas e inadimplência.
- **Compliance:** Monitore documentos vencidos/pendentes, clientes de alto risco e transações pendentes. Visualize o log de auditoria recente.
- **Configurações:** Personalize seu perfil, configurações de segurança, notificações e tema.
- **Notificações:** Receba notificações sobre novas oportunidades, tarefas atribuídas e alertas de compliance.
- **Busca com IA:** Use a busca com inteligência artificial para encontrar clientes, oportunidades e tarefas usando linguagem natural.

## Tecnologias Utilizadas

- React
- TypeScript
- Vite
- Tailwind CSS
- Recharts
- Google Gemini AI

## Instalação e Execução

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Btcgal/Elitte-CRM-Fin-.git
   ```
2. **Instale as dependências:**
   ```bash
   npm install
   ```
3. **Configure a chave de API do Gemini:**
   - Renomeie o arquivo `.env.local.example` para `.env.local`.
   - Adicione sua chave de API do Gemini ao arquivo `.env.local`:
     ```
     VITE_GEMINI_API_KEY=SUA_CHAVE_DE_API
     ```
4. **Execute a aplicação:**
   ```bash
   npm run dev
   ```