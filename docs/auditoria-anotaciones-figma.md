# Auditoría de anotaciones del Figma

Filtro inicial previo a revisión humana. Fecha: 27-09-2026.
Figma: https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=0-1

## Alcance

| Fuente | Cantidad | Revisada |
|---|---|---|
| Anotaciones nativas de Dev Mode (categorías Interaction, Content, Accessibility, Development) | 28 | ✅ |
| Frames de nota `📝 Nota/*` y `📷 Anotación/Fotos` (texto completo en [figma-notas.md](figma-notas.md)) | 36 | ✅ |
| Notas y placeholders escritos dentro de las pantallas (`nota-dev`, `DEMO`, "por confirmar"…) | 12 | ✅ |
| **Comentarios de Figma (burbujas de conversación)** | ? | ❌ **No revisados** — ver [Pendiente](#pendiente-comentarios-de-figma) |

Las notas repiten mucho lo que dicen las anotaciones de Dev Mode. Acá están **consolidadas por tema**: cada
ítem junta todas las fuentes que hablan de lo mismo. El [Anexo](#anexo--índice-de-fuentes) mapea cada
anotación a su ítem y a su nodo en Figma.

## Cómo usar los IDs

Hay dos tipos de ID en este documento:

| ID | Qué es | Ejemplo |
|---|---|---|
| **R / I / D / H + número** | Ítem de esta auditoría. La letra es la acción: **R**esponder, **I**nformación al Centro, **D**iseño, **H**umano | `I9` = pedir al Centro a dónde lleva "Postular" |
| **`número:número`** | ID de la capa en Figma (el mismo que muestra la URL) | `1:3823` = el botón "Postular" de la ficha del Diplomado |

- **De ítem a Figma:** la columna **En Figma** de cada tabla trae links que abren el archivo con esa capa
  seleccionada. "nota" abre el frame `📝 Nota` correspondiente. "—" = el ítem no está en una capa (por
  ejemplo, la falta de pantallas móviles).
- **De Figma a ítem:** en Figma, clic derecho sobre la capa → *Copy link to selection*. El link termina en
  `node-id=1-3823`; ese es el ID `1:3823` (el guion reemplaza los dos puntos). Búscalo en el
  [Anexo](#anexo--índice-de-fuentes) para ver a qué ítems corresponde.
- En **Dev Mode**, las anotaciones aparecen como etiquetas sobre la capa; al seleccionar la capa se ve su
  texto en el panel derecho.
- IDs con forma `I1:106;1:489` son capas dentro de una instancia de componente; el link abre la instancia
  (`1:106`) y la capa está adentro.

## Cómo leer esto

Cada ítem tiene una **acción principal**:

| | Acción | Qué significa |
|---|---|---|
| ✅ | **Responder de inmediato** | Se entiende, es implementable con el Kit y no choca con ninguna regla. Basta confirmar. Trae respuesta sugerida. |
| 📩 | **Pedir información al Centro** | Falta un dato, un contenido o una definición que solo tiene el cliente. Trae la pregunta redactada. |
| 🎨 | **Pedir al diseño** | Falta una pantalla o un estado, o la nota contradice la pantalla. |
| 🧑‍⚖️ | **Análisis humano** | Hay que decidir: choca con el Kit o las reglas UC, tiene implicancias legales, de accesibilidad o de operación. |

Y una columna **¿Se entiende con las pantallas?**:
**Sí** — lo que dice la nota se ve dibujado. **Parcial** — se ve una parte; el resto es comportamiento
descrito solo en texto. **No** — la nota describe algo que no está en ninguna pantalla.

## Resumen

| Acción | Ítems |
|---|---|
| ✅ Responder de inmediato | 21 |
| 📩 Pedir información al Centro | 20 |
| 🎨 Pedir al diseño | 8 |
| 🧑‍⚖️ Análisis humano | 9 |
| **Total** | **58** |

### Lo más importante, en seis líneas

1. **No hay versión móvil.** Todas las pantallas son desktop 1440, pero varias notas describen cómo funciona
   "en celular" (D1).
2. **Faltan las pantallas de destino de casi todos los CTA**: Contacto, listado de Noticias, fichas de
   noticia, columna y seminario, búsqueda, formulario de brochure (D2).
3. **El header se anota como "zona normada… estructura intocable", pero no es la del Kit.** Es la zona de
   mayor riesgo en la auditoría UC (H1, H2).
4. **Carrusel y cinta de logos se mueven solos sin botón de pausa**: incumple WCAG 2.2.2, nivel A (H4).
5. **"Postular" no dice a dónde lleva** en ninguna parte, y es la acción que más importa del sitio (I9).
6. **La mayoría de las fechas de programas están "por confirmar"** y el estado de las tarjetas se calcula
   con esas fechas: sin calendario, el listado de Programas no funciona (I6, I7, D7).

---

## ✅ Responder de inmediato

| ID | En Figma | Pantalla | Qué dice la anotación | ¿Se entiende? | Respuesta sugerida |
|---|---|---|---|---|---|
| R1 | [1:488](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-488) · [1:507](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-507) · [1:516](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-516) · [1:10838](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-10838) | Cards (todas) | Toda la tarjeta es clic; hover sube con sombra suave (Programa: 4 px) | Parcial — hover no dibujado | "De acuerdo. Toda la tarjeta enlaza a un solo destino; el hover se implementa con transición suave." |
| R2 | [1:488](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-488) · [1:507](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-507) · [1:1091](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-1091) | Cards | Títulos cortados con "…": 2 líneas (Programa, Noticia), 3 (Documento); bajada de Noticia en 3 | Sí | "De acuerdo. Se corta visualmente; el texto completo queda en el HTML para buscadores y lectores de pantalla." |
| R3 | [1:619](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-619) · [1:1090](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-1090) | Nosotros | Barra de anclas sticky bajo la cabecera, chip activo según sección visible, scroll suave | Sí — hay DEMO | "De acuerdo. Se usa la navegación en página del Kit (`uc-in-page-nav`) con posición fija al hacer scroll." |
| R4 | [1:12](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-12) · [1:1090](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-1090) | Global | "Nosotros" no despliega en el menú; la sección actual se marca | Sí | "De acuerdo." |
| R5 | [1:635](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-635) | Nosotros | Diagrama del origen rehecho como texto real + íconos oficiales | Sí | "De acuerdo. Se construye en HTML, editable desde WordPress." |
| R6 | [1:2532](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-2532) · [1:3859](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-3859) | Fondos, Fichas | Acordeón: llega cerrado, se abre uno por clic, abrir otro no cierra el anterior, flecha gira | Sí | "De acuerdo. Se usa el acordeón del Kit (`uc-kit/accordion`)." *(Nota interna: verificar al construir que el JS del Kit permita varios abiertos.)* |
| R7 | [1:3916](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-3916) | Fichas | Tabla de valores y descuentos se escribe una vez y la muestran las 10 fichas | Sí | "De acuerdo. Será un campo global en WordPress que todas las fichas referencian." *(Ver I11.)* |
| R8 | [1:3940](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-3940) · [1:8820](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-8820) · [1:4466](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-4466) | Fichas | Recuadro de contacto lateral acompaña el scroll hasta el pie | Sí | "De acuerdo. En móvil pasa debajo del contenido." |
| R9 | [1:3793](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-3793) | Fichas | Franja de datos clave montada sobre la cabecera, fija (no sigue el scroll) | Sí | "De acuerdo." |
| R10 | [1:3823](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-3823) | Fichas | "Postular": único amarillo; hover amarillo oscuro `#E3AE00` | Sí | "De acuerdo. `#E3AE00` es color del Kit, se usa tal cual." |
| R11 | [1:2090](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-2090) · [1:3362](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-3362) · [1:10045](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-10045) · [1:12601](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-12601) · [nota](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-13044) | Documentos, Programas, Seminarios, Informes, Opinión | Filtros y buscador instantáneos, combinables, sin recargar; paginación se mantiene; contador "Todos (10)" automático | Parcial — desplegables de año no se ven abiertos | "De acuerdo. Con estos volúmenes (≤100 ítems) se filtra en el navegador con Vue, que es parte del stack del Kit. La paginación se aplica sobre el resultado filtrado." |
| R12 | [1:1091](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-1091) | Card/Documento | "Descargar PDF" abre en pestaña nueva, sin formulario | Sí | "De acuerdo. Se avisa al lector de pantalla que abre en pestaña nueva." |
| R13 | [1:2528](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-2528) | Fondos | Plazo y monto editables cada año; al cerrar, botón gris "Convocatoria cerrada" | Parcial — estado cerrado no dibujado | "De acuerdo. El botón cambia solo según la fecha de cierre cargada en WordPress; se usa el estado deshabilitado del Kit." |
| R14 | [1:2528](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-2528) | Home, Fondos, Fichas, Jornadas | Un solo botón amarillo por pantalla | Sí | "De acuerdo, cumple la regla UC." |
| R15 | [nota](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-13058) | Fichas | Si se ajusta el formato del Diplomado, se replica en las demás | Sí | "En WordPress es una sola plantilla de Programa con tres formatos (completo, corto, a medida): un cambio se aplica a todas." |
| R16 | [1:516](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-516) | Card/Acceso | Ícono de la biblioteca Material del Kit; hover borde celeste y flecha a la derecha | Parcial — hover no dibujado | "De acuerdo." |
| R17 | [nota](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-12960) | Nosotros | Una sola página reemplaza Quiénes somos, Directorio y Equipo Ejecutivo | Sí | "De acuerdo. Las URLs antiguas redirigen a la sección correspondiente." *(Ver I18.)* |
| R18 | [nota](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-13198) | Extensión | Próximas actividades se ordenan por fecha y desaparecen al pasar; si no hay, se muestran las últimas como "Realizado" | Parcial — estado de respaldo no dibujado | "De acuerdo. Se calcula con la fecha del evento." |
| R19 | [1:3951](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-3951) | Fichas | WhatsApp abre chat con mensaje prellenado con el nombre del programa | Sí | "De acuerdo." *(Número: ver I1.)* |
| R20 | [nota](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-12946) | Home | Sección Investigación sobre fondo azul oscuro | Sí | "De acuerdo." |
| R21 | [nota](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-13240) | Productos Académicos | ⚠ Pendiente del diseño: hoy hay dos botones amarillos; el segundo debería pasar a blanco | Sí | "Sí: aplicar. El panel de empresas queda con botón blanco para respetar un amarillo por pantalla." |

> R-varios, nota técnica para Card/Opinión: el nombre del autor filtra por autor y la tarjeta entera abre la
> columna. Son dos enlaces en una tarjeta; se resuelve con el patrón de enlace extendido sin anidar enlaces.
> No hace falta responderlo, pero conviene saberlo al construir.

---

## 📩 Pedir información al Centro

| ID | En Figma | Pantalla | Origen | ¿Se entiende? | Pregunta para el Centro |
|---|---|---|---|---|---|
| I1 | [1:54](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-54) · [1:3951](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-3951) | Header, Fichas | Anotación WhatsApp: "Pendiente: confirmar con el Centro que alguien lo responde" | Sí | ¿Qué número de WhatsApp se usa, quién lo responde y en qué horario? Si nadie puede responder, conviene no ponerlo. |
| I2 | [1:523](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-523) · [nota](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-1001) | Nosotros | 📷 Anotación/Fotos | Sí | ¿Pueden hacer una sesión de fotos de las 11 personas (8 directorio + 3 equipo), mismo fondo y encuadre, 1:1, mínimo 800×800? *(Alternativa con IA: ver H8.)* |
| I3 | [1:1091](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-1091) · [1:2116](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-2116) · [nota](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-13002) | Documentos, Card/Documento | Nota en pantalla: "el formato de cita definitivo lo entrega el cliente" | Sí | ¿Qué formato de cita usan (APA 7, Chicago, propio)? Con eso se ordenan los campos. |
| I4 | [nota](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-12988) | Red de Investigación | Nota: ayudantes "pendiente del Centro"; "si una persona tiene ficha, el nombre es enlace" | Parcial | Lista de ayudantes de investigación. ¿Qué personas tienen ficha propia y a dónde enlaza (perfil UC, sitio personal)? |
| I5 | [1:523](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-523) | Card/Persona | Con reseña abre biografía en ventana | No — ventana no dibujada | ¿Qué personas tienen reseña? Enviar los textos. |
| I6 | [I1:3377;1:497](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-3377) · [1:4366](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-4366) · [1:4355](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-4355) | Programas (listado y 7 fichas) | "Fecha por confirmar", "Por confirmar" en Fechas, badge "Próxima fecha por confirmar" | Sí | Calendario de los 10 programas: fecha de inicio, apertura y cierre de postulación de la próxima versión. |
| I7 | [1:488](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-488) · [nota](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-13044) | Programas | Estado calculado: Matrículas abiertas / Próximamente / Cerrado | Parcial | Confirmar la regla: *Próximamente* = antes de abrir postulación; *Matrículas abiertas* = entre apertura y cierre; *Cerrado* = después. ¿Quién actualiza las fechas cada versión? *(Ver H9.)* |
| I8 | [nota](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-13114) · [nota](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-13128) | Fichas: Claves financieras, GC & Compliance, Empresas familiares | ⚠ "Los módulos se completaron a partir de la descripción general del sitio actual" | Sí | Confirmar o corregir los módulos de estos tres programas. |
| I9 | [1:3823](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-3823) | Fichas | **No está anotado** a dónde lleva "Postular" | No | ¿"Postular" lleva a un formulario propio, a una plataforma UC de admisión o pago, o a un correo? |
| I10 | [1:3827](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-3827) | Fichas | Brochure: "conecta con el formulario /descarga-brochure que ya existía" | No — formulario no dibujado | ¿Dónde está hoy ese formulario? ¿A quién llegan los datos (correo, CRM)? ¿Hay un PDF de brochure por programa? *(Datos personales: ver H5.)* |
| I11 | [1:3916](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-3916) | Fichas | Tabla de descuentos única para las 10 fichas | Sí | ¿Los descuentos son los mismos para los 10 programas, incluidos workshops e In Company? |
| I12 | [1:3940](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-3940) | Fichas | Recuadro "Contacto de coordinación" | Sí | Nombre, correo y teléfono de coordinación de cada programa, o si es uno solo para todos. |
| I13 | [1:9624](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-9624) · [1:9635](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-9635) · [nota](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-13212) | Jornadas | "Fecha y lugar por confirmar · Inscripción gratuita"; "Inscribirse" lleva a formulario o enlace externo | Parcial | Fecha y lugar de la Jornada 2026 (estamos a fines de septiembre). ¿Inscripción propia o enlace externo? Resumen, fotos y grabaciones de 2023–2025 para el archivo. |
| I14 | [1:10045](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-10045) · [I1:2964;1:511](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-2964) · [nota](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-13030) | Seminarios (Investigación y Extensión) | Placeholder "Seminario de investigación · título por confirmar"; filtro por ciclo | Parcial | Lista de seminarios reales y lista oficial de ciclos ("Debates de Gobierno Corporativo", "Asuntos de la Alta Dirección"…). |
| I15 | [nota](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-13240) | Productos Académicos | Precios 60 UF (documentos) y 20 UF (investigación por encargo); casos Mazars, Bolsa de Santiago, Acafi | Sí | Confirmar precios (verificar que no estén invertidos) y que hay autorización para nombrar a esos clientes. |
| I16 | [1:162](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-162) · [1:182](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-182) | Home — Colaboradores | Placeholders "Logo socio"; nota en pantalla: "logos en escala de grises" | Parcial | Logos de colaboradores en vector y autorización de uso. Confirmar la escala de grises: solo aparece en una nota suelta. |
| I17 | [1:83](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-83) · [1:507](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-507) · [1:84](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-84) | Home, Card/Noticia | "placeholder — foto editorial 1440×540"; noticias sin imagen usan "imagen genérica del Centro" | Parcial | Fotos editoriales para el carrusel (¿cuántas diapositivas?) e imagen genérica del Centro. |
| I18 | — | Todo el sitio | Cantidades citadas en las notas (17 documentos, 11 informes, 2 guías, 10 Diálogo, ~100 columnas, 23 seminarios, 23 personas en Red) | — | Acceso o exportación del contenido del sitio actual, y lista de URLs antiguas para redirigir. |
| I19 | [1:10838](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-10838) · [nota](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-13310) | Opinión | "Clic abre la columna completa dentro del sitio; si se publicó en un medio externo, enlaza al medio" | Parcial | ¿Tenemos el texto completo y los derechos para publicar las columnas, o solo se enlaza al medio original? |
| I20 | [nota](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-13268) | Informes, Guías, Diálogo | Card/Documento con portada | Sí | ¿Envían las portadas o se generan automáticamente desde la primera página del PDF? |

---

## 🎨 Pedir al diseño

| ID | En Figma | Tema | Qué falta o qué choca | ¿Se entiende? | Pregunta para diseño |
|---|---|---|---|---|---|
| D1 | — | **Móvil** | No hay ninguna pantalla móvil. Las notas describen comportamiento "al tocar, en celular" | No | ¿Se diseña móvil o se sigue el responsive del Kit? Lo más crítico: franja de datos clave, recuadro lateral, filtros con chips, carrusel. El header móvil ya lo trae normado el Kit. |
| D2 | [1:50](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-50) · [nota](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-13156) | **Pantallas de destino** | No existen: **Contacto** (destino de Contacto, Solicitar propuesta, Solicitar acceso), listado de **Noticias** y de **Newsletters** ("Ver todos →"), **ficha** de noticia, columna y seminario, **búsqueda**, **formulario de brochure**, 404 | No | ¿Se diseñan o se usan las plantillas del Kit (`template-contacto.php`, `news.php`, `news-single.php`, `404.php`)? |
| D3 | [1:81](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-81) | Buscador | `icon/search` en el menú, sin anotación ni pantalla de resultados | No | ¿Qué busca (todo el sitio, solo programas o documentos) y dónde muestra resultados? ¿Se mantiene? |
| D4 | [1:12](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-12) · [1:57](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-57) | Desplegables del menú | No están dibujados. Investigación, Extensión e IyO se deducen de sus subpáginas; **Programas no** | Parcial | ¿Qué muestra el desplegable de Programas: los 10, o agrupados por tipo? |
| D5 | [1:523](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-523) · [1:9624](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-9624) · [nota](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-13030) | Estados no dibujados | Card/Persona sin foto (iniciales) y ventana de biografía; "Revive la jornada"; mensaje de vacío en Seminarios; filtros sin resultados | No | ¿Se dibujan o se resuelven con componentes del Kit (modal `block-alert-modal`, alertas)? ¿Cuál es el texto del mensaje vacío? |
| D6 | [1:8767](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-8767) · [1:4404](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-4404) · [nota](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-13170) · [nota](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-13184) | **Contradicción** — workshops | La nota de IA y Ciberseguridad dice "descripción, Dirigido a, relator y valor. **Sin acordeón**". Las pantallas de IA y de ESG tienen **acordeón** (Metodología, Contenidos) y **no** tienen sección de relator ni "Dirigido a" | Contradice | ¿Vale la nota o la pantalla? |
| D7 | [1:4355](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-4355) | **Contradicción** — estados de programa | El badge "**Próxima fecha por confirmar**" (5 fichas) no es ninguno de los estados definidos (Matrículas abiertas / Próximamente / Cerrado / "A convenir") | Contradice | ¿Es un cuarto estado? ¿Cuándo aparece? |
| D8 | [1:106](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-106) · [I1:106;1:489](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-106) | Componentes fuera del Kit | Anotación en Badge: "Componentes como estos fueron cambiados exclusivamente por una propuesta estética, y quizás pueden ser propuestos como nuevas integraciones al DS de UC" | **No queda claro** | ¿Cuáles son "estos" componentes y qué cambia respecto del Kit? Se necesita la lista completa, porque la UC audita el CSS. *(Ver H6.)* |

---

## 🧑‍⚖️ Análisis humano

| ID | En Figma | Tema | Por qué requiere decisión | Opciones |
|---|---|---|---|---|
| H1 | [1:12](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-12) · [1:50](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-50) | **Header** | La anotación dice "zona normada del Kit UC (estructura intocable)", pero el diseño tiene **dos filas** (logo + CTAs / menú + buscador). `header-submarca.php` del Kit es **una fila** (logo `col-lg-3` + menú `col-lg-9`), sin CTAs ni buscador. Es una de las 4 zonas que bloquean la publicación | a) Consultar a Dirección Digital UC con el diseño. b) Usar el header del Kit y llevar Contacto y WhatsApp a otra zona |
| H2 | [1:54](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-54) | WhatsApp verde | Único color fuera de la paleta UC, y está **dentro del header** (zona auditada). La justificación del diseño es razonable (reconocimiento de marca) | a) Mantener y justificarlo ante la UC. b) Moverlo fuera del header (recuadro lateral de fichas, pie de Contacto) |
| H3 | [1:488](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-488) | Texto sobre foto | Card/Programa pone el título blanco sobre degradado. La regla UC dice "nunca texto sobre fotos… **nunca en cards**". En el hero la regla pide "capa oscura de **opacidad fija**" y el diseño usa **degradado** | a) Aceptar la excepción (el diseño argumenta contraste). b) Título bajo la foto en la card; en el hero, cambiar el degradado por capa fija |
| H4 | [1:83](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-83) · [1:162](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-162) · [1:182](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-182) · [nota](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-12946) | **Accesibilidad: movimiento automático** | Carrusel (cada 6 s, "sin play/pausa") y cinta de logos continua. **WCAG 2.2.2 (nivel A)** exige poder pausar o detener lo que se mueve solo más de 5 s. Pausar con el mouse encima no sirve con teclado ni táctil | a) Agregar un botón de pausa discreto y respetar `prefers-reduced-motion`. b) Carrusel manual. Contradice la nota "Sin play/pausa" |
| H5 | [1:3827](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-3827) | **Datos personales** | Brochure (nombre, correo, empresa), Contacto, Solicitar propuesta e inscripciones capturan datos. Hace falta aviso de privacidad y consentimiento según la política UC y la ley chilena (19.628; la nueva **Ley 21.719** empieza a regir en diciembre de 2026). Además, el plugin de formularios sigue sin definirse (pendiente del README) | Definir el plugin, el destino de los datos y el texto de consentimiento antes de construir los formularios |
| H6 | [1:106](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-106) · [I1:106;1:489](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-106) | Componentes nuevos para el DS UC | La anotación D8 sugiere proponerlos como nuevas integraciones al DS de la UC | ¿Se presentan formalmente a Dirección Digital antes de la auditoría, o se ajustan al Kit? |
| H7 | [1:487](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-487) | Crédito en el footer | Todas las pantallas dicen "Desarrollo: Dirección de Informática UC · Utilizando el Kit Digital UC". Es el texto por defecto del footer normado, pero el desarrollo no lo hace esa dirección | ¿Se mantiene el texto normado o se consulta a la UC? |
| H8 | [nota](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-1001) | Fotos mejoradas con IA | La anotación propone Let's Enhance o Photoshop si no hay sesión nueva, y "emparejar fondos" | Decisión de marca y ética de imagen: ¿se acepta retocar con IA fotos de personas reales? |
| H9 | — | Operación de estados automáticos | Programas, Fondos, Extensión y Jornadas cambian de estado según fechas. Si nadie actualiza las fechas cada ciclo, el sitio muestra "Cerrado" o secciones vacías | Definir quién del Centro mantiene las fechas y con qué frecuencia |

