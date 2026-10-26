# 🩺 Synapse Quiz — Plataforma Médica de Repetição Espaçada

**Demo online:** https://synapse-quiz-ten.vercel.app

Plataforma de estudo ativo e repetição espaçada (SRS) com identidade editorial cirúrgica para estudantes de medicina (1º ao 6º período), internato e preparação para residência médica (ENARE, USP, UNICAMP, SUS-SP, Revalida INEP).

---

## 🚀 Tecnologias

- **Framework:** Next.js 16 (App Router, Turbopack, React 19)
- **Estilização:** Tailwind CSS v4 com paleta clínica/editorial (Zinc neutro, Teal clínico)
- **Banco de Dados:** Prisma ORM 6 com arquitetura Dual-Mode (SQLite local & Turso libSQL distribuído em produção)
- **Segurança:** Autenticação por cookies HTTP-only, JWT (`jose`), senhas criptografadas com `bcryptjs`
- **Acervo Médico:** Mais de 600 questões médicas completas com gabarito comentado, casos clínicos e imagens em alta resolução
- **PWA Ready:** Suporte a Progressive Web App instalável no desktop e mobile

---

## 🌟 Principais Recursos

- 🧠 **Repetição Espaçada (SRS):** Algoritmo baseado no SM-2 que calcula o intervalo de revisão de cada questão conforme o desempenho do aluno (acerto aumenta o intervalo, erro volta para 1 dia).
- ⏱️ **Modo Simulado Pro:** Simulações cronometradas com questões randômicas por disciplina ou prova geral, histórico de tentativas e pontuação detalhada.
- 🏆 **Ranking de Estudantes:** Leaderboard com pódio Top 3 olímpico, pontuação por acerto/constância e filtros por faculdade e período.
- 👤 **Perfil Médico & Identidade:** Crachá digital do estudante, catálogo de faculdades de medicina do Brasil e avatares médicos personalizados.
- ✍️ **Riscar Alternativas:** Ferramenta de eliminação ativa de alternativas com clique duplo/ícone visual para focar nas opções viáveis.
- 📝 **Anotações Pessoais:** Bloco de notas integrado por questão para gravar mnemônicos, pérolas clínicas e lembretes de estudo.
- 🚩 **Reportar Erro / Questionar Gabarito:** Central de feedback por questão para apontar eventuais divergências ou sugestões.
- 🔖 **Caderno de Erros & Favoritos:** Sessão dedicada de revisão para questões marcadas e dúvidas frequentes.

---

## 🛠️ Rodar localmente

```bash
npm install
cp .env.example .env          # ajuste JWT_SECRET; o padrão usa SQLite local (file:./dev.db)
npx prisma db push            # cria o banco local
npm run seed                  # popula questões e cria contas de demonstração (a senha é impressa no console)
npm run dev                   # http://localhost:3000
```

Sem `SMTP_USER`/`SMTP_PASS`, os e-mails de verificação e recuperação de senha aparecem no console. Em produção, o banco é o Turso (`npm run turso:init`) e o `JWT_SECRET` precisa ser uma chave forte.

## 🔐 Segurança

- Sessão por cookie HTTP-only assinado com JWT; senhas com hash `bcryptjs`.
- Verificação de e-mail e recuperação de senha por token de uso único.
- Rate limiting nas rotas sensíveis; `npm run test:security` roda uma auditoria básica contra o servidor local.
- Acesso à área de administração restrito a e-mails definidos em `ADMIN_EMAILS`.

## 🗂️ Estrutura

```
src/app/        páginas e rotas de API (App Router)
src/lib/        autenticação, SRS (srs.ts), ranking, e-mail, rate limit
prisma/         schema, migrations e lotes de questões
scripts/        manutenção do banco e coleta de imagens clínicas
```

As imagens clínicas e seus créditos estão na página `/creditos`.
