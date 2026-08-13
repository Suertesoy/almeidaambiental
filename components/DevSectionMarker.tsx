import { forwardRef } from "react";

/**
 * Marcador temporário de homologação (dobras 2 a 10 ainda sem conteúdo).
 * Remoção futura: apagar este arquivo, os usos em ScrollVideoExperience.tsx
 * e o bloco ".dev-section-marker" em app/globals.css.
 */
const DevSectionMarker = forwardRef<HTMLDivElement, { label: string; time: number }>(
  function DevSectionMarker({ label, time }, ref) {
    return (
      <div ref={ref} className="dev-section-marker" aria-hidden="true">
        {label} · {time.toFixed(2)}s
      </div>
    );
  }
);

export default DevSectionMarker;
