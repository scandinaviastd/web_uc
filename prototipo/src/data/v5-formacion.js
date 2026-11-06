// Formación v5 · propuesta «Dirección» (Mateo, 03-11): una puerta por grupo y una subpágina «Programas abiertos».
// Todo lo que muestra sale de programas.js (Calendario Académico 2027 del Centro): nada de este archivo se escribe a mano
// salvo los titulares. En WordPress: página «Formación» + plantilla «Programas abiertos» que leen el CPT programa.
import { programas, inCompany, descuentos, condicionesDescuentos } from './programas.js';
import { sara } from './sitio.js';

const MES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
export const MESES = MES;
const ANIO = 2027;
const ms = (iso) => { const [a, m, d] = iso.split('-').map(Number); return Date.UTC(a, m - 1, d); };
const INICIO_ANIO = ms(`${ANIO}-01-01`);
const DIAS_ANIO = (ms(`${ANIO + 1}-01-01`) - INICIO_ANIO) / 86400000;
// Posición en el año, de 0 a 100 (para dibujar las barras del calendario)
const enAnio = (iso) => Math.round(((ms(iso) - INICIO_ANIO) / 86400000 / DIAS_ANIO) * 10000) / 100;
const corta = (iso) => { const [, m, d] = iso.split('-').map(Number); return `${d} ${MES[m - 1]}`; };
const semanas = (v) => Math.round((ms(v.termino) - ms(v.inicio)) / 86400000 / 7);
const href = (p) => `/formacion/${p.slug}/`;

// Orden: el diplomado primero y después los cursos por fecha de inicio (los sin fecha al final)
const primerInicio = (p) => p.versiones[0]?.inicio ?? '9999';
export const ordenados = [...programas].sort((a, b) => (a.tipo === b.tipo ? primerInicio(a).localeCompare(primerInicio(b)) : a.tipo === 'Diplomado' ? -1 : 1));
export const diplomados = ordenados.filter((p) => p.tipo === 'Diplomado');
export const cursos = ordenados.filter((p) => p.tipo === 'Curso');

// Todas las versiones con fecha, en orden cronológico (próximos inicios de la puerta Formación)
export const inicios = programas
  .flatMap((p) => p.versiones.map((v, i) => ({ p, v, i, total: p.versiones.length })))
  .sort((a, b) => a.v.inicio.localeCompare(b.v.inicio));

const nombres = ['', 'un', 'dos', 'tres', 'cuatro', 'cinco'];
const cuenta = (n, uno, varios) => (n === 1 ? `${nombres[1]} ${uno}` : `${nombres[n] ?? n} ${varios}`);
export const resumenOferta = `${cuenta(diplomados.length, 'diplomado', 'diplomados')} y ${cuenta(cursos.length, 'curso', 'cursos')}`;

// ---------- Calendario 2027: una fila por programa; cada versión es un segmento de la barra de dirección ----------
export const calendario = {
  anio: ANIO,
  desde: inicios[0] && corta(inicios[0].v.inicio),
  hasta: inicios.length && corta(inicios.map((x) => x.v.termino).sort().at(-1)),
  filas: ordenados.map((p) => ({
    p, href: href(p),
    segmentos: p.versiones.map((v, i) => ({
      izq: enAnio(v.inicio), ancho: Math.max(enAnio(v.termino) - enAnio(v.inicio), 1.2),
      nombre: p.versiones.length > 1 ? `Versión ${i + 1}` : null,
      version: p.versiones.length > 1 ? i + 1 : null, // v1 en azul 2727, v2 en azul #173F8A (Sara, 05-11)
      texto: `${v.dia} · ${corta(v.inicio)} – ${corta(v.termino)}`,
    })),
  })),
};

