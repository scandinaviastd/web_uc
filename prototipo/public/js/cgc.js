/*
 * cgc.js — interacción propia del sitio (sin dependencias). El resto (menú, desplegables, carrusel, modal)
 * lo maneja uc-kitdigital.js del Kit. En WordPress: cgc-uc/assets/js/cgc.js.
 */
(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  // Listas con mensaje propio cuando los filtros (chips o calendario) no dejan nada visible
  var actualizarVacios = function (cont) {
    $$('[data-lista]', cont).forEach(function (l) {
      var vacio = l.nextElementSibling;
      if (vacio && vacio.hasAttribute('data-vacio')) vacio.hidden = !!l.querySelector('[data-item]:not(.is-oculto):not(.is-fuera-rango)');
    });
  };

  // Paginación real: muestra N items por página entre los que pasan los filtros (lista con data-paginar="N")
  var paginar = function (cont, pagina) {
    $$('[data-paginar]', cont).forEach(function (lista) {
      var n = +lista.getAttribute('data-paginar');
      var nav = $('[data-paginacion]', lista.parentElement);
      var items = $$('[data-item]', lista).filter(function (it) { return !it.classList.contains('is-oculto') && !it.classList.contains('is-fuera-rango'); });
      var total = Math.max(1, Math.ceil(items.length / n));
      var actual = Math.min(Math.max(1, pagina || +lista.getAttribute('data-pagina') || 1), total);
      lista.setAttribute('data-pagina', actual);
      $$('[data-item]', lista).forEach(function (it) { it.classList.remove('is-otra-pagina'); });
      items.forEach(function (it, i) { it.classList.toggle('is-otra-pagina', Math.floor(i / n) + 1 !== actual); });
      if (!nav) return;
      nav.hidden = total < 2;
      var pags = '';
      for (var p = 1; p <= total; p++) pags += '<li class="page-item' + (p === actual ? ' active' : '') + '"><a href="#" class="page-link" data-pag="' + p + '"' + (p === actual ? ' aria-current="page"' : '') + ' aria-label="Página ' + p + '">' + p + '</a></li>';
      $('.uc-pagination_pages', nav).innerHTML = pags;
      $('.uc-pagination_prev', nav).disabled = actual === 1;
      $('.uc-pagination_next', nav).disabled = actual === total;
      if (!nav.hasAttribute('data-listo')) {
        nav.setAttribute('data-listo', '');
        nav.addEventListener('click', function (ev) {
          var a = ev.target.closest('[data-pag]'), actualAhora = +lista.getAttribute('data-pagina'), destino = null;
          if (a) { ev.preventDefault(); destino = +a.getAttribute('data-pag'); }
          else if (ev.target.closest('.uc-pagination_prev')) destino = actualAhora - 1;
          else if (ev.target.closest('.uc-pagination_next')) destino = actualAhora + 1;
          if (destino === null) return;
          paginar(cont, destino);
          var arriba = lista.getBoundingClientRect().top;
          if (arriba < 0) window.scrollBy({ top: arriba - 120, behavior: 'smooth' });
        });
      }
    });
  };
  $$('[data-paginar]').forEach(function (l) { paginar(l.closest('[data-filtro]') || document, 1); });

  /* ---------- Filtros instantáneos (chips + buscador) ---------- */
  $$('[data-chips]').forEach(function (grupo) {
    var cont = grupo.closest('[data-filtro]') || document;
    var attr = grupo.getAttribute('data-atributo');
    var buscador = cont.querySelector('[data-buscar]');
    var contador = cont.querySelector('[data-contador]');
    var aplicar = function () {
      var activo = grupo.querySelector('.cgc-chip.is-active');
      var valor = activo ? activo.getAttribute('data-valor') : '*';
      var q = buscador ? buscador.value.trim().toLowerCase() : '';
      var visibles = 0;
      $$('[data-item]', cont).forEach(function (it) {
        var okChip = valor === '*' || it.getAttribute('data-' + attr) === valor;
        var okTexto = !q || (it.getAttribute('data-texto') || it.textContent.toLowerCase()).indexOf(q) !== -1;
        var ok = okChip && okTexto;
        it.classList.toggle('is-oculto', !ok);
        if (ok) visibles++;
      });
      actualizarVacios(cont);
      paginar(cont, 1);
      // el calendario también escucha el filtro de tipo
      document.dispatchEvent(new CustomEvent('cgc:filtro', { detail: { grupo: grupo.getAttribute('data-chips'), valor: valor } }));
      if (contador) {
        var total = contador.getAttribute('data-total');
        var palabra = contador.textContent.replace(/^[\d\s]+/, '').split(' ')[0] || 'resultados';
        contador.textContent = (valor === '*' && !q ? total : visibles) + ' ' + palabra;
      }
    };
    $$('.cgc-chip', grupo).forEach(function (chip) {
      chip.addEventListener('click', function () {
        $$('.cgc-chip', grupo).forEach(function (c) { c.classList.remove('is-active'); c.setAttribute('aria-pressed', 'false'); });
        chip.classList.add('is-active'); chip.setAttribute('aria-pressed', 'true');
        aplicar();
      });
    });
    if (buscador) buscador.addEventListener('input', aplicar);
  });

  /* ---------- Nosotros: ancla activa según la sección visible ---------- */
  var anclas = $('[data-anclas]');
  if (anclas && 'IntersectionObserver' in window) {
    var links = $$('a', anclas);
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) links.forEach(function (l) { l.classList.toggle('is-active', l.getAttribute('href') === '#' + e.target.id); });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    $$('[data-ancla-seccion]').forEach(function (s) { io.observe(s); });
  }

  /* ---------- Cinta de colaboradores: botón pausar ---------- */
  var mq = $('[data-marquee]'), mqBtn = $('[data-marquee-toggle]');
  if (mq && mqBtn) mqBtn.addEventListener('click', function () {
    var p = mq.classList.toggle('is-pausado');
    mqBtn.setAttribute('aria-pressed', String(p));
    mqBtn.innerHTML = p ? '<i class="uc-icon">play_arrow</i> Reanudar' : '<i class="uc-icon">pause</i> Pausar';
  });

  /* ---------- Calendarios de Extensión ---------- */
  var MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  var cap = function (s) { return s.charAt(0).toUpperCase() + s.slice(1); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var pad = function (n) { return String(n).padStart(2, '0'); };
  var isoDe = function (d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); };
  // Semanas (lunes a domingo) del mes; solo las que tienen días del mes
  var semanasDe = function (anio, mes) {
    var offset = (new Date(anio, mes, 1).getDay() + 6) % 7, inicio = new Date(anio, mes, 1 - offset), semanas = [];
    for (var w = 0; w < 6; w++) {
      var dias = [], alguno = false;
      for (var k = 0; k < 7; k++) { var d = new Date(inicio); d.setDate(inicio.getDate() + w * 7 + k); var en = d.getMonth() === mes; if (en) alguno = true; dias.push({ d: d, iso: isoDe(d), enMes: en }); }
      if (alguno) semanas.push(dias);
    }
    return semanas;
  };
  var tipoActivo = '*';
  document.addEventListener('cgc:filtro', function (ev) { if (ev.detail.grupo === 'eventos') tipoActivo = ev.detail.valor; });

  // Calendario principal: siempre visible, todos los eventos, navegación libre; cada evento enlaza a su card
  var cal = $('[data-calendario]');
  if (cal) {
    var eventos = JSON.parse(cal.getAttribute('data-eventos'));
    var ini = cal.getAttribute('data-inicio').split('-');
    var anio = +ini[0], mes = +ini[1] - 1;
    var pintar = function () {
      var ym = anio + '-' + pad(mes + 1);
      var delMes = eventos.filter(function (e) { return e.fecha.slice(0, 7) === ym && (tipoActivo === '*' || e.tipo === tipoActivo); });
      $('[data-cal-titulo]', cal).textContent = cap(MESES[mes]) + ' ' + anio;
      $('[data-cal-semanas]', cal).innerHTML = semanasDe(anio, mes).map(function (sem) {
        return '<div class="cgc-cal-row" role="row">' + sem.map(function (x) {
          var evs = x.enMes ? delMes.filter(function (e) { return e.fecha === x.iso; }) : [];
          var pasado = evs.length && evs.every(function (e) { return e.pasado; });
          var num = evs.length
            ? '<a class="cgc-cal-num cgc-cal-num--link" href="#' + evs[0].id + '" aria-label="' + x.d.getDate() + ' de ' + MESES[mes] + ': ' + esc(evs.map(function (e) { return e.titulo; }).join(' / ')) + '">' + x.d.getDate() + '</a>'
            : '<span class="cgc-cal-num">' + x.d.getDate() + '</span>';
          return '<div class="cgc-cal-dia' + (x.enMes ? '' : ' is-fuera') + (evs.length ? ' is-con-evento' : '') + (pasado ? ' is-pasado' : '') + '" role="gridcell">' + num +
            evs.map(function (e) {
              var h = e.hora && e.hora.indexOf(':') > -1 ? e.hora.split(' ')[0] + ' · ' : '';
              return '<a href="#' + e.id + '" class="cgc-cal-evento d-none d-md-block' + (e.pasado ? ' is-pasado' : '') + '" tabindex="-1"><strong>' + esc(h + e.tipo) + '</strong><span>' + esc(e.titulo) + '</span></a>';
            }).join('') + '</div>';
        }).join('') + '</div>';
      }).join('');
    };
    // Al ir a un evento desde el calendario, su card debe quedar visible: quita el filtro de fecha de su sección
    // si lo oculta y salta a la página donde está
    cal.addEventListener('click', function (ev) {
      var a = ev.target.closest('a[href^="#evento-"]'); if (!a) return;
      var destino = document.getElementById(a.getAttribute('href').slice(1)); if (!destino) return;
      var seccion = destino.closest('[data-seccion-eventos]');
      if (destino.classList.contains('is-fuera-rango') && seccion) { var limpiar = $('[data-ff-activo] [data-ff-limpiar]', seccion); if (limpiar) limpiar.click(); }
      var lista = destino.closest('[data-paginar]');
      if (lista && destino.classList.contains('is-otra-pagina')) {
        var visibles = $$('[data-item]', lista).filter(function (it) { return !it.classList.contains('is-oculto') && !it.classList.contains('is-fuera-rango'); });
        var i = visibles.indexOf(destino);
        if (i > -1) paginar(lista.parentElement, Math.floor(i / +lista.getAttribute('data-paginar')) + 1);
      }
    });
    $('[data-cal-prev]', cal).addEventListener('click', function () { mes--; if (mes < 0) { mes = 11; anio--; } pintar(); });
    $('[data-cal-next]', cal).addEventListener('click', function () { mes++; if (mes > 11) { mes = 0; anio++; } pintar(); });
    document.addEventListener('cgc:filtro', function (ev) { if (ev.detail.grupo === 'eventos') pintar(); });
    pintar();
  }

  // Filtro por fecha de cada sección (Próximos / Realizados): solo afecta a su propia lista
  $$('[data-filtro-fecha]').forEach(function (ff) {
    var seccion = ff.closest('[data-seccion-eventos]');
    var lista = $('[data-lista]', seccion);
    var estado = $('[data-ff-estado]', seccion);
    var estadoInicial = estado.textContent;
    var abrir = $('[data-ff-abrir]', ff), panel = $('[data-ff-panel]', ff);
    var activo = $('[data-ff-activo]', ff), activoTexto = $('[data-ff-activo-texto]', ff);
    var fechas = JSON.parse(ff.getAttribute('data-fechas'));
    // Abre en el mes más cercano a hoy: el primero de los próximos o el último de los realizados
    var orden = fechas.slice().sort();
    var base = ff.getAttribute('data-filtro-fecha') === 'realizados' ? orden[orden.length - 1] : orden[0];
    var anio = +base.slice(0, 4), mes = +base.slice(5, 7) - 1, filtro = null; // filtro: {tipo:'dia'|'mes', valor}
    var fechasVisibles = function () {
      return $$('[data-item]', lista).filter(function (it) { return !it.classList.contains('is-oculto'); }).map(function (it) { return it.getAttribute('data-fecha'); });
    };
    var pintar = function () {
      var conEvento = fechasVisibles();
      $('[data-ff-titulo]', ff).textContent = cap(MESES[mes]) + ' ' + anio;
      $('[data-ff-grid]', ff).innerHTML = ['L', 'M', 'M', 'J', 'V', 'S', 'D'].map(function (d) { return '<span class="cgc-mini-cal_dow" aria-hidden="true">' + d + '</span>'; }).join('') +
        semanasDe(anio, mes).map(function (sem) {
          return sem.map(function (x) {
            if (!x.enMes) return '<span class="cgc-mini-cal_dia is-fuera" aria-hidden="true">' + x.d.getDate() + '</span>';
            var tiene = conEvento.indexOf(x.iso) > -1, sel = filtro && filtro.tipo === 'dia' && filtro.valor === x.iso;
            return tiene
              ? '<button type="button" class="cgc-mini-cal_dia is-con-evento' + (sel ? ' is-seleccionado' : '') + '" data-ff-dia="' + x.iso + '" aria-pressed="' + sel + '" aria-label="' + x.d.getDate() + ' de ' + MESES[mes] + '">' + x.d.getDate() + '</button>'
              : '<span class="cgc-mini-cal_dia">' + x.d.getDate() + '</span>';
          }).join('');
        }).join('');
    };
    var aplicar = function () {
      var visibles = 0;
      $$('[data-item]', lista).forEach(function (it) {
        var f = it.getAttribute('data-fecha');
        var ok = !filtro || (filtro.tipo === 'dia' ? f === filtro.valor : f.slice(0, 7) === filtro.valor);
        it.classList.toggle('is-fuera-rango', !ok);
        if (ok && !it.classList.contains('is-oculto')) visibles++;
      });
      var n = visibles + (visibles === 1 ? ' evento' : ' eventos');
      if (!filtro) { estado.textContent = estadoInicial; activo.hidden = true; }
      else {
        var partes = filtro.valor.split('-'), txt = filtro.tipo === 'dia' ? (+partes[2]) + ' de ' + MESES[+partes[1] - 1] + ' de ' + partes[0] : cap(MESES[+partes[1] - 1]) + ' ' + partes[0];
        estado.textContent = n + (filtro.tipo === 'dia' ? ' el ' : ' en ') + (filtro.tipo === 'dia' ? txt : txt.toLowerCase());
        activoTexto.textContent = txt; activo.hidden = false;
      }
      actualizarVacios(seccion);
      paginar(seccion, 1);
    };
    var cerrar = function () { panel.hidden = true; abrir.setAttribute('aria-expanded', 'false'); };
    abrir.addEventListener('click', function () {
      var abierto = panel.hidden;
      $$('[data-ff-panel]').forEach(function (p) { p.hidden = true; });
      $$('[data-ff-abrir]').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
      if (abierto) {
        pintar(); panel.style.left = '0px'; panel.hidden = false; abrir.setAttribute('aria-expanded', 'true');
        // si no cabe a la derecha (móvil), se corre hacia la izquierda dejando 16 px de margen
        var sobra = panel.getBoundingClientRect().right - (document.documentElement.clientWidth - 16);
        if (sobra > 0) panel.style.left = -sobra + 'px';
      }
    });
    panel.addEventListener('click', function (ev) {
      var dia = ev.target.closest('[data-ff-dia]');
      if (dia) { filtro = { tipo: 'dia', valor: dia.getAttribute('data-ff-dia') }; aplicar(); cerrar(); abrir.focus(); return; }
      if (ev.target.closest('[data-ff-mes]')) { filtro = { tipo: 'mes', valor: anio + '-' + pad(mes + 1) }; aplicar(); cerrar(); abrir.focus(); return; }
      if (ev.target.closest('[data-ff-prev]')) { mes--; if (mes < 0) { mes = 11; anio--; } pintar(); }
      if (ev.target.closest('[data-ff-next]')) { mes++; if (mes > 11) { mes = 0; anio++; } pintar(); }
    });
    $$('[data-ff-limpiar]', ff).forEach(function (b) { b.addEventListener('click', function () { filtro = null; aplicar(); cerrar(); abrir.focus(); }); });
    document.addEventListener('click', function (ev) { if (!panel.hidden && !ff.contains(ev.target)) cerrar(); });
    ff.addEventListener('keydown', function (ev) { if (ev.key === 'Escape' && !panel.hidden) { cerrar(); abrir.focus(); } });
    document.addEventListener('cgc:filtro', function (ev) { if (ev.detail.grupo === 'eventos') { aplicar(); if (!panel.hidden) pintar(); } });
  });

  /* ---------- Formularios (demo: sin envío real) ---------- */
  $$('[data-form]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = $('[data-form-ok]', f); if (ok) ok.classList.remove('cgc-hidden');
    });
  });
  var sel = $('[data-programa-select]');
  if (sel) {
    var q = new URLSearchParams(location.search).get('programa');
    if (q) sel.value = q;
    var nombre = $('[data-programa-nombre]');
    var sync = function () { if (nombre) nombre.textContent = sel.options[sel.selectedIndex].text; };
    sel.addEventListener('change', sync); sync();
  }

  /* ---------- Modal del brochure: abrir con ?brochure=1 o #brochure (para revisión y capturas) ---------- */
  var modal = $('[data-modal="modalBrochure"]');
  if (modal && (new URLSearchParams(location.search).get('brochure') || location.hash === '#brochure')) {
    window.addEventListener('load', function () {
      var btn = $('[data-mtarget="modalBrochure"]'); if (btn) btn.click();
      setTimeout(function () { if (!modal.hasAttribute('open')) modal.setAttribute('open', ''); }, 300);
    });
  }

  /* ---------- Enlaces con destino pendiente: aviso breve en vez de no hacer nada ---------- */
  var toast;
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-pendiente]'); if (!a) return;
    e.preventDefault();
    if (!toast) { toast = document.createElement('div'); toast.className = 'uc-alert info cgc-toast'; toast.setAttribute('role', 'status'); document.body.appendChild(toast); }
    toast.innerHTML = '<div class="uc-alert_content"><i class="uc-icon icon-size--sm">info</i><span class="p p-size--sm bold ml-8"></span></div>';
    toast.querySelector('span').textContent = a.getAttribute('data-pendiente');
    toast.classList.add('is-visible'); clearTimeout(toast._t); toast._t = setTimeout(function () { toast.classList.remove('is-visible'); }, 4000);
  });

  /* ---------- Búsqueda en el navegador ---------- */
  var bus = $('[data-busqueda]');
  if (bus) {
    var indice = JSON.parse(bus.getAttribute('data-indice'));
    var input = $('[data-q]', bus);
    var term = (new URLSearchParams(location.search).get('q') || '').trim();
    input.value = term;
    var norm = function (s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); };
    var marcar = function (txt, palabras) { var out = esc2(txt); palabras.forEach(function (p) { if (p.length > 2) out = out.replace(new RegExp('(' + p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig'), '<mark>$1</mark>'); }); return out; };
    var esc2 = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
    var conteo = $('[data-conteo]', bus), lista = $('[data-resultados]', bus), tabs = $('[data-tabs]', bus), vacio = $('[data-sin-resultados]', bus);
    if (!term) { conteo.textContent = 'Escribe qué buscas: programas, eventos, estudios, papers o prensa.'; }
    else {
      var palabras = norm(term).split(/\s+/).filter(Boolean);
      var res = indice.map(function (r) {
        var t = norm(r.titulo + ' ' + r.extracto + ' ' + r.tipo);
        var score = palabras.reduce(function (a, p) { return a + (t.indexOf(p) > -1 ? 1 : 0); }, 0);
        return { r: r, s: score };
      }).filter(function (x) { return x.s > 0; }).sort(function (a, b) { return b.s - a.s; }).map(function (x) { return x.r; });
      if (!res.length) {
        conteo.textContent = '';
        vacio.classList.remove('cgc-hidden');
        $('[data-sin-texto]', bus).textContent = 'No encontramos resultados para «' + term + '»';
      } else {
        conteo.textContent = res.length + ' resultado' + (res.length === 1 ? '' : 's') + ' para «' + term + '»';
        var grupos = ['Todo'].concat(['Programas', 'Eventos', 'Estudios y papers', 'Prensa'].filter(function (g) { return res.some(function (r) { return r.grupo === g; }); }));
        var render = function (g) {
          $$('.cgc-tab', tabs).forEach(function (b) { b.setAttribute('aria-selected', String(b.getAttribute('data-g') === g)); });
          lista.innerHTML = res.filter(function (r) { return g === 'Todo' || r.grupo === g; }).map(function (r) {
            return '<li><span class="uc-subtitle d-block mb-4">' + esc2(r.tipo) + '</span><a href="' + r.url + '">' + marcar(r.titulo, palabras) + '</a><p class="mb-4 mt-4">' + marcar(r.extracto, palabras) + '</p><span class="cgc-url">' + r.url + '</span></li>';
          }).join('');
        };
        tabs.innerHTML = grupos.map(function (g) { var n = g === 'Todo' ? res.length : res.filter(function (r) { return r.grupo === g; }).length; return '<button type="button" role="tab" class="cgc-tab" data-g="' + g + '">' + g + ' (' + n + ')</button>'; }).join('');
        $$('.cgc-tab', tabs).forEach(function (b) { b.addEventListener('click', function () { render(b.getAttribute('data-g')); }); });
        render('Todo');
      }
    }
  }
})();
