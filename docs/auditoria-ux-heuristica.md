# Auditoría UX y heurística del prototipo — 29-09-2026

Alcance: las 18 páginas de `prototipo/` en escritorio (1440) y móvil (375).
Método: revisión automática del HTML generado (encabezados, `alt`, enlaces, formularios, IDs, destinos), capturas de
página completa en ambos anchos, pruebas de interacción en navegador y evaluación con las 10 heurísticas de Nielsen,
cruzada con el checklist de la Dirección Digital UC (`docs/kit-digital-referencia.md`).

Regla aplicada: se corrige todo lo que **no toca las 4 cosas intocables del Kit** (CSS del Kit, grilla, tipografía,
header/footer) **ni contradice decisiones ya tomadas** (minuta 07-09, A1–A7, ajustes del 29-09). Lo que cambia la
composición de una página queda como propuesta a validar.

## Resumen

| | Cantidad |
|---|---|
| Hallazgos corregidos en el prototipo | 23 |
| Recomendaciones para después de la reunión | 10 |
| Revisado y se mantiene a propósito | 6 |

## Corregido

Severidad: **A** alta (bloquea una tarea o incumple WCAG), **M** media (confunde o frena), **B** baja (pulido).

| # | Heurística | Sev. | Hallazgo | Corrección |
|---|---|---|---|---|
| 1 | Visibilidad del estado | A | Tarjetas de noticias, newsletters, eventos y prensa enlazaban a `#`: el clic subía al inicio de la página sin explicación | Enlaces sin destino muestran el aviso del prototipo («se arma en WordPress», P1-18, etc.) y no mueven la página |
| 2 | Visibilidad del estado | A | «Descargar PDF» abría la misma página en una pestaña nueva | Mientras no hay PDF, aviso «lo sube el Centro al panel»; con PDF real abre en pestaña nueva con `noopener` |
| 3 | Prevención y recuperación de errores | A | Formularios con validación nativa del navegador: globos en el idioma del navegador y sin estado visual del Kit | Validación propia con `.uc-form-group--error` + `.uc-form-feedback` del Kit, mensajes en español junto al campo, foco en el primer error, correo con formato inválido detectado, confirmación anunciada (`role="status"`) y enfocada. Aplica a «Más información» y al brochure |
| 4 | Accesibilidad (checklist UC) | A | Etiqueta «Matrículas abiertas»: blanco sobre verde del Kit, 3,1:1 (WCAG AA pide 4,5:1) | Texto oscuro sobre el mismo verde `--success`: 6,75:1 |
| 5 | Diseño responsivo | A | Calendario de Extensión en 375 px: la columna DOM se salía de la grilla | Columnas `minmax(0, 1fr)` y relleno adaptable de los días de la semana |
| 6 | Relación con el mundo real | A | Próximos eventos sin hora ni lugar: el dato que decide si alguien asiste | Hora y lugar bajo el título, con los íconos que ya usan las cards de programa |
| 7 | Accesibilidad | M | Saltos de encabezado h1 → h3 en Prensa, Artículos y WP, Estudios y landing de Investigación | `h2` ocultos (`.uc-sr-only` del Kit) que ordenan la estructura para lectores de pantalla |
| 8 | Consistencia | M | Carrusel del Home con títulos escritos a mano («Formando nuevos **D**irectores») distintos de la ficha | Cada slide referencia su programa: título, estado y enlace salen de la ficha (en WordPress, campo relación) |
| 9 | Consistencia | M | Textos de los accesos a Investigación distintos entre Home y landing (puntuación, redacción) | Una sola fuente de datos (`accesosInvestigacion`) |
| 10 | Consistencia / WCAG 2.4.4 | M | Enlaces «Ver todas», «Ver todos», «Ver todo Prensa»: genéricos y dispares | «Ver todas las noticias», «Ver toda la prensa», «Ver todos los newsletters», «Ver todos los artículos y working papers» |
| 11 | Visibilidad del estado | M | «Ver todas» de Noticias y «Ver todos» de Newsletters apuntaban a anclas inexistentes | Aviso de pendiente P1-02 (dónde viven Noticias y Newsletters) |
| 12 | Reconocer antes que recordar | M | Nombres de programa cortados con «…» («Claves para la toma de decisiones financieras…») | Hasta 3 líneas: todos los nombres completos |
| 13 | Reconocer antes que recordar | M | Títulos de artículos y working papers cortados a 3 líneas | Títulos completos; las cards siguen alineadas |
| 14 | Relación con el mundo real | M | Prensa sin el medio donde se publicó la columna (el dato existía) | «Diario Financiero · 28 - Abr - 2026» sobre el título |
| 15 | Control y libertad | M | Desde la búsqueda, los eventos llevaban a Extensión en general | Enlazan a la card del evento; si está en otra página del paginador, se abre esa página |
| 16 | Eficiencia | M | Teléfonos como texto plano (equipo, fichas, In Company) | Enlaces `tel:` (en móvil abren el marcador) |
| 17 | Consistencia | B | Búsqueda: pestañas con `role="tab"` sin panel ni teclado de pestañas | Filtros con `aria-pressed`, como los chips del resto del sitio |
| 18 | Prevención de errores | B | «Viene seleccionado desde la ficha» se mostraba aunque se entrara directo al formulario | Solo aparece cuando el programa viene preseleccionado; el programa se conserva tras enviar |
| 19 | Estética y minimalismo | B | Fichas: el mismo aviso largo repetido 5 veces en «Detalle del programa» | «[Por completar con el Centro]» |
| 20 | Consistencia | B | «Equipo Ejecutivo» con mayúscula; el resto de títulos va en mayúscula de oración | «Equipo ejecutivo» (título y ancla) |
| 21 | Relación con el mundo real | B | Red de Investigación mencionaba «documentos de trabajo» (nombre anterior) | «artículos, working papers y estudios» |
| 22 | Seguridad / checklist | B | Enlaces a pestaña nueva sin `rel="noopener"` (créditos, política de privacidad); botón del formulario lateral de WhatsApp desalineado | `noopener` en todos; botón alineado |
| 23 | Diseño responsivo | M | Nosotros en 375 px: el correo de Sara (`s.marambio.bunster@uc.cl`) se salía de la card en 2 columnas (detectado al capturar el móvil) | Los enlaces de Card/Persona cortan en cualquier punto (`overflow-wrap: anywhere`): el correo pasa a una segunda línea |

