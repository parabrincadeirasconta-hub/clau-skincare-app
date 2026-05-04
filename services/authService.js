/**
 * AUTH SERVICE
 * Camada de dados - autenticação
 */

import { supabase } from '../lib/supabaseClient.js';
import { CONFIG } from '../config.js';

class AuthService {
  constructor() {
    this.currentUser = null;
    this.currentRole = null;
  }

  /**
   * Login com email/password
   */
  async login(email, password) {
    try {
      // Buscar usuário
      const users = await supabase.get('/users', { email });
      
      if (users.length === 0) {
        throw new Error('Usuário não encontrado');
      }

      const user = users[0];

      // Verificar password (simplificado - em produção usar bcrypt)
      if (user.password_hash !== this.hashPassword(password)) {
        throw new Error('Senha incorreta');
      }

      // Determinar role
      const role = email === CONFIG.ADMIN_EMAIL ? CONFIG.ROLES.ADMIN : CONFIG.ROLES.CLIENT;

      // Salvar em localStorage
      this.currentUser = { id: user.id, email: user.email };
      this.currentRole = role;
      this.saveSession();

      return {
        user: this.currentUser,
        role: this.currentRole,
        isAdmin: role === CONFIG.ROLES.ADMIN
      };
    } catch (error) {
      throw new Error(error.message || 'Erro ao fazer login');
    }
  }

  /**
   * Registro de novo usuário
   */
  async register(email, password) {
    try {
      // Verificar se usuário já existe
      const existing = await supabase.get('/users', { email });
      if (existing.length > 0) {
        throw new Error('Usuário já cadastrado');
      }

      // Criar usuário
      const userData = {
        email,
        password_hash: this.hashPassword(password),
        role: CONFIG.ROLES.CLIENT,
        created_at: new Date().toISOString()
      };

      const [created] = await supabase.post('/users', userData);

      // Fazer login automaticamente
      return this.login(email, password);
    } catch (error) {
      throw new Error(error.message || 'Erro ao registrar');
    }
  }

  /**
   * Logout
   */
  logout() {
    this.currentUser = null;
    this.currentRole = null;
    localStorage.removeItem('clau_user');
    localStorage.removeItem('clau_role');
  }

  /**
   * Salvar sessão em localStorage
   */
  saveSession() {
    localStorage.setItem('clau_user', JSON.stringify(this.currentUser));
    localStorage.setItem('clau_role', this.currentRole);
  }

  /**
   * Restaurar sessão do localStorage
   */
  restoreSession() {
    const user = localStorage.getItem('clau_user');
    const role = localStorage.getItem('clau_role');

    if (user && role) {
      this.currentUser = JSON.parse(user);
      this.currentRole = role;
      return true;
    }
    return false;
  }

  /**
   * Hash simples (em produção usar bcrypt)
   */
  hashPassword(password) {
    return btoa(password);
  }

  /**
   * Verificar se está autenticado
   */
  isAuthenticated() {
    return this.currentUser !== null && this.currentRole !== null;
  }

  /**
   * Obter usuário atual
   */
  getCurrentUser() {
    return this.currentUser;
  }

  /**
   * Obter role
   */
  getUserRole() {
    return this.currentRole;
  }

  /**
   * Verificar se é admin
   */
  isAdmin() {
    return this.currentRole === CONFIG.ROLES.ADMIN;
  }
}

export const authService = new AuthService();
export const AuthService = authService;