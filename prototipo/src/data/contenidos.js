import { sara } from './sitio.js';

// Fotos de perfil 1:1 (800 px) en public/img/personas/. Directorio: banco editado del 29-09 (webp, fondo celeste
// parejo). Quien no tiene foto muestra el avatar con iniciales del Kit (nota de diseño: "nunca un hueco").
const FOTOS = {
  'Matías Zegers': 'matias-zegers.webp', 'Álvaro Bustos': 'alvaro-bustos.webp', 'Roberto Guerrero': 'roberto-guerrero.webp',
  'Enrique Alcalde': 'enrique-alcalde.webp', 'Marta del Sante': 'marta-del-sante.webp', 'Luis Hernán Paúl': 'luis-hernan-paul.webp',
  'Eduardo Walker': 'eduardo-walker.webp', 'Teresita María Tagle': 'teresita-maria-tagle.webp',
  // Equipo ejecutivo: Alejandra Wood (foto que trajo Mateo el 02-11, ya en el celeste del Directorio). Sara Marambio
  // sigue sin foto hasta que el Centro la entregue con el mismo encuadre (P1-10); se muestra el avatar con iniciales.
  'Alejandra Wood': 'alejandra-wood.webp',
};
export const fotoDe = (nombre = '') => {
  const k = Object.keys(FOTOS).find((n) => nombre.trim().startsWith(n));
  return k ? `/img/personas/${FOTOS[k]}` : undefined;
};
export const inicialesDe = (nombre = '') => nombre.split(' ').filter(Boolean).slice(0, 2).map((s) => s[0]).join('').toUpperCase();

// Contenidos tomados del sitio actual del Centro. Fuente de cada imagen: docs/imagenes-prototipo.md
// En WordPress cada bloque es un CPT (o posts con categoría) con estos mismos campos.
// Noticias y Newsletters viven en Extensión (P1-02, 26-10); el Home muestra las últimas.

// Enlaces (Clara, 18-11): LinkedIn y Diario Financiero; la noticia del Diplomado, del sitio actual (Clara: «esto es con
// Sara»). El estudio lleva el título del artículo del DF. Los enlaces externos abren en una pestaña nueva.
const SITIO_ACTUAL = 'https://centrogobiernocorporativo.uc.cl';
export const noticias = [
  { fecha: '17 - Jul - 2026', titulo: 'Forbes Chile participó del debate coorganizado por el CGC UC y BH Compliance', imagen: '/img/noticias/forbes-debate-bh-compliance.jpg', href: 'https://www.linkedin.com/feed/update/urn:li:activity:7484960416608088064' },
  { fecha: '11 - Jun - 2026', titulo: 'Jornada Gobierno Corporativo 2026', imagen: '/img/noticias/jornada-gobierno-corporativo-2026.jpg', href: 'https://www.df.cl/mercados/bolsa-monedas/andres-trivelli-y-el-peso-de-los-controladores-de-empresas-no-es-algo' },
  { fecha: '12 - May - 2026', titulo: 'Bienvenidos al Diplomado en Gobierno Corporativo 2026', imagen: '/img/noticias/bienvenida-diplomado-2026.jpg', href: `${SITIO_ACTUAL}/noticias/773-bienvenidos-al-diplomado-en-gobierno-corporativo-2026` },
  { fecha: '08 - May - 2026', titulo: 'Zoom a las juntas de accionistas 2026 de las empresas IPSA: representación femenina llega a 56 cargos', imagen: '/img/noticias/estudio-representacion-femenina-ipsa.jpg', href: 'https://www.df.cl/mercados/banca-fintech/zoom-a-las-juntas-de-accionistas-2026-de-las-empresas-ipsa-representacion' },
];

// Newsletter «Alta Dirección CGC UC» en LinkedIn (Clara, 18-11: «subir todas las que falten»). Las ocho nuevas, con su
// enlace y su portada; las tres que ya estaban no salen en la página pública del newsletter y enlazan a ella.
// Fechas de «capacidades», «protegido» y «clima»: aproximadas a la portada (LinkedIn limitó la consulta).
export const NEWSLETTER_URL = 'https://www.linkedin.com/newsletters/alta-direcci%C3%B3n-cgc-uc-7322637919670685698/';
const PULSE = 'https://es.linkedin.com/pulse/';
export const newsletters = [
  { fecha: '13 - Nov - 2026', titulo: 'Por un romance perdí a mi CEO (volumen 2)', imagen: '/img/newsletters/2026-11-romance-ceo.jpg', href: `${PULSE}por-un-romance-perd%C3%AD-mi-ceo-volumen-6yhzf` },
  { fecha: '30 - Oct - 2026', titulo: '¿Cuánto talento están perdiendo las empresas por mirar la edad?', imagen: '/img/newsletters/2026-10-talento-edad.jpg', href: `${PULSE}cu%C3%A1nto-talento-est%C3%A1n-perdiendo-las-empresas-fyavf` },
  { fecha: '16 - Oct - 2026', titulo: 'Separar el poder no siempre significa equilibrarlo', imagen: '/img/newsletters/2026-10-separar-el-poder.jpg', href: `${PULSE}separar-el-poder-siempre-significa-equilibrarlo-8b5df` },
  { fecha: '29 - Sep - 2026', titulo: 'Finanzas sostenibles: ¿crear valor o pagar por convicciones?', imagen: '/img/newsletters/2026-09-finanzas-sostenibles.jpg', href: `${PULSE}finanzas-sostenibles-crear-valor-o-pagar-cktnf` },
  { fecha: '16 - Sep - 2026', titulo: 'El mayor riesgo de la IA para un directorio puede ser no hacer nada', imagen: '/img/newsletters/2026-09-riesgo-ia.jpg', href: `${PULSE}el-mayor-riesgo-de-la-ia-para-un-directorio-jv8kf` },
  { fecha: '01 - Sep - 2026', titulo: '¿Qué capacidades necesita hoy un directorio?', imagen: '/img/newsletters/2026-09-capacidades-directorio.jpg', href: `${PULSE}qu%C3%A9-capacidades-necesita-hoy-un-directorio-z6qmf` },
  { fecha: '19 - Ago - 2026', titulo: '¿Qué tan protegido está realmente un director?', imagen: '/img/newsletters/2026-08-director-protegido.jpg', href: `${PULSE}qu%C3%A9-tan-protegido-est%C3%A1-realmente-un-amnqf` },
  { fecha: '04 - Ago - 2026', titulo: 'El clima ya entró al directorio. Aunque nadie lo tenga en la agenda', imagen: '/img/newsletters/2026-08-clima-directorio.jpg', href: `${PULSE}el-clima-ya-entr%C3%B3-al-directorio-aunque-rr4zf` },
  { fecha: '02 - Jul - 2026', titulo: 'El presidente del directorio también necesita ser supervisado', imagen: '/img/newsletters/2026-07.jpg', href: NEWSLETTER_URL },
  { fecha: '28 - May - 2026', titulo: 'Ser director de una fundación ya no es un rol simbólico', imagen: '/img/newsletters/2026-05-fundaciones.jpg', href: NEWSLETTER_URL },
  { fecha: '30 - Abr - 2026', titulo: 'La IA y nuevas exigencias de productividad', imagen: '/img/newsletters/2026-04-ia-productividad.jpg', href: NEWSLETTER_URL },
];

