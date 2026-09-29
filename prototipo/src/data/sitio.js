// Datos globales del sitio. En WordPress: Customizer "Opciones Kit UC" + menú "uc-kit-navbar_nav".

export const sitio = {
  nombre: 'Centro UC Gobierno Corporativo',
  direccion: 'Rosario Norte 407, Piso -1. Las Condes - Chile.',
  unidad: 'Escuela de Administración UC',
  telefono: '(+56) 22354 2132',
  correo: 'centrocgc@uc.cl',
  contacto: 'Contacto: Sara Marambio · [correo por confirmar]',
  whatsapp: 'WhatsApp +56 9 [número por confirmar]',
  whatsappUrl: '#whatsapp-por-confirmar',
  comoLlegar: 'https://maps.google.com/?q=Rosario+Norte+407+Las+Condes',
  politicaPrivacidad: '#politica-de-privacidad-uc',
  creditos: {
    disenoDesarrollo: { nombre: 'Scandinavia Studio', url: '#' },
    administradoPor: { nombre: 'Centro UC Gobierno Corporativo', url: '/' },
  },
};

// Menú principal (minuta 07-09 §1). "hijos" = desplegable con footer (checklist UC crítico).
export const menu = [
  { id: 'inicio', label: 'Inicio', href: '/' },
  { id: 'nosotros', label: 'Nosotros', href: '/nosotros/' },
  {
    id: 'formacion', label: 'Formación', href: '/formacion/',
    hijos: [
      { label: 'Programas abiertos', href: '/formacion/#programas-abiertos' },
      { label: 'Programas para empresas (In Company)', href: '/formacion/in-company/' },
    ],
  },
  { id: 'asesorias', label: 'Asesorías', href: '/asesorias/' },
  {
    id: 'investigacion', label: 'Investigación', href: '/investigacion/',
    hijos: [
      { label: 'Red de Investigación', href: '/investigacion/red/' },
      { label: 'Artículos y Working Papers', href: '/investigacion/articulos-y-working-papers/' },
      { label: 'Estudios', href: '/investigacion/estudios/' },
    ],
  },
  { id: 'extension', label: 'Extensión', href: '/extension/' },
];