---

## Pendiente: comentarios de Figma

El MCP de Figma lee anotaciones y capas, **no comentarios**. El navegador integrado no tiene sesión de
Figma, así que tampoco los pude leer desde ahí. Opciones:

1. Inicias sesión en Figma en el panel del navegador y yo leo el panel de comentarios.
2. Me pides que use tu Chrome (Claude in Chrome), donde ya tienes sesión.
3. Me pegas los comentarios o una exportación.

Cuando estén, se agregan a este mismo formato.

---

## Anexo — índice de fuentes

Enlace a cada nodo: `https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=<id con guion>`
(por ejemplo, `1:12` → `node-id=1-12`).

### Anotaciones de Dev Mode (28)

| Nodo | Capa | Pantalla | Categoría | Ítem |
|---|---|---|---|---|
| [1:12](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-12) | Header/Navbar (normado) | Home | Interaction | R4, D4, H1 |
| [1:50](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-50) | CTA/Contacto | Home | Content | D2, H1 |
| [1:54](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-54) | CTA/WhatsApp | Home | Content | I1, H2 |
| [1:83](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-83) | Hero/Carrusel | Home | Interaction | H4, I17 |
| [1:106](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-106) (instancia [I1:106;1:489](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-106)) | Badge | Home | Content | D8, H6 |
| [1:162](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-162) | Sección/Colaboradores (marquee) | Home | Interaction | H4, I16 |
| [1:488](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-488) | Card/Programa | Componente | Interaction | R1, R2, I7, H3 |
| [1:507](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-507) | Card/Noticia | Componente | Interaction | R1, R2, I17 |
| [1:516](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-516) | Card/Acceso | Componente | Interaction | R1, R16 |
| [1:523](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-523) | Card/Persona | Componente | Interaction | I2, I5, D5 |
| [1:619](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-619) | Navegación de anclas (sticky) | Nosotros | Interaction | R3 |
| [1:635](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-635) | Sección/Origen (diagrama UI) | Nosotros | Accessibility | R5 |
| [1:1091](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-1091) | Card/Documento | Componente | Interaction | R2, R12, I3 |
| [1:2090](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-2090) | Buscar y filtrar | Investigación / Documentos | Interaction | R11 |
| [1:2528](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-2528) | CTA/primario | Investigación / Fondos | Interaction | R13, R14 |
| [1:2532](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-2532) | Acordeón | Investigación / Fondos | Interaction | R6 |
| [1:3362](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-3362) | Filtro por tipo | Programas / Listado | Interaction | R11 |
| [1:3793](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-3793) | Card/Datos clave | Ficha Diplomado | Interaction | R9 |
| [1:3823](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-3823) | CTA/primario (Postular) | Ficha Diplomado | Content | R10, I9 |
| [1:3827](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-3827) | CTA/secundario (Brochure) | Ficha Diplomado | Interaction | I10, H5 |
| [1:3859](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-3859) | Acordeón | Ficha Diplomado | Interaction | R6 |
| [1:3916](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-3916) | Tabla descuentos | Ficha Diplomado | Development | R7, I11 |
| [1:3940](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-3940) | Card/Contacto coordinación | Ficha Diplomado | Interaction | R8, I12 |
| [1:3951](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-3951) | CTA/WhatsApp | Ficha Diplomado | Interaction | R19, I1 |
| [1:9624](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-9624) | Sección/Edición actual | Extensión / Jornadas | Interaction | I13, D5 |
| [1:10045](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-10045) | Filtros | Extensión / Seminarios | Interaction | R11, I14 |
| [1:10838](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-10838) | Card/Opinión | Componente | Interaction | R1, I19 |
| [1:12601](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-12601) | Filtro por autor | IyO / Opinión | Interaction | R11 |

