import { useState, useEffect, createContext } from "react";

export const ShopContext = createContext(null);

// Define getDefaultCart function
const getDefaultCart = (allProducts) => {
  let cart = {};
  for (let index = 0; index < allProducts.length + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAllProducts] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart([]));
  const [new_collections, setCollections] = useState([]);
  const [data_product, setPopularDesign] = useState([]); 

  useEffect(() => {
    // Fetc
    fetch('http://localhost:5000/api/products') //working
      .then(response => response.json())
      .then(data => {
        // Assuming data structure is { productsList }
        setAllProducts(data.productsList || []);
        setCollections(data.collections)
        setPopularDesign(data.popularItems)
        setCartItems(getDefaultCart(data.productsList || [])); //d on't know why working
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  }, []);
  console.log(all_product);
  console.log(new_collections);
  console.log(data_product);


  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    new_collections,
    data_product,
    addToCart,
    removeFromCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
