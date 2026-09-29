# CGC UC — Sitio del Centro de Gobierno Corporativo UC

Sitio WordPress del Centro de Gobierno Corporativo de la Pontificia Universidad Católica de Chile,
construido sobre el Kit Digital UC (https://kitdigital.uc.cl/). El tema de trabajo es `cgc-uc/`.
Filiación marcaria: **Submarca**. Objetivo del sitio: leads corporativos (In Company, investigación
por encargo) y postulantes a formación.

## Diseño de referencia

Figma: https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=0-1&m=dev
(fileKey `F576MdCtMY2dY88WMVmtUQ`, página `0:1`). Desktop 1440. Secciones: Home, Nosotros,
Investigación (5), Programas (listado + 10 fichas), Extensión (3), Productos Académicos, IyO (5).
Componentes: Card/Programa, Noticia, Acceso, Persona, Documento, Opinión. Los frames `📝 Nota/*`
traen anotaciones de diseño por página.

Las anotaciones del Figma (comportamiento, filtros, estados) están transcritas en `docs/figma-notas.md`,
junto con la tabla de choques Figma ↔ Kit.

Si el Figma choca con alguna de las 4 cosas intocables, **manda el Kit**, no el Figma.

**Sprint 2 (29-09-2026) ya aplicado en el Figma**: página "Sitio · Sprint 2" (resumen arriba a la izquierda,
componentes nuevos en "Componentes · Sprint 2") y página "Fuera de alcance". Detalle y pendientes en
`docs/sprint-2-cambios-figma.md`.

**El Figma actual es el Sprint 1 y quedó parcialmente obsoleto.** La reunión del 07-09-2026
(`docs/reuniones/2026-09-07-minuta-revision-sprint-1.pdf`) cambió la arquitectura: menú Inicio · Nosotros ·
Formación · Asesorías · Investigación · Extensión; salen Productos Académicos, Informes y Opinión, Fondos
Concursables y Seminarios de Investigación; eventos en un solo pool con calendario; fichas de programa sin
acordeones, con frase general + «más información» → formulario con consentimiento. Oferta 2027: 3 cursos +
1 diplomado. Cuando el Figma y la minuta difieran, **manda la minuta**. No construir secciones que la minuta
eliminó. El estado ítem por ítem está en `docs/auditoria-anotaciones-figma.md`.

## Referencias del Kit y la marca

- `docs/kit-digital-referencia.md`: checklist con el que la UC audita el sitio, valores de diseño (color,
  tipografía, grilla, radios, sombras) y normativa de formularios. Consultarlo antes de diseñar o construir.
- Logos oficiales del Centro en SVG: `cgc-uc/assets/img/cgc/logo-cgc-{color,azul,negro,gris,blanco}.svg`
  (sacados de `reassetsgrficos/Editable illustrator LOGO CGC.ai`). La versión color va solo sobre blanco.
  El logo del header del Figma Sprint 1 dice "Cento UC" (con errata): no usarlo.

## Prototipo en código (`prototipo/`) — fuente de verdad del diseño desde el 29-09

Todo el sitio del Figma Sprint 2 está en `prototipo/` (Astro 5, HTML estático) con el markup del Kit UC,
el CSS/JS del Kit por CDN y un solo CSS propio (`prototipo/public/css/cgc.css`, clases `cgc-`).
**Los cambios de UI se hacen en el prototipo** y después se reflejan en Figma con captura (página aparte);
el Figma pasa a ser espejo. Mapeo a WordPress y rutas en `prototipo/README.md`.
Reglas: mismo stack del Kit (Bootstrap 4 del Kit, sin Tailwind ni React); contenido en `src/data/` con los
campos de los futuros CPT; no editar el CSS del Kit. Dev: `npm run dev` en `prototipo/` (puerto 4321).

## Arquitectura

| Carpeta | Qué es | Se edita |
|---|---|---|
| `cgc-uc/` | Tema propio del Centro. Todo el trabajo vive acá. | Sí |
| `kit-uc/` | Template oficial del Kit Digital UC v1.1.20, de la UC. **Referencia normativa.** | **NUNCA** |
| `.wp-env.json` | Entorno Docker local (PHP 8.2, WP_DEBUG activo). | Sí |
| `seed.sh` | Contenido de prueba reproducible. Idempotente. | Sí |

`kit-uc/` es solo lectura. Se consulta y se transcribe desde ahí; no se modifica ni se despliega.

### `cgc-uc` es tema independiente, NO child theme

Aunque el README del Kit describe un flujo padre/hijo, `cgc-uc` **no puede** declarar
`Template: kit-uc`. Ambos `functions.php` declaran las mismas 13 funciones a nivel raíz
(`uc_theme_support`, `uc_register_styles`, `uc_admin_bar`, `add_header_seguridad`,
`enqueue_recaptcha_scripts`, `verify_recaptcha`, `uc_kit_auto_assign_menu`, etc.) fuera de la
guarda `if (!defined('_VER'))`. Declararlo child hace que WordPress cargue los dos y PHP muera con
`Cannot redeclare uc_theme_support()`.

Consecuencia práctica: `get_template_directory()` apunta a `cgc-uc/` mismo. Los assets de
`cgc-uc/assets/` son copia idéntica del Kit. `kit-uc` queda instalado pero inactivo, como referencia.

### Qué se le quitó al Kit en `cgc-uc`

`cgc-uc` es un fork reducido del Kit, adaptado para funcionar **sin la API de producción de la UC**:

- Tokens de API hardcodeados vaciados (`views/block-section.php`, `views/block-section-agenda.php`).
- El script remoto `/wp-json/uc-kit/1/components.js` reemplazado por globales inline
  (`lib/gutenberg/index.php`).
- Eliminados `classes/uc-kit-api.php` y `classes/updater.php` (dependían de ese token).
- Eliminado el CPT `agenda` y su routing custom, junto con `single-agenda.php` y
  `src/blocks/schedule.js`.

**No reintroducir `single-agenda.php` desde el Kit**: trae un token de producción de
`api.agenda.uc.cl` hardcodeado y depende del CPT eliminado.

## Las 4 cosas intocables

La Dirección de Experiencia Digital UC audita estos cuatro puntos y **bloquean la publicación**:

1. **El CSS del Kit** — se carga desde el S3 de la UC
   (`uc-kitdigital.css`, v1.23.15-beta.1) más `assets/css/index.css`. No se sobrescribe.
2. **La grilla** — Bootstrap 4. Se usan sus clases (`col-md-*`, `container`, `row`), no media
   queries nuevas.
3. **Los tamaños de tipografía** — base 16px. Clases `.h1`–`.h6`, `p`, `p-size--sm/lg/xl`,
   `uc-subtitle`. No se inventan escalas.
4. **El header y el footer** — se usan `views/header-submarca.php` y `views/footer-submarca.php`
   tal cual.

En estos cuatro puntos no se improvisa: **se transcribe desde `kit-uc/`.**

## Reglas de diseño UC

- **Amarillo `#FEC60D`: nunca color de texto.** Solo superficie, con texto oscuro encima.
  Sobre blanco da 1.58:1 e incumple WCAG AA. Azul `#173F8A` sobre ese amarillo sí cumple (6.29:1)
  y es el botón primario del Kit.
- **Un solo botón amarillo por pantalla.** El resto en azul o celeste.
- **Nunca texto sobre fotos**, salvo el banner principal y con capa oscura de opacidad fija como
  token. Nunca en cards.
- **Nunca texto dentro de imágenes.**
- **Texto mínimo 16px.** 14px solo para fechas, metadatos y etiquetas.
- **Todo dato repetido va como campo**, no duplicado a mano. Si aparece en más de una pantalla es
  campo referenciado.
- **Todo debe ser editable por el cliente desde el panel.** Si un layout no es autoadministrable,
  es problema de diseño, no de desarrollo.
- Proporciones de imagen fijas por componente. `alt` obligatorio.

## Stack obligatorio

Bootstrap 4 (**no** Bootstrap 5), Vue.js, WordPress.
Prohibido: Tailwind, Bootstrap 5, cualquier framework fuera del Kit Digital UC.

## Regla de oro

**Antes de crear un componente, buscar si ya existe en `kit-uc/views/` y usarlo.**
Casi siempre existe: el Kit ya trae tarjetas, acordeones, tablas, alertas, carruseles y banners.

## Comandos

```bash
npx @wordpress/env start      # levantar el entorno
npx @wordpress/env stop       # apagarlo
npx @wordpress/env logs       # ver errores
npx @wordpress/env destroy    # borrar todo (luego start + bash seed.sh)
bash seed.sh                  # sembrar/re-sembrar contenido de prueba (idempotente)
```

WP-CLI — **usar `@wordpress/env`, no `wp-env`** (`npx wp-env` es otro paquete sin relación):

```bash
npx @wordpress/env run cli wp theme list
npx @wordpress/env run cli wp option get siteurl
```

Sitio: http://localhost:8888 — Panel: http://localhost:8888/wp-admin (`admin` / `password`)

Compilación: `cgc-uc/` trae `src/` con webpack y `package.json`, pero el sitio funciona con los
assets ya compilados en `cgc-uc/assets/` y `cgc-uc/lib/gutenberg/build/`. Solo hace falta compilar
(`npm run build` en `cgc-uc/`) si se tocan los bloques de Gutenberg en `src/blocks/`.
`lib/gutenberg/build/` **se versiona**: sin esa carpeta los bloques del Kit no cargan en el editor.

Trabajo solo local: el repositorio no tiene remoto. No hacer `git push` ni crear remotos.

## Configuración del Kit

Customizer → **Apariencia > Personalizar > Opciones Kit UC** (`theme_mod`):

| Opción | Valor en este proyecto |
|---|---|
| `uckit_menu_type` | `submarca` (ya seteado por `seed.sh`) |
| `uckit_menu_dark` | header oscuro (bool) |
| `uckit_show_acreditacion` | sello de acreditación en footer (bool) |
| `uckit_tipo_sello_acreditacion` | `horizontal`, `vertical`, `7_*` |
| `uckit_menu_image` / `uckit_footer_image` | imagen de la submarca |

Ubicaciones de menú registradas (`classes/uc-kit-menu.php`):
`uc-kit-navbar_nav` (UC Kit Menú Principal) y `uc-kit-footer_social` (UC Kit Redes Sociales).

## Inventario de componentes del Kit

### Bloques de Gutenberg registrados (`lib/gutenberg/index.php`)

| Bloque | Para qué sirve |
|---|---|
| `uc-kit/section` | Sección del home. Es el contenedor principal; su atributo `type` decide si muestra noticias, programas, etc. |
| `uc-kit/items` | Grilla de items/tarjetas configurable |
| `uc-kit/table` | Tabla con estilos del Kit |
| `uc-kit/accordion` + `uc-kit/accordion-item` | Acordeón desplegable |
| `uc-kit/carousel` | Carrusel/slider |
| `uc-kit/alert` | Mensaje de alerta |
| `uc-kit/divider` | Separador visual |
| `uc-kit/schedule` | Agenda. **No disponible**: se eliminó junto con el CPT `agenda`. |

### Vistas en `views/` (parciales que se incluyen con `get_template_part`)

**Header normado** — uno por filiación marcaria:
`header.php`, `header-submarca.php`, `header-submarca_con_slogan.php`, `header-denominacion.php`,
`header-denominacion_marca_internacional.php`, `header-denominacion_marca_internacional_desplegable.php`,
`header-marca_modificada.php`, más variantes `-alpha`.

**Footer normado:**
`footer.php`, `footer-submarca.php`, `footer-uc-denominacion.php`,
`footer-uc-denominacion-internacional.php`, `footer-social-media.php`.

**Bloques de contenido:**
`block-section.php` (y sus tipos `block-section-news.php`, `block-section-programs.php`,
`block-section-agenda.php`), `block-items.php` y sus variantes (`-with-image`, `-horizontal`,
`-slider`, `-banners`, `-background-image`, `-nested-hover`, `-about`, `-archive`, `-contact`,
`-header-footer`), `block-accordion-item.php`, `block-table.php` (`-table`, `-accordion`),
`block-alert.php` (`-card`, `-modal`, `-simple`), `block-video.php`, `block.php`.

**Vistas de página:**
`home.php`, `page.php`, `about.php`, `news.php`, `news-single.php`, `programs.php`, `contact.php`,
`archive.php`, `singular.php`, `full.php`, `mixed.php`, `404.php`.

**Utilidades:** `breadcrumb.php`, `social-share.php`.

### Clases CSS propias del Kit

`uc-btn`, `uc-card` (+ `card-height--same`, `uc-card--type-square`), `uc-bg-card`, `uc-bg-img`,
`uc-tag`, `uc-tags`, `uc-hr`, `uc-icon` (Material Icons), `uc-table`, `uc-navbar` (+ dropdown),
`uc-breadcrumb`, `uc-pagination`, `uc-form-group`, `uc-input-style`, `uc-filters`,
`uc-in-page-nav`, `uc-video`, `uc-media-frame`, `uc-text-divider`, `uc-subtitle`.
Utilidades de espaciado del Kit: `my-80`, `mb-32`, `mt-20`, `p-24`, etc.

## Prohibiciones operativas

- No conectar ni desplegar a servidores de la UC.
- No modificar `kit-uc/` ni el core de WordPress.
- El sitio actual en Joomla **no** es referencia de markup: usa una versión desactualizada del Kit.
- El uso del template debe estar informado a la Dirección Digital UC (direcciondigital@uc.cl).
  Licencia del Kit: CC BY-NC-ND 4.0.
