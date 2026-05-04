/**
 * ADMIN MODULE
 * Painel administrativo
 */

import ProductsService from '../../services/productsService.js';
import OrdersService from '../../services/ordersService.js';
import { NotificationService } from '../../services/notificationService.js';

export class AdminModule {
  constructor(authModule) {
    this.auth = authModule;
    this.products = [];
    this.orders = [];
  }

  /**
   * Verificar se tem permissão de admin
   */
  checkPermission() {
    if (!this.auth.isAdmin()) {
      NotificationService.error('Acesso negado');
      throw new Error('Unauthorized');
    }
  }

  /**
   * Criar novo produto
   */
  async createProduct(productData) {
    try {
      this.checkPermission();
      const product = await ProductsService.create(productData);
      NotificationService.success('Produto criado com sucesso');
      return product;
    } catch (error) {
      NotificationService.error('Erro ao criar produto');
      throw error;
    }
  }

  /**
   * Atualizar produto
   */
  async updateProduct(productId, productData) {
    try {
      this.checkPermission();
      const product = await ProductsService.update(productId, productData);
      NotificationService.success('Produto atualizado');
      return product;
    } catch (error) {
      NotificationService.error('Erro ao atualizar produto');
      throw error;
    }
  }

  /**
   * Deletar produto
   */
  async deleteProduct(productId) {
    try {
      this.checkPermission();
      await ProductsService.delete(productId);
      NotificationService.success('Produto deletado');
      return true;
    } catch (error) {
      NotificationService.error('Erro ao deletar produto');
      throw error;
    }
  }

  /**
   * Carregar todos os produtos
   */
  async loadProducts() {
    try {
      this.checkPermission();
      this.products = await ProductsService.getAll();
      return this.products;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Carregar todos os pedidos
   */
  async loadOrders() {
    try {
      this.checkPermission();
      this.orders = await OrdersService.getAll();
      return this.orders;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Dashboard stats
   */
  async getDashboardStats() {
    try {
      this.checkPermission();
      const products = await ProductsService.getAll();
      const orders = await OrdersService.getAll();

      const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
      const totalOrders = orders.length;
      const totalProducts = products.length;
      const pendingOrders = orders.filter(o => o.status === 'PENDING').length;

      return {
        totalRevenue,
        totalOrders,
        totalProducts,
        pendingOrders
      };
    } catch (error) {
      throw error;
    }
  }
}

export default AdminModule;