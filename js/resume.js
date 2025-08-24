(() => {
    // Arquivos
    const files = {
      en: '/resumes/ResumeEnglish.pdf',
      pt: '/resumes/Resume.pdf'
    };

    // Parâmetros do viewer (Chrome/Firefox honram zoom; navpanes/pagemode são best-effort)
    const VIEW_OPTS = '#page=1&zoom=page-fit&view=FitH&navpanes=0&pagemode=none';

    const frame        = document.getElementById('pdfFrame');
    const downloadBtn  = document.getElementById('downloadBtn');
    const fallback     = document.getElementById('pdfFallback');
    const fallbackLink = document.getElementById('fallbackLink');
    const btnEN        = document.getElementById('btn-en');
    const btnPT        = document.getElementById('btn-pt');

    function buildUrl(file){ return file + VIEW_OPTS; }

    // Fallback simples se o iframe falhar
    frame.addEventListener('error', () => {
      frame.style.display = 'none';
      if (fallback) fallback.style.display = 'block';
    });


})();
