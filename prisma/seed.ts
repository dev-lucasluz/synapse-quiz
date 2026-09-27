import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { expansionQuestions } from "./seed-expansion";

const prisma = new PrismaClient();

const subjects = [
  // 1º Período
  { name: "Anatomia Humana", period: 1, category: "Ciclo Básico" },
  { name: "Histologia & Embriologia", period: 1, category: "Ciclo Básico" },
  // 2º Período
  { name: "Fisiologia Humana", period: 2, category: "Ciclo Básico" },
  { name: "Bioquímica Médica", period: 2, category: "Ciclo Básico" },
  // 3º Período
  { name: "Patologia Geral", period: 3, category: "Ciclo Básico" },
  { name: "Imunologia & Microbiologia", period: 3, category: "Ciclo Básico" },
  // 4º Período
  { name: "Farmacologia Básica", period: 4, category: "Ciclo Básico" },
  { name: "Semiologia Médica I", period: 4, category: "Ciclo Básico" },
  // 5º Período
  { name: "Semiologia Médica II", period: 5, category: "Ciclo Clínico Inicial" },
  { name: "Farmacologia Clínica", period: 5, category: "Ciclo Clínico Inicial" },
  // 6º Período
  { name: "Diagnóstico por Imagem", period: 6, category: "Ciclo Clínico Inicial" },
  { name: "Saúde Coletiva & Epidemiologia", period: 6, category: "Ciclo Clínico Inicial" },
];

type SubjectKey =
  | "Anatomia Humana"
  | "Histologia & Embriologia"
  | "Fisiologia Humana"
  | "Bioquímica Médica"
  | "Patologia Geral"
  | "Imunologia & Microbiologia"
  | "Farmacologia Básica"
  | "Semiologia Médica I"
  | "Semiologia Médica II"
  | "Farmacologia Clínica"
  | "Diagnóstico por Imagem"
  | "Saúde Coletiva & Epidemiologia";

