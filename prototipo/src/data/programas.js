// Programas de Formación. En WordPress: CPT "programa" con estos campos.
// Oferta 2027 según el Calendario Académico 2027 del Centro (26-10): Diplomado, Formando nuevos directores
// (2 versiones) y Governing empresas familiares. Claves para decisiones financieras: del 6 al 20 de octubre (Sara, 05-11).

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
// Tabla oficial de la Escuela de Administración y sus reglas, enviadas por Sara el 06-11 («los descuentos
// oficiales de los programas son estos»). Reemplaza la tabla anterior (salen matrícula anticipada y Alumni UC).
export const descuentos = [
  ['Funcionarios UC', '30%'],
  ['Alumni del Centro de Gobierno Corporativo UC', '20%'],
  ['Graduados de pregrado, postgrado y diplomados UC', '15%'],
  ['Funcionarios públicos', '15%'],
  ['Colaboradores de empresas en convenio', '10%'],
  ['Grupos de tres o más participantes', '10%'],
];
export const condicionesDescuentos = [
  'Los descuentos no son acumulables. Si se cumple más de una condición, se aplica el de mayor porcentaje.',
  'Los descuentos se calculan sobre el arancel oficial de cada programa.',
  'Su aplicación está sujeta a la revisión de los compromisos institucionales y convenios vigentes.',
];

// Detalle de la ficha. Cada sección trae `texto` (un párrafo o varios), `lista` y `nota`; el equipo docente trae
// `personas`. Lo que el Centro no ha entregado queda PENDIENTE y la ficha lo junta en «Por completar» (P1-05).
// Fuente: descriptores de cada programa enviados por Sara el 09-11 («Información solicitada - Programas CGC UC 2027»).
const seccion = (titulo, contenido) => ({ titulo, ...(contenido ?? { texto: PENDIENTE }) });
const detalle = ({ modulos, unidad, docentes, objetivos, metodologia, aprobacion, admision } = {}) => [
  docentes ? { titulo: 'Equipo docente', ...docentes } : seccion('Equipo docente'),
  seccion('Objetivos de aprendizaje', objetivos),
  seccion('Metodología', metodologia),
  { titulo: 'Módulos', modulos, unidad },
  seccion('Requisitos de aprobación', aprobacion),
  seccion('Proceso de admisión', admision),
];

