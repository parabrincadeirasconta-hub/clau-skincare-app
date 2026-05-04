/**
 * NAVIGATION MODULE
 * Gerenciar rotas e navegação da aplicação
 */

export class NavigationModule {
  constructor() {
    this.currentPage = null;
    this.pages = new Map();
    this.onNavigate = null;
  }

  /**
   * Registrar página
   */
  registerPage(name, element) {
    this.pages.set(name, element);
  }

  /**
   * Navegar para página
   */
  navigate(pageName) {
    // Ocultar todas as páginas
    this.pages.forEach((element) => {
      element.classList.remove('active');
      element.style.display = 'none';
    });

    // Mostrar página solicitada
    const page = this.pages.get(pageName);
    if (page) {
      page.classList.add('active');
      page.style.display = 'block';
      this.currentPage = pageName;
      this.onNavigate?.(pageName);
    }
  }

  /**
   * Obter página atual
   */
  getCurrentPage() {
    return this.currentPage;
  }
}

export default NavigationModule;