const questions: {
  subjectName: SubjectKey;
  text: string;
  options: string[];
  correctOption: number;
  explanation: string;
  source: string;
  year: number;
  imageUrl?: string;
}[] = [
  // --- ANATOMIA HUMANA ---
  {
    subjectName: "Anatomia Humana",
    text: "Um paciente chega ao pronto-socorro com ferimento por arma de fogo na fossa axilar direita. O exame revela paralisia dos músculos intrínsecos da mão, anestesia na face medial do antebraço e da mão, e o paciente apresenta garra ulnar. Qual nervo foi lesado?",
    options: [
      "Nervo mediano",
      "Nervo ulnar",
      "Nervo radial",
      "Nervo musculocutâneo",
    ],
    correctOption: 1,
    explanation:
      "O nervo ulnar (C8-T1) inerva a maioria dos músculos intrínsecos da mão (exceto os dois lumbricais laterais e músculos tenares). Sua lesão produz a clássica 'mão em garra' (mais pronunciada nos 4º e 5º dedos), fraqueza de adução e abdução dos dedos, e anestesia na borda medial da mão e nos 4º e 5º dedos. Na fossa axilar, o nervo ulnar é medial à artéria axilar, sendo vulnerável em traumas dessa região.",
    source: "ENARE",
    year: 2023,
  },
  {
    subjectName: "Anatomia Humana",
    text: "Durante uma colecistectomia laparoscópica, o cirurgião identifica o Triângulo de Calot. Quais estruturas delimitam esse triângulo?",
    options: [
      "Ducto hepático comum, ducto cístico e fígado",
      "Artéria cística, ducto biliar comum e vesícula biliar",
      "Ducto hepático comum, artéria hepática própria e ducto cístico",
      "Ducto biliar comum, veia porta e artéria hepática",
    ],
    correctOption: 0,
    explanation:
      "O Triângulo de Calot (hepatocístico) é delimitado superiormente pelo fígado (lobo hepático direito/cística do fígado), medialmente pelo ducto hepático comum e lateralmente pelo ducto cístico. Dentro desse triângulo encontra-se a artéria cística, ramo da artéria hepática direita — estrutura que o cirurgião deve identificar e ligar com segurança durante a colecistectomia para evitar hemorragia ou lesão das vias biliares.",
    source: "USP-RP",
    year: 2022,
  },
  {
    subjectName: "Anatomia Humana",
    text: "Na síndrome do túnel do carpo, qual nervo é comprimido e quais músculos tenares ficam paralisados?",
    options: [
      "Nervo ulnar — todos os músculos da eminência hipotenar",
      "Nervo mediano — oponente do polegar, abdutor curto do polegar e flexor curto do polegar (cabeça superficial)",
      "Nervo radial — extensor longo do polegar e abdutor longo do polegar",
      "Nervo interósseo anterior — flexor longo do polegar e pronador quadrado",
    ],
    correctOption: 1,
    explanation:
      "O nervo mediano atravessa o túnel do carpo sob o retináculo dos flexores. Sua compressão (síndrome do túnel do carpo) causa parestesia e anestesia nos três primeiros dedos e metade lateral do 4º dedo, além de paralisia dos músculos tenares: abdutor curto do polegar, oponente do polegar e cabeça superficial do flexor curto do polegar. O resultado clínico é a 'mão simiesca' com incapacidade de oposição do polegar.",
    source: "FMUSP",
    year: 2024,
  },

  // --- HISTOLOGIA & EMBRIOLOGIA ---
  {
    subjectName: "Histologia & Embriologia",
    text: "Na análise histológica de um linfonodo, observa-se grande quantidade de plasmócitos e centros germinativos ativos. Qual função imunológica esse achado indica predominantemente?",
    options: [
      "Resposta imune celular mediada por linfócitos T citotóxicos",
      "Resposta imune humoral com produção ativa de anticorpos",
      "Fagocitose de partículas por macrófagos do seio medular",
      "Apresentação antigênica por células dendríticas na zona do paracórtex",
    ],
    correctOption: 1,
    explanation:
      "Os centros germinativos nos folículos secundários do córtex do linfonodo são sítios de proliferação de linfócitos B e maturação da resposta humoral. Os plasmócitos são células efetoras derivadas de linfócitos B ativados, especializadas na secreção massiva de anticorpos. O achado conjunto de centros germinativos ativos + abundância de plasmócitos indica resposta imune humoral intensa e ativa.",
    source: "Revalida INEP",
    year: 2023,
  },
  {
    subjectName: "Histologia & Embriologia",
    text: "Um estudante analisa uma lâmina e observa epitélio estratificado pavimentoso queratinizado, glândulas sebáceas e glândulas sudoríparas écrinas. Qual estrutura está sendo analisada?",
    options: [
      "Mucosa oral",
      "Córnea",
      "Pele (epiderme densa)",
      "Esôfago médio",
    ],
    correctOption: 2,
    explanation:
      "A pele espessa (palma/planta) e a pele fina apresentam epitélio estratificado pavimentoso queratinizado como cobertura protetora. As glândulas sebáceas (associadas a folículos pilosos) e as glândulas sudoríparas écrinas são anexos cutâneos exclusivos da pele. A mucosa oral e o esôfago têm epitélio estratificado pavimentoso não queratinizado, enquanto a córnea é também não queratinizada e não possui glândulas.",
    source: "UNICAMP",
    year: 2022,
  },

  // --- FISIOLOGIA HUMANA ---
  {
    subjectName: "Fisiologia Humana",
    text: "Um atleta de alta performance realiza exercício intenso por 30 minutos. Qual das alterações fisiológicas a seguir ocorre de forma ESPERADA durante esse período?",
    options: [
      "Aumento da resistência vascular periférica total para manter pressão arterial",
      "Vasodilatação ativa nos músculos esqueléticos com redução da resistência vascular local",
      "Diminuição da frequência cardíaca mediada por aumento do tônus vagal",
      "Queda do débito cardíaco para preservar fluxo coronariano",
    ],
    correctOption: 1,
    explanation:
      "Durante exercício intenso, os músculos esqueléticos sofrem vasodilatação local intensa mediada por metabólitos (CO₂, H⁺, K⁺, adenosina, óxido nítrico), reduzindo drasticamente a resistência vascular local. Isso aumenta o fluxo sanguíneo muscular em até 20x. O débito cardíaco aumenta (pela elevação de FC e volume sistólico) e a resistência periférica total reduz, mas a pressão arterial sistólica sobe moderadamente pelo aumento do DC.",
    source: "SUS-SP",
    year: 2023,
  },
  {
    subjectName: "Fisiologia Humana",
    text: "Em um néfron, qual segmento é impermeável à água mesmo na presença de ADH (vasopressina) e é fundamental para a formação de urina diluída?",
    options: [
      "Túbulo proximal",
      "Ramo descendente delgado da alça de Henle",
      "Ramo ascendente espesso da alça de Henle",
      "Ducto coletor cortical",
    ],
    correctOption: 2,
    explanation:
      "O ramo ascendente espesso da alça de Henle (segmento dilutório) é impermeável à água independentemente da presença de ADH. Ele possui cotransportadores NKCC2 que reabsorvem ativamente Na⁺, K⁺ e Cl⁻ sem permitir osmose de água — diluindo o filtrado e gerando o gradiente hiperosmótico medular. Essa impermeabilidade obrigatória à água é essencial para a capacidade do rim de produzir urina hipotônica.",
    source: "ENARE",
    year: 2024,
  },

  // ==========================================
  // BLOCO 1: SISTEMA CARDIOVASCULAR
  // ==========================================
  {
    subjectName: "Fisiologia Humana",
    text: "Um paciente de 58 anos em investigação para arritmias realiza eletrofisiograma cardíaco. Durante a análise do traçado das células do nodo sinoatrial (marca-passo), o médico observa a fase de despolarização espontânea lenta (fase 4). Qual é o principal mecanismo iônico responsável pelo automatismo nessa fase?",
    options: [
      "Influxo contínuo de sódio através de canais lentos (corrente funny - If) acompanhado pela redução da condutância ao potássio",
      "Abertura em massa de canais de sódio voltagem-dependentes rápidos (canais Nav1.5)",
      "Efluxo acelerado de íons cálcio através dos canais do retículo sarcoplasmático acoplados à rianodina",
      "Bloqueio completo dos canais de cálcio do tipo L e T durante todo o período diastólico"
    ],
    correctOption: 0,
    explanation: "No tecido nodal (resposta lenta), a fase 4 de despolarização diastólica espontânea ocorre principalmente pela ativação da corrente 'funny' (If), um influxo de cátions (predominantemente Na+) ativado por hiperpolarização, somado ao declínio progressivo da corrente retificadora de K+. Canais de Na+ rápidos são característicos de miócitos atriais, ventriculares e feixe de Purkinje (resposta rápida).",
    source: "Revalida INEP",
    year: 2023
  },
  {
    subjectName: "Fisiologia Humana",
    text: "Durante a fase de contração isovolumétrica do ventrículo esquerdo no ciclo cardíaco, qual das seguintes configurações valvares e pressóricas é observada?",
    options: [
      "Válvulas atrioventriculares e semilunares fechadas, com rápido aumento da pressão intraventricular sem alteração de volume",
      "Válvula mitral aberta e válvula aórtica fechada, permitindo enchimento ventricular rápido",
      "Válvula aórtica aberta com ejeção de sangue para a raiz da aorta e diminuição abrupta do diâmetro ventricular",
      "Válvulas atrioventriculares abertas promovendo equalização imediata de pressão entre átrios e ventrículos"
    ],
    correctOption: 0,
    explanation: "Na contração isovolumétrica, a pressão no ventrículo esquerdo supera a atrial (fechando a mitral e gerando B1), mas ainda não é suficiente para superar a pressão diastólica da aorta (80 mmHg). Como ambas as válvulas estão fechadas, o ventrículo contrai sem alterar o volume sanguíneo contido nele.",
    source: "ENARE",
    year: 2022
  },
  {
    subjectName: "Fisiologia Humana",
    text: "Em um paciente com choque séptico, observa-se vasodilatação periférica generalizada mediada por citocinas inflamatórias e óxido nítrico. De acordo com os determinantes da função ventricular, qual é a principal alteração hemodinâmica primária decorrente dessa vasodilatação?",
    options: [
      "Redução acentuada da pós-carga ventricular esquerda e diminuição da resistência vascular sistêmica",
      "Aumento imediato da pré-carga ventricular por aumento do retorno venoso central",
      "Elevação da pressão arterial sistólica por hiperativação isolada do reflexo barorreceptor",
      "Prolongamento do período de relaxamento isovolumétrico com fechamento precoce da valva aórtica"
    ],
    correctOption: 0,
    explanation: "A pós-carga é a tensão que o ventrículo esquerdo precisa gerar para ejetar sangue contra a resistência do leito vascular sistêmico. No choque distributivo (séptico), a vasodilatação maciça reduz bruscamente a resistência vascular sistêmica (RVS), reduzindo a pós-carga ventricular.",
    source: "USP",
    year: 2023
  },
  {
    subjectName: "Fisiologia Humana",
    text: "No eletrocardiograma convencional, o intervalo PR representa o tempo decorrido entre o início da despolarização atrial e o início da despolarização ventricular. Qual estrutura anatômica é fisiologicamente responsável pelo retardo na condução que assegura o enchimento ventricular adequado antes da sístole?",
    options: [
      "Nodo atrioventricular (AV)",
      "Feixe de Bachmann",
      "Fibras de Purkinje",
      "Ramo esquerdo do feixe de His"
    ],
    correctOption: 0,
    explanation: "O retardo fisiológico da condução do impulso elétrico ocorre primariamente no nodo AV (cerca de 0,09 a 0,12 segundos). Esse atraso é essencial para que os átrios completem sua sístole e esvaziem seu conteúdo nos ventrículos antes que estes iniciem sua contração.",
    source: "UNICAMP",
    year: 2024
  },
  {
    subjectName: "Fisiologia Humana",
    text: "O reflexo barorreceptor desempenha papel crucial no ajuste da pressão arterial a curto prazo. Ao passar da posição deitada para a ortostática (em pé), a gravidade causa represamento venoso nos membros inferiores. Qual é a resposta fisiológica integrada mediada pelo centro vasomotor?",
    options: [
      "Diminuição dos disparos aferentes pelos seios carotídeos, resultando em elevação do tônus simpático e vasoconstrição reflexa",
      "Aumento imediato da descarga dos nervos vago e glossofaríngeo, causando bradicardia compensatória",
      "Aumento da ativação parassimpática no nodo SA para preservar o volume sistólico",
      "Inibição completa da liberação de noradrenalina nas terminações vasculares periféricas"
    ],
    correctOption: 0,
    explanation: "A queda do retorno venoso diminui temporariamente o débito cardíaco e a pressão arterial, reduzindo a distensão dos barorreceptores do seio carotídeo e arco aórtico. Isso diminui os disparos inibitórios aferentes ao bulbo, permitindo a desinibição do sistema simpático: ocorre taquicardia reflexa e vasoconstrição arteriolar/venosa.",
    source: "SUS-SP",
    year: 2022
  },

  // ==========================================
  // BLOCO 2: SISTEMA RESPIRATÓRIO
  // ==========================================
  {
    subjectName: "Fisiologia Humana",
    text: "Um paciente politraumatizado vítima de colisão automobilística apresenta dispneia súbita e assimetria na expansão torácica. O exame revela pneumotórax hipertensivo. Do ponto de vista da mecânica respiratória, qual alteração pressórica causa o colapso do parênquima pulmonar acometido?",
    options: [
      "Perda da pressão subatmosférica (negativa) intrapleural devido à entrada de ar atmosférico na cavidade pleural",
      "Aumento excessivo da pressão transpulmonar secundário ao recrutamento de musculatura acessória",
      "Inativação aguda do surfactante alveolar pelas células pneumócitos tipo I",
      "Queda abrupta da pressão alveolar abaixo de -10 mmHg durante a fase expiratória passiva"
    ],
    correctOption: 0,
    explanation: "Em condições fisiológicas, a pressão intrapleural é negativa (subatmosférica, cerca de -4 a -5 cmH2O no repouso), mantendo o pulmão expandido contra a parede torácica. No pneumotórax, a comunicação com o meio externo equaliza a pressão intrapleural com a atmosférica, abolindo a pressão transpulmonar distensora e permitindo que a retração elástica natural do pulmão cause seu colapso.",
    source: "Revalida INEP",
    year: 2022
  },
  {
    subjectName: "Fisiologia Humana",
    text: "De acordo com a fisiologia das Zonas de West da circulação pulmonar em posição ortostática, assinale a assertiva correta a respeito da Zona 1 (ápice pulmonar em condições normais ou sob ventilação com pressão positiva):",
    options: [
      "A pressão alveolar (Palv) pode superar a pressão arterial capilar (Pa) e venosa (Pv), levando ao colapso capilar e ausência de fluxo",
      "A pressão venosa capilar supera a pressão arterial, garantindo fluxo contínuo independente do ciclo respiratório",
      "O fluxo sanguíneo é máximo devido ao efeito da gravidade sobre a coluna hidrostática",
      "A relação ventilação/perfusão (V/Q) é zero, caracterizando um efeito shunt fisiológico puro"
    ],
    correctOption: 0,
    explanation: "Na Zona 1 de West (Pa > Pa ou Palv > Pa > Pv), a pressão alveolar comprime os capilares pulmonares, impedindo a perfusão (gera espaço morto alveolar). Em indivíduos sadios em respiração espontânea ela é praticamente inexistente, mas pode surgir em choque hipovolêmico ou sob ventilação mecânica com altas pressões alveolares.",
    source: "ENARE",
    year: 2024
  },
  {
    subjectName: "Fisiologia Humana",
    text: "A curva de dissociação da oxi-hemoglobina sofre modulação em resposta às necessidades metabólicas dos tecidos periféricos (Efeito Bohr). Qual dos seguintes fatores desloca a curva para a DIREITA, facilitando a liberação de oxigênio para os tecidos?",
    options: [
      "Aumento da concentração de íons H+ (queda do pH), aumento da PaCO2 e aumento da temperatura",
      "Alcalose sistêmica, hipotermia tecidual e diminuição de 2,3-DPG eritrocitário",
      "Redução acentuada da concentração de dióxido de carbono e aumento da afinidade do grupo heme pelo O2",
      "Presença de carboxi-hemoglobina em altas concentrações"
    ],
    correctOption: 0,
    explanation: "O desvio para a direita significa menor afinidade da hemoglobina pelo O2 para uma mesma PaO2, promovendo a entrega aos tecidos em estresse metabólico. Os fatores clássicos que desviam a curva para a direita são: ↑ H+ (↓ pH / acidose), ↑ PaCO2, ↑ Temperatura e ↑ 2,3-DPG (regra mnemônica CADET face right: CO2, Acidose, DPG, Exercício, Temperatura).",
    source: "USP",
    year: 2021
  },
  {
    subjectName: "Fisiologia Humana",
    text: "Durante a regulação química da respiração, os quimiorreceptores centrais localizados na superfície ventral do bulbo são primariamente estimulados por qual dos seguintes mediadores químicos no líquido cefalorraquidiano (LCR)?",
    options: [
      "Íons H+ gerados pela hidratação e dissociação do CO2 que cruza a barreira hematoencefálica",
      "Íons bicarbonato (HCO3-) transportados ativamente contra o gradiente de concentração",
      "Queda acentuada da PaO2 plasmática abaixo de 60 mmHg diretamente no parênquima cerebral",
      "Moléculas intactas de oxigênio dissolvidas no sangue dos plexos coroides"
    ],
    correctOption: 0,
    explanation: "A barreira hematoencefálica é relativamente impermeável a íons H+ e HCO3-, mas altamente permeável ao CO2 molecular. O excesso de CO2 arterial difunde-se para o LCR, onde se converte em ácido carbônico pela anidrase carbônica e se dissocia em H+ e HCO3-. São esses íons H+ gerados localmente no LCR que despolarizam diretamente os quimiorreceptores centrais.",
    source: "UNICAMP",
    year: 2023
  },
  {
    subjectName: "Fisiologia Humana",
    text: "Um paciente com crise de asma grave desenvolve broncoespasmo acentuado com fechamento de pequenas vias aéreas distais. A consequência fisiopatológica sobre a relação ventilação-perfusão (V/Q) nessas áreas hipoventiladas, porém ainda perfundidas, é classificada como:",
    options: [
      "Efeito Shunt (relação V/Q diminuída, tendendo a zero)",
      "Espaço morto fisiológico puro (relação V/Q tendendo ao infinito)",
      "Aumento da taxa de difusão por gradiente de Fick aumentado",
      "Hiperoxemia arterial secundária ao reflexo de vasoconstrição hipóxica abolido"
    ],
    correctOption: 0,
    explanation: "Quando há perfusão preservada em alvéolos sem ventilação adequada (obstrução de via aérea, consolidação por secreção ou atelectasia), a relação ventilação/perfusão cai bruscamente (V/Q baixo ou tendendo a 0). Isso constitui o efeito shunt pulmonar, levando o sangue não oxigenado de volta para as veias pulmonares e causando hipoxemia.",
    source: "SUS-SP",
    year: 2024
  },

  // --- BIOQUÍMICA MÉDICA ---
  {
    subjectName: "Bioquímica Médica",
    text: "Na cetoacidose diabética, há acúmulo de corpos cetônicos. Qual é a sequência metabólica que explica esse processo?",
    options: [
      "Excesso de insulina → inibição da lipólise → desvio para glicólise → cetose",
      "Deficiência de insulina → lipólise excessiva → aumento de acetil-CoA → síntese de corpos cetônicos no fígado",
      "Excesso de glucagon → glicogênese hepática → esgotamento de piruvato → cetose",
      "Deficiência de insulina → inibição da glicólise → acúmulo de oxaloacetato → cetogênese",
    ],
    correctOption: 1,
    explanation:
      "Na DM1 descompensada (ou DM2 grave), a deficiência de insulina impede a captação de glicose, elevando glucagon. O glucagon estimula a lipólise no tecido adiposo → ácidos graxos livres chegam ao fígado → β-oxidação → excesso de acetil-CoA (que não entra eficientemente no ciclo de Krebs por falta de oxaloacetato) → condensação em corpos cetônicos (acetoacetato, β-hidroxibutirato, acetona). Os corpos cetônicos são ácidos → acidose metabólica com ânion gap elevado.",
    source: "Revalida INEP",
    year: 2022,
  },

  // --- PATOLOGIA GERAL ---
  {
    subjectName: "Patologia Geral",
    text: "Um paciente apresenta área de necrose no miocárdio 48 horas após infarto. Na microscopia, observam-se: fibras com citoplasma eosinofílico granular, núcleos picnóticos e desaparecidos, e infiltrado neutrofílico abundante. Qual tipo de necrose está presente?",
    options: [
      "Necrose liquefativa — típica do SNC",
      "Necrose caseosa — característica da tuberculose",
      "Necrose coagulativa — mantém o contorno celular com perda dos núcleos",
      "Necrose gangrenosa — combinação de coagulativa e liquefativa",
    ],
    correctOption: 2,
    explanation:
      "A necrose coagulativa é o tipo predominante no infarto do miocárdio. As proteínas estruturais são desnaturadas, preservando o contorno ('fantasma') das células por 1-3 dias, enquanto os núcleos progridem de picnose → cariorrexe → cariólise. O infiltrado neutrofílico maciço aparece nas primeiras 24-72h. Apenas o SNC difere: ali a necrose é liquefativa por falta de proteínas estruturais suficientes para coagulação.",
    source: "FMUSP",
    year: 2023,
  },
  {
    subjectName: "Patologia Geral",
    text: "Qual dos mecanismos a seguir é o principal mediador da lesão celular irreversível durante a isquemia?",
    options: [
      "Depleção de ATP com acúmulo intracelular de Ca²⁺ e ativação de enzimas destrutivas",
      "Aumento da síntese proteica mitocondrial compensatória",
      "Ativação excessiva da via mTOR com autofagia protetora",
      "Hiperativação do ciclo de Krebs por excesso de NADH",
    ],
    correctOption: 0,
    explanation:
      "Na isquemia, a falência da bomba Na⁺/K⁺-ATPase (por depleção de ATP) causa edema celular e influxo de Ca²⁺. O Ca²⁺ intracelular elevado ativa: fosfolipases (destroem membranas), proteases (degradam citoesqueleto), endonucleases (fragmentam DNA) e ATPases. A lesão irreversível é definida pela incapacidade de recuperação, frequentemente marcada por falência da membrana mitocondrial e liberação do citocromo c → apoptose ou necrose.",
    source: "USP-RP",
    year: 2024,
  },

  // --- IMUNOLOGIA & MICROBIOLOGIA ---
  {
    subjectName: "Imunologia & Microbiologia",
    text: "Criança de 6 meses apresenta infecções bacterianas recorrentes por Streptococcus pneumoniae e Haemophilus influenzae desde os 4 meses. Níveis de IgG, IgA e IgM muito baixos; contagem de linfócitos B praticamente zero. Qual imunodeficiência primária é mais provável?",
    options: [
      "Imunodeficiência Comum Variável (ICV) — início na adolescência",
      "Síndrome de DiGeorge — ausência de timo e déficit de linfócitos T",
      "Agamaglobulinemia de Bruton (XLA) — defeito na BTK, ausência de linfócitos B",
      "Deficiência seletiva de IgA — IgA baixa isolada, demais normais",
    ],
    correctOption: 2,
    explanation:
      "A Agamaglobulinemia ligada ao X (Bruton) é causada por mutação na tirosina quinase de Bruton (BTK), bloqueando a maturação dos linfócitos pré-B. Caracteriza-se por: ausência quase total de linfócitos B e imunoglobulinas; início das infecções após 4-6 meses (quando esgota a IgG materna); susceptibilidade a bactérias encapsuladas. Afeta meninos. O tratamento é reposição de IVIG.",
    source: "ENARE",
    year: 2023,
  },

  // --- FARMACOLOGIA BÁSICA ---
  {
    subjectName: "Farmacologia Básica",
    text: "Um paciente hipertenso em uso de captopril desenvolve tosse seca e persistente. Qual o mecanismo responsável por esse efeito adverso?",
    options: [
      "Bloqueio dos receptores AT1 da angiotensina II, com redução do tônus brônquico",
      "Inibição da ECA impede a degradação da bradicinina, que se acumula e estimula fibras C brônquicas",
      "Aumento reflexo da atividade simpática causando broncoespasmo",
      "Hipopotassemia induzida pelo captopril ativando receptores de irritação brônquica",
    ],
    correctOption: 1,
    explanation:
      "Os IECAs (captopril, enalapril) inibem a enzima conversora de angiotensina, que normalmente degrada também a bradicinina. O acúmulo de bradicinina nos pulmões estimula receptores das fibras C aferentes nas vias aéreas, causando tosse seca irritativa — efeito adverso em até 20% dos pacientes, mais comum em mulheres e asiáticos. A alternativa são os BRAs (losartana), que não afetam a degradação da bradicinina.",
    source: "Revalida INEP",
    year: 2022,
  },
  {
    subjectName: "Farmacologia Básica",
    text: "Qual o mecanismo de ação dos aminoglicosídeos (gentamicina, amicacina)?",
    options: [
      "Inibição da subunidade 50S ribossomal, bloqueando a translocação do peptídio",
      "Ligação irreversível à subunidade 30S ribossomal, causando leitura errada do mRNA e inibição da síntese proteica",
      "Inibição da RNA polimerase bacteriana dependente de DNA",
      "Bloqueio da síntese do ácido fólico por inibição da di-hidropteroato sintase",
    ],
    correctOption: 1,
    explanation:
      "Os aminoglicosídeos ligam-se de forma irreversível à subunidade 30S do ribossomo bacteriano (especificamente à proteína S12 do 16S rRNA), causando: (1) leitura incorreta do código genético com incorporação de aminoácidos errados; (2) inibição da síntese proteica; (3) perturbação da membrana citoplasmática por proteínas aberrantes. São bactericidas concentração-dependentes. A nefrotoxicidade e ototoxicidade são efeitos adversos importantes.",
    source: "USP-RP",
    year: 2023,
  },

  // --- SEMIOLOGIA MÉDICA I ---
  {
    subjectName: "Semiologia Médica I",
    text: "Ao examinar o abdome de um paciente, você percute e encontra maciçez nas flancos que muda de localização quando o paciente muda de decúbito. Qual sinal semiológico você está pesquisando e o que ele indica?",
    options: [
      "Sinal de Murphy — colecistite aguda",
      "Macicez móvel de flancos (shifting dullness) — presença de ascite",
      "Sinal de Blumberg — peritonite localizada",
      "Sinal de Giordano — litíase renal",
    ],
    correctOption: 1,
    explanation:
      "A macicez móvel de flancos (shifting dullness) é pesquisada pela percussão dos flancos: maciçez presente quando o líquido se acumula na posição de decúbito. Ao mudar de posição, o líquido se redistribui e a maciçez muda de localização. Indica ascite com volume geralmente maior que 1.500 mL. O sinal da onda líquida (fluid wave/thrill) complementa o diagnóstico em ascites volumosas.",
    source: "SUS-SP",
    year: 2022,
  },

  // --- SEMIOLOGIA MÉDICA II ---
  {
    subjectName: "Semiologia Médica II",
    text: "Paciente com dispneia progressiva. Na ausculta pulmonar: murmúrio vesicular abolido e macicez à percussão no hemitórax esquerdo inferior. A traqueia está desviada para o LADO OPOSTO. Qual o diagnóstico mais provável?",
    options: [
      "Pneumotórax hipertensivo esquerdo — desvio para direita, mas com timpanismo",
      "Derrame pleural volumoso esquerdo — compressão do pulmão e desvio contralateral da traqueia",
      "Atelectasia do lobo inferior esquerdo — desvio ipsilateral da traqueia",
      "Pneumonia lobar — condensação sem desvio traqueal",
    ],
    correctOption: 1,
    explanation:
      "O derrame pleural volumoso cria efeito de massa que desloca o mediastino e a traqueia para o lado contralateral. A percussão revela maciçez (líquido) e a ausculta mostra MV abolido. Difere do pneumotórax hipertensivo (que também desvia contralateralmente, mas tem timpanismo à percussão). Na atelectasia, o desvio é ipsilateral (o pulmão colapsado traciona o mediastino). O diagnóstico é confirmado por RX de tórax.",
    source: "ENARE",
    year: 2024,
  },

  // --- FARMACOLOGIA CLÍNICA ---
  {
    subjectName: "Farmacologia Clínica",
    text: "Paciente com fibrilação atrial é anticoagulado com warfarina (INR alvo 2-3). Inicia antibioticoterapia com ciprofloxacino. Qual interação farmacológica é esperada?",
    options: [
      "Redução do efeito do warfarina — ciprofloxacino induz CYP2C9 aumentando metabolismo do warfarina",
      "Potencialização do efeito anticoagulante — ciprofloxacino inibe CYP1A2/2C9 e reduz flora intestinal produtora de vitamina K",
      "Nenhuma interação clinicamente relevante entre os dois fármacos",
      "Antagonismo farmacológico — ciprofloxacino compete pelos receptores de vitamina K",
    ],
    correctOption: 1,
    explanation:
      "O ciprofloxacino potencializa o efeito do warfarina por dois mecanismos: (1) inibição do CYP1A2 e parcialmente CYP2C9, reduzindo o metabolismo do warfarina → aumento dos níveis plasmáticos; (2) destruição da flora intestinal produtora de vitamina K₂ → menor disponibilidade de vitamina K → potencialização do efeito anticoagulante. O INR pode aumentar perigosamente → risco de hemorragia. Monitorização rigorosa do INR é obrigatória.",
    source: "Revalida INEP",
    year: 2023,
  },

  // --- DIAGNÓSTICO POR IMAGEM ---
  {
    subjectName: "Diagnóstico por Imagem",
    text: "Radiografia de tórax de PA mostra velamento homogêneo no hemitórax direito com apagamento do seio costofrênico e borramento do contorno cardíaco direito. A traqueia está centralizada. Qual o achado mais provável?",
    options: [
      "Pneumotórax direito — hiperlucência sem trama vascular",
      "Derrame pleural direito livre com sinal do menisco",
      "Pneumonia lobar direita — consolidação segmentar sem derrame",
      "Atelectasia pulmonar total direita — com desvio traqueal ipsilateral",
    ],
    correctOption: 1,
    explanation:
      "O derrame pleural livre no RX de PA em PA apresenta: velamento homogêneo com obliteração do seio costofrênico (primeiro sinal, ≥ 200-300mL), apagamento do contorno cardíaco ipsilateral e sinal do menisco (curva côncava superiormente pela capilaridade). A traqueia centralizada diferencia do derrame volumoso (que desviaria contralateralmente) e da atelectasia (que desviaria ipsilateralmente). Confirmação por US de tórax ou TC.",
    source: "FMUSP",
    year: 2024,
  },

  // --- SAÚDE COLETIVA & EPIDEMIOLOGIA ---
  {
    subjectName: "Saúde Coletiva & Epidemiologia",
    text: "Em um estudo de caso-controle sobre câncer de pulmão e tabagismo, calcula-se um Odds Ratio (OR) de 8,5. Como interpretar corretamente esse resultado?",
    options: [
      "Fumantes têm 8,5 vezes mais chances de desenvolver câncer de pulmão em comparação com não fumantes (medida de associação em estudos retrospectivos)",
      "8,5% dos casos de câncer de pulmão são atribuíveis ao tabagismo nessa população",
      "O risco absoluto de câncer de pulmão em fumantes é 8,5 por 1.000 habitantes",
      "A prevalência de tabagismo entre os casos é 8,5 vezes maior do que a incidência na população geral",
    ],
    correctOption: 0,
    explanation:
      "O Odds Ratio (OR) é a medida de associação usada em estudos caso-controle (retrospectivos), onde não é possível calcular incidências diretamente. OR = 8,5 significa que as chances (odds) de exposição ao tabaco são 8,5 vezes maiores entre os casos (câncer) do que entre os controles (sem câncer), ou equivalentemente, fumantes têm 8,5 vezes mais odds de desenvolver câncer. Quando a doença é rara, OR ≈ Risco Relativo. OR > 1 = associação positiva; OR < 1 = fator protetor.",
    source: "SUS-SP",
    year: 2023,
  },
];

