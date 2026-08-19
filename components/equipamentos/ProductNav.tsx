"use client";

import { useEffect, useState } from "react";
import styles from "./equipamentos.module.css";
import type { Product } from "../../lib/equipamentos-data";

/**
 * Barra sticky dos seis produtos. Fica abaixo do Header (ver
 * .productNav em equipamentos.module.css) e observa qual capítulo está
 * visível para marcar o link correspondente como ativo — a única
 * affordance dinâmica daqui; o fade lateral de scroll é só CSS
 * (mask-image em .productNav).
 */
export default function ProductNav({ products }: { products: Pick<Product, "id" | "name">[] }) {
  const [activeId, setActiveId] = useState(products[0]?.id ?? "");

  useEffect(() => {
    const sections = products
      .map((product) => document.getElementById(product.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (mostVisible) setActiveId(mostVisible.target.id);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [products]);

  return (
    <nav className={styles.productNav} aria-label="Tecnologias da Almeida Equipamentos" id="produtos">
      <ul className={styles.productNavList}>
        {products.map((product) => (
          <li key={product.id}>
            <a
              className={styles.productNavLink}
              href={`#${product.id}`}
              aria-current={activeId === product.id ? "true" : undefined}
            >
              {product.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
