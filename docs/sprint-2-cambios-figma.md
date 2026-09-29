# Sprint 2 — cambios aplicados en el Figma

Fecha: 29-09-2026. Base: minuta del 07-09 (`docs/reuniones/2026-09-07-minuta-revision-sprint-1.pdf`),
anotaciones del Sprint 1 (`docs/auditoria-anotaciones-figma.md`) y Kit Digital UC
(`docs/kit-digital-referencia.md`). Prioridad: la minuta manda sobre el Figma; en las 4 zonas auditadas por
la UC manda el Kit.

Figma: https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled

## Estructura del archivo (ordenado el 29-09 para la reunión)

| Página | Qué hay |
|---|---|
| **Sitio · Sprint 2** | Arriba, "📌 Guía para la reunión" (leer primero). Debajo, columnas numeradas en el orden del menú: 01 Home · 02 Nosotros · 03 Formación · 04 Asesorías · 05 Investigación · 06 Extensión · 07 Transversales (búsqueda y 404). A la izquierda, "Componentes" (todos los componentes del sitio). |
| **Fuera de alcance** | 13 pantallas del Sprint 1 que la minuta saca, cada una con su motivo. |
| **Archivo · Notas Sprint 1** | Las 22 notas 📝 originales del diseño, solo para consulta. |

## Anotaciones

| Categoría | Color | Para qué | ¿Para la reunión? |
|---|---|---|---|
| P1 · Pendiente Centro | Rojo | **P1-01 a P1-20**: lo que necesitamos del Centro (numerado, sin duplicar el contenido) | **Sí** |
| Validar con el Centro | Rosado | **V-01 a V-06**: propuestas de Scandinavia a validar | **Sí** |
| ✔ Resuelto · Sprint 2 | Verde | Una por pantalla y por componente: qué se hizo en esta ronda | Como respaldo |
| P2-B · Más adelante (UC / tareas) | Naranjo | Consultas a la UC y tareas internas ("Interno · no es para la reunión") | No |
| Interaction / Development | — | Comportamiento para desarrollo | No |

Categorías vacías que la API no permite borrar (eliminarlas a mano en Figma si molestan): "Aplicado · minuta
07-09", "Ajuste Kit UC", "P2 · Revisar Scandinavia", "P2-A · Decidir ahora".

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
- **Extensión:** una sola página: filtro por tipo, próximos eventos en **grilla mensual** + detalle del mes
  (Card/Evento, datos de ejemplo), realizados y Prensa al final. Página de Prensa completa aparte.
- **Transversales (nuevas):** búsqueda con resultados, búsqueda sin resultados y 404 (checklist UC).
- **Fuera de alcance:** Competencias para Directores, Comité de Directores, GC & Compliance, IA y
  Ciberseguridad, Workshop ESG, Fondos Concursables, Seminarios de Investigación, Extensión/Landing,
  Jornadas, Productos Académicos, IyO/Landing, Guías, Diálogo.

## P1 · Lo que necesitamos del Centro (misma numeración que en el Figma)

| # | Pedido |
|---|---|
| P1-01 | Qué contiene Asesorías; dónde va Productos Académicos; diseño de In Company |
| P1-02 | Dónde quedan Noticias y Newsletters |
| P1-03 | A dónde lleva "Postula" |
| P1-04 | Frase general de cada programa |
| P1-05 | Contenidos de las fichas (docentes, objetivos, metodología, aprobación, admisión) |
| P1-06 | ¿Descuentos iguales para todos los programas? |
| P1-07 | Módulos de Claves para decisiones financieras y de Empresas familiares |
| P1-08 | Calendario interno de eventos y Jornada 2026. **Contradicción**: el sitio actual publica la noticia "Jornada Gobierno Corporativo 2026" el 11-jun-2026, pero el Figma la muestra como evento próximo (en el prototipo, 26-nov). ¿Ya se hizo o es la de 2027? |
| P1-09 | Diálogos (10 PDF) y Guía de buenas prácticas |
| P1-10 | Banco de imágenes. El prototipo usa fotos provisorias del sitio actual y de Unsplash (licencia libre); detalle y licencias por confirmar en `docs/imagenes-prototipo.md` |
| P1-11 | Reseñas de las personas |
| P1-12 | Cargo de Sara; horario del WhatsApp y quién lo atiende. Aplicados en el prototipo desde el sitio actual (/contacto): WhatsApp +56 9 5418 3811 y correo s.marambio.bunster@uc.cl — confirmar que siguen vigentes |
| P1-13 | Lista de profesores afiliados; ¿sigue Josefina Tocornal? |
| P1-14 | Texto de Artículos y Working Papers; formato de cita |
| P1-15 | Ejemplos para Estudios |
| P1-16 | Síntesis del texto de Nosotros. Propuesta aplicada en el prototipo (de 4 párrafos a 2, sin repetir lo que ya muestra "El origen del Centro"): validar con el Centro |
| P1-17 | Logos de colaboradores y autorización de uso. Propuesta en el prototipo: sumar Deloitte, BH Compliance y ACAFI (coorganizan actividades con el Centro) a Cuprum y Mazars |
| P1-18 | Prensa: ¿columna completa o enlace al medio? |
| P1-19 | Formularios: destino y plazo de conservación de los datos; ¿brochure por programa? |
| P1-20 | ¿Administradores de WordPress con correo UC? |

## Validar con el Centro

| # | Propuesta |
|---|---|
| V-01 | Nueva arquitectura: menú de 6 secciones + "Fuera de alcance" (antes/después) |
| V-02 | Textos provisorios: pilar Extensión y bloque In Company |
| V-03 | Nuevo modelo de ficha: Postula · Más información · Descargar brochure, sin acordeones |
| V-04 | Calendario mensual en Extensión |
| V-05 | Formularios con cláusula de privacidad y consentimiento opcional |
| V-06 | Red de Investigación sin los 5 investigadores |

## P2-A · Decisiones tomadas (29-09)

| # | Decisión | Qué se aplicó |
|---|---|---|
| A1 | Red de Investigación | Los 5 investigadores (Mejía-Amaya, López-Iturriaga, Cabezón, Ossandón, Wagner) **se sacan de la Red**. Quedan 9 profesores afiliados (29-09: se sacan también Mauricio Larraín, Felipe Aldunate y Daniel Ferrés), Josefina Tocornal y Pablo Araya |
| A2 | Textos provisorios | Pilar Extensión y bloque In Company se muestran **como propuesta** al Centro (P1: validar) |
| A3 | Calendario | **Grilla mensual** con navegación entre meses + detalle de los eventos del mes con Card/Evento. En móvil, lista del mes |
| A4 | Brochure | **Pasa por formulario** en un modal del Kit (nombre*, correo*, empresa opcional + privacidad). Nueva pantalla "Formación / Ficha / Modal Descargar brochure" |
| A5 | Asesorías en el menú | **Sin desplegable** |
| A6 | Formulario "Más información" | **Se mantiene** como está |
| A7 | Tipos de evento (Extensión) | **Seminario · Webinar · Workshop · Debate · Charla · Desayuno · Diálogo · Jornada**. Extensión muestra *Próximos eventos* (mismas cards que Realizados, en orden cronológico, con botón «Filtrar por calendario» junto al título: grilla mensual que filtra por mes o por día) y *Realizados* (del más reciente al más antiguo); se separan solos según la fecha |

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
