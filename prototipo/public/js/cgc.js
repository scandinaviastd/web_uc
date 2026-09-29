/*
 * cgc.js — interacción propia del sitio (sin dependencias). El resto (menú, desplegables, carrusel, modal)
 * lo maneja uc-kitdigital.js del Kit. En WordPress: cgc-uc/assets/js/cgc.js.
 */
(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

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

  /* ---------- Calendario mensual de eventos ---------- */
  var cal = $('[data-calendario]');
  if (cal) {
    var eventos = JSON.parse(cal.getAttribute('data-eventos'));
    var meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    var mesesCortos = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
    var ini = cal.getAttribute('data-inicio').split('-');
    var anio = +ini[0], mes = +ini[1] - 1, tipo = '*';
    var cap = function (s) { return s.charAt(0).toUpperCase() + s.slice(1); };
    var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
    var pintar = function () {
      var delMes = eventos.filter(function (e) { var d = e.fecha.split('-'); return +d[0] === anio && +d[1] - 1 === mes && (tipo === '*' || e.tipo === tipo); });
      $('[data-cal-titulo]', cal).textContent = cap(meses[mes]) + ' ' + anio;
      $('[data-cal-lista-titulo]', cal).textContent = 'Eventos de ' + meses[mes] + ' ' + anio;
      var primero = new Date(anio, mes, 1), offset = (primero.getDay() + 6) % 7;
      var inicio = new Date(anio, mes, 1 - offset), html = '';
      for (var w = 0; w < 6; w++) {
        var fila = '', algunoDelMes = false;
        for (var k = 0; k < 7; k++) {
          var d = new Date(inicio); d.setDate(inicio.getDate() + w * 7 + k);
          var enMes = d.getMonth() === mes; if (enMes) algunoDelMes = true;
          var iso = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
          var evs = enMes ? delMes.filter(function (e) { return e.fecha === iso; }) : [];
          fila += '<div class="cgc-cal-dia' + (enMes ? '' : ' is-fuera') + (evs.length ? ' is-con-evento' : '') + '" role="gridcell"><span class="cgc-cal-num">' + d.getDate() + '</span>' +
            evs.map(function (e) { return '<a href="#" class="cgc-cal-evento"><strong>' + esc(e.hora.indexOf(':') > -1 ? e.hora.split(' ')[0] + ' · ' + e.tipo : e.tipo) + '</strong><span>' + esc(e.titulo) + '</span></a>'; }).join('') + '</div>';
        }
        if (algunoDelMes) html += '<div class="cgc-cal-row" role="row">' + fila + '</div>';
      }
      $('[data-cal-semanas]', cal).innerHTML = html;
      $('[data-cal-lista]', cal).innerHTML = delMes.length ? delMes.map(function (e) {
        var dd = +e.fecha.split('-')[2];
        return '<div class="col-lg-6 mb-24"><article class="uc-card card-type--event card-height--same cgc-card"><div class="uc-card card-type--date"><div class="day">' + dd + '</div><div class="month">' + mesesCortos[mes] + '</div></div>' +
          '<div class="uc-card_body"><span class="uc-subtitle mt-20 mb-16">' + esc(e.tipo) + '</span><a href="#" class="d-flex h4 color-black uc-card-link mb-16 cgc-card-link">' + esc(e.titulo) + '</a>' +
          '<div class="uc-card_event--content"><div class="date">' + dd + ' de ' + meses[mes] + '</div><div class="time">' + esc(e.hora) + '</div><div class="venue">' + esc(e.lugar) + '</div></div></div></article></div>';
      }).join('') : '<div class="col-12"><div class="uc-alert info"><div class="uc-alert_content"><i class="uc-icon icon-size--sm">info</i><span class="p p-size--sm bold ml-8">No hay eventos programados para este mes.</span></div></div></div>';
    };
    $('[data-cal-prev]', cal).addEventListener('click', function () { mes--; if (mes < 0) { mes = 11; anio--; } pintar(); });
    $('[data-cal-next]', cal).addEventListener('click', function () { mes++; if (mes > 11) { mes = 0; anio++; } pintar(); });
    document.addEventListener('cgc:filtro', function (ev) { if (ev.detail.grupo === 'eventos') { tipo = ev.detail.valor; pintar(); } });
    pintar();
  }

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
