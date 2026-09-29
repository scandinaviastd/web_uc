// Programas de Formación. En WordPress: CPT "programa" con estos campos.
// Oferta 2027 (minuta 07-09 §3): 3 cursos + 1 diplomado. In Company aparte.

const PENDIENTE = '[Contenido por completar con la información del Centro. Antes estaba oculto en un acordeón cerrado.]';

export const jefePrograma = {
  nombre: 'Matías Zegers Ruiz-Tagle',
  cargo: 'Abogado UC · Fundador y Presidente del CGC UC',
  resena: 'Profesor Asociado de la Facultad de Derecho UC. Miembro de la mesa redonda latinoamericana en Gobierno Corporativo de la OECD. Autor de artículos, capítulos y libros sobre gobierno corporativo.',
};

export const coordinacion = {
  titulo: '¿Tienes dudas sobre el programa?',
  persona: 'Sara Marambio · Coordinación de formación y extensión',
  telefono: '(+56) 2 2354 2132',
  correo: '[correo por confirmar]',
};

const descuentosBase = [
  ['Funcionarios UC', '30%'],
  ['Ex alumnos UC', '15%'],
  ['Funcionarios públicos', '15%'],
  ['Colaboradores de empresas en convenio', '10%'],
  ['Grupos de 3 o más de una misma organización', '10%'],
];

const detalle = (modulos) => [
  { titulo: 'Equipo docente', texto: PENDIENTE },
  { titulo: 'Objetivos de aprendizaje', texto: PENDIENTE },
  { titulo: 'Metodología', texto: PENDIENTE },
  { titulo: 'Desglose de cursos', modulos },
  { titulo: 'Requisitos de aprobación', texto: PENDIENTE },
  { titulo: 'Proceso de admisión', texto: PENDIENTE },
];

