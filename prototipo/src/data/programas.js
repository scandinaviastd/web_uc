// Programas de Formación. En WordPress: CPT "programa" con estos campos.
// Oferta 2027 según el Calendario Académico 2027 del Centro (26-10): Diplomado, Formando nuevos directores
// (2 versiones) y Governing empresas familiares. Claves para decisiones financieras sigue en evaluación (sin fecha).

import { sara } from './sitio.js';

export const PENDIENTE = '[Por completar con el Centro]';
const HOY = new Date().toISOString().slice(0, 10);

export const jefePrograma = {
  nombre: 'Matías Zegers Ruiz-Tagle',
  cargo: 'Abogado UC · Fundador y Presidente del CGC UC',
  resena: 'Profesor Asociado de la Facultad de Derecho UC. Miembro de la mesa redonda latinoamericana en Gobierno Corporativo de la OECD. Autor de artículos, capítulos y libros sobre gobierno corporativo.',
};

export const coordinacion = {
  titulo: '¿Tienes dudas sobre el programa?',
  persona: `${sara.nombre} · ${sara.cargo}`,
  telefono: '(+56) 2 2354 2132',
  correo: sara.correo,
};

// Descuentos (P1-06, 26-10): una sola tabla para todos los programas; las fichas la referencian.
export const descuentos = [
  ['Funcionarios UC', '30%'],
  ['Alumni del Centro de Gobierno Corporativo UC', '20%'],
  ['Exalumnos UC y socios Alumni UC', '15%'],
  ['Colaboradores de empresas en convenio', '15%'],
  ['Funcionarios públicos', '15%'],
  ['Grupos de tres o más participantes de una misma institución', '15%'],
  ['Matrícula anticipada', '15%'],
];
export const condicionesDescuentos = [
  'Los descuentos no son acumulables. Si se cumple más de una condición, se aplica el de mayor porcentaje.',
  'Los descuentos se calculan sobre el arancel oficial de cada programa.',
  'La matrícula anticipada tiene una vigencia definida para cada programa.',
  'Los descuentos especiales o excepcionales requieren autorización de la Dirección Ejecutiva.',
  'Su aplicación está sujeta a la revisión de los compromisos institucionales y convenios vigentes.',
];

const detalle = ({ modulos, docente } = {}) => [
  { titulo: 'Equipo docente', texto: docente ?? PENDIENTE },
  { titulo: 'Objetivos de aprendizaje', texto: PENDIENTE },
  { titulo: 'Metodología', texto: PENDIENTE },
  { titulo: 'Módulos', modulos },
  { titulo: 'Requisitos de aprobación', texto: PENDIENTE },
  { titulo: 'Proceso de admisión', texto: PENDIENTE },
];

// Fechas: se escriben una vez por versión (ISO) y todo lo demás se deriva.
const MES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const MES_LARGO = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const partes = (iso) => iso.split('-').map(Number);
const corta = (iso) => { const [a, m, d] = partes(iso); return `${d} ${MES[m - 1]} ${a}`; };
const larga = (iso) => { const [a, m, d] = partes(iso); return `${d} de ${MES_LARGO[m - 1]} de ${a}`; };
const rango = (v) => `${corta(v.inicio).replace(/ \d{4}$/, '')} — ${corta(v.termino)}`;

// Estado calculado por fecha (R-03, aprobado el 26-10): nadie tiene que acordarse de cambiarlo.
// Sin fechas: «Próximamente». Todas las versiones ya comenzaron: «Cerrado». Con la postulación habilitada
// (postularUrl): «Matrículas abiertas». Si aún no se habilita: «Próximamente».
const estadoDe = (p) => {
  if (!p.versiones.length) return 'Próximamente';
  if (!p.versiones.some((v) => v.inicio > HOY)) return 'Cerrado';
  return p.postularUrl ? 'Matrículas abiertas' : 'Próximamente';
};

// Mensaje de WhatsApp: «Hola, quisiera más información del Diplomado en Gobierno Corporativo» (26-10).
const temaWhatsApp = (p) => (p.titulo.toLowerCase().startsWith(p.tipo.toLowerCase()) ? p.titulo : `${p.tipo.toLowerCase()} ${p.titulo}`);

