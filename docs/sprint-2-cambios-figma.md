# Sprint 2 — cambios aplicados en el Figma

Fecha: 29-09-2026. Base: minuta del 07-09 (`docs/reuniones/2026-09-07-minuta-revision-sprint-1.pdf`),
anotaciones del Sprint 1 (`docs/auditoria-anotaciones-figma.md`) y Kit Digital UC
(`docs/kit-digital-referencia.md`). Prioridad: la minuta manda sobre el Figma; en las 4 zonas auditadas por
la UC manda el Kit.

Figma: https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled

## Estructura del archivo

| Página | Qué hay |
|---|---|
| **Sitio · Sprint 2** | Resumen "📝 Sprint 2 — Resumen de cambios" arriba a la izquierda (leer primero). Columnas en el orden del menú: Home · Nosotros · Formación · Asesorías · Investigación · Extensión · Transversales. A la izquierda, "Componentes · Sprint 2". |
| **Fuera de alcance** | 13 pantallas del Sprint 1 que la minuta saca, cada una con su motivo. No se construyen. |

## Categorías de anotación

| Categoría | Color | Uso |
|---|---|---|
| Aplicado · minuta 07-09 | Verde | Cambio hecho según la minuta |
| Ajuste Kit UC | Azul | Cambio hecho para cumplir el Kit |
| P1 · Pendiente Centro | Rojo | Recurso o definición que solo tiene el cliente |
| P2-A · Decidir ahora | Violeta | 6 decisiones para Carlos (A1–A6), también con etiqueta violeta en el lienzo |
| P2-B · Más adelante (UC / tareas) | Naranjo | Consultas a la UC y tareas de Scandinavia; no requieren decisión hoy |
| Interaction / Content / Development / Accessibility | — | Comportamiento del Sprint 1 que sigue vigente |

## Componentes nuevos o modificados

| Componente | Cambio |
|---|---|
| Logo/CGC color | Nuevo, desde el `.ai` oficial. El logo del Sprint 1 decía "Cento UC" |
| Header/Navbar Submarca (Kit) | Nuevo. Una fila (logo + menú + buscador), según `header-submarca.php`. Menú de 6 secciones |
| Nav/Item | Nuevo. Estados Default / Activo (subrayado 2px), flecha opcional |
| Nav/Desplegable | Nuevo. Desplegable con footer "Ir a …" (crítico en el checklist UC) |
| Footer/Contacto Submarca (Kit) | + contacto de Sara + WhatsApp (ícono blanco) |
| Footer/Créditos (Kit) | Créditos según Kit + Políticas de Privacidad |
| Card/Programa | Título bajo la imagen, tag del Kit, sin degradado ni línea, título en 2 líneas fijas |
| Card/Acceso | Fondo blanco, sin línea ni flecha |
| Card/Evento | Nuevo. Card de evento del Kit (fecha, tipo, título, hora, lugar) |

Header y footers se reemplazaron por instancias en las 33 pantallas: un cambio en el componente se
propaga a todo el sitio.

## Cambios por sección

- **Home:** Formación con los 4 programas 2027 + bloque "Programas para empresas (In Company)"; Opinión →
  Prensa; accesos de Investigación actualizados; carrusel con capa oscura fija y botón Pausar.
- **Nosotros:** pilares Formación · Extensión · Investigación; Sara Marambio reemplaza a Patricia Armas.
- **Formación:** listado en una página sin filtro por tipo (4 programas + In Company). Fichas (Diplomado,
  Formando nuevos directores, Claves decisiones financieras, Empresas familiares): sin acordeones, contenido
  abierto, CTAs "Postula" / "Más información" / "Descargar brochure", coordinación Sara. In Company sin la
  grilla de datos y con el botón al formulario. **Nuevo:** formulario "Más información" según la normativa
  UC de formularios.
- **Asesorías:** página base con el contenido pendiente del Centro.
- **Investigación:** Red · Artículos y Working Papers · Estudios. Red: investigadores = Josefina Tocornal,
  ayudantes = Pablo Araya, los otros 5 investigadores pasan a Profesores afiliados (interpretación a
  validar). Estudios = antigua página de Informes con card simplificada.
- **Extensión:** una sola página: filtro por tipo, próximos eventos agrupados por mes (Card/Evento, datos de
  ejemplo), realizados y Prensa al final. Página de Prensa completa aparte.
- **Transversales (nuevas):** búsqueda con resultados, búsqueda sin resultados y 404 (checklist UC).
- **Fuera de alcance:** Competencias para Directores, Comité de Directores, GC & Compliance, IA y
  Ciberseguridad, Workshop ESG, Fondos Concursables, Seminarios de Investigación, Extensión/Landing,
  Jornadas, Productos Académicos, IyO/Landing, Guías, Diálogo.

## P1 · Lo que necesitamos del Centro

1. Qué contiene **Asesorías** y dónde van Productos Académicos e In Company.
2. Dónde quedan **Noticias y Newsletters**.
3. A dónde lleva **"Postula"**.
4. Frase general de cada programa; contenidos de las fichas (equipo docente, objetivos, metodología,
   aprobación, admisión); módulos de Claves y Empresas familiares; si los descuentos aplican a todos.
5. **Calendario interno** de eventos y fecha/lugar de la Jornada 2026.
6. **Banco de imágenes** (directores, carrusel, imagen genérica) y logos de colaboradores.
7. Correo de Sara y número de WhatsApp del Centro.
8. Texto de Artículos y Working Papers; formato de cita; ejemplos para Estudios.
9. Lista actualizada de profesores afiliados y si Josefina Tocornal sigue (la minuta dice que se va).
10. Qué pasa con los 10 PDF de Diálogo y si sigue la Guía de buenas prácticas.
11. Si los administradores de WordPress necesitan correo UC.
12. Plazo de conservación y destino de los datos del formulario.

## P2-A · Decidir ahora (violeta)

| # | Decisión | Dónde |
|---|---|---|
| A1 | ¿Los 5 investigadores pasan a Profesores afiliados? | Investigación / Red |
| A2 | ¿Los textos provisorios (pilar Extensión, bloque In Company) se muestran como propuesta? | Nosotros · Home |
| A3 | ¿Calendario como lista por mes, grilla mensual o ambos? | Extensión / Eventos |
| A4 | ¿Brochure con descarga directa, por formulario o se quita? | Ficha Diplomado |
| A5 | ¿Asesorías sin desplegable en el menú? | Header (Componentes · Sprint 2) |
| A6 | ¿Formulario "Más información" así, más simple o con más campos? | Formación / Formulario |

## P2-B · Más adelante (naranjo)

1. Enviar la arquitectura antes/después (este Figma + "Fuera de alcance").
2. Validar el formulario con proteccion.datos@uc.cl.
3. Validar la propuesta de calendario de eventos y de portadas de informes.
4. Solicitar la librería Figma del Kit a visibilidaddigital@uc.cl (checklist UC, punto 1).
5. Confirmar el sello de acreditación en el footer y el enlace de Política de Privacidad.
6. Diseñar la versión móvil.
7. Responder los hilos del Figma y avisar por WhatsApp cada tanda de cambios (minuta §7).

## Limitaciones conocidas

- No se hizo respaldo automático del archivo (la API de historial de versiones no está disponible); hay una
  copia previa fuera de este archivo.
- Los eventos, resultados de búsqueda y algunos textos son **datos de ejemplo**, marcados como tales.
- Las notas 📝 del Sprint 1 se conservan con una franja amarilla: mandan las anotaciones.
- La categoría antigua "P2 · Revisar Scandinavia" quedó vacía y la API no permite borrarla: eliminarla a mano en Figma.
