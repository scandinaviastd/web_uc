# Notas de diseño del Figma

Transcritas de los frames `📝 Nota/*` y `📷 Anotación/Fotos` del Figma
(https://www.figma.com/design/F576MdCtMY2dY88WMVmtUQ/Untitled?node-id=0-1, página `0:1`).
Describen decisiones y **comportamiento que no se ve en Figma**: filtros, carruseles, estados calculados,
formularios. Son la especificación funcional del sitio. Si el Figma cambia, actualizar este archivo.

Ver al final: [Choques con el Kit UC](#choques-con-el-kit-uc).

## 📷 Fotos

Pedido de fotografías

Solicitar al Centro fotos nuevas de las 11 personas (8 directorio + 3 equipo ejecutivo) con el MISMO fondo neutro y encuadre. Proporción 1:1, mínimo 800×800 px. Alternativa si no hay sesión: mejorar y escalar las fotos actuales con Let’s Enhance (letsenhance.io) o Photoshop, y emparejar fondos.

## Home

Portada (Home)

**QUÉ ES**

La primera pantalla del sitio. Su trabajo es mostrar qué hace el Centro y llevar a la gente a Programas, que es donde se postula. Se mantienen intactos: barra azul UC de arriba, estructura de la cabecera, pie de página institucional, colores y tipografía del Kit Digital UC.

**DECISIONES Y POR QUÉ**

- Cabecera: "Contacto" es una píldora con borde (no un botón relleno) para no competir con el menú. WhatsApp va como ícono redondo en su verde de marca: es el único color fuera de la paleta UC y es a propósito, porque en azul no se reconoce.
- Un solo amarillo por pantalla: el botón del carrusel. Antes había amarillo en títulos y decoraciones.
- Títulos sobre foto siempre en blanco con degradado a azul oscuro UC: se leen sobre cualquier foto.
- Tarjetas con imagen y título de altura fija: las filas quedan parejas aunque cambie el largo de los textos.
- Sección Investigación sobre fondo azul oscuro: corta el ritmo blanco/gris y recupera atención a mitad de página.

**CÓMO FUNCIONA (no se ve en Figma)**

- Carrusel: cambia solo cada 6 s, en bucle sin saltos; se detiene con el mouse encima; se puede pasar con flechas del teclado. Las barritas muestran cuál está activa y su avance. No hay play/pausa.
- Cinta de colaboradores: los logos corren de derecha a izquierda de forma continua y se repiten para que nunca haya hueco; se detiene con el mouse encima.
- Tarjetas: toda la tarjeta es clic (no solo el botón) y sube apenas con sombra suave al pasar el mouse.
- Menú: los desplegables se abren al pasar el mouse (al tocar, en celular). "Nosotros" no despliega porque es una sola página.

## Nosotros

Nosotros

**QUÉ ES**

Una sola página que reemplaza a tres (Quiénes somos, Directorio, Equipo Ejecutivo). Antes "Nosotros" en el menú no llevaba a ninguna parte.

**DECISIONES Y POR QUÉ**

- Se unificó porque las tres páginas tenían muy poco contenido y obligaban a navegar para ver casi nada.
- El diagrama del origen del Centro (Facultad de Derecho + Escuela de Administración → Centro → 3 pilares) se rehizo como interfaz real: texto editable, íconos oficiales, accesible y legible por Google. Antes era una imagen con texto pegado.
- Directorio y Equipo Ejecutivo usan la misma tarjeta de persona: antes el Equipo eran tres nombres sin foto.
- Las fotos aparecen como rectángulos grises: son el espacio para las fotos nuevas con fondo parejo (ver nota 📷 arriba).

**CÓMO FUNCIONA (no se ve en Figma)**

- Barra de anclas: empieza bajo el título; al hacer scroll se pega bajo la cabecera y se queda ahí. La opción de la sección que se está viendo se marca sola (ver DEMO al final de esta columna).
- Ruta de migas: todos los escalones son enlace, incluido "Nosotros".
- Al hacer clic en una opción de la barra, la página se desliza suavemente hasta esa sección.

## Investigación / Landing

Investigación — página de entrada

**QUÉ ES**

La página a la que se llega al hacer clic en "Investigación" del menú. Antes ese clic no llevaba a nada: solo abría una lista.

**DECISIONES Y POR QUÉ**

- Es corta a propósito: su trabajo es orientar, no retener. Cuatro accesos grandes (una tarjeta por subpágina) más lo último publicado.
- Cada acceso usa la tarjeta Card/Acceso con ícono oficial, título y una línea que explica qué hay adentro.

**CÓMO FUNCIONA (no se ve en Figma)**

- Los cuatro accesos llevan a las mismas subpáginas que el desplegable del menú.
- Toda la tarjeta de acceso es clic.

## Investigación / Red

Red de Investigación

**QUÉ ES**

Las personas que investigan con el Centro. Antes: 23 nombres en una lista larga con una banda azul arriba, que ocupaba tres veces este alto.

**DECISIONES Y POR QUÉ**

- Filtro por categoría (Profesores afiliados · Investigadores · Ayudantes) como chips arriba.
- Los nombres en bloques de tres columnas: se recorre de un vistazo.
- Los ayudantes de investigación aparecen como espacio reservado: en el sitio actual no están los nombres (pendiente del Centro).

**CÓMO FUNCIONA (no se ve en Figma)**

- El filtro es instantáneo, sin recargar. "Todos" vuelve a la lista completa.
- Si una persona tiene ficha en el sitio, el nombre es enlace; si no, es texto.

## Investigación / Documentos

Documentos de Trabajo

**QUÉ ES**

Listado de papers descargables (17 hoy). Antes: tarjetas con la cita en letra chica, mucho aire y el botón de descarga desalineado. En celular medía 34 pantallas de scroll.

**DECISIONES Y POR QUÉ**

- Tarjeta Card/Documento con la cita separada en campos: tipo · año · título · autores · dónde se publicó. Cada dato se encuentra al tiro.
- "Descargar PDF" siempre abajo, en el mismo lugar en todas las tarjetas.
- Buscador y filtro por año arriba: con listas largas, filtrar es más rápido que pasar páginas.
- El formato de cita oficial está pendiente del Centro: cuando lo definan, basta con reordenar los campos, no hay que rediseñar.

**CÓMO FUNCIONA (no se ve en Figma)**

- El buscador busca en título y autores mientras se escribe.
- Los filtros se combinan (año + búsqueda) y actúan al instante.
- "Descargar PDF" abre el PDF en una pestaña nueva, sin formulario.
- La paginación de abajo se mantiene para quien quiere recorrer todo.

## Investigación / Fondos

Fondos Concursables

**QUÉ ES**

La convocatoria anual de fondos. Antes: una foto de stock, un párrafo, un plazo vencido en negrita, y toda la información útil (monto, requisitos, bases) escondida en un acordeón cerrado.

**DECISIONES Y POR QUÉ**

- Un recuadro azul con los datos clave (plazo · monto máximo · propuestas por año) visible sin hacer clic.
- El botón amarillo "Descargar bases y postular" es el único amarillo de la página y está a la vista en los primeros segundos.
- Debajo, el acordeón con el detalle largo (requisitos, evaluación, calendario): no estorba a quien solo quiere el dato.

**CÓMO FUNCIONA (no se ve en Figma)**

- Acordeón: llega cerrado; se abre uno por clic; abrir otro no cierra el anterior; la flecha gira.
- El plazo y el monto se editan cada convocatoria desde el panel de WordPress; la página no cambia.
- Cuando la convocatoria está cerrada, el botón pasa a estado deshabilitado (gris) y dice "Convocatoria cerrada".

## Investigación / Seminarios

Seminarios de Investigación

**QUÉ ES**

Actividades académicas del área de investigación. Antes había una sola tarjeta suelta en la página.

**DECISIONES Y POR QUÉ**

- Grilla preparada para crecer, con la misma tarjeta que Noticias y eventos (Card/Noticia) para que todo el sitio se vea igual.
- Filtro Próximos / Realizados: lo primero que la persona quiere saber es a qué puede ir.

**CÓMO FUNCIONA (no se ve en Figma)**

- El filtro es instantáneo. Los realizados conservan su ficha con el resumen de la actividad.
- Si no hay próximos, la sección muestra un mensaje breve en vez de quedar vacía.

## Programas / Listado

Programas — listado

**QUÉ ES**

La página donde se comparan los 10 programas. Antes las tarjetas eran todas distintas: con foto y sin foto, con descripción larga y corta, y solo 4 de 10 programas tenían cómo postular.

**DECISIONES Y POR QUÉ**

- Las 10 tarjetas exactamente iguales (Card/Programa), con fecha de inicio y modalidad visibles: se compara sin entrar a cada ficha.
- Título blanco sobre degradado a azul oscuro y badge blanco con el tipo: antes los títulos amarillos sobre foto no se leían.
- Filtro por tipo (Diplomado · Cursos · Workshops · In Company) como chips arriba.
- Etiqueta de estado ("Matrículas abiertas") en la tarjeta: evita entrar a algo cerrado.

**CÓMO FUNCIONA (no se ve en Figma)**

- El filtro es instantáneo, sin recargar. "Todos (10)" vuelve al listado completo.
- Toda la tarjeta es clic; al pasar el mouse sube apenas con sombra.
- La etiqueta de estado se calcula sola con las fechas de postulación: "Matrículas abiertas", "Próximamente" o "Cerrado".
- Si el título tiene más de dos líneas, se corta con "…" y no empuja el resto.

## Programas / Ficha / Diplomado

Ficha de programa — formato completo (Diplomado)

**QUÉ ES**

La página que más afecta las inscripciones. Antes el precio, el horario y las fechas estaban dentro de un acordeón cerrado: había que hacer dos clics para saber que el Diplomado cuesta $4.400.000 y es los lunes.

**DECISIONES Y POR QUÉ**

- Cabecera azul oscuro con el nombre grande y etiquetas de tipo y estado.
- La franja de datos clave (fechas · horario · modalidad · valor) se monta sobre la cabecera a propósito: así queda por encima del pliegue de la pantalla y se ve sin hacer scroll.
- "Postular" es el único botón amarillo de la ficha. "Descargar brochure" va al lado en azul: es el paso previo para quien duda.
- Descripción, "Dirigido a" y "Requisitos" van abiertos porque deciden si el programa es para mí. Equipo docente, metodología, módulos y admisión van en acordeón porque son largos y solo interesan a quien ya se convenció.
- El precio va como tabla, no párrafo: los descuentos se comparan de un vistazo.
- Recuadro de contacto lateral: las dudas nacen leyendo precio y requisitos, que están abajo.

**CÓMO FUNCIONA (no se ve en Figma)**

- La franja de datos clave es fija (no sigue el scroll); solo está montada visualmente sobre la cabecera.
- El recuadro de contacto SÍ acompaña el scroll: se queda visible a la derecha hasta llegar al pie.
- Acordeón: llega cerrado; se abre uno por clic; abrir otro no cierra el anterior; la flecha gira.
- "Descargar brochure" no descarga directo: abre un formulario corto (nombre, correo, empresa) y luego entrega el PDF. Así el Centro sabe quién se interesó.
- WhatsApp abre el chat con un mensaje prellenado con el nombre del programa.
- La etiqueta de estado se calcula sola con las fechas de postulación.
- La tabla de descuentos se escribe una sola vez en WordPress y las 10 fichas la muestran.

## Programas / Ficha / Formando nuevos directores

Ficha — Formando nuevos directores

**QUÉ ES**

Curso. Formato completo.

**DECISIONES Y POR QUÉ**

- Mismo formato "completo" que el Diplomado: cabecera azul oscuro, franja de datos clave flotante, Postular + Descargar brochure, contacto lateral, acordeón y tabla de valores.
- Solo cambian los datos y los módulos del programa. Si se ajusta algo del formato, se ajusta en la ficha del Diplomado y se replica.

**CÓMO FUNCIONA (no se ve en Figma)**

- Igual que el Diplomado: la franja de datos es fija; el recuadro de contacto acompaña el scroll; el acordeón llega cerrado; la etiqueta de estado se calcula con las fechas.

## Programas / Ficha / Competencias para Directores

Ficha — Competencias para Directores

**QUÉ ES**

Curso. Formato completo.

**DECISIONES Y POR QUÉ**

- Mismo formato "completo" que el Diplomado: cabecera azul oscuro, franja de datos clave flotante, Postular + Descargar brochure, contacto lateral, acordeón y tabla de valores.
- Solo cambian los datos y los módulos del programa. Si se ajusta algo del formato, se ajusta en la ficha del Diplomado y se replica.

**CÓMO FUNCIONA (no se ve en Figma)**

- Igual que el Diplomado: la franja de datos es fija; el recuadro de contacto acompaña el scroll; el acordeón llega cerrado; la etiqueta de estado se calcula con las fechas.

## Programas / Ficha / Comité de Directores

Ficha — Comité de Directores

**QUÉ ES**

Curso. Formato completo.

**DECISIONES Y POR QUÉ**

- Mismo formato "completo" que el Diplomado: cabecera azul oscuro, franja de datos clave flotante, Postular + Descargar brochure, contacto lateral, acordeón y tabla de valores.
- Solo cambian los datos y los módulos del programa. Si se ajusta algo del formato, se ajusta en la ficha del Diplomado y se replica.

**CÓMO FUNCIONA (no se ve en Figma)**

- Igual que el Diplomado: la franja de datos es fija; el recuadro de contacto acompaña el scroll; el acordeón llega cerrado; la etiqueta de estado se calcula con las fechas.

## Programas / Ficha / Claves decisiones financieras

Ficha — Claves para decisiones financieras

**QUÉ ES**

Curso. Formato completo.

**DECISIONES Y POR QUÉ**

- Mismo formato "completo" que el Diplomado: cabecera azul oscuro, franja de datos clave flotante, Postular + Descargar brochure, contacto lateral, acordeón y tabla de valores.
- Solo cambian los datos y los módulos del programa. Si se ajusta algo del formato, se ajusta en la ficha del Diplomado y se replica.
- ⚠ Los módulos de este programa se completaron a partir de la descripción general del sitio actual: confirmar con el Centro.

**CÓMO FUNCIONA (no se ve en Figma)**

- Igual que el Diplomado: la franja de datos es fija; el recuadro de contacto acompaña el scroll; el acordeón llega cerrado; la etiqueta de estado se calcula con las fechas.

## Programas / Ficha / Gobierno Corporativo & Compliance

Ficha — Gobierno Corporativo & Compliance

**QUÉ ES**

Curso. Formato completo.

**DECISIONES Y POR QUÉ**

- Mismo formato "completo" que el Diplomado: cabecera azul oscuro, franja de datos clave flotante, Postular + Descargar brochure, contacto lateral, acordeón y tabla de valores.
- Solo cambian los datos y los módulos del programa. Si se ajusta algo del formato, se ajusta en la ficha del Diplomado y se replica.
- ⚠ Los módulos de este programa se completaron a partir de la descripción general del sitio actual: confirmar con el Centro.

**CÓMO FUNCIONA (no se ve en Figma)**

- Igual que el Diplomado: la franja de datos es fija; el recuadro de contacto acompaña el scroll; el acordeón llega cerrado; la etiqueta de estado se calcula con las fechas.

## Programas / Ficha / Empresas familiares

Ficha — Empresas familiares y family office

**QUÉ ES**

Curso. Formato completo.

**DECISIONES Y POR QUÉ**

- Mismo formato "completo" que el Diplomado: cabecera azul oscuro, franja de datos clave flotante, Postular + Descargar brochure, contacto lateral, acordeón y tabla de valores.
- Solo cambian los datos y los módulos del programa. Si se ajusta algo del formato, se ajusta en la ficha del Diplomado y se replica.
- ⚠ Los módulos de este programa se completaron a partir de la descripción general del sitio actual: confirmar con el Centro.

**CÓMO FUNCIONA (no se ve en Figma)**

- Igual que el Diplomado: la franja de datos es fija; el recuadro de contacto acompaña el scroll; el acordeón llega cerrado; la etiqueta de estado se calcula con las fechas.

## Programas / Ficha / In Company

Ficha de programa — formato a medida (In Company)

**QUÉ ES**

Programa que se arma según cada empresa. No tiene precio fijo ni fecha de inicio, así que el formato completo le dejaba secciones vacías.

**DECISIONES Y POR QUÉ**

- Misma cabecera, franja de datos y contacto lateral que las demás fichas: la persona reconoce que sigue en Programas.
- La franja muestra modalidad, duración y a quién va dirigido en vez de fecha y valor.
- El botón amarillo dice "Solicitar propuesta" en vez de "Postular": es lo que realmente pasa (una conversación, no una inscripción).
- Sin tabla de precios ni módulos fijos: en su lugar, cómo se arma el programa y para qué tipo de empresa.

**CÓMO FUNCIONA (no se ve en Figma)**

- "Solicitar propuesta" lleva al formulario de contacto con el asunto prellenado ("Propuesta In Company").
- El recuadro de contacto acompaña el scroll igual que en las otras fichas.

## Programas / Ficha / IA y Ciberseguridad

Ficha de programa — formato corto (workshop)

**QUÉ ES**

Workshop de un día. No tiene módulos, equipo docente extenso ni proceso de admisión, así que el formato completo le dejaba secciones vacías.

**DECISIONES Y POR QUÉ**

- Misma cabecera, franja de datos, Postular + brochure y contacto lateral que el formato completo.
- Cuerpo reducido: descripción, "Dirigido a", relator y valor. Sin acordeón: no hay contenido largo que esconder.
- Igual jerarquía visual que los programas grandes: un workshop de $900.000 merece verse tan cuidado como el Diplomado.

**CÓMO FUNCIONA (no se ve en Figma)**

- Igual que las demás fichas: franja fija, contacto lateral acompaña el scroll, etiqueta de estado automática, brochure con formulario.

## Programas / Ficha / Workshop ESG

Ficha — Workshop ESG (formato corto)

**QUÉ ES**

Workshop de un día. Formato corto.

**DECISIONES Y POR QUÉ**

- Mismo formato corto que "IA y Ciberseguridad": solo cambian los datos.

**CÓMO FUNCIONA (no se ve en Figma)**

- Igual que las demás fichas.

## Extensión / Landing

Extensión — página de entrada

**QUÉ ES**

La página a la que se llega desde "Extensión" en el menú. Antes ese clic no llevaba a nada.

**DECISIONES Y POR QUÉ**

- Dos accesos grandes (Jornadas · Seminarios y Webinars) y debajo las próximas actividades: lo que la persona quiere saber es a qué puede ir.
- Corta a propósito: orienta y deriva.

**CÓMO FUNCIONA (no se ve en Figma)**

- Las próximas actividades se ordenan solas por fecha y desaparecen cuando pasan.
- Si no hay próximas, el bloque muestra las últimas realizadas con la etiqueta "Realizado".

## Extensión / Jornadas

Jornadas

**QUÉ ES**

El evento más importante del año del Centro. Antes: 2 tarjetas dispares donde la jornada de 2026 se veía igual que la de 2023.

**DECISIONES Y POR QUÉ**

- La edición actual va como banner grande con "Inscribirse a la jornada" (el único amarillo de la página): merece jerarquía.
- Debajo, las ediciones anteriores (2025, 2024, 2023) como archivo, con la misma tarjeta que Noticias.

**CÓMO FUNCIONA (no se ve en Figma)**

- Cuando la jornada ya pasó, el banner muestra "Revive la jornada" (resumen, fotos, grabación) hasta que se publique la siguiente edición; entonces la anterior baja al archivo.
- "Inscribirse" lleva al formulario de inscripción o al enlace externo que use el Centro ese año.

## Extensión / Seminarios

Seminarios y Webinars

**QUÉ ES**

23 actividades en varios ciclos. Antes: una lista larga paginada donde lo pasado y lo futuro estaban mezclados.

**DECISIONES Y POR QUÉ**

- Filtro Próximos / Realizados: primero, a qué puedo ir.
- Filtro por ciclo ("Debates de Gobierno Corporativo", "Asuntos de la Alta Dirección"…): los títulos se repetían por ciclo y así se distinguen.
- Grilla de 6 tarjetas + paginación abajo.

**CÓMO FUNCIONA (no se ve en Figma)**

- Los dos filtros se combinan y actúan al instante.
- Los realizados conservan su ficha con resumen y, si existe, el enlace a la grabación.

## Productos Académicos

Productos Académicos

**QUÉ ES**

Dos productos que el Centro vende: documentos para directores (60 UF) e investigación por encargo (20 UF). Antes: dos tarjetas en una grilla, con el precio enterrado en un párrafo y sin ningún botón para comprar o cotizar.

**DECISIONES Y POR QUÉ**

- Paneles anchos de lado a lado, no tarjetas: son dos productos, no veinte; una grilla dejaba media página vacía.
- Uno blanco (para personas) y uno azul (para empresas), alternados: el cambio de fondo separa los públicos sin explicarlo.
- El precio grande y visible, y un botón claro en cada panel: "Solicitar acceso" / "Solicitar propuesta".
- Los casos reales (Mazars, Bolsa de Santiago, Acafi) van en el panel de investigación por encargo: para una empresa pesa más ver quién ya lo hizo.
- ⚠ Pendiente: hoy los dos paneles llevan botón amarillo. Si se ven juntos en pantalla, el segundo debería pasar a blanco para respetar la regla de un amarillo por vista.

**CÓMO FUNCIONA (no se ve en Figma)**

- "Solicitar acceso" y "Solicitar propuesta" llevan al formulario de contacto con el asunto y el producto prellenados.
- Los 4 documentos del primer panel son una lista editable desde WordPress: agregar uno no requiere diseñador.

## IyO / Landing

Informes y Opinión — página de entrada

**QUÉ ES**

La página a la que se llega desde "Informes y Opinión". Antes ese clic no llevaba a nada y sus 4 subpáginas tenían 4 tarjetas distintas.

**DECISIONES Y POR QUÉ**

- Cuatro accesos (Informes · Guías · Diálogo · Opinión) y debajo las últimas columnas de opinión, que es lo que más se publica.
- Corta a propósito: orienta y deriva.

**CÓMO FUNCIONA (no se ve en Figma)**

- Las últimas columnas se actualizan solas al publicar una nueva.

## IyO / Informes

Informes

**QUÉ ES**

Informes descargables (11). Antes cada tipo de PDF tenía su propia tarjeta aunque fueran lo mismo.

**DECISIONES Y POR QUÉ**

- Misma tarjeta Card/Documento que Guías, Diálogo y Documentos de Trabajo: los PDF se ven como PDF en todo el sitio.
- Portada del PDF en la tarjeta: se reconoce como documento antes de leer y se distingue uno de otro.
- Tipo · año · título · institución y "Descargar PDF" siempre en el mismo lugar.
- Buscador y filtro por año.

**CÓMO FUNCIONA (no se ve en Figma)**

- El buscador busca mientras se escribe; los filtros se combinan y actúan al instante.
- "Descargar PDF" abre el archivo en pestaña nueva, sin formulario.

## IyO / Guías

Guías de buenas prácticas

**QUÉ ES**

Guías descargables (2). Mismo formato que Informes.

**DECISIONES Y POR QUÉ**

- Misma tarjeta y misma página que Informes: aunque hoy haya 2, la sección está lista para crecer sin rediseñar.

**CÓMO FUNCIONA (no se ve en Figma)**

- Igual que Informes.

## IyO / Diálogo

Diálogo

**QUÉ ES**

Publicaciones de la serie Diálogo (10). Mismo formato que Informes.

**DECISIONES Y POR QUÉ**

- Misma tarjeta y misma página que Informes.

**CÓMO FUNCIONA (no se ve en Figma)**

- Igual que Informes.

## IyO / Opinión

Opinión

**QUÉ ES**

Casi 100 columnas de opinión de pocos autores recurrentes. Antes: lista larga sin forma de encontrar.

**DECISIONES Y POR QUÉ**

- Tarjeta Card/Opinión con la foto del autor: las columnas se ven como columnas, no como PDF.
- Filtro por autor: con pocos autores y muchas columnas, es lo que más ayuda a encontrar.
- También filtro por año y buscador.

**CÓMO FUNCIONA (no se ve en Figma)**

- Los filtros se combinan y actúan al instante.
- Clic en la tarjeta abre la columna completa dentro del sitio (ficha de artículo); si la columna se publicó en un medio externo, la ficha enlaza al medio.

## Componentes

Componentes base del sitio

**QUÉ ES Y DÓNDE SE USA**

Los seis tipos de tarjeta que se repiten en todo el sitio. Cada tipo de contenido usa siempre la misma tarjeta; cambiar el componente cambia todas sus copias.

## Card/Programa

Card/Programa

**QUÉ ES Y DÓNDE SE USA**

Tarjeta de programa. Se usa en el listado de Programas y en la sección Programas de la portada.

**DECISIONES Y POR QUÉ**

- Foto de altura fija con degradado de transparente a azul oscuro UC y título en blanco encima: se lee sobre cualquier foto. Antes el título iba amarillo sobre foto (contraste 1.57, ilegible).
- Badge blanco con el tipo (Diplomado / Curso / Workshop / In Company).
- Fila de datos con íconos oficiales: fecha de inicio · modalidad. Sirve para comparar sin entrar.
- Espacio del título reservado para dos líneas: las tarjetas vecinas quedan parejas.

**CÓMO FUNCIONA (no se ve en Figma)**

- Toda la tarjeta es clic; al pasar el mouse sube apenas con sombra suave.
- Título de más de dos líneas se corta con "…".
- La etiqueta de estado (Matrículas abiertas / Próximamente / Cerrado) se calcula con las fechas.
- Si un programa no tiene fecha (In Company), la fila muestra "A convenir".

## Card/Noticia

Card/Noticia

**QUÉ ES Y DÓNDE SE USA**

Tarjeta de artículo. Se usa en Noticias, Newsletters, Jornadas pasadas, Seminarios y Webinars, y Seminarios de Investigación: todo lo que es "una nota con fecha".

**DECISIONES Y POR QUÉ**

- Imagen de altura fija y área de título de altura fija: cuatro tarjetas en fila quedan perfectamente parejas aunque cambien fotos y largos.
- Fecha y categoría arriba, en gris y 14 pt: son contexto, no lo importante.
- Botón abajo, siempre en la misma posición, con texto explícito ("Leer noticia", "Ver seminario").

**CÓMO FUNCIONA (no se ve en Figma)**

- Toda la tarjeta es clic; el botón cambia de tono al pasar el mouse.
- Título de más de dos líneas se corta con "…"; la bajada, en tres.
- Si el artículo no tiene imagen, se muestra una imagen genérica del Centro (nunca un hueco).

## Card/Acceso

Card/Acceso

**QUÉ ES Y DÓNDE SE USA**

Tarjeta de acceso a una subsección. Se usa en las páginas de entrada de Investigación, Extensión e Informes y Opinión.

**DECISIONES Y POR QUÉ**

- Ícono oficial del Kit (Material) + título + una línea de bajada que dice qué hay adentro: la persona decide sin adivinar.
- Borde y fondo claros, sin foto: es un acceso, no contenido; no debe competir con las tarjetas de contenido de más abajo.

**CÓMO FUNCIONA (no se ve en Figma)**

- Toda la tarjeta es clic; al pasar el mouse el borde pasa a celeste y la flecha se desplaza a la derecha.

## Card/Persona

Card/Persona

**QUÉ ES Y DÓNDE SE USA**

Tarjeta de persona. Se usa en Directorio, Equipo Ejecutivo y para el jefe de programa dentro de cada ficha.

**DECISIONES Y POR QUÉ**

- Foto con el mismo encuadre y proporción para todos: antes cada foto tenía un fondo distinto (blanco, madera, gris, una con logo).
- Nombre en negro y cargo en gris: jerarquía clara.
- El rectángulo gris es el espacio para la foto nueva; ver nota 📷 en la columna Nosotros.

**CÓMO FUNCIONA (no se ve en Figma)**

- Si no hay foto todavía, se muestran las iniciales de la persona sobre fondo azul, nunca un hueco.
- Si la persona tiene reseña, la tarjeta es clic y abre una ventana con la biografía; si no, no es clic (no hay hover).

## Card/Documento

Card/Documento

**QUÉ ES Y DÓNDE SE USA**

Tarjeta de PDF descargable. Se usa en Documentos de Trabajo, Informes, Guías y Diálogo. Tiene dos variantes: con portada y sin portada.

**DECISIONES Y POR QUÉ**

- La cita va separada en campos (tipo · año · título · autores · dónde se publicó) en vez de un párrafo en letra chica: cada dato se encuentra al tiro. Cuando el Centro defina su formato de cita oficial, solo se reordenan los campos.
- "Descargar PDF" siempre abajo y en el mismo lugar: la fila se lee como unidad.
- Portada opcional: en Informes/Guías/Diálogo ayuda a distinguir un documento de otro; en Documentos de Trabajo (papers sin portada) se usa la variante sin portada.

**CÓMO FUNCIONA (no se ve en Figma)**

- "Descargar PDF" abre el archivo en pestaña nueva, sin formulario.
- Título de más de tres líneas se corta con "…".
- Toda la tarjeta es clic hacia el PDF; el botón cambia de tono al pasar el mouse.

## Card/Opinión

Card/Opinión

**QUÉ ES Y DÓNDE SE USA**

Tarjeta de columna de opinión. Se usa en el listado de Opinión y en las últimas columnas de la portada y de la página de entrada de Informes y Opinión.

**DECISIONES Y POR QUÉ**

- Foto redonda del autor + nombre + fecha + título + medio donde se publicó: las columnas se ven como columnas (una persona opinando), no como documentos.
- Compacta: con casi 100 columnas, importa que quepan varias por pantalla.

**CÓMO FUNCIONA (no se ve en Figma)**

- Toda la tarjeta es clic y abre la columna completa (ficha de artículo). Si se publicó en un medio externo, la ficha enlaza al medio.
- Clic en el nombre del autor filtra el listado por ese autor.

---

## Choques con el Kit UC

Revisión del 27-09-2026 contra `kit-uc/` y `uc-kitdigital.css` v1.23.15-beta.1.

| Tema | Figma | Kit / reglas | Estado |
|---|---|---|---|
| Grilla | Contenido de 1216 px con márgenes de 112 a 1440 | `.container` xl = 1248 px (1218 útiles) | ✅ Compatible |
| Top bar UC y footer | Top bar, Footer/Contacto, Franja UC y Footer/Dev marcados "normado" | `header.php`, `footer-submarca.php` | ✅ Coinciden en estructura (confirmar al construir) |
| **Header** | Dos filas: logo + CTAs (Contacto, WhatsApp) arriba, menú + ícono de búsqueda abajo | `header-submarca.php`: una fila, logo `col-lg-3` + menú `col-lg-9`, sin CTAs ni búsqueda | ⚠️ **Difiere.** Zona auditada: confirmar con Dirección Digital UC o ajustar diseño |
| **Texto sobre foto en cards** | Card/Programa: título blanco sobre degradado a azul oscuro | `CLAUDE.md`: nunca texto sobre fotos, "nunca en cards" | ⚠️ **Contradice la regla.** Decidir cuál manda |
| WhatsApp verde | Ícono en verde de marca en el header | Paleta UC | ⚠️ Excepción deliberada del diseño, dentro de zona auditada |
| Un amarillo por vista | Productos Académicos tiene dos botones amarillos | Regla UC | ⚠️ Pendiente ya anotado por diseño: el segundo pasa a blanco |
| Tipografía | Sin variables en el Figma | Roboto / Roboto Slab, clases `.h1`–`.h6` | ⏳ Verificar por componente al construir |
