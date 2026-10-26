// Datos globales del sitio. En WordPress: Customizer "Opciones Kit UC" + menú "uc-kit-navbar_nav".

// Contacto del Centro y WhatsApp. Un solo campo cada uno: footer, fichas, In Company, formularios y equipo los
// referencian desde acá. Los formularios (Más información y brochure) llegan al correo de Sara (P1-19, 26-10).
export const sara = { nombre: 'Sara Marambio', cargo: 'Coordinadora de Formación y Gestión', correo: 's.marambio.bunster@uc.cl' };

const WHATSAPP = '56954183811';
export const whatsapp = {
  numero: '+56 9 5418 3811',
  // Mensaje prellenado. Desde una ficha: «Hola, quisiera más información del Diplomado en Gobierno Corporativo».
  url: (tema) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(tema ? `Hola, quisiera más información del ${tema}` : 'Hola, quisiera más información')}`,
};

// Enlace tel: a partir del número tal como se muestra (en móvil abre el marcador).
export const telHref = (t = '') => `tel:${t.replace(/[^\d+]/g, '')}`;

export const sitio = {
  nombre: 'Centro UC Gobierno Corporativo',
  direccion: 'Rosario Norte 407, Piso -1. Las Condes - Chile.',
  unidad: 'Escuela de Administración UC',
  telefono: '(+56) 22354 2132',
  correo: 'centrocgc@uc.cl',
  whatsapp: `WhatsApp ${whatsapp.numero}`,
  whatsappUrl: whatsapp.url(),
  comoLlegar: 'https://maps.google.com/?q=Rosario+Norte+407+Las+Condes',
  politicaPrivacidad: '#politica-de-privacidad-uc',
  // Plazo de conservación de los datos de los formularios (P1-19, 26-10)
  plazoDatos: '12 meses',
  creditos: {
    disenoDesarrollo: { nombre: 'Scandinavia Studio', url: '#' },
    administradoPor: { nombre: 'Centro UC Gobierno Corporativo', url: '/' },
  },
};

// Menú principal (orden del 26-10): Inicio · Nosotros · Formación · Extensión · Investigación · Servicios.
// "hijos" = desplegable con footer (checklist UC crítico).
export const menu = [
  { id: 'inicio', label: 'Inicio', href: '/' },
  { id: 'nosotros', label: 'Nosotros', href: '/nosotros/' },
  {
    id: 'formacion', label: 'Formación', href: '/formacion/',
    hijos: [
      { label: 'Diplomados', href: '/formacion/#diplomados' },
      { label: 'Cursos', href: '/formacion/#cursos' },
      { label: 'Programas para empresas (In Company)', href: '/formacion/in-company/' },
    ],
  },
  {
    id: 'extension', label: 'Extensión', href: '/extension/',
    hijos: [
      { label: 'Eventos', href: '/extension/#eventos' },
      { label: 'Noticias', href: '/extension/#noticias' },
      { label: 'Newsletters', href: '/extension/#newsletters' },
      { label: 'Prensa', href: '/extension/prensa/' },
    ],
  },
  {
    id: 'investigacion', label: 'Investigación', href: '/investigacion/',
    hijos: [
      { label: 'Red de Investigación', href: '/investigacion/red/' },
      { label: 'Artículos y Working Papers', href: '/investigacion/articulos-y-working-papers/' },
      { label: 'Estudios', href: '/investigacion/estudios/' },
    ],
  },
  // Antes «Asesorías» (renombrada el 26-10); contenido por definir con el Centro (P1-01).
  { id: 'servicios', label: 'Servicios', href: '/servicios/' },
];