// postularUrl: enlace a la postulación 2027 (plataforma UC). Mientras no se habilite, «Postular» lleva a
// /formacion/<slug>/postular/, que avisa que pronto se abre la versión 2027 (P1-03).
const base = [
  {
    slug: 'diplomado-gobierno-corporativo',
    tipo: 'Diplomado',
    titulo: 'Diplomado en Gobierno Corporativo',
    frase: 'Una visión comprensiva, detallada y práctica del funcionamiento del gobierno corporativo, para profesionales que se relacionan con el gobierno de las instituciones.',
    versiones: [{ inicio: '2027-05-03', termino: '2027-11-29', dia: 'Lunes' }],
    postularUrl: null,
    modalidad: 'Híbrido',
    valor: '$4.400.000',
    descripcion: 'Con este diplomado podrás comprender el origen, desarrollo y relevancia del gobierno corporativo, en instituciones con y sin fines de lucro, en particular para las sociedades anónimas abiertas chilenas. Podrás identificar los aspectos económicos, buenas prácticas, teoría jurídica y regulación que fundamentan las principales instituciones relacionadas con el gobierno corporativo y resolver casos prácticos.',
    dirigido: 'Abogados, ingenieros comerciales, ingenieros civiles, economistas, auditores y otros profesionales que se relacionen con el gobierno corporativo de las instituciones.',
    requisitos: 'Grado académico de licenciado o título profesional universitario. Experiencia laboral de al menos 3 años.',
    detalle: detalle({ modulos: ['El quehacer de un director/a', 'Las responsabilidades de un director/a', 'Buen gobierno corporativo', 'Estrategia y control de gestión corporativo', 'Sustentabilidad y criterios ESG', 'Gestión de riesgos', 'Un directorio efectivo'] }),
  },
  {
    slug: 'formando-nuevos-directores',
    tipo: 'Curso',
    titulo: 'Formando nuevos directores de empresas',
    frase: 'Conocimientos y herramientas en las materias clave para el ejercicio de la función de director de empresas: misión, responsabilidades, jurisdicción vigente y gobernanza corporativa.',
    versiones: [
      { inicio: '2027-04-14', termino: '2027-06-02', dia: 'Miércoles' },
      { inicio: '2027-10-07', termino: '2027-11-25', dia: 'Jueves' },
    ],
    postularUrl: null,
    modalidad: 'Híbrido',
    valor: '$2.400.000',
    descripcion: 'Conocimientos y herramientas en las materias clave para el ejercicio de la función de director de empresas: misión, responsabilidades, jurisdicción vigente y gobernanza corporativa. Este programa entrega herramientas prácticas aplicables desde la primera sesión.',
    dirigido: 'Profesionales que aspiran a integrar directorios o que ya ejercen como directores y buscan formalizar sus competencias.',
    requisitos: 'Título profesional universitario o licenciatura.',
    detalle: detalle({ modulos: ['El quehacer de un director/a', 'Las responsabilidades de un director/a', 'Responsabilidad penal de la persona jurídica', 'Buen gobierno corporativo', 'Estrategia y control de gestión corporativo', 'Sustentabilidad y criterios ESG', 'Gestión de riesgos', 'Un directorio efectivo'] }),
  },
  {
    slug: 'empresas-familiares',
    tipo: 'Curso',
    titulo: 'Gobierno corporativo de empresas familiares y family office',
    frase: 'Programa Governing: formación y entrenamiento para miembros y alta dirección de empresas familiares, que busca profesionalizar la governance con talleres dinámicos.',
    versiones: [{ inicio: '2027-08-03', termino: '2027-09-07', dia: 'Martes' }],
    postularUrl: null,
    modalidad: 'Híbrido',
    valor: '$1.900.000',
    descripcion: 'Programa Governing: formación y entrenamiento para miembros y alta dirección de empresas familiares, que busca profesionalizar la governance con talleres dinámicos.',
    dirigido: 'Miembros de familias empresarias, directores y ejecutivos de empresas familiares y family offices.',
    requisitos: 'Título profesional universitario o experiencia relevante en empresa familiar.',
    detalle: detalle({ docente: 'Gonzalo Jiménez', modulos: ['Navegando la transición', 'Piloto al timón', 'La cabina de mando', 'El compás estratégico', 'Liderando la tripulación', 'Dónde está el copiloto'] }),
  },
  {
    slug: 'claves-decisiones-financieras',
    tipo: 'Curso',
    titulo: 'Claves para la toma de decisiones financieras en Directorios',
    frase: 'Conocimientos financieros sólidos para que directores y directoras tomen decisiones informadas y responsables que lideren el crecimiento de la organización.',
    versiones: [],
    postularUrl: null,
    modalidad: 'Híbrido',
    valor: '$1.300.000',
    descripcion: 'Conocimientos financieros sólidos para que directores y directoras tomen decisiones informadas y responsables que lideren el crecimiento de la organización.',
    dirigido: 'Directores y ejecutivos sin formación financiera formal que participan en decisiones de inversión y financiamiento.',
    requisitos: 'Título profesional universitario.',
    detalle: detalle({ modulos: ['Contabilidad y análisis de estados financieros', 'Evaluación y financiamiento de proyectos', 'Finanzas corporativas'] }),
  },
];

