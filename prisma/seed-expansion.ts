import { PrismaClient } from "@prisma/client";
import { new15ImageQuestions } from "./new-image-questions";
import { farmacoEpidemiologiaQuestions } from "./questions-batch-farmaco-epidemiologia";
import { patologiaFarmacoBasicaQuestions } from "./questions-batch-patologia-farmacobasica";
import { anatomiaHumanaQuestions } from "./questions-batch-anatomia";

const prisma = new PrismaClient();

interface QuestionSeed {
  subjectName: string;
  text: string;
  options: string[];
  correctOption: number;
  explanation: string;
  source: string;
  year: number;
  imageUrl?: string;
}

export const expansionQuestions: QuestionSeed[] = [
  // ==========================================
  // PERÍODO 1: ANATOMIA HUMANA (8 questões)
  // ==========================================
  {
    subjectName: "Anatomia Humana",
    text: "Durante um procedimento cirúrgico cardíaco de ablação por cateter, o eletrofisiologista busca o nó atrioventricular (AV). Qual referência anatômica no átrio direito delimita com precisão a localização do nó AV?",
    options: [
      "Triângulo de Koch (delimitado pelo tendão de Todaro, óstio do seio coronário e cúspide septal da valva tricúspide)",
      "Fossa oval e limbo da fossa oval",
      "Crista terminal e auréola do apêndice atrial direito",
      "Triângulo de Calot no assoalho pericárdico"
    ],
    correctOption: 0,
    explanation: "O nó AV está situado no ápice do Triângulo de Koch, delimitado pelo tendão de Todaro superiormente, a cúspide septal da valva tricúspide anteriormente e o óstio do seio coronário inferiormente. É o ponto de referência cirúrgica fundamental para evitar bloqueio atrioventricular iatrogênico.",
    source: "USP",
    year: 2023
  },
  {
    subjectName: "Anatomia Humana",
    text: "Um recém-nascido sofre distócia de ombro durante o parto normal. Ao exame físico, apresenta membro superior direito estendido, aduzido e em rotação interna, com o antebraço pronado ('posição de gorjeta de garçom'). Qual segmento do plexo braquial foi lesionado?",
    options: [
      "Fascículo posterior (nervos radial e axilar isolados)",
      "Tronco inferior (raízes C8 e T1 - Paralisia de Klumpke)",
      "Tronco superior (raízes C5 e C6 - Paralisia de Erb-Duchenne)",
      "Nervo torácico longo com escápula alada associada"
    ],
    correctOption: 2,
    explanation: "A paralisia de Erb-Duchenne é decorrente da tração excessiva do tronco superior do plexo braquial (C5-C6). Envolve perda funcional dos músculos deltoide, supraespinhal, infraespinhal, bíceps braquial e braquiorradial, resultando no membro em adução, rotação medial e pronação.",
    source: "UNICAMP",
    year: 2024
  },
  {
    subjectName: "Anatomia Humana",
    text: "Durante laparotomia de urgência por trauma hepático com sangramento volumoso, o cirurgião realiza a Manobra de Pringle (clampeamento do ligamento hepatoduodenal). Quais estruturas vasculares e biliares são comprimidas nessa manobra?",
    options: [
      "Veia cava inferior e artéria hepática comum",
      "Artéria hepática própria, veia porta e ducto colédoco",
      "Veias hepáticas direita, média e esquerda",
      "Tronco celíaco e ducto cístico"
    ],
    correctOption: 1,
    explanation: "O ligamento hepatoduodenal forma a margem anterior do forame omental (de Winslow) e contém a tríade portal: ducto colédoco (à direita), artéria hepática própria (à esquerda) e veia porta (posterior). O clampeamento desse ligamento (Manobra de Pringle) interrompe o influxo vascular hepático.",
    source: "ENARE",
    year: 2023
  },
  {
    subjectName: "Anatomia Humana",
    text: "Um jovem de 22 anos é atingido por taco de beisebol na região temporal (pterion). Apresenta perda transitória da consciência, seguida por intervalo lúcido de 3 horas e posterior rebaixamento neurológico com midríase ipsilateral. A TC revela hematoma epidural. Qual vaso arterial foi lacerado?",
    options: [
      "Artéria cerebral média em seu ramo M2",
      "Artéria temporal superficial",
      "Artéria meníngea média (ramo da artéria maxilar)",
      "Artéria carótida interna em segmento cavernoso"
    ],
    correctOption: 2,
    explanation: "O pterion é a junção dos ossos frontal, parietal, esfenoide e temporal. Imediatamente abaixo dele transita o ramo anterior da artéria meníngea média (ramo da artéria maxilar, que entra pelo forame espinhoso). Fraturas no pterion classicamente laceram a artéria meníngea média, causando hematoma epidural agudo.",
    source: "Revalida INEP",
    year: 2022
  },
  {
    subjectName: "Anatomia Humana",
    text: "Um trabalhador da construção civil queixa-se de dor no ombro direito ao elevar o braço acima da cabeça. No exame ortopédico, o Teste de Jobe (abdução contra resistência no plano da escápula com polegares apontados para o chão) é francamente positivo. Qual tendão muscular do manguito rotador está acometido?",
    options: [
      "Tendão do músculo subescapular",
      "Tendão do músculo supraespinhal",
      "Tendão do músculo redondo menor",
      "Tendão do músculo peitoral menor"
    ],
    correctOption: 1,
    explanation: "O músculo supraespinhal é responsável pela abdução inicial do braço (0 a 15 graus) e é testado especificamente pela Manobra de Jobe (Empty Can Test). É o tendão do manguito rotador mais frequentemente lesado por impacto subacromial.",
    source: "SUS-SP",
    year: 2023
  },
  {
    subjectName: "Anatomia Humana",
    text: "Em um paciente com úlcera péptica perfurada na parede posterior da primeira porção do duodeno, qual artéria de grande calibre que cursa imediatamente posterior a essa estrutura corre risco iminente de erosão e hemorragia digestiva maciça?",
    options: [
      "Artéria gastroduodenal",
      "Artéria esplênica",
      "Artéria mesentérica superior",
      "Artéria gástrica esquerda"
    ],
    correctOption: 0,
    explanation: "A artéria gastroduodenal (ramo da artéria hepática comum) desce imediatamente posterior à primeira porção (bulbo) do duodeno. Úlceras pépticas duodenais posteriores que penetram profundamente classicamente erodem a artéria gastroduodenal, causando choque hemorrágico grave.",
    source: "UFRJ",
    year: 2024
  },
  {
    subjectName: "Anatomia Humana",
    text: "Um paciente com cirrose hepática descompensada desenvolve hemorroidas volumosas e sangrantes. Do ponto de vista anatômico, essa manifestação decorre de anastomose portossistêmica entre quais plexos venosos?",
    options: [
      "Veia renal esquerda e veia testicular",
      "Veia retal superior (sistema porta) e veias retais média e inferior (sistema cava/ilíaca)",
      "Veia epigástrica superficial e veia safena magna",
      "Veia cólica esquerda e veias lombares ascendentes"
    ],
    correctOption: 1,
    explanation: "A circulação portossistêmica anorretal é formada pela comunicação entre a veia retal superior (tributária da veia mesentérica inferior e veia porta) e as veias retais médias e inferiores (tributárias das veias ilíacas internas/pudendas, sistema cava inferior). A hipertensão portal dilata essa rede anastomótica.",
    source: "AMRIGS",
    year: 2022
  },
  {
    subjectName: "Anatomia Humana",
    text: "Na fossa poplítea, da superfície para a profundidade (do plano mais superficial e posterior para o plano mais profundo e anterior, junto ao fêmur), qual é a correta disposição espacial das estruturas do feixe neurovascular?",
    options: [
      "Artéria poplítea, veia poplítea e nervo tibial",
      "Nervo tibial, veia poplítea e artéria poplítea",
      "Veia poplítea, nervo tibial e artéria poplítea",
      "Nervo fibular comum, artéria poplítea e veia poplítea"
    ],
    correctOption: 1,
    explanation: "Na fossa poplítea, as estruturas vasculonervosas organizam-se de posterior (mais superficial) para anterior (mais profunda/em contato com o osso) na sequência: Nervo tibial → Veia poplítea → Artéria poplítea. A artéria poplítea é a mais profunda, o que explica sua vulnerabilidade em luxações posteriores de joelho.",
    source: "USP",
    year: 2024
  },

  // ==========================================
  // PERÍODO 1: HISTOLOGIA & EMBRIOLOGIA (7 questões)
  // ==========================================
  {
    subjectName: "Histologia & Embriologia",
    text: "A barreira hematoencefálica (BHE) é uma estrutura seletiva que isola o parênquima do sistema nervoso central de substâncias circulantes no sangue. Qual é a principal especialização juncional das células endoteliais dos capilares cerebrais responsável pela vedação do espaço paracelular?",
    options: [
      "Junções comunicantes (gap junctions ou conexinas)",
      "Junções de oclusão (zonula occludens / tight junctions formadas por claudinas e ocludinas)",
      "Desmossomos (máculas de adesão mediadas por desmogleínas)",
      "Hemidesmossomos associados a integrinas basais"
    ],
    correctOption: 1,
    explanation: "A vedação paracelular ultra-seletiva da BHE é conferida primariamente pelas junções de oclusão contínuas (zonula occludens) entre as células endoteliais, reforçadas pelos pés terminais dos astrócitos (pés vasculares) e pericitos.",
    source: "ENARE",
    year: 2023
  },
  {
    subjectName: "Histologia & Embriologia",
    text: "No testículo humano, as células de Sertoli desempenham funções essenciais para a espermatogênese. Dentre as funções listadas abaixo, assinale a que NÃO é exercida pelas células de Sertoli:",
    options: [
      "Formação da barreira hematotesticular por meio de junções de oclusão",
      "Secreção de proteína ligadora de andrógenos (ABP) sob estímulo do FSH",
      "Fagocitose dos corpos residuais eliminados durante a espermiogênese",
      "Síntese e secreção primária de testosterona em resposta ao hormônio luteinizante (LH)"
    ],
    correctOption: 3,
    explanation: "A síntese e secreção de testosterona em resposta ao LH é função das células intersticiais de Leydig, localizadas no estroma entre os túbulos seminíferos. As células de Sertoli formam a barreira hematotesticular, sustentam espermatogônias e secretam ABP e inibina sob estímulo do FSH.",
    source: "UNICAMP",
    year: 2022
  },
  {
    subjectName: "Histologia & Embriologia",
    text: "O aparelho justaglomerular renal é composto pela mácula densa, células justaglomerulares (mioepiteliais) e células mesangiais extraglomerulares. Qual alteração na composição do fluido tubular estimula a mácula densa a promover a liberação de renina?",
    options: [
      "Redução da concentração de cloreto de sódio (NaCl) no fluido tubular distal",
      "Aumento acentuado da osmolaridade do filtrado glomerular",
      "Elevação da pressão hidrostática no interior da cápsula de Bowman",
      "Excesso de bicarbonato filtrado nas alças de Henle descendentes"
    ],
    correctOption: 0,
    explanation: "As células da mácula densa (no túbulo contorcido distal) atuam como quimiorreceptores que monitoram a carga de NaCl no fluido tubular. A diminuição da concentração de NaCl (decorrente de queda na taxa de filtração glomerular ou hipotensão) estimula a liberação de renina pelas células justaglomerulares da arteríola aferente.",
    source: "Revalida INEP",
    year: 2024
  },
  {
    subjectName: "Histologia & Embriologia",
    text: "No desenvolvimento embrionário do sistema vascular, os arcos aórticos passam por remodelamento complexo. Qual estrutura anatômica definitiva do adulto é derivada especificamente do 4º arco aórtico esquerdo?",
    options: [
      "Tronco pulmonar e ducto arterioso",
      "Segmento proximal da artéria subclávia direita",
      "Arco da aorta (segmento entre a carótida comum esquerda e a subclávia esquerda)",
      "Artérias carótidas comuns e internas bilaterais"
    ],
    correctOption: 2,
    explanation: "O 4º arco aórtico esquerdo persiste como parte do arco definitivo da aorta no adulto. O 4º arco aórtico direito forma o segmento proximal da artéria subclávia direita. O 3º arco forma as artérias carótidas e o 6º arco dá origem às artérias pulmonares e ducto arterioso.",
    source: "USP",
    year: 2023
  },
  {
    subjectName: "Histologia & Embriologia",
    text: "Um recém-nascido pré-termo apresenta desconforto respiratório grave logo após o parto e abdome escavado. A radiografia revela alças intestinais no hemitórax esquerdo com desvio de mediastino (hérnia diafragmática congênita de Bochdalek). Esse defeito resulta da falha de fusão de qual componente embriológico do diafragma?",
    options: [
      "Septo transverso com os mesentérios esofágicos",
      "Membrana pleuroperitoneal com o septo transverso e mesentério dorsal do esôfago",
      "Músculo intercostal primário com o pericárdio parietal",
      "Brotamentos pleuropericárdicos esquerdos isolados"
    ],
    correctOption: 1,
    explanation: "O diafragma origina-se de 4 componentes: septo transverso, membranas pleuroperitoneais, mesentério dorsal do esôfago e ingrowth muscular da parede corporal. A falha no fechamento da membrana pleuroperitoneal (mais comum à esquerda) resulta na hérnia de Bochdalek posterolateral.",
    source: "SUS-SP",
    year: 2022
  },
  {
    subjectName: "Histologia & Embriologia",
    text: "Na análise histológica da tireoide, diferenciam-se as células foliculares das células parafoliculares (células C). Qual é a origem embriológica e o produto de secreção hormonal característico das células parafoliculares?",
    options: [
      "Endoderme do assoalho faríngeo; síntese de tiroxina (T4)",
      "Crista neural (corpo ultimobranquial / 4ª bolsa faríngea); síntese de calcitonina",
      "Mesênquima esplâncnico; secreção de paratormônio (PTH)",
      "Ectoderme do primeiro arco branquial; secreção de tireoglobulina"
    ],
    correctOption: 1,
    explanation: "As células parafoliculares (células C) da tireoide derivam da crista neural via corpos ultimobranquiais (associados à 4ª/5ª bolsas faríngeas). Elas se localizam no tecido conjuntivo interfolicular e secretam calcitonina, hormônio hipocalcemiante que inibe a reabsorção osteoclástica.",
    source: "UNICAMP",
    year: 2023
  },
  {
    subjectName: "Histologia & Embriologia",
    text: "Em biópsia de tecido cartilaginoso obtida de anel fibroso de disco intervertebral e da sínfise púbica, observa-se matriz rica em feixes espessos de colágeno tipo I e condrócitos em fileiras. Esse tecido é classificado como:",
    options: [
      "Cartilagem elástica",
      "Cartilagem hialina",
      "Fibrocartilagem (cartilagem fibrosa)",
      "Tecido conjuntivo denso não modelado"
    ],
    correctOption: 2,
    explanation: "A fibrocartilagem é caracterizada por abundante colágeno tipo I (além de colágeno tipo II), condrócitos alinhados em fileiras paralelas e ausência de pericôndrio. É adaptada para suportar forças de compressão e tração (discos intervertebrais, sínfise púbica e meniscos).",
    source: "Revalida INEP",
    year: 2023
  },

  // ==========================================
  // PERÍODO 2: BIOQUÍMICA MÉDICA (7 questões)
  // ==========================================
  {
    subjectName: "Bioquímica Médica",
    text: "Um recém-nascido do sexo masculino, aparentemente saudável ao nascer, passa a apresentar letargia, vômitos e convulsões 48 horas após o início da amamentação. Exames laboratoriais revelam hiperamonemia grave (amônia > 800 umol/L) e acidúria orótica acentuada. Qual é o diagnóstico enzimático mais provável?",
    options: [
      "Deficiência de carbamoil-fosfato sintetase I (CPS I)",
      "Deficiência de ornitina transcarbamilase (OTC)",
      "Deficiência de fenilalanina hidroxilase (Fenilcetonúria)",
      "Deficiência de frutosamina-6-quinase"
    ],
    correctOption: 1,
    explanation: "A deficiência de ornitina transcarbamilase (OTC) é o distúrbio do ciclo da ureia mais comum (herança ligada ao X). O acúmulo de carbamoil-fosfato na mitocôndria extravasa para o citoplasma e entra na via de síntese de pirimidinas, levando a aumento massivo de ácido orótico na urina, acompanhado de hiperamonemia grave sem acidose metabólica primária.",
    source: "USP",
    year: 2023
  },
  {
    subjectName: "Bioquímica Médica",
    text: "Durante o jejum prolongado de 24 a 48 horas, o fígado mantém a glicemia por meio da gliconeogênese. Qual molécula reguladora alostérica atua como potente inibidora da frutose-1,6-bisfosfatase-1 e ativadora da fosfofrutoquinase-1 (PFK-1), cujos níveis devem cair no jejum para que a gliconeogênese ocorra eficientemente?",
    options: [
      "Frutose-2,6-bisfosfato (F-2,6-BP)",
      "Acetil-CoA mitocondrial",
      "Citrato citoplasmático",
      "Glicose-6-fosfato isomerase"
    ],
    correctOption: 0,
    explanation: "A Frutose-2,6-bisfosfato é o principal regulador recíproco da glicólise e gliconeogênese. No jejum, o glucagon elevado ativa a proteína quinase A (PKA), que fosforila a enzima bifuncional PFK-2/FBPase-2, diminuindo os níveis de F-2,6-BP. Essa redução desinibe a gliconeogênese e desacelera a glicólise hepática.",
    source: "UNICAMP",
    year: 2024
  },
  {
    subjectName: "Bioquímica Médica",
    text: "Um homem de 28 anos de ascendência mediterrânea apresenta urina escura e icterícia após receber tratamento com sulfametoxazol-trimetoprima para infecção urinária. O esfregaço de sangue periférico mostra corpúsculos de Heinz e 'bite cells'. A via metabólica deficitária responsável por essa hemólise oxidativa é:",
    options: [
      "Glicólise anaeróbica por deficiência de piruvato quinase",
      "Via das pentoses fosfato por deficiência de glicose-6-fosfato desidrogenase (G6PD)",
      "Via da glicogênese hepática por deficiência de glicogênio sintase",
      "Ciclo de Krebs por inibição da succinato desidrogenase"
    ],
    correctOption: 1,
    explanation: "A deficiência de G6PD compromete a via das pentoses fosfato, única fonte de NADPH nos eritrócitos. Sem NADPH, o glutationa redutase não consegue regenerar glutationa reduzida (GSH), deixando as hemácias indefesas contra estresse oxidativo por drogas (sulfas, primaquina, dapsona) e causando precipitação de hemoglobina (corpúsculos de Heinz) e hemólise intravascular/extravascular.",
    source: "ENARE",
    year: 2022
  },
  {
    subjectName: "Bioquímica Médica",
    text: "No metabolismo das lipoproteínas plasmáticas, qual apolipoproteína atua como cofator obrigatório para a ativação da enzima lipoproteína lipase (LPL) no endotélio capilar dos tecidos adiposo e muscular?",
    options: [
      "Apolipoproteína B-100",
      "Apolipoproteína C-II (ApoC-II)",
      "Apolipoproteína A-I (ApoA-I)",
      "Apolipoproteína E (ApoE)"
    ],
    correctOption: 1,
    explanation: "A ApoC-II, transferida do HDL para quilomícrons e VLDL, é o cofator ativador obrigatório da lipoproteína lipase (LPL). A deficiência congênita de ApoC-II ou de LPL resulta em hiperquilomicronemia familiar (hipertrigliceridemia grave com risco de pancreatite aguda).",
    source: "SUS-SP",
    year: 2023
  },
  {
    subjectName: "Bioquímica Médica",
    text: "Um paciente de 49 anos com artrite gotosa aguda de primeira articulação metatarsofalângica inicia terapia hipouricemiante com alopurinol após resolução do quadro agudo. O mecanismo bioquímico de ação do alopurinol consiste na:",
    options: [
      "Inibição suicida da enzima xantina oxidase, reduzindo a conversão de hipoxantina e xantina em ácido úrico",
      "Inibição da fosforribosilpirofosfato (PRPP) sintetase na via de novo das purinas",
      "Estimulação da excreção renal de urato via bloqueio do transportador URAT-1",
      "Degradação enzimática direta de cristais de urato monossódico nos tecidos periarticulares"
    ],
    correctOption: 0,
    explanation: "O alopurinol é um análogo da hipoxantina metabolizado pela xantina oxidase a oxipurinol (aloxantina), que atua como inibidor não competitivo da própria enzima. Isso bloqueia a oxidação de hipoxantina em xantina e de xantina em ácido úrico, reduzindo a hiperuricemia.",
    source: "Revalida INEP",
    year: 2023
  },
  {
    subjectName: "Bioquímica Médica",
    text: "Um lactente de 4 meses apresenta hepatomegalia maciça, hipoglicemia de jejum grave refratária ao glucagon, hiperlactatemia, hiperuricemia e dislipidemia. O diagnóstico genético confirma Doença de von Gierke (Glicogenose tipo I). Qual enzima está deficiente?",
    options: [
      "Glicose-6-fosfatase",
      "Glicogênio fosforilase hepática (Doença de Hers)",
      "Alfa-1,4-glicosidase ácida ou maltase ácida (Doença de Pompe)",
      "Enzima desramificadora (Doença de Cori)"
    ],
    correctOption: 0,
    explanation: "A Doença de von Gierke (tipo Ia) decorre da deficiência de glicose-6-fosfatase, enzima que catalisa a desfosforilação final da glicose-6-fosfato em glicose livre tanto na glicogenólise quanto na gliconeogênese hepática. O acúmulo de G6P desvia o fluxo para glicólise (lactato), síntese de lipídios e via das pentoses/purinas (ácido úrico).",
    source: "USP",
    year: 2022
  },
  {
    subjectName: "Bioquímica Médica",
    text: "O tecido adiposo marrom de recém-nascidos realiza termogênese sem tremores em resposta ao frio. Esse processo é mediado pela proteína desacopladora 1 (UCP-1 ou termogenina). Qual é o mecanismo de ação da termogenina na mitocôndria?",
    options: [
      "Permite o retorno de prótons (H+) da matriz mitocondrial para o espaço intermembrana sem passar pela ATP sintase, dissipando energia na forma de calor",
      "Bloqueia o transporte de elétrons no Complexo IV por inibição do citocromo c oxidase",
      "Atua como carreador direto de ATP para o citoplasma, acelerando reações endotérmicas",
      "Inibe a beta-oxidação mitocondrial e estimula o ciclo dos ácidos tricarboxílicos exclusivamente"
    ],
    correctOption: 0,
    explanation: "A UCP-1 cria um canal na membrana mitocondrial interna que dissipa o gradiente eletroquímico de prótons gerado pela cadeia respiratória sem acoplamento à ATP sintase (Complexo V). A energia livre do fluxo de elétrons é liberada diretamente como calor para manutenção da temperatura corpórea neonatal.",
    source: "UFRJ",
    year: 2024
  },

  // ==========================================
  // PERÍODO 3: PATOLOGIA GERAL (8 questões)
  // ==========================================
  {
    subjectName: "Patologia Geral",
    text: "A necrose liquefativa é um padrão de morte tecidual caracterizado pela digestão enzimática rápida das células mortas, transformando o tecido em uma massa viscosa e líquida. Esse tipo de necrose é classicamente observado em qual dos seguintes cenários clínicos?",
    options: [
      "Infarto isquêmico do miocárdio após oclusão da artéria coronária descendente anterior",
      "Infarto isquêmico do parênquima cerebral (acidente vascular encefálico isquêmico)",
      "Pancreatite aguda necro-hemorrágica com esteatonecrose peripancreática",
      "Necrose caseosa hilar em paciente com tuberculose pulmonar primária"
    ],
    correctOption: 1,
    explanation: "Diferente de quase todos os outros órgãos sólidos (onde a isquemia gera necrose de coagulação), a isquemia no encéfalo resulta em necrose liquefativa devido ao alto conteúdo lipídico e à riqueza em enzimas hidrolíticas liberadas pela micróglia e astrócitos, resultando em cavitação líquida.",
    source: "USP",
    year: 2023
  },
  {
    subjectName: "Patologia Geral",
    text: "O granuloma imune na tuberculose pulmonar é uma resposta inflamatória crônica com tentativa de conter o bacilo de Koch. Qual tipo celular é resultante da fusão de múltiplos macrófagos ativados (células epitelioides), caracterizado por núcleos dispostos em ferradura na periferia do citoplasma?",
    options: [
      "Célula gigante de Langhans",
      "Célula gigante de corpo estranho",
      "Célula de Reed-Sternberg",
      "Célula espumosa (xantomatosa)"
    ],
    correctOption: 0,
    explanation: "As células gigantes multinucleadas de Langhans são características do granuloma imune tuberculoso e de outras doenças granulomatosas. São formadas pela fusão de macrófagos sob estímulo de interferon-gama (IFN-g) e TNF-alfa, apresentando núcleos enfileirados em ferradura na periferia.",
    source: "ENARE",
    year: 2023
  },
  {
    subjectName: "Patologia Geral",
    text: "Em biópsia de gordura abdominal de paciente com insuficiência cardíaca e síndrome nefrótica, suspeita-se de amiloidose sistêmica. Qual coloração histoquímica específica e propriedade óptica à microscopia sob luz polarizada confirmam a presença de fibrilas amiloides?",
    options: [
      "Coloração de Gram com birrefringência azul marinho",
      "Coloração de Vermelho Congo com birrefringência verde-maçã característica sob luz polarizada",
      "Coloração de Prata de Grocott com fluorescência amarela",
      "Coloração de PAS (Ácido Periódico de Schiff) com metacromasia vermelha"
    ],
    correctOption: 1,
    explanation: "O diagnóstico patológico de amiloidose baseia-se na coloração pelo Vermelho Congo. Sob luz polarizada, a conformação em folha beta pregueada das fibrilas amiloides gera a clássica birrefringência verde-maçã (apple-green birefringence).",
    source: "UNICAMP",
    year: 2024
  },
  {
    subjectName: "Patologia Geral",
    text: "No processo de reparo tecidual e cicatrização por segunda intenção, qual tipo de colágeno é sintetizado inicialmente no tecido de granulação e posteriormente substituído por colágeno tipo I, conferindo resistência tênsil final à cicatriz?",
    options: [
      "Colágeno tipo IV",
      "Colágeno tipo III",
      "Colágeno tipo II",
      "Colágeno tipo VII"
    ],
    correctOption: 1,
    explanation: "Na fase proliferativa da cicatrização, os fibroblastos depositam predominantemente colágeno tipo III (imaturo, flexível, com ligações cruzadas frouxas). Durante a fase de remodelamento, metaloproteinases degradam o colágeno tipo III e o substituem por colágeno tipo I (maduro e resistente).",
    source: "Revalida INEP",
    year: 2022
  },
  {
    subjectName: "Patologia Geral",
    text: "Na via mitocondrial (intrínseca) da apoptose celular, a perda da integridade da membrana mitocondrial externa permite a liberação de qual proteína pró-apoptótica para o citosol, onde se liga ao APAF-1 formando o apoptossomo?",
    options: [
      "Citocromo c",
      "Bcl-2",
      "Fas-ligante (FasL)",
      "Proteína p53 ativa"
    ],
    correctOption: 0,
    explanation: "Estressores celulares (dano ao DNA, estresse de RE, falta de fatores de crescimento) ativam proteínas pró-apoptóticas Bax e Bak, que formam poros na mitocôndria. O citocromo c extravasa para o citoplasma, une-se a APAF-1 e procaspase-9 para formar o apoptossomo, desencadeando a cascata das caspases efetoras (3 e 6).",
    source: "SUS-SP",
    year: 2023
  },
  {
    subjectName: "Patologia Geral",
    text: "Um paciente de 75 anos sem distúrbios do metabolismo do cálcio (cálcio sérico normal) apresenta sopro sistólico e calcificação nodular acentuada na valva aórtica tricúspide. Esse processo de calcificação em tecido lesado com calcemia normal é denominado:",
    options: [
      "Calcificação metastática",
      "Calcificação distrófica",
      "Calcinose cutânea tumoral",
      "Ossificação metaplásica heterotópica"
    ],
    correctOption: 1,
    explanation: "A calcificação distrófica ocorre em tecidos necrosados, lesados ou envelhecidos na presença de níveis séricos normais de cálcio e fosfato (ex.: aterosclerose, estenose aórtica senil, caseum de TB). A calcificação metastática decorre de hipercalcemia e atinge tecidos normais (pulmões, rins e mucosa gástrica).",
    source: "USP",
    year: 2024
  },
  {
    subjectName: "Patologia Geral",
    text: "Na transição de uma lesão celular reversível para a lesão celular irreversível (morte celular por necrose), qual das seguintes alterações ultraestruturais e bioquímicas marca de forma definitiva o ponto de não retorno?",
    options: [
      "Tumefação celular hidrópica e dilatação do retículo endoplasmático",
      "Desagregação transitória dos polirribossomos citoplasmáticos",
      "Dano grave e irreversível à membrana celular associado a influxo maciço de cálcio e densidades floculentas mitocondriais",
      "Acúmulo citoplasmático de gotículas lipídicas (esteatose reversível)"
    ],
    correctOption: 2,
    explanation: "Os dois marcos definitivos de irreversibilidade celular são: incapacidade de reverter a disfunção mitocondrial (falta persistente de fosforilação oxidativa e ATP) e desenvolvimento de profundas alterações de permeabilidade da membrana celular, permitindo influxo letal de cálcio e perda de enzimas para o interstício.",
    source: "ENARE",
    year: 2022
  },
  {
    subjectName: "Patologia Geral",
    text: "A Tríade de Virchow postula os três fatores etiológicos primários que predispõem à trombose intravascular. Quais são esses três componentes?",
    options: [
      "Vasoconstrição, hipoxemia e ativação do complemento",
      "Lesão endotelial, estase ou turbulência no fluxo sanguíneo e hipercoagulabilidade",
      "Plaquetopenia, fibrólise acelerada e hipofibrinogenemia",
      "Ateromatose, hipercolesterolemia e aumento de hematócrito isolados"
    ],
    correctOption: 1,
    explanation: "A Tríade de Virchow consiste em: 1) Lesão endotelial (fator mais importante na trombose arterial/cardíaca); 2) Alterações no fluxo sanguíneo (estase ou turbulência); e 3) Hipercoagulabilidade sanguínea (estados trombofílicos herdados ou adquiridos).",
    source: "UNICAMP",
    year: 2023
  },

  // ==========================================
  // PERÍODO 3: IMUNOLOGIA & MICROBIOLOGIA (9 questões)
  // ==========================================
  {
    subjectName: "Imunologia & Microbiologia",
    text: "Durante a ativação e diferenciação dos linfócitos B foliculares, a troca de classe de imunoglobulina (switch de isotipo de IgM para IgG, IgA ou IgE) exige a interação molecular direta entre qual par de moléculas da superfície celular?",
    options: [
      "CD40 na célula B e CD40 Ligante (CD40L ou CD154) na célula T auxiliar (helper)",
      "CD80/86 na célula B e CD28 na célula T citotóxica",
      "MHC classe I na célula B e receptor TCR alfa-beta na célula NK",
      "Receptor de citocina IL-2 e ligante FAS (CD95L)"
    ],
    correctOption: 0,
    explanation: "O switch de isotipo depende da interação entre o CD40 expresso no linfócito B e o CD40L expresso pelo linfócito T helper (Th2/Tfh), associado a citocinas (como IL-4 para IgE, IFN-g para IgG e TGF-b para IgA). Mutações em CD40L causam a Síndrome de Hiper-IgM ligada ao X.",
    source: "USP",
    year: 2023
  },
  {
    subjectName: "Imunologia & Microbiologia",
    text: "Um paciente adulto jovem apresenta erupção cutânea difusa, broncoespasmo severo e colapso circulatório minutos após ser picado por vespa. A fisiopatologia da reação anafilática (Hipersensibilidade Tipo I de Gell e Coombs) é desencadeada por:",
    options: [
      "Deposição de imunocomplexos circulantes no endotélio vascular com ativação do complemento",
      "Ligação cruzada do antígeno a moléculas de IgE pré-fixadas aos receptores FceRI em mastócitos e basófilos",
      "Citotoxicidade mediada por linfócitos T CD8+ antígeno-específicos e macrófagos ativados",
      "Ataque direto de anticorpos IgG e IgM contra antígenos de superfície de hemácias"
    ],
    correctOption: 1,
    explanation: "A anafilaxia é uma reação de hipersensibilidade imediata (Tipo I) mediada por IgE. Em indivíduos previamente sensibilizados, o antígeno se liga a duas moléculas vizinhas de IgE ligadas aos receptores FceRI nos mastócitos, deflagrando degranulação imediata com liberação de histamina, triptase, leucotrienos e prostaglandinas.",
    source: "ENARE",
    year: 2024
  },
  {
    subjectName: "Imunologia & Microbiologia",
    text: "A glomerulonefrite pós-estreptocócica (GNPE) e a doença do soro são exemplos clássicos de qual tipo de reação de hipersensibilidade imunológica?",
    options: [
      "Hipersensibilidade Tipo I (Imediata)",
      "Hipersensibilidade Tipo II (Citotóxica mediada por anticorpos)",
      "Hipersensibilidade Tipo III (Mediada por deposição tecidual de imunocomplexos antígeno-anticorpo)",
      "Hipersensibilidade Tipo IV (Tardia ou celular mediada por células T)"
    ],
    correctOption: 2,
    explanation: "A Hipersensibilidade Tipo III é mediada pela circulação e deposição tecidual de imunocomplexos antígeno-anticorpo de tamanho intermediário. Os complexos depositam-se nas paredes vasculares e capilares glomerulares, fixando complemento (C3a e C5a) e atraindo neutrófilos, como na GNPE e no lúpus eritematoso sistêmico.",
    source: "Revalida INEP",
    year: 2023
  },
  {
    subjectName: "Imunologia & Microbiologia",
    text: "Um paciente de 25 anos com infecções bacterianas sinusais e pulmonares recorrentes por bactérias encapsuladas (S. pneumoniae, H. influenzae) apresenta redução marcante dos níveis séricos de IgG, IgA e IgM, com número normal de linfócitos B periféricos na citometria de fluxo. Qual é o diagnóstico imunológico provável?",
    options: [
      "Agamaglobulinemia ligada ao X (Doença de Bruton com ausência de linfócitos B)",
      "Imunodeficiência Comum Variável (IDCV)",
      "Deficiência seletiva de IgA",
      "Síndrome de DiGeorge com aplasia tímica"
    ],
    correctOption: 1,
    explanation: "A Imunodeficiência Comum Variável (IDCV) é a imunodeficiência primária grave mais frequente em adultos e jovens. Caracteriza-se por hipogamaglobulinemia profunda de pelo menos dois isotipos (IgG + IgA/IgM), contagem de linfócitos B normal ou discretamente reduzida e incapacidade dos linfócitos B de se diferenciarem em plasmócitos secretores.",
    source: "UNICAMP",
    year: 2023
  },
  {
    subjectName: "Imunologia & Microbiologia",
    text: "No laboratório de microbiologia, cocos Gram-positivos são isolados de hemocultura. Qual teste bioquímico rápido diferencia imediatamente os gêneros Staphylococcus (positivo) de Streptococcus/Enterococcus (negativo)?",
    options: [
      "Teste da coagulase",
      "Teste da catalase (decomposição de peróxido de hidrogênio em água e oxigênio)",
      "Teste de sensibilidade à optoquina",
      "Teste de bile-esculina"
    ],
    correctOption: 1,
    explanation: "O teste da catalase é o primeiro divisor bioquímico para cocos Gram-positivos: Staphylococcus spp. são catalase-positivos (produzem bolhas com H2O2), enquanto Streptococcus e Enterococcus spp. são catalase-negativos. Posteriormente, o teste da coagulase diferencia S. aureus (coagulase-positivo) dos estafilococos coagulase-negativos.",
    source: "SUS-SP",
    year: 2022
  },
  {
    subjectName: "Imunologia & Microbiologia",
    text: "Enterobactérias produtoras de Beta-Lactamase de Espectro Estendido (ESBL), como cepas de Klebsiella pneumoniae e E. coli, conferem resistência plasmidial a quais classes de antimicrobianos beta-lactâmicos, mantendo sensibilidade típica aos carbapenêmicos?",
    options: [
      "Penicilinas, cefalosporinas (incluindo 3ª e 4ª gerações) e aztreonam",
      "Apenas aminopenicilinas e cefalosporinas de 1ª geração",
      "Carbapenêmicos (meropenem e imipenem) e vancomicina",
      "Glicopeptídeos e aminoglicosídeos exclusivamente"
    ],
    correctOption: 0,
    explanation: "As enzimas ESBL hidrolisam penicilinas, cefalosporinas de 1ª, 2ª, 3ª e 4ª gerações (ceftriaxona, ceftazidima, cefepima) e monobactâmicos (aztreonam). Elas não hidrolisam carbapenêmicos (meropenem, imipenem, ertapenem), que se tornam o tratamento de escolha para infecções invasivas por ESBL.",
    source: "UFRJ",
    year: 2024
  },
  {
    subjectName: "Imunologia & Microbiologia",
    text: "Nas bactérias Gram-negativas, o lipopolissacarídeo (LPS) da membrana externa é a principal endotoxina causadora de choque séptico. Qual componente estrutural e hidrofóbico do LPS é o responsável biológico direto pela toxicidade e reconhecimento pelo receptor Toll-like 4 (TLR4)?",
    options: [
      "Antígeno O (polissacarídeo específico)",
      "Core polissacarídico central",
      "Lípido A",
      "Ácido lipoteicoico superficial"
    ],
    correctOption: 2,
    explanation: "O LPS é formado pelo antígeno O externo (antigênico), polissacarídeo do core e o Lípido A (âncora lipídica na membrana externa). O Lípido A é a porção toxigênica do LPS reconhecida pelo complexo TLR4/MD-2 nos macrófagos, desencadeando a liberação massiva de citocinas pró-inflamatórias (TNF-a, IL-1, IL-6) e choque séptico.",
    source: "USP",
    year: 2022
  },
  {
    subjectName: "Imunologia & Microbiologia",
    text: "Na resposta imune adaptativa contra vírus e patógenos intracelulares, os linfócitos T CD8+ citotóxicos eliminam as células hospedeiras infectadas. Qual é o principal mecanismo molecular de indução de morte celular utilizado pelas células T CD8+?",
    options: [
      "Fagocitose direta e lise por intermediários reativos de nitrogênio no lisossomo",
      "Liberação de grânulos citotóxicos contendo perforinas (que polimerizam poros na membrana) e granzimas (que clivam e ativam caspases pró-apoptóticas)",
      "Secreção massiva de anticorpos IgG neutralizantes no interstício",
      "Opsonização da célula-alvo pela via alternativa do sistema complemento"
    ],
    correctOption: 1,
    explanation: "Os linfócitos T citotóxicos (CD8+) induzem apoptose nas células que expressam antígenos estranhos no MHC classe I principalmente pela liberação direcionada de grânulos com perforinas (que formam poros na membrana plasmática) e granzimas (que entram no citoplasma e clivam procaspases), além da via do receptor FasL-Fas.",
    source: "ENARE",
    year: 2023
  },
  {
    subjectName: "Imunologia & Microbiologia",
    text: "Um paciente de 18 anos apresenta o terceiro episódio de meningite bacteriana por Neisseria meningitidis. A investigação imunológica deve focar na dosagem dos componentes do sistema complemento, pois essa suscetibilidade aumentada associa-se primariamente à deficiência de:",
    options: [
      "Componentes do Complexo de Ataque à Membrana (C5b, C6, C7, C8 e C9)",
      "Inibidor de C1-esterase (angioedema hereditário)",
      "Componente C1q da via clássica do complemento",
      "Fator I e fator H exclusivamente"
    ],
    correctOption: 0,
    explanation: "A lise de bactérias do gênero Neisseria (meningococo e gonococo) requer a formação efetiva do Complexo de Ataque à Membrana (MAC, composto por C5b-9). Pacientes com deficiências congênitas nos componentes finais do complemento (C5 a C9) têm risco até 10.000 vezes maior de meningococcemia recorrente.",
    source: "UNICAMP",
    year: 2024
  },

  // ==========================================
  // PERÍODO 4: FARMACOLOGIA BÁSICA (8 questões)
  // ==========================================
  {
    subjectName: "Farmacologia Básica",
    text: "Um fármaco com volume de distribuição aparente (Vd) de 500 litros em um adulto de 70 kg indica fundamentalmente que a substância:",
    options: [
      "Está confinada ao compartimento intravascular ligada à albumina",
      "Distribui-se amplamente pelos tecidos extravasculares e/ou possui alta ligação a proteínas teciduais e tecido adiposo",
      "Possui baixa biodisponibilidade oral e sofre eliminação renal imediata",
      "Apresenta velocidade de depuração plasmática (clearance) próxima de zero"
    ],
    correctOption: 1,
    explanation: "O volume de distribuição (Vd) correlaciona a quantidade total de fármaco no organismo com sua concentração plasmática (Vd = Dose / C). Um Vd muito maior que a água corporal total (42 L em um adulto de 70 kg) indica que a maior parte do fármaco saiu da circulação e está sequestrada nos tecidos periféricos (lipofílico ou alta ligação tecidual).",
    source: "USP",
    year: 2023
  },
  {
    subjectName: "Farmacologia Básica",
    text: "Na farmacodinâmica, a adição de um antagonista competitivo reversível a um sistema contendo um agonista pleno causa qual alteração na curva dose-resposta do agonista?",
    options: [
      "Desvio da curva para a esquerda com aumento da eficácia máxima (Emax)",
      "Desvio paralelo da curva para a direita, aumentando a CE50 (concentração efetiva 50%) sem alterar a eficácia máxima (Emax)",
      "Queda irreversível da eficácia máxima (Emax) sem qualquer alteração na CE50",
      "Abolição completa de qualquer resposta fisiológica mesmo com doses infinitas do agonista"
    ],
    correctOption: 1,
    explanation: "O antagonista competitivo compete pelo mesmo sítio do receptor. Sua ação pode ser superada aumentando-se a concentração do agonista. Isso desloca a curva dose-resposta para a direita (aumenta a CE50, requerendo mais fármaco para o mesmo efeito), mas preserva o efeito máximo (Emax).",
    source: "ENARE",
    year: 2022
  },
  {
    subjectName: "Farmacologia Básica",
    text: "A administração de epinefrina (adrenalina) em baixas a moderadas doses produz efeitos cardiovasculares distintos por ativação de receptores adrenérgicos. Qual receptor adrenérgico é o principal mediador da broncodilatação e vasodilatação na musculatura esquelética?",
    options: [
      "Receptor alfa-1 acoplado à proteína Gq",
      "Receptor beta-2 acoplado à proteína Gs (com aumento de AMPc)",
      "Receptor alfa-2 acoplado à proteína Gi",
      "Receptor beta-1 no miocárdio ventricular"
    ],
    correctOption: 1,
    explanation: "Os receptores beta-2 adrenérgicos são acoplados à proteína Gs. Sua estimulação ativa a adenilil ciclase, elevando o AMPc intracelular e ativando a PKA, o que inibe a quinase da cadeia leve de miosina (MLCK), promovendo o relaxamento do músculo liso bronquial (broncodilatação) e vascular muscular.",
    source: "Revalida INEP",
    year: 2023
  },
  {
    subjectName: "Farmacologia Básica",
    text: "Um agricultor dá entrada na emergência com miose puntiforme, sialorreia intensa, broncorreia, bradicardia, fasciculações musculares e confusão mental após contato com pesticida agrícola organofosforado. O tratamento farmacológico antidotal imediato deve incluir:",
    options: [
      "Fisostigmina e pilocarpina venosas",
      "Atropina (antagonista muscarínico) associada a pralidoxima (reativador da acetilcolinesterase)",
      "Flumazenil e naloxona em bolus",
      "Propranolol e bicarbonato de sódio"
    ],
    correctOption: 1,
    explanation: "Os organofosforados inibem irreversivelmente a acetilcolinesterase, causando síndrome colinérgica aguda. A atropina bloqueia os efeitos muscarínicos excessivos (reverte a broncorreia e bradicardia ameaçadoras à vida) e a pralidoxima (2-PAM) atua reativando a enzima acetilcolinesterase antes que ocorra o 'envelhecimento' químico da ligação.",
    source: "SUS-SP",
    year: 2024
  },
  {
    subjectName: "Farmacologia Básica",
    text: "Os anti-inflamatórios não esteroides (AINEs) não seletivos, como o cetoprofeno e o diclofenaco, inibem tanto a COX-1 quanto a COX-2. A toxicidade gastrointestinal (gastrite e úlcera péptica) decorre primariamente da inibição da COX-1, com supressão de qual prostaglandina protetora da mucosa gástrica?",
    options: [
      "Tromboxano A2 (TXA2)",
      "Prostaglandina E2 (PGE2) e prostaciclina (PGI2), que reduzem a secreção ácida e estimulam muco e bicarbonato",
      "Leucotrieno B4 (LTB4) quimiotático",
      "Prostaglandina D2 derivada de mastócitos"
    ],
    correctOption: 1,
    explanation: "A COX-1 gástrica sintetiza constitutivamente PGE2 e PGI2, que inibem a secreção de ácido pelas células parietais, aumentam o fluxo sanguíneo da mucosa e estimulam a produção de muco protetor e bicarbonato. O bloqueio da COX-1 pelos AINEs elimina esses mecanismos de citoproteção.",
    source: "UNICAMP",
    year: 2023
  },
  {
    subjectName: "Farmacologia Básica",
    text: "Durante a realização de sutura de ferimento cutâneo sob anestesia local com lidocaína a 2%, a adição de epinefrina (1:200.000) tem como objetivo farmacológico primordial:",
    options: [
      "Reduzir o pH da solução para acelerar a dissociação molecular da lidocaína",
      "Promover vasoconstrição local, retardando a absorção sistêmica, prolongando o tempo de anestesia e reduzindo o sangramento local",
      "Prevenir o bloqueio de fibras nervosas motoras autonômicas",
      "Estimular receptores beta-1 locais para diminuir a sensação dolorosa"
    ],
    correctOption: 1,
    explanation: "A adição de vasoconstritor (adrenalina) aos anestésicos locais causa vasoconstrição via receptores alfa-1 locais. Isso diminui a taxa de absorção vascular do anestésico para a circulação sistêmica, prolongando a duração do bloqueio anestésico, diminuindo o risco de toxicidade sistêmica e reduzindo o sangramento no campo cirúrgico.",
    source: "USP",
    year: 2024
  },
  {
    subjectName: "Farmacologia Básica",
    text: "A succinilcolina é um bloqueador neuromuscular despolarizante amplamente utilizado em intubação de sequência rápida (ISR). Qual é a complicação metabólica grave e potencialmente letal associada ao seu uso em pacientes queimados ou com lesões por esmagamento?",
    options: [
      "Hipercalemia grave com arritmias ventriculares e parada cardíaca",
      "Hiponatremia hipervolêmica aguda",
      "Acidose metabólica com ânion gap normal e hipercloremia",
      "Hipocalcemia tetânica com prolongamento do intervalo QT"
    ],
    correctOption: 0,
    explanation: "A succinilcolina causa despolarização sustentada da placa motora com efluxo de K+. Em pacientes queimados, com trauma extenso, desnervação muscular ou imobilização prolongada, há proliferação de receptores nicotínicos extrajuncionais em todo o sarcolema. O uso de succinilcolina pode causar liberação massiva de K+ para o plasma e PCR por fibrilação ventricular.",
    source: "ENARE",
    year: 2023
  },
  {
    subjectName: "Farmacologia Básica",
    text: "O citocromo P450 (CYP) hepático é responsável pelo metabolismo oxidativo de inúmeros fármacos. Qual das seguintes substâncias atua classicamente como um potente INDUTOR enzimático do CYP3A4, podendo reduzir os níveis plasmáticos de anticoagulantes, antirretrovirais e anticoncepcionais?",
    options: [
      "Suco de toranja (grapefruit)",
      "Cetoconazol e claritromicina",
      "Rifampicina (antimicobacteriano)",
      "Inibidores de protease (ritonavir)"
    ],
    correctOption: 2,
    explanation: "A rifampicina é um dos mais potentes indutores conhecidos do CYP3A4 e da glicoproteína-P (ao lado de fenitoína, carbamazepina e erva-de-são-joão). Ao acelerar a transcrição gênica do CYP3A4, reduz os níveis séricos e a eficácia de fármacos metabolizados por essa via.",
    source: "UFRJ",
    year: 2022
  },

  // ==========================================
  // PERÍODO 4: SEMIOLOGIA MÉDICA I (9 questões)
  // ==========================================
  {
    subjectName: "Semiologia Médica I",
    text: "Um paciente de 45 anos com tosse produtiva e febre alta há 3 dias é submetido ao exame do aparelho respiratório. O examinador encontra: aumento do frêmito toracovocal (FTV), macicez à percussão e sopro tubário à ausculta no terço inferior do hemitórax direito. Essa síndrome semiológica é compatível com:",
    options: [
      "Derrame pleural moderado",
      "Consolidação pulmonar (pneumonia lobar)",
      "Pneumotórax espontâneo",
      "Atelectasia por obstrução brônquica completa"
    ],
    correctOption: 1,
    explanation: "A síndrome de consolidação pulmonar (como na pneumonia lobar bacteriana) substitui o ar alveolar por exsudato. Como o tecido denso transmite o som com maior facilidade através das vias aéreas patentes, observa-se: aumento do FTV, macicez à percussão, respiração brônquica/sopro tubário e broncofonia aumentada (pectorilóquia).",
    source: "Revalida INEP",
    year: 2023
  },
  {
    subjectName: "Semiologia Médica I",
    text: "Em um paciente com suspeita de derrame pleural volumoso à esquerda, quais achados da semiologia física do tórax são esperados na área acometida?",
    options: [
      "Aumento do frêmito toracovocal, som timpânico e estertores creptantes",
      "Abolição do frêmito toracovocal, macicez à percussão e murmúrio vesicular abolido",
      "Frêmito toracovocal mantido, som claro pulmonar e atrito pleural contínuo",
      "Diminuição do murmúrio vesicular, hipersonoridade e pectorilóquia afônica"
    ],
    correctOption: 1,
    explanation: "O líquido acumulado na cavidade pleural afasta o parênquima pulmonar da parede torácica e bloqueia a transmissão acústica. Os achados clássicos do derrame pleural são a tríade: frêmito toracovocal abolido/diminuído, macicez na percussão e murmúrio vesicular abolido na base afetada.",
    source: "ENARE",
    year: 2024
  },
  {
    subjectName: "Semiologia Médica I",
    text: "Durante a ausculta cardíaca de um idoso com queixa de síncope aos esforços, o médico ausculta um sopro mesossistólico áspero, em crescendo-decrescendo (em diamante), mais audível no segundo espaço intercostal direito, com irradiação para as carótidas e B2 hipofonética. Esse sopro é característico de:",
    options: [
      "Insuficiência mitral",
      "Estenose aórtica",
      "Insuficiência aórtica",
      "Comunicação interatrial (CIA)"
    ],
    correctOption: 1,
    explanation: "A estenose aórtica clássica manifesta-se por sopro sistólico ejetivo (mesossistólico em diamante), com ápice no foco aórtico (2º EID), que irradia para os vasos do pescoço (carótidas), frequentemente acompanhado de pulso parvus et tardus e hipofonese do componente aórtico de B2.",
    source: "USP",
    year: 2023
  },
  {
    subjectName: "Semiologia Médica I",
    text: "Na semiologia cardiovascular, um sopro holossistólico (pansistólico) de alta frequência, em platô, que começa imediatamente após B1 e engloba B2, auscultado com intensidade máxima no ápice cardíaco (ictus) e com irradiação para a linha axilar anterior, indica:",
    options: [
      "Insuficiência mitral",
      "Estenose pulmonar congênita",
      "Prolapso da valva mitral sem regurgitação",
      "Estenose tricúspide reumática"
    ],
    correctOption: 0,
    explanation: "O sopro holossistólico regurgitativo de ápice com irradiação para a axila é o achado semiológico clássico da insuficiência mitral crônica. O sangue reflui do VE de alta pressão para o AE de baixa pressão durante toda a sístole ventricular.",
    source: "UNICAMP",
    year: 2022
  },
  {
    subjectName: "Semiologia Médica I",
    text: "Ao avaliar um paciente com suspeita de insuficiência cardíaca congestiva descompensada, o examinador posiciona a cabeceira a 45 graus e aplica compressão firme e constante no quadrante superior direito do abdome por 15 a 30 segundos. Observa-se elevação sustentada da coluna venosa jugular > 3 cm. Essa manobra e sinal semiológico são denominados:",
    options: [
      "Sinal de Kussmaul",
      "Refluxo hepatojugular (ou abdominojugular)",
      "Manobra de Rivero-Carvallo",
      "Sinal de Musset"
    ],
    correctOption: 1,
    explanation: "O refluxo hepatojugular avalia a capacidade do ventrículo direito de acomodar um aumento transitório no retorno venoso. A elevação persistente da turgência jugular durante a compressão hepática (> 3 cm acima da linha basal por mais de 15 segundos) é sinal altamente fidedigno de elevação das pressões de enchimento das câmaras direitas (falência de VD).",
    source: "SUS-SP",
    year: 2023
  },
  {
    subjectName: "Semiologia Médica I",
    text: "Uma mulher de 42 anos dá entrada com dor em hipocôndrio direito após alimentação gordurosa. O médico palpa o ponto cístico e solicita à paciente uma inspiração profunda. A paciente interrompe abruptamente a inspiração por dor intensa. Qual é a denominação e o significado clínico desse sinal?",
    options: [
      "Sinal de Rovsing; sugere apendicite aguda",
      "Sinal de Murphy; sugere colecistite aguda",
      "Sinal de Blumberg; sugere peritonite difusa",
      "Sinal de Cullen; sugere pancreatite aguda necrosante"
    ],
    correctOption: 1,
    explanation: "O Sinal de Murphy é a interrupção súbita da inspiração profunda provocada pela dor à palpação do ponto cístico (na junção da reborda costal direita com a linha hemiclavicular). A vesícula inflamada desce com o diafragma e colide com os dedos do examinador, sendo o sinal clínico cardeal de colecistite aguda.",
    source: "Revalida INEP",
    year: 2022
  },
  {
    subjectName: "Semiologia Médica I",
    text: "Um jovem de 19 anos apresenta dor abdominal iniciada em região periumbilical que migrou para a fossa ilíaca direita nas últimas 12 horas. Ao exame abdominal, a descompressão brusca na fossa ilíaca direita (ponto de McBurney) desencadeia dor intensa. Esse achado semiológico é o:",
    options: [
      "Sinal de Blumberg",
      "Sinal do Obturador",
      "Sinal do Psoas",
      "Sinal de Jobert"
    ],
    correctOption: 0,
    explanation: "O Sinal de Blumberg é a dor à descompressão súbita da parede abdominal (descompressão brusca positiva). Quando localizado no ponto de McBurney (fossa ilíaca direita), sugere fortemente peritonite localizada secundária à apendicite aguda.",
    source: "ENARE",
    year: 2024
  },
  {
    subjectName: "Semiologia Médica I",
    text: "Um paciente de 60 anos pós-AVE isquêmico apresenta hemiparesia à direita. No exame neurológico do membro acometido, quais sinais clínicos compõem a síndrome de neurônio motor superior (piramidal)?",
    options: [
      "Hipotonia muscular flácida, arreflexia profunda e fasciculações musculares precoces",
      "Espasticidade (hipertonia elástica em 'canivete'), hiperreflexia tendínea profunda e Sinal de Babinski presente",
      "Ataxia cerebelar, disdiadococinesia e tremor de repouso em 'contar moedas'",
      "Rigidez plástica em 'roda denteada' e perda da sensibilidade proprioceptiva"
    ],
    correctOption: 1,
    explanation: "A lesão do neurônio motor superior (via corticoespinhal/piramidal) cursa com liberação dos reflexos medulares inibidos: fraqueza espástica (sinal do canivete), hiperreflexia tendínea profunda, clônus e reflexo cutâneo-plantar em extensão (Sinal de Babinski). Fasciculações e hipotonia são marcas de neurônio motor inferior.",
    source: "USP",
    year: 2023
  },
  {
    subjectName: "Semiologia Médica I",
    text: "Na suspeita clínica de meningite bacteriana aguda, o examinador realiza a flexão passiva do pescoço com o paciente em decúbito dorsal e observa flexão involuntária dos quadris e joelhos. Esse sinal meníngeo é denominado:",
    options: [
      "Sinal de Kernig",
      "Sinal de Brudzinski",
      "Sinal de Lasegue",
      "Sinal de Romberg"
    ],
    correctOption: 1,
    explanation: "O Sinal de Brudzinski consiste na flexão reflexa e involuntária das coxas e joelhos em resposta à flexão passiva do pescoço pelo examinador. O Sinal de Kernig é a dor e resistência à extensão completa do joelho com o quadril fletido a 90 graus. Ambos indicam irritação meníngea.",
    source: "UFRJ",
    year: 2023
  },

  // ==========================================
  // PERÍODO 5: SEMIOLOGIA MÉDICA II (9 questões)
  // ==========================================
  {
    subjectName: "Semiologia Médica II",
    text: "Uma mulher de 65 anos refere dor articular mecânica nas mãos que piora ao final do dia. Ao exame físico das mãos, o médico nota proeminências ósseas nodulares nas articulações interfalangianas distais e proximais. Como são denominados esses achados semiológicos da osteoartrite?",
    options: [
      "Nódulos de Heberden (distais) e nódulos de Bouchard (proximais)",
      "Nódulos reumatoides subcutâneos em superfície extensora",
      "Tofos gotosos periarticulares com fístula",
      "Deformidade em botoeira e pescoço de cisne da artrite reumatoide"
    ],
    correctOption: 0,
    explanation: "Na osteoartrite de mãos, o espessamento osteofitário marginal nas articulações interfalangianas distais (IFD) é denominado Nódulo de Heberden. Quando ocorre nas interfalangianas proximais (IFP), é chamado de Nódulo de Bouchard. Nódulos de Heberden são os mais frequentes e altamente específicos de osteoartrose.",
    source: "USP",
    year: 2023
  },
  {
    subjectName: "Semiologia Médica II",
    text: "Um paciente de 38 anos acorda com assimetria facial. Ao exame neurológico dos pares cranianos, nota-se paralisia de toda a hemiface direita (incapacidade de enrugar a fronte, fechar o olho direito com desvio ocular para cima - Sinal de Bell - e apagamento do sulco nasogeniano com desvio da rima bucal para a esquerda). Essa apresentação caracteriza:",
    options: [
      "Paralisia facial central (supranuclear, poupando a fronte superior)",
      "Paralisia facial periférica (infranuclear, acometendo o andar superior e inferior da face)",
      "Lesão isolada do nervo trigêmeo em sua divisão mandibular (V3)",
      "Síndrome do forame jugular afetando os nervos IX, X e XI"
    ],
    correctOption: 1,
    explanation: "A paralisia facial periférica (do nervo facial / VII par) acomete tanto o terço superior quanto os dois terços inferiores da hemiface homolateral (não consegue fechar o olho nem franzir a testa), pois interrompe todas as fibras do nervo. Na paralisia facial central (AVE), o andar superior é poupado devido à inervação cortical bilateral da fronte.",
    source: "ENARE",
    year: 2023
  },
  {
    subjectName: "Semiologia Médica II",
    text: "Um atleta de futebol sofre entorse de joelho com mecanismo de desaceleração e rotação. O ortopedista flete o joelho a 30 graus, estabiliza o fêmur com uma mão e traciona a tíbia anteriormente com a outra, observando translação tibial excessiva sem parada firme ('ponto final mole'). Esse teste com maior sensibilidade para lesão do ligamento cruzado anterior (LCA) é o:",
    options: [
      "Teste de McMurray",
      "Teste de Lachman",
      "Teste de Apley",
      "Teste de Ober"
    ],
    correctOption: 1,
    explanation: "O Teste de Lachman (com o joelho em 20-30 graus de flexão) é a manobra de exame físico mais sensível e específica para ruptura do Ligamento Cruzado Anterior (LCA), superando o teste da gaveta anterior por sofrer menos influência da contratura reflexa dos isquiotibiais.",
    source: "UNICAMP",
    year: 2024
  },
  {
    subjectName: "Semiologia Médica II",
    text: "Um paciente idoso com anemia megaloblástica por deficiência de vitamina B12 (cobalamina) apresenta manifestações hematológicas e neurológicas. Ao exame físico dos membros inferiores, quais alterações decorrem do acometimento dos cordões posteriores e laterais da medula espinhal (Degeneração Combinada Subaguda)?",
    options: [
      "Perda da sensibilidade vibratória (palestesia) e proprioceptiva (artrestesia), ataxia sensorial com Romberg positivo e reflexo de Babinski",
      "Perda da sensibilidade térmica e dolorosa bilateral com preservação da propriocepção (dissociação siringomiélica)",
      "Parestesias em bota com reflexos aquileus abolidos e ausência de déficit motor",
      "Paralisia flácida assimétrica com atrofia muscular intensa"
    ],
    correctOption: 0,
    explanation: "A deficiência grave de B12 causa Degeneração Combinada Subaguda da medula: atinge as colunas dorsais (perda de vibração e propriocepção, ataxia sensorial e Romberg positivo) e os tratos corticoespinhais laterais (espasticidade, hiperreflexia e sinal de Babinski).",
    source: "Revalida INEP",
    year: 2024
  },
  {
    subjectName: "Semiologia Médica II",
    text: "Ao avaliar um paciente com doença renal, a diferenciação clínica entre Síndrome Nefrítica e Síndrome Nefrótica é fundamental. Qual conjunto de achados caracteriza classicamente a Síndrome Nefrítica?",
    options: [
      "Proteinúria maciça (> 3,5 g/24h), hipoalbuminemia severa, edema anasárquico e lipidúria sem hipertensão",
      "Hematúria glomerular (dismorfismo eritrocitário e cilindros hemáticos), oligúria, hipertensão arterial aguda e edema periorbital discreto",
      "Poliúria osmótica, glicosúria na ausência de hiperglicemia e acidose tubular renal",
      "Leucocitúria estéril, febre, dor lombar e eosinofilúria isolada"
    ],
    correctOption: 1,
    explanation: "A Síndrome Nefrítica expressa inflamação glomerular aguda: rotura da barreira e infiltração celular causam hematúria glomerular (dismorfismo e cilindros hemáticos), queda da TFG com oligúria e retenção hidrossalina gerando hipertensão arterial e edema.",
    source: "SUS-SP",
    year: 2023
  },
  {
    subjectName: "Semiologia Médica II",
    text: "Em um paciente com queixa de inchaço e cansaço nas pernas, o exame vascular periférico revela edema perimaleolar vespertino, veias varicosas tortuosas, hiperpigmentação castanha na pele do terço inferior da perna (dermatite ocre) e lipodermatoesclerose. Essa síndrome semiológica é compatível com:",
    options: [
      "Oclusão arterial crônica periférica (Doença Arterial Obstrutiva Periférica)",
      "Insuficiência venosa crônica (estase venosa)",
      "Linfedema congênito primário (Sinal de Stemmer positivo)",
      "Tromboflebite superficial aguda migratória"
    ],
    correctOption: 1,
    explanation: "A insuficiência venosa crônica decorre de incompetência valvar e hipertensão venosa ambulatorial. O extravasamento capilar de hemácias com degradação da hemoglobina em hemossiderina causa a hiperpigmentação marrom-acastanhada (dermatite ocre). Com a evolução crônica, ocorre fibrose subcutânea (lipodermatoesclerose).",
    source: "USP",
    year: 2022
  },
  {
    subjectName: "Semiologia Médica II",
    text: "No exame físico abdominal de um paciente cirrótico com hipertensão portal avançada, a presença de veias dilatadas e tortuosas que irradiam do umbigo em direção centrífuga (sinal da cabeça de medusa) decorre da recanalização de qual estrutura anatômica embriológica?",
    options: [
      "Ducto venoso de Arantius",
      "Veia umbilical no ligamento redondo do fígado",
      "Artérias umbilicais obliteradas",
      "Veia vitelínica direita residual"
    ],
    correctOption: 1,
    explanation: "A circulação colateral tipo 'cabeça de medusa' resulta da recanalização da veia umbilical, que cursa no interior do ligamento redondo do fígado (ligamento falciforme). A pressão portal retrógrada força o sangue da veia porta esquerda para a veia umbilical recanalizada até a parede abdominal e veias epigástricas.",
    source: "UFRJ",
    year: 2023
  },
  {
    subjectName: "Semiologia Médica II",
    text: "Uma mulher de 32 anos apresenta emagrecimento, intolerância ao calor, palpitações e insônia. Ao exame físico, nota-se bócio tireoidiano difuso com frêmito e sopro audível, proptose ocular bilateral com retração palpebral (oftalmopatia) e lesões eritematosas infiltradas prétibiais. Qual é o diagnóstico e o anticorpo patognomônico?",
    options: [
      "Tireoidite de Hashimoto; anticorpo anti-peroxidase tireoidiana (anti-TPO)",
      "Doença de Graves; anticorpo estimulador do receptor de TSH (TRAB)",
      "Bócio multinodular tóxico (Doença de Plummer); ausência de autoanticorpos",
      "Tireoidite subaguda de De Quervain; autoanticorpos anti-tireoglobulina"
    ],
    correctOption: 1,
    explanation: "A Doença de Graves é a principal causa de hipertireoidismo. Caracteriza-se pela tríade clínica de tireotoxicose/bócio difuso hipervascularizado, orbitopatia de Graves e mixedema pré-tibial. É causada por autoanticorpos da classe IgG direcionados contra o receptor de TSH (TRAB) que atuam como agonistas.",
    source: "ENARE",
    year: 2024
  },
  {
    subjectName: "Semiologia Médica II",
    text: "Na semiologia respiratória avançada, o examinador ausculta um som áspero, descontínuo e superficial, audível tanto na inspiração quanto na expiração, comparado ao ruído de 'couro novo atritado', que não se modifica com a tosse e desaparece na apneia. Esse achado representa:",
    options: [
      "Estertores crepitantes finos de base",
      "Atrito pleural",
      "Estridor laríngeo inspiratório",
      "Roncos de transmissão traqueal"
    ],
    correctOption: 1,
    explanation: "O atrito pleural é gerado pela fricção dos folhetos parietais e viscerais da pleura inflamados e recobertos por fibrina (pleurite aguda). É bifásico (inspiração e expiração), não desaparece com a tosse e cessa quando o paciente para de respirar, diferenciando-se dos ruídos pericárdicos e das secreções brônquicas.",
    source: "UNICAMP",
    year: 2023
  },

  // ==========================================
  // PERÍODO 5: FARMACOLOGIA CLÍNICA (9 questões)
  // ==========================================
  {
    subjectName: "Farmacologia Clínica",
    text: "Um paciente de 55 anos com hipertensão arterial sistêmica e diabetes mellitus tipo 2 inicia tratamento com enalapril (IECA). Duas semanas após, exames mostram elevação da creatinina sérica de 1,0 para 1,2 mg/dL e K+ sérico de 4,8 mEq/L. Qual é a conduta correta em relação ao mecanismo farmacológico da droga?",
    options: [
      "Suspender imediatamente o enalapril devido à toxicidade renal irreversível",
      "Manter a medicação e monitorar, pois uma elevação de até 30% da creatinina é esperada pela vasodilatação preferencial da arteríola eferente",
      "Associar espironolactona em dose plena para corrigir o potássio",
      "Substituir o enalapril por anti-inflamatório não esteroidal"
    ],
    correctOption: 1,
    explanation: "Os IECAs (e BRAs) bloqueiam a angiotensina II, promovendo vasodilatação preferencial da arteríola eferente glomerular. Isso reduz a pressão intraglomerular de filtração, levando a um aumento fisiológico benigno de até 30% na creatinina sérica. Se a elevação for < 30% e o K+ < 5,5 mEq/L, o fármaco deve ser mantido pelo benefício nefroprotetor a longo prazo.",
    source: "ENARE",
    year: 2024
  },
  {
    subjectName: "Farmacologia Clínica",
    text: "Um paciente de 72 anos com fibrilação atrial não valvar com escore CHA2DS2-VASc = 4 inicia anticoagulação oral com apixabana. Qual é o mecanismo de ação molecular da apixabana comparada à varfarina?",
    options: [
      "Inibição direta e reversível do Fator Xa da coagulação, sem interferir na síntese de vitamina K",
      "Inibição direta da trombina livre e ligada ao coágulo (Fator IIa)",
      "Inibição da epóxido redutase de vitamina K dependente no fígado",
      "Ativação alostérica da antitrombina III plasmática"
    ],
    correctOption: 0,
    explanation: "A apixabana e a rivaroxabana são inibidores diretos do Fator Xa (fator dez ativado) da cascata de coagulação. Ao contrário da varfarina (que inibe a síntese hepática dos fatores II, VII, IX e X via epóxido redutase da vitamina K), os DOACs inibidores do Xa dispensam monitorização de RNI e apresentam menor risco de hemorragia intracraniana.",
    source: "USP",
    year: 2023
  },
  {
    subjectName: "Farmacologia Clínica",
    text: "Paciente de 62 anos com DM2 e doença cardiovascular aterosclerótica estabelecida (pós-infarto do miocárdio) apresenta HbA1c = 8,2% em uso de metformina. De acordo com as diretrizes atuais de cardiologia e endocrinologia, qual classe de antidiabético oral com comprovado benefício na redução de desfechos cardiovasculares e progressão renal deve ser associada?",
    options: [
      "Inibidores do cotransportador sódio-glicose 2 (iSGLT2, como empagliflozina ou dapagliflozina)",
      "Sulfonilureias de segunda geração (glibenclamida)",
      "Tiazolidinedionas (pioglitazona)",
      "Inibidores da alfa-glicosidase (acarbose)"
    ],
    correctOption: 0,
    explanation: "Os inibidores de SGLT2 (dapagliflozina, empagliflozina) e os agonistas de GLP-1 (liraglutida, semaglutida) demonstraram redução expressiva de mortalidade cardiovascular, internação por insuficiência cardíaca e retardo da progressão de doença renal crônica em diabéticos com doença cardiovascular aterosclerótica.",
    source: "UNICAMP",
    year: 2024
  },
  {
    subjectName: "Farmacologia Clínica",
    text: "Um jovem de 26 anos sem comorbidades recebe diagnóstico de Pneumonia Adquirida na Comunidade (PAC) leve, tratada em regime ambulatorial (CURB-65 = 0). De acordo com a Diretriz Brasileira de Pneumonia, a opção antimicrobiana empírica de primeira linha em monoterapia é:",
    options: [
      "Ciprofloxacino oral por 14 dias",
      "Amoxicilina em dose plena (ou macrolídeo como azitromicina/claritromicina)",
      "Vancomicina oral associada a gentamicina",
      "Ceftriaxona venosa associada a piperacilina-tazobactam"
    ],
    correctOption: 1,
    explanation: "Para pacientes ambulatoriais sem comorbidades e sem fatores de risco para patógenos resistentes (CURB-65 = 0 ou 1), a terapia antimicrobiana de escolha visa cobrir Streptococcus pneumoniae (pneumococo): monoterapia com amoxicilina ou macrolídeo (azitromicina/claritromicina).",
    source: "Revalida INEP",
    year: 2023
  },
  {
    subjectName: "Farmacologia Clínica",
    text: "Na abordagem atual da asma brônquica conforme a diretriz GINA (Global Initiative for Asthma), qual é a recomendação farmacológica fundamental para o alívio de sintomas em adultos, que substituiu o uso isolado de beta-2 agonista de curta ação (SABA)?",
    options: [
      "Uso preferencial da combinação de corticoide inalatório (CI) em baixa dose + formoterol como medicamento de alívio/resgate",
      "Salbutamol inalatório exclusivo sempre que necessário",
      "Brometo de ipratrópio contínuo a cada 4 horas",
      "Corticoide oral contínuo diário em doses baixas"
    ],
    correctOption: 0,
    explanation: "A diretriz GINA não recomenda mais o uso isolado de SABA (como salbutamol puro) no resgate da asma devido ao risco aumentado de exacerbações graves e remodelamento brônquico. A conduta preferencial em todas as etapas é o uso combinado de Corticoide Inalatório (budesonida) + Formoterol (LABA de rápido início) como alívio e manutenção (estratégia MART).",
    source: "SUS-SP",
    year: 2024
  },
  {
    subjectName: "Farmacologia Clínica",
    text: "O uso prolongado de inibidores da bomba de prótons (IBPs, como omeprazol e pantoprazol) por vários anos tem sido associado em estudos clínicos a qual das seguintes alterações de absorção mineral e vitamínica?",
    options: [
      "Má absorção de vitamina B12 e diminuição da absorção de cálcio e magnésio por hipocloridria",
      "Hiperabsorção de ferro causando hemocromatose secundária",
      "Eliminação renal acelerada de ácido fólico e vitamina C",
      "Intoxicação crônica por vitamina D e hipercalcemia grave"
    ],
    correctOption: 0,
    explanation: "A acidez gástrica é indispensável para clivar a vitamina B12 das proteínas alimentares e para a solubilização e absorção ideal de sais de cálcio, ferro e magnésio. O uso crônico de IBPs pode provocar hipomagnesemia, deficiência de cobalamina (B12) e discreto aumento do risco de fraturas osteoporóticas.",
    source: "USP",
    year: 2023
  },
  {
    subjectName: "Farmacologia Clínica",
    text: "Em um paciente admitido em UTI com choque séptico refratário à ressuscitação volêmica adequada com cristaloides (30 mL/kg), qual é a droga vasoativa vasopressora de primeira escolha recomendada pelo protocolo da Surviving Sepsis Campaign para restaurar a PAM >= 65 mmHg?",
    options: [
      "Dopamina em dose intermediária",
      "Norepinefrina (noradrenalina)",
      "Dobutamina em monoterapia",
      "Fenilefrina venosa contínua"
    ],
    correctOption: 1,
    explanation: "A norepinefrina (noradrenalina) é a droga vasoativa de primeira linha no choque séptico. Possui potente ação alfa-1 vasoconstritora e discreta ação beta-1 inotrópica, sendo superior à dopamina por apresentar menor incidência de taquiarritmias e menor mortalidade.",
    source: "ENARE",
    year: 2023
  },
  {
    subjectName: "Farmacologia Clínica",
    text: "As estatinas (como atorvastatina e rosuvastatina) são a base farmacológica da prevenção secundária cardiovascular. Além de reduzirem o LDL-colesterol por inibição da HMG-CoA redutase, exercem efeitos pleiotrópicos estabilizadores de placa aterosclerótica. Qual é o principal efeito adverso muscular que requer monitorização clínica?",
    options: [
      "Miopatia/mialgia com risco de rabdomiólise (elevação marcante de creatina fosfoquinase - CPK)",
      "Fibrose retroperitoneal progressiva",
      "Distonia cervical aguda extra-piramidal",
      "Hipertrofia do músculo liso vascular coronariano"
    ],
    correctOption: 0,
    explanation: "A toxicidade muscular é o principal efeito adverso das estatinas, variando de mialgia comum (sem elevação de CPK) à miosite e, raramente, rabdomiólise com falência renal aguda por mioglobinúria. O risco aumenta com uso concomitante de fibratos (especialmente genfibrozila) ou inibidores de CYP3A4.",
    source: "UNICAMP",
    year: 2022
  },
  {
    subjectName: "Farmacologia Clínica",
    text: "Um paciente em tratamento para depressão com sertralina (ISRS) utiliza inadvertidamente tramadol para dor lombar e linezolida para infecção de partes moles. Horas depois, desenvolve agitação psicomotora, hipertermia, diaforese, tremores, clonus induzível e hiperreflexia. Essa emergência farmacológica é a:",
    options: [
      "Síndrome neuroléptica maligna",
      "Síndrome serotoninérgica",
      "Crise tireotóxica aguda",
      "Hipertermia maligna por anestésicos"
    ],
    correctOption: 1,
    explanation: "A síndrome serotoninérgica decorre da hiperestimulação de receptores 5-HT1A e 5-HT2A no SNC e SNP por acúmulo de serotonina (sertralina inibe recaptação; tramadol inibe recaptação de 5-HT e NA; linezolida é inibidor não seletivo da MAO). Caracteriza-se pela tríade: alteração do estado mental, hiperatividade autonômica e anormalidades neuromusculares (clonus e hiperreflexia).",
    source: "Revalida INEP",
    year: 2024
  },

  // ==========================================
  // PERÍODO 6: DIAGNÓSTICO POR IMAGEM (9 questões)
  // ==========================================
  {
    subjectName: "Diagnóstico por Imagem",
    text: "Na tomografia computadorizada (TC) de crânio sem contraste em trauma cranioencefálico agudo, a imagem de uma coleção hiperdensa extra-axial com morfologia biconvexa (lenticular), que respeita as linhas de sutura óssea craniana, é patognomônica de:",
    options: [
      "Hematoma subdural agudo (morfologia em crescente que cruza suturas)",
      "Hematoma epidural (extradural)",
      "Hemorragia subaracnóidea traumática nas cisternas da base",
      "Contusão parenquimatosa intraparietal"
    ],
    correctOption: 1,
    explanation: "O hematoma epidural (geralmente por laceração da artéria meníngea média) localiza-se entre a tábua óssea interna e a dura-máter. Como a dura-máter é firmemente aderida às suturas cranianas, a expansão do sangue fica contida entre duas suturas, assumindo o formato clássico biconvexo (lente de vidro).",
    source: "ENARE",
    year: 2023
  },
  {
    subjectName: "Diagnóstico por Imagem",
    text: "Em radiografia simples de abdome em posição ortostática (ou tórax em PA) de paciente com dor abdominal súbita intensa em barra, a presença de ar livre subdiafragmático (pneumoperitônio) indica perfuração de víscera oca. Como é classicamente denominado o sinal radiológico de visualização de ambos os lados da parede gástrica ou intestinal?",
    options: [
      "Sinal de Rigler (ou sinal da parede dupla)",
      "Sinal do bico de pássaro (acalsia)",
      "Sinal do grão de café (vólvulo de sigmoide)",
      "Sinal do alvo (intussuscepção)"
    ],
    correctOption: 0,
    explanation: "O Sinal de Rigler (ou sinal da dupla parede) ocorre no pneumoperitônio quando há ar tanto no lúmen intestinal quanto fora dele (livre na cavidade peritoneal), permitindo que a parede da alça intestinal seja delineada com extrema nitidez pelo contraste com o gás em ambos os lados.",
    source: "USP",
    year: 2024
  },
  {
    subjectName: "Diagnóstico por Imagem",
    text: "Qual é o exame de imagem padrão-ouro e de primeira linha na atualidade para confirmação diagnóstica de Tromboembolismo Pulmonar (TEP) agudo em pacientes hemodinamicamente estáveis?",
    options: [
      "Radiografia de tórax em duas incidências",
      "Angiotomografia computadorizada de artérias pulmonares (Angio-TC de tórax)",
      "Cintilografia pulmonar de inalação/perfusão (V/Q)",
      "Ecocardiograma transtorácico em repouso"
    ],
    correctOption: 1,
    explanation: "A angiotomografia de artérias pulmonares com contraste iodado intravenoso (Angio-TC de tórax) é o método diagnóstico de escolha e padrão de referência para TEP agudo, permitindo visualização direta do trombo intraluminal como falha de enchimento arterial.",
    source: "UNICAMP",
    year: 2023
  },
  {
    subjectName: "Diagnóstico por Imagem",
    text: "Na radiografia de tórax de um paciente intubado com posicionamento inadvertido do tubo orotraqueal no brônquio-fonte direito, observa-se opacidade homogênea em todo o hemitórax esquerdo acompanhada por desvio da traqueia e do mediastino ipsilateral (para a esquerda). Esse padrão radiográfico define:",
    options: [
      "Derrame pleural maciço à esquerda (que causaria desvio contralateral)",
      "Atelectasia obstrutiva completa do pulmão esquerdo por reabsorção",
      "Pneumotórax hipertensivo à esquerda",
      "Pneumonia necrosante multilobar"
    ],
    correctOption: 1,
    explanation: "A oclusão do brônquio-fonte esquerdo impede a ventilação e o ar residual é reabsorvido, levando ao colapso total (atelectasia) do pulmão esquerdo. A perda de volume pulmonar gera pressão negativa e atrai as estruturas móveis (traqueia e mediastino) para o lado da lesão (desvio ipsilateral). O derrame maciço causaria efeito de massa oposto (desvio contralateral).",
    source: "Revalida INEP",
    year: 2022
  },
  {
    subjectName: "Diagnóstico por Imagem",
    text: "Na ultrassonografia de abdome superior, qual é o padrão ultrassonográfico clássico que confirma o diagnóstico de colelitíase (cálculo na vesícula biliar)?",
    options: [
      "Imagem anecoica homogênea sem ecos internos",
      "Estrutura hiperecogênica intraluminal, móvel à mudança de decúbito, com sombra acústica posterior nítida",
      "Espessamento difuso da parede sem ecos no interior da luz",
      "Reforço acústico posterior com atenuação cônica periférica"
    ],
    correctOption: 1,
    explanation: "Cálculos biliares barram a passagem das ondas sonoras do ultrassom e as refletem intensamente: aparecem como estruturas hiperecogênicas (brilhantes), produtoras de sombra acústica posterior (faixa escura anecoica logo atrás do cálculo) e com mobilidade à mudança de decúbito do paciente.",
    source: "SUS-SP",
    year: 2023
  },
  {
    subjectName: "Diagnóstico por Imagem",
    text: "Em radiografia de antebraço de uma criança de 6 anos que sofreu queda com a mão espalmada, nota-se cortical óssea fraturada em apenas um lado da diáfise radial, enquanto o córtex oposto encontra-se apenas encurvado e intacto. Esse padrão típico da infância é denominado:",
    options: [
      "Fratura em galho verde (greenstick fracture)",
      "Fratura em toro ou por compressão (buckle fracture)",
      "Fratura cominutiva transversa",
      "Fratura de Salter-Harris tipo IV"
    ],
    correctOption: 0,
    explanation: "O osso da criança é mais poroso e possui periósteo espesso e elástico. A fratura em galho verde ocorre quando o osso é submetido a forças de encurvamento, rompendo o córtex na borda convexa enquanto o córtex da borda côncava permanece em continuidade plástica, semelhante ao encurvamento de um galho verde de árvore.",
    source: "USP",
    year: 2023
  },
  {
    subjectName: "Diagnóstico por Imagem",
    text: "Na TC de crânio sem contraste de um paciente com déficit neurológico focal agudo com 90 minutos de evolução, a TC pode parecer normal ou mostrar sinais precoces de isquemia. Qual sinal tomográfico hiperagudo reflete a presença de trombo intra-arterial na circulação anterior?",
    options: [
      "Sinal da artéria cerebral média hiperdensa",
      "Sinal da crescente meníngea hiperdensa",
      "Calcificação do plexo coroide",
      "Sinal da asa do corvo no tronco encefálico"
    ],
    correctOption: 0,
    explanation: "O Sinal da artéria cerebral média (ACM) hiperdensa decorre da presença de trombo/êmbolo recente e denso no interior do segmento M1 da ACM, tornando o vaso espontaneamente hiperdenso na TC de crânio sem contraste antes mesmo do desenvolvimento de hipodensidade parenquimatosa evidente.",
    source: "ENARE",
    year: 2024
  },
  {
    subjectName: "Diagnóstico por Imagem",
    text: "Na radiografia de tórax em incidência posteroanterior (PA), o apagamento da borda cardíaca direita do mediastino por uma opacidade pulmonar homogênea no hemitórax direito localiza a consolidação especificamente em qual segmento/lobo pulmonar, de acordo com o clássico 'Sinal da Silhueta' de Felson?",
    options: [
      "Lobo superior direito",
      "Lobo médio direito",
      "Lobo inferior direito (segmento basal posterior)",
      "Espaço pleural posterior exclusivamente"
    ],
    correctOption: 1,
    explanation: "O Sinal da Silhueta de Felson postula que duas estruturas de densidade radiológica semelhante (líquido/tecido mole) em contato anatômico no mesmo plano espacial apagam seus limites de contorno. O lobo médio direito é anterior e está em contato direto com o átrio direito (borda cardíaca direita). Portanto, sua consolidação apaga a silhueta cardíaca direita.",
    source: "UNICAMP",
    year: 2024
  },
  {
    subjectName: "Diagnóstico por Imagem",
    text: "Na ressonância magnética (RM) de encéfalo de paciente jovem com surtos neurológicos remitentes-recorrentes (suspeita de Esclerose Múltipla), lesões desmielinizantes ativas periventriculares dispostas perpendicularmente ao eixo dos ventrículos laterais ao longo das veias medulares são denominadas:",
    options: [
      "Dedos de Dawson (Dawson's fingers)",
      "Sinal do alvo parenquimatoso",
      "Infartos lacunares de núcleos da base",
      "Hemorragias petequiais de Duret"
    ],
    correctOption: 0,
    explanation: "Os Dedos de Dawson são placas de desmielinização perivenular periventriculares características da Esclerose Múltipla. Na RM (especialmente ponderada em FLAIR ou T2 sagital), elas se projetam perpendicularmente ao corpo caloso e teto dos ventrículos laterais, refletindo inflamação ao redor das vênulas cerebrais profundas.",
    source: "USP",
    year: 2022
  },

  // ==========================================
  // PERÍODO 6: SAÚDE COLETIVA & EPIDEMIOLOGIA (9 questões)
  // ==========================================
  {
    subjectName: "Saúde Coletiva & Epidemiologia",
    text: "Um grupo de pesquisadores seleciona um grupo de indivíduos com diagnóstico recente de carcinoma hepatocelular e um grupo controle sem a neoplasia, emparelhados por idade e sexo. Em seguida, investiga-se retrospectivamente o histórico pregresso de infecção pelo vírus da hepatite B (VHB) em ambos os grupos. Qual é o desenho desse estudo epidemiológico?",
    options: [
      "Estudo de Coorte Prospectiva",
      "Estudo de Caso-Controle",
      "Ensaio Clínico Randomizado Triplo-Cego",
      "Estudo Transversal de Prevalência"
    ],
    correctOption: 1,
    explanation: "O estudo de Caso-Controle parte do desfecho (casos doentes vs controles não doentes) e olha retrospectivamente para o passado para mensurar e comparar a frequência de exposição a fatores de risco suspeitos. É o delineamento ideal para investigar doenças raras ou de longo período de latência.",
    source: "Revalida INEP",
    year: 2023
  },
  {
    subjectName: "Saúde Coletiva & Epidemiologia",
    text: "Em um estudo epidemiológico que avalia a associação entre tabagismo e infarto agudo do miocárdio, calculou-se um Risco Relativo (RR) de 3,0 com intervalo de confiança de 95% (IC95%) variando de 2,1 a 4,3 (p < 0,001). A correta interpretação desse resultado estatístico é:",
    options: [
      "Não há associação estatisticamente significante porque o intervalo de confiança incluiu o valor 3,0",
      "Indivíduos expostos ao tabagismo apresentam risco 3 vezes maior de infarto em comparação aos não expostos, e a associação é estatisticamente significante pois o IC95% não contém a unidade (1,0)",
      "O tabagismo atua como fator de proteção reduzindo em 3 vezes o risco de infarto",
      "O estudo cometeu erro de viés de seleção intolerável invalidando a medida pontual"
    ],
    correctOption: 1,
    explanation: "O Risco Relativo de 3,0 indica que a incidência da doença nos expostos é o triplo da dos não expostos. O intervalo de confiança de 95% (2,1 a 4,3) não contém o valor 1,0 (valor nulo para medidas de razão), confirmando que a associação é estatisticamente significante com p < 0,05.",
    source: "ENARE",
    year: 2024
  },
  {
    subjectName: "Saúde Coletiva & Epidemiologia",
    text: "Um teste de triagem para detecção precoce de câncer colorretal é aplicado em uma população assintomática com baixa prevalência da doença. Em relação às propriedades operacionais do teste diagnóstico, a SENSIBILIDADE de um teste representa:",
    options: [
      "A probabilidade de o indivíduo ter a doença dado que o teste resultou positivo",
      "A proporção de indivíduos verdadeiramente doentes que apresentam teste positivo (capacidade de detectar a doença nos doentes)",
      "A proporção de indivíduos sadios que apresentam teste negativo",
      "A proporção de testes falso-positivos em relação ao total de doentes"
    ],
    correctOption: 1,
    explanation: "A sensibilidade é a capacidade de um teste diagnóstico identificar os verdadeiramente doentes [VP / (VP + FN)]. Um teste altamente sensível é essencial para triagem porque, se der negativo, afasta com segurança a doença (poucos falsos-negativos). O valor preditivo positivo (VPP) varia com a prevalência; a sensibilidade e especificidade são intrínsecas ao teste.",
    source: "USP",
    year: 2023
  },
  {
    subjectName: "Saúde Coletiva & Epidemiologia",
    text: "O Sistema Único de Saúde (SUS) no Brasil é fundamentado em princípios doutrinários e diretrizes organizacionais previstos na Constituição Federal de 1988 e na Lei 8.080/1990. Qual princípio doutrinário assegura o tratamento diferenciado aos que mais necessitam com o objetivo de diminuir as desigualdades sociais e em saúde?",
    options: [
      "Universalidade de acesso",
      "Equidade (justiça social)",
      "Integralidade da assistência",
      "Descentralização político-administrativa"
    ],
    correctOption: 1,
    explanation: "A Equidade é o princípio de justiça social que orienta 'tratar desigualmente os desiguais' para que todos alcancem o mesmo nível de oportunidade e saúde. Diferencia-se da igualdade estrita: enquanto a universalidade garante acesso a todos, a equidade prioriza onde a carência e vulnerabilidade são maiores.",
    source: "UNICAMP",
    year: 2023
  },
  {
    subjectName: "Saúde Coletiva & Epidemiologia",
    text: "Qual dos seguintes agravos de saúde pública exige NOTIFICAÇÃO COMPULSÓRIA IMEDIATA (em até 24 horas) ao Ministério da Saúde e órgãos de vigilância epidemiológica a partir da suspeita clínica?",
    options: [
      "Hanseníase em forma dimorfa",
      "Raiva humana ou acidente por animal potencialmente transmissor da raiva",
      "Tuberculose pulmonar bacilífera",
      "Hipertensão arterial sistêmica primária"
    ],
    correctOption: 1,
    explanation: "A suspeita de raiva humana ou agressão por animal silvestre/doméstico suspeito exige notificação compulsória imediata (até 24 horas) pelo risco de letalidade de 100% e necessidade de profilaxia antirrábica pós-exposição imediata. Hanseníase e tuberculose são de notificação compulsória semanal.",
    source: "SUS-SP",
    year: 2024
  },
  {
    subjectName: "Saúde Coletiva & Epidemiologia",
    text: "No contexto da transição epidemiológica e demográfica vivenciada pelo Brasil nas últimas décadas, observa-se como tendência marcante:",
    options: [
      "Queda progressiva da taxa de fecundidade e envelhecimento populacional, com predomínio da morbimortalidade por Doenças Crônicas Não Transmissíveis (DCNT) e causas externas",
      "Aumento exponencial da taxa de natalidade e rejuvenescimento da pirâmide etária nacional",
      "Erradicação completa das doenças infectocontagiosas e negligenciadas em todo o território nacional",
      "Diminuição da prevalência de neoplasias malignas e doenças cardiovasculares associadas ao tabagismo"
    ],
    correctOption: 0,
    explanation: "A transição demográfica no Brasil é caracterizada pela queda da fecundidade e da mortalidade geral com aumento da expectativa de vida (envelhecimento populacional). A transição epidemiológica reflete a tripla carga de doenças: predomínio das DCNT e causas externas, com permanência de doenças infecciosas e emergência de novas epidemias.",
    source: "ENARE",
    year: 2023
  },
  {
    subjectName: "Saúde Coletiva & Epidemiologia",
    text: "Um pesquisador correlaciona o consumo per capita de chocolate de diversos países com o número de prêmios Nobel por milhão de habitantes desses mesmos países e encontra forte correlação linear positiva (r = 0,79). Se ele concluir que indivíduos que comem mais chocolate têm maior inteligência individual, estará cometendo qual viés metodológico clássico?",
    options: [
      "Viés de memória (recall bias)",
      "Falácia ecológica (ecologic fallacy)",
      "Viés de Berkson (seleção hospitalar)",
      "Efeito Hawthorne de observação"
    ],
    correctOption: 1,
    explanation: "A Falácia Ecológica (ou viés ecológico) ocorre em estudos ecológicos quando conclusões e inferências sobre relações biológicas individuais são formuladas com base em dados agregados de nível populacional. Uma associação observada entre grupos/países não se aplica obrigatoriamente a cada indivíduo.",
    source: "USP",
    year: 2022
  },
  {
    subjectName: "Saúde Coletiva & Epidemiologia",
    text: "Dentre as medidas de frequência de doenças na epidemiologia descritiva, a INCIDÊNCIA de uma doença refere-se a:",
    options: [
      "Número total de casos existentes (antigos e novos) em um ponto específico no tempo dividido pela população total",
      "Número de casos novos que se desenvolvem em uma população em risco durante um período de tempo determinado",
      "Proporção de óbitos por uma causa específica em relação ao total de óbitos gerais",
      "Taxa de letalidade entre indivíduos que buscaram atendimento terciário"
    ],
    correctOption: 1,
    explanation: "A incidência mensura o fluxo de casos novos surgidos em uma população sob risco de adoecer durante um determinado intervalo temporal (mede a velocidade de surgimento da doença ou risco). A prevalência mede o estoque de casos (antigos + novos) presentes num dado momento.",
    source: "UFRJ",
    year: 2023
  },
  {
    subjectName: "Saúde Coletiva & Epidemiologia",
    text: "A Estratégia Saúde da Família (ESF) é o modelo prioritário da Atenção Primária à Saúde no Brasil. Qual das seguintes atribuições é competência típica e precípua do Agente Comunitário de Saúde (ACS) na equipe de Saúde da Família?",
    options: [
      "Prescrição de medicamentos da farmácia básica conforme protocolos municipais",
      "Realização de visitas domiciliares periódicas, cadastramento familiar e mapeamento das vulnerabilidades e agravos de sua microárea",
      "Indicação e solicitação de exames complementares de imagem",
      "Realização de procedimentos invasivos sob supervisão remota"
    ],
    correctOption: 1,
    explanation: "O ACS atua como ponte e elo comunitário entre a equipe de saúde e a população do território. Suas funções essenciais incluem o cadastramento e atualização de todas as pessoas de sua microárea, visitas domiciliares regulares, identificação de situações de risco e vigilância à saúde no território adscrito.",
    source: "Revalida INEP",
    year: 2024
  },

  // ==========================================
  // BLOCO ESPECIAL: LESÕES ELEMENTARES (COM IMAGENS CLÍNICAS REAIS)
  // ==========================================
  {
    subjectName: "Semiologia Médica I",
    text: "Paciente de 64 anos procura a Unidade Básica de Saúde queixando-se de dor em queimação e hiperestesia na região torácica unilateral há 3 dias, seguida pelo surgimento da erupção cutânea exibida na imagem abaixo, com distribuição estritamente metamérica (dermátomo T4). De acordo com a semiologia dermatológica das lesões elementares primárias de conteúdo líquido, qual é a lesão elementar observada e o diagnóstico mais provável?",
    imageUrl: "/images/clinical/lesao_vesicula.jpg",
    options: [
      "Vesículas agrupadas sobre base eritematosa; Herpes Zoster",
      "Pústulas foliculares disseminadas; Foliculite bacteriana",
      "Petéquias e sufusões hemorrágicas; Vasculite por IgA",
      "Bolhas tensas com sinal de Nikolsky positivo; Pênfigo vulgar"
    ],
    correctOption: 0,
    explanation: "A imagem evidencia vesículas agrupadas sobre placa eritematosa. Vesículas são lesões elevadas, circunscritas, de conteúdo líquido claro/seroso, com diâmetro inferior a 1,0 cm. O padrão dermatômico (unilateral e metamérico) associado a pródromo de dor neuropática é patognomônico de Herpes Zoster (reativação do vírus varicela-zoster no gânglio sensitivo da raiz dorsal).",
    source: "ENARE",
    year: 2024
  },
  {
    subjectName: "Semiologia Médica I",
    text: "Um homem de 30 anos apresenta lesões cutâneas agudas na face anterolateral da coxa, pruriginosas e dolorosas à palpação, conforme demonstrado na fotografia dermatológica a seguir. Observam-se lesões circunscritas com conteúdo purulento central circundadas por halo inflamatório eritematoso. Qual é a denominação semiológica dessa lesão elementar primária?",
    imageUrl: "/images/clinical/lesao_pustula.jpg",
    options: [
      "Pápula dérmica sólida",
      "Pústula",
      "Vesícula serosa",
      "Tubérculo infiltrativo"
    ],
    correctOption: 1,
    explanation: "A pústula é uma lesão elementar primária circunscrita, com elevação superficial e conteúdo purulento (leucocitário) séptico ou estéril, medindo geralmente até 1,0 cm. Diferencia-se da vesícula pelo conteúdo purulento (turvo/amarelado) e do abscesso pela sua localização mais superficial e menor diâmetro. O caso ilustra uma foliculite bacteriana superficial estafilocócica centrada no folículo piloso.",
    source: "Revalida INEP",
    year: 2023
  },
  {
    subjectName: "Semiologia Médica II",
    text: "Menino de 7 anos dá entrada no pronto-atendimento com febre súbita, mialgia e a erupção cutânea demonstrada na imagem dos membros inferiores. Ao realizar a vitropressão (compressão da lesão com lâmina de vidro), o examinador observa que as manchas avermelhadas e pontiformes NÃO desaparecem. De acordo com a semiologia médica, como são classificadas essas lesões elementares por extravasamento hemático?",
    imageUrl: "/images/clinical/lesao_petequias.jpg",
    options: [
      "Eritemas figurados vasoativos com teste de vitropressão positivo",
      "Telangiectasias capilares ectásicas",
      "Petéquias (máculas hemorrágicas puntiformes com vitropressão negativa) e púrpuras",
      "Exantema morbiliforme confluente"
    ],
    correctOption: 2,
    explanation: "As lesões purpúricas e petéquias são lesões elementares planas (máculas/manchas) causadas por extravasamento de hemácias para a derme. A característica semiológica definidora é a vitropressão negativa: por se tratar de sangue fora dos vasos (intersticial), a pressão mecânica NÃO causa branqueamento (diferente dos eritemas vasoativos). Lesões pontiformes de até 2 a 3 mm são chamadas de petéquias; lesões maiores ou confluentes são classificadas como púrpuras e equimoses.",
    source: "USP",
    year: 2024
  },
  {
    subjectName: "Semiologia Médica II",
    text: "Paciente de 74 anos é admitido com lesão cutânea isolada e tensa no membro superior, medindo aproximadamente 2,5 cm de diâmetro, repleta de líquido seroso claro sobre pele eritematosa, conforme ilustrado com escala métrica. A tração tangencial da pele perilesional não causa descolamento epidérmico (Sinal de Nikolsky negativo). Qual é a definição semiológica dessa lesão elementar?",
    imageUrl: "/images/clinical/lesao_bolha.jpg",
    options: [
      "Bolha (ou flictena), caracterizada por elevação circunscrita de conteúdo líquido com diâmetro superior a 1,0 cm",
      "Vesícula simples com base atrófica",
      "Cisto epidérmico com cápsula conjuntiva",
      "Urticária com pápula edematosa evanescente"
    ],
    correctOption: 0,
    explanation: "A bolha (ou flictena) é uma lesão elementar de conteúdo líquido (seroso, purulento ou hemorrágico) que se diferencia da vesícula pelo tamanho: possui diâmetro maior que 1,0 cm (ou maior que 0,5 cm em algumas classificações clássicas). Bolhas tensas com Nikolsky negativo são típicas do Penfigoide Bolhoso (clivagem subepidérmica na junção dermoepidérmica com autoanticorpos contra hemidesmossomos BP180/BP230).",
    source: "UNICAMP",
    year: 2023
  },
  {
    subjectName: "Semiologia Médica I",
    text: "Um paciente de 35 anos apresenta lesão crônica na superfície extensora do joelho, mostrada na imagem. A lesão é elevada, plana, bem delimitada, com diâmetro de vários centímetros, recoberta por escamas prateadas e espessas. À curetagem metódica de Brocq, observa-se descolamento de escamas em lamínulas (sinal da vela) seguido de pequenos pontos de sangramento (sinal do orvalho sangrante de Auspitz). Qual é a lesão elementar e o diagnóstico?",
    imageUrl: "/images/clinical/lesao_placa_psoriase.jpg",
    options: [
      "Placa eritematodescamativa; Psoríase vulgar em placas",
      "Eczema numular exsudativo com crostas melicéricas",
      "Líquen plano com pápulas violáceas poligonais"
    ],
    correctOption: 0,
    explanation: "A placa é uma lesão elevada, em platô, cuja extensão horizontal (largura) predomina nitidamente sobre a altura/profundidade, frequentemente resultante da confluência de múltiplas pápulas. O aspecto eritematoso recoberto por escamas estratificadas esbranquiçadas em áreas extensoras (cotovelos e joelhos), associado aos sinais da vela e de Auspitz, é clássico da Psoríase em placas.",
    source: "SUS-SP",
    year: 2024
  },
  ...new15ImageQuestions,
  ...(farmacoEpidemiologiaQuestions as any),
  ...(patologiaFarmacoBasicaQuestions as any),
  ...(anatomiaHumanaQuestions as any)
];

