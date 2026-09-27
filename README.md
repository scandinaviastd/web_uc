# Sitio del Centro de Gobierno Corporativo UC

Sitio WordPress del Centro de Gobierno Corporativo de la Pontificia Universidad Católica, construido
sobre el Kit Digital oficial de la UC.

Este documento explica cómo está organizado el trabajo y cómo dejarlo andando. No asume experiencia
en desarrollo, pero sí que puedes copiar un comando en una terminal.

---

## Cómo trabajamos: ¿esto es online o es local?

Las dos cosas, y por eso confunde. Hay **dos capas** que funcionan al revés una de la otra.

**El código** — plantillas, estilos, diseño. Son archivos de texto. Viven en GitHub, en internet.
Esta capa **sí** es online y colaborativa.

**El sitio andando** — el WordPress con su base de datos: las páginas que escribes en el panel, los
textos, las imágenes que subes. Vive **solo dentro de tu computador**. No está en internet, no se
comparte, nunca.

Dicho corto: **colaboramos online sobre el código; el sitio corre local, una copia para cada uno.**
No hay un servidor compartido al que nos conectemos.

| Lo que pasa | ¿Lo ve el otro? |
|---|---|
| Mejoro una plantilla, hago `git push`, tú haces `git pull` | Sí |
| Cambio un color en el CSS y lo subo | Sí |
| Escribo una página nueva en mi panel de WordPress | No, nunca |
| Subo una foto desde el panel | No |

### Por qué está hecho así

Git sabe combinar dos ediciones de un archivo de texto: si tú cambias la línea 10 y yo la 40, las
junta sin problema. Una base de datos, en cambio, es un archivo binario enorme que cambia a cada
rato, y git no sabe fusionar dos bases de datos. No es una decisión de diseño: no se puede.

De ahí sale la regla más importante del proyecto:

> Si algo tiene que verse igual en las dos máquinas, tiene que estar en el código, no escrito a mano
> en el panel.

Y de ahí sale `seed.sh`. En vez de compartir la base de datos, compartimos un guion que la vuelve a
crear igual en cada computador. No viaja el contenido: viaja la instrucción para fabricarlo.

La consecuencia práctica: **el WordPress de tu computador es un borrador desechable.** Sirve para ver
cómo va quedando el diseño, no para acumular contenido. Si lo borras entero, se reconstruye en dos
comandos.

El contenido definitivo va después, en el sitio real, en un servidor de la Universidad. Eso se
coordina al final del proyecto.

### El sitio no está en internet

`localhost:8888` significa literalmente "esta máquina, puerta 8888". Nadie más puede abrir esa
dirección, ni yo. Si apagas el computador, el sitio se apaga. Nada de lo que hagas acá toca
servidores de la Universidad.

---

## Instalación

Se hace una vez. Unos 15 minutos, casi todo esperando descargas.

### Requisitos

