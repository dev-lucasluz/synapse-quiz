# Plano de Implementação: Perfil do Estudante de Medicina (Fase 1)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implementar a aba de Perfil do Estudante de Medicina (`/profile`) com personalização de foto (upload próprio com compressão no cliente via Canvas ou seleção de avatares médicos), preenchimento de Faculdade de Medicina, Período Acadêmico (1º ao 12º período ou Formado/Residência) e integração visual em tempo real na barra lateral e cabeçalho móvel.

**Architecture:** O backend expande o modelo `User` no Prisma adicionando `avatarUrl`, `college`, `period` e `targetSpecialty`, expondo endpoints `GET /api/profile` e `PATCH /api/profile`, além de enriquecer `GET /api/auth/me`. O frontend disponibiliza `/profile` com design clínico sofisticado, contendo um crachá de identidade médica com métricas, seletor de avatares/upload Canvas 256x256 WebP/JPEG (~20KB), formulário com datalist das faculdades médicas do Brasil e dropdown dos 12 semestres. A barra lateral passa a renderizar o avatar do aluno no rodapé e a exibir faculdade/período.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Prisma ORM, SQLite/Turso, Lucide React, HTML5 Canvas API.

**Spec:** `docs/superpowers/specs/2026-09-27-student-profile-design.md`

## Global Constraints

- Design System clínico e sóbrio em tons de Teal, Zinc e Slate (sem gamificação infantil).
- Imagens pessoais salvas em base64 otimizado (Canvas comprimido em 256x256 WebP/JPEG <= 100KB), sem dependências de serviços de nuvem externos.
- Preservação rigorosa de compatibilidade com contas existentes (campos de perfil opcionais/nullable).
- Validação estrita de períodos válidos: `"1º Período"` a `"12º Período"` ou `"Formado / Residência"`.
- Política Git: NUNCA executar `git commit` ou `git push` sem consentimento explícito do usuário.

## Review Focus

1. **Imagem corrompida ou excessivamente pesada:** O redimensionador de Canvas deve rejeitar ou falhar com segurança antes do envio, com Toast explicativo.
2. **Atualização imediata na Navbar sem F5:** A alteração do perfil deve sincronizar o estado da barra lateral e cabeçalho mobile imediatamente.
3. **Usuário com dados vazios/nulos:** A UI da Navbar e da página `/profile` deve exibir placeholders elegantes sem quebras (`null` safety).
4. **Tratamento de nome curto ou vazio:** Validação impedindo nomes com menos de 2 caracteres.
5. **Estabilidade de layout na barra lateral recolhida:** O novo avatar dinâmico de 36x36px deve manter o alinhamento centralizado exato (`34px`) na largura de 68px.

---

### Task 1: Atualização do Schema Prisma e Migração do Banco de Dados

**Files:**
- Modify: `prisma/schema.prisma:15-50`

**Interfaces:**
- Produces: Modelo `User` com campos `avatarUrl String?`, `college String?`, `period String?`, `targetSpecialty String?`.

- [ ] **Passo 1: Adicionar os novos campos ao modelo `User` em `prisma/schema.prisma`**
  Inserir `avatarUrl`, `college`, `period` e `targetSpecialty` como strings opcionais.

- [ ] **Passo 2: Executar migração do Prisma**
  Executar: `npx prisma db push`
  Resultado esperado: Sincronização do schema com o banco de dados local SQLite e Turso sem erros.

- [ ] **Passo 3: Gerar cliente Prisma atualizado**
  Executar: `npx prisma generate`
  Resultado esperado: Tipos TypeScript do Prisma Client contendo as novas propriedades do modelo `User`.

---

### Task 2: Criação dos Endpoints de API do Perfil

**Files:**
- Create: `src/app/api/profile/route.ts`
- Modify: `src/app/api/auth/me/route.ts:1-50`

**Interfaces:**
- Consumes: `prisma.user`, `getCurrentUser(req)` de `@/lib/auth`.
- Produces:
  - `GET /api/profile`: `{ user: { id, name, email, avatarUrl, college, period, targetSpecialty, plan }, stats: { streak, totalAnswered, accuracy } }`
  - `PATCH /api/profile`: `{ user: UpdatedUser }`
  - `GET /api/auth/me`: payload enriquecido com `avatarUrl`, `college`, `period`.

- [ ] **Passo 1: Criar rota `src/app/api/profile/route.ts`**
  - Implementar método `GET`: verificar sessão do usuário via cookie JWT, buscar dados cadastrais e agregar estatísticas de `AnswerLog` (total respondido e percentual de `isCorrect == true`).
  - Implementar método `PATCH`: validar payload (`name`, `college`, `period`, `targetSpecialty`, `avatarUrl`), sanitizar tamanhos e persistir com `prisma.user.update`.

- [ ] **Passo 2: Atualizar `src/app/api/auth/me/route.ts`**
  - Incluir `avatarUrl`, `college`, `period` no `select` do Prisma para que a rota retorne o perfil completo.

- [ ] **Passo 3: Validar endpoints**
  - Executar chamada de verificação no endpoint `/api/auth/me` para confirmar retorno dos campos sem erros de runtime.

