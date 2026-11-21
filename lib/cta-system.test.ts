import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

/*
 * Regressão do sistema de CTAs editoriais (rodada 11).
 *
 * São verificações ESTÁTICAS das fontes: garantem que a estrutura dimensional
 * dos CTAs mora em UM lugar (components/shared/editorial.module.css) e que
 * ninguém a reimplementa ou a sobrescreve por engano. A medição do que o
 * navegador realmente renderiza (largura/altura/alinhamento por breakpoint,
 * igualdade dentro de cada grupo) está em scripts/audit-ctas.mjs.
 */

const ROOT = process.cwd();
const read = (p: string) => readFileSync(join(ROOT, p), "utf8").replace(/\r\n/g, "\n");

/** Corpo do primeiro bloco `selector { ... }` (sem aninhamento). */
function ruleBody(css: string, selector: string, from = 0): string {
  const idx = css.indexOf(`${selector} {`, from);
  assert.ok(idx >= 0, `regra ${selector} não encontrada`);
  const end = css.indexOf("}", idx);
  return css.slice(idx, end);
}

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(join(ROOT, dir))) {
    const rel = join(dir, name);
    if (statSync(join(ROOT, rel)).isDirectory()) walk(rel, out);
    else out.push(rel.split("\\").join("/"));
  }
  return out;
}

const editorial = read("components/shared/editorial.module.css");

test(".btn editorial define a estrutura dimensional única", () => {
  const body = ruleBody(editorial, ".btn");
  assert.match(body, /min-height:\s*56px/);
  assert.match(body, /padding:\s*14px 32px/);
  assert.match(body, /font-size:\s*16px/);
  assert.match(body, /border-radius:\s*4px/);
  // altura fixa faria o texto estourar o botão; largura em px no próprio
  // .btn tiraria o mobile de "largura total do contêiner"
  assert.doesNotMatch(body, /(^|\s)height:/);
  assert.doesNotMatch(body, /(^|\s)(min-|max-)?width:\s*\d+px/);
});

test("largura desktop vem do token único, não do comprimento do texto", () => {
  const desktop = editorial.slice(editorial.indexOf("@media (min-width: 640px)"));
  assert.match(ruleBody(desktop, ".btn"), /width:\s*var\(--cta-width\)/);
  assert.doesNotMatch(editorial, /\.btn\s*\{[^}]*\bmax-width:/);
  const globals = read("app/globals.css");
  assert.match(globals, /--cta-width:\s*min\(100%,\s*(\d+)px\)/);
  const px = Number(/--cta-width:\s*min\(100%,\s*(\d+)px\)/.exec(globals)![1]);
  assert.ok(px >= 280 && px <= 440, `--cta-width fora da faixa 280–440 (${px})`);
});

test("mobile: CTA ocupa a largura útil do contêiner", () => {
  const mobile = editorial.slice(editorial.indexOf("@media (max-width: 639px)"));
  assert.match(ruleBody(mobile, ".btn"), /width:\s*100%/);
});

test("controles funcionais compactos não herdam a largura editorial", () => {
  assert.match(ruleBody(editorial, ".btnCompact"), /min-height:\s*52px/);
  const desktop = editorial.slice(editorial.indexOf(".btnCompact", editorial.indexOf(".btnCompact") + 10));
  assert.match(desktop, /width:\s*auto/);
});

test("nenhum módulo reimplementa as dimensões do botão editorial", () => {
  const modules = walk("components").filter(
    (f) => f.endsWith(".module.css") && !/home[234]|historia/.test(f) && f !== "components/shared/editorial.module.css"
  );
  for (const file of modules) {
    const css = read(file);
    const re = /(^|\n)\.btn\s*\{([^}]*)\}/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(css))) {
      // só é aceito como ponte `composes` para o módulo editorial
      assert.match(m[2], /composes:\s*btn from/, `${file}: .btn deve apenas compor o botão editorial`);
      assert.doesNotMatch(m[2], /(min-)?height:|padding|font-size/, `${file}: .btn repete dimensões`);
    }
  }
});

test("todo CTA com variante (primário/secundário) também usa a base .btn", () => {
  const files = walk("components").filter((f) => f.endsWith(".tsx") && !/home[234]|historia/.test(f));
  const variant = /btn(SolidGold|OutlineOnLight|OutlineOnDark)\}/;
  const base = /(shared|styles)\.btn\}/;
  for (const file of files) {
    const src = read(file);
    for (const line of src.split(String.fromCharCode(10))) {
      if (line.includes("className=") && variant.test(line)) {
        assert.ok(base.test(line), file + ": variante de botão sem a base .btn: " + line.trim());
      }
    }
  }
});

test("grupos de CTA dos heroes são centralizados no contêiner", () => {
  const hero = read("components/shared/CompanyHero.module.css");
  assert.match(ruleBody(hero, ".ctaRow"), /justify-content:\s*center/);
  const home = read("components/home/home.module.css");
  assert.match(ruleBody(home, ".heroCtaRow"), /justify-content:\s*center/);
  assert.match(ruleBody(editorial, ".ctaRow"), /justify-content:\s*center/);
});
