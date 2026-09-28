/**
 * Créditos das imagens clínicas de acervos livres (Wikimedia Commons).
 * Licenças aceitas: domínio público, CC0, CC BY e CC BY-SA. As imagens foram redimensionadas
 * e comprimidas para uso na plataforma. Exibidos na página /creditos e junto às questões.
 */
export interface ImageCredit {
  file: string;
  title: string;
  author: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
}

export const IMAGE_CREDITS: ImageCredit[] = [
  {
    "file": "/images/clinical/lamina_anemia_falciforme.jpg",
    "title": "Sicklecells",
    "author": "NIDDK",
    "license": "Public domain",
    "licenseUrl": "",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Sicklecells.jpg"
  },
  {
    "file": "/images/clinical/rx_pneumonia_lobar.jpg",
    "title": "X-ray of lobar pneumonia",
    "author": "Mikael Häggström, M.D.",
    "license": "CC0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:X-ray_of_lobar_pneumonia.jpg"
  },
  {
    "file": "/images/clinical/rx_derrame_pleural.png",
    "title": "LargePleuralEffusionLatPlain",
    "author": "James Heilman, MD",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:LargePleuralEffusionLatPlain.png"
  },
  {
    "file": "/images/clinical/rx_kerley_b.jpg",
    "title": "Chest radiograph of a lung with Kerley B lines",
    "author": "Mikael Häggström",
    "license": "CC0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Chest_radiograph_of_a_lung_with_Kerley_B_lines.jpg"
  },
  {
    "file": "/images/clinical/usg_hidronefrose.jpg",
    "title": "Ultrasound of right kidney moderate hydronephrosis",
    "author": "Cerevisae",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Ultrasound_of_right_kidney_moderate_hydronephrosis.jpg"
  },
  {
    "file": "/images/clinical/rm_sagital_cerebro.jpg",
    "title": "MRI brain sagittal section",
    "author": "everyone's idle",
    "license": "CC BY-SA 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:MRI_brain_sagittal_section.jpg"
  },
  {
    "file": "/images/clinical/anat_valva_aortica.png",
    "title": "Gray497",
    "author": "Henry Vandyke Carter",
    "license": "Public domain",
    "licenseUrl": "",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Gray497.png"
  },
  {
    "file": "/images/clinical/hist_pele.jpg",
    "title": "Thick Skin Histological Section (epidermis, dermis and hypodermis)",
    "author": "Iceclanl",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Thick_Skin_Histological_Section_(epidermis,_dermis_and_hypodermis).jpg"
  },
  {
    "file": "/images/clinical/path_esteatose.jpg",
    "title": "Histopathology of centrilobular steatosis of the liver",
    "author": "Mikael Häggström, M.D.",
    "license": "CC0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Histopathology_of_centrilobular_steatosis_of_the_liver.jpg"
  },
  {
    "file": "/images/clinical/path_amiloide.jpg",
    "title": "Cardiac amyloidosis high mag",
    "author": "Nephron",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Cardiac_amyloidosis_high_mag.jpg"
  },
  {
    "file": "/images/clinical/path_enfisema.jpg",
    "title": "Emphysema low mag",
    "author": "Nephron",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Emphysema_low_mag.jpg"
  },
  {
    "file": "/images/clinical/path_cccr.jpg",
    "title": "Clear cell renal cell carcinoma intermed mag",
    "author": "Nephron",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Clear_cell_renal_cell_carcinoma_intermed_mag.jpg"
  },
  {
    "file": "/images/clinical/path_hodgkin.jpg",
    "title": "CHL lacunar cell x40",
    "author": "Mark ong",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:CHL_lacunar_cell_x40.jpg"
  },
  {
    "file": "/images/clinical/micro_zn_tb.jpg",
    "title": "Mycobacterium tuberculosis Ziehl-Neelsen stain 02",
    "author": "CDC/Dr. George P. Kubica",
    "license": "Public domain",
    "licenseUrl": "",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Mycobacterium_tuberculosis_Ziehl-Neelsen_stain_02.jpg"
  },
  {
    "file": "/images/clinical/micro_gram_saureus.jpg",
    "title": "Staphylococcus aureus Gram stain",
    "author": "Dr Graham Beards",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Staphylococcus_aureus_Gram_stain.jpg"
  },
  {
    "file": "/images/clinical/micro_plasmodium.jpg",
    "title": "P. falciparum thin smear with ring forms",
    "author": "Jenkayaks",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:P._falciparum_thin_smear_with_ring_forms.jpg"
  },
  {
    "file": "/images/clinical/micro_gonococo.jpg",
    "title": "Neisseria gonorrhoeae diplococci inside a neutrophil",
    "author": "Dr Graham Beards",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Neisseria_gonorrhoeae_diplococci_inside_a_neutrophil.jpg"
  },
  {
    "file": "/images/clinical/micro_cryptococcus.jpg",
    "title": "Cryptococcus neoformans using a light India ink staining preparation PHIL 3771 lores",
    "author": "CDC/Dr. Leanor Haley",
    "license": "Public domain",
    "licenseUrl": "",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Cryptococcus_neoformans_using_a_light_India_ink_staining_preparation_PHIL_3771_lores.jpg"
  },
  {
    "file": "/images/clinical/fisio_curva_hb.png",
    "title": "HbA vs HbF saturation curve unlabeled",
    "author": "Diberri",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:HbA_vs_HbF_saturation_curve_unlabeled.png"
  },
  {
    "file": "/images/clinical/fisio_ecg_hipercalemia.jpg",
    "title": "Hyperkalemia ECG",
    "author": "Dr. Michael-Joseph F. Agbayani and Dr. Eddieson Gonzales (Manila, Philippines)",
    "license": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Hyperkalemia_ECG.jpg"
  },
  {
    "file": "/images/clinical/bioq_inibicao.jpg",
    "title": "Inhibition-types",
    "author": "Athel cb",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Inhibition-types.jpg"
  },
  {
    "file": "/images/clinical/bioq_michaelis.png",
    "title": "MM curve",
    "author": "TimVickers",
    "license": "Public domain",
    "licenseUrl": "",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:MM_curve.png"
  },
  {
    "file": "/images/clinical/farma_antagonista.jpg",
    "title": "Dose response antagonist",
    "author": "Dylan2106",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Dose_response_antagonist.jpg"
  },
  {
    "file": "/images/clinical/farma_agonista_parcial.png",
    "title": "Dose Response Curve of Opioid Antagonists Compared to Opioid Agonists",
    "author": "Xx684xx",
    "license": "CC0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Dose_Response_Curve_of_Opioid_Antagonists_Compared_to_Opioid_Agonists.png"
  },
  {
    "file": "/images/clinical/sc_piramide.png",
    "title": "Population pyramid of Brazil 2015",
    "author": "The Central Intelligence Agency.",
    "license": "Public domain",
    "licenseUrl": "",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Population_pyramid_of_Brazil_2015.png"
  },
  {
    "file": "/images/clinical/sc_km.jpg",
    "title": "Km plot",
    "author": "Deanne Taylor (made and original to submitter)",
    "license": "Public domain",
    "licenseUrl": "",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Km_plot.jpg"
  },
  {
    "file": "/images/clinical/sc_curva_epidemica.jpg",
    "title": "Epi Curve 2018 US Salmonella Outbreak",
    "author": "CDC",
    "license": "Public domain",
    "licenseUrl": "",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Epi_Curve_2018_US_Salmonella_Outbreak.jpg"
  },
  {
    "file": "/images/clinical/sem_zoster.jpg",
    "title": "Herpes zoster chest",
    "author": "Fisle",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Herpes_zoster_chest.png"
  },
  {
    "file": "/images/clinical/sem_xantelasma.jpg",
    "title": "Xanthelasma",
    "author": "Klaus D. Peter, Wiehl, Germany",
    "license": "CC BY 3.0 de",
    "licenseUrl": "https://creativecommons.org/licenses/by/3.0/de/deed.en",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Xanthelasma.jpg"
  },
  {
    "file": "/images/clinical/sem_bocio.jpg",
    "title": "Goiter",
    "author": "Dr. J.S.Bhandari, India",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Goiter.JPG"
  },
  {
    "file": "/images/clinical/sem_ictericia.jpg",
    "title": "Jaundice of the sclerotic",
    "author": "Bobjgalindo",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Jaundice_of_the_sclerotic.JPG"
  }
];

const BY_FILE = new Map(IMAGE_CREDITS.map((c) => [c.file, c]));

export function getImageCredit(imageUrl?: string | null): ImageCredit | undefined {
  return imageUrl ? BY_FILE.get(imageUrl) : undefined;
}
