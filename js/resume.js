(() => {
  // Mapeamento de arquivos
  const files = {
    en: '/resumes/ResumeEnglish.pdf',
    pt: '/resumes/Resume.pdf'
  };

  // Parâmetros do viewer
  const VIEW_OPTS = '#page=1&zoom=page-fit&view=FitH&navpanes=0&pagemode=none';

  // DOM
  const frame        = document.getElementById('pdfFrame');
  const fallback     = document.getElementById('pdfFallback');
  const fallbackLink = document.getElementById('fallbackLink');
  const btnEN        = document.getElementById('btn-en');
  const btnPT        = document.getElementById('btn-pt');
  const dlEN         = document.getElementById('dl-en');
  const dlPT         = document.getElementById('dl-pt');

  // Função para montar URL com parâmetros
  const buildUrl = (file) => file + VIEW_OPTS;

  // Troca o PDF exibido
  function show(lang) {
    const pdf = files[lang];
    const url = buildUrl(pdf);

    // Exibe iframe e oculta fallback
    if (fallback) fallback.style.display = 'none';
    if (frame) {
      frame.style.display = 'block';
      frame.src = url;
    }

    // Atualiza link do fallback (abrir em nova aba)
    if (fallbackLink) fallbackLink.href = pdf;

    // Estado visual (opcional)
    [btnEN, btnPT].forEach(b => b && b.classList.remove('active'));
    (lang === 'en' ? btnEN : btnPT)?.classList.add('active');
  }

  // Eventos dos botões
  btnEN?.addEventListener('click', () => show('en'));
  btnPT?.addEventListener('click', () => show('pt'));

  // Fallback se iframe falhar
  frame?.addEventListener('error', () => {
    frame.style.display = 'none';
    if (fallback) fallback.style.display = 'block';
  });

  // Inicialização padrão
  show('en');
})();
