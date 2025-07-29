import React, { useEffect, useState } from "react";
import { getAllProducts } from "../services/productService";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts()
      .then((response) => {
        setProducts(response.data);
        console.log("Products fetched successfully", response.data);

        response.data.forEach((product, index) => {
        console.log(`Product ${index + 1}:`, product);
      });      })
      .catch((error) => {
        console.error("Error fetching products", error);
    });
  }, []);

  return (
    <div className="products-grid">
        {products.map((product) => {
          console.log("Image path : ",product.imageUrl);
          return (
            <ProductCard 
                key={product.id}            
                id={product.id}
                name={product.name}
                image={product.imageUrl} alt={product.name}                
                price={product.price} />
        );
})}
    </div>
  );
};

export default ProductList;
