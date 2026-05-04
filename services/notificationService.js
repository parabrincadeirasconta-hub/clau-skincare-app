/**
 * NOTIFICATION SERVICE
 * Sistema de notificações (Toast)
 */

class NotificationService {
  static container = null;
  static duration = 3000;

  /**
   * Inicializar container
   */
  static init() {
    this.container = document.getElementById('notification-container');
    if (!this.container) {
      const div = document.createElement('div');
      div.id = 'notification-container';
      div.className = 'notification-container';
      document.body.appendChild(div);
      this.container = div;
    }
  }

  /**
   * Mostrar notificação
   */
  static show(message, type = 'info') {
    if (!this.container) this.init();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    this.container.appendChild(notification);

    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 10);

    // Remove after duration
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, this.duration);
  }

  /**
   * Sucesso
   */
  static success(message) {
    this.show(message, 'success');
  }

  /**
   * Erro
   */
  static error(message) {
    this.show(message, 'error');
  }

  /**
   * Aviso
   */
  static warning(message) {
    this.show(message, 'warning');
  }

  /**
   * Informação
   */
  static info(message) {
    this.show(message, 'info');
  }
}

export default NotificationService;