// Columnas (Clara, 18-11): tres llegaron como imagen del recorte (se abren en una pestaña nueva) y tres ya están en el
// sitio actual. Resuelve P1-18: la columna enlaza a su fuente; no se publica completa en el sitio.
export const prensa = [
  { fecha: '28 - Abr - 2026', titulo: 'Las AFP ejerciendo su poder: qué observar', autor: 'Alejandra Wood Huidobro', autorFiltro: 'Alejandra Wood', cargo: 'Directora Ejecutiva CGC UC', medio: 'Diario Financiero', href: '/img/columnas/las-afp-ejerciendo-su-poder.jpg' },
  { fecha: '24 - Abr - 2026', titulo: 'Gestión de tecnologIA: la prueba del directorio', autor: 'Luis Hernán Paúl', autorFiltro: 'Luis Hernán Paúl', cargo: 'Director CGC UC', medio: 'El Mercurio', href: '/img/columnas/gestion-de-tecnologia.jpg' },
  { fecha: '10 - Abr - 2026', titulo: 'Fallo de la Suprema: nuevo estándar para interlocking', autor: 'Roberto Guerrero', autorFiltro: 'Roberto Guerrero', cargo: 'Director CGC UC', medio: 'La Tercera', href: '/img/columnas/fallo-de-la-suprema-interlocking.jpg' },
  { fecha: '27 - Mar - 2026', titulo: 'Disclosure no es gobernanza', autor: 'Alejandra Wood Huidobro', autorFiltro: 'Alejandra Wood', cargo: 'Directora Ejecutiva CGC UC', medio: 'Diario Financiero', href: `${SITIO_ACTUAL}/informes-y-opinion/opinion/729-disclosure-no-es-gobernanza` },
  { fecha: '12 - Mar - 2026', titulo: 'Lo bueno, lo malo y lo feo de las juntas de accionistas 2026', autor: 'Matías Zegers', autorFiltro: 'Matías Zegers', cargo: 'Presidente CGC UC', medio: 'El Mercurio', href: `${SITIO_ACTUAL}/noticias/765-lo-bueno-lo-malo-y-lo-feo-de-las-juntas-de-accionistas-2026` },
  { fecha: '26 - Feb - 2026', titulo: 'Directores ante el nuevo gobierno: desafíos y oportunidades', autor: 'Luis Hernán Paúl', autorFiltro: 'Luis Hernán Paúl', cargo: 'Director CGC UC', medio: 'El Líbero', href: `${SITIO_ACTUAL}/noticias/747-directores-ante-el-nuevo-gobierno-desafios-y-oportunidades` },
];

// Resúmenes de actividades (antes «Diálogo», en Informes y Opinión del sitio actual): van en Prensa (26-10).
// El PDF se descarga del sitio actual hasta que el Centro lo suba al panel de WordPress.
const PDF_DIALOGO = 'https://centrogobiernocorporativo.uc.cl/informes-y-opinion/dialogo/';
export const resumenes = [
  { anio: '2024', titulo: 'Seminario «Inteligencia artificial y directorios: ¿estamos preparados?» (CGC UC y Forvis Mazars)', pdf: '113-seminario-cgc-uc-forvis-mazars-nov24' },
  { anio: '2024', titulo: 'Desayuno de directores: «Estrategia y ASG, claves del futuro empresarial»', pdf: '109-seminario-estrategia-y-asg-claves-del-futuro-empresarial' },
  { anio: '2023', titulo: 'II Ciclo de Encuentros de Directores CGC UC y Deloitte: riesgos emergentes', pdf: '105-ii-ciclo-de-encuentros-de-directores-2023' },
  { anio: '2023', titulo: 'Encuentro de presidentes y directores ejecutivos de ONG: buen gobierno de fundaciones y corporaciones (CGC UC y Deloitte)', pdf: '99-encuentro-fundaciones-y-corporaciones' },
  { anio: '2023', titulo: 'Desayuno de directores: primeros resultados de la NCG 461, lo que queda pendiente para los directorios', pdf: '97-primeros-resultados-de-la-ncg-461-lo-que-queda-pendiente-en-los-directorios' },
  { anio: '2023', titulo: 'Webinar «Directorios y nueva normativa de delitos económicos y medioambientales»', pdf: '95-webinar-delitos-economicos' },
  { anio: '2023', titulo: 'Ciclo de Encuentros de Directores CGC UC y Deloitte: ciberseguridad, los principales focos de atención del directorio', pdf: '91-encuentro-ciberseguridad-deloitte-formato-cgc-uc-v02' },
  { anio: '2023', titulo: 'Desayuno de directores: agenda 2023', pdf: '89-informes-cgc-desayuno-abril-2023' },
  { anio: undefined, titulo: 'Conversando sobre inversiones de impacto', pdf: '83-conversando-sobre-inversiones-de-impacto' },
  { anio: '2021', titulo: 'Informe Transformación del Directorio 2021 producto del Covid-19: cambios, amenazas y oportunidades', pdf: '73-informe-transformacio-n-del-directorio-2021-producto-del-covid-19-cambios-amenazas-y-oportunidades' },
].map((r) => ({ ...r, tipo: 'Resumen', href: `${PDF_DIALOGO}${r.pdf}/file` }));

// ---------- Eventos ----------
// Un solo pool (minuta 07-09 §5). En WordPress: CPT "evento" con fecha ISO y tipo. Próximos y realizados se separan
// solos según la fecha de hoy. Sin fecha exacta: «fechaTexto» (y «mes» si se sabe, para ordenarlo); no entra al calendario.
// «Diálogo» deja de ser tipo de evento: sus resúmenes pasan a Prensa (26-10).
// Filtro de Eventos (Sara, 03-11): solo estos cuatro tipos. Un evento de otro tipo (la mesa de directores, el seminario
// de enero) sale en «Todos».
export const tiposEvento = ['Webinar', 'Debate', 'Desayuno', 'Jornada'];
export const etiquetaTipoEvento = (t) => ({ Jornada: 'Jornadas de Gobierno Corporativo' })[t] ?? `${t}s`;

