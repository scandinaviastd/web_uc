# 🛠️ Setup del flujo WordPress + Claude Code — Centro de Gobierno Corporativo UC

> **Versión al día — 1 de agosto de 2026.** Este documento ya fue ejecutado en la máquina de
> Carlos. Refleja la instalación real, no el plan original: incluye las decisiones que hubo que
> tomar, los comandos corregidos y lo que quedó pendiente.
>
> **Para el humano.** Hay dos escenarios:
>
> **A · Máquina nueva (el caso normal).** El proyecto ya trae el Kit UC, el tema, el entorno y el
> seed versionados. No hay nada que buscar ni descargar aparte de Docker. Basta:
>
> ```bash
> npx @wordpress/env start && bash seed.sh
> ```
>
> Y el sitio queda en http://localhost:8888. Si algo falla, abre Claude Code en esta carpeta y dile:
>
> ```
> Lee SETUP_FLUJO_WORDPRESS.md y verifícalo fase por fase.
> ```
>
> **B · Reconstruir desde cero** (repo vacío, o el entorno quedó inservible): sigue las fases
> completas más abajo. Tiempo estimado: 10–15 minutos, la mayoría sin intervención tuya.

---

## Estado actual del proyecto

Todo esto **ya existe y está versionado**. Las fases de abajo lo verifican, no lo recrean.

| Archivo / carpeta | Qué es |
|---|---|
| `kit-uc/` | Kit UC v1.1.20, template oficial de la Universidad. **Solo lectura.** Viene incluido en el repo. |
| `cgc-uc/` | Tema de trabajo del Centro. Fork reducido del Kit. **Activo.** |
| `.wp-env.json` | Entorno Docker (PHP 8.2, `WP_DEBUG` activo) |
| `seed.sh` | Contenido de prueba reproducible. Idempotente. |
| `CLAUDE.md` | Reglas del proyecto que Claude lee solo, en cada sesión |
| `SETUP_FLUJO_WORDPRESS.md` | Este documento |