// Textos comunes de los descriptores
const AVISO_CAMBIOS = 'Puede haber modificaciones de fechas o docentes por razones de fuerza mayor.';
const SIN_CUPOS = 'No se tramitan postulaciones incompletas ni se reservan cupos: el pago completo del valor del programa es requisito para gestionar la matrícula.';
const RETIROS = { texto: 'Retiros y cancelaciones', href: 'https://educacioncontinua.uc.cl/pagos-y-convenios/' };

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
    // Descriptor 2026 (con control de cambios de marzo 2026, aceptados); el Centro no mandó uno 2027.
    hora: '15:00 a 19:30 h',
    horaDetalle: '15:00 a 19:30 h, con café de 17:00 a 17:30',
    detalle: detalle({
      // Son 4 cursos con 23 módulos en total (antes la ficha mostraba la lista de In Company).
      unidad: 'curso',
      modulos: [
        { nombre: 'Aspectos claves del gobierno corporativo', temas: ['Conceptos generales sobre gobierno corporativo', 'Buen funcionamiento del directorio', 'El directorio y las relaciones de poder al interior de la sociedad anónima (partes I y II)', 'Derechos de los accionistas', 'Impacto económico de un buen gobierno corporativo'] },
        { nombre: 'Gobierno corporativo: manejo de información y funciones del directorio', temas: ['Manejo de la información en las sociedades anónimas', 'Estrategia y control de gestión corporativo', 'Modelos de negocios, información de gestión y gobierno corporativo', 'Gestión de riesgos', 'Gestión de talento', 'Desafíos de la alta dirección en la transformación digital y tecnológica'] },
        { nombre: 'Mecanismos para un buen gobierno corporativo', temas: ['Sostenibilidad y criterios ESG dentro de la estrategia del negocio', 'Regulación del gobierno corporativo', 'Responsabilidad penal', 'Decisiones financieras en el directorio', 'Compliance y gobierno corporativo', 'Comunicación corporativa'] },
        { nombre: 'Gobierno corporativo: otros actores relevantes e instituciones de diferente naturaleza', temas: ['Rol de los inversionistas institucionales', 'Rol de los asesores externos', 'Gobierno corporativo y empresas del Estado', 'Gobierno corporativo y empresas familiares', 'Gobierno corporativo en ONG'] },
      ],
      docentes: {
        nota: AVISO_CAMBIOS,
        personas: [
          ['Carla Meza Morales', 'Abogada, Pontificia Universidad Católica de Chile. MSc in Law and Finance, University of Oxford.'],
          ['Luis Hernán Paúl Fresno', 'Ingeniero civil, Pontificia Universidad Católica de Chile. Master of Science in Management, Massachusetts Institute of Technology (MIT). Académico de la Escuela de Administración UC y miembro del directorio del Centro de Gobierno Corporativo UC.'],
          ['Enrique Alcalde Rodríguez', 'Abogado, Pontificia Universidad Católica de Chile. Magíster en Ciencia Jurídica y Doctor en Derecho UC. Académico de la Facultad de Derecho UC y miembro del directorio del Centro de Gobierno Corporativo UC.'],
          ['Álvaro Bustos Donoso', 'Ingeniero civil industrial y M.Sc. en Economía, Universidad de Chile. M.A. en Legal Studies, Northwestern University. M.A. y Ph.D. en Economía, Princeton University. Director de la Escuela de Administración UC y miembro del directorio del Centro de Gobierno Corporativo UC.'],
          ['Patricio Donoso Ibáñez', 'Ingeniero civil, Pontificia Universidad Católica de Chile. M.Sc., Massachusetts Institute of Technology (MIT). Académico de la Escuela de Administración UC.'],
          ['Andrés Ibáñez Tardel', 'Ingeniero comercial, Pontificia Universidad Católica de Chile. MBA, J.L. Kellogg School, Northwestern University. Director del Centro Desarrollo Directivo.'],
          ['Fernando Gaziano Perales', 'Chairman de Deloitte Chile y miembro del directorio de Deloitte Canadá. Socio del área de Asesoría en Gestión del Riesgo, especialista en gobiernos corporativos, modelos de control y gestión de riesgos, auditoría interna y de sistemas. Contador auditor, Universidad Nacional del Litoral (Argentina); PADE, Universidad de Los Andes.'],
          ['Gabriela Ugalde', 'Psicóloga y MBA, Pontificia Universidad Católica de Chile. Gerente de Recursos Humanos Corporativo de CCU. Ha sido gerente de Desarrollo Organizacional en Grupo Quiñenco, gerente de Recursos Humanos en CMR Falabella y gerente de Compensaciones y Beneficios para la Región Austral América de Nestlé.'],
          ['Matías Larraín V.', 'Abogado, Universidad Diego Portales, y LL.M., Duke University. Ha sido asesor legal del Ministro de Hacienda, abogado de la División Jurídica de la Secretaría General de la Presidencia y asesor jurídico de la ex Superintendencia de Valores y Seguros (actual CMF). Consultor en regulación financiera, seguros y gobierno corporativo en Chile, América Latina, África y Asia.'],
          ['Rodrigo Aldoney Ramírez', 'Abogado, Universidad de Chile. Magíster y Doctor en Derecho, Universidad Albert-Ludwig de Friburgo de Brisgovia (Alemania). Académico de la Facultad de Derecho UC. Ex abogado asesor del Ministerio Público.'],
          ['Verónica Rosenblut', 'Abogada, Universidad de Chile. Magíster en Derecho Penal y Ciencias Penales, Universitat Pompeu Fabra y Universitat de Barcelona. Académica de la Facultad de Derecho UC. Ex abogada asesora del Ministerio Público.'],
          ['Susana Sierra', 'Ingeniera comercial y MBA, Pontificia Universidad Católica de Chile. Socia y CEO de BH Compliance, reconocida por su trabajo en compliance, ética y transparencia en el sector privado. Directora de AmCham Chile, de AACCLA y de FIBA.'],
          ['Eduardo Opazo Preller', 'Administración de Empresas, IPEVE; MBA, Universidad Adolfo Ibáñez; Advanced Management Program, IESE Business School. Académico de la Escuela de Administración y de la Facultad de Comunicaciones UC.'],
          ['Sergio Godoy', 'Periodista y licenciado en Estética, Pontificia Universidad Católica de Chile. PhD y MPhil en Comunicaciones, University of Westminster. MBA, University of Exeter. Diplomado en Gestión de Reputación Corporativa, Reputation Institute.'],
          ['Héctor Lehuedé', 'Abogado, Universidad de Chile; Juris Science Master, Stanford University. Más de 25 años de experiencia en gobierno corporativo, integridad empresarial, sustentabilidad y asuntos financieros, en el sector público y privado. Consultor, académico, director de empresas y columnista.'],
          ['Clemente Pérez Errázuriz', 'Abogado y MBA, Pontificia Universidad Católica de Chile. Master in Public Policy, Georgetown University. Socio de Guerrero Olivos, en el área de energía y recursos naturales.'],
          ['José Rivera Izam', 'Ingeniero comercial, Pontificia Universidad Católica de Chile. MBA, IESE Universidad de Navarra. Académico de la Escuela de Administración UC.'],
          ['Verónica Monroy Herrera', 'Trabajadora social, Universidad de la Frontera, y psicóloga, Universidad San Sebastián. Directora de Fundación Niño y Patria y Fundación Infancia Primero. Asesora en planificación estratégica de la Fundación para la Infancia Ronald McDonald.'],
          ['Roberto Peralta Martínez', 'Abogado, Universidad de Chile. Master of Laws, Universidad de California, Los Ángeles. Socio del estudio Peralta Abogados.'],
          ['Marta del Sante', 'Ingeniera comercial y Magíster en Finanzas, UC. Profesora asistente y directora docente de la Escuela de Administración UC. Directora del Centro de Gobierno Corporativo UC.'],
          ['Lucía Martínez Caro', 'Ingeniera comercial y Magíster en Gestión de la Sustentabilidad. Ha sido gerente de sustentabilidad en diversas empresas, mentora en negocios sostenibles y asesora en estrategia de sostenibilidad. Certificada en análisis ESG por la Bolsa de Luxemburgo.'],
        ],
      },
      objetivos: { texto: 'Analizar el origen, el desarrollo y la relevancia del gobierno corporativo en instituciones con y sin fines de lucro, en particular en las sociedades anónimas abiertas chilenas.' },
      metodologia: {
        texto: ['Metodología teórica con aplicación de casos y revisión de artículos que se discuten en clases, para construir una visión de la teoría aplicada a la realidad empresarial.', 'Las clases son híbridas: se puede asistir en forma presencial u online, por videoconferencia.'],
        lista: ['Clases expositivas', 'Revisión bibliográfica', 'Actividades prácticas', 'Análisis de casos'],
      },
      aprobacion: {
        texto: ['Cada curso pesa un 25 % en el promedio final, en escala de 1,0 a 7,0. Para aprobar el diplomado hay que aprobar los cuatro cursos, con nota mínima 4,0 en cada uno. Los cursos se evalúan con una prueba escrita individual, salvo el tercero, que se evalúa con un control bibliográfico.', 'Quienes aprueben reciben un certificado de aprobación digital otorgado por la Pontificia Universidad Católica de Chile.'],
      },
      admision: {
        texto: 'La postulación es online, en el Sistema de Educación Continua UC: primero te registras con tus datos y luego subes estos antecedentes:',
        lista: ['Currículum vitae actualizado', 'Copia simple del título o la licenciatura', 'Copia de la cédula de identidad'],
        nota: `Vacantes: 20. ${SIN_CUPOS}`,
        enlace: RETIROS,
      },
    }),
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
    dirigido: 'Profesionales, gerentes y ejecutivos con interés en ejercer como director de una compañía o que estén iniciando sus funciones en ese ámbito.',
    requisitos: 'Se sugiere contar con título profesional y un mínimo de 5 años de experiencia laboral en cargos de responsabilidad en empresas.',
    // Descriptor 2027
    hora: '15:00 a 18:30 h',
    detalle: detalle({
      modulos: ['El quehacer de un director/a', 'Las responsabilidades de un director/a', 'Responsabilidad penal de la persona jurídica', 'Buen gobierno corporativo', 'Estrategia y control de gestión corporativo', 'Sustentabilidad y criterios ESG', 'Gestión de riesgos', 'Un directorio efectivo'],
      docentes: {
        nota: AVISO_CAMBIOS,
        personas: [
          ['Roberto Guerrero', 'Abogado, Pontificia Universidad Católica de Chile, y Master of Laws (LL.M.), New York University. Profesor titular de Derecho Comercial y ex decano de la Facultad de Derecho UC. Director del Centro de Gobierno Corporativo UC y socio de Guerrero Olivos. Director de empresas y árbitro del Centro de Arbitraje y Mediación de la Cámara de Comercio de Santiago.'],
          ['Luis Hernán Paúl Fresno', 'Ingeniero civil, Pontificia Universidad Católica de Chile. Master of Science in Management, Massachusetts Institute of Technology (MIT). Miembro del directorio del Centro de Gobierno Corporativo UC.'],
          ['Rodrigo Aldoney', 'Abogado, Universidad de Chile. Doctor en Derecho y LL.M., Universidad Albert-Ludwig de Friburgo de Brisgovia (Alemania). Profesor de Derecho Penal en la Facultad de Derecho UC.'],
          ['Verónica Rosenblut', 'Abogada, Universidad de Chile. Magíster en Derecho Penal y Ciencias Penales, Universitat Pompeu Fabra y Universitat de Barcelona.'],
          ['Lucía Martínez', 'Ingeniera comercial, Pontificia Universidad Católica de Chile, y Magíster en Gestión de la Sustentabilidad. Ha sido gerente de sustentabilidad en diversas empresas, mentora en negocios sostenibles y asesora en estrategia de sostenibilidad. Certificada en análisis ESG por la Bolsa de Luxemburgo.'],
          ['Fernando Gaziano Perales', 'Chairman de Deloitte Chile y miembro del directorio de Deloitte Canadá. Socio del área de Asesoría en Gestión de Riesgo, especialista en gestión de riesgo, gobierno corporativo y modelos de control. Académico del Centro de Gobierno Corporativo UC.'],
          ['Gonzalo Jiménez Seminario', 'Doctor in Governance, University of Liverpool; MBA, PONTS Paris-Tech; primer Luksic-Rockefeller Scholar en Harvard University; economista y Master en Finanzas, Universidad de Chile. CEO de Proteus Management & Governance Consulting. Director, consejero y asesor de grupos empresariales familiares latinoamericanos.'],
          ['Patricio Donoso Ibáñez', 'Ingeniero civil, Pontificia Universidad Católica de Chile. M.Sc., Massachusetts Institute of Technology (MIT). Prorrector de Gestión Institucional de la Pontificia Universidad Católica de Chile y académico de la Escuela de Administración UC.'],
        ],
      },
      objetivos: {
        texto: 'Reconocer el ámbito de gestión de un director/a de empresas y sus principales responsabilidades en la compañía. En particular:',
        lista: ['Analizar las oportunidades y riesgos de la gestión corporativa, considerando aspectos legales y éticos.', 'Reconocer y comprender la estructura y el funcionamiento de los directorios de las empresas.', 'Identificar los aspectos claves de esa estructura y funcionamiento para promover la creación de valor de las compañías.', 'Adquirir las competencias transversales vinculadas al gobierno corporativo de organizaciones, a nivel nacional y comparado.'],
      },
      metodologia: {
        texto: 'Clases expositivas interactivas con participación activa de los alumnos, complementadas con bibliografía especializada, análisis y discusión de casos, trabajos prácticos y ejercicios de aplicación.',
        lista: ['Clases expositivas teórico-prácticas', 'Análisis y discusión de casos prácticos en contextos de gestión empresarial', 'Ejercicios prácticos'],
      },
      aprobacion: {
        texto: ['El curso no tiene evaluaciones: se aprueba con un mínimo de 75 % de asistencia a las sesiones.', 'Quienes aprueben reciben un certificado de asistencia digital otorgado por la Pontificia Universidad Católica de Chile y una insignia digital.'],
      },
      admision: {
        texto: 'Envía estos documentos a la coordinadora de admisión del programa:',
        lista: ['Currículum vitae actualizado', 'Copia de la cédula de identidad por ambos lados'],
        nota: `Postulaciones para la versión de abril: del 15 de noviembre de 2026 al 12 de abril de 2027, o hasta completar las 45 vacantes. ${SIN_CUPOS}`,
        enlace: RETIROS,
      },
    }),
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
    dirigido: 'Presidentes, directores y directorios de empresas familiares, family offices y holdings de grupos empresariales; fundadores, accionistas y socios familiares, y miembros de la siguiente generación; ejecutivos de alta dirección, y directores independientes que quieran profundizar en el gobierno corporativo de empresas familiares.',
    requisitos: 'Se sugiere tener vínculo con una empresa de origen familiar —como dueño(a), accionista, miembro de la familia empresaria, director(a) o ejecutivo(a) de alta dirección—, ya sea una empresa operativa, un family office o un holding.',
    // Descriptor 2026 (el Centro no mandó uno 2027); las fechas 2027 salen del Calendario Académico.
    hora: '15:00 a 18:30 h',
    detalle: detalle({
      modulos: ['Navegando la transición', 'Piloto al timón', 'La cabina de mando', 'El compás estratégico', 'Liderando la tripulación', 'Dónde está el copiloto'],
      docentes: {
        nota: AVISO_CAMBIOS,
        personas: [
          ['Gonzalo Jiménez Seminario', 'Doctor in Governance, University of Liverpool; MBA, PONTS Paris-Tech; economista y Master en Finanzas, Universidad de Chile, y primer Luksic-Rockefeller Scholar en Harvard University. Fundador y CEO de Proteus Management & Governance, con más de 30 años de experiencia. Ha sido director en los holdings de las familias Koster, Pirazzoli y von Appen y del grupo familiar Fashion\'s Park. Profesor adjunto de Estrategia, Organización e Innovación en la UC y académico del MBA UC.'],
        ],
      },
      objetivos: {
        texto: 'Identificar y desarrollar las competencias directivas y estratégicas que necesitan los miembros de directorios de empresas familiares para ejercer un liderazgo eficaz, fortalecer la gobernanza y favorecer una gestión sostenible del legado familiar, con colaboración entre generaciones. En particular:',
        lista: ['Comprender y analizar los principios de gobernanza corporativa y familiar, y el rol y las funciones del directorio, desde una perspectiva institucional, social y estratégica.', 'Fortalecer habilidades de alta dirección, negociación y manejo de conflictos en el directorio, para deliberar con información y decidir en tiempo real.', 'Diseñar y aplicar herramientas de resiliencia, innovación y flexibilidad para liderar procesos de sucesión y enfrentar escenarios inciertos, aprovechando las ventajas propias de las empresas familiares, sus family offices y holdings.'],
      },
      metodologia: {
        lista: ['Aprendizaje basado en problemas: desafíos y dilemas reales de empresas familiares, family offices y holdings.', 'Role playing y simulaciones: situaciones críticas, como una crisis en el directorio, para decidir bajo presión y ejercitar la negociación.', 'Grupos de discusión sobre dilemas estratégicos de directorios y familias empresarias.', '«Effectuation Critical Action Learning»: espacios para cuestionar supuestos y diseñar y probar cursos de acción sobre la propia realidad de cada participante.'],
      },
      aprobacion: {
        texto: ['El curso no tiene evaluaciones: se aprueba con un mínimo de 75 % de asistencia a las sesiones.', 'Quienes aprueben reciben un certificado de asistencia digital otorgado por la Pontificia Universidad Católica de Chile.'],
      },
      admision: {
        texto: 'Envía estos documentos a la coordinadora de admisión del programa:',
        lista: ['Currículum vitae actualizado', 'Copia de la cédula de identidad por ambos lados'],
        nota: `Vacantes: 30. ${SIN_CUPOS}`,
        enlace: RETIROS,
      },
    }),
  },
  {
    slug: 'claves-decisiones-financieras',
    tipo: 'Curso',
    titulo: 'Claves para la toma de decisiones financieras en Directorios',
    frase: 'Conocimientos financieros sólidos para que directores y directoras tomen decisiones informadas y responsables que lideren el crecimiento de la organización.',
    // Fechas y horario: Calendario Académico 2027 (Sara, 09-11): tres miércoles, 6, 13 y 20 de octubre, de 9:00 a 13:30.
    // Sin descriptor: el detalle sigue pendiente.
    versiones: [{ inicio: '2027-10-06', termino: '2027-10-20', dia: 'Miércoles' }],
    hora: '9:00 a 13:30 h',
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
    horario: !v.length ? 'Por confirmar' : [...new Set(v.map((x) => x.dia))].join(' o ') + ' · ' + (p.hora ?? 'horario por confirmar'),
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
  contenidos: ['El quehacer de un director/a', 'Las responsabilidades de un director/a', 'Responsabilidad penal de la persona jurídica', 'Buen gobierno corporativo', 'Estrategia y control de gestión corporativo', 'Sustentabilidad y criterios ESG', 'Gestión de riesgos', 'Un directorio efectivo'],
  // El contacto de In Company es el WhatsApp del Centro (P1-21) y el correo de Sara (P1-19).
  coordinacion: { titulo: '¿Quieres un programa para tu directorio?', persona: `${sara.nombre} · ${sara.cargo}`, correo: sara.correo },
  whatsappTema: 'programa In Company para Directorios',
  imagen: '/img/programas/in-company.jpg',
};

export const getPrograma = (slug) => programas.find((p) => p.slug === slug);
