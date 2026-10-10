(() => {
  const root = document.documentElement;
  const mount = document.getElementById("navbar");
  if (!mount) return;

  const certUrl =
    "https://learn.microsoft.com/en-us/users/luccascarneiro-1661/credentials?tab=credentials-tab";

  mount.innerHTML = `
    <section class="card navbar">
      <div class="cta-grid" role="navigation" aria-label="Main navigation">

        <a class="btn with-icon" href="/index.html" aria-label="Home">
          <img class="icon" src="/images/home-svgrepo-com.svg" alt="" aria-hidden="true">
          <span>Home</span>
        </a>

        <a class="btn with-icon" href="/projects.html">
          <img class="icon" src="/images/development-web-development-svgrepo-com.svg" alt="" aria-hidden="true">
          <span>Projects</span>
        </a>

        <a class="btn with-icon" href="${certUrl}" target="_blank" rel="noopener">
          <img class="icon" src="/images/microsoft-svgrepo-com.svg" alt="" aria-hidden="true">
          <span>Certifications</span>
        </a>

        <a class="btn with-icon"
          href="https://www.linkedin.com/in/luccas-carneiro-678689171/"
          target="_blank"
          rel="noopener">
          <img class="icon" src="/images/linkedin-svgrepo-com.svg" alt="" aria-hidden="true">
          <span>LinkedIn</span>
        </a>

        <a class="btn with-icon" href="/resume.html" aria-label="Resume">
          <img class="icon" src="/images/curriculum-information-svgrepo-com.svg" alt="" aria-hidden="true">
          <span>Resume</span>
        </a>

        <span class="nav-spacer" aria-hidden="true"></span>

        <div class="lang-switch" role="group" aria-label="Select language">
          <button class="lang-opt" data-lang="pt-BR" type="button" aria-pressed="false">PT</button>
          <button class="lang-opt" data-lang="en-US" type="button" aria-pressed="true">EN</button>
        </div>

        <div class="theme-switch" role="group" aria-label="Select theme">
          <button class="theme-opt" data-theme="dark" type="button" aria-pressed="true" title="Dark theme">🌙</button>
          <button class="theme-opt" data-theme="light" type="button" aria-pressed="false" title="Light theme">☀️</button>
        </div>

      </div>
    </section>
  `;

  const path = window.location.pathname.toLowerCase();
  mount.querySelectorAll('a.btn[href^="/"]').forEach((link) => {
    const href = link.getAttribute("href").toLowerCase();
    if (
      (href === "/index.html" && (path === "/" || path.endsWith("/index.html"))) ||
      (href !== "/index.html" && path.endsWith(href))
    ) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  const savedTheme = localStorage.getItem("portfolio-theme");
  const preferredTheme =
    savedTheme ||
    (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    localStorage.setItem("portfolio-theme", theme);

    mount.querySelectorAll(".theme-opt").forEach((button) => {
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.theme === theme)
      );
    });
  };

  applyTheme(preferredTheme);

  mount.querySelectorAll(".theme-opt").forEach((button) => {
    button.addEventListener("click", () => applyTheme(button.dataset.theme));
  });

  mount.querySelectorAll(".lang-opt").forEach((button) => {
    button.addEventListener("click", () => {
      const language = button.dataset.lang;
      localStorage.setItem("portfolio-language", language);

      mount.querySelectorAll(".lang-opt").forEach((item) => {
        item.setAttribute("aria-pressed", String(item === button));
      });

      document.documentElement.lang = language;

      window.dispatchEvent(
        new CustomEvent("portfolio-language-change", {
          detail: { language }
        })
      );
    });
  });
})();
