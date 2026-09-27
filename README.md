# 🩺 Synapse Quiz — Plataforma Médica de Repetição Espaçada

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

- 🧠 **Repetição Espaçada (SRS):** Algoritmo SM-2 adaptativo que calcula intervalos ideais de revisão com base no desempenho do aluno.
- ⏱️ **Modo Simulado Pro:** Simulações cronometradas com questões randômicas por disciplina ou prova geral, histórico de tentativas e pontuação detalhada.
- 🏆 **Ranking de Estudantes:** Leaderboard com pódio Top 3 olímpico, pontuação por acerto/constância e filtros por faculdade e período.
- 👤 **Perfil Médico & Identidade:** Crachá digital do estudante, catálogo de faculdades de medicina do Brasil e avatares médicos personalizados.
- ✍️ **Riscar Alternativas:** Ferramenta de eliminação ativa de alternativas com clique duplo/ícone visual para focar nas opções viáveis.
- 📝 **Anotações Pessoais:** Bloco de notas integrado por questão para gravar mnemônicos, pérolas clínicas e lembretes de estudo.
- 🚩 **Reportar Erro / Questionar Gabarito:** Central de feedback por questão para apontar eventuais divergências ou sugestões.
- 🔖 **Caderno de Erros & Favoritos:** Sessão dedicada de revisão para questões marcadas e dúvidas frequentes.
