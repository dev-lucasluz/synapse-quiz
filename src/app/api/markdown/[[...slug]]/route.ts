import { NextRequest, NextResponse } from "next/server";

interface RouteProps {
  params: Promise<{
    slug?: string[];
  }>;
}

const MARKDOWN_PAGES: Record<string, string> = {
  "": `# Synapse Quiz — Plataforma Inteligente de Questões Médicas e Residência

Synapse Quiz é uma plataforma de estudo ativo e alta retenção focada em estudantes de Medicina e candidatos ao ENARE e principais exames de Residência Médica do Brasil (USP, UNICAMP, SUS-SP, AMRIGS, ENARE).

## Metodologia Científica
- **Algoritmo SM-2 (SuperMemo-2):** Adapta o intervalo de revisão com base na curva de esquecimento e na avaliação de dificuldade do usuário.
- **Estudo Ativo (Active Recall):** Foco em resolução prática de questões com gabarito comentado item a item.
- **Caderno de Erros Automatizado:** Armazena automaticamente questões com erros ou dúvidas para repetição espaçada direcionada.

## Principais Áreas e Especialidades
- **Cirurgia Geral:** Abdome agudo, trauma, oncologia cirúrgica e técnica operatória.
- **Clínica Médica:** Cardiologia, pneumologia, nefrologia, endocrinologia e infectologia.
- **Pediatria:** Puericultura, neonatologia, infectologia pediátrica e emergências pediátricas.
- **Ginecologia e Obstetrícia:** Pré-natal, assistência ao parto, sangramentos e oncologia ginecológica.
- **Medicina Preventiva e Social:** Epidemiologia, bioestatística, SUS, saúde do trabalhador e ética médica.

## Recursos Disponíveis
1. **Banco de Questões Comentadas:** Mais de 600 questões atualizadas com justificativas para todas as alternativas.
2. **Simulados Cronometrados:** Modo prova com contagem regressiva e simulação de ambiente real de exame.
3. **Painel de Métricas e Desempenho:** Acompanhamento de taxa de acerto semanal, streak de estudo e curva de retenção.
4. **Ranking Acadêmico:** Comparativo de desempenho com colegas por período e faculdade.

## Navegação e Acesso
- [Acessar Dashboard](https://synapsequiz.vercel.app/dashboard)
- [Entrar na Plataforma](https://synapsequiz.vercel.app/login)
- [Criar Conta Gratuita](https://synapsequiz.vercel.app/register)
- [Documentação para Agentes de IA](https://synapsequiz.vercel.app/llms.txt)
- [Mapa do Site](https://synapsequiz.vercel.app/sitemap.xml)
`,

  dashboard: `# Synapse Quiz — Painel do Estudante (Dashboard)

O Dashboard do Synapse Quiz centraliza as métricas de estudo, fila de revisões ativas e acesso rápido às ferramentas de aprendizagem médica.

## Fila de Revisão Ativa (SM-2)
- **Revisões Diárias Pendentes:** Questões agendadas pelo algoritmo de repetição espaçada prontas para resolução imediata.
- **Caderno de Erros:** Questões marcadas para revisão prioritária com base no histórico de desempenho.
- **Cota Diária:** Resoluções do banco principal e do caderno de erros disponíveis para o plano atual.

## Métricas Semanais e Desempenho
- **Taxa de Acerto Geral:** Percentual de respostas corretas consolidado nos últimos 7 dias.
- **Streak de Consistência:** Dias consecutivos de resolução de questões médicas.
- **Memória de Longo Prazo:** Total de conceitos e questões consolidadas no algoritmo de repetição.

## Grade Curricular por Especialidade
- **Cirurgia Geral:** Foco em abdome agudo, trauma e choque hemorrágico.
- **Clínica Médica:** Insuficiência cardíaca, sepse, emergências diabéticas e antibioticoterapia.
- **Pediatria:** Calendário vacinal, desidratação e infecções respiratórias agudas.
- **Ginecologia e Obstetrícia:** Doença hipertensiva da gestação, trabalho de parto prematuro e hemorragias puerperais.
- **Medicina Preventiva:** Níveis de prevenção, indicadores de saúde e princípios doutrinários do SUS.

## Ações Rápidas
- [Iniciar Sessão de Questões](https://synapsequiz.vercel.app/quiz)
- [Abrir Caderno de Erros](https://synapsequiz.vercel.app/notebook)
- [Iniciar Simulado Cronometrado](https://synapsequiz.vercel.app/simulation)
- [Programa de Indicação e Recompensas](https://synapsequiz.vercel.app/referral)
- [Página Inicial](https://synapsequiz.vercel.app/)
`,

  login: `# Synapse Quiz — Acesso à Conta (Login)

Página de autenticação para alunos e médicos residentes no Synapse Quiz.

## Credenciais de Acesso
- **E-mail:** E-mail cadastrado na plataforma.
- **Senha:** Senha de acesso definida no momento do cadastro.

## Links Rápidos
- [Criar Nova Conta Gratuita](https://synapsequiz.vercel.app/register)
- [Página Inicial](https://synapsequiz.vercel.app/)
- [Visão Geral da Plataforma](https://synapsequiz.vercel.app/llms.txt)
`,

  register: `# Synapse Quiz — Cadastro de Novo Aluno

Crie sua conta no Synapse Quiz para iniciar o treinamento com repetição espaçada e banco de questões médicas.

## Informações do Cadastro
- **Nome Completo**
- **E-mail Institucional ou Pessoal**
- **Faculdade / Instituição de Ensino**
- **Período da Graduação ou Fase de Formatura**
- **Código de Indicação (opcional para benefícios de cota)**

## Links Rápidos
- [Já possui uma conta? Faça Login](https://synapsequiz.vercel.app/login)
- [Página Inicial](https://synapsequiz.vercel.app/)
`,

  quiz: `# Synapse Quiz — Sessão Ativa de Questões Médicas

Interface interativa de resolução de questões com suporte ao algoritmo SuperMemo-2 (SM-2).

## Funcionalidades da Sessão
- Exibição do enunciado clínico com casos, hipóteses diagnósticas e imagens médicas.
- Alternativas comentadas com gabarito imediato.
- Classificação de dificuldade pós-resposta (Fácil, Médio, Difícil, Errei) para reprogramação de intervalo.
- Adição imediata de anotações personalizadas ao caderno de estudos.

## Links Rápidos
- [Retornar ao Dashboard](https://synapsequiz.vercel.app/dashboard)
- [Página Inicial](https://synapsequiz.vercel.app/)
`,

  notebook: `# Synapse Quiz — Caderno de Erros

Módulo especializado no reprocessamento cognitivo de questões incorretas ou assinaladas com dúvida.

## Estrutura do Caderno
- Segmentação por especialidade médica e subtópico.
- Anotações de raciocínio clínico para reforço mnemônico.
- Ciclos acelerados de repetição até domínio do tema.

## Links Rápidos
- [Retornar ao Dashboard](https://synapsequiz.vercel.app/dashboard)
- [Página Inicial](https://synapsequiz.vercel.app/)
`,

  simulation: `# Synapse Quiz — Simulados Cronometrados

Ambiente de teste simulado para provas de Residência Médica e ENARE.

## Características do Simulado
- Cronômetro regressivo com bloqueio de consulta.
- Distribuição ponderada por grandes áreas da medicina.
- Relatório comparativo com a média nacional dos candidatos.

## Links Rápidos
- [Retornar ao Dashboard](https://synapsequiz.vercel.app/dashboard)
- [Página Inicial](https://synapsequiz.vercel.app/)
`,

  referral: `# Synapse Quiz — Programa de Indicação

Compartilhe o Synapse Quiz com seus colegas de turma para expandir suas cotas diárias de questões.

## Benefícios
- Liberação de cotas extras para resoluções no banco de dados.
- Acesso ampliado ao módulo de simulados e caderno de erros.

## Links Rápidos
- [Retornar ao Dashboard](https://synapsequiz.vercel.app/dashboard)
- [Página Inicial](https://synapsequiz.vercel.app/)
`,
};

