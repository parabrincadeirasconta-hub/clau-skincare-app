/**
 * PRODUCTS MODULE
 * Lógica de produtos (UI + negócio)
 */

import ProductsService from '../../services/productsService.js';
import CartService from '../../services/cartService.js';
import { NotificationService } from '../../services/notificationService.js';

export class ProductsModule {
  constructor() {
    this.products = [];
    this.filteredProducts = [];
    this.currentCategory = 'all';
  }

  /**
   * Carregar todos os produtos
   */
  async loadProducts() {
    try {
      this.products = await ProductsService.getAll();
      this.filteredProducts = this.products;
      return this.products;
    } catch (error) {
      NotificationService.error('Erro ao carregar produtos');
      throw error;
    }
  }

  /**
   * Filtrar por categoria
   */
  filterByCategory(category) {
    this.currentCategory = category;
    if (category === 'all') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(p => p.category === category);
    }
    return this.filteredProducts;
  }

  /**
   * Adicionar produto ao carrinho
   */
  addToCart(productId) {
    const product = this.products.find(p => p.id === productId);
    if (!product) {
      NotificationService.error('Produto não encontrado');
      return;
    }
    CartService.addItem(product);
    NotificationService.success(`${product.name} adicionado ao carrinho!`);
  }

  /**
   * Obter produto por ID
   */
  getProduct(productId) {
    return this.products.find(p => p.id === productId);
  }

  /**
   * Obter categorias únicas
   */
  getCategories() {
    const categories = [...new Set(this.products.map(p => p.category).filter(Boolean))];
    return ['all', ...categories];
  }
}

export default ProductsModule;