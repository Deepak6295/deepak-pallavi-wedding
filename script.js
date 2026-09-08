/* ============================================================
   Pallavi & Deepak — 13 December 2026
   ============================================================ */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var gate   = $('gate');
  var card   = $('card');
  var petals = $('petals');
  var toastEl = $('toast');

  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  /* ── a short message, bottom of the screen ------------------- */

  var toastTimer;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 2600);
  }

  /* ── opening the card ---------------------------------------- */

  if (card) { card.setAttribute('aria-hidden', 'true'); card.inert = true; }

  function openCard() {
    if (!gate || gate.classList.contains('open')) return;
    gate.classList.add('open');
    document.body.classList.remove('locked');
    if (card) {
      card.removeAttribute('aria-hidden');
      card.inert = false;
    }
    window.scrollTo(0, 0);

    /* the hero arrives in sequence — delays live in the stylesheet */
    var hero = document.querySelectorAll('.hero [data-reveal]');
    for (var i = 0; i < hero.length; i++) hero[i].classList.add('in');

    setTimeout(function () { gate.classList.add('gone'); }, calm ? 500 : 1500);
  }

  var openBtn = $('openBtn');
  if (openBtn) openBtn.addEventListener('click', openCard);

  /* ── sections arrive as you scroll --------------------------- */

  var revealed = {};
  var watch = document.querySelectorAll('main > *:not(.hero) [data-reveal], main > section[data-reveal]');

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        io.unobserve(e.target);
        if (e.target.classList.contains('count')) celebrateIfDue();
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });

    for (var j = 0; j < watch.length; j++) io.observe(watch[j]);
  } else {
    for (var k = 0; k < watch.length; k++) watch[k].classList.add('in');
  }

  /* ── the countdown ------------------------------------------- */

  var NOON     = new Date('2026-12-13T12:00:00+05:30').getTime(); /* ceremony  */
  var DAY_OPEN = new Date('2026-12-13T00:00:00+05:30').getTime(); /* midnight  */
  var DAY_END  = new Date('2026-12-14T00:00:00+05:30').getTime();

  var clock = $('clock');
  var note  = $('countNote');
  var boxes = { d: $('d'), h: $('h'), m: $('m'), s: $('s') };
  var state = 'counting';

  function pad(n) { return (n < 10 ? '0' : '') + n; }

  function tick() {
    var now = Date.now();

    if (now >= DAY_OPEN) { finish(now); return; }

    var left = NOON - now;
    boxes.d.textContent = pad(Math.floor(left / 864e5));
    boxes.h.textContent = pad(Math.floor(left % 864e5 / 36e5));
    boxes.m.textContent = pad(Math.floor(left % 36e5 / 6e4));
    boxes.s.textContent = pad(Math.floor(left % 6e4 / 1e3));
  }

  function finish(now) {
    if (state !== 'counting') return;
    state = now < DAY_END ? 'today' : 'married';
    clearInterval(timer);

    var title = document.querySelector('.count .sect-title');
    if (title) title.remove();

    if (clock) {
      clock.innerHTML = state === 'today'
        ? 'Today is the day<span>We are so glad you are here.</span>'
        : 'We are married<span>Thank you for every blessing.</span>';
      clock.className = 'today';
    }
    if (note) {
      note.textContent = state === 'today'
        ? 'Sunday, 13 December 2026 — from 12 noon, at our home in Jorhat'
        : 'Sunday, 13 December 2026 — Jorhat, Assam';
    }
    celebrateIfDue();
  }

  var timer;
  if (clock && boxes.d) {
    tick();
    timer = setInterval(tick, 1000);
  }

  /* a shower of petals, once, when the moment is on screen */
  var celebrated = false;
  function celebrateIfDue() {
    if (celebrated || state === 'counting' || calm || !petals || !clock) return;
    celebrated = true;
    var r = clock.getBoundingClientRect();
    if (r.bottom < 0 || r.top > window.innerHeight) { celebrated = false; return; }
    for (var i = 0; i < 46; i++) burst(r.left + r.width / 2, r.top + r.height / 2, i * 18);
  }

  function burst(x, y, wait) {
    setTimeout(function () {
      var p = petal(['', 'pale', 'deep'][Math.floor(Math.random() * 3)]);
      p.style.left = x + 'px';
      p.style.top = y + 'px';
      var a = Math.random() * Math.PI * 2;
      var far = 120 + Math.random() * 260;
      p.animate(
        [{ transform: 'translate(0,0) scale(.4)', opacity: 1 },
         { transform: 'translate(' + Math.cos(a) * far + 'px,' +
                       (Math.sin(a) * far * .6 + 180 + Math.random() * 200) + 'px) scale(1)', opacity: 0 }],
        { duration: 1700 + Math.random() * 1100, easing: 'cubic-bezier(.15,.7,.35,1)', fill: 'forwards' }
      );
      setTimeout(function () { p.remove(); }, 3000);
    }, wait);
  }

  /* ── petals drifting past ------------------------------------ */

  function petal(kind) {
    var outer = document.createElement('div');
    outer.className = 'petal' + (kind ? ' ' + kind : '');
    outer.appendChild(document.createElement('i'));
    petals.appendChild(outer);
    return outer;
  }

  function drift() {
    if (document.hidden || petals.childElementCount > 13) return;
    var p = petal(['', '', 'pale', 'deep'][Math.floor(Math.random() * 4)]);
    p.style.left = Math.random() * 100 + 'vw';
    p.style.top = '-30px';

    var life = 11000 + Math.random() * 8000;
    var side = (Math.random() * 130 - 65);
    p.animate(
      [{ transform: 'translate3d(0,0,0)' },
       { transform: 'translate3d(' + side + 'px,' + (window.innerHeight + 70) + 'px,0)' }],
      { duration: life, easing: 'linear', fill: 'forwards' }
    );
    p.firstChild.animate(
      [{ transform: 'translateX(-10px) rotate(-30deg)' },
       { transform: 'translateX(10px) rotate(35deg)' }],
      { duration: 2600 + Math.random() * 2200, iterations: Infinity,
        direction: 'alternate', easing: 'ease-in-out' }
    );
    setTimeout(function () { p.remove(); }, life + 300);
  }

  if (!calm && petals && typeof Element.prototype.animate === 'function') {
    for (var n = 0; n < 4; n++) setTimeout(drift, n * 900);
    setInterval(drift, 1900);
  }

  /* ── add to calendar ----------------------------------------- */

  var icsBtn = $('icsBtn');
  if (icsBtn) icsBtn.addEventListener('click', function () {
    var stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
    var ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Pallavi and Deepak//Wedding 2026//EN',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      'UID:pallavi-deepak-13122026@wedding.invite',
      'DTSTAMP:' + stamp,
      'DTSTART:20261213T063000Z',
      'DTEND:20261213T133000Z',
      'SUMMARY:Wedding of Pallavi & Deepak',
      'DESCRIPTION:Reception and blessings, 12 noon until 7 in the evening.',
      'LOCATION:Bongal Pukhuri\\, Club Road\\, Jorhat\\, Assam',
      'URL:https://maps.app.goo.gl/SxYsotSCUfqXeBXQ7',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    var url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
    var a = document.createElement('a');
    a.href = url;
    a.download = 'pallavi-deepak-wedding.ics';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
    toast('Saved — 13 December, 12 noon');
  });

  /* ── copy the address ---------------------------------------- */

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (res, rej) {
      var t = document.createElement('textarea');
      t.value = text;
      t.style.cssText = 'position:fixed;top:-100px;opacity:0';
      document.body.appendChild(t);
      t.select();
      var ok = document.execCommand('copy');
      t.remove();
      ok ? res() : rej();
    });
  }

  var copyBtn = $('copyBtn');
  if (copyBtn) copyBtn.addEventListener('click', function () {
    copyText(copyBtn.dataset.addr)
      .then(function () { toast('Address copied'); })
      .catch(function () { toast('Bongal Pukhuri, Club Road, Jorhat'); });
  });

  /* ── share --------------------------------------------------- */

  var shareBtn = $('shareBtn');
  if (shareBtn) shareBtn.addEventListener('click', function () {
    var data = {
      title: 'Pallavi & Deepak — Wedding Invitation',
      text: 'Pallavi & Deepak are getting married on Sunday, 13 December 2026, in Jorhat. Do join us.',
      url: location.href
    };
    if (navigator.share) {
      navigator.share(data).catch(function () {});
    } else {
      copyText(location.href)
        .then(function () { toast('Link copied — paste it anywhere'); })
        .catch(function () { toast(location.href); });
    }
  });

  /* ── keep the fall in step with the window ------------------- */

  document.addEventListener('visibilitychange', function () {
    if (!document.hidden && state !== 'counting') celebrateIfDue();
  });

})();
