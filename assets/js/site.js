/* EgoGamingCo — colour-mode toggle + light progressive enhancement. */
(function () {
  'use strict';

  window.__egcReady = true;

  var root = document.documentElement;
  var STORAGE_KEY = 'egc-theme';
  var prefersDark = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  /* --- colour mode ------------------------------------------------------ */

  var toggle = document.getElementById('theme-toggle');

  function systemTheme() {
    return prefersDark && prefersDark.matches ? 'dark' : 'light';
  }

  // What the user is actually looking at: an explicit override, else the OS.
  function activeTheme() {
    var override = root.getAttribute('data-theme');
    return override === 'light' || override === 'dark' ? override : systemTheme();
  }

  function syncButton() {
    if (!toggle) return;
    var isDark = activeTheme() === 'dark';
    var label = isDark ? 'Switch to light mode' : 'Switch to dark mode';
    toggle.setAttribute('aria-label', label);
    toggle.setAttribute('title', label);
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = activeTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem(STORAGE_KEY, next); } catch (e) {}
      syncButton();
    });
  }

  // No override stored: keep following the OS if it changes mid-session.
  if (prefersDark) {
    var onSystemChange = function () { if (!root.hasAttribute('data-theme')) syncButton(); };
    if (prefersDark.addEventListener) prefersDark.addEventListener('change', onSystemChange);
    else if (prefersDark.addListener) prefersDark.addListener(onSystemChange);
  }

  syncButton();

  /* --- footer year ------------------------------------------------------ */

  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* --- scroll reveal ---------------------------------------------------- */

  var revealables = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(revealables, function (el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  Array.prototype.forEach.call(revealables, function (el, i) {
    el.style.transitionDelay = Math.min(i, 3) * 80 + 'ms';
    observer.observe(el);
  });
})();
