#!/usr/bin/env bash
#
# seed.sh — Contenido de prueba reproducible para el sitio del CGC UC.
#
# Idempotente: se puede correr varias veces sin duplicar nada.
# Requiere el entorno arriba:  npx @wordpress/env start
#
set -euo pipefail

cd "$(dirname "$0")"

# El wrapper de wp-env escribe su spinner en stderr; lo silenciamos para poder
# capturar IDs limpios en stdout.
wpcli() { npx --yes @wordpress/env run cli wp "$@" 2>/dev/null; }

echo "==> Verificando que el entorno responda"
if ! wpcli option get siteurl > /dev/null; then
    echo "ERROR: no puedo hablar con WordPress. Corre primero: npx @wordpress/env start" >&2
    exit 1
fi

# ---------------------------------------------------------------------------
# 1. Configuración del Kit UC
# ---------------------------------------------------------------------------
# 'uckit_menu_type' controla header y footer normados. La filiación marcaria
# del Centro es Submarca (ver CLAUDE.md).
echo "==> Activando el tema cgc-uc (kit-uc queda instalado e inactivo, como referencia)"
wpcli theme activate cgc-uc > /dev/null
echo "    cgc-uc activo"

echo "==> Configurando el Kit UC (filiación marcaria: Submarca)"
wpcli theme mod set uckit_menu_type submarca > /dev/null
echo "    uckit_menu_type = submarca"

wpcli option update blogname "Centro de Gobierno Corporativo UC" > /dev/null
wpcli option update blogdescription "Pontificia Universidad Católica de Chile" > /dev/null
wpcli rewrite structure '/%postname%/' > /dev/null
wpcli option update timezone_string "America/Santiago" > /dev/null

# ---------------------------------------------------------------------------
# 2. Limpiar el contenido de ejemplo de WordPress
# ---------------------------------------------------------------------------
# WordPress crea el post "Hello world!" y la página "Sample Page". El post
# aparece en el listado de noticias como "Uncategorized". Los mandamos a la
# papelera (reversible, no borrado definitivo).
echo "==> Limpiando contenido por defecto de WordPress"
for slug in hello-world sample-page; do
    id="$(wpcli post list --post_type=post,page --name="$slug" --post_status=publish,draft --format=ids | tr -d '\r\n ')"
    if [ -n "$id" ]; then
        wpcli post delete "$id" > /dev/null
        echo "    a la papelera: $slug (ID $id)"
    else
        echo "    ya limpio:     $slug"
    fi
done

# ---------------------------------------------------------------------------
# 3. Páginas
# ---------------------------------------------------------------------------
# ensure_page <titulo> <slug> [plantilla]
# Imprime el ID en stdout. Los mensajes van a stderr para no contaminarlo.
ensure_page() {
    local title="$1" slug="$2" template="${3:-}" id
    id="$(wpcli post list --post_type=page --name="$slug" --format=ids | tr -d '\r\n ')"
    if [ -z "$id" ]; then
        id="$(wpcli post create --post_type=page --post_status=publish \
                --post_title="$title" --post_name="$slug" --porcelain | tr -d '\r\n ')"
        echo "    creada:    $title (ID $id)" >&2
    else
        echo "    ya existe: $title (ID $id)" >&2
    fi
    if [ -n "$template" ]; then
        wpcli post meta update "$id" _wp_page_template "$template" > /dev/null
    fi
    echo "$id"
}

echo "==> Creando páginas"
ID_INICIO=$(ensure_page      "Inicio"          "inicio"          "template-home.php")
ID_QUIENES=$(ensure_page     "Quiénes somos"   "quienes-somos"   "about.php")
ID_INVEST=$(ensure_page      "Investigación"   "investigacion")
ID_CURSOS=$(ensure_page      "Cursos"          "cursos")
ID_NOTICIAS=$(ensure_page    "Noticias"        "noticias")
ID_CONTACTO=$(ensure_page    "Contacto"        "contacto"        "template-contacto.php")

