// Servicios v5 (propuesta «Dirección»). Contenido del Centro: «Asesoría Estratégica a Directorios», el Word que mandó
// Sara el 19-11 cuando le preguntamos qué era «Investigación aplicada». Ordena la página (Mateo, 19-11):
//   portada (bajada = introducción del Word) · 01 Qué hacemos (sus tres líneas; la tercera es In Company) ·
//   02 Nuestro enfoque (sus cuatro puntos y el cierre) · 03 banda Empresas Socias (sin cambios).
// «Investigación aplicada» sale: era propuesta del estudio con el brochure 2026 de Full Funnel y Sara no la incluye.
// Textos del Word tal cual; solo «con qué capacidades cuenta» pasa a «cuentan» (concuerda con «los directorios»).
// Siguen de Full Funnel: la cifra +500 (brochure 2026, lámina 9) y la banda Empresas Socias (láminas 9 y 11).
// En WordPress: página Servicios con campos (portada, servicios repetibles, enfoque repetible, banda).
import { whatsapp } from './sitio.js';

// Opción del formulario «Más información» (la solicitud llega a Sara con este nombre).
export const asesoria = { slug: 'asesoria-directorios', titulo: 'Asesoría estratégica a directorios' };
const masInformacion = `/formacion/mas-informacion/?programa=${asesoria.slug}`;

export const portada = {
  antetitulo: 'Servicios',
  titular: { claro: 'Asesoría y formación', enfasis: ['a la medida de', 'tu directorio'] },
  bajada: 'El Centro de Gobierno Corporativo UC acompaña a los directorios a revisar cómo están funcionando, con qué capacidades cuentan y cómo están tomando decisiones. Ofrecemos asesoría especializada, independiente y confidencial, con el objetivo de fortalecer su efectividad y su aporte estratégico a la organización.',
  // Metadescripción: la primera frase (la bajada completa pasa de 160 caracteres).
  descripcion: 'El Centro de Gobierno Corporativo UC acompaña a los directorios a revisar cómo están funcionando, con qué capacidades cuentan y cómo están tomando decisiones.',
  cta: { label: 'Más información', // Sara, 19-11 (antes «Hablemos»)
    href: masInformacion },
  whatsapp: { label: 'Escríbenos por WhatsApp', href: whatsapp.url() },
  foto: { src: '/img/v5/servicios/panel-debate.jpg', alt: 'Panel de conversación en un debate organizado por el Centro, frente al público' },
  cifra: { cifra: '+500', etiqueta: 'personas en actividades con líderes empresariales' },
};

export const ofrecemos = {
  indice: '01',
  antetitulo: 'Qué hacemos',
  titular: { claro: 'Asesoría estratégica', enfasis: 'a directorios' },
};

// fondo: marca (azul 2727) · azul (#173F8A) · noche (#03122E). Mismo orden de tonos que las piezas de Full Funnel.
export const servicios = [
  {
    n: '01', fondo: 'marca', titulo: 'Evaluación de desempeño del directorio',
    texto: 'Analizamos el funcionamiento del directorio en su conjunto y de cada uno de sus miembros, identificando fortalezas, brechas y oportunidades de mejora. El proceso combina entrevistas, instrumentos estructurados y benchmarks, entregando recomendaciones claras y accionables.',
    accion: { label: 'Más información', href: masInformacion },
  },
  {
    n: '02', fondo: 'azul', titulo: 'Composición, renovación y sucesión',
    texto: 'Apoyamos a los directorios en la definición de perfiles y planes de sucesión, alineados con la estrategia, los riesgos y los desafíos futuros del negocio, promoviendo una composición equilibrada de competencias, experiencia y trayectorias.',
    accion: { label: 'Más información', href: masInformacion },
  },
  {
    n: '03', fondo: 'noche', titulo: 'Fortalecimiento de capacidades del directorio',
    texto: 'Diseñamos programas In Company a la medida para fortalecer el juicio y la toma de decisiones del directorio en materias clave como deberes fiduciarios, ética, sostenibilidad, innovación, inteligencia artificial, geopolítica y riesgos emergentes.',
    accion: { label: 'Ver In Company', href: '/formacion/in-company/' },
  },
];

export const enfoque = {
  indice: '02',
  antetitulo: 'Nuestro enfoque',
  titular: { claro: 'Un socio estratégico', enfasis: 'para tu directorio' },
  texto: 'El Centro de Gobierno Corporativo UC es un socio estratégico para directorios que buscan elevar su estándar de gobernanza y fortalecer la sostenibilidad de largo plazo de sus organizaciones.',
  puntos: [
    'Asesorías a medida, no soluciones estándar.',
    'Independencia académica y ausencia de conflictos de interés.',
    'Confidencialidad absoluta.',
    'Conocimiento profundo del marco regulatorio y del contexto chileno.',
  ],
};

// Mateo, 03-11: Empresas Socias no es tarjeta (se repetía con la banda); la banda lleva el 03 con su número grande.
export const banda = {
  n: '03',
  // Espacios que no cortan: «CGC UC:» y «para Chile» no se separan al pasar de línea (en móvil quedaba «UC:» suelto).
  titular: { claro: 'Empresas Socias CGC UC:', enfasis: 'una mejor Alta Dirección para Chile' },
  texto: 'Para ampliar una mejor Alta Dirección para Chile. ¿Te interesa? Hablemos por WhatsApp.',
  accion: { label: 'Hablemos por WhatsApp', href: whatsapp.url('modelo de Empresas Socias') },
};
