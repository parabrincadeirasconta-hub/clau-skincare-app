/**
 * SUPABASE CLIENT
 * Única conexão com o backend
 */

import { CONFIG } from '../config.js';

class SupabaseClient {
  constructor() {
    this.url = CONFIG.SUPABASE_URL;
    this.key = CONFIG.SUPABASE_ANON_KEY;
    this.headers = {
      'Content-Type': 'application/json',
      'apikey': this.key,
      'Authorization': `Bearer ${this.key}`
    };
  }

  /**
   * Fazer requisição GET
   */
  async get(endpoint, filters = {}) {
    let url = `${this.url}/rest/v1${endpoint}`;
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      params.append(`${key}=eq.${value}`);
    });

    if (params.toString()) {
      url += '?' + params.toString();
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: this.headers
    });

    if (!response.ok) {
      throw new Error(`GET ${endpoint} failed: ${response.statusText}`);
    }

    return await response.json();
  }

  /**
   * Fazer requisição POST
   */
  async post(endpoint, data) {
    const response = await fetch(`${this.url}/rest/v1${endpoint}`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`POST ${endpoint} failed: ${error.message || response.statusText}`);
    }

    return await response.json();
  }

  /**
   * Fazer requisição PATCH
   */
  async patch(endpoint, data, id) {
    const response = await fetch(`${this.url}/rest/v1${endpoint}?id=eq.${id}`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`PATCH ${endpoint} failed: ${response.statusText}`);
    }

    return await response.json();
  }

  /**
   * Fazer requisição DELETE
   */
  async delete(endpoint, id) {
    const response = await fetch(`${this.url}/rest/v1${endpoint}?id=eq.${id}`, {
      method: 'DELETE',
      headers: this.headers
    });

    if (!response.ok) {
      throw new Error(`DELETE ${endpoint} failed: ${response.statusText}`);
    }

    return true;
  }
}

export const supabase = new SupabaseClient();
export default supabase;