async function main() {
  console.log("🌱 Iniciando seed do banco de dados...");

  // Criar usuário demo
  const passwordHash = await bcrypt.hash("senha-removida", 10);
  const demoUser = await prisma.user.upsert({
    where: { email: "demo@synapse.med" },
    update: {},
    create: {
      name: "Estudante Demo",
      email: "demo@synapse.med",
      passwordHash,
      referralCode: "SYN-DEMO",
    },
  });
  console.log(`✅ Usuário demo criado: ${demoUser.email}`);

  // Criar usuário Pro sem limites
  const proPasswordHash = await bcrypt.hash("senha-removida", 10);
  const proUser = await prisma.user.upsert({
    where: { email: "pro@exemplo.com" },
    update: { plan: "pro" },
    create: {
      name: "Estudante Pro",
      email: "pro@exemplo.com",
      passwordHash: proPasswordHash,
      plan: "pro",
      referralCode: "SYN-PRO",
    },
  });
  console.log(`✅ Usuário Pro ilimitado criado: ${proUser.email}`);

  // Criar matérias
  const subjectMap: Record<string, string> = {};
  for (const subjectData of subjects) {
    const existing = await prisma.subject.findFirst({
      where: { name: subjectData.name },
    });
    if (existing) {
      subjectMap[subjectData.name] = existing.id;
    } else {
      const subject = await prisma.subject.create({ data: subjectData });
      subjectMap[subjectData.name] = subject.id;
    }
    console.log(`📚 Matéria: ${subjectData.name}`);
  }

  // Criar questões
  const allQuestions = [...questions, ...expansionQuestions];
  for (const q of allQuestions) {
    const normalizedName = q.subjectName === "Saúde Coletiva e Epidemiologia" ? "Saúde Coletiva & Epidemiologia" : q.subjectName;
    const subjectId = subjectMap[normalizedName];
    const existing = await prisma.question.findFirst({
      where: { text: q.text },
    });
    if (!existing) {
      await prisma.question.create({
        data: {
          subjectId,
          text: q.text,
          options: JSON.stringify(q.options),
          correctOption: q.correctOption,
          explanation: q.explanation,
          source: q.source,
          year: q.year,
          imageUrl: q.imageUrl ?? null,
        },
      });
    }
    console.log(`❓ Questão: ${q.text.substring(0, 60)}...`);
  }

  console.log("✅ Seed concluído com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