### Notas y placeholders dentro de las pantallas (12)

| Nodo | Texto | Pantalla | Ítem |
|---|---|---|---|
| [1:84](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-84) | "placeholder — foto editorial 1440×540" | Home | I17 |
| [1:182](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-182) | "nota: cinta con desplazamiento horizontal automático e infinito, logos en escala de grises" | Home | I16, H4 |
| — | "Logo socio" (placeholders de la cinta) | Home | I16 |
| [1:1090](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-1090) | "DEMO — comportamiento al scrollear… El dropdown de Nosotros se eliminó del menú." | Nosotros (demo) | R3, R4 |
| [1:2116](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-2116) | "Nota: el formato de cita definitivo lo entrega el cliente…" | Investigación / Documentos | I3 |
| [I1:2964;1:511](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-2964) | "Seminario de investigación · título por confirmar" | Investigación / Seminarios | I14 |
| [I1:3377;1:497](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-3377) | "Fecha por confirmar" | Programas / Listado | I6 |
| [1:4366](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-4366), [1:5947](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-5947), [1:6507](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-6507), [1:7064](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-7064), [1:7621](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-7621), [1:8172](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-8172), [1:8729](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-8729) | "Por confirmar" (dato Fechas) | 7 fichas | I6 |
| [1:4355](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-4355), [1:5936](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-5936), [1:6496](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-6496), [1:7610](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-7610), [1:8718](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-8718) | "Próxima fecha por confirmar" (badge) | 5 fichas | I6, D7 |
| [1:8820](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-8820), [1:4466](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-4466) (y demás fichas) | "columna lateral: sticky al scrollear" | Fichas | R8 |
| [1:9635](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-9635) | "Fecha y lugar por confirmar · Inscripción gratuita" | Extensión / Jornadas | I13 |
| [1:487](https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=1-487) (y todas las pantallas) | "Desarrollo: Dirección de Informática UC · Utilizando el Kit Digital UC" | Footer/Dev | H7 |

### Frames de nota (36)

Transcritos completos en [figma-notas.md](figma-notas.md). Lo que aportan sin repetir las anotaciones de Dev
Mode ya está absorbido en los ítems: Nosotros → R17; Red → I4; Documentos → I3; Seminarios → I14, D5;
Listado → R11, I7; Fichas → R15, I8, D6; In Company → D2 (Contacto); Extensión → R18; Jornadas → I13;
Productos Académicos → R21, I15; IyO → I19, I20; Fotos → I2, H8.