---

### Task 3: Biblioteca de Avatares Médicos e Utilitário de Imagem Canvas

**Files:**
- Create: `src/lib/avatars.ts`
- Create: `src/components/profile/avatar-picker.tsx`

**Interfaces:**
- Produces:
  - `MEDICAL_AVATARS`: lista com os 8 avatares médicos prontos (`id`, `label`, `icon`, `color`).
  - `compressImage(file: File): Promise<string>`: comprime qualquer imagem para 256x256 WebP/JPEG leve (~20KB).
  - `<AvatarRenderer avatarUrl={...} name={...} size={...} className={...} />`: componente universal para renderizar avatar personalizado, avatar médico SVG ou inicial com fallback.

- [ ] **Passo 1: Criar `src/lib/avatars.ts`**
  - Definir lista de avatares médicos (`avatar:doctor-m`, `avatar:doctor-f`, `avatar:stethoscope`, `avatar:brain`, `avatar:microscope`, `avatar:heart`, `avatar:caduceus`, `avatar:surgery`).
  - Implementar função cliente `compressImage(file: File, maxSize = 256): Promise<string>` utilizando elemento `HTMLCanvasElement` com exportação `image/jpeg` qualidade 0.82.

- [ ] **Passo 2: Criar componente `src/components/profile/avatar-picker.tsx`**
  - Modal/gaveta com duas abas: "Avatares Médicos" e "Enviar Foto do Dispositivo".
  - Seletor de arquivo com preview imediato, validação de tipo de arquivo (JPEG/PNG/WebP) e acionamento do `compressImage`.
  - Grid de botões com os avatares médicos ilustrados.

---

### Task 4: Página de Perfil do Estudante (`/profile`)

**Files:**
- Create: `src/app/profile/page.tsx`
- Create: `src/components/profile/identity-badge.tsx`
- Create: `src/components/profile/profile-form.tsx`

**Interfaces:**
- Consumes: `/api/profile`, `/api/auth/me`, `<Navbar />`, `<AvatarRenderer />`, `<AvatarPicker />`.
- Produces: Página completa e interativa `/profile`.

- [ ] **Passo 1: Criar componente `src/components/profile/identity-badge.tsx`**
  - Renderizar o "Crachá Digital Médico": avatar com anel, nome em destaque, badge Free/PRO, tag `Faculdade • Período`, e 3 cards de métricas (Streak, Questões Feitas, Acurácia).

- [ ] **Passo 2: Criar componente `src/components/profile/profile-form.tsx`**
  - Input para Nome completo.
  - Input de Faculdade com `datalist` contendo as 25 maiores faculdades de medicina do Brasil (USP, UNIFESP, UFRJ, UFMG, UNICAMP, UERJ, etc.).
  - Select para Período (1º ao 12º período agrupados por Ciclo Básico, Clínico, Internato + Formado/Residência).
  - Input para Especialidade Alvo.
  - Botão de salvar com loading e disparo de Toast.

- [ ] **Passo 3: Criar página `src/app/profile/page.tsx`**
  - Integrar `<Navbar />`, carregamento de dados via `/api/profile`, e sincronização com formulário e crachá.

---

### Task 5: Integração na Barra Lateral e Cabeçalho Móvel

**Files:**
- Modify: `src/components/navbar.tsx`

**Interfaces:**
- Consumes: `avatarUrl`, `college`, `period` vindos do `NavbarProps` ou fetch `/api/auth/me`.
- Produces:
  - Link `Meu Perfil` na lista de navegação lateral.
  - Avatar do estudante renderizado no rodapé (estados recolhido e expandido).
  - Clique no card do rodapé direciona para `/profile`.
  - Exibição de Faculdade e Período abaixo do nome no card expandido.
  - Avatar clicável no cabeçalho mobile.

- [ ] **Passo 1: Adicionar "Meu Perfil" aos `navLinks` em `src/components/navbar.tsx`**
  - Inserir `{ href: "/profile", label: "Meu Perfil", shortLabel: "Perfil", icon: User }`.

- [ ] **Passo 2: Atualizar renderização do avatar no rodapé**
  - Substituir inicial fixa pela renderização do avatar dinâmico (`avatarUrl` ou inicial estilizada).
  - Tornar o avatar e o card de usuário clicáveis para navegar até `/profile`.
  - Exibir a Faculdade e Período do estudante abaixo do nome.

- [ ] **Passo 3: Atualizar cabeçalho mobile**
  - Adicionar atalho com o avatar do estudante no topo do mobile apontando para `/profile`.

---

### Task 6: Verificação, Testes e Build

**Files:**
- All modified & created files

- [ ] **Passo 1: Executar `npm run build`**
  - Verificar compilação do Next.js e TypeScript com zero erros.

- [ ] **Passo 2: Teste funcional de ponta a ponta**
  - Testar navegação até `/profile`.
  - Testar alteração de avatar médico.
  - Testar upload de foto própria com compressão.
  - Testar preenchimento de Faculdade e Período.
  - Verificar persistência no banco e atualização imediata na barra lateral sem F5.
