// Contenidos de ejemplo tomados del Figma Sprint 2.
// En WordPress cada bloque es un CPT (o posts con categoría) con estos mismos campos.

export const noticias = [
  { fecha: '17 - Jul - 2026', titulo: 'Forbes Chile participó del debate coorganizado por el CGC UC y BH Compliance' },
  { fecha: '11 - Jun - 2026', titulo: 'Jornada Gobierno Corporativo 2026' },
  { fecha: '12 - May - 2026', titulo: 'Bienvenidos al Diplomado en Gobierno Corporativo 2026' },
  { fecha: '08 - May - 2026', titulo: 'Estudio CGC UC: representación femenina en empresas IPSA' },
];

export const newsletters = [
  { fecha: '02 - Jul - 2026', titulo: 'El presidente del directorio también necesita ser supervisado' },
  { fecha: '28 - May - 2026', titulo: 'Ser director de una fundación ya no es un rol simbólico' },
  { fecha: '30 - Abr - 2026', titulo: 'La IA y nuevas exigencias de productividad' },
];

export const prensa = [
  { fecha: '28 - Abr - 2026', titulo: 'Las AFP ejerciendo su poder: qué observar', autor: 'Alejandra Wood Huidobro', autorFiltro: 'Alejandra Wood', cargo: 'Directora Ejecutiva CGC UC', medio: 'Diario Financiero' },
  { fecha: '24 - Abr - 2026', titulo: 'Gestión de tecnologIA: la prueba del directorio', autor: 'Luis Hernán Paúl', autorFiltro: 'Luis Hernán Paúl', cargo: 'Director CGC UC', medio: 'El Mercurio' },
  { fecha: '10 - Abr - 2026', titulo: 'Fallo de la Suprema: nuevo estándar para interlocking', autor: 'Roberto Guerrero', autorFiltro: 'Roberto Guerrero', cargo: 'Director CGC UC', medio: 'La Tercera' },
  { fecha: '27 - Mar - 2026', titulo: 'Disclosure no es gobernanza', autor: 'Alejandra Wood Huidobro', autorFiltro: 'Alejandra Wood', cargo: 'Directora Ejecutiva CGC UC', medio: 'Diario Financiero' },
  { fecha: '12 - Mar - 2026', titulo: 'Lo bueno, lo malo y lo feo de las juntas de accionistas 2026', autor: 'Matías Zegers', autorFiltro: 'Matías Zegers', cargo: 'Presidente CGC UC', medio: 'El Mercurio' },
  { fecha: '26 - Feb - 2026', titulo: 'Directores ante el nuevo gobierno: desafíos y oportunidades', autor: 'Luis Hernán Paúl', autorFiltro: 'Luis Hernán Paúl', cargo: 'Director CGC UC', medio: 'El Líbero' },
];

// Eventos: un solo pool (minuta 07-09 §5). fecha ISO para el calendario mensual.
export const eventosProximos = [
  { fecha: '2026-10-15', tipo: 'Debate', titulo: 'Ciclo Debates de Gobierno Corporativo: próxima sesión', hora: '18:30 – 20:00', lugar: 'Lugar por confirmar' },
  { fecha: '2026-10-28', tipo: 'Webinar', titulo: 'Ciclo de webinars "Asuntos de la Alta Dirección": próxima sesión', hora: '09:00 – 10:00', lugar: 'Online' },
  { fecha: '2026-11-12', tipo: 'Diálogo', titulo: 'Diálogo CGC UC: primeros resultados de la NCG 461', hora: 'Horario por confirmar', lugar: 'Lugar por confirmar' },
  { fecha: '2026-11-26', tipo: 'Jornada', titulo: 'Jornada Gobierno Corporativo 2026', hora: 'Horario por confirmar', lugar: 'Lugar por confirmar · Inscripción gratuita' },
];

export const eventosRealizados = [
  { tipo: 'Debate', fecha: '8 - Jul - 2026', titulo: 'Ciclo Debates de Gobierno Corporativo: tensiones, desafíos y responsabilidades' },
  { tipo: 'Webinar', fecha: '6 - May - 2026', titulo: 'Ciclo de webinars "Asuntos de la Alta Dirección": Interlocking, el estándar de la CMF' },
  { tipo: 'Webinar', fecha: '22 - Abr - 2026', titulo: 'Ciclo de webinars "Asuntos de la Alta Dirección": Responsabilidad de directores' },
  { tipo: 'Debate', fecha: 'Mar 2026', titulo: 'Ciclo Debates de Gobierno Corporativo: sesión anterior' },
  { tipo: 'Seminario', fecha: 'Ene 2026', titulo: 'Seminario: buenas prácticas de gobierno corporativo para fundaciones' },
  { tipo: 'Webinar', fecha: 'Dic 2025', titulo: 'Webinar: nueva ley de delitos económicos y gobierno corporativo' },
];

