/**
 * ORDERS SERVICE
 * Camada de dados - pedidos
 */

import { supabase } from '../lib/supabaseClient.js';
import { authService } from './authService.js';

class OrdersService {
  /**
   * Obter todos os pedidos (ADMIN)
   */
  static async getAll() {
    try {
      const orders = await supabase.get('/orders');
      return orders || [];
    } catch (error) {
      throw new Error('Erro ao carregar pedidos');
    }
  }

  /**
   * Obter pedidos do usuário
   */
  static async getUserOrders() {
    try {
      const user = authService.getCurrentUser();
      if (!user) throw new Error('Usuário não autenticado');

      const orders = await supabase.get(`/orders?user_id=eq.${user.id}`);
      return orders || [];
    } catch (error) {
      throw new Error('Erro ao carregar pedidos');
    }
  }

  /**
   * Obter pedido por ID
   */
  static async getById(id) {
    try {
      const orders = await supabase.get(`/orders?id=eq.${id}`);
      return orders[0] || null;
    } catch (error) {
      throw new Error('Erro ao carregar pedido');
    }
  }

  /**
   * Criar novo pedido
   */
  static async create(orderData) {
    try {
      const user = authService.getCurrentUser();
      if (!user) throw new Error('Usuário não autenticado');

      const data = {
        ...orderData,
        user_id: user.id,
        status: 'PENDING',
        created_at: new Date().toISOString()
      };

      const [order] = await supabase.post('/orders', data);
      return order;
    } catch (error) {
      throw new Error('Erro ao criar pedido');
    }
  }

  /**
   * Adicionar item ao pedido
   */
  static async addOrderItem(orderId, productId, quantity, price) {
    try {
      const data = {
        order_id: orderId,
        product_id: productId,
        quantity,
        price,
        created_at: new Date().toISOString()
      };

      const [item] = await supabase.post('/order_items', data);
      return item;
    } catch (error) {
      throw new Error('Erro ao adicionar item ao pedido');
    }
  }

  /**
   * Obter itens do pedido
   */
  static async getOrderItems(orderId) {
    try {
      const items = await supabase.get(`/order_items?order_id=eq.${orderId}`);
      return items || [];
    } catch (error) {
      throw new Error('Erro ao carregar itens do pedido');
    }
  }

  /**
   * Atualizar status do pedido
   */
  static async updateStatus(orderId, status) {
    try {
      const result = await supabase.patch('/orders', { status }, orderId);
      return result[0];
    } catch (error) {
      throw new Error('Erro ao atualizar pedido');
    }
  }

  /**
   * Cancelar pedido
   */
  static async cancel(orderId) {
    try {
      const result = await supabase.patch('/orders', { status: 'CANCELLED' }, orderId);
      return result[0];
    } catch (error) {
      throw new Error('Erro ao cancelar pedido');
    }
  }
}

export default OrdersService;