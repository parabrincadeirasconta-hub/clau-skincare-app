/**
 * AUTH MODULE
 * Lógica de autenticação (UI + negócio)
 */

import { authService } from '../../services/authService.js';
import { NotificationService } from '../../services/notificationService.js';

export class AuthModule {
  constructor() {
    this.loginCallback = null;
    this.logoutCallback = null;
  }

  /**
   * Callback ao fazer login
   */
  onLogin(callback) {
    this.loginCallback = callback;
  }

  /**
   * Callback ao fazer logout
   */
  onLogout(callback) {
    this.logoutCallback = callback;
  }

  /**
   * Executar login
   */
  async login(email, password) {
    try {
      const result = await authService.login(email, password);
      this.loginCallback?.(result);
      NotificationService.success(`Bem-vindo, ${email}!`);
      return result;
    } catch (error) {
      NotificationService.error(error.message);
      throw error;
    }
  }

  /**
   * Executar registro
   */
  async register(email, password) {
    try {
      const result = await authService.register(email, password);
      this.loginCallback?.(result);
      NotificationService.success('Conta criada com sucesso!');
      return result;
    } catch (error) {
      NotificationService.error(error.message);
      throw error;
    }
  }

  /**
   * Executar logout
   */
  logout() {
    authService.logout();
    this.logoutCallback?.();
    NotificationService.success('Logout realizado');
  }

  /**
   * Restaurar sessão do localStorage
   */
  restoreSession() {
    const restored = authService.restoreSession();
    if (restored) {
      const user = authService.getCurrentUser();
      const role = authService.getUserRole();
      this.loginCallback?.({
        user,
        role,
        isAdmin: authService.isAdmin()
      });
    }
    return restored;
  }

  /**
   * Obter usuário autenticado
   */
  getCurrentUser() {
    return authService.getCurrentUser();
  }

  /**
   * Verificar se está autenticado
   */
  isAuthenticated() {
    return authService.isAuthenticated();
  }

  /**
   * Obter role (ADMIN ou CLIENT)
   */
  getUserRole() {
    return authService.getUserRole();
  }

  /**
   * Verificar se é admin
   */
  isAdmin() {
    return authService.isAdmin();
  }
}

export default AuthModule;