// Gráficos didáticos redesenhados do zero, em português (arte original).
const sharp = require("sharp");
const fs = require("fs");

const FONT = "Arial, Helvetica, sans-serif";
const INK = "#1f2937";
const GRID = "#e5e7eb";
const svgWrap = (w, h, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" font-family="${FONT}"><rect width="${w}" height="${h}" fill="#ffffff"/>${body}</svg>`;
const T = (x, y, s, size = 28, extra = "") =>
  `<text x="${x}" y="${y}" font-size="${size}" ${/fill=/.test(extra) ? "" : `fill="${INK}"`} ${extra}>${s}</text>`;
const sup = (base, exp, size = 26) => `${base}<tspan dy="-10" font-size="${Math.round(size * 0.68)}">${exp}</tspan>`;

async function save(svg, out) {
  const buf = Buffer.from(svg);
  if (out.endsWith(".png")) await sharp(buf).png({ compressionLevel: 9, palette: true, quality: 92 }).toFile(out);
  else await sharp(buf).flatten({ background: "#fff" }).jpeg({ quality: 92, mozjpeg: true }).toFile(out);
  console.log(out, Math.round(fs.statSync(out).size / 1024) + "KB");
}

// ── 1. Lineweaver-Burk (4 painéis) ─────────────────────────────────────────
function lineweaver() {
  const W = 1200, H = 1050;
  const panels = [
    { title: "Inibição competitiva", a1: 0.5, b1: 0.5, a2: 0.5, b2: 1.25 },
    { title: "Inibição incompetitiva", a1: 0.5, b1: 0.5, a2: 1.0, b2: 0.5 },
    { title: "Inibição mista", a1: 0.5, b1: 0.5, a2: 1.0, b2: 1.5 },
    { title: "Inibição não competitiva pura", a1: 0.5, b1: 0.5, a2: 1.0, b2: 1.0 },
  ];
  let body = "";
  panels.forEach((p, i) => {
    const ox = (i % 2) * 600, oy = Math.floor(i / 2) * 490;
    const L = 60, R = 560, Tp = 90, B = 440; // caixa do gráfico
    const xmin = -1.7, xmax = 3.0, ymin = -0.25, ymax = 2.6;
    const px = (x) => ox + L + ((x - xmin) / (xmax - xmin)) * (R - L);
    const py = (y) => oy + B - ((y - ymin) / (ymax - ymin)) * (B - Tp);
    body += T(ox + 300, oy + 50, p.title, 32, 'font-weight="bold" text-anchor="middle"');
    // eixos
    body += `<line x1="${px(0)}" y1="${py(ymax)}" x2="${px(0)}" y2="${py(ymin)}" stroke="${INK}" stroke-width="3"/>`;
    body += `<line x1="${px(xmin)}" y1="${py(0)}" x2="${px(xmax)}" y2="${py(0)}" stroke="${INK}" stroke-width="3"/>`;
    body += T(px(0) + 10, py(ymax) + 26, "1/v", 30, 'font-style="italic"');
    body += T(px(xmax) - 4, py(0) + 40, "1/[S]", 30, 'text-anchor="end" font-style="italic"');
    const line = (a, b, color) => {
      const x1 = Math.max(xmin, -a / b - 0.6 > xmin ? -a / b - 0.6 : xmin);
      const x2 = Math.min(xmax, (ymax - a) / b);
      return `<line x1="${px(x1)}" y1="${py(a + b * x1)}" x2="${px(x2)}" y2="${py(a + b * x2)}" stroke="${color}" stroke-width="5" stroke-linecap="round"/>`;
    };
    body += line(p.a1, p.b1, "#1d4ed8") + line(p.a2, p.b2, "#dc2626");
  });
  // legenda
  body += `<line x1="380" y1="1010" x2="440" y2="1010" stroke="#1d4ed8" stroke-width="6"/>` + T(452, 1020, "sem inibidor", 28);
  body += `<line x1="700" y1="1010" x2="760" y2="1010" stroke="#dc2626" stroke-width="6"/>` + T(772, 1020, "com inibidor", 28);
  return svgWrap(W, H, body);
}

// ── 2. Michaelis-Menten ────────────────────────────────────────────────────
function michaelis() {
  const W = 1000, H = 700, L = 150, R = 940, Tp = 60, B = 590;
  const px = (s) => L + (s / 4000) * (R - L);
  const py = (v) => B - (v / 0.36) * (B - Tp);
  const vmax = 0.34, km = 400;
  const f = (s) => (vmax * s) / (km + s);
  let body = "";
  for (let v = 0; v <= 0.351; v += 0.05) {
    body += `<line x1="${L}" y1="${py(v)}" x2="${R}" y2="${py(v)}" stroke="${GRID}" stroke-width="1.5"/>`;
    body += T(L - 14, py(v) + 9, v.toFixed(2).replace(".", ","), 24, 'text-anchor="end"');
  }
  for (let s = 0; s <= 4000; s += 500) {
    body += `<line x1="${px(s)}" y1="${Tp}" x2="${px(s)}" y2="${B}" stroke="${GRID}" stroke-width="1.5"/>`;
    body += T(px(s), B + 34, String(s), 24, 'text-anchor="middle"');
  }
  body += `<line x1="${L}" y1="${Tp}" x2="${L}" y2="${B}" stroke="${INK}" stroke-width="3"/><line x1="${L}" y1="${B}" x2="${R}" y2="${B}" stroke="${INK}" stroke-width="3"/>`;
  // Vmax e 1/2 Vmax
  body += `<line x1="${L}" y1="${py(vmax)}" x2="${R}" y2="${py(vmax)}" stroke="#dc2626" stroke-width="3" stroke-dasharray="12 8"/>`;
  body += T(R - 6, py(vmax) - 12, "Vmax = 0,34", 28, 'text-anchor="end" fill="#dc2626"');
  body += `<line x1="${L}" y1="${py(vmax / 2)}" x2="${px(km)}" y2="${py(vmax / 2)}" stroke="#2563eb" stroke-width="3" stroke-dasharray="12 8"/>`;
  body += `<line x1="${px(km)}" y1="${py(vmax / 2)}" x2="${px(km)}" y2="${B}" stroke="#2563eb" stroke-width="3" stroke-dasharray="12 8"/>`;
  body += T(px(km) + 200, py(vmax / 2) + 40, "½ Vmax = 0,17", 28, 'fill="#2563eb"');
  // curva
  let d = "";
  for (let s = 0; s <= 4000; s += 20) d += (s === 0 ? "M" : "L") + px(s).toFixed(1) + " " + py(f(s)).toFixed(1);
  body += `<path d="${d}" fill="none" stroke="${INK}" stroke-width="5"/>`;
  [50, 100, 200, 400, 800, 1500, 2500, 3700].forEach((s) => (body += `<circle cx="${px(s)}" cy="${py(f(s))}" r="8" fill="${INK}"/>`));
  body += T((L + R) / 2, B + 80, "Concentração de substrato [S]", 30, 'text-anchor="middle"');
  body += `<text transform="translate(52 ${(Tp + B) / 2}) rotate(-90)" font-size="30" fill="${INK}" text-anchor="middle">Velocidade da reação (v)</text>`;
  return svgWrap(W, H, body);
}

// ── 3. Antagonismo competitivo ─────────────────────────────────────────────
function antagonista() {
  const W = 1000, H = 700, L = 150, R = 950, Tp = 70, B = 570;
  const px = (x) => L + ((x + 9) / 6) * (R - L);
  const py = (y) => B - (y / 100) * (B - Tp);
  const curve = (c) => {
    let d = "";
    for (let x = -9; x <= -3; x += 0.05) d += (x === -9 ? "M" : "L") + px(x).toFixed(1) + " " + py(100 / (1 + Math.pow(10, c - x))).toFixed(1);
    return d;
  };
  let body = "";
  for (let y = 0; y <= 100; y += 25) {
    body += `<line x1="${L}" y1="${py(y)}" x2="${R}" y2="${py(y)}" stroke="${GRID}" stroke-width="1.5"/>` + T(L - 14, py(y) + 9, String(y), 26, 'text-anchor="end"');
  }
  for (let x = -9; x <= -3; x++) {
    body += `<line x1="${px(x)}" y1="${B}" x2="${px(x)}" y2="${B + 10}" stroke="${INK}" stroke-width="3"/>`;
    body += `<text x="${px(x)}" y="${B + 44}" font-size="26" fill="${INK}" text-anchor="middle">${sup("10", "−" + Math.abs(x))}</text>`;
  }
  body += `<line x1="${L}" y1="${Tp}" x2="${L}" y2="${B}" stroke="${INK}" stroke-width="3"/><line x1="${L}" y1="${B}" x2="${R}" y2="${B}" stroke="${INK}" stroke-width="3"/>`;
  body += `<line x1="${L}" y1="${py(50)}" x2="${R}" y2="${py(50)}" stroke="#6b7280" stroke-width="2.5" stroke-dasharray="8 8"/>`;
  [[-7, "#1d4ed8"], [-6, "#ea580c"], [-5, "#dc2626"]].forEach(([c, col]) => (body += `<path d="${curve(c)}" fill="none" stroke="${col}" stroke-width="6"/>`));
  // legenda
  const lg = (y, col, txt) => `<line x1="${L + 30}" y1="${y}" x2="${L + 90}" y2="${y}" stroke="${col}" stroke-width="6"/>` + T(L + 104, y + 10, txt, 27);
  body += lg(Tp + 20, "#1d4ed8", "agonista sozinho") + lg(Tp + 62, "#ea580c", "agonista + antagonista (dose menor)") + lg(Tp + 104, "#dc2626", "agonista + antagonista (dose maior)");
  body += T((L + R) / 2, B + 92, "Concentração do agonista (escala logarítmica)", 30, 'text-anchor="middle"');
  body += `<text transform="translate(52 ${(Tp + B) / 2}) rotate(-90)" font-size="30" fill="${INK}" text-anchor="middle">Resposta (% do máximo)</text>`;
  return svgWrap(W, H, body);
}

// ── 4. Agonista pleno x parcial x antagonista ──────────────────────────────
function agonistaParcial() {
  const W = 1000, H = 640, L = 130, R = 940, Tp = 60, B = 540;
  const px = (x) => L + ((x + 9) / 6) * (R - L);
  const py = (y) => B - (y / 110) * (B - Tp);
  const curve = (emax, c, hill = 1) => {
    let d = "";
    for (let x = -9; x <= -3; x += 0.05) d += (x === -9 ? "M" : "L") + px(x).toFixed(1) + " " + py(emax / (1 + Math.pow(10, hill * (c - x)))).toFixed(1);
    return d;
  };
  let body = `<line x1="${L}" y1="${Tp}" x2="${L}" y2="${B}" stroke="${INK}" stroke-width="3"/><line x1="${L}" y1="${B}" x2="${R}" y2="${B}" stroke="${INK}" stroke-width="3"/>`;
  body += `<path d="${curve(100, -5, 1)}" fill="none" stroke="#dc2626" stroke-width="6"/>`;
  body += `<path d="${curve(55, -6.6, 1.3)}" fill="none" stroke="#1d4ed8" stroke-width="6"/>`;
  body += `<line x1="${px(-7)}" y1="${B - 3}" x2="${px(-3.2)}" y2="${B - 3}" stroke="#16a34a" stroke-width="6"/>`;
  body += T(px(-3.9), py(100) - 6, "agonista pleno", 30, 'text-anchor="end" fill="#dc2626" font-weight="bold"');
  body += T(px(-3.9), py(55) - 14, "agonista parcial", 30, 'text-anchor="end" fill="#1d4ed8" font-weight="bold"');
  body += T(px(-3.3), B - 20, "antagonista", 30, 'text-anchor="end" fill="#16a34a" font-weight="bold"');
  body += T((L + R) / 2, B + 70, "Logaritmo da dose", 30, 'text-anchor="middle"');
  body += `<text transform="translate(52 ${(Tp + B) / 2}) rotate(-90)" font-size="30" fill="${INK}" text-anchor="middle">Efeito</text>`;
  return svgWrap(W, H, body);
}

// ── 5. Pirâmide etária (Brasil, 2015, valores aproximados em milhões) ──────
function piramide() {
  const ages = ["0–4", "5–9", "10–14", "15–19", "20–24", "25–29", "30–34", "35–39", "40–44", "45–49", "50–54", "55–59", "60–64", "65–69", "70–74", "75–79", "80–84", "85–89", "90–94", "95–99", "100+"];
  const M = [7.2, 7.7, 8.7, 8.7, 8.5, 8.7, 8.8, 8.0, 7.1, 6.4, 5.6, 4.7, 3.8, 2.9, 2.0, 1.3, 0.8, 0.4, 0.15, 0.04, 0.01];
  const F = [7.0, 7.5, 8.4, 8.5, 8.3, 8.6, 8.7, 8.0, 7.3, 6.7, 6.0, 5.1, 4.2, 3.3, 2.4, 1.7, 1.1, 0.6, 0.25, 0.07, 0.02];
  const W = 1000, H = 940, cx = 500, half = 400, top = 110, rowH = 30, gap = 46; // gap = meia largura do rótulo central
  const sc = (v) => (v / 10) * (half - gap);
  let body = T(cx, 48, "Brasil — 2015 (valores aproximados)", 34, 'text-anchor="middle" font-weight="bold"');
  body += T(cx - 210, 92, "Homens", 30, 'text-anchor="middle" fill="#1d4ed8" font-weight="bold"') + T(cx + 210, 92, "Mulheres", 30, 'text-anchor="middle" fill="#dc2626" font-weight="bold"');
  ages.forEach((a, i) => {
    const y = top + (ages.length - 1 - i) * rowH;
    body += `<rect x="${cx - gap - sc(M[i])}" y="${y}" width="${sc(M[i])}" height="${rowH - 4}" fill="#3b6ea5"/>`;
    body += `<rect x="${cx + gap}" y="${y}" width="${sc(F[i])}" height="${rowH - 4}" fill="#d9646b"/>`;
    body += T(cx, y + rowH - 9, a, 22, 'text-anchor="middle"');
  });
  const yb = top + ages.length * rowH + 8;
  [0, 2, 4, 6, 8, 10].forEach((v) => {
    body += `<line x1="${cx - gap - sc(v)}" y1="${yb}" x2="${cx - gap - sc(v)}" y2="${yb + 8}" stroke="${INK}" stroke-width="2"/>` + T(cx - gap - sc(v), yb + 34, String(v), 24, 'text-anchor="middle"');
    body += `<line x1="${cx + gap + sc(v)}" y1="${yb}" x2="${cx + gap + sc(v)}" y2="${yb + 8}" stroke="${INK}" stroke-width="2"/>` + T(cx + gap + sc(v), yb + 34, String(v), 24, 'text-anchor="middle"');
  });
  body += T(cx, yb + 78, "População (milhões de pessoas)", 28, 'text-anchor="middle"');
  return svgWrap(W, H, body);
}

// ── 6. Kaplan-Meier (dados ilustrativos) ───────────────────────────────────
function km() {
  let seed = 20260928;
  const rnd = () => { seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const simulate = (n, hazard, follow) => {
    const rows = [];
    for (let i = 0; i < n; i++) {
      const tEvent = -Math.log(1 - rnd()) / hazard;
      const tCens = 0.6 + rnd() * follow; // censura aleatória
      if (tEvent <= tCens && tEvent <= follow) rows.push({ t: tEvent, e: 1 });
      else rows.push({ t: Math.min(tCens, follow), e: 0 });
    }
    return rows.sort((a, b) => a.t - b.t);
  };
  const curve = (rows) => {
    let s = 1, atRisk = rows.length;
    const pts = [{ t: 0, s: 1 }], cens = [];
    for (const r of rows) {
      if (r.e) { s *= 1 - 1 / atRisk; pts.push({ t: r.t, s }); } else cens.push({ t: r.t, s });
      atRisk--;
    }
    return { pts, cens };
  };
  const A = curve(simulate(45, 0.13, 5)), B = curve(simulate(45, 0.42, 5));
  const W = 1000, H = 700, L = 150, R = 950, Tp = 60, Bt = 570;
  const px = (t) => L + (t / 5) * (R - L), py = (s) => Bt - s * (Bt - Tp);
  const path = (c, end) => {
    let d = `M${px(0)} ${py(1)}`;
    for (let i = 1; i < c.pts.length; i++) d += ` L${px(c.pts[i].t)} ${py(c.pts[i - 1].s)} L${px(c.pts[i].t)} ${py(c.pts[i].s)}`;
    d += ` L${px(end)} ${py(c.pts[c.pts.length - 1].s)}`;
    return d;
  };
  let body = "";
  for (let s = 0; s <= 1.001; s += 0.25) body += `<line x1="${L}" y1="${py(s)}" x2="${R}" y2="${py(s)}" stroke="${GRID}" stroke-width="1.5"/>` + T(L - 14, py(s) + 9, Math.round(s * 100) + "%", 26, 'text-anchor="end"');
  for (let t = 0; t <= 5; t++) body += `<line x1="${px(t)}" y1="${Bt}" x2="${px(t)}" y2="${Bt + 10}" stroke="${INK}" stroke-width="3"/>` + T(px(t), Bt + 42, String(t), 26, 'text-anchor="middle"');
  body += `<line x1="${L}" y1="${Tp}" x2="${L}" y2="${Bt}" stroke="${INK}" stroke-width="3"/><line x1="${L}" y1="${Bt}" x2="${R}" y2="${Bt}" stroke="${INK}" stroke-width="3"/>`;
  body += `<path d="${path(A, 4.9)}" fill="none" stroke="#16a34a" stroke-width="5"/><path d="${path(B, 4.9)}" fill="none" stroke="#dc2626" stroke-width="5"/>`;
  const ticks = (c, col) => c.cens.filter((p) => p.t <= 4.95).map((p) => `<line x1="${px(p.t)}" y1="${py(p.s) - 12}" x2="${px(p.t)}" y2="${py(p.s) + 12}" stroke="${col}" stroke-width="4"/>`).join("");
  body += ticks(A, "#16a34a") + ticks(B, "#dc2626");
  body += `<line x1="${R - 330}" y1="${Tp + 26}" x2="${R - 270}" y2="${Tp + 26}" stroke="#16a34a" stroke-width="6"/>` + T(R - 258, Tp + 36, "Grupo A", 30);
  body += `<line x1="${R - 330}" y1="${Tp + 72}" x2="${R - 270}" y2="${Tp + 72}" stroke="#dc2626" stroke-width="6"/>` + T(R - 258, Tp + 82, "Grupo B", 30);
  body += T((L + R) / 2, Bt + 90, "Tempo de seguimento (anos)", 30, 'text-anchor="middle"');
  body += `<text transform="translate(52 ${(Tp + Bt) / 2}) rotate(-90)" font-size="30" fill="${INK}" text-anchor="middle">Sobrevida (%)</text>`;
  body += T(R, H - 14, "Dados ilustrativos", 20, 'text-anchor="end" fill="#6b7280"');
  return svgWrap(W, H, body);
}

// ── 7. Curva epidêmica de surto de fonte comum (ilustrativa) ────────────────
function epidemica() {
  let seed = 7;
  const rnd = () => { seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const days = 36;
  const counts = Array.from({ length: days }, (_, d) => {
    const base = 21 * Math.exp(-Math.pow(d - 11, 2) / (2 * (d < 11 ? 3.6 : 6.2) ** 2));
    return Math.max(0, Math.round(base + (rnd() - 0.5) * 3));
  });
  const W = 1000, H = 660, L = 140, R = 960, Tp = 50, B = 540;
  const bw = (R - L) / days;
  const ymax = 24;
  const py = (v) => B - (v / ymax) * (B - Tp);
  let body = "";
  for (let v = 0; v <= ymax; v += 4) body += `<line x1="${L}" y1="${py(v)}" x2="${R}" y2="${py(v)}" stroke="${GRID}" stroke-width="1.5"/>` + T(L - 14, py(v) + 9, String(v), 24, 'text-anchor="end"');
  counts.forEach((c, i) => (body += `<rect x="${L + i * bw + 1.5}" y="${py(c)}" width="${bw - 3}" height="${B - py(c)}" fill="#3b6ea5"/>`));
  body += `<line x1="${L}" y1="${Tp}" x2="${L}" y2="${B}" stroke="${INK}" stroke-width="3"/><line x1="${L}" y1="${B}" x2="${R}" y2="${B}" stroke="${INK}" stroke-width="3"/>`;
  const mes = ["jan", "fev"];
  for (let i = 0; i < days; i += 7) {
    const dt = new Date(Date.UTC(2018, 0, 25 + i));
    const label = `${dt.getUTCDate()}/${["jan", "fev", "mar", "abr"][dt.getUTCMonth()]}`;
    body += `<line x1="${L + i * bw + bw / 2}" y1="${B}" x2="${L + i * bw + bw / 2}" y2="${B + 10}" stroke="${INK}" stroke-width="2"/>` + T(L + i * bw + bw / 2, B + 42, label, 24, 'text-anchor="middle"');
  }
  body += T((L + R) / 2, B + 95, "Data de início dos sintomas", 30, 'text-anchor="middle"');
  body += `<text transform="translate(52 ${(Tp + B) / 2}) rotate(-90)" font-size="30" fill="${INK}" text-anchor="middle">Número de casos</text>`;
  body += T(R, H - 12, "Dados ilustrativos", 20, 'text-anchor="end" fill="#6b7280"');
  return svgWrap(W, H, body);
}

(async () => {
  const dir = "public/images/clinical/";
  await save(lineweaver(), dir + "bioq_inibicao.jpg");
  await save(michaelis(), dir + "bioq_michaelis.png");
  await save(antagonista(), dir + "farma_antagonista.jpg");
  await save(agonistaParcial(), dir + "farma_agonista_parcial.png");
  await save(piramide(), dir + "sc_piramide.png");
  await save(km(), dir + "sc_km.jpg");
  await save(epidemica(), dir + "sc_curva_epidemica.jpg");
})();
