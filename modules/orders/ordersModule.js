/**
 * ORDERS MODULE
 * Lógica de pedidos (UI + negócio)
 */

import OrdersService from '../../services/ordersService.js';
import CartService from '../../services/cartService.js';
import { NotificationService } from '../../services/notificationService.js';

export class OrdersModule {
  constructor() {
    this.orders = [];
    this.currentOrder = null;
  }

  /**
   * Carregar pedidos do usuário
   */
  async loadUserOrders() {
    try {
      this.orders = await OrdersService.getUserOrders();
      return this.orders;
    } catch (error) {
      NotificationService.error('Erro ao carregar pedidos');
      throw error;
    }
  }

  /**
   * Carregar todos os pedidos (ADMIN)
   */
  async loadAllOrders() {
    try {
      this.orders = await OrdersService.getAll();
      return this.orders;
    } catch (error) {
      NotificationService.error('Erro ao carregar pedidos');
      throw error;
    }
  }

  /**
   * Criar novo pedido a partir do carrinho
   */
  async createOrderFromCart(paymentMethod = 'credit_card') {
    try {
      const cart = CartService.getCart();
      if (cart.length === 0) {
        NotificationService.warning('Carrinho vazio');
        return null;
      }

      const total = CartService.getTotal();
      const orderData = {
        total,
        payment_method: paymentMethod
      };

      const order = await OrdersService.create(orderData);

      // Adicionar itens do pedido
      for (const item of cart) {
        await OrdersService.addOrderItem(order.id, item.id, item.quantity, item.price);
      }

      CartService.clear();
      this.currentOrder = order;
      NotificationService.success('Pedido criado com sucesso!');

      return order;
    } catch (error) {
      NotificationService.error('Erro ao criar pedido');
      throw error;
    }
  }

  /**
   * Atualizar status do pedido (ADMIN)
   */
  async updateOrderStatus(orderId, status) {
    try {
      const order = await OrdersService.updateStatus(orderId, status);
      NotificationService.success('Pedido atualizado');
      await this.loadAllOrders();
      return order;
    } catch (error) {
      NotificationService.error('Erro ao atualizar pedido');
      throw error;
    }
  }

  /**
   * Cancelar pedido
   */
  async cancelOrder(orderId) {
    try {
      const order = await OrdersService.cancel(orderId);
      NotificationService.success('Pedido cancelado');
      await this.loadUserOrders();
      return order;
    } catch (error) {
      NotificationService.error('Erro ao cancelar pedido');
      throw error;
    }
  }

  /**
   * Obter pedido por ID
   */
  async getOrder(orderId) {
    try {
      const order = await OrdersService.getById(orderId);
      const items = await OrdersService.getOrderItems(orderId);
      return { ...order, items };
    } catch (error) {
      throw error;
    }
  }
}

export default OrdersModule;