# Portada estática + página de noticias.
# Ojo: WordPress ignora la plantilla de página en la página de entradas; esa
# vista la renderiza home.php del tema, que es el listado con filtros del Kit.
echo "==> Asignando portada e índice de noticias"
wpcli option update show_on_front page   > /dev/null
wpcli option update page_on_front  "$ID_INICIO"   > /dev/null
wpcli option update page_for_posts  "$ID_NOTICIAS" > /dev/null

# ---------------------------------------------------------------------------
# 4. Menú principal
# ---------------------------------------------------------------------------
echo "==> Menú principal"
if [ -z "$(wpcli term list nav_menu --slug=principal --format=ids | tr -d '\r\n ')" ]; then
    wpcli menu create "Principal" > /dev/null
    echo "    menú 'Principal' creado"
else
    echo "    menú 'Principal' ya existe"
fi

# Asignar a la ubicación que registra el Kit (classes/uc-kit-menu.php).
wpcli menu location assign principal uc-kit-navbar_nav > /dev/null
echo "    asignado a uc-kit-navbar_nav (UC Kit Menú Principal)"

# Los items se agregan solo si el menú está vacío, para no duplicar.
MENU_ITEMS="$(wpcli menu item list principal --format=ids | tr -d '\r\n ')"
if [ -z "$MENU_ITEMS" ]; then
    for pid in "$ID_QUIENES" "$ID_INVEST" "$ID_CURSOS" "$ID_NOTICIAS" "$ID_CONTACTO"; do
        wpcli menu item add-post principal "$pid" > /dev/null
    done
    echo "    5 items agregados"
else
    echo "    el menú ya tiene items, no agrego nada"
fi

# ---------------------------------------------------------------------------
# 5. Noticias de ejemplo
# ---------------------------------------------------------------------------
echo "==> Noticias de ejemplo"
ensure_category() {
    local name="$1" slug="$2"
    if [ -z "$(wpcli term list category --slug="$slug" --format=ids | tr -d '\r\n ')" ]; then
        wpcli term create category "$name" --slug="$slug" > /dev/null
    fi
}
ensure_category "Gobierno Corporativo" "gobierno-corporativo"
ensure_category "Investigación"         "investigacion-noticias"

ensure_post() {
    local title="$1" slug="$2" cat="$3" body="$4" id
    id="$(wpcli post list --post_type=post --name="$slug" --format=ids | tr -d '\r\n ')"
    if [ -z "$id" ]; then
        wpcli post create --post_type=post --post_status=publish \
            --post_title="$title" --post_name="$slug" \
            --post_category="$cat" --post_content="$body" > /dev/null
        echo "    creada:    $title"
    else
        echo "    ya existe: $title"
    fi
}

ensure_post "Nuevo estudio sobre directorios en empresas chilenas" \
    "estudio-directorios-empresas-chilenas" "gobierno-corporativo" \
    "El Centro de Gobierno Corporativo UC presentó los resultados de su estudio anual sobre la composición y el funcionamiento de los directorios en empresas chilenas."

ensure_post "Programa de formación para directores: convocatoria abierta" \
    "programa-formacion-directores-convocatoria" "gobierno-corporativo" \
    "Se encuentra abierta la convocatoria para el programa de formación de directores, orientado a profesionales con experiencia en gobierno corporativo."

ensure_post "Seminario: transparencia y reporte de sostenibilidad" \
    "seminario-transparencia-reporte-sostenibilidad" "investigacion-noticias" \
    "Académicos e investigadores analizaron los desafíos del reporte de sostenibilidad y su relación con las prácticas de gobierno corporativo."

# ---------------------------------------------------------------------------
echo "==> Limpiando caché de rewrite"
wpcli rewrite flush --hard > /dev/null

echo
echo "Listo. Sitio: http://localhost:8888   Panel: http://localhost:8888/wp-admin (admin / password)"
