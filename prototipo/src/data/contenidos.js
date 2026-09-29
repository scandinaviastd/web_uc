// Fotos de perfil (carpeta fotos_perfil/, recortadas 1:1 a 800 px en public/img/personas/).
// Quien no tiene foto muestra el avatar con iniciales del Kit (nota de diseño: "nunca un hueco").
const FOTOS = {
  'Matías Zegers': 'matias-zegers', 'Álvaro Bustos': 'alvaro-bustos', 'Roberto Guerrero': 'roberto-guerrero',
  'Enrique Alcalde': 'enrique-alcalde', 'Marta del Sante': 'marta-del-sante', 'Luis Hernán Paúl': 'luis-hernan-paul',
  'Eduardo Walker': 'eduardo-walker', 'Teresita María Tagle': 'teresita-maria-tagle',
  'Alejandra Wood': 'alejandra-wood', // sitio actual; fondo oscuro distinto al resto (reemplazar con banco de imágenes)
  'Josefina Tocornal': 'josefina-tocornal', // recorte del flyer del webinar Cuprum (baja resolución: pedir original)
};
export const fotoDe = (nombre = '') => {
  const k = Object.keys(FOTOS).find((n) => nombre.trim().startsWith(n));
  return k ? `/img/personas/${FOTOS[k]}.jpg` : undefined;
};
export const inicialesDe = (nombre = '') => nombre.split(' ').filter(Boolean).slice(0, 2).map((s) => s[0]).join('').toUpperCase();

// Contenidos de ejemplo tomados del Figma Sprint 2. Fuente de cada imagen: docs/imagenes-prototipo.md
// En WordPress cada bloque es un CPT (o posts con categoría) con estos mismos campos.

export const noticias = [
  { fecha: '17 - Jul - 2026', titulo: 'Forbes Chile participó del debate coorganizado por el CGC UC y BH Compliance', imagen: '/img/noticias/forbes-debate-bh-compliance.jpg' },
  { fecha: '11 - Jun - 2026', titulo: 'Jornada Gobierno Corporativo 2026', imagen: '/img/noticias/jornada-gobierno-corporativo-2026.jpg' },
  { fecha: '12 - May - 2026', titulo: 'Bienvenidos al Diplomado en Gobierno Corporativo 2026', imagen: '/img/noticias/bienvenida-diplomado-2026.jpg' },
  { fecha: '08 - May - 2026', titulo: 'Estudio CGC UC: representación femenina en empresas IPSA', imagen: '/img/noticias/estudio-representacion-femenina-ipsa.jpg' },
];

export const newsletters = [
  { fecha: '02 - Jul - 2026', titulo: 'El presidente del directorio también necesita ser supervisado', imagen: '/img/newsletters/2026-07.jpg' },
  { fecha: '28 - May - 2026', titulo: 'Ser director de una fundación ya no es un rol simbólico', imagen: '/img/newsletters/2026-05-fundaciones.jpg' },
  { fecha: '30 - Abr - 2026', titulo: 'La IA y nuevas exigencias de productividad', imagen: '/img/newsletters/2026-04-ia-productividad.jpg' },
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
  { tipo: 'Debate', fecha: '8 - Jul - 2026', titulo: 'Ciclo Debates de Gobierno Corporativo: tensiones, desafíos y responsabilidades', imagen: '/img/eventos/debate-julio-2026.jpg' },
  { tipo: 'Webinar', fecha: '6 - May - 2026', titulo: 'Ciclo de webinars "Asuntos de la Alta Dirección": Interlocking, el estándar de la CMF', imagen: '/img/eventos/webinar-interlocking-2026.jpg' },
  { tipo: 'Webinar', fecha: '22 - Abr - 2026', titulo: 'Ciclo de webinars "Asuntos de la Alta Dirección": Responsabilidad de directores', imagen: '/img/eventos/webinar-responsabilidad-directores-2026.jpg' },
  { tipo: 'Debate', fecha: 'Abr 2026', titulo: 'Ciclo Debates de Gobierno Corporativo: sesión anterior', imagen: '/img/eventos/ciclo-debates-abril-2026.jpg' },
  { tipo: 'Seminario', fecha: 'Ene 2026', titulo: 'Seminario: buenas prácticas de gobierno corporativo para fundaciones', imagen: '/img/eventos/seminario-fundaciones-2026.jpg' },
  { tipo: 'Webinar', fecha: 'Dic 2025', titulo: 'Webinar: nueva ley de delitos económicos y gobierno corporativo', imagen: '/img/eventos/webinar-delitos-economicos-2025.jpg' },
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
  { anio: '2026', titulo: 'Análisis Juntas de Accionistas IPSA 2026', portada: '/img/estudios/juntas-accionistas-ipsa-2026.jpg' },
  { anio: '2025', titulo: 'Informe CEOs y Directorio en Chile frente a la incertidumbre', portada: '/img/estudios/ceos-directorio-chile.jpg' },
  { anio: '2024', titulo: 'Gobierno Corporativo y estrategias de inversión de impacto: Barrio 31, Buenos Aires', portada: '/img/estudios/barrio-31-buenos-aires.jpg' },
  { anio: '2024', titulo: 'Algunas consideraciones del primer ejercicio de reporte bajo la NCG 461', portada: '/img/estudios/primer-ejercicio-ncg-461.jpg' },
  { anio: '2023', titulo: 'Diversidad de Género en la Alta Dirección de las Empresas en Chile', portada: '/img/estudios/diversidad-genero-alta-direccion.jpg' },
  { anio: '2021', titulo: 'Informe Transformación del Directorio 2021 producto del Covid-19', portada: '/img/estudios/transformacion-directorio-2021.jpg' },
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

// Cuprum y Mazars: los que muestra el sitio actual. Deloitte, BH Compliance y ACAFI: coorganizan actividades
// con el Centro según su propio sitio; que figuren como colaboradores y el uso de sus logos está por confirmar (P1-17).
export const colaboradores = [
  { nombre: 'Cuprum AFP', logo: '/img/colaboradores/cuprum.png' },
  { nombre: 'Mazars', logo: '/img/colaboradores/mazars.jpg' },
  { nombre: 'Deloitte', logo: '/img/colaboradores/deloitte.svg', porConfirmar: true },
  { nombre: 'BH Compliance', logo: '/img/colaboradores/bh-compliance.png', porConfirmar: true },
  { nombre: 'ACAFI', logo: '/img/colaboradores/acafi.png', porConfirmar: true },
];
