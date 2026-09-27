# 🩺 Synapse Quiz — Plataforma Médica de Repetição Espaçada

Plataforma completa de estudo ativo e repetição espaçada (SRS) com identidade editorial cirúrgica para estudantes de medicina (1º ao 6º período), internato e preparação para residência médica (ENARE, USP, UNICAMP, Revalida INEP).

---

## 🚀 Tecnologias

- **Framework:** Next.js 16 (App Router, Turbopack, React 19)
- **Estilização:** Tailwind CSS v4 com paleta clínica/editorial (Zinc neutro, Teal clínico)
- **Banco de Dados:** Prisma ORM 6 com arquitetura **Dual-Mode**
  - **Local:** SQLite (`dev.db`)
  - **Produção:** Turso libSQL distribuído (Serverless edge)
- **Segurança:** Autenticação por cookies HTTP-only, JWT (`jose`), senhas criptografadas com `bcryptjs`
- **Acervo Médico:** 260 questões de alta densidade clínica + 20 casos clínicos com imagem em alta resolução (Dermatologia, Radiologia, Eletrocardiografia, Histopatologia e Ultrassonografia)

---

## 💻 Desenvolvimento Local

```bash
# 1. Instalar dependências
npm install

# 2. Gerar cliente do Prisma e popular banco local
npm run postinstall
npm run seed

# 3. Iniciar servidor de desenvolvimento
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

### 🔑 Contas de Demonstração Pré-configuradas:
- **Plano Pro (Sem Limites):** `pro@exemplo.com` | Senha: `senha-removida`
- **Plano Free (Com Cotas e Gamificação):** `demo@synapse.med` | Senha: `senha-removida`

---

## ☁️ Deploy em Produção: Git + Turso + Vercel

### Passo 1: Criar o Banco de Dados no Turso
1. Acesse [turso.tech](https://turso.tech) e crie uma conta gratuita (login via GitHub).
2. No painel ou via Turso CLI, crie um novo banco:
   ```bash
   turso db create synapse-quiz
   ```
3. Obtenha a URL de conexão:
   ```bash
   turso db show synapse-quiz --url
   # Exemplo: libsql://synapse-quiz-seu-usuario.turso.io
   ```
4. Crie um token de autenticação:
   ```bash
   turso db tokens create synapse-quiz
   # Guarde o token gerado
   ```

### Passo 2: Sincronizar o Banco Turso com o Acervo Completo
Com as variáveis de ambiente em mãos, execute no seu terminal local:
```bash
# Windows PowerShell:
$env:TURSO_DATABASE_URL="libsql://synapse-quiz-seu-usuario.turso.io"
$env:TURSO_AUTH_TOKEN="seu-token-aqui"
npm run turso:init

# Linux / macOS:
TURSO_DATABASE_URL="libsql://..." TURSO_AUTH_TOKEN="..." npm run turso:init
```
*Esse comando criará automaticamente todas as tabelas e índices no Turso e fará o seed das 260 questões e dos usuários.*

---

### Passo 3: Subir o Projeto para o GitHub
```bash
git init
git add .
git commit -m "feat: Synapse Quiz - Turso libSQL + 260 questoes medicas"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/synapse-quiz.git
git push -u origin main
```

---

### Passo 4: Publicar na Vercel
1. Acesse [vercel.com](https://vercel.com) e clique em **Add New... > Project**.
2. Conecte sua conta GitHub e importe o repositório `synapse-quiz`.
3. Em **Environment Variables**, adicione:
   - `TURSO_DATABASE_URL` = `libsql://synapse-quiz-seu-usuario.turso.io`
   - `TURSO_AUTH_TOKEN` = `seu-token-gerado-no-turso`
   - `JWT_SECRET` = `sua-chave-secreta-forte-gerada`
4. Clique em **Deploy**!
   - A Vercel executará automaticamente `npm run postinstall` gerando o cliente Prisma e `npm run build` compilando a aplicação.

---

## 📦 Scripts Disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor local Next.js em `localhost:3000` |
| `npm run build` | Compilação otimizada de produção com Next.js e TypeScript |
| `npm run seed` | Popula o banco local SQLite com 260 questões e usuários |
| `npm run turso:init` | Cria DDL de tabelas e popula o banco Turso na nuvem |
| `npm run db:studio` | Interface gráfica do Prisma Studio para inspecionar dados |