export const tiposEvento = ['Jornada', 'Seminario', 'Webinar', 'Diálogo', 'Debate'];

// Artículos y Working Papers (antes "Documentos de Trabajo").
export const articulos = [
  { tipo: 'Working paper', anio: '2025', titulo: 'The dynamics of CEO-COB roles: internal and external governance mechanisms influencing duality or separation', autores: 'Mejía-Amaya, A. F.; Pombo, C.; López-Iturriaga, F. J.', publicacion: 'Draft version, septiembre 2025' },
  { tipo: 'Artículo', anio: '2025', titulo: 'Executive compensation: the trend toward one-size-fits-all', autores: 'Cabezón, Felipe', publicacion: 'Journal of Accounting and Economics, vol. 79: pp. 1-23' },
  { tipo: 'Artículo', anio: '2025', titulo: 'Political connections of executives and directors: relevant facts to understand the impact of politicians on firm valuation', autores: 'Mejía-Amaya, A. F.; Pombo, C.', publicacion: 'Quarterly Review of Economics and Finance, vol. 103: pp. 1-15' },
  { tipo: 'Working paper', anio: '2024', titulo: 'International Banking and Cross-border Supervisory Cooperation: lessons from Latin America', autores: 'Silva-Buston, C.; Ossandon, M.; Wagner, W.', publicacion: 'Documento de trabajo, CGC UC' },
  { tipo: 'Working paper', anio: '2024', titulo: 'The effects of audit firm rotations and retentions', autores: 'Autor, Nombre', publicacion: 'Documento de trabajo, CGC UC' },
  { tipo: 'Working paper', anio: '2023', titulo: 'Título del documento de trabajo', autores: 'Autor, Nombre; Autor, Nombre', publicacion: 'Documento de trabajo, CGC UC' },
];

// Estudios (antes Informes). Card: portada + título + descargar, autor "CGC UC" (minuta §4).
export const estudios = [
  { anio: '2026', titulo: 'Análisis Juntas de Accionistas IPSA 2026' },
  { anio: '2025', titulo: 'Informe CEOs y Directorio en Chile frente a la incertidumbre' },
  { anio: '2024', titulo: 'Gobierno Corporativo y estrategias de inversión de impacto: Barrio 31, Buenos Aires' },
  { anio: '2024', titulo: 'Algunas consideraciones del primer ejercicio de reporte bajo la NCG 461' },
  { anio: '2023', titulo: 'Diversidad de Género en la Alta Dirección de las Empresas en Chile' },
  { anio: '2021', titulo: 'Informe Transformación del Directorio 2021 producto del Covid-19' },
];

export const directorio = [
  ['Matías Zegers', 'Presidente del Directorio'], ['Álvaro Bustos', 'Director'], ['Roberto Guerrero', 'Director'], ['Enrique Alcalde', 'Director'],
  ['Marta del Sante', 'Directora'], ['Luis Hernán Paúl', 'Director'], ['Eduardo Walker', 'Director'], ['Teresita María Tagle', 'Directora'],
].map(([nombre, cargo]) => ({ nombre, cargo }));

export const equipo = [
  { nombre: 'Alejandra Wood', cargo: 'Directora Ejecutiva', correo: 'awoodh@uc.cl', telefono: '+56 9 5504 2132' },
  { nombre: 'Sara Marambio', cargo: 'Coordinadora de formación y extensión', correo: '[correo por confirmar]' },
  { nombre: 'Josefina Tocornal', cargo: 'Coordinadora de investigación', correo: 'jtc@uc.cl' },
];

export const red = {
  'Profesores afiliados': ['Mauricio Larraín', 'Felipe Aldunate', 'Daniel Ferrés', 'Consuelo Silva', 'Carlos Pombo', 'Matías Zegers', 'Álvaro Bustos', 'Roberto Guerrero', 'Enrique Alcalde', 'Luis Hernán Paúl', 'Eduardo Walker', 'Teresita Tagle'],
  'Investigadores': ['Josefina Tocornal'],
  'Ayudantes de investigación': ['Pablo Araya'],
};

export const colaboradores = ['Cuprum AFP', 'mazars', 'Logo socio', 'Logo socio', 'Logo socio', 'Logo socio', 'Logo socio'];
