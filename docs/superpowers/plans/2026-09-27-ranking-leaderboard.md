# Plano de Implementação: Sistema de Ranking & Leaderboard (Fase 2)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implementar o sistema completo de Ranking / Leaderboard entre os estudantes de medicina (`/ranking`), com cálculo dinâmico de XP Clínico (+10 por acerto, +2 por revisão, +5 por dia de streak), alternância semanal/mensal, filtros por faculdade e período, pódio do Top 3 (Ouro, Prata, Bronze), barra fixa com a posição do próprio aluno, mini-widget de ranking no Dashboard principal e atalho na barra lateral.

**Architecture:** A rota `GET /api/ranking` agrega os registros de `AnswerLog` e `User.streakCount` no intervalo de datas selecionado (semanal ou mensal), calculando o XP, a acurácia e a classificação de cada aluno, filtrando por faculdade e período quando solicitado, e localizando a colocação exata do usuário logado. No frontend, criamos a página `/ranking` com Pódio visual, filtros rápidos e barra fixa flutuante, além de um mini-card de ranking em `/dashboard` e o item "Ranking" na navegação lateral.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Prisma ORM, SQLite/Turso, Lucide React.

**Spec:** `docs/superpowers/specs/2026-09-27-ranking-leaderboard-design.md`

## Global Constraints

- Design System clínico e elegante em tons de Teal, Zinc e Slate, com toques metálicos refinados para o Top 3 (dourado, prateado e bronze).
- Cálculo de XP 100% em tempo real via histórico de respostas (`AnswerLog`), garantindo reatividade imediata sem cron jobs.
- Preservação da privacidade: exibição de nomes e tags acadêmicas formatadas sem expor e-mails ou dados sensíveis.
- Política Git: NUNCA executar `git commit` ou `git push` sem consentimento explícito do usuário.

## Review Focus

1. **Usuário com 0 questões no período:** Deve aparecer no ranking com 0 XP (ou bônus de streak) sem causar divisão por zero na acurácia.
2. **Cálculo de datas na virada de semana:** A semana inicia rigorosamente na segunda-feira às 00:00:00 do fuso horário local.
3. **Filtros vazios:** Se nenhum outro aluno da mesma faculdade ou período tiver respondido questões, a UI deve exibir mensagem amigável convidando o aluno a ser o pioneiro da sua turma.
4. **Alinhamento do Pódio em telas pequenas:** O Top 3 deve se adaptar de forma fluida no mobile sem quebrar o layout.
5. **Barra fixa inferior:** A barra flutuante da posição do usuário não deve sobrepor o dock inferior no mobile nem bloquear o rodapé no desktop.

---

### Task 1: API de Cálculo e Classificação de Ranking (`/api/ranking`)

**Files:**
- Create: `src/app/api/ranking/route.ts`

**Interfaces:**
- Consumes: `prisma.answerLog`, `prisma.user`, `getSession()`.
- Produces: `GET /api/ranking?timeframe=weekly|monthly&scope=all|my_college|my_period&college=...&period=...` retornando `{ leaderboard, currentUser, timeframe, scope }`.

- [ ] **Passo 1: Implementar lógica de intervalo de datas (semanal e mensal)**
  - Calcular `startDate` da semana atual (segunda-feira 00:00:00) e do mês atual (dia 1 às 00:00:00).

- [ ] **Passo 2: Implementar agregação de XP e busca no Prisma**
  - Buscar `AnswerLog` com `createdAt >= startDate`.
  - Agrupar por `userId` contando acertos e total de respostas.
  - Buscar dados cadastrais dos usuários (`name`, `avatarUrl`, `college`, `period`, `plan`, `streakCount`).
  - Calcular XP total: `(correctCount * 10) + ((totalCount - correctCount) * 2) + Math.min(streakCount * 5, 35)`.
  - Ordenar por XP decrescente e atribuir posições `rank: 1, 2, 3...`.

- [ ] **Passo 3: Implementar filtros de escopo e localização do usuário atual**
  - Aplicar filtros `my_college`, `my_period` ou faculdade/período específicos.
  - Encontrar o índice do usuário autenticado no ranking e calcular distância em XP para o colocado à frente (`diffToAhead`).

