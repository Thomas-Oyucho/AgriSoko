import { useState, useEffect } from 'react';

export interface CartItem {
    id: number;
    produce_id: number;
    name: string;
    quantity: number;
    unit_price: number;
    farmer_name: string;
    picture?: string;
    stock_available: number;
    stock_unit?: string;
}

export function useCart() {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    const saveCart = (newCart: CartItem[]) => {
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    const addToCart = (item: CartItem) => {
        const existingItemIndex = cart.findIndex((i) => i.produce_id === item.produce_id);
        if (existingItemIndex > -1) {
            const newCart = [...cart];
            newCart[existingItemIndex].quantity += item.quantity;
            saveCart(newCart);
        } else {
            saveCart([...cart, item]);
        }
    };

    const removeFromCart = (produceId: number) => {
        saveCart(cart.filter((item) => item.produce_id !== produceId));
    };

    const updateQuantity = (produceId: number, quantity: number) => {
        saveCart(
            cart.map((item) =>
                item.produce_id === produceId ? { ...item, quantity: Math.max(1, quantity) } : item
            )
        );
    };

    const clearCart = () => {
        saveCart([]);
    };

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.reduce((acc, item) => acc + item.quantity * item.unit_price, 0);

    return {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
    };
}