// Eventos 2026: lista de Clara Lussich (Full Funnel), 09-11 — fecha, nombre, auspiciador («con» = auspiciador) y
// panelistas. Campos: «serie» es el ciclo (va arriba del título en la página del evento y en el meta de la home);
// «titulo», el tema; «socio», el auspiciador («Junto a»); «expositores», [nombre] o [nombre, rol].
// Fotos (regla del 26-10): solo reales y del mismo evento. Las del banco de Full Funnel (28-10) cubren el debate del
// 22-04 (DEBATE 1), el del 08-07 (DEBATE 2, con la clave del Wi-Fi difuminada) y la Jornada 2025 (JORNADA). Sin foto real,
// la card y la portada llevan el bloque de fecha. Cuando Full Funnel mande las fotos de 2026, van en «foto».
const DEBATES = 'Debates de Gobierno Corporativo';
const WEBINARS = 'Webinars Asuntos de la Alta Dirección';
const DESAYUNOS = 'Desayunos de directores';
// Galería de un evento: /img/eventos/<carpeta>/01.jpg … NN.jpg (fotos reales del banco de Full Funnel, 1400 px).
const fotosDe = (carpeta, n, alt) => Array.from({ length: n }, (_, i) => ({ src: `/img/eventos/${carpeta}/${String(i + 1).padStart(2, '0')}.jpg`, alt: `${alt}, foto ${i + 1} de ${n}` }));
const eventosBase = [
  // Próximo. Clara: 2 de diciembre, «panelistas por definir». Era el «debate con BH Compliance de la primera semana
  // de diciembre» del calendario del Centro (P1-08, 26-10): Clara no tiene ese debate en el año.
  // Clara, 18-11: es por invitación («Cupos no porque no es abierto»); la infografía no llegó.
  { fecha: '2026-12-02', tipo: 'Desayuno', serie: DESAYUNOS, titulo: 'Proyecciones 2027', slug: 'desayuno-proyecciones-2027', hora: 'Por confirmar', lugar: 'Por confirmar', socio: 'Forvis Mazars', porInvitacion: true, nota: 'Evento por invitación. Horario, lugar y panelistas por confirmar.' },
  // Realizados 2026. Lo que mandó Clara el 18-11: webinars con enlace de YouTube y la gráfica de invitación (de la gráfica
  // salen título, expositores con cargo, horario y el texto del resumen); resúmenes de LinkedIn, del sitio actual y de
  // dos Word; fotos del banco de Full Funnel (28-10 y, DEBATE 3, MESA y JORNADA 2026, 18-11).
  // 03-11: la gráfica y YouTube dicen 3 de noviembre (la lista de Clara del 09-11 decía 4). Título de la gráfica y de YouTube.
  // Clara confirmó las fechas, títulos y nombres el 18-11 («ok todos»; YouTube sube los videos un día después).
  { fecha: '2026-11-03', tipo: 'Webinar', serie: WEBINARS, titulo: 'Envejecimiento poblacional: ¿están las empresas preparadas para el cambio?', hora: '08:30 – 09:15', lugar: 'Online', socio: 'AFP Cuprum', youtube: 'V9Jphtdhud0',
    expositores: [['Santiago Valdés', 'CEO de Empresas Carozzi'], ['Claudia Martínez', 'Directora del Instituto de Economía UC'], ['Alejandra Wood', 'Moderadora · Directora ejecutiva del CGC UC']],
    descripcion: 'Webinar del ciclo «Asuntos de la Alta Dirección», del Centro de Gobierno Corporativo UC junto a AFP Cuprum, sobre cómo el envejecimiento de la población desafía a las empresas. Conversaron Santiago Valdés, CEO de Empresas Carozzi, y Claudia Martínez, directora del Instituto de Economía UC, con la moderación de Alejandra Wood, directora ejecutiva del CGC UC.' },
  { fecha: '2026-09-23', tipo: 'Webinar', serie: WEBINARS, titulo: 'Finanzas sostenibles: nuevas decisiones, nuevos riesgos', hora: '08:30 – 09:15', lugar: 'Online', socio: 'AFP Cuprum', youtube: 'mlr3aRrbE6M',
    expositores: [['Eduardo Walker', 'Director del CGC UC'], ['Javier Moraga', 'Jefe de Selección de Fondos de AFP Cuprum'], ['Marta del Sante', 'Moderadora · Directora del CGC UC']],
    descripcion: 'Una conversación sobre cómo la sostenibilidad está cambiando la forma de evaluar inversiones, financiamiento y creación de valor. Webinar del ciclo «Asuntos de la Alta Dirección», del CGC UC junto a AFP Cuprum, con Eduardo Walker, director del CGC UC, y Javier Moraga, jefe de Selección de Fondos de AFP Cuprum, moderado por Marta del Sante, directora del CGC UC.' },
  // 09-09: resumen de Clara (segunda respuesta, 18-11). Fotos: carpeta DEBATE 3 del SharePoint (bajada el 18-11).
  { fecha: '2026-09-09', tipo: 'Debate', serie: DEBATES, titulo: 'IA en el directorio', socio: 'BH Compliance',
    foto: { src: '/img/eventos/ia-en-el-directorio-2026/01.jpg', alt: 'Panel del debate «IA en el directorio», con BH Compliance' },
    fotos: fotosDe('ia-en-el-directorio-2026', 6, 'Debate «IA en el directorio», con BH Compliance'), expositores: ['Hernán Orellana', 'Carmen Román', ['Alejandra Wood', 'Moderadora · Directora ejecutiva del CGC UC']],
    descripcion: 'El pasado 9 de septiembre, el Centro de Gobierno Corporativo UC, junto a BH Compliance, realizó una nueva edición del ciclo Debates de Gobierno Corporativo, centrada en los desafíos que plantea la inteligencia artificial para los directorios y la Alta Dirección. El encuentro, moderado por Alejandra Wood, directora ejecutiva del CGC UC, reunió a expertos para analizar cómo la IA está transformando la toma de decisiones, la gestión de riesgos y los modelos de gobernanza empresarial. Durante la conversación se destacó la necesidad de que los directores comprendan las oportunidades y amenazas de esta tecnología, fortalezcan sus capacidades y asuman un rol activo en su supervisión estratégica. Una de las principales conclusiones fue que la inacción frente a la IA se ha convertido en uno de los mayores riesgos para las organizaciones, en un escenario que exige avanzar hacia modelos de gestión capaces de integrar el talento humano y las nuevas tecnologías.' },
  // 20-08: resumen y fotos del post de LinkedIn del Centro (25-08). Clara: las fotos de los desayunos con Forvis Mazars solo
  // están en LinkedIn (los enlaces originales vencieron). Salen del carrusel del post, sin la franja blanca con el logo.
  { fecha: '2026-08-20', tipo: 'Desayuno', serie: DESAYUNOS, titulo: 'Innovación en el directorio', socio: 'Forvis Mazars',
    foto: { src: '/img/eventos/innovacion-en-el-directorio-2026/01.jpg', alt: 'Panel del desayuno «Innovación en el directorio», con Forvis Mazars' },
    fotos: fotosDe('innovacion-en-el-directorio-2026', 6, 'Desayuno «Innovación en el directorio», con Forvis Mazars'),
    expositores: [['Carolina Rossi', 'Palabras de apertura · Subsecretaria de Ciencia, Tecnología, Conocimiento e Innovación'], ['María (Cuky) Pérez', 'Experta en ciencia de datos'], ['María de los Ángeles Romo', 'Experta en innovación y venture capital'], ['Luis Hernán Paúl', 'Moderador · Director del CGC UC']],
    descripcion: [
      'En un nuevo desayuno organizado por el Centro de Gobierno Corporativo UC y Forvis Mazars se conversó sobre el rol que pueden asumir los directorios para impulsar la innovación desde la estrategia, incorporar nuevas tecnologías en la toma de decisiones y enfrentar la tensión entre oportunidad y riesgo.',
      'La jornada comenzó con palabras de Carolina Rossi, subsecretaria de Ciencia, Tecnología, Conocimiento e Innovación, y siguió con un panel junto a María (Cuky) Pérez, PhD, experta en ciencia de datos, y María de los Ángeles Romo, experta en innovación y venture capital, moderado por Luis Hernán Paúl, director del CGC UC.',
      'Una conversación que dejó una idea central: innovar no es solo una tarea de las áreas técnicas o de la administración. También exige directorios capaces de hacer nuevas preguntas, mirar a largo plazo y generar las condiciones para que la innovación ocurra.',
    ] },
  // 05-08: resumen = el artículo en Word que mandó Clara. Nombres corregidos: Anita Holuigue (el Word dice «Holigue»);
  // Luis Hernán Paúl como director del CGC UC (el Word lo llama presidente; el presidente es Matías Zegers). Fotos: carpeta MESA (18-11).
  { fecha: '2026-08-05', tipo: 'Mesa de directores', titulo: 'Mesa de directores de empresas públicas',
    foto: { src: '/img/eventos/mesa-de-directores-de-empresas-publicas-2026/01.jpg', alt: 'Primer encuentro de la Mesa de directores de empresas públicas' },
    fotos: fotosDe('mesa-de-directores-de-empresas-publicas-2026', 6, 'Mesa de directores de empresas públicas'),
    expositores: ['Anita Holuigue', 'Jéssica López Saffie', ['Luis Hernán Paúl', 'Moderador · Director del CGC UC']],
    descripcion: [
      '## Empresas públicas: gobernar para el largo plazo y fortalecer la confianza',
      'El primer encuentro de la Mesa de Directores de Empresas Públicas puso en el centro la continuidad institucional, la profesionalización de los directorios y el equilibrio entre propósito público y desempeño.',
      'Las empresas públicas no son únicamente actores económicos. También forman parte de la infraestructura de desarrollo del país y constituyen uno de los espacios en que la ciudadanía evalúa la capacidad del Estado para administrar recursos, entregar servicios y generar valor.',
      'Cuando una empresa pública funciona adecuadamente, fortalece la confianza en las instituciones. Cuando falla, las consecuencias no se limitan a los resultados financieros: también afectan la legitimidad de lo público.',
      'Este fue el motivo detrás de la creación de la Mesa de Directores de Empresas Públicas, impulsada por el Centro de Gobierno Corporativo UC, que busca conformar una comunidad de aprendizaje e intercambio entre quienes participan en la dirección de empresas públicas chilenas.',
      '## El desafío de equilibrar propósito y desempeño',
      'Las empresas públicas deben responder a exigencias que no siempre enfrentan las compañías privadas. Se espera que operen con altos estándares de eficiencia y sostenibilidad, pero también que contribuyan al cumplimiento de objetivos de política pública, aseguren servicios estratégicos y mantengan presencia en áreas o territorios donde la lógica exclusivamente comercial puede resultar insuficiente.',
      'Esta combinación exige directorios capaces de resguardar la coherencia entre el propósito público de la organización y su desempeño financiero. No se trata de optar entre ambos, sino de construir una estrategia que permita sostenerlos en el tiempo, protegiendo un patrimonio que pertenece a todos los ciudadanos.',
      'Durante el primer encuentro se planteó, además, que la existencia de una empresa estatal no debiera justificarse solamente por la necesidad de corregir una falla de mercado. Estas organizaciones requieren un propósito claro y ambicioso, una visión estratégica propia y la capacidad de generar valor y orgullo en la ciudadanía.',
      '## Proyectos de largo plazo frente a ciclos políticos breves',
      'Uno de los principales temas de la conversación fue la tensión entre los horizontes de las empresas públicas y los ciclos políticos.',
      'Muchas de estas organizaciones desarrollan proyectos que pueden extenderse durante décadas. Sin embargo, cada cambio de gobierno puede traer consigo una renovación significativa de directorios y equipos ejecutivos. En empresas de alta complejidad técnica, esta rotación puede debilitar la continuidad estratégica, afectar el aprendizaje institucional y dificultar el seguimiento de inversiones de largo plazo.',
      'El desafío, por lo tanto, es avanzar hacia mecanismos que permitan compatibilizar la legítima orientación del propietario estatal con mayores niveles de continuidad, profesionalismo e independencia en la conducción de las empresas. Esto supone fortalecer los procesos de selección de directores, valorar la experiencia técnica y asegurar que la conformación de los gobiernos corporativos trascienda la afinidad con la administración política de turno.',
      '## Diversidad y profesionalización de los directorios',
      'La diversidad también ocupó un lugar relevante en el diálogo. No solo entendida en términos demográficos, sino como la capacidad de reunir experiencias, disciplinas y formas de pensamiento distintas.',
      'Durante el panel también se abordaron realidades sectoriales específicas. Entre ellas, la necesidad de revisar estructuras capaces de responder a la complejidad de organizaciones como Codelco, así como el valor público de servicios que no siempre pueden financiarse exclusivamente mediante criterios privados, como la programación infantil de TVN o la presencia territorial de CorreosChile.',
      'Estos ejemplos muestran que no existe una única fórmula de gobernanza para todas las empresas públicas. Cada organización requiere una estructura coherente con su propósito, su escala, sus riesgos y el servicio que entrega al país.',
      '## Una comunidad para compartir experiencias',
      'El encuentro contó con la participación de Anita Holuigue y Jéssica López, quienes aportaron su experiencia en la dirección de organizaciones públicas y privadas, en una conversación moderada por Luis Hernán Paúl, director del Centro de Gobierno Corporativo UC.',
      'Sus reflexiones permitieron abordar con franqueza algunas de las principales tensiones que enfrentan quienes integran estos directorios y relevar la importancia de contar con espacios de intercambio entre pares.',
      'Ese es, precisamente, el propósito de esta Mesa: generar una comunidad que permita compartir experiencias, identificar desafíos comunes y elevar la discusión sobre la gobernanza de las empresas públicas chilenas.',
    ] },
  // 15-07: gráfica: «Nicolás» Le Blanc (la lista de Clara decía Nicholas). Co-organiza el Centro UC Riesgos y Seguros.
  { fecha: '2026-07-15', tipo: 'Webinar', serie: WEBINARS, titulo: 'Responsabilidad de directores: ¿es asegurable?', hora: '08:30 – 09:15', lugar: 'Online', socio: 'AFP Cuprum', youtube: 'qcqmRnPqsEA',
    expositores: [['Jorge Gutiérrez Cuadra', 'Gerente de Responsabilidad Civil Profesional y Líneas Financieras de Crawford Chile'], ['Nicolás Le Blanc', 'Socio de DAC Beachcroft Chile'], ['María Alicia Montes', 'Moderadora · Gerente de Asset Allocation de AFP Cuprum']],
    descripcion: 'Límites, alcances y tensiones regulatorias: ¿qué pueden hacer hoy los directorios frente a su exposición a riesgo? Webinar del ciclo «Asuntos de la Alta Dirección», del CGC UC y el Centro UC Riesgos y Seguros junto a AFP Cuprum, con Jorge Gutiérrez Cuadra, de Crawford Chile, y Nicolás Le Blanc, socio de DAC Beachcroft Chile, moderado por María Alicia Montes, gerente de Asset Allocation de AFP Cuprum.' },
  // 08-07: Alfredo Etchegaray y el moderador no están en la lista de Clara; salen de la nota de Forbes en el sitio actual
  // (noticia 791, 17-07) y de la lámina del panel en las fotos. Resumen armado con esa nota (Clara, 18-11: «aquí hay info
  // para hacer breve resumen»). Galería: DEBATE 2, sin fotos donde se lea la clave del Wi-Fi de la lámina.
  { fecha: '2026-07-08', tipo: 'Debate', serie: DEBATES, titulo: 'El rol del presidente del directorio', socio: 'BH Compliance',
    expositores: [['Pilar Dañobeitía', 'Presidenta de SMU'], ['Bernardo Larrain Matte', 'Presidente de CMPC'], ['Alfredo Etchegaray', 'Director de empresas'], ['Luis Hernán Paúl', 'Moderador · Director del CGC UC']],
    foto: { src: '/img/eventos/debate-presidente-del-directorio-2026.jpg', alt: 'Panel del debate sobre el rol del presidente del directorio, con BH Compliance' },
    descripcion: [
      'Debate coorganizado por el Centro de Gobierno Corporativo UC y BH Compliance en torno a la pregunta «Presidente de directorio: ¿independiente o de la familia controladora?». Conversaron Pilar Dañobeitía, presidenta de SMU; Bernardo Larraín, presidente de CMPC, y el director de empresas Alfredo Etchegaray, con la moderación de Luis Hernán Paúl, director del CGC UC.',
      'Entre los temas: la diversidad en los directorios, que vale por las perspectivas que suma a las decisiones y no por la cifra; el directorio como contrapeso activo de la administración, y la exposición creciente de los directores cuando llegan las crisis. Forbes Chile participó del debate y publicó sus claves.',
    ],
    fotos: fotosDe('debate-presidente-del-directorio-2026', 6, 'Debate sobre el rol del presidente del directorio, con BH Compliance') },
  // Jornada 2026: tema y panel del sitio actual (noticia 779 y jornada 783); auspicio de LarrainVial, en el auditorio de
  // Deloitte. Resumen y video (YouTube Short) de la página de la jornada en el sitio actual. Fotos: carpeta JORNADA 2026 (18-11).
  { fecha: '2026-06-11', tipo: 'Jornada', serie: 'Jornada de Gobierno Corporativo 2026', titulo: 'Ser director hoy: cómo decidir en un entorno más exigente', socio: 'LarrainVial', youtube: '6kIMI7-8Up4',
    foto: { src: '/img/eventos/ser-director-hoy-2026/01.jpg', alt: 'Panel de la Jornada de Gobierno Corporativo 2026, «Ser director hoy»' },
    fotos: fotosDe('ser-director-hoy-2026', 6, 'Jornada de Gobierno Corporativo 2026, «Ser director hoy»'),
    expositores: [['Catherine Tornel', 'Invitada especial · Presidenta de la Comisión para el Mercado Financiero'], 'Tamara Agnic', 'Marcela Toledo', 'Alex Van Weezel', 'Enrique Ostalé', 'Guillermo Tagle', 'Josefina Montenegro', 'Andrés Trivelli'],
    descripcion: [
      '¿Qué significa ser director hoy, en un entorno donde las decisiones empresariales están bajo estándares cada vez más exigentes? Esa fue la pregunta central que reunió a directores, ejecutivos, abogados y líderes empresariales en la Jornada de Gobierno Corporativo 2026 del Centro de Gobierno Corporativo UC.',
      'Durante la jornada se conversó sobre responsabilidad penal de la empresa y de los directores, regulación, riesgos, toma de decisiones y los nuevos desafíos que enfrentan los gobiernos corporativos en Chile.',
      'Participó como invitada especial Catherine Tornel León, presidenta de la Comisión para el Mercado Financiero, con una mirada sobre el rol de los directorios en el actual contexto regulatorio. En los paneles estuvieron Marcela Toledo, Alex Van Weezel, Tamara Agnic, Enrique Ostalé, Guillermo Tagle, Josefina Montenegro y Andrés Trivelli.',
      'La jornada contó con el auspicio de LarrainVial y el apoyo de Deloitte, que recibió el encuentro en su auditorio.',
    ] },
  { fecha: '2026-05-06', tipo: 'Webinar', serie: WEBINARS, titulo: 'Interlocking: el estándar exigido por la Corte Suprema', hora: '08:30 – 09:15', lugar: 'Online', socio: 'AFP Cuprum', youtube: 'RJEXsdFHjdY',
    expositores: [['Julio Pellegrini', 'Profesor de Derecho UC y director de empresas'], ['Miguel Pelayo', 'Director de AFP Cuprum'], ['Josefina Tocornal', 'Moderadora · Coordinadora de Investigación del CGC UC']],
    descripcion: 'Webinar del ciclo «Asuntos de la Alta Dirección», del CGC UC junto a AFP Cuprum, sobre el estándar de interlocking que fijó la Corte Suprema y lo que significa para los directorios. Conversaron Julio Pellegrini, profesor de Derecho UC y director de empresas, y Miguel Pelayo, director de AFP Cuprum, con la moderación de Josefina Tocornal, coordinadora de Investigación del CGC UC.' },
  // 22-04: el prototipo lo tenía además como «sesión de abril» del 08-04; la foto de esa entrada es este mismo panel.
  // Galería: DEBATE 1. Resumen y cargos de Clara (segunda respuesta, 18-11).
  { fecha: '2026-04-22', tipo: 'Debate', serie: DEBATES, titulo: 'El rol del director independiente', socio: 'BH Compliance',
    expositores: [['Manola Sánchez', 'Directora de Bci'], ['Rafael Guilisasti', 'Director de Viña Concha y Toro'], ['Rafael Fernández', 'Director de SAAM'], ['Luis Hernán Paúl', 'Moderador · Director del CGC UC']],
    descripcion: 'El pasado 22 de abril de 2026, el Centro de Gobierno Corporativo UC, junto a BH Compliance, inauguró el ciclo Debates de Gobierno Corporativo con un encuentro dedicado a «El rol del director independiente». La instancia contó con la participación de Manola Sánchez, directora de Bci; Rafael Guilisasti, director de Viña Concha y Toro, y Rafael Fernández, director de SAAM, bajo la moderación de Luis Hernán Paúl, director del CGC UC. Durante la conversación se abordaron las responsabilidades y desafíos que enfrentan los directores independientes, especialmente en la gestión de conflictos de interés, su relación con los accionistas controladores y su capacidad de influir en las decisiones estratégicas. Uno de los principales mensajes fue que la independencia no se limita a la ausencia de vínculos formales, sino que debe reflejarse en la capacidad de aportar criterio propio, cuestionar decisiones y contribuir constructivamente al debate. El encuentro también destacó la importancia de la cultura del directorio, la confianza y la mirada de largo plazo para fortalecer la gobernanza de las empresas.',
    foto: { src: '/img/eventos/debate-director-independiente-2026.jpg', alt: 'Panel del debate sobre el rol del director independiente, con BH Compliance, frente al público' },
    fotos: fotosDe('debate-director-independiente-2026', 6, 'Debate sobre el rol del director independiente, con BH Compliance') },
  // 16-04: resumen y fotos del post de LinkedIn del Centro (17-04); las fotos, del carrusel del post (Clara, 18-11).
  { fecha: '2026-04-16', tipo: 'Desayuno', serie: DESAYUNOS, titulo: 'Cómo leer la nueva geopolítica', socio: 'Forvis Mazars',
    foto: { src: '/img/eventos/como-leer-la-nueva-geopolitica-2026/01.jpg', alt: 'Panel del desayuno «Cómo leer la nueva geopolítica», con Forvis Mazars' },
    fotos: fotosDe('como-leer-la-nueva-geopolitica-2026', 6, 'Desayuno «Cómo leer la nueva geopolítica», con Forvis Mazars'),
    expositores: [['Jorge Sahd', 'Director del Centro de Estudios Internacionales UC'], ['Klaus Schmidt-Hebbel', 'Economista'], ['Alejandra Wood', 'Moderadora · Directora ejecutiva del CGC UC']],
    descripcion: [
      'El Centro de Gobierno Corporativo UC, junto a Forvis Mazars, realizó el desayuno «Cómo leer la nueva geopolítica», que reunió a directores de empresas para analizar cómo los cambios del escenario global están impactando la toma de decisiones en la Alta Dirección.',
      'En un contexto de mayor incertidumbre y reconfiguración del orden internacional, la conversación, moderada por Alejandra Wood, directora ejecutiva del CGC UC, contó con la participación de Jorge Sahd, director del Centro de Estudios Internacionales UC, y del economista Klaus Schmidt-Hebbel, quienes abordaron distintas miradas sobre los desafíos que enfrentan hoy las organizaciones.',
      'La instancia permitió abrir una reflexión clave: entender la geopolítica ya no es opcional para los directorios, sino parte central de su agenda estratégica.',
    ] },
  // El seminario para fundaciones del 20-01 se canceló (Clara, 18-11): sale de la lista.
  // 2025. Webinar del 03-12: Clara lo tenía como «Nueva ley de delitos económicos y gobierno corporativo» del 10-12; el
  // nombre, la fecha y los expositores correctos salen de la gráfica (y de YouTube). La gráfica dice «Directora
  // Ejecutiva» bajo Matías Zegers: es presidente del CGC UC, como dice la descripción del video.
  { fecha: '2025-12-03', tipo: 'Webinar', serie: WEBINARS, titulo: '¿Quién elige a los directores? El caso de las AFP', hora: '08:30 – 09:15', lugar: 'Online', socio: 'AFP Cuprum', youtube: 'R5NO1Yol8MM',
    expositores: [['Mario Barrera', 'Head of Local Equities de AFP Cuprum'], ['Ornella Bono', 'Managing Partner de Humanitas Cornerstone'], ['Matías Zegers', 'Moderador · Presidente del CGC UC']],
    descripcion: 'El Centro de Gobierno Corporativo UC, en alianza con AFP Cuprum, realizó la tercera edición del ciclo de webinars «Asuntos de la Alta Dirección», bajo el título «¿Quién elige a los directores? El caso de las AFP». Moderado por Matías Zegers, presidente del CGC UC, contó con la participación de Mario Barrera, de AFP Cuprum, y Ornella Bono, managing partner de Humanitas Cornerstone.' },
  // Jornada 2025: resumen = comunicado de prensa que mandó Clara (el mismo texto de la jornada 705 del sitio actual).
  // Fecha: 25 de noviembre (Clara, 18-11); su lista decía 26 y el comunicado está fechado el 12.
  { fecha: '2025-11-25', tipo: 'Jornada', serie: 'Jornada de Gobierno Corporativo 2025', titulo: 'Cambia el juego: Ley de cuotas e interlocking', socio: 'AFP Cuprum',
    expositores: [['Solange Berstein', 'Invitada especial · Presidenta de la Comisión para el Mercado Financiero'], ['Julio Pellegrini', 'Profesor de Derecho Civil y Libre Competencia UC'], ['Matías Zegers', 'Presidente del directorio del CGC UC']],
    foto: { src: '/img/eventos/jornada-2025-panel.jpg', alt: 'Panel de la Jornada de Gobierno Corporativo 2025, «Cambia el juego: Ley de cuotas e interlocking»' },
    descripcion: [
      'En la Jornada de Gobierno Corporativo UC 2025, la presidenta de la Comisión para el Mercado Financiero (CMF), Solange Berstein, llamó a fortalecer el rol estratégico de los directorios y avanzar hacia una gobernanza más diversa, informada y coherente con las demandas de la sociedad.',
      'El encuentro, organizado por el Centro de Gobierno Corporativo UC en el Centro de Convenciones Deloitte, reunió a más de un centenar de directores, ejecutivos y autoridades en torno a los efectos de la nueva regulación y el futuro de la Alta Dirección en Chile, en un año marcado por la implementación de la Ley de Cuotas, que exige al menos un 40 % de mujeres en los directorios de empresas abiertas, y por el fallo del Tribunal de Defensa de la Libre Competencia sobre interlocking.',
      '«Los directorios de hoy deben anticipar riesgos como el climático o el tecnológico, pero también fortalecer su legitimidad ante la sociedad», afirmó Berstein. Desde el ámbito jurídico, Julio Pellegrini, profesor de Derecho Civil y Libre Competencia UC, advirtió que «el fallo sobre interlocking plantea una interpretación completamente novedosa de la ley. Los directores deben mantenerse informados y actuar con prudencia ante las nuevas reglas del juego».',
      'Matías Zegers, presidente del directorio del CGC UC, subrayó que «la presión regulatoria seguirá aumentando, especialmente en temas de compliance y sostenibilidad. El desafío será combinar la búsqueda del mejor talento con las nuevas exigencias normativas y la diversidad en sentido amplio».',
    ],
    fotos: fotosDe('jornada-2025', 6, 'Jornada de Gobierno Corporativo 2025, «Cambia el juego»') },
];

