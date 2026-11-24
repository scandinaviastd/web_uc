// Descripciones para Google (meta description y Open Graph). La DED revisa que cada página tenga la suya, única, y
// marca críticas la home y las del primer nivel del menú (Rommy, 24-11). Máximo de la DED: 150 caracteres y 24 palabras.
// Las 16 principales salen de la propuesta del 16-11 (wiki/recursos/2026-11-16 Propuesta de descripciones para Google
// del sitio CGC UC.pdf), redactada por el estudio con el texto de cada página; el Centro las aprueba. Ajustadas al
// contenido del 24-11: Servicios (Asesoría Estratégica a Directorios, 19-11) y Prensa (columnas, entrevistas y artículos).
// Las demás se arman con los datos de cada página (eventos, prensa, noticias, postulación).
// En WordPress: un campo por página (Yoast o similar), con estas como valor inicial.
export const SITIO = 'Centro UC Gobierno Corporativo';
export const MAX = 150;

export const DESCRIPCIONES = {
  '/': 'Formación útil y al día para la Alta Dirección, con rigurosidad académica UC: gobierno corporativo, rol del directorio, compliance y sostenibilidad.',
  '/nosotros/': 'Centro inter-facultades de Derecho y Administración UC, creado en 2012 para ser un referente en gobierno corporativo en Chile y Latinoamérica.',
  '/formacion/': 'Formación para directores, ejecutivos y organizaciones que buscan fortalecer su gobierno corporativo: un diplomado, tres cursos y In Company.',
  '/formacion/programas-abiertos/': 'Un diplomado y tres cursos 2027 del Centro, en modalidad híbrida. Mira el año completo, compáralos y elige tu programa.',
  '/formacion/diplomado-gobierno-corporativo/': 'Una visión comprensiva, detallada y práctica del gobierno corporativo, para profesionales que se relacionan con el gobierno de las instituciones.',
  '/formacion/formando-nuevos-directores/': 'Herramientas para ejercer como director de empresas: misión, responsabilidades, jurisdicción vigente y gobernanza, aplicables desde la primera sesión.',
  '/formacion/claves-decisiones-financieras/': 'Conocimientos financieros para que directores y directoras tomen decisiones informadas y responsables que lideren el crecimiento de la organización.',
  '/formacion/empresas-familiares/': 'Programa Governing: talleres y formación para miembros y alta dirección de empresas familiares y family offices que profesionalizan su governance.',
  '/formacion/in-company/': 'Formación exclusiva para el Directorio y la alta dirección de una empresa u organización, diseñada según sus intereses y necesidades.',
  '/formacion/mas-informacion/': 'Déjanos tus datos y te contactaremos con información sobre los programas de formación y la asesoría a directorios del Centro UC Gobierno Corporativo.',
  '/investigacion/': 'Artículos, working papers y estudios del Centro y sus profesores afiliados, que generan evidencia sobre gobierno corporativo en Chile y Latinoamérica.',
  '/investigacion/red/': 'Profesores afiliados al Centro UC Gobierno Corporativo, autores de los artículos, working papers y estudios que publicamos sobre gobierno corporativo.',
  '/investigacion/articulos-y-working-papers/': 'Artículos académicos y documentos de trabajo sobre gobierno corporativo de profesores afiliados al Centro y otros autores, cada uno con su abstract.',
  '/investigacion/estudios/': 'Informes del Centro, propios y en colaboración con otras instituciones, que aportan al conocimiento y la mejora continua del gobierno corporativo.',
  '/extension/': 'Webinars, debates, desayunos y jornadas de gobierno corporativo abiertos a la comunidad, junto con noticias, newsletters y prensa del Centro.',
  '/extension/prensa/': 'Columnas, entrevistas y artículos en medios de académicos, directores y miembros del Centro UC Gobierno Corporativo sobre gobierno corporativo.',
  '/servicios/': 'Asesoría estratégica a directorios: evaluación de desempeño, composición y sucesión, y programas In Company. Independiente y confidencial.',
  '/busqueda/': 'Busca programas, eventos, noticias, estudios y artículos en el sitio del Centro UC Gobierno Corporativo.',
};

export const MAX_PALABRAS = 24;
// Si la frase completa pasa del máximo (caracteres o palabras), se usa la corta.
const cabe = (t) => t.length <= MAX && t.split(/\s+/).length <= MAX_PALABRAS;
const ajustar = (larga, corta) => (cabe(larga) ? larga : corta);

export const descripcionEvento = (e) =>
  ajustar(`${e.tipo} del ${e.fechaLarga} sobre «${e.titulo}», del ${SITIO}.`, `${e.tipo} del ${e.fechaLarga}: «${e.titulo}».`);

export const descripcionPrensa = (o) =>
  ajustar(`«${o.titulo}»: ${o.tipo.toLowerCase()} de ${o.autor} en ${o.medio}, ${o.fechaLarga}.`, `${o.tipo} de ${o.autor} en ${o.medio}, ${o.fechaLarga}.`);

export const descripcionPostular = (p) =>
  ajustar(`Postulación 2027 a ${p.titulo}, del ${SITIO}: cómo y cuándo postular.`, `Postulación 2027 a ${p.titulo}.`);
