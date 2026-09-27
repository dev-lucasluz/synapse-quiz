export interface ImportedQuestion {
  subjectName: string;
  period: number;
  text: string;
  options: string[] | string;
  correctOption: number;
  explanation: string;
  source: string;
  year: number;
}

export const farmacoEpidemiologiaQuestions: ImportedQuestion[] = [
  {
    subjectName: "Farmacologia Clínica",
    period: 5,
    text: "Homem de 65 anos com diabetes mellitus tipo 2 de longa data e doença renal crônica estágio 3a (taxa de filtração glomerular estimada em 50 mL/min/1,73m²) apresenta relação albumina/creatinina urinária persistentemente elevada (> 300 mg/g). Qual das seguintes classes de antidiabéticos orais demonstrou benefício comprovado em retardar a progressão da nefropatia diabética e reduzir hospitalizações por insuficiência cardíaca de forma independente do controle glicêmico?",
    options: [
      "Inibidores do cotransportador sódio-glicose tipo 2 (iSGLT2, como Dapagliflozina e Empagliflozina)",
      "Sulfonilureias de segunda geração (como Glibenclamida)",
      "Inibidores da alfa-glicosidase intestinal (como Acarbose)",
      "Meglitinidas secretagogas de ação rápida (como Repaglinida)"
    ],
    correctOption: 0,
    explanation: "Os inibidores do SGLT2 (Dapagliflozina, Empagliflozina) atuam no túbulo proximal renal promovendo glicosúria e natriurese. Ao aumentar a oferta de sódio à mácula densa, restauram o feedback tubuloglomerular e causam vasoconstrição da arteríola aferente, reduzindo a hiperfiltração e a hipertensão intraglomerular, o que confere potente proteção nefro e cardiovascular comprovada em grandes ensaios clínicos.",
    source: "ENARE",
    year: 2024
  },
  {
    subjectName: "Saúde Coletiva & Epidemiologia",
    period: 6,
    text: "Em uma investigação sobre fatores de risco para adenocarcinoma gástrico, pesquisadores selecionaram 200 pacientes com diagnóstico recente confirmado histologicamente da neoplasia e 200 indivíduos sem a doença, pareados por sexo e faixa etária. Em seguida, entrevistaram ambos os grupos para quantificar a exposição prévia ao tabagismo e ao consumo de alimentos ultraprocessados nos últimos 20 anos. Qual é o delineamento epidemiológico desse estudo e a sua medida de associação clássica?",
    options: [
      "Estudo de Caso-Controle; Odds Ratio (Razão de Chances)",
      "Estudo de Coorte Prospectivo; Risco Relativo (RR)",
      "Ensaio Clínico Randomizado; Risco Atribuível Proporcional",
      "Estudo Transversal Seccional; Razão de Prevalência (RP)"
    ],
    correctOption: 0,
    explanation: "O estudo de caso-controle parte dos indivíduos com a doença (casos) e sem a doença (controles) e olha retrospectivamente para o passado para investigar a frequência de exposição a fatores de risco prévios. Por não calcular a incidência diretamente, sua medida de associação clássica é o Odds Ratio (OR).",
    source: "USP",
    year: 2023
  },
  {
    subjectName: "Farmacologia Clínica",
    period: 5,
    text: "Um paciente de 62 anos com insuficiência cardíaca com fração de ejeção reduzida (FEVE de 32%, classe funcional NYHA II) já faz uso otimizado de Enalapril, Carvedilol e Espironolactona. Para otimização prognóstica guiada por diretrizes internacionais, qual substituição terapêutica farmacológica está formalmente recomendada?",
    options: [
      "Substituição do Enalapril por Sacubitril/Valsartana (inibidor da neprilisina e bloqueador do receptor de angiotensina - INOVA), respeitando intervalo de wash-out de 36 horas",
      "Adição de Digoxina em altas doses com suspensão imediata do betabloqueador",
      "Substituição do Carvedilol por Propranolol e aumento da espironolactona",
      "Associação empírica de Verapamil à terapia tríplice basal"
    ],
    correctOption: 0,
    explanation: "O estudo PARADIGM-HF demonstrou superioridade de Sacubitril/Valsartana em relação ao enalapril na redução de mortalidade cardiovascular e hospitalizações em IC com FE reduzida. A transição de um IECA para Sacubitril/Valsartana exige uma janela de interrupção (wash-out) de pelo menos 36 horas para prevenir a ocorrência de angioedema grave por acúmulo de bradicinina.",
    source: "UNICAMP",
    year: 2024
  },
  {
    subjectName: "Saúde Coletiva & Epidemiologia",
    period: 6,
    text: "Um teste de triagem para determinada doença metabólica rara (prevalência de 0,1% na população geral) possui sensibilidade de 99% e especificidade de 95%. Se esse teste for aplicado em 10.000 pessoas assintomáticas dessa população, qual será o impacto esperado sobre o Valor Preditivo Positivo (VPP) do exame?",
    options: [
      "O VPP será muito baixo, com grande proporção de resultados falsos-positivos decorrente da baixa prevalência populacional da condição",
      "O VPP será de aproximadamente 99%, espelhando a sensibilidade intrínseca do teste",
      "O VPP permanecerá fixo independente da prevalência, pois testes diagnósticos possuem valores preditivos constantes",
      "O valor preditivo negativo (VPN) cairá a zero"
    ],
    correctOption: 0,
    explanation: "Enquanto sensibilidade e especificidade são características intrínsecas do teste diagnóstico, os valores preditivos dependem diretamente da prevalência da doença na população testada. Quando a prevalência é extremamente baixa, o número absoluto de falsos-positivos na população saudável supera com folga os verdadeiros positivos, tornando o Valor Preditivo Positivo (VPP) baixo.",
    source: "Revalida INEP",
    year: 2022
  },
  {
    subjectName: "Farmacologia Clínica",
    period: 5,
    text: "Paciente de 50 anos dá entrada na sala de emergência com taquicardia supraventricular paroxística por reentrada nodal com frequência de 180 bpm, lúcido, com pressão de 125/80 mmHg e sem sinais de instabilidade hemodinâmica. Após falha da manobra vagal padronizada, qual é a droga antiarrítmica intravenosa de primeira escolha a ser administrada em bólus rápido com flush de solução salina?",
    options: [
      "Adenosina (6 mg EV em bólus rápido)",
      "Amiodarona (300 mg EV infundidos em 1 hora)",
      "Sulfato de magnésio (2 g EV lento)",
      "Lidocaína (1,5 mg/kg em bólus)"
    ],
    correctOption: 0,
    explanation: "A adenosina é o agente farmacológico de escolha na reversão da taquicardia paroxística supraventricular estável que não reverte à manobra vagal. Ela atua nos receptores A1 atriais e nodais, causando hiperpolarização transitória e bloqueio quase completo da condução no nodo AV por alguns segundos, interrompendo o circuito de reentrada.",
    source: "SUS-SP",
    year: 2023
  },
  {
    subjectName: "Saúde Coletiva & Epidemiologia",
    period: 6,
    text: "De acordo com os princípios doutrinários e organizacionais do Sistema Único de Saúde (SUS) consolidados pela Lei Orgânica nº 8.080/1990, o princípio segundo o qual se deve tratar desigualmente os desiguais, priorizando o direcionamento de recursos para as populações em maior situação de vulnerabilidade e necessidade, é denominado:",
    options: [
      "Equidade",
      "Integralidade",
      "Descentralização",
      "Universalidade estrita"
    ],
    correctOption: 0,
    explanation: "A equidade é o princípio de justiça social no SUS que reconhece as diferenças individuais e coletivas, alocando recursos de forma proporcional às carências de cada grupo para diminuir disparidades históricas. Universalidade refere-se ao acesso de todos; integralidade abrange prevenção, cura e reabilitação.",
    source: "ENARE",
    year: 2023
  },
  {
    subjectName: "Farmacologia Clínica",
    period: 5,
    text: "Homem de 40 anos com asma brônquica persistente grave necessita de corticoterapia sistêmica oral por mais de 6 semanas para controle de exacerbação. Ao decidir pela descontinuação do fármaco, a retirada deve ser feita de forma gradual e lenta (desmame). Qual é a complicação endócrina aguda potencialmente fatal que se deseja evitar com essa conduta?",
    options: [
      "Insuficiência adrenal aguda secundária à supressão prolongada do eixo hipotálamo-hipófise-adrenal (HHA)",
      "Tireotoxicose factícia por excesso de TSH",
      "Síndrome de Cushing iatrogênica rebote",
      "Crise hipertensiva mediada por hiperaldosteronismo primário"
    ],
    correctOption: 0,
    explanation: "O uso de doses suprafisiológicas de corticosteroides por períodos superiores a 2 a 3 semanas suprime por feedback negativo a secreção de CRH hipotalâmico e ACTH hipofisário, levando à atrofia do córtex das adrenais. A suspensão abrupta priva o paciente tanto do corticoide exógeno quanto do endógeno, deflagrando crise addisoniana aguda (hipotensão refratária, hipoglicemia e colapso circulatório).",
    source: "USP",
    year: 2024
  },
  {
    subjectName: "Saúde Coletiva & Epidemiologia",
    period: 6,
    text: "Em um estudo clínico para avaliar a eficácia de uma nova vacina contra bronquiolite por vírus sincicial respiratório, nem os participantes do estudo nem a equipe médica que avaliava os sintomas clínicos sabiam quem recebia o imunizante ativo e quem recebia o placebo inerte. Esse desenho experimental é classificado como:",
    options: [
      "Ensaio clínico duplo-cego randomizado",
      "Estudo de coorte aberta controlada",
      "Estudo quase-experimental simples-cego",
      "Estudo caso-controle aninhado"
    ],
    correctOption: 0,
    explanation: "O mascaramento ou cegamento duplo (duplo-cego) ocorre quando nem o participante da pesquisa nem o pesquisador/avaliador que mensura os desfechos têm conhecimento do grupo de alocação (intervenção vs. controle/placebo). Isso previne a ocorrência de viés de aferição e efeito observador/placebo.",
    source: "UNICAMP",
    year: 2022
  },
  {
    subjectName: "Farmacologia Clínica",
    period: 5,
    text: "Paciente de 70 anos em pós-operatório ortopédico desenvolve tromboembolismo pulmonar (TEP) agudo com estabilidade hemodinâmica. A equipe médica opta por iniciar anticoagulação com Rivaroxabana por via oral. Qual é o alvo molecular inibido diretamente por esse anticoagulante oral direto (DOAC)?",
    options: [
      "Fator Xa ativado livre e ligado ao coágulo",
      "Trombina livre (Fator IIa) exclusivamente",
      "Vitamina K epóxido redutase (VKORC1)",
      "Antitrombina III por ligação alostérica"
    ],
    correctOption: 0,
    explanation: "A rivaroxabana (assim como a apixabana e a edoxabana) é um inibidor direto, altamente seletivo e reversível do Fator Xa da coagulação, bloqueando tanto o fator Xa livre no plasma quanto o ligado ao complexo protrombinase. Já a dabigatrana é um inibidor direto da trombina (Fator IIa).",
    source: "Revalida INEP",
    year: 2023
  },
  {
    subjectName: "Saúde Coletiva & Epidemiologia",
    period: 6,
    text: "Em relação à prevenção em saúde pública, o ato de orientar mudanças no estilo de vida (como cessação do tabagismo e prática de atividade física regular) em indivíduos sadios com o objetivo de evitar a ocorrência primária do infarto agudo do miocárdio exemplifica qual nível de prevenção?",
    options: [
      "Prevenção Primária",
      "Prevenção Secundária",
      "Prevenção Terciária",
      "Prevenção Quaternária"
    ],
    correctOption: 0,
    explanation: "A prevenção primária atua no período pré-patogênico sobre os determinantes de saúde e fatores de risco de indivíduos suscetíveis para impedir o surgimento da doença (ex.: vacinas e controle do tabagismo). A secundária foca no diagnóstico precoce (ex.: mamografia/rastreio); a terciária na reabilitação; e a quaternária na prevenção de iatrogenias e excesso de intervenções.",
    source: "SUS-SP",
    year: 2023
  },
  {
    subjectName: "Farmacologia Clínica",
    period: 5,
    text: "Durante o manejo de um paciente com choque séptico refratário a ressuscitação volêmica guiada por metas (cristaloides isotônicos a 30 mL/kg), qual é o vasopressor de primeira escolha recomendado pelas diretrizes da Surviving Sepsis Campaign para restauração da pressão arterial média (PAM >= 65 mmHg)?",
    options: [
      "Norepinefrina (Noradrenalina)",
      "Dopamina em dose intermediária",
      "Epinefrina pura como monoterapia inicial",
      "Fenilefrina em infusão em bólus"
    ],
    correctOption: 0,
    explanation: "A noradrenalina é o vasopressor de primeira linha absoluto no choque séptico. Seu potente efeito vasoconstritor alfa-1 eleva a resistência vascular sistêmica com menor taquicardia arritmogênica comparada à dopamina ou epinefrina pura.",
    source: "ENARE",
    year: 2024
  },
  {
    subjectName: "Saúde Coletiva & Epidemiologia",
    period: 6,
    text: "Na análise bioestatística de um estudo epidemiológico, a probabilidade de rejeitar a hipótese nula (H0) quando ela é de fato verdadeira no universo populacional é denominada:",
    options: [
      "Erro Tipo I ou alfa (falso-positivo do estudo)",
      "Erro Tipo II ou beta (falso-negativo do estudo)",
      "Poder estatístico do teste (1 - beta)",
      "Viés de Berkson por seleção hospitalar"
    ],
    correctOption: 0,
    explanation: "O Erro Tipo I (denotado pela letra grega alfa) ocorre quando o pesquisador conclui erroneamente que existe um efeito ou diferença estatisticamente significativa entre grupos, quando na realidade a hipótese nula era verdadeira (afirmação de falsa relação). O Erro Tipo II (beta) ocorre quando não se rejeita H0 havendo diferença real.",
    source: "USP",
    year: 2022
  },
  {
    subjectName: "Farmacologia Clínica",
    period: 5,
    text: "Paciente feminina de 32 anos portadora de transtorno de pânico faz uso de Paroxetina (ISRS) e procura pronto-atendimento com febre alta, tremores intensos, rigidez muscular, clonus espontâneo, diarreia e sudorese profusa após ter tomado Tramadol para lombalgia aguda. Qual síndrome toxicológica e qual classe de fármacos desencadearam esse quadro?",
    options: [
      "Síndrome serotoninérgica aguda; provocada pelo excesso de tônus serotonérgico por interação entre ISRS e tramadol",
      "Síndrome neuroléptica maligna pura decorrente de toxicidade colinérgica",
      "Crise hipertensiva por efeito tiramina secundária a IMAO",
      "Síndrome anticolinérgica periférica pura"
    ],
    correctOption: 0,
    explanation: "O tramadol possui atividade inibidora da recaptação de serotonina e norepinefrina além de sua ação opioide fraca. Sua associação com um inibidor seletivo da recaptação de serotonina (Paroxetina) precipita a Síndrome Serotoninérgica, caracterizada pela tríade de alteração do estado mental, hiperatividade autonômica (diaforese, taquicardia, febre) e hiper-reatividade neuromuscular (clonus, tremores, hiper-reflexia).",
    source: "UNICAMP",
    year: 2023
  },
  {
    subjectName: "Saúde Coletiva & Epidemiologia",
    period: 6,
    text: "No contexto da Política Nacional de Atenção Básica (PNAB) no Brasil, a Estratégia Saúde da Família (ESF) é definida como o modelo prioritário para a consolidação e expansão da Atenção Primária. A composição básica de uma equipe de Saúde da Família é constituída minimamente por:",
    options: [
      "Médico, enfermeiro, técnico ou auxiliar de enfermagem e agentes comunitários de saúde (ACS)",
      "Médico generalista, farmacêutico clínico e assistente social exclusivamente",
      "Médico especialista de família, psicólogo e fisioterapeuta",
      "Enfermeiro de atenção primária, nutricionista e dois técnicos de laboratório"
    ],
    correctOption: 0,
    explanation: "Segundo a PNAB, a equipe de Saúde da Família mínima é composta por: 1 médico (preferencialmente de família e comunidade), 1 enfermeiro, 1 técnico ou auxiliar de enfermagem e Agentes Comunitários de Saúde (ACS), podendo agregar a equipe de saúde bucal (cirurgião-dentista e auxiliar/técnico).",
    source: "Revalida INEP",
    year: 2022
  },
  {
    subjectName: "Farmacologia Clínica",
    period: 5,
    text: "Qual das seguintes estatinas de alta potência e em qual posologia diária é formalmente indicada para a profilaxia secundária em pacientes de muito alto risco cardiovascular após infarto agudo do miocárdio?",
    options: [
      "Atorvastatina 40 a 80 mg/dia ou Rosuvastatina 20 a 40 mg/dia",
      "Sinvastatina 10 a 20 mg/dia exclusivamente",
      "Pravastatina 10 mg/dia associada a fenofibrato",
      "Fluvastatina 20 mg em dias alternados"
    ],
    correctOption: 0,
    explanation: "Pacientes após evento coronariano agudo encontram-se em categoria de risco cardiovascular muito alto, tendo indicação de terapia de alta intensidade com estatinas (com meta de redução >= 50% do LDL basal e LDL < 50 mg/dL). Os esquemas com essa potência comprovada são: Atorvastatina 40-80 mg ou Rosuvastatina 20-40 mg ao dia.",
    source: "SUS-SP",
    year: 2024
  },
  {
    subjectName: "Saúde Coletiva & Epidemiologia",
    period: 6,
    text: "A medida que quantifica o número de NOVOS casos de uma determinada patologia surgidos em uma população sob risco ao longo de um intervalo definido de tempo é denominada:",
    options: [
      "Incidência",
      "Prevalência pontual",
      "Prevalência de período",
      "Taxa de letalidade específica"
    ],
    correctOption: 0,
    explanation: "A incidência expressa a velocidade e o número de casos novos de uma doença que se desenvolvem em uma população previamente livre do desfecho ao longo de um período. Prevalência refere-se ao número total de casos existentes (antigos + novos) em um dado momento.",
    source: "ENARE",
    year: 2021
  },
  {
    subjectName: "Farmacologia Clínica",
    period: 5,
    text: "Homem de 58 anos em tratamento para tuberculose ativa com o esquema básico RIPE (Rifampicina, Isoniazida, Pirazinamida e Etambutol) apresenta parestesias dolorosas em queimação e dormência nos pés. Esse quadro de neuropatia periférica é causado por qual dos fármacos e prevenido pela suplementação de qual composto?",
    options: [
      "Isoniazida; decorrente de interferência no metabolismo da piridoxina (Vitamina B6)",
      "Etambutol; por neurite óptica tóxica por falta de riboflavina",
      "Rifampicina; por depleção medular de tiamina (Vitamina B1)",
      "Pirazinamida; por acúmulo sistêmico de ácido úrico muscular"
    ],
    correctOption: 0,
    explanation: "A isoniazida compete funcionalmente com a piridoxina (vitamina B6) e acelera sua excreção renal, comprometendo a síntese de neurotransmissores como o GABA e gerando neuropatia periférica axonal. A suplementação de piridoxina (10 a 50 mg/dia) previne ou reverte essa toxicidade.",
    source: "USP",
    year: 2023
  },
  {
    subjectName: "Saúde Coletiva & Epidemiologia",
    period: 6,
    text: "Em um estudo sobre o consumo de tabaco e câncer pulmonar realizado com dados agregados em nível populacional de diferentes países (comparando o consumo médio de cigarros per capita por país e as respectivas taxas nacionais de mortalidade por câncer), o erro metodológico de atribuir a um indivíduo isolado as conclusões obtidas a partir dos dados agrupados é denominado:",
    options: [
      "Falácia Ecológica (ou viés de agregação)",
      "Viés de memória (recall bias)",
      "Efeito Hawthorne de modificação de conduta",
      "Viés de atrito por perdas de seguimento"
    ],
    correctOption: 0,
    explanation: "Em estudos ecológicos (onde a unidade de análise é a população agregada e não o indivíduo), a constatação de correlação entre variáveis no nível coletivo não garante causalidade no nível individual. Inferir que um indivíduo específico tem maior risco baseado unicamente no dado médio da população constitui a clássica Falácia Ecológica.",
    source: "UNICAMP",
    year: 2024
  },
  {
    subjectName: "Farmacologia Clínica",
    period: 5,
    text: "Paciente de 68 anos hospitalizado por acidente vascular encefálico isquêmico agudo desenvolve fibrilação atrial permanente. Ele possui escore CHA2DS2-VASc de 5 pontos. Qual a conduta padrão indicada para prevenção secundária de novos eventos tromboembólicos?",
    options: [
      "Anticoagulação plena oral (preferencialmente com DOACs ou varfarina com RNI alvo 2-3)",
      "Dupla antiagregação plaquetária com aspirina e clopidogrel isolados por 12 meses",
      "Monoterapia antiplaquetária com ácido acetilsalicílico em baixa dose",
      "Uso profilático de heparina não fracionada em doses subcutâneas baixas para o resto da vida"
    ],
    correctOption: 0,
    explanation: "Pacientes masculinos com FA e CHA2DS2-VASc >= 2 (ou mulheres >= 3) têm benefício demonstrado de anticoagulação oral para prevenir AVC cardioembólico. Os anticoagulantes orais diretos (DOACs: apixabana, rivaroxabana, dabigatrana, edoxabana) são a primeira linha em pacientes não portadores de prótese valvar metálica ou estenose mitral moderada a grave.",
    source: "Revalida INEP",
    year: 2024
  },
  {
    subjectName: "Saúde Coletiva & Epidemiologia",
    period: 6,
    text: "O coeficiente de mortalidade infantil é um dos principais indicadores da qualidade de vida e do desenvolvimento socioeconômico e sanitário de uma região. Esse indicador calcula a relação entre:",
    options: [
      "O número de óbitos de crianças menores de 1 ano de idade pelo número total de nascidos vivos no mesmo período e local (por 1.000 nascidos vivos)",
      "O número de óbitos de crianças menores de 5 anos pelo total de habitantes da comunidade",
      "O número de óbitos neonatais pelo total de partos cesáreos hospitalares",
      "O número de mortes fetais após 28 semanas de gestação pelo número total de óbitos gerais"
    ],
    correctOption: 0,
    explanation: "A taxa ou coeficiente de mortalidade infantil mede o número de óbitos de crianças com menos de 1 ano de idade por cada 1.000 nascidos vivos em determinada população durante o ano considerado, subdividindo-se em componente neonatal (precoce e tardio) e pós-neonatal.",
    source: "SUS-SP",
    year: 2022
  },
  {
    subjectName: "Farmacologia Clínica",
    period: 5,
    text: "Paciente portador de hipertensão arterial sistêmica primária e gota tofácea crônica com crises frequentes de artrite gotosa necessita de introdução de um segundo fármaco anti-hipertensivo. Qual classe medicamentosa deve ser EVITADA por diminuir a excreção tubular renal de ácido úrico e deflagrar crises álgicas?",
    options: [
      "Diuréticos tiazídicos (como a hidroclorotiazida e clortalidona)",
      "Bloqueadores dos canais de cálcio (como anlodipino)",
      "Bloqueadores dos receptores de angiotensina II (como losartana)",
      "Inibidores da enzima conversora de angiotensina"
    ],
    correctOption: 0,
    explanation: "Os diuréticos tiazídicos e de alça aumentam a reabsorção de ácido úrico no túbulo proximal por contração de volume intravascular e competem pelo mesmo transportador tubular orgânico de eliminação, elevando o ácido úrico sérico e deflagrando crises gotosas. Em contrapartida, a Losartana possui um efeito uricosúrico intrínseco benéfico nesses pacientes.",
    source: "ENARE",
    year: 2023
  },
  {
    subjectName: "Saúde Coletiva & Epidemiologia",
    period: 6,
    text: "De acordo com a Lei nº 8.142/1990, a participação da comunidade na gestão do Sistema Único de Saúde (SUS) ocorre obrigatoriamente por meio de dois órgãos colegiados permanentes nas esferas federal, estadual e municipal, que são:",
    options: [
      "Conferências de Saúde e Conselhos de Saúde",
      "Câmaras de Arbitragem e Secretarias de Vigilância Sanitária",
      "Comissões Intergestores Bipartite e Tripartite exclusivamente",
      "Tribunais de Contas e Associações de Moradores"
    ],
    correctOption: 0,
    explanation: "A Lei 8.142/90 institucionalizou a participação social no SUS através de: 1) Conselhos de Saúde (órgãos colegiados permanentes e deliberativos de controle social com composição paritária, onde 50% são usuários) e 2) Conferências de Saúde (que se reúnem a cada quatro anos com representação de vários segmentos sociais para avaliar a situação e propor diretrizes).",
    source: "USP",
    year: 2021
  },
  {
    subjectName: "Farmacologia Clínica",
    period: 5,
    text: "Mulher de 25 anos com tromboembolismo venoso agudo é anticoagulada com Heparina Não Fracionada (HNF) em bomba de infusão contínua. Qual exame laboratorial de monitorização deve ser coletado a cada 6 horas para ajuste da taxa de infusão, mantendo a razão de anticoagulação terapêutica alvo entre 1,5 e 2,5 vezes o valor basal?",
    options: [
      "Tempo de Tromboplastina Parcial Ativada (TTPa / KTTP)",
      "Tempo de Protrombina (TP / RNI)",
      "Tempo de Trombina com curva de fibrinogênio",
      "Contagem seriada de plaquetas com dosagem de fator VIII"
    ],
    correctOption: 0,
    explanation: "A heparina não fracionada (HNF) atua acelerando a atividade da antitrombina III contra a trombina e os fatores da via intrínseca (especialmente XIIa, XIa e IXa). Sua monitorização laboratorial mandatória à beira do leito é feita pelo TTPa (tempo de tromboplastina parcial ativada). O TP/INR é utilizado para monitorar antagonistas da vitamina K (varfarina).",
    source: "UNICAMP",
    year: 2022
  },
  {
    subjectName: "Saúde Coletiva & Epidemiologia",
    period: 6,
    text: "Em um estudo clínico randomizado que avaliou um novo hipolipemiante, a taxa de infarto agudo do miocárdio em 5 anos foi de 4% no grupo intervenção e de 8% no grupo controle (placebo). A Redução Absoluta do Risco (RAR) e o Número Necessário para Tratar (NNT) para evitar um evento coronariano foram, respectivamente:",
    options: [
      "RAR = 4% (0,04) e NNT = 25 pacientes",
      "RAR = 50% e NNT = 2 pacientes",
      "RAR = 2% e NNT = 50 pacientes",
      "RAR = 8% e NNT = 12 pacientes"
    ],
    correctOption: 0,
    explanation: "A Redução Absoluta do Risco (RAR) é a diferença aritmética simples entre o risco do grupo controle (8%) e do grupo intervenção (4%): RAR = 0,08 - 0,04 = 0,04 (ou 4%). O Número Necessário para Tratar (NNT) é o inverso matemático da RAR: NNT = 1 / RAR = 1 / 0,04 = 25. Significa que é necessário tratar 25 pacientes por 5 anos com a droga para prevenir 1 IAM.",
    source: "Revalida INEP",
    year: 2023
  },
  {
    subjectName: "Farmacologia Clínica",
    period: 5,
    text: "Homem de 60 anos dá entrada na sala de emergência com síndrome coronariana aguda com supradesnivelamento do segmento ST (IAM com supra de ST) com menos de 2 horas de evolução, em hospital terciário dotado de serviço de hemodinâmica ativo. Qual a conduta terapêutica de reperfusão miocárdica de primeira escolha recomendada pelas diretrizes?",
    options: [
      "Angioplastia coronária transluminal primária imediata (tempo porta-balão ideal < 90 minutos)",
      "Trombólise química imediata com Tenecteplase venoso",
      "Terapia conservadora intensiva aguardando curva de troponina em 6 horas",
      "Cirurgia de revascularização miocárdica de urgência"
    ],
    correctOption: 0,
    explanation: "No IAM com supradesnivelamento de ST em instituição dotada de laboratório de cateterismo cardíaco 24h, a angioplastia primária por cateterismo com implante de stent farmacológico é o método de reperfusão superior à trombólise química quando executada com tempo porta-balão de até 90 minutos.",
    source: "SUS-SP",
    year: 2024
  },
  {
    subjectName: "Saúde Coletiva & Epidemiologia",
    period: 6,
    text: "A notificação compulsória de doenças, agravos e eventos de saúde pública é um dever de todos os médicos e profissionais de saúde no Brasil. Qual dos seguintes agravos exige NOTIFICAÇÃO IMEDIATA (em até 24 horas) ao Ministério da Saúde e às secretarias estaduais e municipais pelo risco de disseminação rápida?",
    options: [
      "Meningite meningocócica (ou suspeita de doença meningocócica)",
      "Hanseníase em qualquer forma clínica",
      "Hepatite C crônica assintomática",
      "Esquistossomose mansônica em zona endêmica"
    ],
    correctOption: 0,
    explanation: "A doença meningocócica é uma emergência epidemiológica de alta transmissibilidade e letalidade, exigindo notificação imediata em até 24 horas às autoridades de saúde para viabilizar busca ativa de comunicantes próximos e profilaxia antimicrobiana imediata (bloqueio quimioprofilático com rifampicina ou ceftriaxona).",
    source: "ENARE",
    year: 2024
  },
  {
    subjectName: "Farmacologia Clínica",
    period: 5,
    text: "Qual das seguintes drogas é um antagonista específico utilizado na reversão imediata de intoxicações agudas ou superdosagens de benzodiazepínicos (como Diazepam ou Midazolam)?",
    options: [
      "Flumazenil",
      "Naloxona",
      "Atropina",
      "Protamina"
    ],
    correctOption: 0,
    explanation: "O flumazenil é um antagonista competitivo puro dos receptores de benzodiazepínicos no complexo GABA-A no sistema nervoso central. Ele desloca e bloqueia a ação sedativa e depressora respiratória dos benzodiazepínicos. A naloxona reverte opioides; a atropina reverte organofosforados; a protamina neutraliza heparina.",
    source: "USP",
    year: 2022
  },
  {
    subjectName: "Saúde Coletiva & Epidemiologia",
    period: 6,
    text: "O viés de confusão (confounding bias) ocorre em um estudo epidemiológico observacional quando uma variável externa está associada simultaneamente à exposição e ao desfecho investigados, sem fazer parte da cadeia causal intermediária. Qual método metodológico na FASE DE DELINEAMENTO pode ser empregado para minimizar o viés de confusão?",
    options: [
      "Randomização ou Pareamento (matching)",
      "Aumento exclusivo do tempo de seguimento longitudinal",
      "Uso de questionários autoaplicáveis via web",
      "Eliminação das perdas de seguimento durante a coleta"
    ],
    correctOption: 0,
    explanation: "Para controlar fatores de confusão na fase de planejamento/delineamento do estudo, as três estratégias clássicas são: 1) Randomização (em ensaios clínicos, distribuindo confundidores conhecidos e desconhecidos igualmente entre grupos); 2) Pareamento (matching nos estudos caso-controle); e 3) Restrição amostral. Na fase de análise dos dados, utiliza-se estratificação ou regressão multivariada.",
    source: "UNICAMP",
    year: 2023
  },
  {
    subjectName: "Farmacologia Clínica",
    period: 5,
    text: "Um homem de 52 anos em pós-operatório de cirurgia ortopédica desenvolve fibrilação atrial aguda sintomática e trombocitopenia grave após 6 dias de uso de heparina não fracionada (queda > 50% na contagem plaquetária com trombose venosa associada - HIT tipo II). Qual é a conduta farmacológica imediata obrigatória?",
    options: [
      "Suspender imediatamente qualquer forma de heparina e iniciar anticoagulante não heparínico parenteral (como Fondaparinux, Bivalirudina ou Argatrobana)",
      "Transfundir imediatamente concentrados de plaquetas profiláticos",
      "Trocar heparina não fracionada por enoxaparina em dose dobrada",
      "Iniciar Varfarina em dose de ataque de 10 mg como monoterapia isolada imediata"
    ],
    correctOption: 0,
    explanation: "Na Trombocitopenia Induzida por Heparina mediada por imunocomplexos (HIT tipo II), anticorpos IgG anti-fator plaquetário 4/heparina ativam plaquetas e monócitos em massa, gerando um estado hipercoagulável paradoxal grave. A conduta é a interrupção imediata de toda forma de heparina (incluindo HBPM) e introdução de anticoagulante parenteral de ação direta não heparínico. A transfusão de plaquetas é contraindicada ('combustível na fogueira') e a varfarina isolada na fase aguda precipita necrose de pele.",
    source: "Revalida INEP",
    year: 2021
  },
  {
    subjectName: "Saúde Coletiva & Epidemiologia",
    period: 6,
    text: "A sensibilidade de um teste diagnóstico mede a capacidade do teste em identificar corretamente os indivíduos verdadeiramente doentes. Se um novo teste de detecção do antígeno de Chlamydia trachomatis tem sensibilidade de 92%, isso significa que:",
    options: [
      "O teste é positivo em 92% dos pacientes que realmente possuem a infecção bacteriana (taxa de falso-negativo de 8%)",
      "92% dos pacientes com resultado positivo no exame estão realmente doentes",
      "O teste é negativo em 92% das pessoas hígidas sem a infecção",
      "A probabilidade pós-teste de estar doente é de 92% em qualquer cenário"
    ],
    correctOption: 0,
    explanation: "Sensibilidade = Verdadeiros-Positivos / (Verdadeiros-Positivos + Falsos-Negativos). Uma sensibilidade de 92% indica que entre 100 indivíduos portadores confirmados da doença, o teste acusará positivo em 92 e deixará de diagnosticar 8 (8% de falsos-negativos). A probabilidade de um resultado positivo ser verdadeiro doente depende também da especificidade e prevalência (VPP).",
    source: "SUS-SP",
    year: 2023
  },
  {
    subjectName: "Farmacologia Clínica",
    period: 5,
    text: "Paciente de 45 anos com asma brônquica crônica dá entrada no pronto-atendimento com crise aguda de gota tofácea em primeira articulação metatarsofalângica esquerda (podagra). Qual é o medicamento anti-inflamatório analgésico de escolha na crise gotosa aguda para pacientes que possuem contraindicação formal ao uso de AINEs?",
    options: [
      "Colquicina oral em baixas doses ou Corticoterapia sistêmica (Prednisona oral)",
      "Alopurinol em dose de ataque máxima de 600 mg",
      "Febuxostate oral de liberação sustentada",
      "Probenecida combinada a ácido acetilsalicílico"
    ],
    correctOption: 0,
    explanation: "Na crise gotosa aguda, o objetivo é cessar a inflamação com AINEs, Colquicina oral em baixas doses (1 mg seguido de 0,5 mg após 1h) ou Corticoides sistêmicos (indicados em insuficiência renal, úlcera ou asma grave descompensada). O alopurinol nunca deve ser iniciado durante a crise aguda porque variações abruptas na uricemia mobilizam cristais e prolongam a artrite.",
    source: "ENARE",
    year: 2024
  },
  {
    subjectName: "Saúde Coletiva & Epidemiologia",
    period: 6,
    text: "De acordo com o modelo de determinação social da saúde proposto por Dahlgren e Whitehead, as condições de vida e trabalho (como saneamento básico, habitação, educação e produção de alimentos) situam-se em qual nível de causalidade?",
    options: [
      "Determinantes intermediários/sociais gerais e econômicos da saúde",
      "Determinantes biológicos imutáveis puramente genéticos",
      "Comportamentos e estilos de vida puramente individuais",
      "Estruturas fisiológicas moleculares"
    ],
    correctOption: 0,
    explanation: "No modelo em camadas concêntricas de Dahlgren e Whitehead, o núcleo central contém as características biológicas e genéticas dos indivíduos; a segunda camada são os estilos de vida individuais; a terceira são as redes sociais e comunitárias; a quarta camada engloba as condições de vida e de trabalho (habitação, saneamento, emprego, água); e a camada mais externa compreende as condições socioeconômicas, culturais e ambientais globais.",
    source: "USP",
    year: 2024
  },
  {
    subjectName: "Farmacologia Clínica",
    period: 5,
    text: "Mulher de 29 anos no primeiro trimestre de gestação (idade gestacional de 8 semanas) apresenta urocultura com crescimento de Escherichia coli (> 100.000 UFC/mL) sensível a antimicrobianos. Qual dos seguintes antibióticos é seguro e considerado de primeira escolha para tratamento da bacteriúria assintomática na gestação?",
    options: [
      "Fosfomicina trometamol em dose única ou Nitrofurantoína",
      "Ciprofloxacino oral por 7 dias",
      "Doxiciclina venosa em infusão",
      "Sulfametoxazol-Trimetoprima"
    ],
    correctOption: 0,
    explanation: "Na gestação, quinolonas (ciprofloxacino) são contraindicadas por dano às cartilagens de crescimento fetal, tetraciclinas (doxiciclina) causam manchas ósseas e dentárias, e sulfas no primeiro trimestre interferem no metabolismo do folato. As opções seguras de primeira escolha são beta-lactâmicos (amoxicilina, cefalexina), fosfomicina em dose única e nitrofurantoína (esta segura até a 36ª semana).",
    source: "UNICAMP",
    year: 2022
  },
  {
    subjectName: "Saúde Coletiva & Epidemiologia",
    period: 6,
    text: "Em bioestatística, a curva ROC (Receiver Operating Characteristic) é utilizada para comparar o desempenho global de diferentes testes diagnósticos com variáveis contínuas. A área sob a curva ROC (AUC) reflete a acurácia global do teste. Um teste diagnóstico perfeito e infalível apresenta uma área sob a curva (AUC) igual a:",
    options: [
      "1,0 (ou 100% de sensibilidade e especificidade absolutas)",
      "0,5 (equivalente ao acaso ou cara ou coroa)",
      "0,0 com inclinação negativa",
      "Indefinida matematicamente"
    ],
    correctOption: 0,
    explanation: "A curva ROC plota a Sensibilidade (eixo Y) contra o complemento da especificidade (1 - Especificidade, eixo X) para todos os pontos de corte possíveis. Um teste perfeitamente discriminatório tem sensibilidade de 100% e especificidade de 100%, gerando uma área sob a curva (AUC) de 1,0. Um teste inútil (que joga cara ou coroa) tem AUC de 0,5 sobre a diagonal.",
    source: "Revalida INEP",
    year: 2023
  },
  {
    subjectName: "Farmacologia Clínica",
    period: 5,
    text: "Paciente de 63 anos tabagista de longa data com diagnóstico prévio de DPOC grave com exacerbações frequentes e VEF1 < 50% faz uso de broncodilatador antimuscarínico de longa duração (LAMA). Qual classe de broncodilatador inalatório atua em sinergia terapêutica com o LAMA para promoção de broncodilatação sustentada e redução de hiperinsuflação dinâmica pulmonar?",
    options: [
      "Beta-2 agonista de longa duração (LABA, como Olodaterol ou Formoterol)",
      "Corticosteroide oral em doses elevadas contínuas",
      "Metilxantinas orais como aminofilina endovenosa",
      "Antagonista de receptores de leucotrienos oral"
    ],
    correctOption: 0,
    explanation: "A combinação de duas classes distintas de broncodilatadores inalatórios de ação prolongada — um anticolinérgico/antimuscarínico (LAMA, ex.: Tiotrópio) que bloqueia receptores M3 e um beta-2 agonista (LABA, ex.: Olodaterol/Formoterol) que estimula receptores adrenérgicos — promove sinergismo mecânico superior à monoterapia no manejo ambulatorial da DPOC.",
    source: "SUS-SP",
    year: 2021
  },
  {
    subjectName: "Saúde Coletiva & Epidemiologia",
    period: 6,
    text: "O Programa Nacional de Imunizações (PNI) do Brasil recomenda a vacina tríplice viral aos 12 meses de idade na rotina do calendário infantil. Essa vacina confere imunização ativa protetora contra quais três patologias virais?",
    options: [
      "Sarampo, Caxumba e Rubéola",
      "Difteria, Tétano e Coqueluche",
      "Varicela, Herpes Zóster e Citomegalovírus",
      "Poliomielite, Rotavírus e Hepatite A"
    ],
    correctOption: 0,
    explanation: "A vacina tríplice viral (SCR) protege contra o vírus do Sarampo (morbillivirus), Caxumba (paramixovírus) e Rubéola (togavírus), sendo composta por vírus vivos atenuados administrados por via subcutânea aos 12 meses, seguida da tetraviral (com varicela) aos 15 meses de vida.",
    source: "ENARE",
    year: 2022
  },
  {
    subjectName: "Farmacologia Clínica",
    period: 5,
    text: "Homem de 40 anos portador de transtorno depressivo maior tenta autoextermínio ingerindo 30 comprimidos de amitriptilina (antidepressivo tricíclico). Dá entrada com rebaixamento do nível de consciência, midríase, pele seca e quente, íleo paralítico e alargamento acentuado do complexo QRS (> 120 ms) com taquicardia ventricular. Qual intervenção medicamentosa intravenosa deve ser infundida imediatamente para estabilização de membrana miocárdica e alcalinização sérica?",
    options: [
      "Bicarbonato de Sódio 8,4% intravenoso",
      "Fisostigmina em infusão contínua lenta",
      "Glicose hipertônica 50% associada a insulina",
      "Sulfato de atropina em doses fracionadas"
    ],
    correctOption: 0,
    explanation: "A toxicidade cardíaca grave dos antidepressivos tricíclicos decorre do bloqueio dos canais rápidos de sódio voltagem-dependentes (Nav1.5) nos miócitos ventriculares, alargando o QRS e deflagrando arritmias ventriculares fatais. O bicarbonato de sódio EV alcaliniza o plasma (aumentando a ligação às proteínas e diminuindo a fração livre) e fornece sobrecarga de íons Na+, superando o bloqueio competitivo dos canais.",
    source: "USP",
    year: 2023
  },
  {
    subjectName: "Saúde Coletiva & Epidemiologia",
    period: 6,
    text: "No contexto da transição demográfica e epidemiológica observada na população brasileira nas últimas quatro décadas, o padrão de mortalidade e morbidade modificou-se de forma profunda. Qual é a principal característica desse novo cenário epidemiológico?",
    options: [
      "Declínio expressivo da mortalidade por doenças infecciosas e parasitárias, com predomínio absoluto de Doenças Crônicas Não Transmissíveis (DCNTs) e causas externas",
      "Aumento vertiginoso da taxa de fecundidade global com predomínio de crianças menores de 5 anos",
      "Erradicação completa dos acidentes de transporte terrestre",
      "Reversão completa da expectativa de vida média"
    ],
    correctOption: 0,
    explanation: "A transição epidemiológica brasileira caracteriza-se pela queda acentuada das doenças infecciosas, parasitárias e desnutrição infantil (graças a saneamento, vacinação e atenção primária), acompanhada pelo envelhecimento populacional e ascensão das Doenças Crônicas Não Transmissíveis (doenças cardiovasculares, neoplasias, diabetes) e das causas externas (violência urbana e acidentes de trânsito).",
    source: "UNICAMP",
    year: 2024
  },
  {
    subjectName: "Farmacologia Clínica",
    period: 5,
    text: "Um paciente hipertenso e diabético com insuficiência renal crônica apresenta dosagem sérica de potássio de 6,8 mEq/L (hipercalemia grave) com alterações no ECG evidenciando ondas T apiculadas em tenda e achatamento da onda P. Qual fármaco intravenoso deve ser administrado IMEDIATAMENTE como primeiro passo para estabilizar a membrana dos cardiomiócitos e prevenir fibrilação ventricular, antes das medidas de espoliação de potássio?",
    options: [
      "Gluconato de Cálcio 10% (ou Cloreto de Cálcio) intravenoso",
      "Solução polarizante de Glicose com Insulina regular",
      "Resinas de troca oral (Poliestirenossulfonato de cálcio)",
      "Nebulização com Fenoterol em altas doses"
    ],
    correctOption: 0,
    explanation: "Em presença de hipercalemia com alteração eletrocardiográfica, a prioridade absoluta imediata é o Gluconato de Cálcio a 10% (ou cloreto de cálcio se acesso central). O cálcio não altera a concentração sérica de potássio, mas eleva o limiar de potencial de ação das células miocárdicas, antagonizando os efeitos elétricos deletérios do excesso de K+ e estabilizando a membrana cardíaca em minutos.",
    source: "Revalida INEP",
    year: 2024
  },
  {
    subjectName: "Saúde Coletiva & Epidemiologia",
    period: 6,
    text: "Em um inquérito de saúde pública para investigar a prevalência pontual de tabagismo e hipertensão arterial na população adulta de um município em um único mês de avaliação através de visitas domiciliares, qual é o tipo de estudo epidemiológico conduzido?",
    options: [
      "Estudo Transversal (ou Seccional)",
      "Estudo de Coorte Prospectiva Fechada",
      "Ensaio de Campo Comunitário Randomizado",
      "Série de Casos Clínicos Longitudinal"
    ],
    correctOption: 0,
    explanation: "Os estudos transversais ou seccionais avaliam a exposição e o desfecho simultaneamente no mesmo ponto do tempo em uma amostra representativa da população (como uma 'fotografia instantânea'). São os estudos ideais para estimar a prevalência de doenças e fatores de risco e planejar serviços de saúde, mas têm como limitação a incapacidade de determinar causalidade temporal reversa.",
    source: "SUS-SP",
    year: 2023
  }
];