const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const MESES_CORTOS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
// Formatos de fecha derivados del campo ISO (nunca se escriben a mano).
export const fechaEvento = (iso) => {
  const [a, m, d] = iso.split('-').map(Number);
  return { dia: String(d), mes: MESES_CORTOS[m - 1].toUpperCase(), larga: `${d} de ${MESES[m - 1]} de ${a}`, corta: `${d} - ${MESES_CORTOS[m - 1]} - ${a}` };
};
const slugDe = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const HOY = new Date().toISOString().slice(0, 10);
export const eventos = eventosBase.map((e) => {
  const anio = (e.fecha ?? e.mes ?? HOY).slice(0, 4);
  const slug = e.slug ?? `${slugDe(e.titulo)}${e.titulo.includes(anio) ? '' : `-${anio}`}`;
  return {
    ...e,
    id: slug,
    url: `/extension/eventos/${slug}/`,
    orden: e.fecha ?? (e.mes ? `${e.mes}-01` : '9999-12-31'),
    fechaCorta: e.fecha ? fechaEvento(e.fecha).corta : e.fechaTexto,
    fechaLarga: e.fecha ? fechaEvento(e.fecha).larga : e.fechaTexto,
  };
});
// Bloque de fecha de la card sin foto real: día con dos cifras y «mes año»; sin fecha exacta, el mes o el texto.
export const bloqueFecha = (e) => {
  if (e.fecha) { const [a, m, d] = e.fecha.split('-').map(Number); return { dia: String(d).padStart(2, '0'), mesAnio: `${MESES[m - 1]} ${a}` }; }
  if (e.mes) { const [a, m] = e.mes.split('-').map(Number); return { dia: MESES_CORTOS[m - 1].toUpperCase(), mesAnio: String(a) }; }
  return { dia: '—', mesAnio: e.fechaTexto ?? '' };
};
export const eventosProximos = eventos.filter((e) => e.orden >= HOY).sort((a, b) => a.orden.localeCompare(b.orden));
export const eventosRealizados = eventos.filter((e) => e.orden < HOY).sort((a, b) => b.orden.localeCompare(a.orden));
export const getEvento = (slug) => eventos.find((e) => e.id === slug);

