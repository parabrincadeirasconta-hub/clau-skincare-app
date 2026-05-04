/**
 * PRODUCTS SERVICE
 * Camada de dados - produtos
 */

import { supabase } from '../lib/supabaseClient.js';
import { CONFIG } from '../config.js';

class ProductsService {
  /**
   * Obter todos os produtos
   */
  static async getAll() {
    try {
      const products = await supabase.get('/products');
      return products || [];
    } catch (error) {
      console.error('Get all products error:', error);
      throw new Error('Erro ao carregar produtos');
    }
  }

  /**
   * Obter produto por ID
   */
  static async getById(id) {
    try {
      const products = await supabase.get(`/products?id=eq.${id}`);
      return products[0] || null;
    } catch (error) {
      throw new Error('Erro ao carregar produto');
    }
  }

  /**
   * Criar novo produto (ADMIN)
   */
  static async create(productData) {
    try {
      const data = {
        ...productData,
        created_at: new Date().toISOString()
      };
      const [product] = await supabase.post('/products', data);
      return product;
    } catch (error) {
      throw new Error('Erro ao criar produto');
    }
  }

  /**
   * Atualizar produto (ADMIN)
   */
  static async update(id, productData) {
    try {
      const result = await supabase.patch('/products', productData, id);
      return result[0];
    } catch (error) {
      throw new Error('Erro ao atualizar produto');
    }
  }

  /**
   * Deletar produto (ADMIN)
   */
  static async delete(id) {
    try {
      await supabase.delete('/products', id);
      return true;
    } catch (error) {
      throw new Error('Erro ao deletar produto');
    }
  }

  /**
   * Buscar produtos por categoria
   */
  static async getByCategory(category) {
    try {
      const products = await supabase.get(`/products?category=eq.${category}`);
      return products || [];
    } catch (error) {
      throw new Error('Erro ao buscar produtos');
    }
  }
}

export default ProductsService;