// Home v5 (propuesta «Dirección», rama propuesta-v5). Contenidos propios de la home; programas y eventos se
// referencian desde programas.js y contenidos.js (un dato, un dueño). Espejo: Figma UC_CGC, frames 452:2 y 461:446.
// En WordPress: campos de la portada (ACF de la página de inicio).
import { eventos } from './contenidos.js';

// Cifras del Centro: brochure 2026 de Full Funnel (láminas 3, 6 y 9). Tamaño Cifra a validar con la DED.
// etiquetaMovil: versión corta del Figma móvil (461:446).
export const cifraPortada = { cifra: '+45', etiqueta: 'académicos UC y líderes empresariales en las aulas', etiquetaMovil: 'académicos UC y líderes empresariales' };
export const cifrasCentro = [
  { cifra: '10', etiqueta: 'programas para la Alta Dirección' },
  { cifra: '+45', etiqueta: 'académicos UC y líderes empresariales' },
  { cifra: '+200', etiqueta: 'personas en la Jornada Anual de Gobierno Corporativo', etiquetaMovil: 'personas en la Jornada Anual' },
  { cifra: '+350', etiqueta: 'personas en los webinars con AFP Cuprum' },
];

// Provisorio (P1-05): descripción del diplomado armada desde el brochure 2026 (lámina 3); la frase final la escribe el Centro.
export const descripcionDiplomado = 'Formación útil y al día para la Alta Dirección: gobierno corporativo y rol del directorio, decisiones estratégicas y financieras, compliance y sostenibilidad.';
// Orden de los cursos en la home (Figma v5)
export const ordenCursos = ['formando-nuevos-directores', 'claves-decisiones-financieras', 'empresas-familiares'];

// Cita: brochure 2026 de Full Funnel, lámina 5.
export const citaPortada = {
  cita: 'La formación en gobierno corporativo no es unidireccional: debe tener una parte de gestión o estrategia, pero también entender de temas regulatorios o legales.',
  nombre: 'Matías Zegers',
  cargo: 'Presidente del Directorio, Centro de Gobierno Corporativo UC',
};

// Estudio «Mapa académico» (perfil académico de los directores IPSA).
export const cifrasEstudio = [
  { cifra: '60 %', etiqueta: 'de los directores IPSA estudió Ingeniería Comercial o Ingeniería Civil', fondo: 'marca' },
  { cifra: '66 %', etiqueta: 'de los pregrados se concentra en la PUC y la Universidad de Chile' },
  { cifra: '79 %', etiqueta: 'de los posgrados se realizó en el extranjero' },
];

// Eventos de la home. Provisorio: títulos y metadatos del Figma v5 (el título exacto lo confirma el Centro);
// fecha, estado y enlace salen del pool de eventos de contenidos.js.
const HOY = new Date().toISOString().slice(0, 10);
const deEvento = (buscar, figma) => {
  const e = eventos.find(buscar);
  return { ...figma, href: e?.url ?? '/extension/#eventos', fechaLarga: e?.fechaLarga, estado: e && e.orden < HOY ? 'realizado' : 'proximo' };
};
export const eventosHome = [
  deEvento((e) => e.fecha === '2026-11-04', { dia: '04', mes: 'NOV', tipo: 'Webinar', titulo: 'Webinars Asuntos de la Alta Dirección, con AFP Cuprum', meta: 'Ciclo de webinars para la Alta Dirección · Online' }),
  deEvento((e) => e.socio === 'BH Compliance', { dia: 'DIC', mes: '2026', tipo: 'Debate', titulo: 'Debates de Gobierno Corporativo, con BH Compliance', meta: 'Debate · fecha por confirmar' }),
  deEvento((e) => e.fecha === '2026-05-06', { dia: '06', mes: 'MAY', tipo: 'Webinar', titulo: 'Interlocking: el estándar exigido por la Corte Suprema', meta: 'Webinars Asuntos de la Alta Dirección, con AFP Cuprum · 6 de mayo de 2026' }),
];

// Fotos reales del banco de Full Funnel (28-10). Licencia y autorización de imagen: por confirmar con Clara.
export const fotos = {
  portada: { src: '/img/v5/home/clase-diplomado.jpg', alt: 'Profesor frente a la pizarra en una clase del Diplomado en Gobierno Corporativo' },
  voz: { src: '/img/v5/home/alumnos-diplomado.jpg', alt: 'Alumnos atentos en una clase del Diplomado en Gobierno Corporativo' },
  eventos: [
    { src: '/img/v5/home/jornada-publico.jpg', alt: 'Público aplaudiendo en la Jornada de Gobierno Corporativo' },
    { src: '/img/v5/home/debate-panel.jpg', alt: 'Panel de expositores en un debate de Gobierno Corporativo' },
    { src: '/img/v5/home/jornada-grupo.jpg', alt: 'Expositoras de la Jornada de Gobierno Corporativo frente al escenario' },
  ],
};
