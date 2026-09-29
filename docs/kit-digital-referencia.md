# Kit Digital UC — referencia para diseño y desarrollo

Resumen de https://kitdigital.uc.cl (leído el 29-09-2026). La fuente de verdad es el sitio; esto es un
atajo para no perder lo que importa en la auditoría de la UC.

## Cómo se audita

Antes de publicar, la **Dirección de Visibilidad Digital UC** evalúa el sitio con el checklist de
https://kitdigital.uc.cl/checklist/detalle y entrega un informe. Se coordina escribiendo a
**visibilidaddigital@uc.cl**. Los puntos marcados **(Crítico)** son los que más pesan.

## Checklist oficial (resumido por sección)

**1 · Base**
- Usar la versión actualizada de la **librería de Figma del Kit** (se solicita a experienciadigital@uc.cl /
  visibilidaddigital@uc.cl).
- **(Crítico)** CSS y JS del Kit desde el CDN de Amazon, última versión.
- Clases con la nomenclatura del Kit (`.uc-{componente}`, `.{componente}-{modificador}--{valor}`,
  `.uc-{componente}_{hijo}`).

**2 · Marca**
- Filiación marcaria correcta en header y footer, desktop y móvil (CGC = **Submarca**).
- Header y footer del Kit que correspondan a la filiación, con estilo y código correctos.
- Footer global transversal UC (franja azul) según el Kit.
- **Footer de créditos**: quién diseñó, quién desarrolló (con enlace) y, obligatorio,
  "Sitio administrado por (unidad) | Utilizando el Kit Digital UC" (enlace a kitdigital.uc.cl). Si un mismo
  proveedor hizo varias cosas, se menciona una sola vez.
- Sello de acreditación según lineamientos (obligatorio para unidades académicas o asociadas a programas
  académicos; en otros casos se valida con Análisis Institucional).
- Footer: enlace obligatorio **"Políticas de Privacidad"** a la Política de Protección de Datos UC, con ícono
  de enlace externo.

**3 · Estilo visual**
- Colores primarios y secundarios del Kit (o alternativos validados por la Dirección).
- Escala y familias tipográficas del Kit. Columnas del Kit, grilla responsive.
- Espaciados que den aire (ley de proximidad). Radio y sombra según lo recomendado.

**4 · Navegación**
- **(Crítico)** Topbar global UC con sus ítems.
- **(Crítico)** Menú principal según el Kit, con **cantidad de ítems controlada**.
- **(Crítico)** Si hay desplegable: **desplegable con footer** que enlaza a la página de la sección, y
  navegable por teclado.
- **(Crítico)** Versión móvil del menú.
- Menú lateral para páginas relacionadas de una misma sección.
- Botones y enlaces del Kit **con todos sus estados**; íconos correctos.
- Orientación: título de página, ítem activo en el menú, breadcrumbs.
- **Enlace en el título de las cards** (más superficie clicable). Tags como enlaces.
- Tabs, paginación y pasos usados de forma adecuada.
- **Página 404 diseñada e implementada.**

**5 · Componentes y contenido**
- Cards del Kit, con la imagen como `<img>`.
- **Carrusel principal**: solo uno en el sitio, en la home bajo el header, imagen como `<img>`. Su estilo y
  comportamiento no se modifican (sí el tipo de contenido).
- Hero como alternativa al carrusel. Carrusel de cards, **card de evento**, divisores, citas, filtros para
  listados extensos, listas, tablas, colapsables, acordeones y formularios del Kit.
- Jerarquía visual consistente; interfaz limpia, sin ruido; **longitud de página controlada**.
- Plantillas recomendadas (home, listado y detalle de noticias, listado y detalle de eventos, etc.).

**6 · Buscador**
- Accesible en la parte superior, **preferentemente en el header**; reconocible y con estilo del Kit; caja
  de texto suficientemente ancha.
- **Página de resultados diseñada**, con y sin resultados.

**7 · Legibilidad y arquitectura**
- Tamaños relativos y recomendados; ancho de línea y alineación; colores de texto con alto contraste.
- Compatibilidad de navegadores y resoluciones.
- Etiquetado significativo y estándar; un único sistema de organización; títulos de página planificados.

**8 · Feedback**
- Colores de feedback; mensajes y alertas, modales y tooltips del Kit.

**9 · Técnico**
- Validador W3C y test WAVE. Doctype, UTF-8, viewport, favicon. **Sin CSS inline.**

## Valores de diseño

**Color — primaria:** Celeste `#0176DE` · Azul `#173F8A` · Azul oscuro `#03122E` · Amarillo `#FEC60D` ·
Amarillo oscuro `#E3AE00`.
**Secundaria:** Negro `#000000` · Gris A `#707070` · Gris B `#9C9C9C` · Gris C `#C6C6C6` · Gris claro A
`#EAEAEA` · B `#F0F0F0` · C `#F6F6F6` · Blanco.
**Feedback:** Verde `#00AA00` · Advertencia `#E3AE00` · Error `#F24F4F` · Info `#0176DE`.
Amarillo y amarillo oscuro **no cumplen contraste con blanco**: solo con texto oscuro encima.

