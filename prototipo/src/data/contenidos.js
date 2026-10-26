import { sara } from './sitio.js';

// Fotos de perfil 1:1 (800 px) en public/img/personas/. Directorio: banco editado del 29-09 (webp, fondo celeste
// parejo). Quien no tiene foto muestra el avatar con iniciales del Kit (nota de diseño: "nunca un hueco").
const FOTOS = {
  'Matías Zegers': 'matias-zegers.webp', 'Álvaro Bustos': 'alvaro-bustos.webp', 'Roberto Guerrero': 'roberto-guerrero.webp',
  'Enrique Alcalde': 'enrique-alcalde.webp', 'Marta del Sante': 'marta-del-sante.webp', 'Luis Hernán Paúl': 'luis-hernan-paul.webp',
  'Eduardo Walker': 'eduardo-walker.webp', 'Teresita María Tagle': 'teresita-maria-tagle.webp',
  // Equipo ejecutivo (Alejandra Wood, Sara Marambio): sin foto hasta que el Centro entregue fotos con el mismo
  // encuadre y fondo que el Directorio (P1-10); se muestra el avatar con iniciales.
};
export const fotoDe = (nombre = '') => {
  const k = Object.keys(FOTOS).find((n) => nombre.trim().startsWith(n));
  return k ? `/img/personas/${FOTOS[k]}` : undefined;
};
export const inicialesDe = (nombre = '') => nombre.split(' ').filter(Boolean).slice(0, 2).map((s) => s[0]).join('').toUpperCase();

// Contenidos tomados del sitio actual del Centro. Fuente de cada imagen: docs/imagenes-prototipo.md
// En WordPress cada bloque es un CPT (o posts con categoría) con estos mismos campos.
// Noticias y Newsletters viven en Extensión (P1-02, 26-10); el Home muestra las últimas.

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

// Resúmenes de actividades (antes «Diálogo», en Informes y Opinión del sitio actual): van en Prensa (26-10).
// El PDF se descarga del sitio actual hasta que el Centro lo suba al panel de WordPress.
const PDF_DIALOGO = 'https://centrogobiernocorporativo.uc.cl/informes-y-opinion/dialogo/';
export const resumenes = [
  { anio: '2024', titulo: 'Seminario «Inteligencia artificial y directorios: ¿estamos preparados?» (CGC UC y Forvis Mazars)', pdf: '113-seminario-cgc-uc-forvis-mazars-nov24' },
  { anio: '2024', titulo: 'Desayuno de directores: «Estrategia y ASG, claves del futuro empresarial»', pdf: '109-seminario-estrategia-y-asg-claves-del-futuro-empresarial' },
  { anio: '2023', titulo: 'II Ciclo de Encuentros de Directores CGC UC y Deloitte: riesgos emergentes', pdf: '105-ii-ciclo-de-encuentros-de-directores-2023' },
  { anio: '2023', titulo: 'Encuentro de presidentes y directores ejecutivos de ONG: buen gobierno de fundaciones y corporaciones (CGC UC y Deloitte)', pdf: '99-encuentro-fundaciones-y-corporaciones' },
  { anio: '2023', titulo: 'Desayuno de directores: primeros resultados de la NCG 461, lo que queda pendiente para los directorios', pdf: '97-primeros-resultados-de-la-ncg-461-lo-que-queda-pendiente-en-los-directorios' },
  { anio: '2023', titulo: 'Webinar «Directorios y nueva normativa de delitos económicos y medioambientales»', pdf: '95-webinar-delitos-economicos' },
  { anio: '2023', titulo: 'Ciclo de Encuentros de Directores CGC UC y Deloitte: ciberseguridad, los principales focos de atención del directorio', pdf: '91-encuentro-ciberseguridad-deloitte-formato-cgc-uc-v02' },
  { anio: '2023', titulo: 'Desayuno de directores: agenda 2023', pdf: '89-informes-cgc-desayuno-abril-2023' },
  { anio: undefined, titulo: 'Conversando sobre inversiones de impacto', pdf: '83-conversando-sobre-inversiones-de-impacto' },
  { anio: '2021', titulo: 'Informe Transformación del Directorio 2021 producto del Covid-19: cambios, amenazas y oportunidades', pdf: '73-informe-transformacio-n-del-directorio-2021-producto-del-covid-19-cambios-amenazas-y-oportunidades' },
].map((r) => ({ ...r, tipo: 'Resumen', href: `${PDF_DIALOGO}${r.pdf}/file` }));

