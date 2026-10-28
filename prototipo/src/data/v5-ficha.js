// Propuesta v5 (rama propuesta-v5): datos de presentación de la ficha de programa que no están en programas.js.
// En WordPress serían campos del CPT «programa»: titular en dos líneas (la segunda en negrita) y foto de portada.
// Espejo: Figma UC_CGC, «Ficha Diplomado v5 · propuesta Dirección» (466:1222) y su versión móvil (469:1698).

// Foto de portada: solo el Diplomado tiene foto del banco de Full Funnel en el Figma. Los cursos usan la imagen
// del programa (programas.js) hasta que se elija una del banco real (provisorio).
export const portadaV5 = {
  'diplomado-gobierno-corporativo': {
    titular: ['Diplomado en', 'Gobierno Corporativo'],
    foto: '/img/v5/ficha/diplomado-clase.jpg',
    alt: 'Profesor explica un esquema en la pizarra durante una clase del Diplomado en Gobierno Corporativo',
    foco: '25% 50%',
  },
  'formando-nuevos-directores': { titular: ['Formando nuevos', 'directores de empresas'] },
  'empresas-familiares': { titular: ['Gobierno corporativo de', 'empresas familiares y family office'] },
  'claves-decisiones-financieras': { titular: ['Claves para la toma de', 'decisiones financieras en Directorios'] },
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
