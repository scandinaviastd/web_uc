# Revisión del Centro sobre Sprint 3 Desktop — 26-10-2026

Comentarios del Centro en las anotaciones del Figma (página «Sprint 3 Desktop») y comentarios sueltos, con lo que se
aplicó en el prototipo. Calendario 2027: `Calendario Académico 2027.xlsx` (hojas «Propuesta Calendario», «Propuesta
Cursos» y «Descuentos en programas»).

## Aplicado

| Anotación | Comentario del Centro | Qué se hizo |
|---|---|---|
| Extra | Orden del menú: Inicio, Nosotros, Formación, Extensión, Investigación y Asesorías | Menú en ese orden |
| Extra | Asesorías va al final y pasa a llamarse Servicios | `/asesorias/` → `/servicios/`; contenido sigue pendiente (P1-01) |
| V-02 | Sacar «formación a medida para directores»; usar «Diseñamos el programa según los desafíos de tu empresa» | Bloque In Company del Home y de Formación con ese texto |
| P1-02 | Noticias y Newsletters viven en Extensión | Extensión con anclas Eventos · Noticias · Newsletters · Prensa; «Ver todas» del Home lleva ahí; desplegable de Extensión en el menú |
| P1-08 | Jornada 2025: 26-nov; Jornada 2026: 11-jun; nada de 2027 | Ambas como eventos realizados; sale la Jornada «próxima» de ejemplo |
| P1-08 | Próximos: 4-nov webinar con Cuprum (8:30–9:15, envejecimiento poblacional); desayuno con Forvis Mazars (fecha por confirmar); debate con BH Compliance (primera semana de diciembre) | Son los 3 próximos eventos; salen los 7 de ejemplo. Los sin fecha exacta van en la lista, no en el calendario |
| P1-17 | Colaboradores: Forvis Mazars, Cuprum, Morales y Besa, LarrainVial | Logos oficiales en SVG; salen Deloitte, BH Compliance y ACAFI |
| P1-12 | Sara: Coordinadora de Formación y Gestión. Josefina se va | Cargo de Sara en todo el sitio (un solo campo) |
| P1-13 | Josefina se va a fin de mes | Sale del equipo ejecutivo |
| Extra | Quiénes somos: orden formación, extensión e investigación | Texto reordenado |
| Extra | «El origen del Centro» más grande | Título h2, cajas y pilares con texto e íconos mayores |
| Extra | Formación se ve vacía; cambiar layout (también In Company) | Diplomado e In Company en card horizontal a todo el ancho; cursos en fila de 3 |
| V-09 | Diplomado más grande, a todo el ancho | Ídem |
| R-03 | De acuerdo | Estado calculado por fecha: «Próximamente» hasta que se habilita la postulación, «Matrículas abiertas» con postulación, «Cerrado» cuando ya empezó; verde solo para matrículas abiertas |
| P1-04 | Excel con los programas | Diplomado: lunes, 3-may a 29-nov-2027. Formando nuevos directores: miércoles 14-abr a 2-jun y jueves 7-oct a 25-nov-2027. Governing: martes, 3-ago a 7-sep-2027. Claves: sin fecha (la hoja lo marca con «(?)») |
| P1-03 | «Postular» lleva a postular; si la versión 2027 no está habilitada, a un aviso | `/formacion/<programa>/postular/`: «Prontamente habilitaremos la postulación 2027», con «Quiero que me avisen» y WhatsApp. Con `postularUrl` va directo a la plataforma |
| V-03 | Más información y brochure recogen el contacto, con el detalle del curso | Ambos formularios llevan el programa (el brochure como campo oculto) |
| P1-19 | 12 meses; la información llega al correo de Sara | Cláusula: «se conservan por 12 meses». Destino documentado en el código para WordPress |
| Extra | Brochure: primero enviar los datos, después descargar | El botón «Enviar mis datos» da paso a «Descargar brochure» |
| Extra | WhatsApp con mensaje «Hola, quisiera más información del Diplomado en Gobierno Corporativo» (cada curso) | Mensaje por programa: «…del Diplomado…», «…del curso…», «…del programa In Company…» |
| P1-06 | Tabla de descuentos 30 / 20 / 15 % y 5 condiciones | Una sola tabla para todos los programas, con las condiciones bajo la tabla |
| P1-07 | Claves: 3 módulos | Contabilidad y análisis de estados financieros · Evaluación y financiamiento de proyectos · Finanzas corporativas |
| P1-07 | Governing: 6 módulos; profesor Gonzalo Jiménez | Módulos numerados y equipo docente |
| P1-21 | El contacto es el WhatsApp del Centro | In Company sin el celular de coordinación; WhatsApp y correo de Sara |
| P1-22 | No van los Fondos Concursables | Sin cambios (ya no estaban) |
| Extra | Profesores afiliados: salen Consuelo Silva, Carlos Pombo y Teresita Tagle | Quedan 6 |
| Extra | Investigadores: salen Josefina Tocornal y Pablo Araya | La Red queda solo con profesores afiliados |
| P1-14 | Texto breve: abstract. Cita: la del sitio antiguo, y se va completando | Los 18 documentos de trabajo del sitio actual, con autores, publicación y abstract plegable (tomados de cada PDF) |
| P1-15 | Los estudios están en el sitio oficial | Los 11 informes del sitio actual, con su PDF |
| P1-09 | Se elimina la Guía de buenas prácticas; «¿qué es Diálogo?» | Diálogo era la serie de 10 resúmenes en PDF de actividades del Centro (Informes y Opinión → Diálogo del sitio actual) |
| Extra | Diálogos van en Extensión con el nombre Prensa | Los 10 resúmenes van en Prensa («Resúmenes de actividades»); «Diálogo» deja de ser tipo de evento |
| Extra | Clic en un evento del calendario lleva al evento completo | Nueva página por evento (`/extension/eventos/<evento>/`) |
| Extra | Próximos: solo los 3 próximos, dicho en el copy | «Los 3 próximos eventos… En el calendario están todos» |
| Extra | Realizados: los últimos 3, dicho en el copy | Ídem; con un filtro de fecha se ven todos los que coinciden |
| Extra | En la búsqueda, programa o evento completo con su foto | Resultados de programas y eventos como card con foto |

## Para confirmar con el Centro

- **Morales & Besa** cambió de nombre en septiembre de 2026: hoy es **SCLB Abogados** (sclb.cl). Se usó ese logo.
- **Claves para decisiones financieras**: el Excel lo marca con «(?)». Queda publicado con «Fecha por confirmar».
- **Valores 2027**: el Excel no trae aranceles; siguen los de 2026.
- **Horarios**: el Excel trae días, no horas. Las fichas dicen «horario por confirmar».
- **URL de postulación** de cada programa (plataforma UC), para cuando se habilite la versión 2027.
- **Debate con BH Compliance**: se leyó «lugar: sede» como lugar por confirmar.
- **Prensa / Diálogos**: se interpretó que los resúmenes de Diálogo pasan a Prensa como «Resúmenes de actividades».

## Pendiente nuestro

- Portadas de 6 estudios (ver `docs/imagenes-prototipo.md`).
- Vistas móviles de Sprint 4.

## Dónde quedó

- Prototipo publicado (26-10): https://prototipo-jade-sigma.vercel.app
- Figma: página «Sprint 4 Desktop» (23 pantallas, guía arriba y anotaciones: verde aplicado, rosado por confirmar, rojo pendiente del Centro).
