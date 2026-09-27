import { ImportedQuestion } from "./questions-batch-farmaco-epidemiologia";

export const patologiaFarmacoBasicaQuestions: ImportedQuestion[] = [
  {
    subjectName: "Patologia Geral",
    period: 3,
    text: "Homem de 62 anos hipertenso de longa data não tratado apresenta ecocardiograma com aumento acentuado da espessura da parede livre e do septo do ventrículo esquerdo, sem dilatação cavitária. Do ponto de vista da patologia celular, qual mecanismo adaptativo ocorreu nos cardiomiócitos desse paciente?",
    options: [
      "Hipertrofia celular com aumento da síntese de miofilamentos e proteínas estruturais secundária à sobrecarga hemodinâmica de pressão",
      "Hiperplasia celular mediada pela reativação de células-tronco satélites miocárdicas",
      "Metaplasia de cardiomiócitos com diferenciação em tecido fibroelástico contrátil",
      "Displasia pura induzida por estresse oxidativo crônico da microvasculatura coronariana"
    ],
    correctOption: 0,
    explanation: "Os cardiomiócitos adultos são células permanentes com capacidade proliferativa praticamente nula. Em resposta à sobrecarga pressórica crônica (aumento de pós-carga na hipertensão), a resposta adaptativa clássica é a hipertrofia — aumento do volume celular por maior síntese proteica de sarcômeros —, e não hiperplasia (aumento do número de células).",
    source: "ENARE",
    year: 2023
  },
  {
    subjectName: "Patologia Geral",
    period: 3,
    text: "Mulher de 45 anos com história de refluxo gastroesofágico crônico grave (DRGE) há mais de 10 anos realiza endoscopia digestiva alta. A biópsia do terço distal do esôfago revela substituição do epitélio estratificado pavimentoso original por epitélio colunar simples mucíparo com células caliciformes (Esôfago de Barrett). Esse processo é denominado:",
    options: [
      "Metaplasia intestinal",
      "Hiperplasia regenerativa atípica",
      "Carcinoma in situ",
      "Anaplasia glandular"
    ],
    correctOption: 0,
    explanation: "A metaplasia é uma alteração reversível na qual um tipo celular adulto é substituído por outro tipo celular adulto mais adaptado ao estresse. No Esôfago de Barrett, a agressão ácida constante induz a reprogramação das células-tronco epiteliais, convertendo o epitélio escamoso em colunar mucossecretor (metaplasia intestinal), com potencial de transformação maligna para adenocarcinoma.",
    source: "USP",
    year: 2024
  },
  {
    subjectName: "Patologia Geral",
    period: 3,
    text: "Durante a resposta inflamatória aguda, qual evento molecular é diretamente responsável pela fase de rolamento (rolling) dos leucócitos na superfície das células endoteliais ativadas?",
    options: [
      "Interação transitória de baixa afinidade entre selectinas (E-selectina, P-selectina) e seus ligantes carboidratos sialilados (Sialil-Lewis X)",
      "Ligação estável de alta afinidade entre integrinas leucocitárias (LFA-1, Mac-1) e moléculas ICAM-1 endoteliais",
      "Ativação de quimiocinas que promovem polimerização de actina para transmigração",
      "Degradação da lâmina basal endotelial por metaloproteinases da matriz celular"
    ],
    correctOption: 0,
    explanation: "A cascata de recrutamento leucocitário inicia-se com o rolamento, mediado por ligações lábeis de baixa afinidade das selectinas (P, E e L). A adesão firme subsequente depende da ativação e alta afinidade das integrinas por ligantes da superfamília das imunoglobulinas (como ICAM-1 e VCAM-1).",
    source: "UNICAMP",
    year: 2022
  },
  {
    subjectName: "Farmacologia Básica",
    period: 4,
    text: "Na farmacocinética clínica, o conceito de 'Biodisponibilidade' (fração F) de um fármaco expressa a:",
    options: [
      "Fração do fármaco administrado que alcança inalterada a circulação sistêmica e a velocidade com que isso ocorre",
      "Taxa de ligação proteica às moléculas de albumina plasmática na fase de distribuição",
      "Velocidade com que a droga é metabolizada pelas enzimas do complexo citocromo P450",
      "Relação entre a dose tóxica mediana e a dose eficaz mediana (índice terapêutico)"
    ],
    correctOption: 0,
    explanation: "A biodisponibilidade (F) é a fração da dose administrada que atinge a circulação sistêmica na sua forma ativa e inalterada. Pela via intravenosa, a biodisponibilidade é convencionada em 100% (F = 1,0), enquanto pela via oral é comumente reduzida por absorção incompleta e metabolismo de primeira passagem hepático.",
    source: "Revalida INEP",
    year: 2023
  },
  {
    subjectName: "Farmacologia Básica",
    period: 4,
    text: "Qual é a definição farmacodinâmica de um fármaco agonista parcial?",
    options: [
      "Composto que se liga ao mesmo sítio receptor do agonista total, mas produz uma resposta submáxima (menor eficácia intrínseca), mesmo ocupando 100% dos receptores",
      "Fármaco que se liga a sítios alostéricos sem interferir na ação do agonista primário",
      "Droga que bloqueia irreversivelmente a ligação do ligante endógeno por ligações covalentes",
      "Composto que só se ativa na presença de concentrações tóxicas de antagonistas competitivos"
    ],
    correctOption: 0,
    explanation: "Um agonista parcial possui afinidade pelo receptor, mas menor eficácia intrínseca do que o agonista total (sua resposta máxima / Emax é inferior). Na presença de um agonista total em altas concentrações, o agonista parcial compete pelo receptor e pode se comportar funcionalmente como um antagonista competitivo.",
    source: "SUS-SP",
    year: 2023
  },
  {
    subjectName: "Patologia Geral",
    period: 3,
    text: "A apoptose (morte celular programada) difere da necrose clássica por apresentar como característica ultraestrutural e fisiopatológica predominante:",
    options: [
      "Condensação cromatínica com formação de corpos apoptóticos contendo membrana íntegra, sem deflagrar reação inflamatória tecidual adjacente",
      "Ruptura precoce da membrana plasmática com extravasamento do conteúdo intracelular e infiltrado neutrofílico maciço",
      "Lise enzimática primária por ação maciça de enzimas lisossômicas lisantes",
      "Edema celular túrgido generalizado com colapso da homeostase iônica e calcificação distrófica"
    ],
    correctOption: 0,
    explanation: "A apoptose é um processo regulado de suicídio celular mediado por caspases, no qual a célula fragmenta seu DNA e encolhe, gerando corpos apoptóticos delimitados por membrana intacta. Esses corpos expressam fosfatidilserina na superfície e são rapidamente fagocitados por macrófagos, sem vazamento enzimático e sem desencadear processo inflamatório.",
    source: "ENARE",
    year: 2024
  },
  {
    subjectName: "Farmacologia Básica",
    period: 4,
    text: "Um paciente em uso crônico de Varfarina inicia tratamento empírico para infecção fúngica com Fluconazol. Após cinco dias, dá entrada no pronto-socorro com hematúria macroscópica e INR de 8,5 (alvo 2,0 - 3,0). Qual foi a interação farmacológica responsável por essa complicação hemorrágica?",
    options: [
      "Inibição potente do citocromo CYP2C9 pelo fluconazol, reduzindo o metabolismo e aumentando os níveis séricos da S-varfarina ativa",
      "Indução enzimática acelerada do CYP3A4 com esgotamento dos estoques hepáticos de protrombina",
      "Deslocamento competitivo da varfarina de seus sítios de ação nos ribossomos hepáticos",
      "Inibição direta da absorção entérica de vitamina K pelo meio alcalino gerado pelo antifúngico"
    ],
    correctOption: 0,
    explanation: "A S-varfarina (isômero mais potente) é metabolizada principalmente pela isoenzima CYP2C9 do citocromo P450. O fluconazol é um potente inibidor dessa enzima; ao inibi-la, bloqueia a eliminação da varfarina, acumulando o fármaco no plasma e prolongando excessivamente o tempo de coagulação (INR muito elevado e risco grave de sangramento).",
    source: "USP",
    year: 2022
  },
  {
    subjectName: "Patologia Geral",
    period: 3,
    text: "Em um paciente com pancreatite aguda necrosante, observa-se na cavidade peritoneal a presença de pequenas placas esbranquiçadas e opacas no omento e mesentério ('pingos de vela'). Esse achado decorre da formação de sabões de cálcio após a hidrólise de triglicerídeos por lipases ativadas, configurando o tipo de necrose denominado:",
    options: [
      "Necrose esteatóxica ou gordurosa (enzimática)",
      "Necrose fibrinoide",
      "Necrose liquefativa",
      "Necrose caseosa"
    ],
    correctOption: 0,
    explanation: "A necrose gordurosa (ou esteatonecrose) ocorre quando lipases pancreáticas extravasadas digerem os adipócitos no mesentério e retroperitônio. Os ácidos graxos livres liberados combinam-se com íons cálcio circulantes, formando precipitados brancos e opacos semelhantes a giz ou pingos de vela (saponificação da gordura).",
    source: "UNICAMP",
    year: 2023
  },
  {
    subjectName: "Farmacologia Básica",
    period: 4,
    text: "Os anti-inflamatórios não esteroidais (AINEs) não seletivos, como o Cetoprofeno e o Ibuprofeno, inibem a ciclo-oxigenase 1 (COX-1) e a ciclo-oxigenase 2 (COX-2). Qual prostaglandina protetora gástrica tem sua síntese suprimida pela inibição da COX-1, predispondo à formação de úlceras pépticas?",
    options: [
      "Prostaglandina E2 (PGE2) e Prostaciclina (PGI2)",
      "Tromboxano A2 (TXA2)",
      "Leucotrieno B4 (LTB4)",
      "Fator ativador de plaquetas (PAF)"
    ],
    correctOption: 0,
    explanation: "A COX-1 constitutiva na mucosa gástrica produz continuamente PGE2 e PGI2 (prostaciclina), mediadores que estimulam a secreção de muco protetor e bicarbonato, mantêm o fluxo sanguíneo da mucosa e inibem a secreção basal de ácido clorídrico pelas células parietais. A inibição dessa via pelos AINEs remove essa barreira protetora, gerando gastrite e úlceras.",
    source: "Revalida INEP",
    year: 2021
  },
  {
    subjectName: "Patologia Geral",
    period: 3,
    text: "Um homem de 30 anos com glomerulonefrite aguda exibe deposição de imunocomplexos nas paredes arteriolares glomerulares. À microscopia óptica com coloração por hematoxilina-eosina, as paredes vasculares mostram aspecto amorfo, brilhante e róseo intenso (hipereosinofílico), com extravasamento de proteínas plasmáticas. Esse padrão define a:",
    options: [
      "Necrose fibrinoide",
      "Necrose gomosa",
      "Degeneração hialina intracelular de Mallory-Denk",
      "Calcificação metastática"
    ],
    correctOption: 0,
    explanation: "A necrose fibrinoide é uma forma especial de lesão vascular observada em reações imunes mediadas por imunocomplexos (como na poliarterite nodosa e vasculites sistêmicas) ou em hipertensão arterial maligna. Complexos antígeno-anticorpo depositam-se nas paredes arteriais juntamente com fibrina extravasada, conferindo aspecto histológico eosinofílico borrado denominado fibrinoide.",
    source: "SUS-SP",
    year: 2022
  },
  {
    subjectName: "Farmacologia Básica",
    period: 4,
    text: "Qual o mecanismo de ação dos antimicrobianos da classe dos beta-lactâmicos (ex.: Penicilinas e Cefalosporinas)?",
    options: [
      "Inibição da síntese da parede celular bacteriana por ligação e bloqueio das enzimas transpeptidases (Proteínas Ligadoras de Penicilina - PBPs)",
      "Inibição da subunidade 50S dos ribossomos bacterianos bloqueando a translocação de peptídeos",
      "Inibição da DNA-girase (topoisomerase II) e topoisomerase IV bacterianas",
      "Despolarização dependente de cálcio da membrana plasmática externa bacteriana"
    ],
    correctOption: 0,
    explanation: "Os antibióticos beta-lactâmicos ligam-se covalentemente ao sítio catalítico das PBPs (Penicillin-Binding Proteins / transpeptidases), enzimas responsáveis pela ligação cruzada das cadeias de peptidoglicano que formam a parede celular bacteriana rígida. Sem essa malha, a bactéria sofre lise osmótica.",
    source: "ENARE",
    year: 2023
  },
  {
    subjectName: "Patologia Geral",
    period: 3,
    text: "Qual das seguintes citocinas é o principal mediador pró-inflamatório endógeno responsável por induzir a resposta de fase aguda sistêmica, incluindo febre no hipotálamo, síntese hepática de proteína C-reativa (PCR) e catabolismo muscular (caquexia)?",
    options: [
      "Fator de Necrose Tumoral alfa (TNF-alfa) e Interleucina-1 (IL-1)",
      "Interleucina-10 (IL-10)",
      "Fator de Crescimento Transformador beta (TGF-beta)",
      "Interferon-gama (IFN-gama) puramente"
    ],
    correctOption: 0,
    explanation: "O TNF-alfa e a IL-1, produzidos principalmente por macrófagos e células dendríticas ativadas por PAMPs/DAMPs, são os pilares da inflamação sistêmica: atuam no hipotálamo induzindo síntese de PGE2 (febre), estimulam os hepatócitos a produzir proteínas de fase aguda (PCR, fibrinogênio, amiloide A) e ativam leucócitos e endotélio.",
    source: "USP",
    year: 2023
  },
  {
    subjectName: "Farmacologia Básica",
    period: 4,
    text: "A atropina é um clássico agente anticolinérgico. Seu efeito farmacológico primário é classificado como:",
    options: [
      "Antagonista competitivo reversível dos receptores muscarínicos da acetilcolina",
      "Bloqueador neuromuscular não despolarizante da placa motora esquelética",
      "Agonista seletivo dos receptores colinérgicos nicotínicos ganglionares",
      "Inibidor reversível da enzima acetilcolinesterase"
    ],
    correctOption: 0,
    explanation: "A atropina é um antagonista competitivo dos receptores muscarínicos colinérgicos (M1 a M5). Ela bloqueia os efeitos da acetilcolina liberada pelo sistema nervoso parassimpático, causando taquicardia (bloqueio de M2 no nodo SA), broncodilatação, midríase e redução de secreções salivares e gástricas.",
    source: "UNICAMP",
    year: 2024
  },
  {
    subjectName: "Patologia Geral",
    period: 3,
    text: "A diferença histopatológica fundamental entre um granuloma imune (como na tuberculose) e um granuloma por corpo estranho (como ao redor de fios de sutura inabsorvíveis) consiste na presença obrigatória de:",
    options: [
      "Resposta imune adaptativa mediada por linfócitos T auxiliares (Th1), que ativam macrófagos via secreção de IFN-gama",
      "Depósitos maciços de amiloide e imunoglobulina E",
      "Polimorfonucleares neutrófilos em proliferação neoplásica",
      "Ausência completa de células gigantes multinucleadas"
    ],
    correctOption: 0,
    explanation: "O granuloma imune decorre de uma reação de hipersensibilidade do tipo IV (tardia) celular: linfócitos T sensibilizados produzem citocinas (sobretudo IFN-gama) que ativam intensamente macrófagos, diferenciando-os em células epitelioides e células gigantes multinucleadas (tipo Langhans). Já os granulomas por corpo estranho formam-se em torno de partículas inertes na ausência de resposta imune mediada por células T.",
    source: "Revalida INEP",
    year: 2022
  },
  {
    subjectName: "Farmacologia Básica",
    period: 4,
    text: "Qual é a via intracelular de transdução de sinal ativada pelo salbutamol (agonista beta-2 adrenérgico inalatório) para promover o relaxamento do músculo liso brônquico no tratamento da asma?",
    options: [
      "Ativação da proteína Gs, aumento dos níveis de AMP cíclico (AMPc) e ativação da PKA, que inibe a quinase da cadeia leve da miosina (MLCK)",
      "Ativação da proteína Gq, clivagem de PIP2 em IP3 e DAG com liberação de cálcio intracelular",
      "Abertura de canais de sódio voltagem-dependentes despolarizando a membrana brônquica",
      "Inibição da fosfodiesterase tipo 5 impedindo a degradação de GMPc"
    ],
    correctOption: 0,
    explanation: "Os receptores beta-2 adrenérgicos no músculo liso brônquico são acoplados à proteína Gs. Sua estimulação ativa a adenilato ciclase, elevando o AMPc intracelular e ativando a PKA. A PKA fosforila e inativa a MLCK (quinase da cadeia leve da miosina) e estimula o sequestro de Ca2+ de volta ao retículo sarcoplasmático, resultando em potente broncodilatação.",
    source: "SUS-SP",
    year: 2024
  },
  {
    subjectName: "Patologia Geral",
    period: 3,
    text: "A calcificação patológica que ocorre em tecidos previamente lesados ou necrosados, na presença de níveis séricos RIGOROSAMENTE NORMAIS de cálcio e fosfato, é denominada:",
    options: [
      "Calcificação distrófica",
      "Calcificação metastática",
      "Calcificação idiopática de Fahr",
      "Calcinose tumoral congênita"
    ],
    correctOption: 0,
    explanation: "A calcificação distrófica ocorre localmente em áreas de necrose tecidual (coagulativa, caseosa ou enzimática) e aterosclerose em pacientes com calcemia normal. Em contrapartida, a calcificação metastática ocorre em tecidos sadios decorrente de distúrbio metabólico sistêmico com hipercalcemia (como no hiperparatireoidismo ou mieloma múltiplo).",
    source: "ENARE",
    year: 2021
  },
  {
    subjectName: "Farmacologia Básica",
    period: 4,
    text: "Por que a administração concomitante de adrenalina com lidocaína em anestesias locais de pequenos procedimentos cirúrgicos é uma prática clínica vantajosa (respeitadas as contraindicações em extremidades distais)?",
    options: [
      "A adrenalina promove vasoconstrição local (ação alfa-1), reduzindo a velocidade de absorção sistêmica do anestésico, prolongando seu tempo de ação e reduzindo sua toxicidade plasmática",
      "A adrenalina impede a metabolização do anestésico pelas colinesterases plasmáticas circulantes",
      "A adrenalina atua sinergicamente abrindo os canais de sódio nos neurônios sensoriais nociceptivos",
      "A adrenalina neutraliza o pH ácido do anestésico local, diminuindo a dor no momento da infiltração"
    ],
    correctOption: 0,
    explanation: "A adrenalina atua nos receptores alfa-1 adrenérgicos do leito vascular local produzindo vasoconstrição intensa. Isso retarda a absorção da lidocaína para a corrente sanguínea, mantendo o anestésico concentrado no local da incisão por mais tempo, diminuindo o sangramento do campo cirúrgico e minimizando riscos de toxicidade no sistema nervoso central.",
    source: "USP",
    year: 2021
  },
  {
    subjectName: "Patologia Geral",
    period: 3,
    text: "Na cicatrização de feridas por primeira e segunda intenção, o tecido de granulação é a matriz provisória vascularizada formada na fase proliferativa. Quais são os seus dois componentes histológicos característicos fundamentais?",
    options: [
      "Proliferação de novos capilares de paredes finas (angiogênese) e fibroblastos ativados sintetizando colágeno tipo III e proteoglicanos",
      "Infiltrado denso de neutrófilos polimorfonucleares e placas de necrose gomosa",
      "Deposição madura de feixes espessos e acentuados de colágeno tipo I acelular",
      "Formação de folículos linfoides secundários com centros germinativos reativos"
    ],
    correctOption: 0,
    explanation: "O tecido de granulação é o marco da regeneração tecidual e caracteriza-se por intensa neoangiogênese (formação de novos capilares por proliferação de células endoteliais sob estímulo de VEGF) e invasão de fibroblastos (estimulados por TGF-beta e PDGF) que depositam matriz extracelular frouxa com colágeno tipo III.",
    source: "UNICAMP",
    year: 2023
  },
  {
    subjectName: "Farmacologia Básica",
    period: 4,
    text: "Em um paciente com insuficiência renal crônica com taxa de filtração glomerular reduzida (TFG < 30 mL/min), qual parâmetro farmacocinético é o mais diretamente alterado para fármacos que dependem de excreção renal inalterada, exigindo ajuste de dose ou espaçamento de intervalos?",
    options: [
      "Clearance ou depuração plasmática do fármaco (Cl), levando a prolongamento da meia-vida de eliminação (t1/2)",
      "Volume de distribuição aparente inicial exclusivamente",
      "Velocidade de absorção entérica na mucosa duodenal",
      "Constante de afinidade intrínseca pelos receptores periféricos"
    ],
    correctOption: 0,
    explanation: "A depuração renal (clearance) cai proporcionalmente à redução da TFG. Como a meia-vida de eliminação (t1/2) é inversamente proporcional ao clearance (t1/2 = 0,693 x Vd / Cl), a redução da depuração renal prolonga a meia-vida, acumulando a droga no organismo caso a dose de manutenção não seja ajustada.",
    source: "Revalida INEP",
    year: 2024
  },
  {
    subjectName: "Patologia Geral",
    period: 3,
    text: "Homem de 55 anos etilista inveterado apresenta esteatose hepática maciça ('fígado gorduroso'). O mecanismo fisiopatológico primário que leva ao acúmulo intracelular patológico de lipídios no citoplasma dos hepatócitos decorre do(a):",
    options: [
      "Aumento da síntese de triglicerídeos e redução da síntese ou secreção de apolipoproteínas necessárias para exportar as lipoproteínas (VLDL)",
      "Fagocitose aumentada de quilomícrons pelas células de Kupffer ativadas",
      "Degradação das mitocôndrias mediada pelo excesso de glicogênio armazenado",
      "Deficiência congênita pura da enzima lipoproteína lipase endotelial"
    ],
    correctOption: 0,
    explanation: "O metabolismo do etanol gera excesso de NADH, o que estimula a síntese de ácidos graxos e inibe a beta-oxidação mitocondrial. Além disso, o acetaldeído e o estresse oxidativo reduzem a síntese proteica de apoproteínas (apolipoproteína B), impedindo que o fígado empacote os triglicerídeos na forma de VLDL e os exporte para o plasma, acumulando vacúolos lipídicos nos hepatócitos.",
    source: "SUS-SP",
    year: 2023
  },
  {
    subjectName: "Farmacologia Básica",
    period: 4,
    text: "Qual das seguintes classes de fármacos anti-hipertensivos atua primariamente inibindo a recaptação de íons Na+ e Cl- no túbulo contorcido distal renal, sendo primeira linha no tratamento da hipertensão arterial primária?",
    options: [
      "Diuréticos tiazídicos (ex.: Hidroclorotiazida, Clortalidona)",
      "Diuréticos de alça (ex.: Furosemida)",
      "Antagonistas dos receptores de mineralocorticoides (ex.: Espironolactona)",
      "Inibidores da anidrase carbônica (ex.: Acetazolamida)"
    ],
    correctOption: 0,
    explanation: "Os diuréticos tiazídicos inibem o cotransportador Na+/Cl- (NCC) na membrana luminal das células do túbulo contorcido distal. Isso aumenta a excreção urinária de sódio e água, reduzindo o volume intravascular a curto prazo e promovendo vasodilatação arteriolar a longo prazo.",
    source: "ENARE",
    year: 2024
  },
  {
    subjectName: "Patologia Geral",
    period: 3,
    text: "A transição de um epitélio normal para uma neoplasia maligna invasora envolve alterações graduais de displasia. A displasia de alto grau é caracterizada histologicamente por:",
    options: [
      "Perda acentuada da polaridade celular, pleomorfismo nuclear pronunciado, núcleos hipercromáticos aumentados e mitoses atípicas em todos os terços do epitélio, mas com lâmina basal intacta",
      "Invasão franca de vasos linfáticos na derme ou submucosa profunda",
      "Substituição completa do epitélio por metaplasia escamosa madura sem atipias nucleares",
      "Proliferação de tecido fibroconjuntivo denso sem alterações na arquitetura celular superficial"
    ],
    correctOption: 0,
    explanation: "A displasia caracteriza-se por crescimento desordenado e atipias citológicas (pleomorfismo, hipercromatismo, núcleos volumosos, desorganização arquitetural e figuras de mitose anômalas). Enquanto a lâmina basal estiver anatomicamente íntegra e não ultrapassada, a lesão é intraepitelial (carcinoma in situ / displasia de alto grau), sem invasão estromal.",
    source: "USP",
    year: 2022
  },
  {
    subjectName: "Farmacologia Básica",
    period: 4,
    text: "Mulher de 28 anos asmática necessita de antibioticoterapia ambulatorial para pneumonia adquirida na comunidade. Seu médico prescreve Azitromicina. Qual é o mecanismo de ação molecular dos macrolídeos contra patógenos bacterianos?",
    options: [
      "Ligação reversível à subunidade ribossômica 50S, inibindo a síntese de proteínas por bloqueio da etapa de translocação do peptídeo",
      "Ligação à subunidade 30S do ribossomo promovendo leitura incorreta do código genético",
      "Bloqueio da síntese do ácido fólico através da inibição da di-hidrofolato redutase",
      "Lise da membrana plasmática através de formação de poros dependentes de colistina"
    ],
    correctOption: 0,
    explanation: "Os macrolídeos (azitromicina, claritromicina, eritromicina) são antimicrobianos bacteriostáticos que se ligam reversivelmente à subunidade 50S do ribossomo bacteriano (próximo ao centro da peptidiltransferase), bloqueando a elongação da cadeia peptídica por inibição da translocação.",
    source: "UNICAMP",
    year: 2021
  },
  {
    subjectName: "Patologia Geral",
    period: 3,
    text: "O choque séptico refratário caracteriza-se por hipotensão grave persistente não responsiva à reposição volêmica. Qual mediador inflamatório de fase tardia é produzido maciçamente pelas células endoteliais e musculares vasculares estimuladas por citocinas, provocando perda profunda do tônus vascular arterial?",
    options: [
      "Óxido Nítrico (NO), sintetizado via expressão induzida da enzima óxido nítrico sintase (iNOS)",
      "Tromboxano A2 (TXA2) produzido por plaquetas agregadas",
      "Endotelina-1 sintetizada pelos corpos de Weibel-Palade",
      "Leucotrieno C4 liberado por mastócitos teciduais"
    ],
    correctOption: 0,
    explanation: "Na sepse, endotoxinas bacterianas (LPS) e citocinas inflamatórias (TNF, IL-1, IFN-gama) induzem a expressão da isoforma induzível da óxido nítrico sintase (iNOS) nas células musculares lisas vasculares. A produção maciça e desregulada de óxido nítrico gera relaxamento muscular generalizado, vasodilatação arteriolar sistêmica severa e colapso hemodinâmico.",
    source: "Revalida INEP",
    year: 2023
  },
  {
    subjectName: "Farmacologia Básica",
    period: 4,
    text: "Qual das seguintes alternativas descreve com precisão a farmacologia dos bloqueadores dos canais de cálcio da subclasse das DI-HIDROPIRIDINAS (ex.: Anlodipino, Nifedipino)?",
    options: [
      "Apresentam seletividade vascular acentuada, inibindo canais de cálcio tipo L no músculo liso arteriolar, promovendo vasodilatação e redução da resistência periférica com pouco efeito no nodo SA",
      "Apresentam potente efeito cronotrópico e inotrópico negativo direto no miocárdio, sendo fármacos de escolha para fibrilação atrial",
      "Atuam primariamente bloqueando receptores intracelulares de rianodina no retículo sarcoplasmático esquelético",
      "Inibem a liberação pré-sináptica de adrenalina nos gânglios paravertebrais simpáticos"
    ],
    correctOption: 0,
    explanation: "As di-hidropiridinas (como anlodipino) possuem alta seletividade pelas células musculares lisas dos vasos sanguíneos arteriolares em comparação aos miócitos cardíacos. Promovem potente vasodilatação periférica sem causar depressão significativa da contratilidade ou da condução atrioventricular (diferente dos não di-hidropiridínicos como verapamil e diltiazem).",
    source: "SUS-SP",
    year: 2021
  },
  {
    subjectName: "Patologia Geral",
    period: 3,
    text: "A via intrínseca (mitocondrial) da apoptose é ativada em resposta a danos celulares por privação de fatores de crescimento ou lesão de DNA. O evento central desencadeador dessa via no citoplasma é o(a):",
    options: [
      "Aumento da permeabilidade da membrana mitocondrial externa regulada pela família Bcl-2, com liberação de citocromo c para o citosol",
      "Clivagem primária dos receptores de morte celular Fas/CD95 na membrana plasmática externa",
      "Inibição direta e irreversível do complexo apoptossomo pelas proteínas IAP",
      "Extrusão massiva de cálcio para o meio extracelular através de trocadores eletrogênicos"
    ],
    correctOption: 0,
    explanation: "A via mitocondrial intrínseca é governada pelo equilíbrio entre proteínas pró-apoptóticas (Bax, Bak) e anti-apoptóticas (Bcl-2, Bcl-xL). Quando há dano ao DNA ou estresse, Bax e Bak formam canais na membrana mitocondrial externa, liberando citocromo c no citosol, que interage com Apaf-1 para formar o apoptossomo e clivar a caspase-9 iniciadora.",
    source: "ENARE",
    year: 2022
  },
  {
    subjectName: "Farmacologia Básica",
    period: 4,
    text: "O omeprazol e os demais inibidores da bomba de prótons (IBPs) são pró-fármacos que requerem ativação em meio ácido. Seu mecanismo definitivo de ação nas células parietais do estômago consiste em:",
    options: [
      "Inibição irreversível por ligação covalente da enzima H+/K+-ATPase na membrana canalicular apical",
      "Bloqueio competitivo reversível dos receptores histaminérgicos H2 basolaterais",
      "Neutralização físico-química direta do ácido clorídrico já secretado no lúmen gástrico",
      "Inibição da síntese de gastrina pelas células G antrais"
    ],
    correctOption: 0,
    explanation: "Os IBPs são bases fracas lipofílicas que se acumulam nos canalículos secretores ácidos das células parietais gástricas. Lá, são protonados e convertidos em derivados sulfonamidas reativos que formam pontes dissulfeto covalentes com resíduos de cisteína da H+/K+-ATPase, inibindo de forma irreversível a etapa final da secreção ácida.",
    source: "USP",
    year: 2023
  },
  {
    subjectName: "Patologia Geral",
    period: 3,
    text: "A formação de um trombo venoso obstrutivo profundo nos membros inferiores é classicamente explicada pela Tríade de Virchow. Quais são os três pilares que compõem essa tríade?",
    options: [
      "Lesão endotelial, estase ou turbulência no fluxo sanguíneo e hipercoagulabilidade sanguínea",
      "Hipertensão arterial sistêmica, dislipidemia mista e hipopotassemia",
      "Hipoalbuminemia severa, necrose de coagulação e ativação de macrófagos",
      "Alergia medicamentosa, estase linfática e fragilidade capilar congênita"
    ],
    correctOption: 0,
    explanation: "Descrita no século XIX, a Tríade de Virchow reúne os três determinantes primários da trombogênese intravascular: 1) Lesão/disfunção endotelial; 2) Alterações no padrão do fluxo sanguíneo normal (estase venosa ou turbilhonamento arterial); e 3) Hipercoagulabilidade do sangue (estados protrombóticos primários ou adquiridos).",
    source: "UNICAMP",
    year: 2022
  },
  {
    subjectName: "Farmacologia Básica",
    period: 4,
    text: "Qual das seguintes alterações eletrocardiográficas e metabólicas é um efeito adverso característico do uso de doses elevadas de diuréticos de alça (como a Furosemida)?",
    options: [
      "Hipocalemia, hipomagnesemia e alcalose metabólica",
      "Hipercalemia com ondas T apiculadas e acidose metabólica hiperclorêmica",
      "Hipercalcemia grave associada a bradicardia sinusal reflexa",
      "Hipoglicemia sustentada refratária ao glucagon"
    ],
    correctOption: 0,
    explanation: "A furosemida inibe o cotransportador Na+/K+/2Cl- na alça de Henle espessa ascendente, abolindo o gradiente de potencial lúmen-positivo que promove a reabsorção paracelular de Ca2+ e Mg2+. A maior oferta de sódio ao néfron distal estimula a secreção de K+ e H+, resultando em hipocalemia, hipomagnesemia e alcalose metabólica hipoclorêmica.",
    source: "Revalida INEP",
    year: 2022
  },
  {
    subjectName: "Patologia Geral",
    period: 3,
    text: "A amiloidose sistêmica é uma doença do enovelamento proteico incorreto. O diagnóstico histopatológico padrão-ouro em biópsia tecidual baseia-se na identificação de agregados proteicos amorfos que exibem birrefringência verde-maçã à luz polarizada sob coloração com:",
    options: [
      "Vermelho Congo",
      "Azul de Prússia (coloração de Perls)",
      "Ácido Periódico de Schiff (PAS)",
      "Tricrômico de Masson"
    ],
    correctOption: 0,
    explanation: "Os depósitos de fibrilas amiloides assumem uma configuração em folhas beta-pregueadas antiparalelas. Quando corados pelo corante Vermelho Congo e examinados sob microscópio de luz polarizada, esses agregados exibem a birrefringência verde-maçã patognomônica.",
    source: "SUS-SP",
    year: 2024
  },
  {
    subjectName: "Farmacologia Básica",
    period: 4,
    text: "O paracetamol (acetaminofeno) em doses terapêuticas é metabolizado por conjugação hepática com glicuronídeo e sulfato. Contudo, em superdosagens tóxicas agudas, a saturação dessas vias gera acúmulo de um metabólito altamente reativo e hepatotóxico denominado NAPQI. Qual fármaco atua como antídoto repondo estoques de glutationa?",
    options: [
      "N-acetilcisteína",
      "Desferoxamina",
      "Azul de metileno",
      "Pralidoxima"
    ],
    correctOption: 0,
    explanation: "Em doses maciças, o citocromo P450 (CYP2E1) desvia o paracetamol para a síntese do intermediário eletrofílico reativo NAPQI (N-acetil-p-benzoquinona imina), que esgota a glutationa hepática e causa necrose centrolobular aguda. A N-acetilcisteína atua fornecendo grupos cisteína para a regeneração rápida da glutationa e neutralização direta do NAPQI.",
    source: "ENARE",
    year: 2023
  },
  {
    subjectName: "Patologia Geral",
    period: 3,
    text: "Qual das seguintes alterações genéticas e proteicas é o achado mais frequente no câncer humano, conferindo às células malignas resistência à apoptose por perda da parada do ciclo celular na fase G1 após dano genotóxico?",
    options: [
      "Mutação inativadora bialélica do gene supressor de tumor TP53 (proteína p53)",
      "Amplificação excessiva do proto-oncogene c-KIT na linhagem mieloide",
      "Mutações ativadoras no receptor de fator de crescimento de fibroblastos tipo 3",
      "Deleção monossômica isolada do cromossomo 21"
    ],
    correctOption: 0,
    explanation: "O gene TP53, conhecido como 'o guardião do genoma', codifica a proteína p53. Em resposta ao estresse oxidativo ou dano no DNA, a p53 interrompe o ciclo celular na transição G1/S através de p21 para permitir o reparo do DNA ou, se o dano for irreparável, deflagra a apoptose celular via Bax. Sua perda de função é a mutação mais comum em neoplasias humanas.",
    source: "USP",
    year: 2024
  },
  {
    subjectName: "Farmacologia Básica",
    period: 4,
    text: "As estatinas (ex.: Atorvastatina, Sinvastatina) constituem a base farmacológica do tratamento da hipercolesterolemia e prevenção cardiovascular secundária. Qual é o mecanismo de ação molecular dessas drogas?",
    options: [
      "Inibição competitiva da enzima HMG-CoA redutase, reduzindo a síntese hepática de colesterol e aumentando a expressão de receptores de LDL nos hepatócitos",
      "Inibição direta da proteína transportadora NPC1L1 na borda em escova do enterócito",
      "Ligação insolúvel aos ácidos biliares no lúmen ileal forçando sua excreção fecal",
      "Inibição da lipase de lipoproteínas periféricas nos capilares adiposos"
    ],
    correctOption: 0,
    explanation: "As estatinas inibem competitivamente a enzima 3-hidroxi-3-metilglutaril-coenzima A (HMG-CoA) redutase, a etapa limitante da síntese de colesterol endógeno no fígado. A queda do colesterol intracelular ativa os fatores de transcrição SREBP-2, provocando up-regulation (aumento) de receptores de LDL na superfície hepática, que limpam avidamente o LDL do sangue.",
    source: "UNICAMP",
    year: 2023
  },
  {
    subjectName: "Patologia Geral",
    period: 3,
    text: "Durante o processo de angiogênese tumoral e reparação tecidual, qual fator solúvel de crescimento desempenha o papel mais potente e indispensável no estímulo à proliferação, migração e formação de brotamentos vasculares por células endoteliais?",
    options: [
      "Fator de Crescimento do Endotélio Vascular (VEGF)",
      "Fator Transformador de Crescimento alfa (TGF-alfa)",
      "Interleucina-6 (IL-6)",
      "Fator Estimulador de Colônias de Granulócitos (G-CSF)"
    ],
    correctOption: 0,
    explanation: "O VEGF (Fator de Crescimento do Endotélio Vascular) é o regulador fisiológico e patológico mais importante da neoangiogênese. Sua expressão é ativada em resposta à hipóxia através do fator de transcrição HIF-1alfa, induzindo dilatação de vasos preexistentes, proliferação e migração endotelial.",
    source: "Revalida INEP",
    year: 2021
  },
  {
    subjectName: "Farmacologia Básica",
    period: 4,
    text: "O uso de aminoglicosídeos (como Gentamicina e Amicacina) em infecções bacterianas graves por bacilos Gram-negativos exige monitorização cuidadosa em virtude de seus dois principais efeitos adversos característicos dependentes de dose e tempo de exposição, que são:",
    options: [
      "Nefrotoxicidade (necrose tubular aguda) e Ototoxicidade irreversível (vestibular e coclear)",
      "Mielossupressão aplástica pura e síndrome do bebê cinzento",
      "Hepatite colestática fulminante e anemia hemolítica microangiopática",
      "Hipertensão intracraniana idiopática e neuropatia óptica retrobulbar"
    ],
    correctOption: 0,
    explanation: "Os aminoglicosídeos acumulam-se no córtex renal (nos túbulos proximais) e nas células ciliadas sensoriais do labirinto e da cóclea no ouvido interno, gerando estresse oxidativo e apoptose. Isso resulta no clássico binômio de toxicidade: nefrotoxicidade (geralmente reversível) e ototoxicidade (frequentemente irreversível com perda auditiva e desequilíbrio).",
    source: "SUS-SP",
    year: 2023
  },
  {
    subjectName: "Patologia Geral",
    period: 3,
    text: "Qual das seguintes alterações constitui a base biológica para a formação de um transudato seroso puro (em contraste com um exsudato inflamatório)?",
    options: [
      "Aumento da pressão hidrostática intravascular ou redução da pressão coloidosmótica do plasma, com integridade preservada da permeabilidade vascular endotelial",
      "Aumento acentuado da permeabilidade endotelial mediado por histamina, leucotrienos e cininas",
      "Erosão neoplásica das paredes capilares com sangramento e acúmulo de fibrina",
      "Infiltração direta de neutrófilos ativados com digestão proteolítica da lâmina basal"
    ],
    correctOption: 0,
    explanation: "O transudato é um fluido extravascular com baixo teor proteico (< 3,0 g/dL) e baixa celularidade, decorrente de desequilíbrios hemodinâmicos sistêmicos (ex.: elevação da pressão hidrostática na insuficiência cardíaca ou queda da pressão oncótica na cirrose/síndrome nefrótica), sem alteração da permeabilidade endotelial. O exsudato, típico da inflamação, apresenta alto teor proteico e celular por quebra da barreira microvascular.",
    source: "ENARE",
    year: 2024
  },
  {
    subjectName: "Farmacologia Básica",
    period: 4,
    text: "A espironolactona é um diurético poupador de potássio amplamente utilizado na insuficiência cardíaca com fração de ejeção reduzida. Seu mecanismo farmacológico fundamental consiste em:",
    options: [
      "Antagonismo competitivo dos receptores intracelulares de mineralocorticoides (aldosterona) nas células principais do ducto coletor",
      "Bloqueio dos canais epiteliais de sódio (ENaC) na membrana apical por mecanismo independente de receptor",
      "Inibição enzimática da renina no aparelho justaglomerular renal",
      "Aumento seletivo da síntese de prostaglandinas vasodilatadoras nas arteríolas aferentes"
    ],
    correctOption: 0,
    explanation: "A espironolactona compete com a aldosterona por seus receptores citoplasmáticos de mineralocorticoides nas células principais do túbulo coletor cortical. O complexo bloqueado impede a transcrição gênica e a translocação de canais ENaC e da bomba Na+/K+-ATPase, promovendo natriurese branda e retenção de potássio e íons H+.",
    source: "USP",
    year: 2021
  },
  {
    subjectName: "Patologia Geral",
    period: 3,
    text: "Em um paciente com asma alérgica crônica grave, qual população de células do sistema imune inato e qual mediador pré-formado liberado na degranulação primária desencadeiam o broncoespasmo agudo e a hipersecreção de muco após contato com alérgenos?",
    options: [
      "Mastócitos sensibilizados por IgE que degranulam histamina e fator quimiotático de eosinófilos",
      "Macrófagos M1 liberando interleucina-12 e interferon-gama",
      "Linfócitos T CD8+ citotóxicos secretando granzimas e perfurinas",
      "Células Natural Killer (NK) que liberam fator de necrose tumoral beta"
    ],
    correctOption: 0,
    explanation: "Na hipersensibilidade do tipo I (imediata), alérgenos ligam-se e realizam a ligação cruzada de moléculas de IgE pré-acopladas aos receptores Fc-epsilon-RI de alta afinidade na superfície de mastócitos e basófilos. Isso induz despolarização e exocitose rápida de grânulos contendo histamina, heparina e proteases, deflagrando broncoconstrição e edema.",
    source: "UNICAMP",
    year: 2024
  },
  {
    subjectName: "Farmacologia Básica",
    period: 4,
    text: "A metformina é o antidiabético oral de primeira linha para o diabetes mellitus tipo 2. Seu principal mecanismo primário de ação molecular envolve a:",
    options: [
      "Ativação da proteína quinase ativada por AMP (AMPK), levando à inibição da gliconeogênese e da glicogenólise hepáticas",
      "Estimulação direta do fechamento dos canais de K-ATP nas células beta pancreáticas liberando insulina",
      "Inibição competitiva do cotransportador sódio-glicose tipo 2 (SGLT2) no túbulo proximal renal",
      "Inativação da enzima dipeptidil peptidase-4 (DPP-4) prolongando a meia-vida do GLP-1"
    ],
    correctOption: 0,
    explanation: "A metformina (uma biguanida) atua inibindo o complexo I da cadeia respiratória mitocondrial nos hepatócitos, o que eleva a relação AMP/ATP intracelular e ativa a enzima AMPK (AMP-activated protein kinase). Isso suprime os genes da gliconeogênese hepática, reduz a produção basal de glicose pelo fígado e melhora a sensibilidade periférica à insulina.",
    source: "Revalida INEP",
    year: 2023
  },
  {
    subjectName: "Patologia Geral",
    period: 3,
    text: "O que caracteriza morfologicamente e funcionalmente o conceito de Anaplasia na patologia das neoplasias?",
    options: [
      "Falta total de diferenciação celular e arquitetural, marcando o caráter indiferenciado de tumores altamente malignos e agressivos",
      "Substituição reversível de um epitélio maduro por outro de linhagem celular similar",
      "Aumento moderado da taxa mitótica sem alteração na morfologia dos nucléolos",
      "Depósito difuso de material hialino no interior de células pré-senescentes"
    ],
    correctOption: 0,
    explanation: "A anaplasia (literalmente 'formar para trás') é o marco patológico definitivo de malignidade franca e perda de diferenciação celular. Células anaplásicas exibem pleomorfismo extremo, núcleos gigantes e monstruosos, hipercromatismo acentuado, figuras de mitose atípicas bizarras e perda total da polaridade e da função do tecido de origem.",
    source: "SUS-SP",
    year: 2022
  }
];