const ANIO = (p) => p.versiones[0]?.inicio.slice(0, 4);
export const programas = base.map((p) => {
  const v = p.versiones;
  const proxima = v.find((x) => x.inicio > HOY) ?? v[0];
  return {
    ...p,
    estado: estadoDe(p),
    inicioCorto: proxima ? `Inicio ${corta(proxima.inicio)}` : 'Fecha por confirmar',
    fechas: !v.length ? 'Por confirmar' : v.length === 1 ? rango(v[0]) : `${v.length} versiones en ${ANIO(p)}`,
    horario: !v.length ? 'Por confirmar' : [...new Set(v.map((x) => x.dia))].join(' o ') + ' · horario por confirmar',
    // Versiones en texto, para el bloque «Fechas» de la ficha
    calendario: v.map((x, i) => ({ nombre: v.length > 1 ? `Versión ${i + 1}` : null, texto: `Los ${x.dia.toLowerCase()}, del ${larga(x.inicio).replace(/ de \d{4}$/, '')} al ${larga(x.termino)}` })),
    descuentos,
    whatsappTema: temaWhatsApp(p),
    imagen: `/img/programas/${p.slug}.jpg`,
  };
});

export const inCompany = {
  slug: 'in-company',
  tipo: 'In Company',
  estado: 'Programa a medida',
  titulo: 'In Company para Directorios',
  frase: 'Formación exclusiva para el Directorio y la alta dirección de una empresa u organización, diseñada según sus intereses y necesidades.',
  intro: 'Diseñamos el programa según los desafíos de tu empresa. Cuéntanos qué necesita tu directorio y te contactamos.',
  descripcion: 'Programa de formación que se realiza de manera exclusiva para el Directorio y alta dirección de una empresa u organización, de acuerdo con sus intereses o necesidades. Contempla la capacitación y la entrega de un set de cuatro documentos de estudio de elaboración propia del Centro para cada participante.',
  dirigido: 'Directorios y equipos de alta dirección de empresas y organizaciones, con o sin fines de lucro.',
  incluye: 'Set de 4 documentos de estudio y consulta de elaboración propia del CGC UC para cada participante.',
  contenidos: ['El quehacer de un director/a', 'Las responsabilidades de un director/a', 'Buen gobierno corporativo', 'Estrategia y control de gestión corporativo', 'Sustentabilidad y criterios ESG', 'Gestión de riesgos', 'Un directorio efectivo'],
  // El contacto de In Company es el WhatsApp del Centro (P1-21) y el correo de Sara (P1-19).
  coordinacion: { titulo: '¿Quieres un programa para tu directorio?', persona: `${sara.nombre} · ${sara.cargo}`, correo: sara.correo },
  whatsappTema: 'programa In Company para Directorios',
  imagen: '/img/programas/in-company.jpg',
};

export const getPrograma = (slug) => programas.find((p) => p.slug === slug);
