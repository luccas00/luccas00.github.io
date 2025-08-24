// Common site-wide scripts

// Footer year and embed height
(function(){
  const y = document.getElementById('y');
  if (y) y.textContent = new Date().getFullYear();

  function sendHeight(){
    const h = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    parent.postMessage({ type: 'EMBED_HEIGHT', height: h }, '*');
  }
  window.addEventListener('load', sendHeight);
  window.addEventListener('resize', sendHeight);
  if (window.ResizeObserver) new ResizeObserver(sendHeight).observe(document.body);
})();

// Internationalization
(function(){
  const DEFAULT_LANG = 'en-US';
  const SUPPORTED = ['pt-BR','en-US'];
  let lang = resolveLang();
  let dict = {};

  persistLang(lang);
  setHtmlLang(lang);
  syncToggleUI(lang);
  loadAndApply(lang);

  document.addEventListener('click', (e)=>{
    const btn = e.target.closest('.lang-switch .lang-opt');
    if(!btn) return;
    const newLang = btn.dataset.lang;
    if(!SUPPORTED.includes(newLang) || newLang === lang) return;
    lang = newLang;
    persistLang(lang);
    setHtmlLang(lang);
    syncToggleUI(lang);
    updateUrlParam(lang);
    loadAndApply(lang);
  });

  window.addEventListener('navbar:loaded', ()=>{
    syncToggleUI(lang);
    applyTranslations(dict);
  });

  function resolveLang(){
    const urlLang = new URLSearchParams(location.search).get('lang');
    const stored   = localStorage.getItem('lang');
    const navLang  = (navigator.language || '').toLowerCase().startsWith('pt') ? 'pt-BR' : 'en-US';
    return (urlLang && SUPPORTED.includes(urlLang)) ? urlLang
         : (stored   && SUPPORTED.includes(stored)) ? stored
         : navLang || DEFAULT_LANG;
  }
  function persistLang(l){ localStorage.setItem('lang', l); }
  function setHtmlLang(l){ document.documentElement.setAttribute('lang', l); }
  function updateUrlParam(l){
    const u = new URL(location.href);
    u.searchParams.set('lang', l);
    history.replaceState({}, '', u);
  }
  function syncToggleUI(l){
    document.querySelectorAll('.lang-switch .lang-opt').forEach(btn=>{
      const active = btn.dataset.lang === l;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
  }
  async function loadAndApply(l){
    const path = `i18n/${l}.json`;
    try{
      const res = await fetch(path, { cache: 'no-store' });
      if(!res.ok) throw 0;
      dict = await res.json();
      applyTranslations(dict);
      window.dispatchEvent(new Event('i18n:applied'));
    }catch{
      console.warn('i18n: catálogo não carregado:', path);
    }
  }
  function applyTranslations(d){
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key = el.getAttribute('data-i18n');
      if (d[key] !== undefined) el.textContent = d[key];
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(el=>{
      const key = el.getAttribute('data-i18n');
      const attrs = (el.getAttribute('data-i18n-attr')||'')
        .split(',').map(s=>s.trim()).filter(Boolean);
      if (d[key] !== undefined) attrs.forEach(a=> el.setAttribute(a, d[key]));
    });
  }
})();

// Matrix background toggle
(function(){
  const btn = document.getElementById('toggle-matrix');
  // tenta pelo id; se não achar, tenta por data-attr ou pelo src
  const iframe =
    document.getElementById('matrix-bg') ||
    document.querySelector('iframe[data-matrix-bg], iframe[src*="rezmason.github.io/matrix"]');

  if(!btn || !iframe) return;

  // estado inicial a partir do display atual
  let active = iframe.style.display !== 'none';

  btn.addEventListener('click', ()=>{
    active = !active;
    iframe.style.display = active ? 'block' : 'none';
    btn.textContent = active ? 'Desativar Matrix' : 'Ativar Matrix';
  });
})();

// Theme switcher
(function(){
  const THEME_KEY = 'theme';
  let theme = (localStorage.getItem(THEME_KEY) === 'light') ? 'light' : 'dark';
  applyTheme(theme);
  syncToggle(theme);

  window.addEventListener('navbar:loaded', ()=> syncToggle(theme));
  window.addEventListener('i18n:applied', ()=> syncToggle(theme));

  document.addEventListener('click', (e)=>{
    const btn = e.target.closest('.theme-opt');
    if(!btn) return;
    const newTheme = btn.dataset.theme;
    if(newTheme !== 'light' && newTheme !== 'dark') return;
    if(newTheme === theme) return;
    theme = newTheme;
    localStorage.setItem(THEME_KEY, theme);
    applyTheme(theme);
    syncToggle(theme);
  });

  function applyTheme(t){
    document.documentElement.setAttribute('data-theme', t);
  }
  function syncToggle(t){
    document.querySelectorAll('.theme-switch .theme-opt').forEach(btn=>{
      const active = btn.dataset.theme === t;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
  }
})();
