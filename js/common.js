(() => {
  const year = document.getElementById("y");
  if (year) year.textContent = new Date().getFullYear();

  const savedLanguage = localStorage.getItem("portfolio-language");
  if (savedLanguage) {
    document.documentElement.lang = savedLanguage;
  }
})();
