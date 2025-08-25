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
    updateLearnLinks(lang);              // NEW: ajusta links após navbar
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
      updateLearnLinks(l);               // NEW: ajusta links após aplicar i18n
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

  // NEW: normaliza e atualiza todos os links do Microsoft Learn conforme o idioma
  function updateLearnLinks(l){
    const loc = (l || 'en-US').toLowerCase(); // 'pt-br' | 'en-us'
    const isLearnShare = (href) =>
      href && href.includes('learn.microsoft.com') && href.includes('/api/credentials/share/');

    document.querySelectorAll('a[href*="learn.microsoft.com"]').forEach(a=>{
      const href = a.getAttribute('href');
      if (!isLearnShare(href)) return;
      try{
        const url = new URL(href, location.origin);
        // Substitui o segmento de locale após "/api/credentials/share/"
        url.pathname = url.pathname.replace(
          /(\/api\/credentials\/share\/)([a-z]{2}-[a-z]{2})(\/)/i,
          `$1${loc}$3`
        );
        a.href = url.toString();
      }catch{/* ignora URLs relativas inválidas */}
    });
  }
})();