// Accesos a las secciones de Investigación (Home y landing de Investigación): un solo lugar para el texto.
export const accesosInvestigacion = [
  { titulo: 'Red de Investigación', bajada: 'Profesores afiliados al Centro.', href: '/investigacion/red/' },
  { titulo: 'Artículos y Working Papers', bajada: 'Papers y artículos académicos, con su abstract.', href: '/investigacion/articulos-y-working-papers/' },
  { titulo: 'Estudios', bajada: 'Informes y estudios del CGC UC para descargar.', href: '/investigacion/estudios/' },
];

// ---------- Artículos y Working Papers (antes "Documentos de Trabajo") ----------
// Los 18 documentos del sitio actual. Título como aparece allí; autores, publicación y abstract tomados del PDF
// (P1-14, 26-10: la cita se completa a medida que lleguen documentos nuevos). PDF: sitio actual.
const PDF_DOC = 'https://centrogobiernocorporativo.uc.cl/investigacion/documentos-de-trabajo/';
export const articulos = [
  { tipo: 'Artículo', anio: '2026', titulo: 'Conflictos entre socios y parálisis orgánica en las sociedades cerradas: tipología y arquitectura de remedios', autores: 'Alcalde Rodríguez, E.', publicacion: 'Actualidad Jurídica, n.° 54, julio 2026, Universidad del Desarrollo', pdf: '143-conflictos-entre-socios-y-paralisis-organica-en-las-sociedades-cerradas-tipologia-y-arquitectura-de-remedios',
    abstract: 'El trabajo examina dos materias interrelacionadas del derecho societario: los conflictos entre socios o accionistas y los mecanismos de resolución del bloqueo en las sociedades cerradas. En su primera parte, se sintetizan los conflictos típicos entre accionistas mayoritarios y minoritarios y las principales doctrinas que el derecho comparado ha elaborado para reprimir las conductas abusivas de unos y otros, proponiéndose una distinción –fundada en el art. 30 de la Ley de Sociedades Anónimas– entre la colisión del interés individual con el interés social y la colisión entre los intereses particulares de las distintas facciones de accionistas. En su segunda parte, se aborda el «bloqueo» (corporate deadlock) como patología estructural de las sociedades cerradas, ofreciéndose un catálogo escalonado de mecanismos destinados a superarlo, así como los diversos remedios judiciales para resolver el conflicto, concluyendo con cuatro principios rectores del diseño antibloqueo.' },
  { tipo: 'Working paper', anio: '2025', titulo: 'The dynamics of CEO-COB roles: internal and external governance mechanisms influencing duality or separation', autores: 'Mejía-Amaya, A. F.; Pombo, C.; López-Iturriaga, F. J.', publicacion: 'Documento de trabajo, septiembre 2025', pdf: '131-the-dynamics-of-ceo-cob-roles-internal-and-external-governance-mechanisms-influencing-duality-or-separation',
    abstract: 'This study investigates the persistence of CEO–Chair duality in listed firms despite regulatory recommendations. Using an international sample of 4,600 firms across 37 countries over the period 2012–2021, we estimate the determinants of CEO–Chair separation. The results show that ownership concentration, independent directors, executive compensation policies, market performance, and regulatory quality positively influence separation. Sales growth exhibits an inverted U-shaped effect. Conversely, efficiency, financial performance, firm age, and firm size negatively predict separation. At the country level, common law systems, GDP per capita, and power distance are associated with a higher likelihood of duality. Finally, efficiency also shows an inverted U-shaped relationship, whereby higher levels of efficiency increase the likelihood of separation.' },
  { tipo: 'Artículo', anio: '2025', titulo: 'Executive compensation: the trend toward one-size-fits-all', autores: 'Cabezón, F.', publicacion: 'Journal of Accounting and Economics, vol. 79', pdf: '139-executive-compensation-the-trend-toward-one-size-fits-all-1',
    abstract: 'I report and analyze a recent "one-size-fits-all" trend in the structure of executive compensation plans. Since 2006, 24% of the variation in the distribution of CEO compensation across pay components — salary, bonus, stock awards, options, non-equity incentives, pensions, and perquisites — disappeared. This uniformity might come at the expense of optimal incentives, as increases in pay structure similarity translate into lower shareholder value. Using panel data regressions and plausibly exogenous shocks, I find that institutional investors\' influence, proxy advisors\' recommendations, and expanded compensation disclosure are salient drivers of this standardization. The findings highlight an unintended consequence of recent regulations enhancing shareholders\' participation and expanding compensation disclosure.' },
  { tipo: 'Artículo', anio: '2025', titulo: 'Political connections of executives and directors', autores: 'Mejía-Amaya, A. F.; Pombo, C.', publicacion: 'Quarterly Review of Economics and Finance, vol. 103', pdf: '137-political-connections-of-executives-and-directors' },
  { tipo: 'Artículo', anio: '2025', titulo: 'Supervisory arbitrage and real effects', autores: 'Beck, T.; Silva-Buston, C.; Wagner, W.', publicacion: 'Journal of Corporate Finance', pdf: '129-2025-paper-consuelo-silva-supervisory-arbitrage-and-real-effects',
    abstract: 'We examine the effects of cross-border supervisory arbitrage on corporate lending and firm performance. We show that subsidiaries of banking groups improve loan conditions for firms when the group\'s opportunities to take risks in other countries are curbed. The expansion in lending is targeted towards firms of higher quality and firms that the group is already familiar with. The improved lending conditions have positive real effects, allowing recipient firms to increase capital spending and leading to higher profits. Taken together, our results suggest that there can be benefits for firms in countries that receive lending inflows due to the supervisory arbitrage.' },
  { tipo: 'Artículo', anio: '2025', titulo: 'The effects of audit firm rotations and retentions: an event study in Chile', autores: 'Aninat, A.; Bustos, Á.; Riutort, J.', publicacion: 'European Journal of Law and Economics', pdf: '133-the-effects-of-audit-firm-rotations-and-retentions',
    abstract: 'We study markets\' reactions towards securities issued by firms that announce an external auditor\'s retention instead of an external auditor\'s rotation. We focus on differences in reactions to announcements when markets are stable versus when markets are convulsed. We carry out an event study of publicly traded Chilean companies (100% of the non-financial component of the main Chilean Stock Indexes) that announced a rotation or retention from 2004 to 2019. In the period 2009 to 2012, two major corporate scandals significantly affected Chilean financial markets. We find that, during the period without scandals, the market reacted more positively when a company announced a retention instead of a rotation of its auditor, however, during the period with scandals, the market reacted more positively when a company announced a rotation instead of a retention of its auditor.' },
  { tipo: 'Artículo', anio: '2025', titulo: '¿Avances inducidos por autorregulación en prácticas de gobierno corporativo? Efectos en Chile al término de la NCG 385', autores: 'Walker Hitschfeld, E.; Zegers Ruiz-Tagle, M.; Novoa Tonda, F. S.', publicacion: 'Revista Chilena de Derecho, vol. 52, n.° 3, pp. 1-42', pdf: '127-avances-inducidos-por-autorregulacion-en-practicas-de-gobierno-corporativo-efectos-en-chile-al-termino-de-la-ncg-385',
    abstract: 'Continuando el análisis de Godoy, Walker y Zegers del año 2018, se analiza la norma NCG 385, sucesora de la NCG 341, verificando niveles de adopción y evolución de las prácticas para 88 emisores. Se mide su impacto, clasificando las respuestas en 3 zonas según sus niveles iniciales y finales de adopción. También se realiza un análisis cualitativo de respuestas textuales seleccionadas. Las respuestas son heterogéneas con respecto a la NCG 341, con una tendencia significativa en la adopción de prácticas sustantivas sobre gestión y control de riesgos y relacionadas a ESG (Environmental, Social & Governance). Con todo, se observan ciertos niveles de repetición y estandarización, sugiriendo cumplimientos formales y cierta divergencia con respecto a la visión del regulador.' },
  { tipo: 'Working paper', anio: '2024', titulo: 'International banking and cross-border supervisory cooperation: lessons from Latin America', autores: 'Silva-Buston, C.; Ossandon Busch, M.; Wagner, W.', publicacion: 'Documento de trabajo', pdf: '135-international-banking-and-cross-border-supervisory-cooperation',
    abstract: 'This paper examines banking supervisory cooperation in Latin America and the Caribbean, revealing widespread formal agreements between countries. While these agreements generally cover key banking linkages, we identify significant disparities in cooperation coverage between countries. Some countries, despite having numerous agreements, face a limited coverage due to their banking groups\' extensive international operations. The study introduces metrics to identify home countries with a high risk exposure due to cooperation gaps with foreign banks\' home countries as well as countries most exposed to risk-shifts by domestic banks with operations abroad.' },
  { tipo: 'Working paper', anio: '2022', titulo: 'The ‘CorE’ dynamics of corporate soft-regulation: theory and evidence', autores: 'Bustos, Á.; Walker, E.', publicacion: 'Documento de trabajo, abril 2022', pdf: '81-the-core-dynamics-of-corporate-soft-regulation-theory-and-evidence',
    abstract: 'Using elements from the rational and institutional theories we formulate a simple model that describes, at the firm level, the evolution of compliance of corporate governance practices regulated by comply or explain standards. We show that, under the assumptions of our model, the level of compliance of a practice evolves as a diffusion process that converges to the practice efficacy level. Speed of convergence depends on the preregulation compliance level, efficacy level and expected loss prevented by the practice. This speed reduces monotonically with time. We find that Chilean data fits the model with high significance. We find evidence that levels of efficacy and expected losses are different when we gather practices in 1) functioning and composition of the board; 2) relations of the firm with shareholders and others or; 3) risk management and control.' },
  { tipo: 'Working paper', anio: '2021', titulo: 'Shareholder liability and bank failure', autores: 'Aldunate, F.; Jenter, D.; Korteweg, A.; Koudijs, P.', publicacion: 'Documento de trabajo, junio 2021', pdf: '59-shareholder-liability-and-bank-failure',
    abstract: 'Does enhanced shareholder liability reduce bank failure? We compare the performance of around 4,200 state-regulated banks of similar size in neighboring U.S. states with different liability regimes during the Great Depression. The distress rate of limited liability banks was 29% higher than that of banks with enhanced liability. Results are robust to a diff-in-diff analysis incorporating nationally-regulated banks (which faced the same regulations everywhere) and are not driven by other differences in state regulations, Fed membership, local characteristics, or differential selection into state-regulated banks. Our results suggest that exposing shareholders to more downside risk can successfully reduce bank failure.' },
  { tipo: 'Working paper', anio: '2020', titulo: 'The effects of audit firm rotation: an event study in Chile', autores: 'Aninat, A.; Bustos, Á.; Riutort, J.', publicacion: 'Documento de trabajo, enero 2020', pdf: '55-the-effects-of-audit-firm-rotation-an-event-study-in-chile',
    abstract: 'In order to determine market reaction to an unanticipated audit firm change we carry out an event study of 69 publicly traded Chilean companies (100% of the nonfinancial component of the main Chilean Stock Index: IPSA) from 2004 to 2013. We find that the market reacted positively when a company announced the retention of its audit firm for a given year. We rule out possible bias in the informational content of the event. Our result suggests that overall, the costs associated with a company\'s audit firm change (startup costs and know how losses) overshadow the benefits of this change (a reduction in the probability of a value destroying event such as fraud or error). We discuss the implications of this result for the potential implementation of mandatory audit firm rotation in an emerging country such as Chile.' },
  { tipo: 'Working paper', anio: '2020', titulo: 'Las memorias corporativas como herramientas de relationship management a través de la confianza', autores: 'Labarca, C.; De Simone, L.', publicacion: 'Documento de trabajo', pdf: '53-las-memorias-corporativas-como-herramientas-de-relationship-management-a-traves-de-la-confianza',
    abstract: 'Las memorias corporativas tienen como mandato informar anualmente la situación financiera de una empresa a sus accionistas. Sin embargo, este artículo plantea que se han convertido en un instrumento de vinculación que desborda el ámbito del relacionamiento del Gobierno Corporativo con los inversionistas y su estatus de mero producto comunicacional. A través de un análisis cualitativo y comparativo se estudian los casos de dos empresas chilenas: Metro S.A. y Mall Plaza S.A. Utilizando la metodología de análisis de discurso, se explicita cómo dichas empresas se apropian de tendencias que agregan valor a la gestión del gobierno corporativo frente a sus principales stakeholders. Específicamente, se trabaja la confianza como uno de los valores fundamentales que debe guiar dicho relacionamiento.' },
  { tipo: 'Working paper', anio: '2016', titulo: 'Combate contra la corrupción internacional y enfoque en América Latina', autores: 'Epstein, E.', publicacion: 'Rock Center for Corporate Governance, Stanford, Working Paper n.° 218, mayo 2016', pdf: '51-combate-contra-la-corrupcion-internacional-y-enfoque-en-america-latina',
    abstract: 'This article focuses on the Foreign Corrupt Practices Act ("FCPA"), its application in Latin America, and the Department of Justice\'s ("DOJ") new one-year pilot program, announced on April 5, 2016, to encourage companies to self-report violations of FCPA and to cooperate with the DOJ\'s Fraud Section. Using data from the newly launched Foreign Corrupt Practices Act Clearinghouse at Stanford Law School, we take a look at enforcement actions from the DOJ and the SEC involving Latin America for the period 2006-2016, showing that there are 54 cases involving FCPA violations in the region, mostly originating from Mexico (12), Argentina (10), Venezuela (8) and Brazil (8). The cases are distributed in 12 different countries in the region.' },
  { tipo: 'Artículo', anio: '2016', titulo: 'No news is good news: voluntary disclosure in the face of litigation', autores: 'Marinovic, I.; Varas, F.', publicacion: 'RAND Journal of Economics, vol. 47, n.° 4, pp. 822-856', pdf: '47-no-news-is-good-news-voluntary-disclosure-in-the-face-of-litigation',
    abstract: 'We study disclosure dynamics when the firm value evolves stochastically over time. The presence of litigation risk, arising from the failure to disclose unfavorable information, crowds out positive disclosures. Litigation risk mitigates firms\' tendency to use inefficient disclosure policies. From a policy perspective, we show that a stricter legal environment may be an efficient way to stimulate information transmission in capital markets, particularly when the nature of information is proprietary. We model the endogeneity of litigation risk in a dynamic setting and shed light on the empirical controversy regarding whether disclosure preempts or triggers litigation.' },
  { tipo: 'Working paper', anio: '2015', titulo: 'Evidencia internacional sobre la relación entre la regulación de transferencias y los beneficios privados del control', autores: 'Jurfest, P.; Riutort, J.', publicacion: 'Documento de trabajo, abril 2015', pdf: '49-evidencia-internacional-sobre-la-relacion-entre-la-regulacion-de-transferencias-y-los-beneficios-privados-del-control',
    abstract: 'En este trabajo analizamos la evolución de la regulación de cambios de control en Europa y estudiamos cómo el movimiento desde sistemas basados en la regla de mercado a sistemas con reglas de igualdad de oportunidades va de la mano de una caída en los beneficios privados del control. Estimamos los beneficios privados del control siguiendo la metodología propuesta en Jurfest, Paredes y Riutort (2015) para una muestra de transacciones de cambio de control de empresas de 14 países de Europa en el periodo 1985-2014 y encontramos que los beneficios privados del control han caído aproximadamente en un 4% del valor del patrimonio después de la implementación de reglas de igualdad de oportunidades.' },
  { tipo: 'Working paper', anio: '2014', titulo: 'Corporate governance, business groups, and market value: time-series evidence from Turkey', autores: 'Ararat, M.; Black, B. S.; Yurtoglu, B. B.', publicacion: 'Documento de trabajo, junio 2014', pdf: '45-corporate-governance-business-groups-and-market-value-time-series-evidence-from-turkey',
    abstract: 'Business groups play a large, sometimes dominant economic role in many countries. A number of studies find an association between firm-level corporate governance and market value, but none study the role of business group identity in firm level corporate governance or the value of "group governance." We begin to fill that gap through a case study of Turkey. We study the corporate governance practices of Turkish business groups and listed firms from 2006 to 2012, relying on hand-collected data covering the vast majority of listed firms. We build a Turkey Corporate Governance Index (TCGI), composed of subindices for board structure, board procedure, disclosure, ownership, and shareholder rights. This index predicts higher market value (proxied by Tobin\'s q) at both the firm level and group level; the principal driver of this result is the disclosure subindex. We find large differences in the governance choices of different business groups.' },
  { tipo: 'Working paper', anio: '2014', titulo: 'The government as a large shareholder: impact on the voting premium', autores: 'Fernandes, M.; Novaes, W.', publicacion: 'Documento de trabajo, julio 2014', pdf: '43-the-government-as-a-large-shareholder-impact-on-the-voting-premium',
    abstract: 'The subprime crisis led to a wave of government interventions in the private sector that has been particularly strong in Europe and Latin America, where several governments are large shareholders in a variety of public firms. In a sense, the subprime crisis induced these governments to behave as active large shareholders. This paper uses a sample of public firms in Brazil to show that the government activism lowers the value of the minority shareholders\' voting rights. While the corporate governance literature usually associates lower voting premia with stronger protection of minority shareholders, we provide evidence that the government-induced decline in the value of voting rights harmed minority shareholders in Brazil.' },
  { tipo: 'Working paper', anio: undefined, titulo: 'Protección de accionistas minoritarios por directores independientes en Chile', autores: 'Salgado, M.', publicacion: 'Documento de trabajo', pdf: '41-proteccion-de-accionistas-minoritarios-por-directores-independientes-en-chile',
    abstract: 'El régimen de los directores independientes en las sociedades anónimas chilenas no incrementa el nivel de protección de los accionistas minoritarios. Los deberes y obligaciones de los directores independientes en el directorio son esencialmente los mismos que los de los directores no independientes. El grado de protección que pueda otorgar el comité de directores a los accionistas minoritarios no está determinado por la participación del director independiente. Si se suma a esto la forma cómo se distribuye el poder en nuestras sociedades anónimas y los incentivos para que éste se ejerza de determinada forma, podemos concluir que el director independiente no es una herramienta adecuada para otorgar protección a accionistas minoritarios frente a los eventuales abusos del controlador.' },
].map((d) => ({ ...d, href: `${PDF_DOC}${d.pdf}/file` }));