// ---------- Eventos ----------
// Un solo pool (minuta 07-09 §5). En WordPress: CPT "evento" con fecha ISO y tipo. Próximos y realizados se separan
// solos según la fecha de hoy. Sin fecha exacta: «fechaTexto» (y «mes» si se sabe, para ordenarlo); no entra al calendario.
// «Diálogo» deja de ser tipo de evento: sus resúmenes pasan a Prensa (26-10).
export const tiposEvento = ['Seminario', 'Webinar', 'Workshop', 'Debate', 'Charla', 'Desayuno', 'Jornada'];

const eventosBase = [
  // Próximos: calendario del Centro (P1-08, 26-10)
  { fecha: '2026-11-04', tipo: 'Webinar', titulo: 'Webinar CGC UC y Cuprum: envejecimiento poblacional', hora: '08:30 – 09:15', lugar: 'Online', socio: 'Cuprum', imagen: '/img/eventos/webinar-cuprum-2026.jpg' },
  { fecha: null, mes: '2026-12', fechaTexto: 'Primera semana de diciembre', tipo: 'Debate', titulo: 'Debate de Gobierno Corporativo con BH Compliance', hora: 'Por confirmar', lugar: 'Sede por confirmar', socio: 'BH Compliance', nota: 'Fecha exacta, hora y moderadores por confirmar.', imagen: '/img/eventos/debate-bh-compliance-2026.jpg' },
  { fecha: null, fechaTexto: 'Fecha por confirmar', tipo: 'Desayuno', titulo: 'Desayuno de directores con Forvis Mazars', hora: 'Por confirmar', lugar: 'Por confirmar', socio: 'Forvis Mazars', imagen: '/img/eventos/desayuno-forvis-mazars-2026.jpg' },
  // Realizados
  { fecha: '2026-07-08', tipo: 'Debate', titulo: 'Ciclo Debates de Gobierno Corporativo: tensiones, desafíos y responsabilidades', imagen: '/img/eventos/debate-julio-2026.jpg' },
  { fecha: '2026-06-11', tipo: 'Jornada', titulo: 'Jornada Gobierno Corporativo 2026', imagen: '/img/eventos/jornada-gobierno-corporativo-2026.jpg' },
  { fecha: '2026-05-06', tipo: 'Webinar', titulo: 'Ciclo de webinars "Asuntos de la Alta Dirección": Interlocking, el estándar de la CMF', imagen: '/img/eventos/webinar-interlocking-2026.jpg' },
  { fecha: '2026-04-22', tipo: 'Webinar', titulo: 'Ciclo de webinars "Asuntos de la Alta Dirección": Responsabilidad de directores', imagen: '/img/eventos/webinar-responsabilidad-directores-2026.jpg' },
  { fecha: '2026-04-08', tipo: 'Debate', titulo: 'Ciclo Debates de Gobierno Corporativo: sesión de abril', imagen: '/img/eventos/ciclo-debates-abril-2026.jpg' },
  { fecha: '2026-01-20', tipo: 'Seminario', titulo: 'Seminario: buenas prácticas de gobierno corporativo para fundaciones', imagen: '/img/eventos/seminario-fundaciones-2026.jpg' },
  { fecha: '2025-12-10', tipo: 'Webinar', titulo: 'Webinar: nueva ley de delitos económicos y gobierno corporativo', imagen: '/img/eventos/webinar-delitos-economicos-2025.jpg' },
  { fecha: '2025-11-26', tipo: 'Jornada', titulo: 'Jornada Gobierno Corporativo 2025', imagen: '/img/eventos/jornada-gobierno-corporativo-2025.jpg' },
];

