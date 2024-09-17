import { useState, useEffect } from 'react';

const useAllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch the JSON file from the backend
    fetch('http://localhost:5000/api/products') // Update this URL to match your backend endpoint
      .then(response => response.json())
      .then(data => setProducts(data)) // Set the fetched data in state
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return products; // Return the products data directly
};

export default useAllProducts;  // dai ara this file is waste according to me so if you want u can delet it 


