# 🩺 Synapse Quiz — Plataforma Médica de Repetição Espaçada

Plataforma completa de estudo ativo e repetição espaçada (SRS) com identidade editorial cirúrgica para estudantes de medicina (1º ao 6º período), internato e preparação para residência médica (ENARE, USP, UNICAMP, SUS-SP, Revalida INEP).

---

## 🚀 Tecnologias

- **Framework:** Next.js 16 (App Router, Turbopack, React 19)
- **Estilização:** Tailwind CSS v4 com paleta clínica/editorial (Zinc neutro, Teal clínico)
- **Banco de Dados:** Prisma ORM 6 com arquitetura **Dual-Mode**
  - **Local:** SQLite (`dev.db`)
  - **Produção:** Turso libSQL distribuído (Serverless edge)
- **Segurança:** Autenticação por cookies HTTP-only, JWT (`jose`), senhas criptografadas com `bcryptjs`
- **Acervo Médico:** **611 questões** completas (567 ativas + 44 de reserva para atualizações futuras) distribuídas do 1º ao 6º período, além de casos clínicos com imagens em alta resolução
- **PWA Ready:** Suporte a Progressive Web App instalável no desktop e mobile (manifest, ícones, tema clínico)

---

## 🌟 Principais Recursos

- 🧠 **Repetição Espaçada (SRS):** Algoritmo SM-2 adaptativo que calcula intervalos ideais de revisão com base no desempenho do aluno.
- ⏱️ **Modo Simulado Pro:** Simulações cronometradas com questões randômicas por disciplina ou prova geral, histórico de tentativas e pontuação detalhada.
- ✍️ **Riscar Alternativas:** Ferramenta de eliminação ativa de alternativas com clique duplo/ícone visual para focar nas opções viáveis.
- 📝 **Anotações Pessoais:** Bloco de notas integrado por questão para gravar mnemônicos, pérolas clínicas e lembretes de estudo.
- 🚩 **Reportar Erro / Questionar Gabarito:** Central de feedback por questão para apontar eventuais divergências ou erros de digitação.
- 🔖 **Caderno de Erros & Favoritos:** Sessão dedicada de revisão para questões marcadas e dúvidas frequentes.

---

## 💻 Desenvolvimento Local

```bash
# 1. Instalar dependências
npm install

# 2. Gerar cliente do Prisma e sincronizar banco
npm run postinstall
npm run db:push

# 3. Popular o banco com o acervo completo (611 questões + usuários)
npm run seed

# 4. Iniciar servidor de desenvolvimento
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

### 🔑 Contas de Demonstração Pré-configuradas:
- **Plano Pro (Sem Limites & Modo Simulado):** `pro@exemplo.com` | Senha: `senha-removida`
- **Plano Free (Com Cotas e Gamificação):** `demo@synapse.med` | Senha: `senha-removida`

---

## ☁️ Deploy em Produção: Git + Turso + Vercel

### Passo 1: Criar o Banco de Dados no Turso
1. Acesse [turso.tech](https://turso.tech) e crie uma conta gratuita.
2. Crie um novo banco de dados:
   ```bash
   turso db create synapse-quiz
   ```
3. Obtenha a URL de conexão:
   ```bash
   turso db show synapse-quiz --url
   ```
4. Crie um token de autenticação:
   ```bash
   turso db tokens create synapse-quiz
   ```

### Passo 2: Sincronizar o Banco Turso com o Acervo Completo
No terminal local configurado com as credenciais do Turso:
```bash
# Windows PowerShell:
$env:TURSO_DATABASE_URL="libsql://synapse-quiz-seu-usuario.turso.io"
$env:TURSO_AUTH_TOKEN="seu-token-aqui"
npm run turso:init

# Linux / macOS:
TURSO_DATABASE_URL="libsql://..." TURSO_AUTH_TOKEN="..." npm run turso:init
```

### Passo 3: Subir o Projeto para o GitHub
```bash
git add .
git commit -m "feat: release base v1.0.0 - 611 questoes, modo simulado, pwa, anotações e srs"
git push -u origin main
```

### Passo 4: Publicar na Vercel
1. No dashboard da [Vercel](https://vercel.com), importe o repositório.
2. Adicione as seguintes Variáveis de Ambiente:
   - `TURSO_DATABASE_URL` = `libsql://synapse-quiz-seu-usuario.turso.io`
   - `TURSO_AUTH_TOKEN` = `seu-token-gerado-no-turso`
   - `JWT_SECRET` = `sua-chave-secreta-forte-gerada`
3. Clique em **Deploy**!

---

## 📦 Scripts Disponíveis

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia servidor Next.js em modo desenvolvimento |
| `npm run build` | Compila o projeto para produção e valida tipos TypeScript |
| `npm run seed` | Popula o banco local com todas as 611 questões e usuários |
| `npm run turso:init` | Cria tabelas e sincroniza o banco Turso para produção |
| `npm run db:push` | Aplica alterações do `schema.prisma` ao banco local |
| `npm run db:studio` | Abre o Prisma Studio para visualizar e editar dados |