const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const MESES_CORTOS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
// Formatos de fecha derivados del campo ISO (nunca se escriben a mano).
export const fechaEvento = (iso) => {
  const [a, m, d] = iso.split('-').map(Number);
  return { dia: String(d), mes: MESES_CORTOS[m - 1].toUpperCase(), larga: `${d} de ${MESES[m - 1]} de ${a}`, corta: `${d} - ${MESES_CORTOS[m - 1]} - ${a}` };
};
const slugDe = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const HOY = new Date().toISOString().slice(0, 10);
export const eventos = eventosBase.map((e) => {
  const anio = (e.fecha ?? e.mes ?? HOY).slice(0, 4);
  const slug = `${slugDe(e.titulo)}${e.titulo.includes(anio) ? '' : `-${anio}`}`;
  return {
    ...e,
    id: slug,
    url: `/extension/eventos/${slug}/`,
    orden: e.fecha ?? (e.mes ? `${e.mes}-01` : '9999-12-31'),
    fechaCorta: e.fecha ? fechaEvento(e.fecha).corta : e.fechaTexto,
    fechaLarga: e.fecha ? fechaEvento(e.fecha).larga : e.fechaTexto,
  };
});
export const eventosProximos = eventos.filter((e) => e.orden >= HOY).sort((a, b) => a.orden.localeCompare(b.orden));
export const eventosRealizados = eventos.filter((e) => e.orden < HOY).sort((a, b) => b.orden.localeCompare(a.orden));
export const getEvento = (slug) => eventos.find((e) => e.id === slug);

// Accesos a las secciones de Investigación (Home y landing de Investigación): un solo lugar para el texto.
export const accesosInvestigacion = [
  { titulo: 'Red de Investigación', bajada: 'Profesores afiliados al Centro.', href: '/investigacion/red/' },
  { titulo: 'Artículos y Working Papers', bajada: 'Papers y artículos académicos, con su abstract.', href: '/investigacion/articulos-y-working-papers/' },
  { titulo: 'Estudios', bajada: 'Informes y estudios del CGC UC para descargar.', href: '/investigacion/estudios/' },
];