**Tipografía:** Roboto (y Roboto Slab). Escala en `em` sobre 16px.

| Estilo | Peso | Tamaño / interlínea | Clase |
|---|---|---|---|
| h1 | Bold | 40 / 48 | `h1`, `.h1` |
| h2 | Medium | 32 / 36 | `h2`, `.h2` |
| h3 | Bold | 24 / 28 | `h3`, `.h3` |
| h4 | Bold | 20 / 24 | `h4`, `.h4` |
| h5 | Bold | 18 / 24 | `h5`, `.h5` |
| h6 | Bold | 16 / 24 | `h6`, `.h6` |
| Body | Regular | 16 / 24 | `p` |
| Body link | Medium | 16 / 24 | `.link-inline` |
| Body large | Regular | 18 / 32 | `.p-size--lg` |
| Body pequeño | Regular | 14 / 20 | `.p-size--sm` |
| Subtítulo | Medium | 14 / 16, +1px | `.uc-subtitle` |
| Bajada blog | Bold | 24 / 40 | `.p-size--xl .text-weight--bold` |

Toda página debe tener un `<h1>`; si el diseño no lo muestra (típico en la home), se usa `.uc-sr-only`.

**Grilla:** 12 columnas, ancho 1216px, gutter 32px, columna 72px (`.container` = 1246/1248px en desktop).
**Espaciado:** clases `{m|p}{t|b|l|r|x|y}-{0,4,8,12,16,20,24,28,32,36,40,44,48,60,80,160}`.
**Formas:** radio **4px** por defecto (8px solo contenedores especiales de uc.cl). Sombra por defecto:
`#888888` 18%, blur 8px + borde `#EAEAEA` 1px. Modales: `#000` 18%, blur 20px. No interactivos: solo borde
`#EAEAEA`. Destacado/activo: fondo `#0176DE` + sombra por defecto.
**Íconos:** Material Icons (`<i class="uc-icon">nombre</i>`, 24px; `--sm` 16, `--lg` 42, `--xl` 64).

## Componentes que afectan decisiones del CGC

- **Carrusel principal**: tiene `data-autoplay` y `data-autoplaybutton` (botón Play/Pausa) → el botón de
  pausa es nativo del Kit.
- **Card de evento**: título, fecha, categoría, hora y lugar; versión con imagen. Existe integración con la
  **API de Agenda UC** (agenda@uc.cl) para no cargar eventos dos veces.
- **Menú desplegable con footer** (gris) que lleva a la página de la sección.
- **Avatares** con iniciales (cuadrado/circular, gris/amarillo) → fallback de Card/Persona sin foto.
- **Modales** del Kit → biografía de Card/Persona.

## Formularios (normativa UC)

- Explicar para qué se usan los datos, quién accede y por cuánto tiempo. Pedir solo lo necesario.
- Indicar al inicio qué campos son obligatorios y por qué.
- **Obligatorio**: checkbox de cláusula de privacidad + enlace a la Política de Privacidad.
- **Opcional**: checkbox de autorización de uso posterior (p. ej. invitaciones), **nunca premarcado**,
  nunca requisito, con registro de consentimientos.
- Tipos: inscripción, suscripción, contacto, registro, inicio de sesión. Dudas: proteccion.datos@uc.cl.

## Marca del Centro (manual `reassetsgrficos/MANUAL CGC.pdf`)

- Categoría **submarca**. Colores: Pantone **2727 C** (azul) y **Cool Gray 11 C** (gris). Logo en Graphik
  (solo el logo; el sitio usa Roboto).
- Versiones: color (solo sobre blanco), monocromo azul, negro, gris; blanco para fondos oscuros.
  SVG en `cgc-uc/assets/img/cgc/`.
- Zona de seguridad: 2 × la altura de "UC" alrededor. Nunca girada, cortada, como marca de agua ni con texto
  encima. Escala mínima 1:40 respecto de la arista mayor.
- La submarca nunca va equivalente a la marca madre en la misma pieza.
- Dominio en piezas: **centrogobiernocorporativo.uc.cl**.

## Contactos

| Tema | Contacto |
|---|---|
| Auditoría del sitio, librería Figma, excepciones de topbar/footer | visibilidaddigital@uc.cl |
| Librería Figma (según checklist) | experienciadigital@uc.cl |
| Categoría de marca, escudo | Soledad Hola, Diseño Corporativo — mhola@uc.cl |
| Formularios y datos personales | proteccion.datos@uc.cl |
| Agenda UC (eventos) | agenda@uc.cl |
