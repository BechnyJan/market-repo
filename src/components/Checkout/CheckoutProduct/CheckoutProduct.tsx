import React, { FC, useCallback, useContext, useEffect, useState } from "react";
import Transition from "react-transition-group/Transition";

import { Button } from "../../../reusable-components/Button";
import { CartContext, InitAction } from "../../../store/cart-context";
import { DataType } from "../../Products/Products";
import classes from "./CheckoutProduct.module.css";

type CheckoutProps = {
  checkout: DataType;
  key: number;
  i: number;
  animationProp: boolean;
  onRemove: (item: number) => void;
};
// type RemoveProp = { () => { type: string; id: number }};

const CheckoutProduct: FC<CheckoutProps> = ({
  checkout,
  key,
  i,
  animationProp,
  onRemove,
}) => {
  const cartContext = useContext(CartContext);
  const [animation, setAnimation] = useState(animationProp);
  //   const removeFromBasket = (e: any,id: number) => {
  //     e.preventDefault()
  //   };
  // console.log(cartContext);
  console.log(animation);

  let idItem: number = checkout.id;

  // const removeItemHandler = useCallback(() => {
  // }, [idItem, onRemove]);

  // useEffect(() => {
  //   setTimeout(removeItemHandler, 2500);
  // }, [animation, removeItemHandler]);
  // let i = key;
  console.log(i);
  const content = cartContext.basket[i].company;
  console.log(content);

  const removeHandler = () => {
    if (checkout.amountItem !== 1) {
      onRemove(idItem);
    } else {
      setAnimation((prevState) => !prevState);
      setTimeout(() => {
        onRemove(idItem);
        setAnimation((prevState) => !prevState);
      }, 600);
    }

    // cartContext.removeFromCart({id:+checkout.id})
  };

  console.log(animation);

  // && checkout.amountItem !== 1

  let containerClasses = !animation
    ? classes.checkoutProduct
    : `${classes.checkoutProduct} ${classes.checkoutAnimation}`;
  // create a removing animation

  return (
    <Transition in={animation} timeout={500}>
      {(state) => (
        // <div style={{backgroundColor: 'white',margin: '0 0 0.5rem 1rem'}} className={containerClasses}>
        //   <p>{state}</p>
        //   <h3>{checkout.id}</h3>
        <div key={checkout.id} className={containerClasses}>
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
      )}
    </Transition>
  );
};

export default CheckoutProduct;
