import fs from 'fs';
import { pipeline } from 'stream/promises';

async function run() {
  const url = 'https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe';
  console.log('Downloading cloudflared.exe from GitHub releases...');
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  const fileStream = fs.createWriteStream('cloudflared.exe');
  await pipeline(res.body, fileStream);
  console.log('✅ cloudflared.exe downloaded successfully. Size:', fs.statSync('cloudflared.exe').size, 'bytes');
}

run().catch(console.error);