| | Dónde | Para qué |
|---|---|---|
| **Docker Desktop** | [docker.com](https://www.docker.com/products/docker-desktop) | Corre WordPress y su base de datos en un espacio aislado, sin instalarlos en tu sistema |
| **Node.js** (LTS) | [nodejs.org](https://nodejs.org) | Trae la herramienta que enciende y apaga el sitio |
| **Git** | Suele venir en macOS. Si no: [git-scm.com](https://git-scm.com) | Sincroniza el código |

Docker tiene que estar **corriendo**, no solo instalado: se ve por el ícono de ballena en la barra
de menú. Ocupa un par de GB y consume batería mientras está activo.

### Por qué hace falta Docker

WordPress no es una aplicación que se abre. Es código que necesita tres cosas funcionando para
existir: un **servidor web** que reciba las visitas, **PHP** (el lenguaje en que WordPress está
escrito) y una **base de datos MySQL** donde se guardan las páginas. Sin esas tres corriendo, un
WordPress es una carpeta de archivos inertes.

Instalar las tres a mano es engorroso: chocan con otras versiones que ya tengas, hay que
configurarlas, y quedan corriendo en tu máquina para siempre. Docker las levanta juntas, en versiones
exactas, dentro de una caja cerrada que no toca el resto de tu sistema. Si borras la caja, no queda
rastro.

Vale decirlo: **Local también hacía eso.** Esa parte no es la ventaja de Docker. La ventaja es que
acá la descripción del entorno es un archivo de texto que viaja en el repositorio —`.wp-env.json`,
ocho líneas, donde dice que la versión de PHP es 8.2. Los dos leen el mismo archivo y los dos
terminan con PHP 8.2, sin conversarlo. Con Local, esa configuración la elegía cada uno en una
pantalla de la app, y nadie sabía qué había elegido el otro.

### Pasos

Clonar el proyecto y entrar en la carpeta:

```bash
git clone <URL-DEL-REPOSITORIO> cgc_uc_website
```

```bash
cd cgc_uc_website
```

Todos los comandos que siguen se ejecutan ahí dentro.

> El repositorio todavía no está subido — ver [Repositorio](#repositorio) al final. Si te pasaron
> una URL, es porque ya se resolvió.

Encender el sitio:

```bash
npx @wordpress/env start
```

La primera vez tarda unos 3 minutos descargando WordPress y MySQL, sin mostrar avance. Termina
diciendo `✔ Done!`.

Crear el contenido de prueba:

```bash
bash seed.sh
```

Esto configura la filiación marcaria, activa el tema y crea seis páginas, el menú y tres noticias.

### Verificar

- Sitio: http://localhost:8888
- Panel: http://localhost:8888/wp-admin — usuario `admin`, clave `password`

La clave es trivial porque el sitio no está expuesto a internet. No se reutiliza en ningún ambiente
real.

Deberías ver la barra superior de la UC, el logo, el menú con Quiénes somos, Investigación, Cursos,
Noticias y Contacto, y el pie institucional.

**Tres cosas que parecen errores y no lo son:**

- **La portada sale casi vacía.** Su contenido se arma con bloques desde el editor y todavía no hay
  ninguno.
- **El logo es el genérico de la UC.** Falta cargar el del Centro; está en los pendientes.
- **Un aviso que menciona `wpdb::prepare`** en el listado de noticias. Viene del Kit oficial y solo
  aparece en modo desarrollo. No se toca: es código espejo de la referencia que la UC audita.

---

## El día a día

| | |
|---|---|
| Encender | `npx @wordpress/env start` |
| Apagar | `npx @wordpress/env stop` |
| Volver a dejar el contenido de prueba como estaba | `bash seed.sh` |

Conviene apagar con `stop` al terminar, o Docker sigue consumiendo batería.

Para traer los cambios del otro:

```bash
git pull
```

Si el cambio es de estilos y no lo ves, refresca con **Cmd + Shift + R**. Es el origen de la mayoría
de los "no se actualizó".

Para subir los tuyos:

```bash
git add . && git commit -m "qué cambiaste" && git push
```

### Cómo no pisarse

Con dos personas basta repartirse por área, no por página: uno en plantillas (`.php`), el otro en
bloques (`src/`) y estilos. Los conflictos aparecen cuando los dos editan el mismo archivo a la vez.

---

## Trabajar con Claude Code

`CLAUDE.md`, en la raíz del proyecto, tiene las reglas: normas gráficas de la UC, qué se puede tocar,
qué componentes ya existen en el Kit. Claude Code lo lee solo en cada sesión.

Ábrelo en la carpeta del proyecto completo, no dentro de `cgc-uc`. Eso es lo que le permite encender
el sitio y verificar su propio trabajo, en vez de solo escribir archivos.

La regla al pedir: **tú decides el diseño, Claude lo construye.** Mientras más específico el pedido,
mejor el resultado.

| Vago | Preciso |
|---|---|
| "Diseña la sección de cursos" | "Haz la grilla de cursos con el bloque `block-items` variante `withImage`, 3 columnas en escritorio y 1 en móvil" |
| "Agrega un botón" | "Agrega el botón principal con las clases `uc-btn btn-primary`" |
| "Que se vea bien en celular" | "Usa las clases responsive del Kit (`col-md-*`), sin media queries nuevas" |

Antes de pedir algo nuevo, conviene preguntar si ya existe:

> Busca en `kit-uc/views/` si ya hay un componente para [lo que necesitas]. Si existe, dime cuál.

Casi siempre existe: el Kit trae tarjetas, acordeones, tablas, alertas, carruseles y banners.

### Las cuatro intocables

La Dirección de Experiencia Digital UC audita cuatro puntos, y cualquiera de ellos bloquea la
publicación: **el CSS del Kit, la grilla, los tamaños de tipografía, y el header y el footer.** Ahí
no se improvisa: se transcribe del Kit. Todo lo demás es territorio libre.

---

## Por qué cambiamos de flujo

El plan anterior era la app **Local** + Claude Code (su guía, `Guia_CGC_UC_Workflow.md`, quedó
archivada fuera del proyecto). El actual es **wp-env** + Claude Code. Los dos son locales, los dos usan
Claude Code, los dos usan Git. El cambio es más chico de lo que parece, pero mueve lo que importa.

### La diferencia de fondo

Con Local, el montaje era manual: crear el sitio, activar SSL, arrastrar dos carpetas a
`wp-content/themes`, activar el tema, elegir "Submarca" en el Customizer, crear el menú. Nueve pasos,
unos 40 minutos.

El problema no es que sea largo, es que no queda registrado. Si uno eligió Submarca y el otro se
saltó el paso, están viendo sitios distintos y no hay forma de notarlo. Un mes después, cuando algo
se ve mal en una máquina y bien en la otra, no hay dónde mirar.

Ahora esos pasos están en `seed.sh`: mismo comando, mismo resultado, las dos máquinas. Y como es un
archivo de texto, tiene historial.

| | Antes (Local) | Ahora (wp-env) |
|---|---|---|
| Instalar | 9 pasos manuales, ~40 min | 2 comandos, ~15 min |
| Recibir el tema | Un zip por enlace, arrastrado a mano a la carpeta correcta | Viene en el repositorio |
| Activar tema, marca y menú | A mano en el panel, cada uno | `bash seed.sh` |
| Contenido para evaluar el diseño | Ninguno: se partía con "Hello world!" | 6 páginas, menú y 3 noticias |
| Que los dos tengan lo mismo | Depende de que cada uno hiciera bien los 9 pasos | Es el mismo comando |
| Empezar de cero | Rehacer el sitio a mano | 3 comandos |
| Alcance de Claude Code | Escribir archivos del tema | Además: enciende el sitio, consulta WordPress, comprueba que las páginas respondan |
| Docker | No hace falta | Sí, y es pesado |

### Lo que realmente cambia

La penúltima fila. Antes Claude Code se abría apuntando solo a la carpeta del tema: escribía código
pero no podía comprobar nada — no encendía el sitio, no consultaba WordPress, no verificaba si una
página cargaba. Alguien tenía que ir a mirar a mano.

Un caso concreto de esta instalación: faltaba `page.php`, y sin ese archivo **todas las páginas se
renderizaban como la portada**. La guía anterior lo daba por normal ("Todas las páginas iguales →
falta escribir las plantillas"). No era eso: era un archivo faltante, y ya está resuelto. Se
encuentra cuando se puede verificar.

### Lo que se pierde

Docker hay que instalarlo, ocupa espacio y consume batería. Y hay que usar la terminal, aunque sean
cuatro comandos. Local se maneja con botones y no pide nada de eso.

Si el trabajo fuera cargar contenido en un sitio terminado, Local sería mejor. Para construirlo, no.

### Esto no es "la nube"

El sitio corre en tu computador, igual que con Local. Lo único que viaja por internet es el
repositorio, o sea el código.

---

## Pendientes

1. **Logo del Centro.** Hoy aparece el genérico de la UC. Se carga en *Apariencia → Personalizar →
   Opciones Kit UC*.
2. **Redes sociales** del footer: faltan las direcciones.
3. **Formulario de contacto:** hay que decidir el plugin.
4. **Contenido de la portada**, con bloques *Kit UC Sección* desde el editor.

---

## Problemas frecuentes

| | |
|---|---|
| `Cannot connect to Docker daemon` | Docker no está corriendo |
| `Please run the command 'npx @wordpress/env <command>' instead` | Escribiste `npx wp-env`. Son dos paquetes distintos con nombre parecido |
| Cambié algo y no lo veo | **Cmd + Shift + R** |
| Toqué algo en `src/` y no cambia nada | Falta compilar: `npm install` y `npm run start` dentro de `cgc-uc/` |
| El sitio no carga tras encenderlo | `npx @wordpress/env logs` |
| Aparece "Hello world!" en las noticias | `bash seed.sh` |
| Algo raro sin causa clara | `npx @wordpress/env stop` y `start` |
| Quiero descartar mis cambios | `git checkout .` |
| Quiero borrar el WordPress y partir limpio | `npx @wordpress/env destroy`, después `start` y `bash seed.sh`. Se pierde el contenido del panel, no el código |

Si nada resulta, abre Claude Code en la carpeta y pégale el error tal cual.

---

## Documentos

| | |
|---|---|
| `README.md` | Este. Flujo de trabajo e instalación |
| `SETUP_FLUJO_WORDPRESS.md` | Detalle técnico y las decisiones de arquitectura, con su justificación |
| `CLAUDE.md` | Reglas del proyecto, para Claude Code |

---

## Repositorio

**Solo local, por ahora.** El repositorio Git existe y tiene historial, pero no tiene remoto: no está
en GitHub ni en ningún servidor. Hasta que se decida subirlo, el `git clone` de la instalación no
funciona. Cuando se suba, crear el repositorio **privado** y agregarlo como remoto.

**Tiene que ser privado.** `kit-uc/` incluye credenciales de la UC escritas dentro del código, que en
un repositorio público quedarían expuestas. Si en algún momento se necesita que sea público, hay que
sacar `kit-uc/` del control de versiones y que cada persona lo obtenga por su cuenta — se pierde el
"clonar y está todo".

El uso del Kit debe informarse a la Dirección Digital UC (direcciondigital@uc.cl). Licencia:
CC BY-NC-ND 4.0.