// ---------- Artículos y Working Papers (antes "Documentos de Trabajo") ----------
// Los 18 documentos del sitio actual. Título como aparece allí; autores, publicación y abstract tomados del PDF
// (P1-14, 26-10: la cita se completa a medida que lleguen documentos nuevos). PDF: sitio actual.
const PDF_DOC = 'https://centrogobiernocorporativo.uc.cl/investigacion/documentos-de-trabajo/';
export const articulos = [
  { tipo: 'Artículo', anio: '2026', titulo: 'Conflictos entre socios y parálisis orgánica en las sociedades cerradas: tipología y arquitectura de remedios', autores: 'Alcalde Rodríguez, E.', publicacion: 'Actualidad Jurídica, n.° 54, julio 2026, Universidad del Desarrollo', pdf: '143-conflictos-entre-socios-y-paralisis-organica-en-las-sociedades-cerradas-tipologia-y-arquitectura-de-remedios',
    abstract: 'El trabajo examina dos materias interrelacionadas del derecho societario: los conflictos entre socios o accionistas y los mecanismos de resolución del bloqueo en las sociedades cerradas. En su primera parte, se sintetizan los conflictos típicos entre accionistas mayoritarios y minoritarios y las principales doctrinas que el derecho comparado ha elaborado para reprimir las conductas abusivas de unos y otros, proponiéndose una distinción –fundada en el art. 30 de la Ley de Sociedades Anónimas– entre la colisión del interés individual con el interés social y la colisión entre los intereses particulares de las distintas facciones de accionistas. En su segunda parte, se aborda el «bloqueo» (corporate deadlock) como patología estructural de las sociedades cerradas, ofreciéndose un catálogo escalonado de mecanismos destinados a superarlo, así como los diversos remedios judiciales para resolver el conflicto, concluyendo con cuatro principios rectores del diseño antibloqueo.' },
  { tipo: 'Working paper', anio: '2025', titulo: 'The dynamics of CEO-COB roles: internal and external governance mechanisms influencing duality or separation', autores: 'Mejía-Amaya, A. F.; Pombo, C.; López-Iturriaga, F. J.', publicacion: 'Documento de trabajo, septiembre 2025', pdf: '131-the-dynamics-of-ceo-cob-roles-internal-and-external-governance-mechanisms-influencing-duality-or-separation',
    abstract: 'This study investigates the persistence of CEO–Chair duality in listed firms despite regulatory recommendations. Using an international sample of 4,600 firms across 37 countries over the period 2012–2021, we estimate the determinants of CEO–Chair separation. The results show that ownership concentration, independent directors, executive compensation policies, market performance, and regulatory quality positively influence separation. Sales growth exhibits an inverted U-shaped effect. Conversely, efficiency, financial performance, firm age, and firm size negatively predict separation. At the country level, common law systems, GDP per capita, and power distance are associated with a higher likelihood of duality. Finally, efficiency also shows an inverted U-shaped relationship, whereby higher levels of efficiency increase the likelihood of separation.' },
  { tipo: 'Artículo', anio: '2025', titulo: 'Executive compensation: the trend toward one-size-fits-all', autores: 'Cabezón, F.', publicacion: 'Journal of Accounting and Economics, vol. 79', pdf: '139-executive-compensation-the-trend-toward-one-size-fits-all-1',
    abstract: 'I report and analyze a recent "one-size-fits-all" trend in the structure of executive compensation plans. Since 2006, 24% of the variation in the distribution of CEO compensation across pay components — salary, bonus, stock awards, options, non-equity incentives, pensions, and perquisites — disappeared. This uniformity might come at the expense of optimal incentives, as increases in pay structure similarity translate into lower shareholder value. Using panel data regressions and plausibly exogenous shocks, I find that institutional investors\' influence, proxy advisors\' recommendations, and expanded compensation disclosure are salient drivers of this standardization. The findings highlight an unintended consequence of recent regulations enhancing shareholders\' participation and expanding compensation disclosure.' },
  { tipo: 'Artículo', anio: '2025', titulo: 'Political connections of executives and directors', autores: 'Mejía-Amaya, A. F.; Pombo, C.', publicacion: 'Quarterly Review of Economics and Finance, vol. 103', pdf: '137-political-connections-of-executives-and-directors' },
  { tipo: 'Artículo', anio: '2025', titulo: 'Supervisory arbitrage and real effects', autores: 'Beck, T.; Silva-Buston, C.; Wagner, W.', publicacion: 'Journal of Corporate Finance', pdf: '129-2025-paper-consuelo-silva-supervisory-arbitrage-and-real-effects',
    abstract: 'We examine the effects of cross-border supervisory arbitrage on corporate lending and firm performance. We show that subsidiaries of banking groups improve loan conditions for firms when the group\'s opportunities to take risks in other countries are curbed. The expansion in lending is targeted towards firms of higher quality and firms that the group is already familiar with. The improved lending conditions have positive real effects, allowing recipient firms to increase capital spending and leading to higher profits. Taken together, our results suggest that there can be benefits for firms in countries that receive lending inflows due to the supervisory arbitrage.' },
  { tipo: 'Artículo', anio: '2025', titulo: 'The effects of audit firm rotations and retentions: an event study in Chile', autores: 'Aninat, A.; Bustos, Á.; Riutort, J.', publicacion: 'European Journal of Law and Economics', pdf: '133-the-effects-of-audit-firm-rotations-and-retentions',
    abstract: 'We study markets\' reactions towards securities issued by firms that announce an external auditor\'s retention instead of an external auditor\'s rotation. We focus on differences in reactions to announcements when markets are stable versus when markets are convulsed. We carry out an event study of publicly traded Chilean companies (100% of the non-financial component of the main Chilean Stock Indexes) that announced a rotation or retention from 2004 to 2019. In the period 2009 to 2012, two major corporate scandals significantly affected Chilean financial markets. We find that, during the period without scandals, the market reacted more positively when a company announced a retention instead of a rotation of its auditor, however, during the period with scandals, the market reacted more positively when a company announced a rotation instead of a retention of its auditor.' },
  { tipo: 'Artículo', anio: '2025', titulo: '¿Avances inducidos por autorregulación en prácticas de gobierno corporativo? Efectos en Chile al término de la NCG 385', autores: 'Walker Hitschfeld, E.; Zegers Ruiz-Tagle, M.; Novoa Tonda, F. S.', publicacion: 'Revista Chilena de Derecho, vol. 52, n.° 3, pp. 1-42', pdf: '127-avances-inducidos-por-autorregulacion-en-practicas-de-gobierno-corporativo-efectos-en-chile-al-termino-de-la-ncg-385',
    abstract: 'Continuando el análisis de Godoy, Walker y Zegers del año 2018, se analiza la norma NCG 385, sucesora de la NCG 341, verificando niveles de adopción y evolución de las prácticas para 88 emisores. Se mide su impacto, clasificando las respuestas en 3 zonas según sus niveles iniciales y finales de adopción. También se realiza un análisis cualitativo de respuestas textuales seleccionadas. Las respuestas son heterogéneas con respecto a la NCG 341, con una tendencia significativa en la adopción de prácticas sustantivas sobre gestión y control de riesgos y relacionadas a ESG (Environmental, Social & Governance). Con todo, se observan ciertos niveles de repetición y estandarización, sugiriendo cumplimientos formales y cierta divergencia con respecto a la visión del regulador.' },
  { tipo: 'Working paper', anio: '2024', titulo: 'International banking and cross-border supervisory cooperation: lessons from Latin America', autores: 'Silva-Buston, C.; Ossandon Busch, M.; Wagner, W.', publicacion: 'Documento de trabajo', pdf: '135-international-banking-and-cross-border-supervisory-cooperation',
    abstract: 'This paper examines banking supervisory cooperation in Latin America and the Caribbean, revealing widespread formal agreements between countries. While these agreements generally cover key banking linkages, we identify significant disparities in cooperation coverage between countries. Some countries, despite having numerous agreements, face a limited coverage due to their banking groups\' extensive international operations. The study introduces metrics to identify home countries with a high risk exposure due to cooperation gaps with foreign banks\' home countries as well as countries most exposed to risk-shifts by domestic banks with operations abroad.' },
  { tipo: 'Working paper', anio: '2022', titulo: 'The ‘CorE’ dynamics of corporate soft-regulation: theory and evidence', autores: 'Bustos, Á.; Walker, E.', publicacion: 'Documento de trabajo, abril 2022', pdf: '81-the-core-dynamics-of-corporate-soft-regulation-theory-and-evidence',
    abstract: 'Using elements from the rational and institutional theories we formulate a simple model that describes, at the firm level, the evolution of compliance of corporate governance practices regulated by comply or explain standards. We show that, under the assumptions of our model, the level of compliance of a practice evolves as a diffusion process that converges to the practice efficacy level. Speed of convergence depends on the preregulation compliance level, efficacy level and expected loss prevented by the practice. This speed reduces monotonically with time. We find that Chilean data fits the model with high significance. We find evidence that levels of efficacy and expected losses are different when we gather practices in 1) functioning and composition of the board; 2) relations of the firm with shareholders and others or; 3) risk management and control.' },
  { tipo: 'Working paper', anio: '2021', titulo: 'Shareholder liability and bank failure', autores: 'Aldunate, F.; Jenter, D.; Korteweg, A.; Koudijs, P.', publicacion: 'Documento de trabajo, junio 2021', pdf: '59-shareholder-liability-and-bank-failure',
    abstract: 'Does enhanced shareholder liability reduce bank failure? We compare the performance of around 4,200 state-regulated banks of similar size in neighboring U.S. states with different liability regimes during the Great Depression. The distress rate of limited liability banks was 29% higher than that of banks with enhanced liability. Results are robust to a diff-in-diff analysis incorporating nationally-regulated banks (which faced the same regulations everywhere) and are not driven by other differences in state regulations, Fed membership, local characteristics, or differential selection into state-regulated banks. Our results suggest that exposing shareholders to more downside risk can successfully reduce bank failure.' },
  { tipo: 'Working paper', anio: '2020', titulo: 'The effects of audit firm rotation: an event study in Chile', autores: 'Aninat, A.; Bustos, Á.; Riutort, J.', publicacion: 'Documento de trabajo, enero 2020', pdf: '55-the-effects-of-audit-firm-rotation-an-event-study-in-chile',
    abstract: 'In order to determine market reaction to an unanticipated audit firm change we carry out an event study of 69 publicly traded Chilean companies (100% of the nonfinancial component of the main Chilean Stock Index: IPSA) from 2004 to 2013. We find that the market reacted positively when a company announced the retention of its audit firm for a given year. We rule out possible bias in the informational content of the event. Our result suggests that overall, the costs associated with a company\'s audit firm change (startup costs and know how losses) overshadow the benefits of this change (a reduction in the probability of a value destroying event such as fraud or error). We discuss the implications of this result for the potential implementation of mandatory audit firm rotation in an emerging country such as Chile.' },
  { tipo: 'Working paper', anio: '2020', titulo: 'Las memorias corporativas como herramientas de relationship management a través de la confianza', autores: 'Labarca, C.; De Simone, L.', publicacion: 'Documento de trabajo', pdf: '53-las-memorias-corporativas-como-herramientas-de-relationship-management-a-traves-de-la-confianza',
    abstract: 'Las memorias corporativas tienen como mandato informar anualmente la situación financiera de una empresa a sus accionistas. Sin embargo, este artículo plantea que se han convertido en un instrumento de vinculación que desborda el ámbito del relacionamiento del Gobierno Corporativo con los inversionistas y su estatus de mero producto comunicacional. A través de un análisis cualitativo y comparativo se estudian los casos de dos empresas chilenas: Metro S.A. y Mall Plaza S.A. Utilizando la metodología de análisis de discurso, se explicita cómo dichas empresas se apropian de tendencias que agregan valor a la gestión del gobierno corporativo frente a sus principales stakeholders. Específicamente, se trabaja la confianza como uno de los valores fundamentales que debe guiar dicho relacionamiento.' },
  { tipo: 'Working paper', anio: '2016', titulo: 'Combate contra la corrupción internacional y enfoque en América Latina', autores: 'Epstein, E.', publicacion: 'Rock Center for Corporate Governance, Stanford, Working Paper n.° 218, mayo 2016', pdf: '51-combate-contra-la-corrupcion-internacional-y-enfoque-en-america-latina',
    abstract: 'This article focuses on the Foreign Corrupt Practices Act ("FCPA"), its application in Latin America, and the Department of Justice\'s ("DOJ") new one-year pilot program, announced on April 5, 2016, to encourage companies to self-report violations of FCPA and to cooperate with the DOJ\'s Fraud Section. Using data from the newly launched Foreign Corrupt Practices Act Clearinghouse at Stanford Law School, we take a look at enforcement actions from the DOJ and the SEC involving Latin America for the period 2006-2016, showing that there are 54 cases involving FCPA violations in the region, mostly originating from Mexico (12), Argentina (10), Venezuela (8) and Brazil (8). The cases are distributed in 12 different countries in the region.' },
  { tipo: 'Artículo', anio: '2016', titulo: 'No news is good news: voluntary disclosure in the face of litigation', autores: 'Marinovic, I.; Varas, F.', publicacion: 'RAND Journal of Economics, vol. 47, n.° 4, pp. 822-856', pdf: '47-no-news-is-good-news-voluntary-disclosure-in-the-face-of-litigation',
    abstract: 'We study disclosure dynamics when the firm value evolves stochastically over time. The presence of litigation risk, arising from the failure to disclose unfavorable information, crowds out positive disclosures. Litigation risk mitigates firms\' tendency to use inefficient disclosure policies. From a policy perspective, we show that a stricter legal environment may be an efficient way to stimulate information transmission in capital markets, particularly when the nature of information is proprietary. We model the endogeneity of litigation risk in a dynamic setting and shed light on the empirical controversy regarding whether disclosure preempts or triggers litigation.' },
  { tipo: 'Working paper', anio: '2015', titulo: 'Evidencia internacional sobre la relación entre la regulación de transferencias y los beneficios privados del control', autores: 'Jurfest, P.; Riutort, J.', publicacion: 'Documento de trabajo, abril 2015', pdf: '49-evidencia-internacional-sobre-la-relacion-entre-la-regulacion-de-transferencias-y-los-beneficios-privados-del-control',
    abstract: 'En este trabajo analizamos la evolución de la regulación de cambios de control en Europa y estudiamos cómo el movimiento desde sistemas basados en la regla de mercado a sistemas con reglas de igualdad de oportunidades va de la mano de una caída en los beneficios privados del control. Estimamos los beneficios privados del control siguiendo la metodología propuesta en Jurfest, Paredes y Riutort (2015) para una muestra de transacciones de cambio de control de empresas de 14 países de Europa en el periodo 1985-2014 y encontramos que los beneficios privados del control han caído aproximadamente en un 4% del valor del patrimonio después de la implementación de reglas de igualdad de oportunidades.' },
  { tipo: 'Working paper', anio: '2014', titulo: 'Corporate governance, business groups, and market value: time-series evidence from Turkey', autores: 'Ararat, M.; Black, B. S.; Yurtoglu, B. B.', publicacion: 'Documento de trabajo, junio 2014', pdf: '45-corporate-governance-business-groups-and-market-value-time-series-evidence-from-turkey',
    abstract: 'Business groups play a large, sometimes dominant economic role in many countries. A number of studies find an association between firm-level corporate governance and market value, but none study the role of business group identity in firm level corporate governance or the value of "group governance." We begin to fill that gap through a case study of Turkey. We study the corporate governance practices of Turkish business groups and listed firms from 2006 to 2012, relying on hand-collected data covering the vast majority of listed firms. We build a Turkey Corporate Governance Index (TCGI), composed of subindices for board structure, board procedure, disclosure, ownership, and shareholder rights. This index predicts higher market value (proxied by Tobin\'s q) at both the firm level and group level; the principal driver of this result is the disclosure subindex. We find large differences in the governance choices of different business groups.' },
  { tipo: 'Working paper', anio: '2014', titulo: 'The government as a large shareholder: impact on the voting premium', autores: 'Fernandes, M.; Novaes, W.', publicacion: 'Documento de trabajo, julio 2014', pdf: '43-the-government-as-a-large-shareholder-impact-on-the-voting-premium',
    abstract: 'The subprime crisis led to a wave of government interventions in the private sector that has been particularly strong in Europe and Latin America, where several governments are large shareholders in a variety of public firms. In a sense, the subprime crisis induced these governments to behave as active large shareholders. This paper uses a sample of public firms in Brazil to show that the government activism lowers the value of the minority shareholders\' voting rights. While the corporate governance literature usually associates lower voting premia with stronger protection of minority shareholders, we provide evidence that the government-induced decline in the value of voting rights harmed minority shareholders in Brazil.' },
  { tipo: 'Working paper', anio: undefined, titulo: 'Protección de accionistas minoritarios por directores independientes en Chile', autores: 'Salgado, M.', publicacion: 'Documento de trabajo', pdf: '41-proteccion-de-accionistas-minoritarios-por-directores-independientes-en-chile',
    abstract: 'El régimen de los directores independientes en las sociedades anónimas chilenas no incrementa el nivel de protección de los accionistas minoritarios. Los deberes y obligaciones de los directores independientes en el directorio son esencialmente los mismos que los de los directores no independientes. El grado de protección que pueda otorgar el comité de directores a los accionistas minoritarios no está determinado por la participación del director independiente. Si se suma a esto la forma cómo se distribuye el poder en nuestras sociedades anónimas y los incentivos para que éste se ejerza de determinada forma, podemos concluir que el director independiente no es una herramienta adecuada para otorgar protección a accionistas minoritarios frente a los eventuales abusos del controlador.' },
].map((d) => ({ ...d, href: `${PDF_DOC}${d.pdf}/file` }));

