// js/matrix.js — Single Source of Truth
(function(){
  const STATE_KEY = 'matrix_active';
  const MATRIX_URL = 'https://rezmason.github.io/matrix/?version=resurrections&skipIntro=false&fps=32&raindropLength=1&fallSpeed=0.5&animationSpeed=0.2&cycleSpeed=0.006';

  // Só considera ATIVO quando for explicitamente "1"
  const isActive = () => localStorage.getItem(STATE_KEY) === '1';
  const setActive = (flag) => localStorage.setItem(STATE_KEY, flag ? '1' : '0');

  function mountIframe(){
    if (document.getElementById('matrix-bg')) return; // já montado
    const iframe = document.createElement('iframe');
    iframe.id = 'matrix-bg';
    iframe.src = MATRIX_URL;
    iframe.setAttribute('frameborder','0');
    iframe.setAttribute('scrolling','no');
    Object.assign(iframe.style, {
      position:'fixed', inset:'0', width:'100%', height:'100%',
      zIndex:'-1', pointerEvents:'none', border:'0'
    });
    document.body.prepend(iframe);
  }
  function unmountIframe(){
    document.getElementById('matrix-bg')?.remove();
  }

  function ensureToggle(){
    let btn = document.getElementById('toggle-matrix');
    if (!btn) {
      const wrap = document.createElement('div');
      wrap.className = 'matrix-toggle';
      btn = document.createElement('button');
      btn.id = 'toggle-matrix';
      wrap.appendChild(btn);
      document.body.appendChild(wrap);
    }
    return btn;
  }
  function syncButton(btn){
    btn.textContent = isActive() ? 'Desativar Matrix' : 'Ativar Matrix';
  }
  function applyState(){
    if (isActive()) mountIframe(); else unmountIframe();
    const btn = document.getElementById('toggle-matrix');
    if (btn) syncButton(btn);
  }

  document.addEventListener('DOMContentLoaded', () => {
    // Se nunca foi definido, escolha o DEFAULT = DESATIVADO (0)
    if (localStorage.getItem(STATE_KEY) === null) setActive(true);

    const btn = ensureToggle();
    applyState();

    btn.addEventListener('click', () => {
      setActive(!isActive());
      applyState();
    });
  });

  // Sincroniza entre abas e após navegação
  window.addEventListener('storage', (e) => {
    if (e.key === STATE_KEY) applyState();
  });
})();