// Temporada de la puerta «Programas abiertos»: una sola barra blanca desde el mes del primer inicio hasta el fin del mes
// del último término (Sara, 05-11: «de abril a noviembre, cuando parten y terminan nuestros cursos»).
const mesDe = (iso) => Number(iso.slice(5, 7));
const finDeMes = (m) => (m === 12 ? `${ANIO + 1}-01-01` : `${ANIO}-${String(m + 1).padStart(2, '0')}-01`);
const mIni = inicios.length ? mesDe(inicios[0].v.inicio) : 1;
const mFin = inicios.length ? mesDe(inicios.map((x) => x.v.termino).sort().at(-1)) : 12;
const tIzq = enAnio(`${ANIO}-${String(mIni).padStart(2, '0')}-01`);
export const temporada = { izq: tIzq, ancho: Math.round((enAnio(finDeMes(mFin)) - tIzq) * 100) / 100, desde: MES[mIni - 1], hasta: MES[mFin - 1] };

// ---------- Comparador ----------
const durac = (p) => (!p.versiones.length ? 'Por confirmar' : [...new Set(p.versiones.map(semanas))].map((n) => `${n} semanas`).join(' / '));
const iniciosDe = (p) => (!p.versiones.length ? 'Por confirmar' : p.versiones.map((v) => corta(v.inicio)).join(' y '));
const dias = (p) => (!p.versiones.length ? 'Por confirmar' : [...new Set(p.versiones.map((v) => v.dia))].join(' o '));
export const comparar = {
  programas: ordenados.map((p) => ({ titulo: p.titulo, tipo: p.tipo, href: href(p) })),
  filas: [
    ['Inicio', ordenados.map(iniciosDe)],
    ['Duración', ordenados.map(durac)],
    ['Día de clases', ordenados.map(dias)],
    ['Modalidad', ordenados.map((p) => p.modalidad)],
    ['Valor', ordenados.map((p) => p.valor)],
    ['Para quién', ordenados.map((p) => p.dirigido)],
  ],
};

// ---------- Descuentos: la tabla única de programas.js ----------
const pct = (s) => parseInt(s, 10);
// Sin cifra protagonista (Sara, 05-11: «pocos son los funcionarios que toman nuestros cursos»): solo la tabla.
export const descuentosV5 = {
  filas: descuentos.map(([quien, cuanto]) => ({ quien, cuanto: `${pct(cuanto)} %` })),
  condiciones: condicionesDescuentos, // las tres reglas oficiales (Sara, 06-11)
};

// ---------- Textos ----------
export const portadaFormacion = {
  titular: { claro: 'Formación en', enfasis: 'gobierno corporativo' },
  bajada: 'Formación para directores, ejecutivos y organizaciones que buscan fortalecer su gobierno corporativo.',
};

export const puertas = [
  {
    n: '01', fondo: 'marca', titulo: 'Programas abiertos', href: '/formacion/programas-abiertos/',
    texto: `${resumenOferta[0].toUpperCase()}${resumenOferta.slice(1)} 2027 para directores y ejecutivos.`,
    enlace: 'Ver programas abiertos',
  },
  {
    n: '02', fondo: 'noche', titulo: 'Programas para empresas', href: '/formacion/in-company/',
    texto: inCompany.frase, etiqueta: inCompany.estado,
    enlace: 'Conoce In Company',
  },
];

export const portadaAbiertos = {
  antetitulo: 'Programas abiertos',
  titular: { claro: 'Diplomado y cursos 2027', enfasis: 'para directores y ejecutivos' },
  bajada: `${resumenOferta[0].toUpperCase()}${resumenOferta.slice(1)} del Centro, todos en modalidad híbrida. Mira el año completo, compáralos y elige el tuyo.`,
  foto: { src: '/img/v5/ficha/diplomado-clase.jpg', alt: 'Profesor explicando frente a la pizarra en una clase del Diplomado' },
  cifra: { cifra: String(inicios.length), etiqueta: 'inicios con fecha en el Calendario Académico 2027' },
};

// Banda «¿Tienes dudas?»: solo el WhatsApp del Centro (Sara, 05-11), sin correo ni teléfono.
export const contacto = { nombre: sara.nombre, cargo: sara.cargo };