export const programas = [
  {
    slug: 'diplomado-gobierno-corporativo',
    tipo: 'Diplomado',
    estado: 'Matrículas abiertas',
    titulo: 'Diplomado en Gobierno Corporativo',
    frase: 'Una visión comprensiva, detallada y práctica del funcionamiento del gobierno corporativo, para profesionales que se relacionan con el gobierno de las instituciones.',
    inicioCorto: 'Inicio 11 may 2026',
    fechas: '11 may — 30 nov 2026',
    horario: 'Lunes 15:00 – 19:30',
    modalidad: 'Híbrido',
    valor: '$4.400.000',
    descripcion: 'Con este diplomado podrás comprender el origen, desarrollo y relevancia del gobierno corporativo, en instituciones con y sin fines de lucro, en particular para las sociedades anónimas abiertas chilenas. Podrás identificar los aspectos económicos, buenas prácticas, teoría jurídica y regulación que fundamentan las principales instituciones relacionadas con el gobierno corporativo y resolver casos prácticos.',
    dirigido: 'Abogados, ingenieros comerciales, ingenieros civiles, economistas, auditores y otros profesionales que se relacionen con el gobierno corporativo de las instituciones.',
    requisitos: 'Grado académico de licenciado o título profesional universitario. Experiencia laboral de al menos 3 años.',
    detalle: detalle(['El quehacer de un director/a', 'Las responsabilidades de un director/a', 'Buen gobierno corporativo', 'Estrategia y control de gestión corporativo', 'Sustentabilidad y criterios ESG', 'Gestión de riesgos', 'Un directorio efectivo']),
    descuentos: [['Funcionarios UC', '30%'], ['Matrícula anticipada (hasta 31 ene 2026)', '25%'], ['Ex alumnos UC (pregrado, postgrado, diplomados)', '15%'], ['Funcionarios públicos', '15%'], ['Colaboradores de empresas en convenio', '10%'], ['Grupos de 3 o más de una misma organización', '10%']],
  },
  {
    slug: 'formando-nuevos-directores',
    tipo: 'Curso',
    estado: 'Matrículas abiertas',
    titulo: 'Formando nuevos directores de empresas',
    frase: 'Conocimientos y herramientas en las materias clave para el ejercicio de la función de director de empresas: misión, responsabilidades, jurisdicción vigente y gobernanza corporativa.',
    inicioCorto: 'Inicio 1 oct 2026',
    fechas: '1 oct — 19 nov 2026',
    horario: 'Ver calendario',
    modalidad: 'Híbrido',
    valor: '$2.400.000',
    descripcion: 'Conocimientos y herramientas en las materias clave para el ejercicio de la función de director de empresas: misión, responsabilidades, jurisdicción vigente y gobernanza corporativa. Este programa entrega herramientas prácticas aplicables desde la primera sesión.',
    dirigido: 'Profesionales que aspiran a integrar directorios o que ya ejercen como directores y buscan formalizar sus competencias.',
    requisitos: 'Título profesional universitario o licenciatura.',
    detalle: detalle(['El quehacer de un director/a', 'Las responsabilidades de un director/a', 'Responsabilidad penal de la persona jurídica', 'Buen gobierno corporativo', 'Estrategia y control de gestión corporativo', 'Sustentabilidad y criterios ESG', 'Gestión de riesgos', 'Un directorio efectivo']),
    descuentos: descuentosBase,
  },
  {
    slug: 'claves-decisiones-financieras',
    tipo: 'Curso',
    estado: 'Matrículas abiertas',
    titulo: 'Claves para la toma de decisiones financieras en Directorios',
    frase: 'Conocimientos financieros sólidos para que directores y directoras tomen decisiones informadas y responsables que lideren el crecimiento de la organización.',
    inicioCorto: 'Fecha por confirmar',
    fechas: 'Por confirmar',
    horario: 'Por confirmar',
    modalidad: 'Híbrido',
    valor: '$1.300.000',
    descripcion: 'Conocimientos financieros sólidos para que directores y directoras tomen decisiones informadas y responsables que lideren el crecimiento de la organización.',
    dirigido: 'Directores y ejecutivos sin formación financiera formal que participan en decisiones de inversión y financiamiento.',
    requisitos: 'Título profesional universitario.',
    detalle: detalle(['Lectura de estados financieros para directores', 'Evaluación de proyectos e inversiones', 'Estructura de capital y financiamiento', 'Indicadores clave y control de gestión', 'Riesgo financiero y decisiones estratégicas']),
    descuentos: descuentosBase,
  },
  {
    slug: 'empresas-familiares',
    tipo: 'Curso',
    estado: 'Matrículas abiertas',
    titulo: 'Gobierno corporativo de empresas familiares y family office',
    frase: 'Programa Governing: formación y entrenamiento para miembros y alta dirección de empresas familiares, que busca profesionalizar la governance con talleres dinámicos.',
    inicioCorto: 'Fecha por confirmar',
    fechas: 'Por confirmar',
    horario: 'Por confirmar',
    modalidad: 'Híbrido',
    valor: '$1.900.000',
    descripcion: 'Programa Governing: formación y entrenamiento para miembros y alta dirección de empresas familiares, que busca profesionalizar la governance con talleres dinámicos.',
    dirigido: 'Miembros de familias empresarias, directores y ejecutivos de empresas familiares y family offices.',
    requisitos: 'Título profesional universitario o experiencia relevante en empresa familiar.',
    detalle: detalle(['Gobernanza de la empresa familiar', 'Protocolo familiar y sucesión', 'Directorio y family office', 'Negociación y manejo de conflictos', 'Innovación en la empresa familiar']),
    descuentos: descuentosBase,
  },
];

// Imagen de cada programa (sitio actual del Centro; fotos de stock: confirmar licencia de uso).
programas.forEach((p) => { p.imagen = `/img/programas/${p.slug}.jpg`; });

export const inCompany = {
  slug: 'in-company',
  tipo: 'In Company',
  estado: 'Programa a medida',
  titulo: 'In Company para Directorios',
  frase: 'Formación exclusiva para el Directorio y la alta dirección de una empresa u organización, diseñada según sus intereses y necesidades.',
  intro: 'Programas diseñados junto a cada organización. Cuéntanos qué necesita tu directorio y te contactamos.',
  descripcion: 'Programa de formación que se realiza de manera exclusiva para el Directorio y alta dirección de una empresa u organización, de acuerdo con sus intereses o necesidades. Contempla la capacitación y la entrega de un set de cuatro documentos de estudio de elaboración propia del Centro para cada participante.',
  dirigido: 'Directorios y equipos de alta dirección de empresas y organizaciones, con o sin fines de lucro.',
  incluye: 'Set de 4 documentos de estudio y consulta de elaboración propia del CGC UC para cada participante.',
  contenidos: ['El quehacer de un director/a', 'Las responsabilidades de un director/a', 'Buen gobierno corporativo', 'Estrategia y control de gestión corporativo', 'Sustentabilidad y criterios ESG', 'Gestión de riesgos', 'Un directorio efectivo'],
  coordinacion: { titulo: '¿Quieres un programa para tu directorio?', persona: 'Coordinación In Company', telefono: '+56 9 5504 2151', correo: 'cgcuc@uc.cl' },
};

export const getPrograma = (slug) => programas.find((p) => p.slug === slug);
