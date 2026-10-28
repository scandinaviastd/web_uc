// Servicios v5 (propuesta «Dirección»). El contenido de Servicios sigue pendiente del Centro (P1-01):
// todo lo de este archivo es PROPUESTA DEL ESTUDIO A VALIDAR, armada con textos del brochure 2026 de Full Funnel
// (In Company: lámina 7 · investigación aplicada: lámina 12 · Empresas Socias: láminas 9 y 11 · cifra +500: lámina 9).
// Los tres servicios son candidatos: In Company (hoy en Formación), investigación por encargo (candidato del
// Sprint 1, «Fuera de alcance») y Empresas Socias. El Centro define cuáles van.
// En WordPress: página Servicios con campos (portada, servicios repetibles, banda).
import { whatsapp } from './sitio.js';

export const portada = {
  antetitulo: 'Servicios',
  titular: { claro: 'Asesoría y formación', enfasis: ['a la medida de', 'tu directorio'] },
  bajada: 'Diseñamos programas exclusivos para el directorio y la Alta Dirección de una empresa u organización, de acuerdo con sus intereses o necesidades específicas.',
  cta: { label: 'Hablemos', href: '/formacion/mas-informacion/?programa=in-company' },
  whatsapp: { label: 'Escríbenos por WhatsApp', href: whatsapp.url() },
  foto: { src: '/img/v5/servicios/panel-debate.jpg', alt: 'Panel de conversación en un debate organizado por el Centro, frente al público' },
  cifra: { cifra: '+500', etiqueta: 'personas en actividades con líderes empresariales' },
};

export const ofrecemos = {
  indice: '01',
  antetitulo: 'Lo que ofrecemos',
  titular: { claro: 'Tres formas de trabajar', enfasis: 'con el Centro' },
};

// fondo: marca (azul 2727) · azul (#173F8A) · noche (#03122E). Mismo orden de tonos que las piezas de Full Funnel.
export const servicios = [
  {
    n: '01', fondo: 'marca', titulo: 'Programas In Company',
    texto: 'Contenidos, duración y metodología se definen contigo en base a los requerimientos de gobierno corporativo de tu organización.',
    accion: { label: 'Solicitar una propuesta', href: '/formacion/in-company/' },
  },
  {
    n: '02', fondo: 'azul', titulo: 'Investigación aplicada',
    texto: 'Generamos conocimiento pionero en Chile sobre directorios, CEOs y Alta Dirección, conectando evidencia académica con la práctica empresarial.',
    accion: { label: 'Conversemos un estudio', href: whatsapp.url('servicio de investigación aplicada'), externo: true },
  },
  {
    n: '03', fondo: 'noche', titulo: 'Empresas Socias CGC UC',
    texto: 'El modelo de Empresas Socias impulsa la formación, la investigación y la incidencia en gobierno corporativo.',
    accion: { label: '¿Qué logras como Empresa Socia?', href: '#empresas-socias' },
  },
];

export const banda = {
  // Espacios que no cortan: «CGC UC:» y «para Chile» no se separan al pasar de línea (en móvil quedaba «UC:» suelto).
  titular: { claro: 'Empresas Socias CGC\u00a0UC:', enfasis: 'una mejor Alta Dirección para\u00a0Chile' },
  texto: 'Para ampliar una mejor Alta Dirección para Chile. ¿Te interesa? Hablemos por WhatsApp.',
  accion: { label: 'Hablemos por WhatsApp', href: whatsapp.url('modelo de Empresas Socias') },
};
