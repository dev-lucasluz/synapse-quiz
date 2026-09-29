import type { ImageQuestionSeed } from "./new-image-questions";

/**
 * 30 questões inéditas com imagem (lote 2). Imagens reais de acervos livres (Wikimedia Commons),
 * com créditos em src/lib/image-credits.ts e na página /creditos.
 */
export const imageQuestionsBatch2: ImageQuestionSeed[] = [
  {
    "subjectName": "Diagnóstico por Imagem",
    "text": "Homem de 67 anos, tabagista, procura o pronto atendimento com febre de 39 °C, tosse produtiva e dor torácica ventilatório-dependente há 3 dias. Ao exame, há crepitações e macicez à percussão em hemitórax direito. A radiografia de tórax em incidência PA está apresentada na figura, com opacidade homogênea de distribuição lobar junto à borda cardíaca direita, que se apresenta borrada. Assinale a alternativa que identifica corretamente o lobo acometido e o sinal radiológico que sustenta essa localização:",
    "options": [
      "Lobo médio direito; a consolidação apaga a borda cardíaca direita (sinal da silhueta).",
      "Lobo inferior direito; a consolidação apaga o contorno da cúpula diafragmática direita (sinal da silhueta).",
      "Língula; a consolidação apaga a borda cardíaca direita (sinal da silhueta).",
      "Lobo superior direito; a consolidação desloca a fissura horizontal para baixo (sinal do S de Golden)."
    ],
    "correctOption": 0,
    "explanation": "O sinal da silhueta ocorre quando duas estruturas de mesma densidade em contato perdem seus limites na radiografia. A borda cardíaca direita é contígua ao lobo médio: a consolidação desse lobo borra o contorno cardíaco direito. A do lobo inferior direito apaga a cúpula diafragmática direita e preserva a borda cardíaca, e a da língula (lobo superior esquerdo) apaga a borda cardíaca esquerda. O sinal do S de Golden refere-se a atelectasia do lobo superior por massa central, não a consolidação pneumônica. O quadro (febre, tosse produtiva, dor pleurítica, macicez) é de pneumonia adquirida na comunidade típica, cujo principal agente é o Streptococcus pneumoniae.",
    "source": "Synapse Quiz",
    "year": 2026,
    "imageUrl": "/images/clinical/rx_pneumonia_lobar.jpg"
  },
  {
    "subjectName": "Diagnóstico por Imagem",
    "text": "Mulher de 62 anos com dispneia progressiva e dor torácica à direita há duas semanas. A radiografia de tórax em perfil, na figura, mostra velamento do seio costofrênico posterior com concavidade superior (menisco), apontado pela seta. Realizada toracocentese diagnóstica, qual achado no líquido pleural caracteriza um EXSUDATO, segundo os critérios de Light?",
    "options": [
      "Glicose pleural acima de 100 mg/dL e pH acima de 7,60.",
      "Relação proteína pleural/proteína sérica maior que 0,5 e/ou relação LDH pleural/LDH sérico maior que 0,6.",
      "Relação proteína pleural/proteína sérica menor que 0,5 e LDH pleural menor que 2/3 do limite superior sérico.",
      "Gradiente de albumina sérica menos pleural maior que 1,2 g/dL, isoladamente, em todos os casos."
    ],
    "correctOption": 1,
    "explanation": "Pelos critérios de Light, o derrame é exsudato se houver pelo menos um: proteína pleural/sérica > 0,5; LDH pleural/sérico > 0,6; ou LDH pleural > 2/3 do limite superior da normalidade sérica. Transudatos (insuficiência cardíaca, cirrose, síndrome nefrótica) não atingem esses critérios. Um gradiente de albumina sérica-pleural > 1,2 g/dL é usado para reclassificar exsudatos falsos em pacientes em uso de diurético, não como critério isolado. A radiografia em perfil detecta derrames a partir de cerca de 50 mL, por apagamento do seio costofrênico posterior, com o característico menisco.",
    "source": "Synapse Quiz",
    "year": 2026,
    "imageUrl": "/images/clinical/rx_derrame_pleural.png"
  },
  {
    "subjectName": "Diagnóstico por Imagem",
    "text": "Homem de 83 anos, com cirurgia de revascularização miocárdica prévia e múltiplas angioplastias, chega com dispneia aos mínimos esforços e ortopneia. A radiografia de tórax (figura) mostra aumento da área cardíaca e finas linhas horizontais curtas, perpendiculares à pleura, nas regiões periféricas inferiores dos pulmões. Essas linhas (linhas B de Kerley) correspondem a:",
    "options": [
      "Bandas de atelectasia laminar por hipoventilação das bases pulmonares.",
      "Ramificações de brônquios com paredes espessadas, típicas de bronquiectasias.",
      "Espessamento dos septos interlobulares por líquido ou tecido intersticial, como na congestão venosa pulmonar da insuficiência cardíaca.",
      "Cistos aéreos subpleurais de parede fina, característicos do enfisema paraseptal."
    ],
    "correctOption": 2,
    "explanation": "As linhas B de Kerley são linhas curtas (1 a 2 cm), horizontais e perpendiculares à pleura, vistas nas bases e periferias. Representam o espessamento dos septos interlobulares, seja por edema intersticial (hipertensão venosa pulmonar na insuficiência cardíaca ou estenose mitral), seja por linfangite carcinomatosa ou fibrose. Associadas a cardiomegalia e dispneia, sugerem insuficiência cardíaca descompensada, e o tratamento inclui diurético de alça e otimização hemodinâmica.",
    "source": "Synapse Quiz",
    "year": 2026,
    "imageUrl": "/images/clinical/rx_kerley_b.jpg"
  },
  {
    "subjectName": "Diagnóstico por Imagem",
    "text": "Homem de 45 anos com cólica renal direita há dois dias evolui com febre de 38,9 °C, calafrios e leucocitose. A ultrassonografia do rim direito, em corte sagital (figura), mostra dilatação de múltiplos cálices e da pelve renal. A tomografia confirma um cálculo obstrutivo de 7 mm no ureter proximal. Qual a conduta mais adequada?",
    "options": [
      "Litotripsia extracorpórea imediata, sem necessidade de antibioticoterapia.",
      "Alta com analgesia, hidratação oral e tansulosina, aguardando a eliminação espontânea do cálculo.",
      "Antibiótico oral ambulatorial e retorno em 7 dias com nova ultrassonografia.",
      "Drenagem urgente da via urinária (cateter duplo J ou nefrostomia percutânea) associada a antibioticoterapia, postergando a litotripsia."
    ],
    "correctOption": 3,
    "explanation": "Obstrução ureteral associada a infecção (pionefrose) é uma emergência urológica: o sistema coletor obstruído e infectado pode evoluir para sepse e perda renal. O tratamento é a descompressão imediata, com duplo J ou nefrostomia percutânea, mais antibiótico endovenoso; o cálculo é tratado eletivamente depois, com a infecção controlada. A terapia expulsiva médica só é adequada para cálculos pequenos, sem infecção e com dor controlada. Litotripsia com urina infectada e obstruída aumenta o risco de urossepse.",
    "source": "Synapse Quiz",
    "year": 2026,
    "imageUrl": "/images/clinical/usg_hidronefrose.jpg"
  },
  {
    "subjectName": "Anatomia Humana",
    "text": "A ressonância magnética de crânio, em corte sagital mediano ponderado em T1 (figura), permite identificar a grande faixa de substância branca em forma de arco, situada acima do tálamo e dos ventrículos laterais, que conecta os dois hemisférios cerebrais. Paciente submetido à secção cirúrgica dessa estrutura, por epilepsia refratária, apresentará como consequência típica:",
    "options": [
      "Perda total da consciência, por interrupção da formação reticular.",
      "Hemiplegia contralateral com espasticidade, por interrupção da via corticoespinhal.",
      "Síndrome de desconexão inter-hemisférica, como a incapacidade de nomear objetos colocados na mão esquerda com os olhos fechados.",
      "Ataxia de tronco e nistagmo, por perda da conexão com o vermis cerebelar."
    ],
    "correctOption": 2,
    "explanation": "A estrutura descrita é o corpo caloso, a principal comissura inter-hemisférica, formada por fibras que conectam áreas homólogas dos dois hemisférios. Sua secção (calosotomia) causa síndromes de desconexão: informações táteis da mão esquerda chegam ao hemisfério direito, mas não alcançam as áreas da linguagem no hemisfério esquerdo, o que gera anomia tátil esquerda. O cerebelo (com o vermis, visível abaixo do lobo occipital) e o tronco encefálico são estruturas distintas; a via corticoespinhal passa pela cápsula interna e pelo tronco.",
    "source": "Synapse Quiz",
    "year": 2026,
    "imageUrl": "/images/clinical/rm_sagital_cerebro.jpg"
  },
  {
    "subjectName": "Anatomia Humana",
    "text": "A figura mostra a raiz da aorta aberta, com as cúspides da valva aórtica e, acima delas, os orifícios de origem das artérias coronárias. Sobre a anatomia e a fisiologia da perfusão coronariana, assinale a alternativa correta:",
    "options": [
      "As coronárias originam-se de dois seios aórticos, acima das cúspides, e o ventrículo esquerdo é perfundido principalmente na diástole.",
      "As três coronárias nascem dos três seios aórticos, e o fluxo é maior na sístole, pela pressão aórtica mais alta.",
      "As coronárias originam-se abaixo das cúspides, no ventrículo esquerdo, e são perfundidas principalmente na sístole.",
      "As coronárias originam-se do arco aórtico, depois do tronco braquiocefálico, e o fluxo independe da fase do ciclo."
    ],
    "correctOption": 0,
    "explanation": "As artérias coronárias direita e esquerda emergem, respectivamente, dos seios aórticos direito e esquerdo (seios de Valsalva), logo acima das cúspides da valva aórtica; o seio posterior (não coronariano) não origina artéria. Na sístole, a contração do ventrículo esquerdo comprime os vasos intramiocárdicos; por isso a perfusão do ventrículo esquerdo ocorre predominantemente na diástole, quando a pressão aórtica é transmitida às coronárias e o músculo relaxa. Isso explica por que taquicardia (que reduz a diástole) e hipotensão diastólica favorecem isquemia.",
    "source": "Synapse Quiz",
    "year": 2026,
    "imageUrl": "/images/clinical/anat_valva_aortica.png"
  },
  {
    "subjectName": "Histologia & Embriologia",
    "text": "O corte histológico da figura, corado por hematoxilina-eosina, mostra a epiderme com camada córnea muito espessa e papilas dérmicas proeminentes, sem folículos pilosos ou glândulas sebáceas associadas. Qual característica distingue a pele espessa (como a das palmas e plantas) da pele fina?",
    "options": [
      "Presença de folículos pilosos abundantes e glândulas sebáceas em toda a extensão.",
      "Ausência do estrato granuloso e presença de melanócitos apenas na derme.",
      "Epiderme com apenas duas camadas celulares, estrato basal e estrato córneo.",
      "Presença do estrato lúcido e camada córnea espessa, com ausência de folículos pilosos e glândulas sebáceas."
    ],
    "correctOption": 3,
    "explanation": "A pele espessa (palmas e plantas) possui as cinco camadas da epiderme, incluindo o estrato lúcido, uma camada córnea bastante espessa e papilas dérmicas altas que aumentam a adesão e resistência ao atrito. É desprovida de folículos pilosos, músculos eretores do pelo e glândulas sebáceas, mas rica em glândulas sudoríparas écrinas. A pele fina apresenta epiderme mais delgada, geralmente sem estrato lúcido, e possui folículos pilosos e glândulas sebáceas.",
    "source": "Synapse Quiz",
    "year": 2026,
    "imageUrl": "/images/clinical/hist_pele.jpg"
  },
  {
    "subjectName": "Patologia Geral",
    "text": "Biópsia hepática de paciente com obesidade, diabetes mellitus tipo 2 e alterações discretas de transaminases mostra vacúolos lipídicos no citoplasma dos hepatócitos, concentrados ao redor da veia centrolobular (zona 3), como na figura. Esse padrão de esteatose macrovesicular perivenular é mais típico de:",
    "options": [
      "Síndrome de Reye, com esteatose microvesicular por disfunção mitocondrial.",
      "Hepatite viral aguda por vírus A, com necrose em ponte.",
      "Doença hepática gordurosa metabólica (esteatose não alcoólica) e hepatopatia alcoólica.",
      "Esteatose aguda da gravidez, com microvacúolos difusos."
    ],
    "correctOption": 2,
    "explanation": "Na esteatose por obesidade/resistência à insulina e no álcool, o acúmulo de triglicerídeos predomina na zona 3 (perivenular), a mais sensível à hipóxia e com maior metabolismo do etanol, e os vacúolos são grandes (macrovesiculares), com núcleo deslocado. Esteatose aguda da gravidez e síndrome de Reye cursam com esteatose microvesicular. Hepatite viral A causa inflamação e necrose hepatocelular, não esteatose predominante. A progressão para esteato-hepatite e fibrose depende de inflamação e lesão hepatocelular associadas.",
    "source": "Synapse Quiz",
    "year": 2026,
    "imageUrl": "/images/clinical/path_esteatose.jpg"
  },
  {
    "subjectName": "Patologia Geral",
    "text": "Na autópsia de um homem de 86 anos com insuficiência cardíaca de fração de ejeção preservada, o miocárdio apresentava-se firme e espessado. O corte corado pelo vermelho Congo, na figura, mostra depósitos extracelulares vermelho-alaranjados entre as fibras miocárdicas, que exibem birrefringência verde-maçã sob luz polarizada. Qual a proteína precursora mais provável da amiloidose cardíaca senil?",
    "options": [
      "Proteína amiloide sérica A (AA).",
      "Transtirretina (TTR) selvagem.",
      "Cadeias leves de imunoglobulina (AL).",
      "Beta-2-microglobulina."
    ],
    "correctOption": 1,
    "explanation": "A amiloidose cardíaca senil (sistêmica senil) resulta da deposição de transtirretina de tipo selvagem, sem mutação, em idosos, e causa cardiomiopatia restritiva com insuficiência cardíaca de fração de ejeção preservada. Amiloide AL (cadeias leves) surge em discrasias plasmocitárias; AA, em inflamação crônica; beta-2-microglobulina, em pacientes em diálise prolongada. Independentemente do tipo, o amiloide cora-se com vermelho Congo e mostra birrefringência verde-maçã sob luz polarizada, pela estrutura em folha beta pregueada.",
    "source": "Synapse Quiz",
    "year": 2026,
    "imageUrl": "/images/clinical/path_amiloide.jpg"
  },
  {
    "subjectName": "Patologia Geral",
    "text": "O corte pulmonar da figura (H&E) mostra, à esquerda, aumento acentuado dos espaços aéreos distais por destruição das paredes alveolares, sem fibrose significativa, contrastando com o parênquima relativamente preservado à direita. Sobre a fisiopatologia e os tipos do enfisema, assinale a alternativa correta:",
    "options": [
      "A deficiência de alfa-1-antitripsina leva ao enfisema panacinar, de predomínio nos lobos inferiores.",
      "O tabagismo causa predominantemente enfisema panacinar, de predomínio nos lobos inferiores.",
      "O enfisema é causado por excesso de antiprotease, que protege as paredes alveolares em excesso.",
      "O enfisema é caracterizado por fibrose intersticial difusa e redução dos espaços aéreos."
    ],
    "correctOption": 0,
    "explanation": "O enfisema é o aumento permanente dos espaços aéreos distais ao bronquíolo terminal, com destruição das paredes alveolares e sem fibrose evidente, resultado do desequilíbrio entre proteases (como a elastase neutrofílica) e antiproteases. A deficiência de alfa-1-antitripsina causa enfisema panacinar precoce, de predomínio basal. O tabagismo causa principalmente enfisema centroacinar (centrolobular), de predomínio nos lobos superiores. A fibrose intersticial com redução de volumes é característica de doenças restritivas, não do enfisema.",
    "source": "Synapse Quiz",
    "year": 2026,
    "imageUrl": "/images/clinical/path_enfisema.jpg"
  },
  {
    "subjectName": "Patologia Geral",
    "text": "Homem de 58 anos, tabagista, apresenta hematúria macroscópica indolor e massa em flanco. A nefrectomia revelou tumor cujo corte histológico está na figura: células com citoplasma opticamente vazio (claro), arranjadas em ninhos, ao lado do parênquima renal normal. Qual alteração genética está mais associada a esse tipo de tumor?",
    "options": [
      "Amplificação do gene N-MYC, no cromossomo 2p.",
      "Translocação t(9;22) com formação do gene BCR-ABL.",
      "Inativação do gene supressor VHL, localizado no cromossomo 3p.",
      "Mutação no gene RB1, localizado no cromossomo 13q."
    ],
    "correctOption": 2,
    "explanation": "O carcinoma de células renais de células claras, o tipo mais comum, associa-se à perda do braço curto do cromossomo 3 e à inativação do gene VHL, tanto nos casos esporádicos quanto na doença de von Hippel-Lindau. A perda de função de VHL leva ao acúmulo de HIF e à ativação de vias angiogênicas (VEGF), o que explica o tratamento com inibidores de tirosina-quinase. As células têm aspecto claro pelo acúmulo de lipídios e glicogênio removidos no processamento. Tabagismo e obesidade são fatores de risco importantes.",
    "source": "Synapse Quiz",
    "year": 2026,
    "imageUrl": "/images/clinical/path_cccr.jpg"
  },
  {
    "subjectName": "Patologia Geral",
    "text": "Adolescente de 17 anos apresenta linfonodomegalia cervical indolor há dois meses, com febre, sudorese noturna e prurido. A biópsia excisional do linfonodo (figura) mostra células grandes com amplo halo claro ao redor (célula lacunar, variante da célula de Reed-Sternberg), em meio a linfócitos pequenos e eosinófilos. Qual o imunofenótipo típico dessas células neoplásicas no linfoma de Hodgkin clássico?",
    "options": [
      "CD34 e TdT positivos, com CD30 negativo.",
      "CD3 e CD5 positivos, com CD30 negativo.",
      "CD20 e CD45 fortemente positivos, com CD15 e CD30 negativos.",
      "CD15 e CD30 positivos, com CD45 e CD20 negativos ou fracamente expressos."
    ],
    "correctOption": 3,
    "explanation": "As células de Reed-Sternberg e suas variantes do linfoma de Hodgkin clássico expressam CD30 e, na maioria dos casos, CD15, mas geralmente não expressam CD45 e têm CD20 negativo ou fraco. A célula lacunar é típica da esclerose nodular, o subtipo mais frequente em adultos jovens. O fundo inflamatório inclui linfócitos e eosinófilos. Já o linfoma difuso de grandes células B expressa CD20 e CD45; CD34 e TdT indicam leucemia/linfoma linfoblástico.",
    "source": "Synapse Quiz",
    "year": 2026,
    "imageUrl": "/images/clinical/path_hodgkin.jpg"
  },
  {
    "subjectName": "Imunologia & Microbiologia",
    "text": "Paciente com tosse há seis semanas, febre vespertina e perda de peso tem o escarro examinado pela técnica de Ziehl-Neelsen. A lâmina (figura) mostra bacilos finos, ligeiramente curvos, corados em vermelho sobre fundo azulado. Essa propriedade tintorial (álcool-ácido resistência) deve-se a:",
    "options": [
      "Ácidos micólicos de cadeia longa presentes na parede celular, que retêm a fucsina mesmo após a descoloração com álcool-ácido.",
      "Ausência de parede celular, com membrana rica em esteróis.",
      "Cápsula polissacarídica espessa, que impede a entrada do corante de contraste.",
      "Camada espessa de peptidoglicano, que retém o cristal violeta."
    ],
    "correctOption": 0,
    "explanation": "A parede das micobactérias é rica em lipídios, sobretudo ácidos micólicos, que formam uma barreira hidrofóbica. Após aquecimento com fucsina, o corante permanece retido mesmo com descoloração por álcool-ácido, daí o termo bacilos álcool-ácido resistentes (BAAR); as demais células assumem a cor do contraste (azul de metileno). A baciloscopia positiva em paciente sintomático respiratório confirma alta suspeita de tuberculose pulmonar e orienta o início do esquema RIPE (rifampicina, isoniazida, pirazinamida e etambutol) por dois meses, seguido de rifampicina e isoniazida por quatro meses.",
    "source": "Synapse Quiz",
    "year": 2026,
    "imageUrl": "/images/clinical/micro_zn_tb.jpg"
  },
  {
    "subjectName": "Imunologia & Microbiologia",
    "text": "Paciente com abscesso cutâneo tem o pus corado pelo método de Gram. A lâmina (figura) mostra cocos Gram-positivos agrupados em cachos irregulares. Qual teste laboratorial diferencia o Staphylococcus aureus dos demais estafilococos, como o S. epidermidis?",
    "options": [
      "Prova da catalase, negativa no S. aureus.",
      "Prova da coagulase, positiva no S. aureus.",
      "Sensibilidade à optoquina, presente no S. aureus.",
      "Prova da oxidase, positiva no S. aureus."
    ],
    "correctOption": 1,
    "explanation": "Estafilococos são cocos Gram-positivos em cachos e catalase-positivos (o que os distingue dos estreptococos). O S. aureus é o único do grupo que produz coagulase, enzima que converte fibrinogênio em fibrina; o S. epidermidis e o S. saprophyticus são coagulase-negativos (o saprofítico é resistente à novobiocina e causa cistite em mulheres jovens). A optoquina distingue o Streptococcus pneumoniae; a oxidase, bacilos Gram-negativos como Pseudomonas.",
    "source": "Synapse Quiz",
    "year": 2026,
    "imageUrl": "/images/clinical/micro_gram_saureus.jpg"
  },
  {
    "subjectName": "Imunologia & Microbiologia",
    "text": "Homem de 35 anos, garimpeiro, retorna de área endêmica na Amazônia com febre alta intermitente, calafrios e cefaleia. O esfregaço de sangue periférico corado por Giemsa (figura) mostra formas em anel delicadas, com pontos duplos de cromatina, no interior de hemácias de tamanho normal (setas). O exame confirma malária por Plasmodium falciparum não complicada. Qual o esquema de primeira linha recomendado no Brasil?",
    "options": [
      "Cloroquina por 3 dias, associada a primaquina por 7 dias.",
      "Apenas primaquina por 14 dias.",
      "Artemeter + lumefantrina por 3 dias, associado a primaquina em dose única.",
      "Doxiciclina isolada por 7 dias."
    ],
    "correctOption": 2,
    "explanation": "Na malária por P. falciparum não complicada, o Ministério da Saúde recomenda terapia combinada com derivado da artemisinina: artemeter + lumefantrina por três dias, com uma dose única de primaquina para eliminar gametócitos e reduzir a transmissão. Cloroquina + primaquina é o esquema do P. vivax. Anéis delicados, múltiplos por hemácia e sem aumento do tamanho da célula parasitada sugerem P. falciparum, espécie associada a formas graves, como a malária cerebral.",
    "source": "Synapse Quiz",
    "year": 2026,
    "imageUrl": "/images/clinical/micro_plasmodium.jpg"
  },
  {
    "subjectName": "Imunologia & Microbiologia",
    "text": "Homem de 24 anos apresenta disúria e secreção uretral purulenta abundante, iniciadas 3 dias após relação sexual desprotegida. O Gram do exsudato uretral (figura) mostra numerosos neutrófilos com diplococos Gram-negativos no interior das células. Segundo o protocolo clínico brasileiro para infecções sexualmente transmissíveis, qual o tratamento recomendado?",
    "options": [
      "Ciprofloxacino 500 mg por via oral em dose única, isoladamente.",
      "Metronidazol 2 g por via oral em dose única, isoladamente.",
      "Penicilina G benzatina 2,4 milhões de UI intramuscular em dose única.",
      "Ceftriaxona 500 mg intramuscular em dose única associada a azitromicina 1 g por via oral em dose única."
    ],
    "correctOption": 3,
    "explanation": "Diplococos Gram-negativos intracelulares em neutrófilos, em uma uretrite purulenta, são diagnóstico presuntivo de infecção por Neisseria gonorrhoeae. O tratamento recomendado é ceftriaxona 500 mg IM associada a azitromicina 1 g VO em dose única, cobrindo também a coinfecção frequente por Chlamydia trachomatis. Penicilina benzatina trata sífilis; quinolonas têm alta resistência do gonococo; metronidazol trata tricomoníase e vaginose bacteriana.",
    "source": "Synapse Quiz",
    "year": 2026,
    "imageUrl": "/images/clinical/micro_gonococo.jpg"
  },
  {
    "subjectName": "Imunologia & Microbiologia",
    "text": "Paciente com HIV, CD4 de 60 células/mm³ e sem tratamento, apresenta cefaleia intensa há duas semanas, febre e vômitos, sem rigidez de nuca importante. O exame do líquor com tinta da China (figura) mostra leveduras arredondadas circundadas por amplo halo claro. Qual o tratamento de indução recomendado?",
    "options": [
      "Anfotericina B (lipossomal ou desoxicolato) associada a flucitosina, por cerca de duas semanas.",
      "Sulfametoxazol-trimetoprima em dose alta por 21 dias.",
      "Fluconazol oral isolado em dose baixa, por 7 dias.",
      "Caspofungina intravenosa isolada."
    ],
    "correctOption": 0,
    "explanation": "O halo claro visto na tinta da China corresponde à cápsula polissacarídica do Cryptococcus neoformans, que exclui as partículas do corante. A meningoencefalite criptocócica, comum em HIV avançado, tem indução com anfotericina B associada à flucitosina por cerca de duas semanas, seguida de consolidação com fluconazol. A hipertensão intracraniana é frequente e pode exigir punções lombares de alívio. As equinocandinas (caspofungina) não têm atividade útil contra Cryptococcus, e SMX-TMP trata pneumocistose.",
    "source": "Synapse Quiz",
    "year": 2026,
    "imageUrl": "/images/clinical/micro_cryptococcus.jpg"
  },
  {
    "subjectName": "Fisiologia Humana",
    "text": "O gráfico mostra duas curvas de dissociação da oxiemoglobina. A curva azul está deslocada para a esquerda em relação à vermelha (menor pressão parcial de oxigênio para a mesma saturação). Qual das alterações abaixo provoca esse tipo de desvio?",
    "options": [
      "Acidose, hipertermia e aumento de 2,3-bisfosfoglicerato.",
      "Aumento da pressão parcial de dióxido de carbono e queda do pH.",
      "Alcalose, hipotermia e diminuição de 2,3-bisfosfoglicerato.",
      "Exercício intenso, com aumento da temperatura muscular."
    ],
    "correctOption": 2,
    "explanation": "O desvio para a esquerda indica maior afinidade da hemoglobina pelo oxigênio, o que dificulta sua liberação nos tecidos. Ocorre com alcalose (pH alto), hipotermia, diminuição da PCO2, redução do 2,3-BPG, presença de hemoglobina fetal e de monóxido de carbono. O desvio para a direita (menor afinidade, maior liberação de O2) ocorre com acidose (efeito Bohr), aumento de PCO2, hipertermia e aumento de 2,3-BPG, situações típicas de tecidos metabolicamente ativos, como no exercício.",
    "source": "Synapse Quiz",
    "year": 2026,
    "imageUrl": "/images/clinical/fisio_curva_hb.png"
  },
  {
    "subjectName": "Fisiologia Humana",
    "text": "Paciente com doença renal crônica e falta às sessões de hemodiálise chega com fraqueza muscular. O ECG de 12 derivações (figura) mostra ondas T apiculadas, simétricas e de base estreita nas derivações precordiais. A potassemia é de 8,2 mmol/L. Qual a primeira medida para proteger o miocárdio nessa situação?",
    "options": [
      "Reposição de cloreto de potássio endovenoso, para corrigir a arritmia.",
      "Gluconato de cálcio a 10% por via intravenosa.",
      "Restrição hídrica isolada e reavaliação em 24 horas.",
      "Furosemida oral em dose habitual."
    ],
    "correctOption": 1,
    "explanation": "A hipercalemia grave, com alterações eletrocardiográficas (ondas T apiculadas, PR longo, QRS alargado), é emergência: o cálcio intravenoso antagoniza o efeito do potássio na excitabilidade da membrana cardíaca e deve ser feito primeiro, com efeito em minutos. Em seguida entram medidas que deslocam o potássio para o meio intracelular (insulina com glicose, agonista beta-2 inalatório) e as que o eliminam (diurético de alça, resinas e, principalmente neste caso, hemodiálise). A reposição de potássio é contraindicada.",
    "source": "Synapse Quiz",
    "year": 2026,
    "imageUrl": "/images/clinical/fisio_ecg_hipercalemia.jpg"
  },
  {
    "subjectName": "Bioquímica Médica",
    "text": "A figura mostra gráficos de Lineweaver-Burk (1/v em função de 1/[S]) para quatro tipos de inibição enzimática, com a enzima sem inibidor (linha azul) e com inibidor (linha vermelha). Em qual painel o inibidor reduz a velocidade máxima (Vmax) sem alterar o Km, com as retas cruzando-se no eixo horizontal?",
    "options": [
      "Painel superior esquerdo (inibição competitiva).",
      "Painel superior direito (inibição incompetitiva).",
      "Painel inferior esquerdo (inibição mista).",
      "Painel inferior direito (inibição não competitiva pura)."
    ],
    "correctOption": 3,
    "explanation": "No gráfico de duplo recíproco, o intercepto no eixo 1/v equivale a 1/Vmax e o intercepto no eixo 1/[S] equivale a -1/Km. Na inibição não competitiva pura, o inibidor liga-se em sítio diferente do substrato com a mesma afinidade pela enzima livre e pelo complexo enzima-substrato: Vmax diminui e Km permanece o mesmo, de modo que as retas se cruzam no eixo horizontal. Na competitiva, Vmax é mantida e o Km aparente aumenta (cruzamento no eixo vertical). Na incompetitiva, Vmax e Km diminuem e as retas são paralelas. Na mista, as retas se cruzam fora dos eixos.",
    "source": "Synapse Quiz",
    "year": 2026,
    "imageUrl": "/images/clinical/bioq_inibicao.jpg"
  },
  {
    "subjectName": "Bioquímica Médica",
    "text": "A curva mostra a velocidade de uma reação enzimática em função da concentração de substrato. A enzima atinge velocidade máxima de aproximadamente 0,34 (unidades arbitrárias) e a velocidade de metade da máxima corresponde a cerca de 0,17. O valor aproximado de Km dessa enzima, lido no gráfico, e seu significado são:",
    "options": [
      "Cerca de 40, a concentração de substrato em que a enzima atinge a velocidade máxima.",
      "Cerca de 400, a concentração de substrato em que a velocidade é metade da máxima.",
      "Cerca de 2.000, a concentração de substrato em que a enzima se satura completamente.",
      "Cerca de 4.000, a concentração de substrato que dobra a velocidade máxima."
    ],
    "correctOption": 1,
    "explanation": "O Km (constante de Michaelis) é, por definição, a concentração de substrato na qual a velocidade da reação é igual à metade da Vmax. Traçando a horizontal em 0,17 (meia Vmax) até a curva e descendo à abscissa, obtém-se um valor próximo de 400. Um Km baixo indica alta afinidade da enzima pelo substrato (metade da velocidade máxima é alcançada com pouco substrato), e um Km alto indica baixa afinidade. A Vmax só é aproximada assintoticamente e não é atingida em concentrações finitas.",
    "source": "Synapse Quiz",
    "year": 2026,
    "imageUrl": "/images/clinical/bioq_michaelis.png"
  },
  {
    "subjectName": "Farmacologia Básica",
    "text": "A figura mostra curvas dose-resposta de um agonista A na ausência (curva da esquerda) e na presença de duas concentrações crescentes de um antagonista B (curvas seguintes). O efeito máximo é igual em todas as curvas, e o antagonismo foi revertido com doses maiores do agonista. Esse padrão é característico de:",
    "options": [
      "Agonista inverso: elevação da atividade basal do receptor sem alterar a Emax.",
      "Antagonista não competitivo: desvio paralelo para a direita e redução da Emax.",
      "Agonista parcial: redução da Emax com aumento da potência do agonista.",
      "Antagonista competitivo reversível: desvio paralelo para a direita, sem alteração da Emax e com redução da potência aparente do agonista."
    ],
    "correctOption": 3,
    "explanation": "Um antagonista competitivo reversível liga-se ao mesmo sítio do agonista e pode ser superado por aumento da concentração deste: a curva dose-resposta desloca-se paralelamente para a direita (aumento do EC50, ou seja, menor potência aparente), com Emax preservada. O antagonista não competitivo (ou irreversível) reduz a Emax e não é superado por mais agonista. O agonista parcial tem Emax menor que a do pleno; o agonista inverso reduz a atividade constitutiva do receptor. Exemplo clínico de antagonismo competitivo: naloxona sobre opioides.",
    "source": "Synapse Quiz",
    "year": 2026,
    "imageUrl": "/images/clinical/farma_antagonista.jpg"
  },
  {
    "subjectName": "Farmacologia Básica",
    "text": "O gráfico compara o efeito de um agonista opioide pleno (vermelho), de um agonista parcial (azul) e de um antagonista (verde) em função do logaritmo da dose. A buprenorfina é um exemplo de agonista parcial do receptor mu. Qual a consequência clínica desse perfil farmacológico?",
    "options": [
      "Ausência de qualquer efeito analgésico, por competir pelo receptor sem ativá-lo.",
      "Efeito máximo maior que o do agonista pleno, com maior risco de depressão respiratória.",
      "Efeito teto, com menor risco de depressão respiratória, mas possibilidade de precipitar abstinência em dependentes de agonistas plenos.",
      "Reversão completa e imediata dos efeitos de qualquer agonista pleno, sem sintomas de abstinência."
    ],
    "correctOption": 2,
    "explanation": "Agonistas parciais têm alta afinidade, mas eficácia intrínseca menor que a dos agonistas plenos, de modo que a curva atinge um platô inferior (efeito teto). Isso limita o risco de depressão respiratória e contribui para a segurança da buprenorfina no tratamento da dependência de opioides. Em pacientes dependentes de agonistas plenos (como heroína ou morfina), a buprenorfina pode ocupar receptores e reduzir o efeito total, precipitando abstinência. O antagonista (naloxona, em verde) não produz efeito próprio e apenas bloqueia o receptor.",
    "source": "Synapse Quiz",
    "year": 2026,
    "imageUrl": "/images/clinical/farma_agonista_parcial.png"
  },
  {
    "subjectName": "Saúde Coletiva & Epidemiologia",
    "text": "A figura apresenta a pirâmide etária do Brasil em 2015: base mais estreita que as faixas de 10 a 34 anos, maior largura entre 20 e 34 anos e topo alargado em relação a décadas anteriores. Qual a interpretação demográfica mais adequada?",
    "options": [
      "Transição demográfica avançada, com queda da fecundidade e envelhecimento populacional, e janela de oportunidade (bônus demográfico) com baixa razão de dependência.",
      "Estrutura estacionária, com todas as faixas etárias em números iguais.",
      "População jovem com alta fecundidade e mortalidade infantil elevada, típica de país pré-transição demográfica.",
      "População em rápido declínio por êxodo de jovens, com predomínio de idosos acima de 80 anos."
    ],
    "correctOption": 0,
    "explanation": "A pirâmide brasileira mostra estreitamento da base (queda da natalidade e da fecundidade), concentração de adultos em idade ativa e crescimento das faixas idosas, o que caracteriza a transição demográfica avançada. A razão de dependência (jovens e idosos em relação à população em idade ativa) é baixa, o que abre a janela demográfica, tendência que se esgota com o envelhecimento acelerado. Pirâmides de base larga e topo estreito representam populações jovens de alta fecundidade; um formato retangular indica população estacionária.",
    "source": "Synapse Quiz",
    "year": 2026,
    "imageUrl": "/images/clinical/sc_piramide.png"
  },
  {
    "subjectName": "Saúde Coletiva & Epidemiologia",
    "text": "O gráfico apresenta curvas de Kaplan-Meier para dois grupos de pacientes (grupo A, em verde, e grupo B, em vermelho; dados ilustrativos), com pequenos traços verticais sobre as curvas. Assinale a alternativa correta sobre a interpretação da figura:",
    "options": [
      "O grupo B tem melhor sobrevida, pois sua curva declina mais rapidamente.",
      "Os traços verticais representam indivíduos censurados, e a comparação estatística das curvas pode ser feita pelo teste de log-rank.",
      "O estimador de Kaplan-Meier só pode ser usado quando ninguém é censurado.",
      "Os traços verticais indicam óbitos, e a comparação estatística das curvas é feita pelo teste t de Student."
    ],
    "correctOption": 1,
    "explanation": "O estimador de Kaplan-Meier calcula a probabilidade de sobrevida ao longo do tempo, admitindo censuras: os traços verticais marcam indivíduos que saíram do acompanhamento sem ter apresentado o evento (perda de seguimento ou fim do estudo). Cada degrau descendente na curva indica a ocorrência de evento. Curvas de sobrevida são comparadas com o teste de log-rank, e o efeito pode ser quantificado pelo modelo de riscos proporcionais de Cox (razão de riscos). Na figura, o grupo B (vermelho) tem pior sobrevida.",
    "source": "Synapse Quiz",
    "year": 2026,
    "imageUrl": "/images/clinical/sc_km.jpg"
  },
  {
    "subjectName": "Saúde Coletiva & Epidemiologia",
    "text": "A figura apresenta a curva epidêmica de um surto de salmonelose, com o número de casos por data de início dos sintomas: ascensão rápida até um pico único, seguida de declínio, sem ondas sucessivas separadas pelo período de incubação. Esse padrão sugere mais fortemente:",
    "options": [
      "Surto propagado pessoa a pessoa, com ondas sucessivas de casos.",
      "Doença endêmica, com número estável de casos ao longo de todo o ano.",
      "Padrão sazonal previsível, sem relação com exposição ambiental específica.",
      "Surto de fonte comum, com exposição de muitas pessoas ao mesmo veículo contaminado."
    ],
    "correctOption": 3,
    "explanation": "Em surtos de fonte comum, muitos indivíduos são expostos ao mesmo veículo (alimento, água) em curto período, e a curva epidêmica mostra ascensão rápida a um pico único e declínio, com amplitude compatível com o período de incubação (na salmonelose, de horas a poucos dias). Em surtos propagados, casos secundários geram novas ondas, separadas por intervalos próximos ao período de incubação. A investigação deve buscar o alimento comum, pelo estudo caso-controle ou de coorte, e medidas de controle na fonte.",
    "source": "Synapse Quiz",
    "year": 2026,
    "imageUrl": "/images/clinical/sc_curva_epidemica.jpg"
  },
  {
    "subjectName": "Semiologia Médica I",
    "text": "Homem de 61 anos refere dor em queimação no hemitórax direito há 3 dias, seguida de lesões vesiculares agrupadas sobre base eritematosa, dispostas em faixa unilateral que não ultrapassa a linha média (figura). Qual o diagnóstico e o tratamento indicado?",
    "options": [
      "Herpes zóster; aciclovir por via oral (800 mg, 5 vezes ao dia, por 7 dias), iniciado idealmente nas primeiras 72 horas.",
      "Herpes simples recorrente; apenas antisséptico tópico e observação.",
      "Impetigo bolhoso; cefalexina por via oral por 7 dias.",
      "Dermatite herpetiforme; corticoide sistêmico em dose imunossupressora, sem antiviral."
    ],
    "correctOption": 0,
    "explanation": "Vesículas agrupadas em base eritematosa, com distribuição dermatomérica unilateral e dor prodrômica, são características do herpes zóster, reativação do vírus varicela-zóster latente em gânglios sensitivos. O antiviral (aciclovir, valaciclovir ou fanciclovir) reduz a duração e a gravidade e diminui o risco de neuralgia pós-herpética, sendo mais eficaz quando iniciado nas primeiras 72 horas. Deve-se avaliar acometimento do ramo oftálmico do trigêmeo (risco ocular) e imunossupressão. Corticoide isolado sem antiviral não está indicado.",
    "source": "Synapse Quiz",
    "year": 2026,
    "imageUrl": "/images/clinical/sem_zoster.jpg"
  },
  {
    "subjectName": "Semiologia Médica I",
    "text": "Mulher de 52 anos apresenta placas amareladas, planas e bem delimitadas nas pálpebras superiores, próximas ao canto interno de ambos os olhos, de crescimento lento (figura). Qual a conduta inicial mais adequada diante dessas lesões?",
    "options": [
      "Excisão urgente com margens amplas, por suspeita de melanoma.",
      "Iniciar corticoide tópico potente, por suspeita de dermatite alérgica de contato.",
      "Solicitar perfil lipídico, pois podem se associar a dislipidemia, embora cerca de metade dos pacientes tenha lipídios normais.",
      "Prescrever antifúngico oral, por suspeita de tinha da face."
    ],
    "correctOption": 2,
    "explanation": "Os xantelasmas são depósitos de lipídios em macrófagos (células espumosas) na derme palpebral, com aspecto de placas amareladas típicas. Podem estar associados a hipercolesterolemia (inclusive familiar) e a risco cardiovascular aumentado, por isso está indicada a dosagem de perfil lipídico, embora perto de 50% dos casos ocorram com lipídios normais. Tratamento estético (excisão, laser, ácido tricloroacético) é opcional, com boa taxa de recidiva. Não têm relação com melanoma, dermatite ou infecção fúngica.",
    "source": "Synapse Quiz",
    "year": 2026,
    "imageUrl": "/images/clinical/sem_xantelasma.jpg"
  },
  {
    "subjectName": "Semiologia Médica II",
    "text": "Mulher de 48 anos, residente em região montanhosa afastada do litoral, apresenta aumento indolor e difuso do volume cervical anterior, que acompanha a deglutição (figura). Está eutireoidea, sem sintomas compressivos. Qual a causa mais comum de bócio no mundo e uma manobra útil na semiologia para avaliar compressão do desfiladeiro torácico?",
    "options": [
      "Câncer papilífero da tireoide; sinal de Blumberg, com dor à descompressão do abdome.",
      "Deficiência de iodo (bócio endêmico); sinal de Pemberton, com rubor facial e ingurgitamento jugular ao elevar os braços.",
      "Doença de Graves; sinal de Chvostek, com contração facial à percussão do nervo facial.",
      "Tireoidite de Hashimoto; sinal de Murphy, com parada da inspiração à palpação do hipocôndrio."
    ],
    "correctOption": 1,
    "explanation": "A deficiência de iodo é a principal causa mundial de bócio: com pouca oferta de iodo, o TSH estimula a tireoide, levando a hiperplasia difusa e, a longo prazo, formação de nódulos. O sinal de Pemberton é positivo quando, com os braços elevados, há rubor facial, cianose e ingurgitamento das jugulares, sugerindo obstrução do desfiladeiro torácico por bócio mergulhante. Chvostek é sinal de hipocalcemia, Murphy de colecistite e Blumberg de irritação peritoneal.",
    "source": "Synapse Quiz",
    "year": 2026,
    "imageUrl": "/images/clinical/sem_bocio.jpg"
  },
  {
    "subjectName": "Semiologia Médica II",
    "text": "Homem de 60 anos, agricultor, apresenta febre alta, mialgia intensa nas panturrilhas, oligúria e icterícia, com sufusão hemorrágica conjuntival, dias após contato com água de enchente. A figura mostra a esclera amarelada. Qual a conduta inicial mais adequada nesse quadro grave?",
    "options": [
      "Aguardar a sorologia e não iniciar antibiótico antes do resultado.",
      "Doxiciclina oral ambulatorial por 7 dias, com retorno apenas se piorar.",
      "Internação, hidratação e antibioticoterapia endovenosa precoce (penicilina G cristalina ou ceftriaxona), com suporte renal se necessário.",
      "Corticoide em dose imunossupressora isolado, sem antibiótico."
    ],
    "correctOption": 2,
    "explanation": "Febre, mialgia de panturrilhas, icterícia rubínica, insuficiência renal aguda e fenômenos hemorrágicos após exposição a água de enchente definem leptospirose grave (síndrome de Weil). A icterícia da leptospirose é predominantemente de bilirrubina direta, sem grande elevação de transaminases. O tratamento deve ser iniciado precocemente, sem esperar sorologia, com internação, hidratação, antibiótico endovenoso (penicilina G cristalina ou ceftriaxona) e suporte, com diálise nos casos de insuficiência renal grave. A doxiciclina oral é indicada nas formas leves.",
    "source": "Synapse Quiz",
    "year": 2026,
    "imageUrl": "/images/clinical/sem_ictericia.jpg"
  }
];