async function main() {
  console.log("🌱 Iniciando inserção das questões de expansão...");

  // Mapear matérias existentes
  const subjects = await prisma.subject.findMany();
  const subjectMap = new Map<string, string>();
  subjects.forEach((s) => subjectMap.set(s.name, s.id));

  let inserted = 0;
  let skipped = 0;

  for (const q of expansionQuestions) {
    const normalizedName = q.subjectName === "Saúde Coletiva e Epidemiologia" ? "Saúde Coletiva & Epidemiologia" : q.subjectName;
    const subjectId = subjectMap.get(normalizedName);
    if (!subjectId) {
      console.warn(`⚠️ Matéria não encontrada: ${q.subjectName}`);
      continue;
    }

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
      inserted++;
      console.log(`✅ [${q.subjectName}] (Img: ${q.imageUrl ? "Sim" : "Não"}) ${q.text.substring(0, 45)}...`);
    } else {
      // Se a questão já existe mas agora tem imagem, atualiza o campo imageUrl
      if (q.imageUrl && !existing.imageUrl) {
        await prisma.question.update({
          where: { id: existing.id },
          data: { imageUrl: q.imageUrl },
        });
        console.log(`🖼️ [Imagem adicionada] ${q.text.substring(0, 45)}...`);
      }
      skipped++;
    }
  }

  const total = await prisma.question.count();
  console.log(`\n🎉 Inserção concluída! Inseridas: ${inserted}, Já existentes: ${skipped}`);
  console.log(`📊 TOTAL DE QUESTÕES NO BANCO AGORA: ${total}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
