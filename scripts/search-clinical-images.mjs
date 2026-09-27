import fs from 'fs';
import path from 'path';

const SEARCH_TARGETS = [
  {
    name: 'rx_volvulo_sigmoide.jpg',
    query: 'sigmoid volvulus abdominal x-ray'
  },
  {
    name: 'ecg_iam_supra_st.jpg',
    query: 'STEMI anterior lead ECG'
  },
  {
    name: 'ecg_fibrilacao_atrial.jpg',
    query: 'atrial fibrillation ecg lead'
  },
  {
    name: 'lamina_bastonetes_auer.jpg',
    query: 'Auer rod acute myeloid leukemia blood smear'
  },
  {
    name: 'histologia_gnrp_crescentes.jpg',
    query: 'crescentic glomerulonephritis PAS'
  },
  {
    name: 'histologia_granuloma_tb.jpg',
    query: 'granuloma Langhans giant cell histology tuberculosis'
  },
  {
    name: 'usg_calculo_renal.jpg',
    query: 'kidney stone ultrasound acoustic shadow'
  }
];

async function searchCommons(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=5&prop=imageinfo&iiprop=url|mime|size&format=json`;
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'SynapseQuizBot/1.0 (medical education; contact@synapse.med)' }
    });
    const data = await res.json();
    const pages = data.query?.pages || {};
    const results = [];
    for (const id in pages) {
      const p = pages[id];
      if (p.imageinfo && p.imageinfo[0]) {
        const info = p.imageinfo[0];
        if (info.mime === 'image/jpeg' || info.mime === 'image/png') {
          results.push({
            title: p.title,
            url: info.url,
            size: info.size
          });
        }
      }
    }
    return results;
  } catch (err) {
    console.error(`Search error for "${query}":`, err.message);
    return [];
  }
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
  console.log(`Saved: ${destPath} (${buffer.byteLength} bytes) from ${url}`);
}

async function run() {
  const targetDir = path.resolve('public', 'images', 'clinical');
  for (const item of SEARCH_TARGETS) {
    const dest = path.join(targetDir, item.name);
    console.log(`Searching for: ${item.query}...`);
    const results = await searchCommons(item.query);
    if (results.length > 0) {
      console.log(`Found ${results.length} candidates. Top: ${results[0].title}`);
      try {
        await downloadFile(results[0].url, dest);
      } catch (err) {
        console.error(`Download failed: ${err.message}`);
      }
    } else {
      console.warn(`No results found for ${item.query}`);
    }
  }
}

run();
