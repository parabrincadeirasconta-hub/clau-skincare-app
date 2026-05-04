/**
 * CLAU SKIN CARE - CONFIGURAÇÃO GLOBAL
 * Credenciais Supabase e constantes da aplicação
 */

export const CONFIG = {
  // Supabase Configuration
  SUPABASE_URL: 'https://ceqmeknavcvvkkrmmgvp.supabase.co',
  SUPABASE_ANON_KEY: 'sb_publishable_wd9Dwt0QUjM3Kuk-xoiFUDw_esHe1m8B',

  // Admin Configuration
  ADMIN_EMAIL: 'admin@clauskincare.com',
  ADMIN_PASSWORD: 'Admin@2026',

  // App Settings
  APP_NAME: 'Clau Skin Care',
  CURRENCY: 'USD',
  CURRENCY_SYMBOL: '$',

  // API Endpoints (Supabase Tables)
  TABLES: {
    USERS: 'users',
    PRODUCTS: 'products',
    ORDERS: 'orders',
    ORDER_ITEMS: 'order_items',
    ADMIN_LOGS: 'admin_logs'
  },

  // UI Configuration
  ANIMATION_DURATION: 300,
  TOAST_DURATION: 3000,

  // Order Status
  ORDER_STATUS: {
    PENDING: 'PENDING',
    PROCESSING: 'PROCESSING',
    SHIPPED: 'SHIPPED',
    DELIVERED: 'DELIVERED',
    CANCELLED: 'CANCELLED'
  },

  // User Roles
  ROLES: {
    ADMIN: 'ADMIN',
    CLIENT: 'CLIENT'
  }
};

export default CONFIG;