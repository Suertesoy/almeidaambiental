// Rodar com: npm test  (node:test nativo, sem dependências extras)
import assert from "node:assert/strict";
import test from "node:test";
import {
  IMPACT_BASELINE_AT,
  IMPACT_METRICS,
  IMPACT_TEXT,
  formatImpactNumber,
  getProjectedValue,
} from "./impact-projection.ts";

const base = Date.parse(IMPACT_BASELINE_AT);
const DAY = 86_400_000;
const byId = (id: string) => IMPACT_METRICS.find((m) => m.id === id)!;
const fmt = (id: string, nowMs: number, locale: "pt" | "en") =>
  formatImpactNumber(byId(id), getProjectedValue(byId(id), nowMs), locale);

test("na data-base retorna exatamente os valores oficiais", () => {
  for (const m of IMPACT_METRICS) assert.equal(getProjectedValue(m, base), m.baseline);
});

test("um dia depois = baseline + uma média diária (acumulado / 273)", () => {
  for (const m of IMPACT_METRICS) {
    assert.ok(Math.abs(getProjectedValue(m, base + DAY) - (m.baseline + m.baseline / 273)) < 1e-6);
  }
});

test("muitos anos no futuro continua finito e crescente", () => {
  const far = base + 50 * 365 * DAY;
  for (const m of IMPACT_METRICS) {
    const v = getProjectedValue(m, far);
    assert.ok(Number.isFinite(v) && v > m.baseline);
  }
});

test("antes da data-base nunca fica abaixo do oficial", () => {
  for (const m of IMPACT_METRICS) {
    assert.equal(getProjectedValue(m, base - 100 * DAY), m.baseline);
    assert.equal(getProjectedValue(m, 0), m.baseline);
  }
});

test("formatação pt-BR", () => {
  assert.equal(fmt("trees", base, "pt"), "557.603");
  assert.equal(fmt("materials", base, "pt"), "36.217,742");
  assert.equal(fmt("co2", base, "pt"), "61.432,270");
  assert.equal(fmt("water", base, "pt"), "957.765.723");
});

test("formatação en-US", () => {
  assert.equal(fmt("trees", base, "en"), "557,603");
  assert.equal(fmt("materials", base, "en"), "36,217.742");
  assert.equal(fmt("co2", base, "en"), "61,432.270");
  assert.equal(fmt("water", base, "en"), "957,765,723");
});

test("árvores e água permanecem inteiras (truncadas)", () => {
  // ~41,6 s por árvore: 20 s depois ainda é a mesma árvore.
  assert.equal(fmt("trees", base + 20_000, "pt"), "557.603");
  assert.equal(fmt("trees", base + 60_000, "pt"), "557.604");
  assert.doesNotMatch(fmt("water", base + 12_345_678, "pt"), /,/);
  assert.doesNotMatch(fmt("trees", base + 12_345_678, "en"), /\./);
});

test("materiais e CO₂ mostram sempre três casas e mudam em menos de 1 s", () => {
  for (const id of ["materials", "co2"]) {
    assert.match(fmt(id, base + 1234, "en"), /\.\d{3}$/);
    assert.notEqual(fmt(id, base + 1000, "en"), fmt(id, base, "en"));
  }
});

test("textos: unidade e rótulo corretos por idioma", () => {
  assert.equal(IMPACT_TEXT.pt.co2.label, "CO₂ evitado");
  assert.equal(IMPACT_TEXT.pt.water.unit, "litros");
  assert.equal(IMPACT_TEXT.en.water.unit, "liters");
});
