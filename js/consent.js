// Cookie consent + GA4 loader for algorithms.technology
//
// GA4 is loaded directly here. There is no Google Tag Manager on this site: the
// container was published but empty, so it shipped ~320KB per page and collected
// nothing. It was removed on 04/08/2026.
//
// Basic consent mode: gtag.js is not requested at all until consent is granted.
// privacy.html states that declining means no analytics data is collected, and that
// the _ga cookies are "only set if you click Accept". Advanced consent mode would
// still send cookieless pings on decline, so the script stays off the page instead.
(function () {
  var GA_MEASUREMENT_ID = 'G-1J5ZYGTE56';

  if (localStorage.getItem('consent') === 'granted') {
    loadAnalytics();
    return;
  }
  if (localStorage.getItem('consent') === 'denied') return;

  // Build banner
  var bar = document.createElement('div');
  bar.id = 'consent-bar';
  bar.style.cssText = 'position:fixed;bottom:0;left:0;right:0;background:#1a1a2e;border-top:1px solid rgba(255,255,255,0.1);padding:12px 24px;display:flex;align-items:center;justify-content:center;gap:16px;z-index:9999;font-size:0.85rem;color:rgba(255,255,255,0.7);font-family:Inter,sans-serif;';

  bar.innerHTML = '<span>This site uses cookies for anonymous analytics.</span>' +
    '<button id="consent-accept" style="background:#fff;color:#1a1a2e;border:none;padding:6px 16px;border-radius:4px;cursor:pointer;font-size:0.85rem;font-weight:500;">Accept</button>' +
    '<button id="consent-decline" style="background:transparent;color:rgba(255,255,255,0.5);border:1px solid rgba(255,255,255,0.2);padding:6px 16px;border-radius:4px;cursor:pointer;font-size:0.85rem;">Decline</button>';

  document.body.appendChild(bar);

  document.getElementById('consent-accept').addEventListener('click', function () {
    localStorage.setItem('consent', 'granted');
    loadAnalytics();
    bar.remove();
  });

  document.getElementById('consent-decline').addEventListener('click', function () {
    localStorage.setItem('consent', 'denied');
    bar.remove();
  });

  function loadAnalytics() {
    if (window.__ga4Loaded) return;
    window.__ga4Loaded = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };

    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
    document.head.appendChild(s);

    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID);
  }
})();
