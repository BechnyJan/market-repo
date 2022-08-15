import React, { FC, useContext } from "react";
import { Button } from "../../../reusable-components/Button";
import { CartContext, InitAction } from "../../../store/cart-context";
import { DataType } from "../../Products/Products";
import classes from "./CheckoutProduct.module.css";

type CheckoutProps = { checkout: DataType; key: number; i: number };
// type RemoveProp = { () => { type: string; id: number }};

const CheckoutProduct: FC<CheckoutProps> = ({ checkout, key, i }) => {
  const cartContext = useContext(CartContext);
  //   const removeFromBasket = (e: any,id: number) => {
  //     e.preventDefault()
  //     cartContext.removeFromCart({id:+checkout.id})
  //   };
  console.log(cartContext);
  // let i = key;
  console.log(i);
  const content = cartContext.basket[i].company;
  console.log(content);

  const removeHandler = (id: number) => {
    let idItem: number = checkout.id;
    cartContext.removeFromCart(idItem);
  };

  return (
    <div key={checkout.id} className={classes.checkoutProduct}>
      <img
        className={classes.checkoutProduct__image}
        src={checkout.photo}
        alt=""
      />

      <div className={classes.checkoutProduct__info}>
        <h4 className={classes.checkoutProduct__title}>{checkout.name}</h4>
        <div className={classes.checkoutProduct__price}>
          <div>
            <small>$</small>
            <strong>{checkout.price}</strong>
          </div>
          <p className={classes.checkoutProduct__company}>{content}</p>
          <p>{checkout.amountItem}</p>
        </div>
        {/* <div className="checkoutProduct__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>🌟</p>
            ))}
        </div> */}
        <div className={classes.checkoutProduct__btn}>
          <Button
            type="button"
            text={"Remove from Basket"}
            onClick={removeHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutProduct;
