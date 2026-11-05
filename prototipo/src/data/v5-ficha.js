// Propuesta v5 (rama propuesta-v5): datos de presentación de la ficha de programa que no están en programas.js.
// En WordPress serían campos del CPT «programa»: titular en dos líneas (la segunda en negrita) y foto de portada.
// Espejo: Figma UC_CGC, «Ficha Diplomado v5 · propuesta Dirección» (466:1222) y su versión móvil (469:1698).

// Foto de portada: banco de Full Funnel (clases reales del Centro). Los cursos dejaron la foto de stock (Sara, 05-11):
// UC-30 (Formando nuevos directores), UC-9 (Empresas familiares) y UC-5 (Claves), de «Fotógrafo en Diplomado».
export const portadaV5 = {
  'diplomado-gobierno-corporativo': {
    titular: ['Diplomado en', 'Gobierno Corporativo'],
    foto: '/img/v5/ficha/diplomado-clase.jpg',
    alt: 'Profesor explica un esquema en la pizarra durante una clase del Diplomado en Gobierno Corporativo',
    foco: '25% 50%',
  },
  'formando-nuevos-directores': {
    titular: ['Formando nuevos', 'directores de empresas'],
    foto: '/img/v5/ficha/formando-nuevos-directores.jpg',
    alt: 'Un participante comenta durante una clase del Centro, sentado entre sus compañeros',
    foco: '55% 50%',
  },
  'empresas-familiares': {
    titular: ['Gobierno corporativo de', 'empresas familiares y family office'],
    foto: '/img/v5/ficha/empresas-familiares.jpg',
    alt: 'Una participante escucha con atención durante una clase del Centro, con sus lentes en la mano',
    foco: '45% 50%',
  },
  'claves-decisiones-financieras': {
    titular: ['Claves para la toma de', 'decisiones financieras en Directorios'],
    foto: '/img/v5/ficha/claves-decisiones-financieras.jpg',
    alt: 'Un participante trabaja en su computador durante una clase del Centro',
    foco: '40% 50%',
  },
};

// «Siete módulos / del diplomado»: el número sale de la lista de módulos.
const NUMERO = ['Cero', 'Un', 'Dos', 'Tres', 'Cuatro', 'Cinco', 'Seis', 'Siete', 'Ocho', 'Nueve', 'Diez', 'Once', 'Doce'];
export const titularModulos = (n, tipo) => [`${NUMERO[n] ?? n} módulo${n === 1 ? '' : 's'}`, `del ${tipo.toLowerCase()}`];

// Etiqueta cian de la portada, a partir del estado calculado por fecha (R-03).
export const etiquetaEstado = (p) => {
  const anio = p.versiones?.[0]?.inicio.slice(0, 4);
  if (p.estado === 'Próximamente' && anio) return `Postulación ${anio} · próximamente`;
  return p.estado;
};