---

### Task 2: Componentes da Interface de Ranking

**Files:**
- Create: `src/components/ranking/ranking-filters.tsx`
- Create: `src/components/ranking/podium-top3.tsx`
- Create: `src/components/ranking/leaderboard-list.tsx`
- Create: `src/components/ranking/sticky-user-rank.tsx`

**Interfaces:**
- Consumes: `<AvatarRenderer />` de `@/components/profile/avatar-renderer`.
- Produces: Componentes modulares reutilizáveis para a tela de ranking e o dashboard.

- [ ] **Passo 1: Criar `src/components/ranking/ranking-filters.tsx`**
  - Seletor de período (Semanal / Mensal) e seletor de escopo (Geral / Minha Faculdade / Meu Período).

- [ ] **Passo 2: Criar `src/components/ranking/podium-top3.tsx`**
  - Pódio em 3 colunas (1º lugar ouro no centro com coroa, 2º prata à esquerda, 3º bronze à direita), exibindo avatar, nome, faculdade, período e medalhas.

- [ ] **Passo 3: Criar `src/components/ranking/leaderboard-list.tsx`**
  - Lista de classificação da 4ª posição em diante, com destaque sutil para a linha do estudante logado.

- [ ] **Passo 4: Criar `src/components/ranking/sticky-user-rank.tsx`**
  - Barra inferior fixa exibindo a colocação do estudante, XP, proximidade do próximo colocado e botão de ação rápida "Fazer Questões".

---

### Task 3: Página Completa do Ranking (`/ranking`)

**Files:**
- Create: `src/app/ranking/page.tsx`

**Interfaces:**
- Consumes: `/api/ranking`, `<Navbar />`, componentes de Task 2.
- Produces: Rota `/ranking` completa, interativa e responsiva.

- [ ] **Passo 1: Criar página `src/app/ranking/page.tsx`**
  - Gerenciar estados de `timeframe`, `scope`, `leaderboard` e `currentUser`.
  - Integrar Pódio, Filtros, Lista e Barra Fixa com estados de loading e skeleton limpos.

---

### Task 4: Mini-Widget de Ranking no Dashboard Principal

**Files:**
- Create: `src/components/dashboard/mini-leaderboard.tsx`
- Modify: `src/app/dashboard/page.tsx`

**Interfaces:**
- Consumes: `/api/ranking?timeframe=weekly&scope=all`.
- Produces: Card de ranking semanal resumido no Dashboard.

- [ ] **Passo 1: Criar `src/components/dashboard/mini-leaderboard.tsx`**
  - Card compacto com ícone de Troféu, Top 3 simplificado, posição do usuário atual e botão "Ver Ranking Completo →".

- [ ] **Passo 2: Inserir mini-widget em `src/app/dashboard/page.tsx`**
  - Posicionar o mini-card no grid de acompanhamento do dashboard ao lado do gráfico de volume semanal.

---

### Task 5: Navegação Lateral e Mobile (`navbar.tsx`)

**Files:**
- Modify: `src/components/navbar.tsx`

**Interfaces:**
- Produces: Link "Ranking" com ícone `Trophy` na barra lateral desktop e dock mobile.

- [ ] **Passo 1: Adicionar item `Ranking` aos links de navegação em `src/components/navbar.tsx`**
  - Inserir `{ href: "/ranking", label: "Ranking", shortLabel: "Ranking", icon: Trophy }` posicionado estrategicamente entre os itens de estudo.

---

### Task 6: Verificação, Build e Testes Funcionais

**Files:**
- All modified & created files

- [ ] **Passo 1: Executar `npm run build`**
  - Validar compilação do Next.js e TypeScript com zero erros.

- [ ] **Passo 2: Testes funcionais**
  - Testar acesso a `/ranking`.
  - Alternar entre Semanal e Mensal.
  - Testar filtros por Minha Faculdade e Meu Período.
  - Verificar visualização do mini-widget no Dashboard.