**El Kit viene incluido a propósito.** En la instalación original hubo que ir a buscarlo a
`~/Downloads/`, con un checkpoint humano de por medio. Al versionarlo, ese paso desaparece: cualquier
máquina que clone el repo ya lo tiene. Lee la advertencia de tokens en
[Decisión 4](#decisión-4--el-kit-trae-tokens-de-producción-hardcodeados) antes de publicar el repo.

---

## Instrucciones para Claude Code

Eres el instalador y verificador de este flujo. Reglas de ejecución:

1. **Ejecuta las fases en orden.** Cada fase tiene una verificación al final; no avances si falla.
2. **Reporta en español**, breve, después de cada fase: qué verificaste y qué sigue.
3. **Respeta los checkpoints 🙋 HUMAN-IN-THE-LOOP:** detente, explica qué necesitas con las opciones
   indicadas, y espera respuesta. No inventes ni descargues sustitutos.
4. **Idempotencia:** si un paso ya está hecho, verifica que esté correcto y sigue. Este documento
   debe poder re-ejecutarse sin romper nada.
5. **Nunca modifiques nada dentro de `kit-uc/`.** Es la referencia oficial de la Universidad.
6. **Antes de "arreglar" una diferencia con el plan, lee las
   [Decisiones de arquitectura](#decisiones-de-arquitectura-ya-tomadas).** Varias cosas que parecen
   erradas son deliberadas y están justificadas ahí.

---

## FASE 0 — Prerrequisitos

```bash
docker info > /dev/null 2>&1 && echo "docker: OK" || echo "docker: NO CORRE"
node --version || echo "node: FALTA"
git --version || echo "git: FALTA"
```

- **Node** ≥ 18 y **git**: si faltan, indica al usuario instalarlos (por ejemplo con Homebrew) y
  detente. *(Verificado en la instalación original: node v20.10.0, git 2.48.0.)*
- **Docker no corre:** intenta levantarlo tú mismo con `open -a Docker` y espera hasta 60 segundos
  re-verificando con `docker info`. En la instalación original esto funcionó: Docker respondió en
  ~5 segundos.

### 🙋 HUMAN-IN-THE-LOOP — Docker

Si tras el intento Docker sigue sin responder, detente y dile al usuario:

> Necesito Docker Desktop corriendo. Ábrela desde Aplicaciones (o instálala desde
> docker.com/products/docker-desktop) y avísame cuando el ícono de la ballena esté activo en la
> barra de menú.

**✅ Verificación de fase:** `docker info` responde sin error.

---

## FASE 1 — Verificar el Kit UC

El Kit viene en el repo. Solo hay que confirmar que está sano:

```bash
head -5 kit-uc/style.css
ls kit-uc/views/ | wc -l
```

Debe decir `Theme Name: Kit UC`, versión `1.1.20`, y `views/` debe tener 55 archivos.

### Si `kit-uc/` no está (repo incompleto o clone parcial)

Solo en ese caso hay que buscarlo. Heurísticas, en orden:

```bash
grep -rli --include="style.css" -E "Theme Name.*(UC|Católica|Kit)" . 2>/dev/null
ls ~/Downloads | grep -iE "kit|uc|uikit"
```

### 🙋 HUMAN-IN-THE-LOOP — Kit no encontrado

Si ninguna heurística da resultado, **detente** y pide el kit con este mensaje (mantén las tres
opciones):

> No encontré el Kit UC en el proyecto. Lo necesito para continuar. Me lo puedes dar de tres formas:
>
> 1. **URL del repositorio de GitHub** — la pegas aquí en el chat y yo lo clono.
> 2. **Ruta de una carpeta local** donde ya lo tengas — me la escribes y yo lo copio.
> 3. **Adjuntar el archivo** (zip o carpeta) aquí en el chat — yo lo descomprimo y lo dejo en su lugar.
>
> ¿Cuál prefieres?

Según la respuesta: `git clone <url> kit-uc` · `cp -R <ruta> ./kit-uc` · descomprimir en `./kit-uc/`
aplanando la carpeta contenedora extra si el zip la trae.

**✅ Verificación de fase:** `kit-uc/style.css` existe con cabecera `Theme Name: Kit UC`.

---

## FASE 2 — Verificar la estructura

### 2.1 · Tema propio `cgc-uc/`

`cgc-uc` **no es un esqueleto**: es un fork reducido del Kit con trabajo real hecho. Verifica:

```bash
head -4 cgc-uc/style.css                    # Theme Name: CGC UC
grep -c "Template:" cgc-uc/style.css        # debe ser 0 — ver Decisión 1
ls cgc-uc/*.php | xargs -n1 basename | tr '\n' ' '
```

Las 18 plantillas de raíz esperadas:

```
404.php about.php archive.php content-archive-posts.php
content-loop_publicaciones_single.php footer.php full.php functions.php
header.php home.php index.php mixed.php news.php page.php single.php
tag.php template-contacto.php template-home.php
```

Si falta `page.php`, toda página caerá a `index.php` y renderizará el home. En ese caso restaura
desde el Kit **solo** estas ocho:

```bash
for f in page.php about.php news.php full.php mixed.php \
         template-home.php template-contacto.php home.php; do
  [ -f "cgc-uc/$f" ] || cp "kit-uc/$f" "cgc-uc/$f"
done
```

**Nunca copies `single-agenda.php` ni `single-noticias.php`** — ver
[Decisión 3](#decisión-3--dos-plantillas-omitidas-a-propósito).

Verifica también que la hoja propia se encole (ver
[Decisión 2](#decisión-2--cgc-ucstylecss-no-se-encolaba)):

```bash
grep -n "'cgc-uc'" cgc-uc/functions.php     # debe encontrar el handle del enqueue
php -l cgc-uc/functions.php                 # No syntax errors detected
```

### 2.2 · Entorno: `.wp-env.json`

```json
{
  "phpVersion": "8.2",
  "themes": ["./cgc-uc", "./kit-uc"],
  "config": {
    "WP_DEBUG": true,
    "WP_DEBUG_LOG": true
  }
}
```

> `wp-env` avisa que levantar el entorno de tests por defecto está deprecado. Es solo ruido. Si
> molesta, agrega `"testsEnvironment": false` — arranca más rápido y calla el warning.

### 2.3 · Git

Si la carpeta no es repositorio: `git init`. El `.gitignore` debe tener:

```
node_modules/
*.log
.DS_Store
```

> **Nunca versionar:** contenido de la base de datos.
> **Sí versionar:** `cgc-uc/`, `kit-uc/`, `.wp-env.json`, `CLAUDE.md`, `seed.sh`, los dos `.md`.
>
> **`cgc-uc/lib/gutenberg/build/` sí se versiona**, aunque sea un compilado. `lib/gutenberg/index.php`
> carga `build/index.js` y sus CSS; si la carpeta no viene en el repo, un clone limpio queda sin los
> bloques del Kit en el editor. Se recompila con `npm run build` dentro de `cgc-uc/` al tocar
> `src/blocks/`, y el resultado se commitea.

**✅ Verificación de fase:** existen `cgc-uc/style.css`, `.wp-env.json` y `.gitignore`, `php -l`
pasa, y `cgc-uc/page.php` existe.

---

## FASE 3 — Verificar el `CLAUDE.md`

`CLAUDE.md` ya está escrito desde el análisis real del kit. Si falta o quedó desactualizado,
regenéralo analizando `kit-uc/` de verdad — no de supuestos. Debe contener:

1. **Descripción** del proyecto en 3 líneas y la filiación marcaria (**Submarca**).
2. **Arquitectura:** qué vive dónde, y que `kit-uc/` es solo lectura.
3. **Por qué `cgc-uc` es standalone y no child theme** (Decisión 1) — si esto no está documentado,
   alguien lo va a "arreglar" y va a romper el sitio.
4. **Qué se le quitó al Kit** en el fork (API, CPT `agenda`, updater) y qué no reintroducir.
5. **Las 4 cosas intocables** — la Universidad audita esto y bloquea la publicación:
   el CSS del Kit · la grilla · los tamaños de tipografía · el header y el footer.
6. **Reglas de diseño UC:** amarillo `#FEC60D` nunca como texto (1.58:1 sobre blanco, incumple
   WCAG AA), solo como superficie con texto oscuro; un solo botón amarillo por pantalla; nunca
   texto sobre fotos salvo banner con capa oscura; nunca texto dentro de imágenes; mínimo 16px
   (14px solo fechas y etiquetas); todo dato repetido va como campo; todo editable desde el panel.
7. **Regla de oro:** antes de crear un componente, buscar si ya existe en `kit-uc/views/`.
8. **Comandos del proyecto** y **configuración del Kit** (`theme_mod` y ubicaciones de menú).
9. **Inventario de componentes del kit** encontrados en el análisis.

**✅ Verificación de fase:** `CLAUDE.md` existe y refleja el contenido real del kit.

---

## FASE 4 — Levantar WordPress y sembrar contenido

### 4.1 · Arrancar

```bash
npx @wordpress/env start
```

Primera vez: descarga imágenes de Docker. En la instalación original tomó **169 segundos**. El sitio
queda en `http://localhost:8888` y el panel en `http://localhost:8888/wp-admin`
(usuario `admin`, clave `password`).

### 4.2 · Activar el tema

> ⚠️ **Usa `@wordpress/env`, no `wp-env`.** `npx wp-env` instala un paquete distinto y sin relación
> (`wp-env@1.0.1`) y falla con *"Please run the command 'npx @wordpress/env <command>' instead"*.
> Este es el error más fácil de cometer con este proyecto.

```bash
npx @wordpress/env run cli wp theme activate cgc-uc
npx @wordpress/env run cli wp theme list | grep -E "cgc-uc|kit-uc"
```

Lo correcto es ver `cgc-uc active` y `kit-uc inactive`. El Kit queda instalado pero **sin activar**,
como referencia — igual que manda su README.

Para capturar valores en scripts, el spinner del wrapper va a stderr:

```bash
npx @wordpress/env run cli wp option get siteurl 2>/dev/null
```

### 4.3 · Configuración del kit

La hace `seed.sh` sola. La opción clave es la filiación marcaria:

```bash
npx @wordpress/env run cli wp theme mod set uckit_menu_type submarca
```

Otras opciones del panel **Apariencia → Personalizar → Opciones Kit UC**: `uckit_menu_dark`,
`uckit_show_acreditacion`, `uckit_tipo_sello_acreditacion`, `uckit_menu_image`,
`uckit_footer_image`. Ubicaciones de menú que registra el Kit: `uc-kit-navbar_nav`
(UC Kit Menú Principal) y `uc-kit-footer_social` (UC Kit Redes Sociales).

### 4.4 · Contenido de prueba reproducible

```bash
bash seed.sh
```

`seed.sh` es idempotente — corre las veces que quieras sin duplicar nada. Sus 5 secciones:

1. **Configuración del Kit UC** — `uckit_menu_type=submarca`, nombre del sitio, permalinks, zona
   horaria.
2. **Limpiar el contenido de ejemplo de WordPress** — manda a la papelera (reversible, no borrado
   definitivo) el post `Hello world!` y la página `Sample Page`. Sin esto, `Hello world!` aparece en
   el listado de noticias etiquetado como *Uncategorized*.
3. **Páginas** — crea 6 con su plantilla: Inicio (`template-home.php`), Quiénes somos
   (`about.php`), Investigación, Cursos, Noticias, Contacto (`template-contacto.php`). Define
   además portada estática e índice de noticias.
   > Ojo: WordPress **ignora** la plantilla de página en la página de entradas. Esa vista la
   > renderiza `home.php` del tema, que es el listado con filtros del Kit.
4. **Menú principal** — crea `Principal`, lo asigna a `uc-kit-navbar_nav` y le agrega los items
   solo si el menú está vacío, para no duplicar.
5. **Noticias de ejemplo** — 2 categorías y 3 posts.

**✅ Verificación de fase:**

```bash
for u in "" "quienes-somos/" "investigacion/" "cursos/" "noticias/" "contacto/"; do
  printf "%-20s %s\n" "/$u" "$(curl -s -o /dev/null -w '%{http_code}' http://localhost:8888/$u)"
done
```

Las seis deben responder `200`.

---

## FASE 5 — Verificación visual y reporte final

1. Abre `http://localhost:8888` en el navegador integrado. Debes ver: barra superior UC (Admisión,
   Medios, Biblioteca…), logo UC, el menú principal sembrado y el footer institucional.
2. Abre `http://localhost:8888/noticias/`. Debes ver el título, el breadcrumb, los tres filtros
   (palabra clave, tema, fecha) y **exactamente 3 noticias**, con las etiquetas
   *Investigación* y *Gobierno Corporativo*.
3. Confirma que el CSS del Kit y el propio están encolados:

```bash
curl -s http://localhost:8888 | grep -oE "uc-kitdigital[^\"']*\.css|assets/css/index\.css|cgc-uc/style\.css" | sort -u
```

4. Entrega un reporte con ✅ / ⚠️ por fase, URLs y credenciales, pasos manuales pendientes y una
   sugerencia de primer trabajo de diseño.

### Lo que es normal ver y no hay que arreglar

- **El home sale vacío** (solo header y footer). Es correcto: `template-home.php` renderiza bloques
  `uc-kit/section` y todavía no hay ninguno. Se llena desde el editor.
- **Header y footer muestran el logo UC genérico** (`logo-uc-chile-azul.svg`, servido desde el S3
  del Kit). Es correcto: `uckit_menu_image` y `uckit_footer_image` están vacíos y el Kit cae a ese
  logo por defecto. Es un paso manual pendiente, no un bug.
- **`Notice: Function wpdb::prepare was called incorrectly`** en el listado de noticias. Viene
  heredado del Kit (`classes/uc-kit.php:283`, línea idéntica en `kit-uc`) y solo se ve con
  `WP_DEBUG`. **No lo toques**: es código espejo de la referencia auditada.

---

## Decisiones de arquitectura ya tomadas

Esto es la parte que no estaba en el plan original. Léelo antes de cambiar nada.

### Decisión 1 · `cgc-uc` es tema independiente, NO child theme

El README del Kit describe un flujo padre/hijo: instalar el padre sin activar, activar el hijo. Pero
`cgc-uc` **no puede** declarar `Template: kit-uc`.

Ambos `functions.php` declaran las mismas **13 funciones a nivel raíz** — `uc_theme_support`,
`uc_register_styles`, `uc_admin_bar`, `add_header_seguridad`, `enqueue_recaptcha_scripts`,
`verify_recaptcha`, `uc_kit_auto_assign_menu`, entre otras — **fuera** de la guarda
`if (!defined('_VER'))`. Como WordPress carga el `functions.php` del hijo y después el del padre,
declararlo child mata PHP con `Cannot redeclare uc_theme_support()`.

Consecuencia práctica: `get_template_directory()` apunta a `cgc-uc/` mismo, y sus assets son copia
idéntica del Kit. `kit-uc` queda instalado pero inactivo.

**No agregues la línea `Template:` "para que herede bien".** Rompe el sitio.

### Decisión 2 · `cgc-uc/style.css` no se encolaba

El `style.css` del tema era solo la cabecera de 228 bytes y **nunca se encolaba**: `functions.php`
solo cargaba `assets/css/index.css`. Cualquier CSS que se escribiera ahí no habría cargado nunca.

Se agregó en `cgc-uc/functions.php` un `wp_enqueue_style('cgc-uc', …)` con prioridad 20 y
dependencia de `'uc-kit'`, para poder ajustar **después** del CSS del Kit sin sobrescribirlo — el
CSS del Kit es una de las cuatro zonas que la UC audita.

### Decisión 3 · Dos plantillas omitidas a propósito

`cgc-uc` es un fork reducido del Kit, adaptado para correr **sin la API de producción de la UC**:
tokens vaciados, el `components.js` remoto reemplazado por globales inline, y eliminados
`classes/uc-kit-api.php`, `classes/updater.php`, el CPT `agenda` y su routing.

De las plantillas que faltaban, se restauraron ocho y se omitieron dos:

| Omitida | Por qué |
|---|---|
| `single-agenda.php` | Trae un Bearer de producción de `api.agenda.uc.cl` hardcodeado y depende del CPT `agenda` que el fork eliminó. |
| `single-noticias.php` | Queda inerte sin el routing custom que el fork eliminó. `single.php` ya cubre los posts. |

Por lo mismo, el bloque `uc-kit/schedule` aparece registrado pero **no funciona**.

### Decisión 4 · El Kit trae tokens de producción hardcodeados

`kit-uc` incluye credenciales en el código:

```bash
grep -rl "R9pGNowrJ0ICaQcIdI6Nu9Yy\|3bbaa0a2588684a4188c8233" kit-uc/
# kit-uc/single-agenda.php
# kit-uc/views/block-section-agenda.php
# kit-uc/views/block-section.php
```

`cgc-uc/` está limpio: el fork los vació.

**Antes de publicar el repositorio**, decide entre: dejar `kit-uc/` versionado y mantener el repo
privado, o quitarlo del control de versiones y documentar su origen para que cada quien lo obtenga
de la Dirección Digital UC. Vendorizar el Kit es cómodo para reproducir el entorno; los tokens son
el costo.

---

## Pasos manuales pendientes

1. **Logo de la submarca.** `uckit_menu_image` y `uckit_footer_image` están vacíos, así que header y
   footer muestran el logo UC genérico. Sube el logo del Centro y asígnalo en Apariencia →
   Personalizar → **Opciones Kit UC**. No se puede automatizar sin el archivo.
2. **Menú de redes sociales.** La ubicación `uc-kit-footer_social` está vacía; hacen falta las URLs
   reales. En el panel se agregan como links personalizados (ver README del Kit).
3. **Página Contacto.** `template-contacto.php` espera un shortcode de formulario en el meta
   `formulario_contacto`, y los bloques de información en `titulo_1` / `contenido_1` / `icono_1`
   (correlativos). Requiere decidir plugin de formularios.
4. **Contenido del home.** Armarlo con bloques **"Kit UC Sección"** desde el editor.

---

## Chuleta para el humano

| Quiero… | Comando / acción |
|---|---|
| Encender el sitio | `npx @wordpress/env start` |
| Apagar el sitio | `npx @wordpress/env stop` |
| Ver el sitio | http://localhost:8888 |
| Entrar al panel | http://localhost:8888/wp-admin — `admin` / `password` |
| Correr WP-CLI | `npx @wordpress/env run cli wp <comando>` — **nunca `npx wp-env`** |
| Pedir un diseño | Abrir Claude Code aquí y describirlo (ya conoce las reglas por `CLAUDE.md`) |
| Resetear todo el contenido | `npx @wordpress/env destroy` y luego `start` + `bash seed.sh` |
| Re-sembrar sin destruir | `bash seed.sh` (es idempotente) |
| Guardar mi trabajo | `git add . && git commit -m "descripción"` |

## Si algo se rompe

| Síntoma | Solución |
|---|---|
| "Cannot connect to Docker daemon" | Abrir Docker Desktop y esperar la ballena |
| `Please run the command 'npx @wordpress/env <command>' instead` | Usaste `npx wp-env`. Es otro paquete. Usa `npx @wordpress/env`. |
| `Cannot redeclare uc_theme_support()` | Alguien le puso `Template:` a `cgc-uc/style.css`. Quítalo — ver Decisión 1. |
| Todas las páginas se ven como el home | Falta `cgc-uc/page.php`. Restáuralo desde el Kit — ver Fase 2.1. |
| El listado de noticias muestra "Uncategorized" | Es el `Hello world!` de WordPress. Corre `bash seed.sh`. |
| El sitio no carga tras `start` | `npx @wordpress/env logs` para ver el error |
| Cambié algo y no se ve | Refrescar con Cmd+Shift+R; si es un bloque en `src/`, falta compilar |
| Todo raro sin razón | `npx @wordpress/env stop && npx @wordpress/env start` |
| Quiero volver atrás en el código | `git checkout .` (descarta cambios no guardados) |
