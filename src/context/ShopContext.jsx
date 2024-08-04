import React, {createContext, useState} from "react";
import all_product from "../components/assets/all_product"

export const ShopContext = createContext(null);

const getDefaultCart= ()=>{
    let cart= {};
    for (let index=0; index < all_product.length+1; index++){
        cart[index]=0;
    }
    return cart;
}

const ShopContextProvider = (props) => {

    const [cartItems,setCartItems] = useState(getDefaultCart());
    const [error, setError] = useState(null);

    const addToCart = (itemId) => {
      try {
        if (!itemId || typeof itemId !== "number") {
          throw new Error("Invalid item ID");
        }
        if (!all_product.some(product => product.id === itemId)) {
          throw new Error("Item not found");
        }
  
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        setError(null); 
      } catch (err) {
        setError(err.message);
      }
    };
  
    const removeFromCart = (itemId) => {
      try {
        if (!itemId || typeof itemId !== "number") {
          throw new Error("Invalid item ID");
        }
        if (cartItems[itemId] === 0) {
          throw new Error("Item not in cart");
        }

  
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        setError(null); 
      } catch (err) {
        setError(err.message);
      }
    };
  
    const getTotalCartAmount=()=>{
        let totalAmount=0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                let itemInfo = all_product.find((product)=>product.id===Number(item))
                totalAmount += itemInfo.new_price * cartItems[item];
            }
           
        }
        return totalAmount;
    }
    const getTotalCartItems =() =>{
        let totalItem=0;
        for(const item in cartItems)
            {
                if(cartItems[item]>0)
                {
                    totalItem += cartItems[item];
                }
            }      
            return totalItem;
    }

    const contextValue={getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart,error};

    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )

}
export default ShopContextProvider;
