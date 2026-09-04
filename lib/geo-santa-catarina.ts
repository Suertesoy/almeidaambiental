/**
 * Base geográfica REAL de Santa Catarina — substitui o traçado abstrato
 * desenhado à mão que existia em RegionalMap.tsx (uma silhueta inventada
 * que não correspondia ao estado).
 *
 * ---------------- Fonte do contorno ----------------
 * IBGE — API de Malhas Territoriais v3, unidade da federação 42 (Santa
 * Catarina), qualidade máxima:
 *
 *   https://servicodados.ibge.gov.br/api/v3/malhas/estados/42
 *     ?formato=application/vnd.geo+json&qualidade=maxima
 *
 * Baixada em 2026-09-03 (38 KB, MultiPolygon em WGS84). O anel exterior do
 * polígono continental foi projetado e simplificado UMA VEZ, em tempo de
 * desenvolvimento, e o resultado está congelado abaixo: o site não faz
 * requisição de malha, não depende da API do IBGE em runtime e não carrega
 * GeoJSON no cliente.
 *
 * Projeção: equirretangular com correção de longitude por cos(latitude
 * média) — a distorção de uma projeção plana em um recorte de ~1,5° de
 * latitude é irrelevante na escala editorial deste mapa, e a correção
 * impede que o estado apareça horizontalmente esticado. NÃO é uma projeção
 * cartográfica de precisão e o mapa não deve ser usado para medir
 * distância.
 *
 * Simplificação: Douglas-Peucker com tolerância de 2,0 unidades do viewBox
 * de 1000 de largura (≈1,4 px na maior largura em que o mapa é renderizado
 * no site). Reduziu o traçado de 8,9 KB para 5,7 KB preservando a
 * silhueta — recorte oeste, fronteira norte, litoral leste e a ponta sul
 * continuam reconhecíveis.
 *
 * A ilha secundária do MultiPolygon (área < 0,01% do continente) ficou de
 * fora: nessa escala ela renderiza como um artefato de um pixel.
 *
 * ---------------- Fonte dos pontos ----------------
 * Os cinco municípios são EXCLUSIVAMENTE os já validados no conteúdo do
 * projeto — nenhuma cidade nova foi acrescentada aqui:
 *
 *   São José, Chapecó, Araquari, Joinville
 *     → PRESENCE_LOCATIONS, lib/almeida-ambiental-data.ts
 *   São José (matriz) e Blumenau (Saturno Ambiental)
 *     → REGIONS, lib/contact-data.ts
 *
 * Coordenadas resolvidas em tempo de desenvolvimento (2026-09-03) e
 * congeladas: OpenStreetMap/Nominatim, consulta por município, resultado
 * do tipo boundary/administrative. Cada código IBGE foi conferido contra
 * a API de Localidades do IBGE (nome oficial + UF = SC), e cada ponto foi
 * testado por point-in-polygon contra a própria malha acima — os cinco
 * caem dentro do estado. NÃO existe geocoding em runtime.
 *
 * x/y já estão projetados no mesmo viewBox do contorno, então ponto e
 * geografia não podem sair de sincronia por arredondamento no componente.
 */

import type { BrandId } from "./brands";

export const SC_VIEWBOX = { width: 1000, height: 700.54 } as const;

