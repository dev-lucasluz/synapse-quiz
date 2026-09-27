export interface ImageQuestionSeed {
  subjectName: string;
  text: string;
  options: string[];
  correctOption: number;
  explanation: string;
  source: string;
  year: number;
  imageUrl: string;
}

export const new15ImageQuestions: ImageQuestionSeed[] = [
  // 1. Semiologia Médica I - Melanoma Cutâneo
  {
    subjectName: "Semiologia Médica I",
    text: "Homem de 54 anos, fototipo II de Fitzpatrick, procura atendimento ambulatorial devido ao surgimento e progressão de lesão pigmentada no dorso há 8 meses. Ao exame dermatológico, observa-se a lesão cutânea apresentada na fotografia clínica abaixo, medindo 12 mm em seu maior diâmetro. Considerando a suspeita clínica diagnóstica e a propedêutica adequada, assinale a conduta inicial recomendada para confirmação histopatológica:",
    imageUrl: "/images/clinical/lesao_melanoma.jpg",
    options: [
      "Biópsia incisional por punch de 4 mm na porção central mais pigmentada da lesão.",
      "Biópsia excisional com margem de 1 a 2 mm de tecido são e preservação da gordura subcutânea.",
      "Curetagem seguida de eletrocoagulação para ressecção da base lesional.",
      "Excisão ampla com margens mínimas de 2 cm com biópsia concomitante de linfonodo sentinela."
    ],
    correctOption: 1,
    explanation: "A imagem evidencia uma lesão melanocítica assimétrica, com bordas irregulares e chanfradas, policromia (tons de castanho, preto e áreas acastanhadas mais claras) e diâmetro superior a 6 mm (>12 mm), preenchendo todos os critérios do mnemônico ABCDE para suspeita de Melanoma Cutâneo (tipo expansivo superficial). A conduta de escolha obrigatória perante lesão suspeita de melanoma é a biópsia excisional completa com margem estreita (1 a 2 mm) e profundidade até a gordura celular subcutânea. Biópsias incisionais ou por punch são contraindicadas na maioria dos casos pelo risco de amostragem incompleta e erro na mensuração do índice de Breslow.",
    source: "UNICAMP",
    year: 2024
  },

  // 2. Semiologia Médica I - Eritema Multiforme
  {
    subjectName: "Semiologia Médica I",
    text: "Paciente jovem de 24 anos procura a Unidade de Pronto Atendimento com erupção cutânea súbita e simétrica nos membros superiores e face extensora dos antebraços iniciada há 3 dias. Refere episódio de vesículas labiais dolorosas recorrentes há cerca de 10 dias. Ao exame físico, observa-se a lesão elementar ilustrada a seguir, caracterizada por três zonas concêntricas com centro purpúrico violáceo e anel eritematoso externo. Assinale a alternativa que indica o diagnóstico correto e o agente etiológico mais frequentemente associado a este quadro:",
    imageUrl: "/images/clinical/lesao_eritema_multiforme.jpg",
    options: [
      "Eritema multiforme menor; infecção prévia pelo Vírus Herpes Simplex (HSV).",
      "Eritema nodoso; infecção estreptocócica de orofaringe.",
      "Necrólise epidérmica tóxica; uso prévio de anti-inflamatórios não esteroides.",
      "Síndrome de Stevens-Johnson; infecção primária por Mycoplasma pneumoniae."
    ],
    correctOption: 0,
    explanation: "A fotografia clínica demonstra a lesão 'em alvo' (ou em íris) patognomônica do Eritema Multiforme (EM): lesão concêntrica clássica com 3 zonas bem delimitadas (centro escuro violáceo/bolhoso, halo intermediário pálido edematoso e anel externo eritematoso). A etiologia mais prevalente do Eritema Multiforme Menor (sem acometimento mucoso grave) é a infecção prévia pelo Herpes Simplex Vírus (HSV-1 ou HSV-2), ocorrendo classicamente 7 a 14 dias após a reativação herpética orolabial. Não se trata de SJS/NET, que acometem múltiplas mucosas com descolamento epidérmico extenso.",
    source: "ENARE",
    year: 2024
  },

  // 3. Semiologia Médica II - Úlcera Venosa
  {
    subjectName: "Semiologia Médica II",
    text: "Mulher de 62 anos, multípara, com histórico de varizes de membros inferiores de longa data e obesidade grau I, comparece à consulta com queixa de dor tipo peso no membro inferior direito e ferida de evolução arrastada há cerca de 6 meses. O exame físico evidencia a lesão ulcerada demonstrada na imagem, localizada na região supramaleolar medial, associada a hiperpigmentação perilesional acastanhada e endurecimento cutâneo. Diante dos achados clínicos, assinale a opção que descreve corretamente a fisiopatologia e a medida terapêutica padrão-ouro inicial:",
    imageUrl: "/images/clinical/lesao_ulcera_venosa.jpg",
    options: [
      "Isquemia aterosclerótica crônica; desbridamento cirúrgico de urgência e antiagregação plaquetária dupla.",
      "Microangiopatia diabética associada a neuropatia sensorial; calçados ortopédicos e antibioticoterapia oral ampla.",
      "Hipertensão venosa crônica com incompetência valvar; terapia compressiva com bandagem elástica ou bota de Unna.",
      "Vasculite autoimune leucocitoclástica de pequenos vasos; pulsoterapia com metilprednisolona."
    ],
    correctOption: 2,
    explanation: "Trata-se de uma típica Úlcera Venosa (estase venosa crônica). Os elementos definidores são: localização clássica em região supramaleolar medial, leito úmido e raso com tecido de granulação, bordas irregulares e alterações tróficas adjacentes características de hipertensão venosa grave (dermatite ocre por deposição de hemossiderina, lipodermatoesclerose e varicosidades tronculares). A intervenção padrão-ouro na ausência de doença arterial periférica obstrutiva concomitante (ITB > 0,8) é a terapia compressiva inelástica (bota de Unna) ou elástica, que reverte a hipertensão capilar venosa e reduz o edema.",
    source: "USP-SP",
    year: 2023
  },

  // 4. Diagnóstico por Imagem - TC Hematoma Subdural
  {
    subjectName: "Diagnóstico por Imagem",
    text: "Idoso de 78 anos, em uso crônico de varfarina para fibrilação atrial, sofreu queda da própria altura há 2 dias. Trazido ao pronto-socorro por familiares por sonolência progressiva, cefaleia e hemiparesia à esquerda. Foi realizada tomografia computadorizada (TC) de crânio sem contraste em corte axial, apresentada a seguir. Assinale a alternativa correta quanto à lesão observada, seu mecanismo vascular e a delimitação anatômica:",
    imageUrl: "/images/clinical/tc_hematoma_subdural.jpg",
    options: [
      "Hematoma epidural agudo por rotura da artéria meníngea média; coleção biconvexa que não ultrapassa as suturas cranianas.",
      "Hematoma subdural agudo por rotura de veias em ponte (bridging veins); coleção côncavo-convexa (em crescente) que ultrapassa as suturas cranianas.",
      "Acidente vascular encefálico isquêmico extenso em território de artéria cerebral média; área de hipoatenuação corticossubcortical.",
      "Hemorragia subaracnóidea traumática por rotura aneurismática em polígono de Willis; hiperdensidade restrita aos sulcos e cisternas da base."
    ],
    correctOption: 1,
    explanation: "A imagem de TC de crânio demonstra uma coleção hiperdensa extra-axial em formato de crescente (côncavo-convexa), acompanhando a curvatura da calota craniana direita, provocando apagamento de sulcos, colapso do ventrículo lateral direito e desvio de linha média. Esse aspecto é típico do Hematoma Subdural Agudo (HSD), que se localiza no espaço subdural (entre a dura-máter e a aracnoide), decorrente do cisalhamento de veias pontes corticais. Diferentemente do hematoma epidural (que é limitado pelas suturas cranianas onde a dura-máter adere ao periósteo), o hematoma subdural cruza livremente as suturas cranianas, mas é contido pelas reflexões durais.",
    source: "UNIFESP",
    year: 2024
  },

  // 5. Diagnóstico por Imagem - RX Pneumotórax Hipertensivo
  {
    subjectName: "Diagnóstico por Imagem",
    text: "Paciente do sexo masculino, 28 anos, vítima de agressão física com arma branca no hemitórax direito, chega à sala de emergência taquipneico (FR: 34 irpm), sudoreico, hipotenso (PA: 75x45 mmHg), taquicárdico (FC: 132 bpm) e com turgência jugular patológica a 45º. O exame do tórax evidencia murmúrio vesicular abolido e timpanismo à percussão em todo o hemitórax direito. Embora o diagnóstico deva ser clínico, foi realizada a radiografia de tórax exibida abaixo. Assinale a conduta terapêutica imediata mandatória:",
    imageUrl: "/images/clinical/rx_pneumotorax_hipertensivo.jpg",
    options: [
      "Solicitar tomografia de tórax de alta resolução para avaliar o calibre do derrame pleural associado.",
      "Descompressão torácica imediata por toracocentese com agulha calibrosa no 4º ou 5º espaço intercostal direito, entre a linha axilar anterior e média (ou 2º EIC na linha hemiclavicular).",
      "Intubação orotraqueal imediata com ventilação mecânica por pressão positiva com PEEP elevada.",
      "Pericardiocentese de emergência guiada por ecocardiograma (manobra de Marfan) para alívio de tamponamento cardíaco."
    ],
    correctOption: 1,
    explanation: "O caso descreve um clássico Pneumotórax Hipertensivo: choque obstrutivo (hipotensão + turgência jugular), hiper-ressonância e abolição de murmúrio vesicular unilateral. Na radiografia, observa-se hemitórax direito hipertransparente sem trama vascular, colapso pulmonar total e desvio maciço da traqueia e do mediastino para o lado esquerdo contralateral, com rebaixamento diafragmático. Trata-se de uma emergência de risco iminente de morte; a conduta de urgência segundo o ATLS 10ª edição é a toracocentese por agulha calibrosa (no 4º/5º EIC entre a linha axilar anterior e média em adultos, ou 2º EIC na linha hemiclavicular), convertendo o pneumotórax hipertensivo em simples, seguida de toracostomia com drenagem tubular em selo d'água.",
    source: "USP-RP",
    year: 2023
  },

  // 6. Diagnóstico por Imagem - RX Pneumoperitônio
  {
    subjectName: "Diagnóstico por Imagem",
    text: "Homem de 45 anos com antecedente de epigastralgia em queimação sem tratamento regular dá entrada no pronto-socorro com dor abdominal súbita de forte intensidade, iniciada há 3 horas, em pontada, que rapidamente se generalizou. Ao exame físico: fácies de sofrimento, abdome rígido 'em tábua', com dor difusa à palpação e descompressão brusca positiva em todos os quadrantes. A radiografia de tórax em posição ortostática (em pé) está reproduzida a seguir. Com base no sinal radiológico evidenciado, assinale a etiologia mais provável e o tratamento definitivo indicado:",
    imageUrl: "/images/clinical/rx_pneumoperitonio.jpg",
    options: [
      "Apendicite aguda flegmonosa; apendicectomia laparoscópica de urgência.",
      "Perfuração de víscera oca gastroduodenal (úlcera péptica perfurada); laparotomia exploradora de urgência.",
      "Pancreatite aguda biliar necrosante grave; jejum oral e hidratação venosa vigorosa guiada por metas.",
      "Diverticulite aguda Hinchey I; antibioticoterapia venosa em enfermaria com ceftriaxona e metronidazol."
    ],
    correctOption: 1,
    explanation: "A radiografia de tórax em cúpulas (ortostática) revela a presença de pneumoperitônio, evidenciado pelo acúmulo de ar livre em foice/crescente radiolucente subdiafragmático, delineando a cúpula hepática e o hemidiafragma direito. No contexto de dor súbita em facada associada a sinais inequívocos de irritação peritoneal difusa (abdome em tábua) em paciente com história péptica prévia, o diagnóstico é de perfuração de víscera oca, mais comumente úlcera péptica gástrica ou duodenal. O tratamento mandatório é cirúrgico de urgência (laparotomia ou laparoscopia exploradora com rafia e patch de Graham).",
    source: "Revalida INEP",
    year: 2023
  },

  // 7. Diagnóstico por Imagem - Angio-TC TEP em sela
  {
    subjectName: "Diagnóstico por Imagem",
    text: "Mulher de 52 anos, no 12º dia de pós-operatório de artroplastia total de quadril, apresenta dispneia súbita, dor torácica pleurítica à direita e hemoptise discreta. Ao exame: FC 118 bpm, FR 28 irpm, SatO2 88% em ar ambiente, PA 100x65 mmHg. O escore de Wells é calculado em 7,5 pontos (alta probabilidade). A paciente foi submetida à angiotomografia computadorizada de artérias pulmonares (corte axial exibido abaixo). Assinale a interpretação correta do achado tomográfico e a conduta imediata preconizada:",
    imageUrl: "/images/clinical/tc_angiotep.jpg",
    options: [
      "Dissecção aórtica aguda tipo A de Stanford com flap intimal na aorta ascendente; indicação cirúrgica de Bentall-De Bono imediata.",
      "Tromboembolismo pulmonar maciço em sela, com extenso defeito de enchimento ocluindo a bifurcação do tronco e artérias pulmonares principais; anticoagulação plena com heparina.",
      "Pneumonia lobar com broncograma aéreo e consolidação extensa no lobo superior direito; início imediato de moxifloxacino venoso.",
      "Tamponamento cardíaco pericárdico com espessamento da fáscia fibrosa; drenagem pericárdica por janela subxifoide."
    ],
    correctOption: 1,
    explanation: "A angio-TC de artérias pulmonares demonstra um volumoso tromboembolismo pulmonar (TEP em sela), evidenciado como uma falha de enchimento hipoatenuante intraluminal bilateral que cavalga a bifurcação do tronco da artéria pulmonar principal (MPA) e se estende para as artérias pulmonares direita (RPA) e esquerda (LPA). Na ausência de instabilidade hemodinâmica refratária (choque cardiogênico ou hipotensão com PAS < 90 mmHg sustentada), o pilar inicial do tratamento é a anticoagulação plena imediata com heparina (HBPM, HNF ou fondaparinux) ou anticoagulantes orais diretos (DOACs).",
    source: "AMP",
    year: 2024
  },

  // 8. Diagnóstico por Imagem - RX Volvo de Sigmoide
  {
    subjectName: "Diagnóstico por Imagem",
    text: "Homem de 72 anos, residente em zona rural endêmica de Doença de Chagas, dá entrada no pronto-atendimento com dor em cólica, distensão abdominal progressiva marcante e parada de eliminação de gases e fezes há 4 dias. Nega febre ou vômitos fecaloide. A radiografia simples de abdome em decúbito dorsal revelou a alteração demonstrada na imagem. Assinale a alternativa que descreve o sinal radiológico patognomônico e a conduta inicial recomendada na ausência de sinais de peritonite:",
    imageUrl: "/images/clinical/rx_volvulo_sigmoide.jpg",
    options: [
      "Sinal do colar de pérolas; colectomia total com anastomose ileorretal primária.",
      "Sinal do grão de café (ou U invertido) decorrente de volvo de sigmoide; descompressão e desvolvulação por retossigmoidoscopia ou colonoscopia.",
      "Sinal do pneumatose intestinal por isquemia mesentérica arterial; laparotomia exploradora com enterectomia ampla.",
      "Sinal do empilhamento de moedas decorrente de obstrução de delgado por brida; sondagem nasogástrica e jejum por 48 horas."
    ],
    correctOption: 1,
    explanation: "A radiografia simples de abdome exibe uma alça cólica sigmoideana maciçamente distendida e desprovida de haustrações, originando-se da pelve e estendendo-se em direção ao hipocôndrio direito, formando a clássica imagem em 'grão de café' (ou sinal do U invertido/alça em ômega), patognomônica de Volvo de Sigmoide. Quando o paciente não apresenta sinais de sepse, perfuração ou necrose transmural (ausência de febre, peritonite ou pneumoperitônio), a conduta inicial recomendada é a descompressão e desvolvulação endoscópica não operatória (por retossigmoidoscopia ou colonoscopia), programando-se ressecção cirúrgica eletiva durante a mesma internação pelo alto índice de recidiva.",
    source: "UERJ",
    year: 2023
  },

  // 9. Semiologia Médica II - ECG IAM com Supra de ST
  {
    subjectName: "Semiologia Médica II",
    text: "Homem de 58 anos, hipertenso, diabético e tabagista, dá entrada na sala de emergência com dor retroesternal em aperto, de forte intensidade, com irradiação para mandíbula e membro superior esquerdo, acompanhada de diaforese fria, iniciada há 90 minutos. O eletrocardiograma de 12 derivações realizado na admissão (porta-eletrocardiograma < 10 min) é apresentado abaixo. Diante dos achados eletrocardiográficos, assinale a artéria coronária mais provavelmente ocluída e o diagnóstico topográfico:",
    imageUrl: "/images/clinical/ecg_iam_supra_st.jpg",
    options: [
      "Artéria coronária direita; Infarto agudo do miocárdio de parede inferior com acometimento de ventrículo direito.",
      "Artéria descendente anterior (DA); Infarto agudo do miocárdio com supradesnivelamento de ST anterosseptal/anterior extenso.",
      "Artéria circunflexa; Infarto agudo do miocárdio de parede lateral alta sem supradesnivelamento de ST.",
      "Artéria coronária esquerda principal; Angina instável de alto risco com onda T invertida simétrica."
    ],
    correctOption: 1,
    explanation: "O traçado eletrocardiográfico evidencia pronunciado supradesnivelamento do segmento ST (> 4 mm, morfologia em abóbada/'tombstoning') nas derivações precordiais V1, V2, V3 e V4, definindo Infarto Agudo do Miocárdio com Supradesnivelamento de ST (IAMCSST) de parede anterior extensa/anterosseptal. A parede anterior do ventrículo esquerdo e o septo interventricular recebem irrigação primária da Artéria Descendente Anterior (DA), ramo da coronária esquerda. O tempo porta-balão recomendado é ≤ 90 minutos (ou ≤ 120 minutos caso transferência para centro hemodinâmico), ou porta-agulha ≤ 30 minutos para trombólise química.",
    source: "SCMSP",
    year: 2024
  },

  // 10. Farmacologia Clínica - ECG Fibrilação Atrial
  {
    subjectName: "Farmacologia Clínica",
    text: "Mulher de 73 anos com histórico de hipertensão arterial e insuficiência cardíaca comparece ao ambulatório com palpitações taquicárdicas irregulares e fadiga aos esforços moderados com início há 3 semanas. Ao exame cardiovascular: ritmo cardíaco irregular em dois tempos com bulhas de intensidade variável e pulso radial assimétrico em relação à frequência cardíaca auscultada (déficit de pulso). Foi realizado o eletrocardiograma reproduzido abaixo. Assinale os critérios eletrocardiográficos diagnósticos que confirmam a arritmia observada:",
    imageUrl: "/images/clinical/ecg_fibrilacao_atrial.jpg",
    options: [
      "Ondas F 'em dente de serra' regulares com frequência atrial de 300 bpm e condução AV fixa 2:1.",
      "Intervalos R-R absolutamente irregulares ('irregularmente irregular'), ausência de ondas P sinusais e presença de oscilações basais rápidas de amplitude e contorno variáveis (ondas f).",
      "Dissociação atrioventricular completa com frequência ventricular constante de 35 bpm e complexos QRS alargados.",
      "Taquicardia atrial monomórfica com onda P precedendo cada complexo QRS e intervalo PR prolongado > 0,20 s."
    ],
    correctOption: 1,
    explanation: "O traçado demonstra as marcas registradas diagnósticas da Fibrilação Atrial (FA): 1) Intervalos R-R completamente irregulares (ausência de qualquer padrão de periodicidade); 2) Ausência de ondas P organizadas na linha de base; e 3) Presença de atividade elétrica atrial caótica e rápida manifestada por minúsculas oscilações basais irregulares de voltagem variável (ondas f, usualmente com frequência entre 350 e 600 bpm). Em paciente idosa e hipertensa com CHA2DS2-VASc elevado, além do controle de frequência (ex.: betabloqueadores), a anticoagulação oral plena é imperativa para prevenção de AVC cardioembólico.",
    source: "UFRJ",
    year: 2024
  },

  // 11. Histologia & Embriologia - Lâmina Anemia Falciforme
  {
    subjectName: "Histologia & Embriologia",
    text: "Criança de 4 anos de idade é levada ao serviço de emergência pediátrica com quadro de palidez cutaneomucosa acentuada, icterícia escleral leve e episódios recorrentes de dores ósseas intensas em membros. O hemograma revelou hemoglobina de 6,8 g/dL com reticulocitose expressiva (9,5%). Foi realizada bacterioscopia/esfregaço de sangue periférico com coloração de Giemsa, cuja microscopia de alta magnificação é exibida a seguir. Assinale a alteração morfológica eritrocitária predominante e o mecanismo molecular responsável por essa patologia:",
    imageUrl: "/images/clinical/lamina_anemia_falciforme.jpg",
    options: [
      "Esferócitos densos sem halo central; defeito congênito das proteínas de ancoragem do citoesqueleto da membrana (espectrina/anquirina).",
      "Drepanócitos (hemácias afiladas em formato de foice/semilua); substituição do ácido glutâmico por valina na posição 6 da cadeia beta da globina (mutação HbS).",
      "Dacriócitos (hemácias em gota); fibrose medular reativa com hematopoiese extramedular no baço.",
      "Hemácias em alvo (codócitos) com corpos de Heinz; deficiência enzimática de glicose-6-fosfato desidrogenase (G6PD)."
    ],
    correctOption: 1,
    explanation: "A microfotografia de sangue periférico revela a presença de drepanócitos (células falciformes), hemácias alongadas, curvas e afiladas nas extremidades com aspecto característico em foice ou semilua. Essa alteração morfológica decorre da polimerização anormal das moléculas de hemoglobina mutante (HbS) em condições de hipóxia celular, acidose ou desidratação. No nível molecular, a mutação primária da Anemia Falciforme clássica (genótipo SS) é uma mutação de ponto no gene HBB (cromossomo 11) que troca uma base adenina por timina (GAG -> GTG), resultando na substituição do resíduo hidrofílico de ácido glutâmico por um aminoácido hidrofóbico de valina na posição 6 da cadeia beta da hemoglobina.",
    source: "UNICAMP",
    year: 2023
  },

  // 12. Patologia Geral - Lâmina Bastonetes de Auer
  {
    subjectName: "Patologia Geral",
    text: "Mulher de 46 anos, previamente hígida, procura atendimento médico com fadiga progressiva, febre diária de 38,2 °C e epistaxe espontânea há 2 semanas. Exames laboratoriais de urgência demonstram: Hb 7,2 g/dL, Leucócitos 48.000/mm³ (com 68% de blastos indistintos) e Plaquetas 24.000/mm³. A análise microscópica do esfregaço de sangue periférico evidenciou blastos com as estruturas aciculares intracitoplasmáticas azurofílicas indicadas na microfotografia abaixo. Assinale a estrutura identificada e o diagnóstico nosológico correspondente:",
    imageUrl: "/images/clinical/lamina_bastonetes_auer.jpg",
    options: [
      "Corpos de Howell-Jolly; Anemia megaloblástica por deficiência de cobalamina.",
      "Bastonetes de Auer (Auer rods); Leucemia Mieloide Aguda (LMA).",
      "Corpúsculos de Döhle; Sepse grave com reação leucemoide bacteriana.",
      "Corpos de Pappenheimer; Síndrome mielodisplásica com sideroblastos em anel."
    ],
    correctOption: 1,
    explanation: "A microfotografia demonstra um mieloblasto exibindo em seu citoplasma o clássico Bastonete de Auer (Auer rod): inclusão fusiforme, linear ou acicular (em forma de agulha), de coloração vermelho-azurofílica, resultante da cristalização e fusão anormal de grânulos citoplasmáticos primários ricos em mieloperoxidase e enzimas lisossômicas. A identificação inequívoca de bastonetes de Auer é patognomônica da linhagem mieloide e confirma categoricamente o diagnóstico de Leucemia Mieloide Aguda (LMA), excluindo a Leucemia Linfoblástica Aguda (LLA), cujos linfoblastos nunca formam tais estruturas.",
    source: "USP-SP",
    year: 2024
  },

  // 13. Patologia Geral - Glomerulonefrite Crescêntica
  {
    subjectName: "Patologia Geral",
    text: "Homem de 34 anos apresenta quadro súbito de edema periorbitário, hipertensão arterial grave e oligúria com urina cor de coca-cola (hematúria macroscópica). Os exames laboratoriais revelam elevação acelerada de escórias nitrogenadas (Creatinina subiu de 0,9 mg/dL para 4,6 mg/dL em 10 dias). O sedimento urinário evidencia cilindros hemáticos e proteinúria de 2,2 g/24h. Realizada biópsia renal percutânea com coloração pelo ácido periódico de Schiff (PAS), cujo corte histológico de um glomérulo é exibido abaixo. Assinale a estrutura histopatológica determinante e a síndrome clínica representada:",
    imageUrl: "/images/clinical/histologia_gnrp_crescentes.jpg",
    options: [
      "Nódulos de Kimmelstiel-Wilson; Nefropatia diabética avançada.",
      "Crescente glomerular fibrocelular ocupando o espaço de Bowman; Glomerulonefrite Rapidamente Progressiva (GNRP).",
      "Atrofia tubular com cilindros hialinos 'tireoidizados'; Pielonefrite crônica intersticial.",
      "Espessamento difuso da membrana basal glomerular com 'spikes' subepiteliais; Nefropatia membranosa primária."
    ],
    correctOption: 1,
    explanation: "O corte histológico renal com coloração PAS evidencia a formação de um volumoso Crescente Celular (ou fibrocelular), caracterizado pela proliferação exuberante de células epiteliais parietais da cápsula de Bowman associadas ao influxo de macrófagos e deposição de fibrina no interior do espaço urinário (espaço de Bowman), comprimindo e colapsando o tufo glomerular capilar adjacente. A presença de crescentes glomerulares em mais de 50% dos glomérulos é o substrato anatomopatológico definitivo da Glomerulonefrite Rapidamente Progressiva (GNRP) ou Glomerulonefrite Crescêntica, manifestada clinicamente por perda acelerada da taxa de filtração glomerular ao longo de semanas/dias associada à síndrome nefrítica grave.",
    source: "UNIFESP",
    year: 2023
  },

  // 14. Imunologia & Microbiologia - Granuloma Tuberculose Células de Langhans
  {
    subjectName: "Imunologia & Microbiologia",
    text: "Paciente de 38 anos, imunocompetente, procurou o serviço de pneumologia com tosse produtiva arrastada há mais de 6 semanas, febre vespertina baixa, sudorese noturna profusa e emagrecimento de 7 kg. A biópsia de linfonodo hilar e parênquima pulmonar revelou a alteração anatomopatológica exibida na fotomicrografia a seguir. Assinale o tipo de reação tecidual, a célula multinucleada gigante característica e o mediador imunológico chave na sua orquestração:",
    imageUrl: "/images/clinical/histologia_granuloma_tb.jpg",
    options: [
      "Inflamação exsudativa purulenta rica em neutrófilos segmentados; Interleucina-8 (CXCL8).",
      "Inflamação crônica granulomatosa com necrose caseosa e célula gigante de Langhans (núcleos em ferradura); Interferon-gama (IFN-γ) liberado por linfócitos T helper 1 (Th1).",
      "Reação inflamatória aguda mediada por mastócitos e eosinófilos; Interleucina-5 e IgE sérica.",
      "Processo degenerativo fibrinoide vascular; Fator de necrose tumoral beta liberado por células B foliculares."
    ],
    correctOption: 1,
    explanation: "A fotomicrografia revela a estrutura clássica de um Granuloma Tuberculoso (reação de hipersensibilidade do tipo IV mediada por células): centro com necrose de caseificação (necrose caseosa acelular acidofílica), rodeado por macrófagos ativados (células epitelioides) e Células Gigantes Multinucleadas de Langhans. Estas últimas são formadas pela fusão celular de macrófagos estimulados cronicamente e exibem arranjo semicircular periférico dos seus múltiplos núcleos (aspecto em 'ferradura' ou coroa). Essa arquitetura imunitária é induzida e sustentada pela secreção de Interferon-gama (IFN-γ) e TNF-alfa por linfócitos T CD4+ ativados com perfil Th1 em resposta aos antígenos do Mycobacterium tuberculosis.",
    source: "FUVEST / USP",
    year: 2024
  },

  // 15. Diagnóstico por Imagem - USG Cálculo Biliar Sombra Acústica
  {
    subjectName: "Diagnóstico por Imagem",
    text: "Mulher de 42 anos, puérpera há 6 meses, procura o pronto-atendimento com episódios recorrentes de dor em cólica intensa no hipocôndrio direito e epigástrio, com irradiação para a escápula direita, que piora de 30 a 60 minutos após refeições gordurosas, associada a náuseas e vômitos. O abdome é doloroso à palpação profunda em hipocôndrio direito, com sinal de Murphy duvidoso. Foi realizada a ultrassonografia de abdome superior exibida na imagem abaixo. Assinale o achado ultrassonográfico e a conclusão diagnóstica correspondente:",
    imageUrl: "/images/clinical/usg_colelitiase_sombra.jpg",
    options: [
      "Pólipo vesicular séssil com reforço acústico posterior; indicação de colecistectomia profilática de urgência.",
      "Cálculo no interior da vesícula biliar (colelitíase), evidenciado como imagem focal hiperecogênica com formação de sombra acústica posterior limpa.",
      "Coleção anecoica retroperitoneal com espessamento parietal > 8 mm; abscesso pancreático perilesional.",
      "Lama biliar estratificada sem reflexão acústica; indicação exclusiva de terapia médica dissolutiva com ácido ursodesoxicólico."
    ],
    correctOption: 1,
    explanation: "A ultrassonografia de vesícula biliar evidencia os critérios semiológicos clássicos de cálculo biliar (colelitíase): formação intraluminal focal intensamente hiperecogênica (brilhante), móvel à mudança de decúbito, com nítida Sombra Acústica Posterior (faixa anecoica escura logo abaixo do cálculo). Esse artefato físico fundamental ocorre porque os cálculos (ricos em colesterol ou sais biliares/cálcio) atenuam e refletem quase a totalidade dos ecos do feixe de ultrassom, impedindo que o som alcance as estruturas imediatamente posteriores a eles. Pólipos de vesícula biliar, ao contrário, não produzem sombra acústica e são fixos à parede.",
    source: "SURCE",
    year: 2023
  }
];
