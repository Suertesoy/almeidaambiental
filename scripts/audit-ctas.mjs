/*
 * Auditoria dos CTAs editoriais NO NAVEGADOR (medidas reais, não classes).
 *
 *   npm run dev            (em outro terminal, porta 3111)
 *   node scripts/audit-ctas.mjs [largura x altura ...]
 *   ex.: node scripts/audit-ctas.mjs 390x844 1440x900
 *
 * Requer o pacote `playwright` resolvível (ou PLAYWRIGHT_MODULE com o caminho
 * do index.mjs) e o Chrome do sistema. Sai com código 1 se houver violação.
 *
 * Regras verificadas por rota (PT e EN) e por viewport:
 *  - sem rolagem horizontal;
 *  - todo CTA editorial (.btn, exceto .btnCompact e os botões do seletor) fica
 *    dentro da viewport;
 *  - largura: >= 640px → min(contêiner, 420px); < 640px → largura do contêiner;
 *  - altura 56px quando o rótulo cabe em uma linha (duas linhas são aceitas,
 *    mas os botões de um mesmo grupo devem ter a MESMA largura e altura);
 *  - alinhamento (>= 640px): o centro do grupo de CTAs coincide com o centro
 *    do seu contêiner (texto e logo podem seguir à esquerda);
 *  - controles de canal compactos de um mesmo grupo têm a mesma altura.
 */
const sizes = (process.argv.slice(2).length ? process.argv.slice(2) : ["390x844", "768x1024", "1280x800", "1440x900"]).map((s) =>
  s.split("x").map(Number)
);
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ?? "playwright");
const BASE = process.env.BASE_URL ?? "http://localhost:3111";
const routes = [
  "/", "/historia", "/almeida-ambiental", "/almeida-equipamentos", "/saturno-ambiental", "/contato",
  "/en", "/en/history", "/en/almeida-ambiental", "/en/almeida-equipamentos", "/en/saturno-ambiental", "/en/contact",
];
const CTA_MAX = 420;

const browser = await chromium.launch({ channel: "chrome" });
let violations = 0;
for (const [w, h] of sizes) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  let count = 0;
  const issues = [];
  for (const route of routes) {
    await page.goto(BASE + route, { waitUntil: "load" });
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 50));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(300);
    const { buttons, sw } = await page.evaluate(() => {
      const parents = [];
      const buttons = [...document.querySelectorAll("a, button")]
        .filter((e) => {
          const c = typeof e.className === "string" ? e.className : "";
          return /btn/i.test(c) && !/btnEditorial|lang-btn|menu|hamburger/i.test(c) && e.textContent.trim() !== "";
        })
        .map((e) => {
          const r = e.getBoundingClientRect();
          let pid = parents.indexOf(e.parentElement);
          if (pid < 0) pid = parents.push(e.parentElement) - 1;
          return {
            text: e.textContent.trim().slice(0, 40), cls: e.className, x: r.x, w: r.width, h: r.height,
            parentW: e.parentElement.getBoundingClientRect().width,
            parentCx: e.parentElement.getBoundingClientRect().x + e.parentElement.getBoundingClientRect().width / 2, pid,
          };
        })
        .filter((b) => b.w > 0 && b.h > 0);
      return { buttons, sw: document.documentElement.scrollWidth };
    });
    if (sw > w) issues.push(`${route}: rolagem horizontal (${sw} > ${w})`);
    const editorial = buttons.filter((b) => /btn/.test(b.cls) && !/btnCompact|actionBtn|mapBtn/.test(b.cls));
    count += editorial.length;
    for (const b of editorial) {
      if (b.x < -0.5 || b.x + b.w > w + 0.5) issues.push(`${route}: "${b.text}" fora da viewport`);
      const expected = w >= 640 ? Math.min(CTA_MAX, b.parentW) : b.parentW;
      if (Math.abs(b.w - expected) > 1.5) issues.push(`${route}: "${b.text}" largura ${Math.round(b.w)} (esperado ${Math.round(expected)})`);
    }
    const groups = new Map();
    for (const b of editorial) (groups.get(b.pid) ?? groups.set(b.pid, []).get(b.pid)).push(b);
    for (const g of groups.values()) {
      if (g.length > 1 && (new Set(g.map((b) => Math.round(b.w))).size > 1 || new Set(g.map((b) => Math.round(b.h))).size > 1))
        issues.push(`${route}: grupo desigual → ${g.map((b) => `${Math.round(b.w)}x${Math.round(b.h)}`).join(" | ")}`);
    }
    if (w >= 640) {
      for (const g of groups.values()) {
        const left = Math.min(...g.map((b) => b.x)), right = Math.max(...g.map((b) => b.x + b.w));
        const off = (left + right) / 2 - g[0].parentCx;
        if (Math.abs(off) > 1.5) issues.push(`${route}: grupo "${g[0].text}" fora do centro do contêiner (${Math.round(off)}px)`);
      }
    }
    const channels = new Map();
    for (const b of buttons.filter((b) => /btnCompact/.test(b.cls))) (channels.get(b.pid) ?? channels.set(b.pid, []).get(b.pid)).push(b);
    for (const g of channels.values())
      if (g.length > 1 && new Set(g.map((b) => Math.round(b.h))).size > 1) issues.push(`${route}: canais com alturas diferentes`);
  }
  console.log(`${w}x${h}: ${count} CTAs editoriais, ${new Set(issues).size} violação(ões)`);
  for (const i of new Set(issues)) console.log("  - " + i);
  violations += new Set(issues).size;
  await page.close();
}
await browser.close();
process.exit(violations ? 1 : 0);