/** Contorno continental de Santa Catarina (IBGE, ver cabeçalho). */
export const SC_OUTLINE_PATH =
  "M254.5,99.4L250.7,99.7L239.8,91.5L225.3,94.7L211.2,81.8L204.4,82.8L200.7,79.6L164.2,83.8L155.9,80.4L135.8,89.9L125.3,80.1L119.5,80.1L104.5,68.7L101.0,59.8L97.2,62.4L84.2,58.9L75.4,66.8L62.3,71.5L51.7,69.4L46.1,62.5L36.2,60.8L24.8,84.7L23.9,93.3L27.1,100.5L24.1,100.6L25.5,102.9L22.1,106.1L24.6,110.0L23.0,113.1L19.5,112.5L21.2,119.9L17.9,122.1L23.3,125.1L21.1,124.9L17.1,141.8L14.5,140.5L21.6,146.6L20.2,151.7L17.3,151.5L18.7,156.8L16.1,157.3L15.9,162.0L22.4,163.8L19.7,168.6L24.7,167.3L22.1,171.9L24.9,173.5L26.1,183.9L30.3,185.0L27.2,186.5L26.1,192.3L29.5,193.1L25.6,200.2L30.2,203.4L23.7,201.4L24.5,206.8L20.2,206.8L19.3,209.8L20.6,213.9L17.4,213.3L17.5,218.2L13.3,217.0L16.4,221.7L13.6,224.4L9.4,221.3L14.1,227.7L12.2,229.1L6.4,223.6L5.7,231.4L11.0,236.5L4.5,235.3L5.9,240.5L2.4,242.7L6.9,245.4L1.5,245.3L0.0,249.9L5.1,250.8L11.2,245.6L16.3,254.7L31.2,248.7L35.6,260.5L40.0,253.8L51.3,250.8L62.8,257.1L61.0,243.0L69.7,247.5L78.7,243.3L85.2,234.0L89.7,240.1L98.7,242.5L94.3,256.0L96.0,260.3L108.1,250.8L118.5,254.8L123.7,244.0L128.7,252.3L138.2,249.1L138.8,237.4L146.5,232.2L149.6,234.4L144.7,244.9L148.0,247.9L154.2,244.0L155.9,249.2L152.3,255.9L155.7,260.8L160.7,248.8L165.7,257.3L179.9,250.3L181.0,257.9L196.5,259.1L197.3,268.4L205.0,264.2L209.1,273.8L213.5,264.2L219.8,269.9L234.4,264.5L237.4,268.8L245.3,270.3L248.4,268.6L247.8,263.7L256.4,260.1L255.2,269.7L262.7,275.5L264.9,267.4L266.4,277.8L272.9,274.9L280.6,281.0L280.8,268.3L292.4,269.6L284.5,276.4L292.5,279.2L294.3,283.3L297.1,283.3L305.3,271.3L304.5,278.9L314.9,278.3L315.8,286.0L333.9,284.0L331.2,289.8L344.1,293.5L344.4,296.5L338.6,295.3L333.8,298.1L347.1,303.5L342.7,312.8L352.9,309.9L354.5,321.7L358.4,321.0L358.0,314.4L361.2,313.1L363.9,314.7L362.7,323.5L367.9,320.9L372.1,324.4L374.5,324.0L372.9,316.2L380.7,315.8L385.0,320.9L393.0,314.0L394.2,319.2L399.0,322.3L402.4,315.9L404.7,318.7L402.7,326.8L412.0,323.1L410.7,331.3L414.4,335.6L417.9,330.4L429.7,331.3L431.1,339.0L438.2,345.0L439.0,350.3L448.3,344.1L449.5,352.7L460.4,354.3L461.5,363.5L467.8,364.8L467.8,369.4L474.1,375.7L482.8,375.1L493.3,380.8L493.9,386.3L502.9,387.0L503.5,392.8L508.1,394.3L507.7,401.4L514.2,405.3L514.4,412.4L517.6,413.7L520.4,409.0L531.8,415.4L531.9,423.7L540.6,429.8L535.5,438.3L540.5,440.9L541.2,449.6L548.9,445.5L551.1,450.4L557.2,451.5L556.4,462.1L560.2,460.2L562.8,471.7L573.4,476.9L580.2,488.4L579.0,490.9L585.6,496.3L586.2,502.1L592.1,499.9L601.1,509.4L603.5,509.6L604.0,504.6L617.0,505.9L630.7,513.4L634.5,507.7L637.3,516.8L639.1,511.3L650.6,515.5L655.4,509.5L659.8,516.8L664.1,512.9L667.8,514.4L672.2,523.8L675.0,522.9L671.1,516.0L677.4,509.7L680.1,513.1L678.1,519.4L682.7,521.1L685.4,518.8L693.2,520.2L703.9,512.1L709.1,514.2L711.0,520.7L713.5,514.3L718.6,517.0L720.0,512.0L727.0,512.9L724.0,514.1L724.3,520.3L729.8,523.6L734.0,517.9L740.2,523.6L743.4,516.6L743.2,524.6L746.4,523.1L750.3,528.2L746.2,533.7L749.5,534.8L756.7,549.3L744.8,550.5L744.8,548.2L740.8,551.0L740.1,546.9L729.8,558.6L729.6,568.2L724.3,565.7L724.5,570.1L720.2,573.6L722.1,570.1L717.2,568.4L712.3,570.8L714.7,574.9L707.5,580.4L708.2,598.9L706.1,600.5L709.6,601.7L706.8,612.0L708.8,619.5L713.0,622.4L706.6,631.8L711.1,631.7L710.3,633.7L701.5,641.7L708.2,641.4L706.1,651.3L701.9,651.5L703.3,655.5L699.1,655.1L692.5,665.2L686.7,666.2L684.1,663.5L685.1,671.4L673.8,668.1L673.2,685.5L692.9,700.5L691.1,694.1L679.3,681.4L701.0,674.4L708.2,668.5L724.2,673.6L729.0,684.6L747.5,688.9L746.7,694.1L752.8,694.5L796.9,637.1L827.1,605.5L878.4,565.6L908.1,548.4L915.8,546.8L926.5,531.6L929.2,525.4L925.8,516.1L929.7,503.0L936.6,491.6L938.7,480.3L947.3,469.6L943.7,465.3L944.4,459.2L955.4,428.2L951.0,424.4L950.8,416.0L960.9,397.7L956.3,396.6L955.8,392.1L966.5,385.8L969.6,377.0L974.6,379.0L977.3,376.6L978.2,372.2L972.9,368.6L973.2,364.4L989.2,336.6L988.9,324.1L1000.0,306.0L994.5,305.4L989.3,293.6L977.2,293.2L969.4,299.3L967.3,278.3L956.9,280.3L953.2,271.2L954.5,260.8L966.5,252.8L973.7,255.2L971.4,259.8L978.5,257.5L974.4,254.3L977.6,246.8L971.7,242.3L972.8,238.0L964.5,247.6L954.4,239.0L961.3,217.0L959.1,213.7L953.5,216.2L950.8,213.8L951.5,200.4L948.1,194.6L951.0,180.8L955.2,179.3L958.2,172.2L956.0,168.7L952.3,171.8L947.1,166.3L943.6,167.4L940.1,150.9L944.1,128.8L973.5,58.0L968.4,42.7L959.5,42.9L956.3,35.7L954.1,19.6L956.8,4.3L949.7,4.5L947.9,0.0L941.0,5.7L890.2,5.2L892.0,7.0L886.8,6.8L879.3,12.3L875.1,10.0L873.0,13.4L869.5,9.3L864.9,11.2L860.0,8.3L857.7,11.9L852.4,9.3L839.3,16.1L828.2,32.0L824.2,31.8L813.5,41.4L806.7,41.2L804.6,44.1L798.9,42.5L791.7,51.0L793.3,53.3L784.8,53.0L780.8,58.0L777.4,53.1L776.5,56.5L767.2,50.9L764.1,51.9L763.6,47.6L760.1,48.2L752.8,41.0L750.2,44.4L749.9,38.3L746.4,38.0L745.5,33.6L736.4,31.8L724.3,16.0L711.4,14.9L710.6,11.0L705.5,21.1L707.2,14.8L704.5,11.9L698.4,11.8L699.4,18.6L695.0,14.9L685.8,17.1L686.0,14.3L681.1,20.9L676.3,17.8L673.0,19.8L674.8,14.6L668.0,14.9L672.2,18.9L667.9,25.3L655.2,15.4L654.6,19.5L651.4,17.9L642.0,23.6L639.6,29.8L641.7,36.7L639.5,36.9L633.7,32.2L632.6,25.4L625.9,21.2L622.0,22.1L619.4,16.2L609.3,13.7L599.9,17.0L596.3,9.5L592.4,17.4L599.1,17.7L599.4,21.4L585.7,22.1L580.6,29.9L581.7,36.4L567.2,51.0L569.8,59.5L564.3,60.0L563.9,55.8L557.9,55.5L549.3,60.3L547.9,65.0L541.0,59.8L536.2,68.7L534.4,60.5L530.2,57.4L528.2,59.4L530.4,64.4L527.5,67.2L519.4,57.5L507.5,59.4L503.8,56.8L499.3,65.3L480.1,70.2L472.6,77.1L471.6,86.7L463.0,95.2L467.7,103.8L471.7,104.3L468.0,111.8L478.7,126.8L475.8,135.5L466.1,143.8L454.5,142.8L446.5,145.8L446.2,153.1L442.8,156.9L443.5,153.5L438.4,150.9L425.2,128.8L402.4,130.1L395.2,125.6L391.4,128.7L384.4,127.0L373.3,130.4L369.4,128.1L358.4,132.6L353.5,128.5L333.7,125.9L329.1,120.4L320.5,117.3L317.0,108.4L304.9,104.9L301.3,100.8L293.4,105.3L284.8,104.2L278.4,99.5L261.8,97.4L254.5,99.4Z";

