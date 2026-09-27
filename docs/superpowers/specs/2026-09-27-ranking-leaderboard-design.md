# Especificação Técnica: Sistema de Ranking & Leaderboard (Fase 2)

**Data:** 27 de Setembro de 2026  
**Status:** Aprovado para Planejamento  
**Escopo:** Fase 2 — Sistema de Ranking entre Estudantes de Medicina com Filtros Acadêmicos e Mini-Widget no Dashboard  

---

## 1. Visão Geral e Objetivos

Esta especificação define o sistema de **Ranking / Leaderboard** do **Synapse Quiz**, conectando a identidade acadêmica do estudante (foto/avatar, faculdade e período) com o volume e a constância de estudos em tempo real.

### Objetivos Principais:
1. **Gamificação Clínica Saudável:** Converter acertos, revisões e ofensivas diárias em XP Clínico transparente e motivador.
2. **Disputa Semanal e Mensal:** Permitir alternar entre ranking semanal (que reseta toda semana para garantir competitividade contínua) e mensal.
3. **Filtros por Faculdade e Período:** Permitir que o estudante dispute no ranking geral (todos os alunos), no ranking da sua própria faculdade (ex: alunos da USP, UNIFESP, etc.) ou no ranking do seu semestre (ex: apenas 5º período).
4. **Visibilidade no Dashboard Principal:** Exibir um mini-card compacto na página `/dashboard` com o Top 3 da semana e a posição atual do aluno.
5. **Barra Fixa "Sua Posição":** Garantir que o estudante sempre visualize sua colocação exata e quanto falta para subir de posição.

---

## 2. Regras de Pontuação (Fórmula de XP Clínico)

A pontuação acumulada do estudante é calculada dinamicamente a partir dos registros de `AnswerLog` e `User.streakCount`:

$$\text{XP Total} = (\text{Acertos} \times 10) + (\text{Erros/Revisões} \times 2) + (\text{Dias de Streak} \times 5)$$

- **Questão Correta (`isCorrect == true`):** `+10 XP`
- **Questão Errada/Revisada (`isCorrect == false`):** `+2 XP` (recompensa o esforço e a revisão ativa)
- **Bônus de Sequência Diária:** `+5 XP` por dia de streak ativo (máximo de 35 XP no cálculo semanal).

### Janelas Temporais:
- **`weekly` (Semanal):** Questões respondidas desde segunda-feira `00:00:00` da semana corrente até o momento atual.
- **`monthly` (Mensal):** Questões respondidas desde o dia 1º `00:00:00` do mês corrente.

---

## 3. Endpoints de API

### 3.1 `GET /api/ranking`
Calcula e retorna a classificação dos estudantes e a posição do usuário autenticado.

- **Parâmetros de Busca (Query Params):**
  - `timeframe`: `"weekly"` (padrão) | `"monthly"`
  - `scope`: `"all"` (padrão) | `"my_college"` | `"my_period"`
  - `college`: filtro opcional por faculdade específica
  - `period`: filtro opcional por período específico
- **Autenticação:** Cookie de sessão JWT (verificado via `getSession()`).
- **Resposta (200 OK):**
```json
{
  "leaderboard": [
    {
      "rank": 1,
      "userId": "uuid",
      "name": "Mariana Santos",
      "avatarUrl": "avatar:doctor-f",
      "college": "Universidade de São Paulo (USP)",
      "period": "5º Período",
      "plan": "pro",
      "xp": 820,
      "correctCount": 78,
      "totalQuestions": 85,
      "accuracy": 92
    }
  ],
  "currentUser": {
    "rank": 8,
    "xp": 340,
    "correctCount": 30,
    "totalQuestions": 36,
    "accuracy": 83,
    "aheadUserXp": 360,
    "diffToAhead": 20
  },
  "timeframe": "weekly",
  "scope": "all"
}
```

---

## 4. Frontend e Componentes

### 4.1 Nova Página: `/ranking` (`src/app/ranking/page.tsx`)
- **Pódio do Top 3 (`PodiumTop3`):**
  - Colunas estilizadas para o 1º (Ouro/Centro), 2º (Prata/Esquerda) e 3º (Bronze/Direita) colocados.
  - Exibe avatar com anel metálico característico, nome, tag da faculdade/período e badge de XP.
- **Filtros Interativos (`RankingFilters`):**
  - Pílula de alternância: `Semanal` vs `Mensal`.
  - Pílulas de escopo: `🌐 Geral`, `🏛️ Minha Faculdade`, `🎓 Meu Período`.
- **Tabela da 4ª Posição em Diante (`LeaderboardList`):**
  - Linhas com `#4`, `#5`..., avatar, nome, faculdade, período, badge PRO (se aplicável), XP e taxa de acerto.
  - Linha do próprio usuário logado destacada com anel suave teal.
- **Barra Flutuante Fixa "Sua Posição" (`StickyUserRank`):**
  - Fixada no rodapé da viewport para acompanhar o scroll.
  - Mostra a colocação atual do estudante, XP e quantos pontos faltam para o próximo colocado.
  - Botão de ação rápida "Fazer Quiz" redirecionando para `/quiz`.

### 4.2 Mini-Widget no Dashboard (`src/components/dashboard/mini-leaderboard.tsx`)
- Card integrado à página `/dashboard`.
- Exibe o Top 3 resumido da semana e a posição atual do estudante.
- Link direto "Ver Ranking Completo →".

### 4.3 Navegação (`src/components/navbar.tsx`)
- Adição do item `Ranking` com ícone `Trophy` na barra lateral desktop e no dock móvel.

---

## 5. Plano de Verificação e Testes

1. **Testes de API (`/api/ranking`):**
   - Verificar cálculo com `timeframe=weekly` e `timeframe=monthly`.
   - Testar filtros por `scope=my_college` e `scope=my_period`.
   - Garantir que `currentUser` é calculado corretamente mesmo quando fora do Top 10.
2. **Testes de Interface:**
   - Navegar até `/ranking` e alternar filtros semana/mês e geral/faculdade/período.
   - Conferir renderização do Pódio do Top 3 e dos avatares médicos/fotos.
   - Conferir se a barra fixa "Sua Posição" permanece visível e funcional.
   - Verificar o mini-widget no Dashboard principal.
3. **Build:**
   - Executar `npm run build` garantindo zero erros de compilação.
