/**
 * CART SERVICE
 * Carrinho de compras (localStorage)
 */

class CartService {
  static STORAGE_KEY = 'clau_cart';

  /**
   * Inicializar carrinho
   */
  static init() {
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify([]));
    }
  }

  /**
   * Obter carrinho
   */
  static getCart() {
    this.init();
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
  }

  /**
   * Adicionar item ao carrinho
   */
  static addItem(product) {
    const cart = this.getCart();
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart));
    return cart;
  }

  /**
   * Remover item do carrinho
   */
  static removeItem(productId) {
    const cart = this.getCart();
    const filtered = cart.filter(item => item.id !== productId);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
    return filtered;
  }

  /**
   * Atualizar quantidade
   */
  static updateQuantity(productId, quantity) {
    const cart = this.getCart();
    const item = cart.find(i => i.id === productId);

    if (item) {
      if (quantity <= 0) {
        return this.removeItem(productId);
      }
      item.quantity = quantity;
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart));
    return cart;
  }

  /**
   * Obter total
   */
  static getTotal() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  /**
   * Obter quantidade de itens
   */
  static getItemCount() {
    const cart = this.getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
  }

  /**
   * Limpar carrinho
   */
  static clear() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify([]));
  }
}

export default CartService;