// ---------- Estudios (antes Informes) ----------
// Los 11 informes del sitio actual (P1-15, 26-10). Card: portada + título + descargar, autor "CGC UC" (minuta §4).
// Portada: imagen real de cada PDF en el marco 32:17; «true» = portada genérica mientras no se monta la real.
const PDF_INFORME = 'https://centrogobiernocorporativo.uc.cl/informes-y-opinion/informes/';
export const estudios = [
  { anio: '2026', titulo: 'Análisis Juntas de Accionistas IPSA 2026', portada: '/img/estudios/juntas-accionistas-ipsa-2026.jpg', pdf: '141-analisis-juntas-de-accionistas-ipsa-2026' },
  { anio: '2025', titulo: 'Informe CEOs y Directorio en Chile frente a la incertidumbre', portada: '/img/estudios/ceos-directorio-chile.jpg', pdf: '125-informe-ceos-y-directorio-en-chile' },
  { anio: '2024', titulo: 'Gobierno Corporativo y estrategias de inversión de impacto: Barrio 31, Buenos Aires', portada: '/img/estudios/barrio-31-buenos-aires.jpg', pdf: '111-gobierno-corporativo-y-estrategias-de-inversion-de-impacto-un-analisis-de-su-contribucion-al-desarrollo-sostenible-del-barrio-31-en-buenos-aires-argentina' },
  { anio: '2024', titulo: 'Algunas consideraciones del primer ejercicio de reporte bajo la NCG 461', portada: '/img/estudios/primer-ejercicio-ncg-461.jpg', pdf: '107-informe-abril-2024' },
  { anio: '2020', titulo: 'Diversidad de Género en la Alta Dirección de las Empresas en Chile', portada: '/img/estudios/diversidad-genero-alta-direccion.jpg', pdf: '39-diversidad-de-genero-en-la-alta-direccion-de-las-empresas-en-chile' },
  { anio: '2019', titulo: 'Comentarios CGC UC a la consulta normativa de la CMF (NCG 30)', portada: true, pdf: '37-comentarios-cgcuc-consulta-normativa-cmf-ncg-30' },
  { anio: '2019', titulo: 'Comités de Directores: preocupaciones, prácticas y desafíos', portada: true, pdf: '35-comites-de-directores-preocupaciones-practicas-y-desafios' },
  { anio: '2015', titulo: 'Comentarios CGC UC al proyecto normativo de la NCG 341', portada: true, pdf: '31-comentarios-cgcuc-proyecto-normativo-341' },
  { anio: '2015', titulo: 'Comentarios CGC UC a la revisión de los Principios de Gobierno Corporativo de la OCDE', portada: true, pdf: '29-comentarios-cgcuc-review-to-the-oecd-principles-cg' },
  { anio: undefined, titulo: 'Gobierno Corporativo en Latinoamérica', portada: true, pdf: '27-gobierno-corporativo-en-latinoamerica' },
  { anio: '2013', titulo: 'Informe CGC UC: resultados de la NCG 341', portada: true, pdf: '25-informe-cgcuc-resultados-ncg-341' },
].map((d) => ({ ...d, href: `${PDF_INFORME}${d.pdf}/file` }));