## Recomendado después de la reunión (no aplicado: cambia la composición o depende del Centro)

Misma numeración que las anotaciones violetas del Figma (página «Sprint3Desktop»).

| # | Recomendación | Por qué |
|---|---|---|
| R-01 | Sumar al Home una franja «Próximos eventos» (3 cards) con enlace a Extensión | Extensión es uno de los tres pilares y hoy no aparece en el Home; los eventos son la puerta de entrada más frecuente |
| R-02 | Sumar a la landing de Investigación «Estudios recientes» | Hoy destaca solo artículos; los estudios (p. ej. Juntas IPSA) son lo más citado del Centro |
| R-03 | Estado del programa automático por fecha | El Diplomado muestra «Matrículas abiertas» con inicio el 11-may-2026 (ya comenzó). Con estado derivado de las fechas no queda desactualizado (anotación H9 del Figma) |
| R-04 | Asesorías fuera del menú mientras no tenga contenido | Hoy es una página «por definir»: ocultarla del menú hasta que el Centro la defina, o mantenerla solo para la revisión (P1-01) |
| R-05 | Páginas de detalle | Evento (inscripción), noticia, newsletter y columna: plantillas en WordPress (hoy muestran aviso) |
| R-06 | Página de Noticias y de Newsletters | Destino de los «Ver todas» del Home (P1-02) |
| R-07 | Foco dentro del modal del brochure | El modal es del Kit; en WordPress verificar que el foco quede dentro mientras está abierto y vuelva al botón al cerrar |
| R-08 | Buscador desplegable en el header | Hoy es un ícono que lleva a la página de búsqueda (cumple el checklist); un campo en el header ahorra un paso |
| R-09 | ✔ Hecho (29-09): vistas móviles en el Figma | Página «Sprint3Mobile»: las 20 pantallas a 375 × 812 |
| R-10 | Seminarios de Investigación visibles en Extensión | La minuta los manda a los eventos; hoy no hay ninguno de ejemplo ni tipo propio para filtrarlos |

El doble número de contacto (antes P-4) pasó a pendiente del Centro: P1-21.

## Revisado y se mantiene a propósito

| Punto | Motivo |
|---|---|
| Desplegables del menú con `href="#"` | Patrón del header normado del Kit (lo maneja `uc-kitdigital.js`) |
| 3 botones amarillos en el Home | Son los del carrusel: se ve uno a la vez (regla «un amarillo por pantalla» se cumple) |
| Formato de fecha «15 - Oct - 2026» | Definido en el Figma y usado en todo el sitio |
| Ícono de WhatsApp verde | Decisión del 29-09; única excepción de paleta, ya marcada en el Figma |
| Contenido sin acordeones en las fichas | Minuta 07-09 §3 |
| Textos entre corchetes | Contenido que entrega el Centro (P1-04, P1-05, P1-19, texto de Artículos y WP, Asesorías) |
