import styles from "./historia.module.css";

/**
 * Divide `text` nos trechos de `terms` e envolve cada um em <strong>, sem
 * dangerouslySetInnerHTML. Os dados-fonte (lib/historia-data.ts) guardam
 * texto simples + a lista de termos a destacar, não HTML.
 */
export default function Highlighted({ text, terms }: { text: string; terms?: string[] }) {
  if (!terms || terms.length === 0) return <>{text}</>;

  const pattern = new RegExp(`(${terms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, index) =>
        terms.includes(part) ? (
          <strong key={index} className={styles.eventHighlight}>
            {part}
          </strong>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  );
}
