// js/matrix.js — Componente único, stateful, idempotente
(function(){
  const STATE_KEY = 'matrix_active';
  const DEFAULT_ACTIVE = true; // on por padrão (ajuste se quiser)

  // URL única (padronize aqui)
  const MATRIX_URL = 'https://rezmason.github.io/matrix/?version=resurrections&skipIntro=false&fps=32&raindropLength=1&fallSpeed=0.5&animationSpeed=0.2&cycleSpeed=0.006';

  // ===== Infra de estado =====
  const isActive = () => {
    const v = localStorage.getItem(STATE_KEY);
    return (v === null) ? DEFAULT_ACTIVE : v === '1';
  };
  const setActive = (flag) => {
    localStorage.setItem(STATE_KEY, flag ? '1' : '0');
  };

  // ===== DOM helpers =====
  function mountIframe(){
    if (document.getElementById('matrix-bg')) return; // idempotência
    const iframe = document.createElement('iframe');
    iframe.id = 'matrix-bg';
    iframe.src = MATRIX_URL;
    iframe.setAttribute('frameborder','0');
    iframe.setAttribute('scrolling','no');
    Object.assign(iframe.style, {
      position:'fixed', top:'0', left:'0', width:'100%', height:'100%',
      zIndex:'-1', pointerEvents:'none', border:'0'
    });
    document.body.prepend(iframe);
  }
  function unmountIframe(){
    const el = document.getElementById('matrix-bg');
    if (el) el.remove();
  }

  function ensureToggleButton(){
    let btn = document.getElementById('toggle-matrix');

    // Se não existir, cria um botão flutuante
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

  function syncUI(btn){
    const active = isActive();
    btn.textContent = active ? 'Desativar Matrix' : 'Ativar Matrix';
  }

  function applyState(){
    if (isActive()) mountIframe(); else unmountIframe();
    const btn = document.getElementById('toggle-matrix');
    if (btn) syncUI(btn);
  }

  // ===== Init =====
  document.addEventListener('DOMContentLoaded', () => {
    // Aplica estado atual
    applyState();

    // Garante botão e handler (uma vez por página)
    const btn = ensureToggleButton();
    btn.addEventListener('click', () => {
      const next = !isActive();
      setActive(next);
      applyState(); // monta/desmonta + atualiza label
    });
  });

  // Sincroniza entre abas/janelas se necessário
  window.addEventListener('storage', (e) => {
    if (e.key === STATE_KEY) applyState();
  });
})();
