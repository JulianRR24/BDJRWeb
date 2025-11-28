import { products } from './products.js';

const CART_KEY = 'tech_startup_cart';

export const getCart = () => {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
};

export const addToCart = (productId) => {
    const cart = getCart();
    const existingItem = cart.find(item => item.productId === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ productId, quantity: 1 });
    }

    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();
};

export const removeFromCart = (productId) => {
    let cart = getCart();
    cart = cart.filter(item => item.productId !== productId);
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();
};

export const updateQuantity = (productId, quantity) => {
    const cart = getCart();
    const item = cart.find(item => item.productId === productId);
    if (item) {
        item.quantity = parseInt(quantity);
        if (item.quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        updateCartCount();
    }
};

export const clearCart = () => {
    localStorage.removeItem(CART_KEY);
    updateCartCount();
};

export const getCartTotal = () => {
    const cart = getCart();
    return cart.reduce((total, item) => {
        const product = products.find(p => p.id === item.productId);
        return total + (product ? product.price * item.quantity : 0);
    }, 0);
};

export const updateCartCount = () => {
    const cart = getCart();
    const count = cart.reduce((acc, item) => acc + item.quantity, 0);
    const badge = document.getElementById('cart-count');
    if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
    }
};
