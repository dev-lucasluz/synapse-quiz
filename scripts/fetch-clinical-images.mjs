import fs from 'fs';
import path from 'path';

const IMAGES = [
  {
    name: 'rx_volvulo_sigmoide.jpg',
    wikiFile: 'File:Sigmoid volvulus.jpg',
    backupUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Sigmoid_volvulus.jpg'
  },
  {
    name: 'ecg_iam_supra_st.jpg',
    wikiFile: 'File:Anterior STEMI.jpg',
    backupUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Anterior_STEMI.jpg'
  },
  {
    name: 'ecg_fibrilacao_atrial.jpg',
    wikiFile: 'File:Atrial fibrillation.png',
    backupUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Atrial_fibrillation.png'
  },
  {
    name: 'lamina_anemia_falciforme.jpg',
    wikiFile: 'File:Sicklecells.jpg',
    backupUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Sicklecells.jpg'
  },
  {
    name: 'lamina_bastonetes_auer.jpg',
    wikiFile: 'File:Auer rod in AML.jpg',
    backupUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Auer_rod_in_AML.jpg'
  },
  {
    name: 'histologia_gnrp_crescentes.jpg',
    wikiFile: 'File:Crescentic glomerulonephritis - PAS.jpg',
    backupUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Crescentic_glomerulonephritis_-_PAS.jpg'
  },
  {
    name: 'histologia_granuloma_tb.jpg',
    wikiFile: 'File:Tuberculosis in lymph node - Langhans giant cells.jpg',
    backupUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Tuberculosis_in_lymph_node_-_Langhans_giant_cells.jpg'
  },
  {
    name: 'usg_calculo_renal.jpg',
    wikiFile: 'File:Kidney stone 02.jpg',
    backupUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Kidney_stone_02.jpg'
  }
];

async function getWikiFileUrl(fileName) {
  const endpoint = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(fileName)}&prop=imageinfo&iiprop=url&format=json`;
  try {
    const res = await fetch(endpoint, {
      headers: { 'User-Agent': 'SynapseQuizBot/1.0 (medical education; contact@synapse.med)' }
    });
    const data = await res.json();
    const pages = data.query?.pages || {};
    for (const id in pages) {
      const info = pages[id].imageinfo;
      if (info && info[0]?.url) {
        return info[0].url;
      }
    }
  } catch (err) {
    console.error(`Error querying wiki for ${fileName}:`, err.message);
  }
  return null;
}

async function downloadFile(url, destPath) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'SynapseQuizBot/1.0 (medical education; contact@synapse.med)' }
  });
  if (!res.ok) {
    throw new Error(`Failed to download ${url}: status ${res.status}`);
  }
  const buffer = await res.arrayBuffer();
  fs.writeFileSync(destPath, Buffer.from(buffer));
  console.log(`Saved: ${destPath} (${buffer.byteLength} bytes)`);
}

async function run() {
  const targetDir = path.resolve('public', 'images', 'clinical');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  for (const item of IMAGES) {
    const dest = path.join(targetDir, item.name);
    console.log(`Fetching ${item.name}...`);
    let fileUrl = await getWikiFileUrl(item.wikiFile);
    if (!fileUrl) {
      console.log(`Fallback for ${item.name} -> ${item.backupUrl}`);
      fileUrl = item.backupUrl;
    }
    try {
      await downloadFile(fileUrl, dest);
    } catch (e) {
      console.warn(`Initial download failed for ${item.name}, trying backup: ${e.message}`);
      if (fileUrl !== item.backupUrl) {
        try {
          await downloadFile(item.backupUrl, dest);
        } catch (e2) {
          console.error(`Backup also failed for ${item.name}: ${e2.message}`);
        }
      }
    }
  }
}

run();
