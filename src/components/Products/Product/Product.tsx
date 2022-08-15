import React, { FC, useContext } from "react";
import { CartContext } from "../../../store/cart-context";
import { Button } from "../../../reusable-components/Button";
import classes from "./Product.module.css";
import { DataType } from "../Products";

type ProductProps = {
  product: DataType;
  onAdd: (item: any) => void;
  key: number;
};

const Product: FC<ProductProps> = ({ product, onAdd, key }) => {
  let link = `https://shop-62ffc-default-rtdb.europe-west1.firebasedatabase.app/order.json`;

  const addHandler = () => {
    // e.preventDefault();
    // const getIndex = data.id

    onAdd(product);
  };

  const favouriteHandler = (id: number) => {
    let favouriteItem = { ...product, isFavourited: true };
    // let recreateIt = [{isFavourited:true}]
    console.log(favouriteItem);

    // let favouriteItem = [];
    console.log(id);
  };

  let productName = product.name.slice(0, 1).toUpperCase() + product.name.slice(1);
  let productDescription =
    product.description.slice(0, 1).toUpperCase() + product.description.slice(1);

  return (
    // <div className={classes.product}>

    <>
      <div key={key} className={classes.product__container}>
        <img
          className={classes.product__image}
          src={product.photo}
          alt={product.name}
        />
        <div className={classes.product__detail}>
          <h4>{productName}</h4>
          <p>{`${product.price}$`}</p>
        </div>
        <div className={classes.product__description}>
          {productDescription}
        </div>
        <div className={classes.product__buttons}>
          <Button
            type="button"
            classNameBut={classes.product__like}
            text="Like"
            onClick={favouriteHandler}
          />
          <Button
            type="button"
            classNameBut={classes.product__add}
            text="Add to Cart"
            onClick={addHandler}
          />
        </div>
      </div>
    </>
  );
};

export default Product;