export const directorio = [
  ['Matías Zegers', 'Presidente del Directorio'], ['Álvaro Bustos', 'Director'], ['Roberto Guerrero', 'Director'], ['Enrique Alcalde', 'Director'],
  ['Marta del Sante', 'Directora'], ['Luis Hernán Paúl', 'Director'], ['Eduardo Walker', 'Director'], ['Teresita María Tagle', 'Directora'],
].map(([nombre, cargo]) => ({ nombre, cargo }));

// Equipo ejecutivo (26-10): Josefina Tocornal deja el Centro a fin de mes; su reemplazo aún no se define.
export const equipo = [
  { nombre: 'Alejandra Wood', cargo: 'Directora Ejecutiva', correo: 'awoodh@uc.cl', telefono: '+56 9 5504 2132' },
  { nombre: sara.nombre, cargo: sara.cargo, correo: sara.correo },
];

// Red de Investigación (26-10): solo profesores afiliados. Salen Consuelo Silva, Carlos Pombo y Teresita Tagle;
// sin investigadores ni ayudantes (Josefina Tocornal y Pablo Araya ya no van).
export const red = {
  'Profesores afiliados': ['Matías Zegers', 'Álvaro Bustos', 'Roberto Guerrero', 'Enrique Alcalde', 'Luis Hernán Paúl', 'Eduardo Walker'],
};

// Colaboradores (P1-17, 26-10): Forvis Mazars, Cuprum, Morales & Besa y LarrainVial. Logos de sus sitios oficiales;
// Morales & Besa se llama SCLB Abogados desde septiembre de 2026 (sclb.cl: «SCLB, antes Morales & Besa»).
export const colaboradores = [
  { nombre: 'Forvis Mazars', logo: '/img/colaboradores/forvis-mazars.svg' },
  { nombre: 'Cuprum AFP', logo: '/img/colaboradores/cuprum.png' },
  { nombre: 'SCLB Abogados (antes Morales & Besa)', logo: '/img/colaboradores/sclb.svg' },
  { nombre: 'LarrainVial', logo: '/img/colaboradores/larrainvial.svg' },
];
