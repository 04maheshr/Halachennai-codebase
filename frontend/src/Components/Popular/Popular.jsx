import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import "./Popular.css";
import Item from "../Item/Item";

const Popular = () => {
  const { data_product } = useContext(ShopContext);
  return (
    <div className="popular">
      <h1>Popular Designs</h1>
      <hr />
      <div className="popular-item">
        {data_product.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