function get404Markdown(path: string): string {
  return `# 404 - Página Não Encontrada / Not Found

O recurso solicitado \`${path}\` não foi encontrado no servidor do Synapse Quiz.

The requested path or resource does not exist on this server.

## Links Úteis / Available Resources
- [Página Inicial / Home](https://synapsequiz.vercel.app/)
- [Dashboard de Estudos / Dashboard](https://synapsequiz.vercel.app/dashboard)
- [Documentação para Agentes de IA / LLMs.txt](https://synapsequiz.vercel.app/llms.txt)
- [Mapa do Site / Sitemap](https://synapsequiz.vercel.app/sitemap.xml)
- [Acesso à Conta / Login](https://synapsequiz.vercel.app/login)
`;
}

export async function GET(
  request: NextRequest,
  { params }: RouteProps
) {
  const resolvedParams = await params;
  const slugParts = resolvedParams.slug || [];
  const normalizedKey = slugParts.join("/").toLowerCase();

  const markdownContent = MARKDOWN_PAGES[normalizedKey];

  if (markdownContent) {
    return new NextResponse(markdownContent, {
      status: 200,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Vary": "Accept",
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    });
  }

  // Se o recurso não existe → 404 com corpo em Markdown amigável para agentes
  const requestedPath = "/" + slugParts.join("/");
  return new NextResponse(get404Markdown(requestedPath), {
    status: 404,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Vary": "Accept",
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
}