export type TerritoryPoint = {
  name: string;
  /** Código do município no IBGE — rastreabilidade da coordenada. */
  ibge: string;
  brand: Extract<BrandId, "almeida-ambiental" | "saturno-ambiental">;
  /** Rótulo curto já validado em outro ponto do repositório. */
  role: string;
  lat: number;
  lon: number;
  /** Projetado no viewBox de SC_VIEWBOX. */
  x: number;
  y: number;
};

/**
 * Ordem de leitura oeste → nordeste → leste → sul: é a ordem em que os
 * pontos aparecem na lista numerada ao lado do mapa, para que o número no
 * pin e o número na lista sejam sempre o mesmo.
 */
export const TERRITORY_POINTS: TerritoryPoint[] = [
  {
    name: "Chapecó",
    ibge: "4204202",
    brand: "almeida-ambiental",
    role: "Presença regional",
    lat: -27.1110472,
    lon: -52.5958977,
    x: 226.6,
    y: 238.1,
  },
  {
    name: "Joinville",
    ibge: "4209102",
    brand: "almeida-ambiental",
    role: "Presença regional",
    lat: -26.3044898,
    lon: -48.8486726,
    x: 910.6,
    y: 71.9,
  },
  {
    name: "Araquari",
    ibge: "4201307",
    brand: "almeida-ambiental",
    role: "Presença regional",
    lat: -26.3703324,
    lon: -48.7210994,
    x: 933.9,
    y: 85.4,
  },
  {
    name: "Blumenau",
    ibge: "4202404",
    brand: "saturno-ambiental",
    role: "Saturno Ambiental",
    lat: -26.9195567,
    lon: -49.0658025,
    x: 870.9,
    y: 198.6,
  },
  {
    name: "São José",
    ibge: "4216602",
    brand: "almeida-ambiental",
    role: "Matriz",
    lat: -27.6157733,
    lon: -48.6276491,
    x: 950.9,
    y: 342.1,
  },
];
