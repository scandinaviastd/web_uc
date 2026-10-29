# Prototipo navegable — Centro UC Gobierno Corporativo (Sprint 2)

Todo el sitio del Figma Sprint 2 en código, con el **markup y el CSS del Kit Digital UC** (CDN oficial),
Bootstrap 4 del Kit y un solo CSS propio (`public/css/cgc.css`). Es HTML estático generado con Astro:
se publica en Vercel sin configuración y se traslada a WordPress casi 1:1.

## Correr en local

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # genera dist/ (HTML estático)
```

Requiere Node ≥ 20.3 (Astro 5).

## Pantallas

| Ruta | Pantalla del Figma |
|---|---|
| `/` | Home |
| `/nosotros/` | Nosotros (barra de anclas sticky) |
| `/formacion/` | Formación / Listado |
| `/formacion/diplomado-gobierno-corporativo/` | Ficha Diplomado |
| `/formacion/formando-nuevos-directores/` | Ficha Formando nuevos directores |
| `/formacion/claves-decisiones-financieras/` | Ficha Claves decisiones financieras |
| `/formacion/empresas-familiares/` | Ficha Empresas familiares |
| `/formacion/diplomado-gobierno-corporativo/?brochure=1` | Modal "Descargar brochure" abierto |
| `/formacion/in-company/` | Programas para empresas (In Company) |
| `/formacion/mas-informacion/?programa=…` | Formulario "Más información" |
| `/formacion/<programa>/postular/` | «Postular» mientras no se abre la postulación 2027 |
| `/servicios/` | Servicios (antes Asesorías; pendiente del Centro) |
| `/investigacion/` | Investigación / Landing |
| `/investigacion/red/` | Red de Investigación |
| `/investigacion/articulos-y-working-papers/` | Artículos y Working Papers |
| `/investigacion/estudios/` | Estudios |
| `/extension/` | Extensión: eventos (calendario + 3 próximos + 3 realizados), noticias, newsletters y prensa |
| `/extension/eventos/<evento>/` | Página de cada evento |
| `/extension/prensa/` | Prensa: columnas y resúmenes de actividades |
| `/busqueda/?q=empresas+familiares` | Búsqueda con resultados |
| `/busqueda/?q=asdfgh` | Búsqueda sin resultados |
| `/cualquier-ruta-inexistente/` | 404 |

Funciona de verdad: desplegables y menú móvil (JS del Kit), carrusel con pausa, filtros instantáneos,
calendario que cambia de mes, buscador, formularios (sin envío real) y modal del brochure.
Enlaces con destino pendiente ("Postula") muestran un aviso. La Política de Privacidad UC enlaza a
protecciondedatos.uc.cl/politicas, como los ejemplos de formulario del Kit. WhatsApp abre el chat con el programa en el mensaje.

## Estructura y paso a WordPress

| Prototipo | WordPress (tema `cgc-uc`) |
|---|---|
| `src/layouts/Base.astro` | `header.php` + `footer.php` (CSS/JS del Kit por CDN, `assets/css/index.css`, `style.css`) |
| `src/components/Header.astro` | `views/header.php` + `views/header-submarca.php` + walkers `Desplegable_Nav` / `Mobile_Nav` |
| `src/components/Footer.astro` | `views/footer-submarca.php` + `#uc-global-footer` + `.uc-dev-footer` |
| `src/components/Card*.astro` | `get_template_part('views/card-…', null, $args)` |
| `src/components/FichaPrograma.astro` | `single-programa.php` |
| `src/data/programas.js` | CPT `programa` (campos: tipo, estado, frase, fechas, horario, modalidad, valor, dirigido, requisitos, detalle, descuentos) |
| `src/data/contenidos.js` | CPT `evento`, `documento`, `estudio`, `persona`, `prensa` + posts (noticias, newsletters) |
| `src/data/sitio.js` | Customizer "Opciones Kit UC" + menú `uc-kit-navbar_nav` |
| `public/css/cgc.css` | `cgc-uc/style.css` (ya encolado después del Kit) |
| `public/js/cgc.js` | `cgc-uc/assets/js/cgc.js` |
| `public/css/kit-theme.css` | copia de `cgc-uc/assets/css/index.css` |

## Publicar en Vercel

Proyecto de Vercel con **Root Directory = `prototipo`** (Astro se detecta solo). Desde esta carpeta:

```bash
npx vercel          # preview
npx vercel --prod   # producción
```

Recomendado: activar **Deployment Protection** para que solo entre quien tenga el link o la clave. El sitio ya
lleva `noindex, nofollow`.

## Pendiente (ver `docs/sprint-2-cambios-figma.md`)

Contenido de ejemplo en eventos, fechas de programas, fotos provisorias (ver `docs/imagenes-prototipo.md`),
destino de "Postula" y contenido de Asesorías. WhatsApp y correo de Sara vienen
del sitio actual: confirmar que siguen vigentes (P1-12).

## Propuesta v5 · sub-design system «Dirección» (rama `propuesta-v5`)

Borrador de la versión 5: la home, Nosotros, Servicios y la ficha de programa rediseñadas con el lenguaje gráfico
de Full Funnel adaptado a web, dentro del Kit. Espejo en el Figma `UC_CGC` (`eYC3WCOSY1gO8SR4ZiJo6O`): páginas
«Dirección · Leer primero / Fundamentos / Componentes» y «Sprint 5 · Propuesta v5 (Dirección)». **No va a `main`
hasta que el Centro la apruebe y la DED valide lo de abajo**; mientras, se revisa en la vista previa de Vercel de la rama.

| Pieza | Dónde |
|---|---|
| Tokens (modo Claro y Noche), tipografía Display/Cifra/Cita y componentes | `public/css/direccion.css` (clases `cgc-d-`) |
| Componentes: Barra, Etiqueta, Cifra, Retrato, Cita, Tarjeta de programa, Evento, Ficha | `src/components/v5/` |
| CSS de cada página | `public/css/v5-{home,nosotros,servicios,ficha}.css` (se enlazan con `<link slot="head">`) |
| Datos nuevos de cada página (cifras, citas, textos del brochure marcados como provisorios) | `src/data/v5-*.js` |
| Fotos del banco de Full Funnel | `public/img/v5/<página>/` |

**A validar con la DED antes de pasar a `main`:** escala Display/Cifra (88, 64 y 72 px, sobre el tope `.h1`), el
azul 2727 C de la submarca como superficie, etiquetas con radio completo, Roboto Slab 300 en las citas, WhatsApp
junto al único botón amarillo y la etiqueta blanca de las cifras sobre 2727 (4,1:1; pasa solo como texto grande). **Al Centro:** licencia de las fotos del banco, contenido de Servicios (P1-01) y de
las fichas (P1-05). `vercel.json` (raíz del repo) le indica a Vercel que el sitio está en `prototipo/`.