// ---------- Estudios (antes Informes) ----------
// Los 11 informes del sitio actual (P1-15, 26-10). Card: portada + título + descargar, autor "CGC UC" (minuta §4).
// Portada: imagen real de cada PDF en el marco 32:17; «true» = portada genérica mientras no se monta la real.
const PDF_INFORME = 'https://centrogobiernocorporativo.uc.cl/informes-y-opinion/informes/';
export const estudios = [
  { anio: '2026', titulo: 'Análisis Juntas de Accionistas IPSA 2026', portada: '/img/estudios/juntas-accionistas-ipsa-2026.jpg', pdf: '141-analisis-juntas-de-accionistas-ipsa-2026' },
  { anio: '2025', titulo: 'Informe CEOs y Directorio en Chile frente a la incertidumbre', portada: '/img/estudios/ceos-directorio-chile.jpg', pdf: '125-informe-ceos-y-directorio-en-chile' },
  { anio: '2024', titulo: 'Gobierno Corporativo y estrategias de inversión de impacto: Barrio 31, Buenos Aires', portada: '/img/estudios/barrio-31-buenos-aires.jpg', pdf: '111-gobierno-corporativo-y-estrategias-de-inversion-de-impacto-un-analisis-de-su-contribucion-al-desarrollo-sostenible-del-barrio-31-en-buenos-aires-argentina' },
  { anio: '2024', titulo: 'Algunas consideraciones del primer ejercicio de reporte bajo la NCG 461', portada: '/img/estudios/primer-ejercicio-ncg-461.jpg', pdf: '107-informe-abril-2024' },
  { anio: '2020', titulo: 'Diversidad de Género en la Alta Dirección de las Empresas en Chile', portada: '/img/estudios/diversidad-genero-alta-direccion.jpg', pdf: '39-diversidad-de-genero-en-la-alta-direccion-de-las-empresas-en-chile' },
  { anio: '2019', titulo: 'Comentarios CGC UC a la consulta normativa de la CMF (NCG 30)', portada: true, pdf: '37-comentarios-cgcuc-consulta-normativa-cmf-ncg-30' },
  { anio: '2019', titulo: 'Comités de Directores: preocupaciones, prácticas y desafíos', portada: true, pdf: '35-comites-de-directores-preocupaciones-practicas-y-desafios' },
  { anio: '2015', titulo: 'Comentarios CGC UC al proyecto normativo de la NCG 341', portada: true, pdf: '31-comentarios-cgcuc-proyecto-normativo-341' },
  { anio: '2015', titulo: 'Comentarios CGC UC a la revisión de los Principios de Gobierno Corporativo de la OCDE', portada: true, pdf: '29-comentarios-cgcuc-review-to-the-oecd-principles-cg' },
  { anio: undefined, titulo: 'Gobierno Corporativo en Latinoamérica', portada: true, pdf: '27-gobierno-corporativo-en-latinoamerica' },
  { anio: '2013', titulo: 'Informe CGC UC: resultados de la NCG 341', portada: true, pdf: '25-informe-cgcuc-resultados-ncg-341' },
].map((d) => ({ ...d, href: `${PDF_INFORME}${d.pdf}/file` }));

