'use client'

import { createContext, useState, useContext } from "react";

const CartContext = createContext();

export default function CartProvider ({children}) {

    const [cart, setCart] = useState([]);

    return (
        <CartContext.Provider value={{cart, setCart}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext);