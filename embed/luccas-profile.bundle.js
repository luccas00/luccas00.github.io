// <luccas-profile> web component
class LuccasProfile extends HTMLElement {
  static get observedAttributes(){ return ['matrix']; }
  constructor(){
    super();
    this.attachShadow({ mode: 'open' });
  }
  connectedCallback(){ this.render(); }
  attributeChangedCallback(){ this.render(); }

  render(){
    const showMatrix = this.hasAttribute('matrix');
    const style = `
      :host{display:block;font:16px/1.6 system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,"Helvetica Neue",Arial,sans-serif;color:var(--text,#e6e6e6)}
      .wrap{position:relative}
      .container{max-width:980px;margin:0 auto;padding:24px}
      .card{background:var(--card,#121317);border:1px solid var(--border,#23262d);border-radius:14px;padding:24px;margin:16px 0}
      h1,h2,h3{line-height:1.25;margin:0 0 12px}
      h1{font-size:2rem}
      h2{font-size:1.5rem;margin-top:8px}
      h3{font-size:1.25rem}
      .center{text-align:center}
      .grid{display:grid;gap:16px}
      .grid-2{grid-template-columns:repeat(auto-fit,minmax(260px,1fr))}
      .badges{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
      .section-title{display:flex;align-items:center;gap:10px}
      .kbd{background:var(--badge-bg,#1e1f25);padding:2px 8px;border-radius:8px;border:1px solid var(--border,#23262d);font-size:.875rem}
      img{max-width:100%;height:auto}
      .hero p{margin:6px 0;color:var(--muted,#b3b3b3)}
      .stats img{border-radius:12px;border:1px solid var(--border,#23262d)}
      footer{color:var(--muted,#b3b3b3);font-size:.9rem;margin-top:24px}
      iframe.bg{position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;pointer-events:none;border:0}
    `;

    const matrix = showMatrix ? `<iframe class="bg" src="https://rezmason.github.io/matrix/?version=resurrections&skipIntro=false&fps=32&fallSpeed=0.20" loading="lazy"></iframe>` : '';

    const html = `
      <div class="wrap">
        ${matrix}
        <main class="container">
          <section class="card hero">
            <div style="display:grid;grid-template-columns:200px 1fr;gap:24px;align-items:center;">
              <div class="center">
                <a href="https://github.com/luccas00" target="_blank" rel="noopener">
                  <img src="https://github.com/luccas00.png" alt="Foto de perfil de Luccas" width="180" style="border-radius:50%;border:3px solid var(--border,#23262d)">
                </a>
              </div>
              <div>
                <h1>Hello there, I'm Luccas 👋</h1>
                <h2>👨🏼‍💻🎓 I'm a Power Platform &amp; Dynamics 365 Developer and a Student!!</h2>
                <p><strong>Senior Developer</strong> | Specialist in Power Platform &amp; Dynamics 365 | Certified Power Platform Functional Consultant [PL-200] | Business Solutions Expert</p>
              </div>
            </div>
            <div style="margin-top:24px;">
              <p>🔭 Committed to continuously improving my development skills and problem-solving abilities, aiming to deliver efficient technological solutions.</p>
              <p>🌱 Enhancing my knowledge in Microsoft Power Platform, Dynamics 365, .NET, ASP.NET MVC, Node.js, Microsoft SQL Server, and Azure to deliver integrated and scalable solutions.</p>
              <p>💻 At Smart Consulting, I contribute to improving the efficiency and quality of our clients' projects. I have experience in adapting and configuring Dynamics 365 business applications, with a focus on Project Operations (project and finance operations), Customer Service (customer support), and Dynamics 365 Sales.</p>
              <p>🏫 Pursuing a Bachelor's degree in Information Systems at UFOP (Federal University of Ouro Preto)</p>
            </div>
          </section>

          <section class="card">
            <div class="section-title">
              <h2>📊 GitHub Stats</h2>
              <span class="kbd">KPIs</span>
            </div>
            <div class="grid grid-2 center stats">
              <a href="https://github.com/luccas00" target="_blank" rel="noopener">
                <img alt="Top Langs" height="180" src="https://github-readme-stats-luccas00s-projects.vercel.app/api/top-langs/?username=luccas00&layout=compact&langs_count=10&theme=tokyonight">
              </a>
              <a href="https://github.com/luccas00" target="_blank" rel="noopener">
                <img alt="Stats" height="180" src="https://github-readme-stats-luccas00s-projects.vercel.app/api?username=luccas00&show_icons=true&theme=tokyonight&include_all_commits=true&count_private=true">
              </a>
            </div>
          </section>

          <section class="card">
            <h2>🛠 Skills</h2>
            <h3>I have experience</h3>
            <p class="center">
              <a href="https://skillicons.dev" target="_blank" rel="noopener">
                <img alt="Skill Icons" src="https://skillicons.dev/icons?i=vscode,visualstudio,idea,c,cs,java,js,html,git,github,azure,docker,postman">
              </a>
            </p>
            <h3>I'm familiar with</h3>

            <div style="display:flex;flex-direction:column;gap:16px;">
              <div class="badges">
                <img alt="Ubuntu" src="https://img.shields.io/badge/Ubuntu-E95420.svg?style=for-the-badge&logo=Ubuntu&logoColor=white">
                <img alt="macOS" src="https://img.shields.io/badge/macOS-000000.svg?style=for-the-badge&logo=macOS&logoColor=white">
                <img alt="Windows" src="https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white">
                <img alt="PowerShell" src="https://img.shields.io/badge/PowerShell-5391FE.svg?style=for-the-badge&logo=PowerShell&logoColor=white">
              </div>
              <div class="badges">
                <img alt="Dynamics 365" src="https://img.shields.io/badge/Dynamics%20365-0B53CE.svg?style=for-the-badge&logo=Dynamics-365&logoColor=white">
                <img alt="Power Apps" src="https://img.shields.io/badge/Power%20Apps-742774.svg?style=for-the-badge&logo=Power-Apps&logoColor=white">
                <img alt="Power Automate" src="https://img.shields.io/badge/Power%20Automate-0066FF.svg?style=for-the-badge&logo=powerautomate&logoColor=white">
                <img alt="Microsoft Office" src="https://img.shields.io/badge/Microsoft%20Office-D83B01.svg?style=for-the-badge&logo=Microsoft-Office&logoColor=white">
                <img alt="Azure" src="https://img.shields.io/badge/Azure-0078D4.svg?style=for-the-badge&logo=Azure&logoColor=white">
              </div>
              <div class="badges">
                <img alt=".NET" src="https://img.shields.io/badge/.NET-512BD4.svg?style=for-the-badge&logo=dotnet&logoColor=white">
                <img alt="Spring" src="https://img.shields.io/badge/Spring-6DB33F.svg?style=for-the-badge&logo=Spring&logoColor=white">
                <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-4169E1.svg?style=for-the-badge&logo=PostgreSQL&logoColor=white">
                <img alt="SQL Server" src="https://img.shields.io/badge/Microsoft%20SQL%20Server-CC2927.svg?style=for-the-badge&logo=Microsoft-SQL-Server&logoColor=white">
              </div>
            </div>
          </section>

          <section class="card">
            <h2>📱 Connect with me</h2>
            <div class="badges">
              <a href="https://www.linkedin.com/in/luccas-carneiro-678689171/" target="_blank" rel="noopener">
                <img alt="LinkedIn" src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white">
              </a>
              <a href="mailto:luccas.carneiro@aluno.ufop.edu.br">
                <img alt="Gmail" src="https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white">
              </a>
            </div>
          </section>

          <section class="card center">
            <h2 style="text-align:left;">🤝 Contributions</h2>
            <p><img width="900" alt="Snake Contributions" src="https://raw.githubusercontent.com/luccas00/luccas00/output/github-contribution-grid-snake-dark.svg"></p>
            <p>
              <a href="https://github.com/luccas00" target="_blank" rel="noopener">
                <img width="900" alt="3D Profile Night Green" src="https://raw.githubusercontent.com/luccas00/luccas00/main/profile-3d-contrib/profile-night-green.svg">
              </a>
            </p>
            <p><img alt="Yoda Quote" src="https://quotes-github-readme.vercel.app/api?type=horizontal&theme=algolia&quote=Do.%20Or%20do%20Not.%20There%20is%20no%20Try...&author=Yoda"></p>
          </section>

          <footer class="container center">
            <p>© <span id="y"></span> Luccas — Power Platform &amp; Dynamics 365</p>
            <p style="font-size:0.8em;color:var(--muted,#b3b3b3);">
              Background Matrix effect by <a href="https://github.com/rezmason/matrix" target="_blank" rel="noopener">Rezmason</a> — Licensed under MIT.
            </p>
          </footer>
        </main>
      </div>
      <script>this.shadowRoot.querySelector('#y')?.textContent = (new Date()).getFullYear();</script>
    `;

    this.shadowRoot.innerHTML = `<style>${style}</style>${html}`;
  }
}

if(!customElements.get('luccas-profile')){
  customElements.define('luccas-profile', LuccasProfile);
}
