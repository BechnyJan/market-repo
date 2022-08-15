import React, { FC, useContext } from "react";
import { CartContext } from "../../store/cart-context";
import Product from "./Product/Product";
import classes from "./Products.module.css";

type ProductsProps = {
  data: any[] | null;
  error: JSX.Element | undefined;
};
export type DataType = {
  amount?: number;
  name: string;
  price: number;
  id: number;
  description: string;
  photo: string;
  company: string;
  isFavourited: boolean;
  amountItem: number;
};

const Products: FC<ProductsProps> = ({ data, error }) => {
  //   console.log(data);
  // const { description, id, price, company, photo, isFavourited, name } = data;
  console.log(data);

  const cartContext = useContext(CartContext);
  // console.log(cartContext.basket);
  const addToCartHandler = (e: DataType) => {
    let addNum: number = 1;

    let result = { ...e, amountItem: addNum };
    cartContext.addToCart(result);
  };

  return (
    <div className={classes.products}>
      <div className={classes.products__heading}>
        <h2>Products</h2>
      </div>
      {error}
      {!error && (
        <div className={classes.products__grid}>
          {data?.length ===0 ? (
            <p>No valid entrance</p>
          ) : (
            data?.map((item, index) => (
              <Product
                key={index}
                product={item}
                // boo={true}
                onAdd={addToCartHandler}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
