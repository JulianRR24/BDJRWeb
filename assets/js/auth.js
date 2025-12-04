// assets/js/auth.js
import { apiRequest } from './api.js';

export async function login(email, password) {
    try {
        const response = await apiRequest('auth.php?action=login', 'POST', { email, password });
        
        if (response.access_token) {
            localStorage.setItem('supabase_token', response.access_token);
            localStorage.setItem('user', JSON.stringify(response.user));
            return response.user;
        }
    } catch (error) {
        throw error;
    }
}

export async function register(email, password) {
    try {
        const response = await apiRequest('auth.php?action=register', 'POST', { email, password });
        return response;
    } catch (error) {
        throw error;
    }
}

export function logout() {
    localStorage.removeItem('supabase_token');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

export function getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
}

export function isAuthenticated() {
    return !!localStorage.getItem('supabase_token');
}