export const directorio = [
  ['Matías Zegers', 'Presidente del Directorio'], ['Álvaro Bustos', 'Director'], ['Roberto Guerrero', 'Director'], ['Enrique Alcalde', 'Director'],
  ['Marta del Sante', 'Directora'], ['Luis Hernán Paúl', 'Director'], ['Eduardo Walker', 'Director'], ['Teresita María Tagle', 'Directora'],
].map(([nombre, cargo]) => ({ nombre, cargo }));

// Equipo ejecutivo (26-10): Josefina Tocornal deja el Centro a fin de mes; su reemplazo aún no se define.
export const equipo = [
  { nombre: 'Alejandra Wood', cargo: 'Directora Ejecutiva', correo: 'awoodh@uc.cl', telefono: '+56 9 5504 2132' },
  { nombre: sara.nombre, cargo: sara.cargo, correo: sara.correo },
];

// Red de Investigación (26-10): solo profesores afiliados. Salen Consuelo Silva, Carlos Pombo y Teresita Tagle;
// sin investigadores ni ayudantes (Josefina Tocornal y Pablo Araya ya no van).
export const red = {
  'Profesores afiliados': ['Matías Zegers', 'Álvaro Bustos', 'Roberto Guerrero', 'Enrique Alcalde', 'Luis Hernán Paúl', 'Eduardo Walker'],
};

// Colaboradores (P1-17, 26-10): Forvis Mazars, Cuprum, Morales & Besa y LarrainVial. Logos de sus sitios oficiales;
// Morales & Besa se llama SCLB Abogados desde septiembre de 2026 (sclb.cl: «SCLB, antes Morales & Besa»).
export const colaboradores = [
  { nombre: 'Forvis Mazars', logo: '/img/colaboradores/forvis-mazars.svg' },
  { nombre: 'Cuprum AFP', logo: '/img/colaboradores/cuprum.png' },
  { nombre: 'SCLB Abogados (antes Morales & Besa)', logo: '/img/colaboradores/sclb.svg' },
  { nombre: 'LarrainVial', logo: '/img/colaboradores/larrainvial.svg' },
];
