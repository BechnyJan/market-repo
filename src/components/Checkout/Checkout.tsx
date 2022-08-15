import React, { useContext } from "react";
import { Button } from "../../reusable-components/Button";
import { CartContext } from "../../store/cart-context";
import classes from "./Checkout.module.css";
import CheckoutProduct from "./CheckoutProduct/CheckoutProduct";

const Checkout = () => {
  const cartContext = useContext(CartContext);
  const clearHandler = () => {
    cartContext.remove();
  };
  return (
    <div className={classes.checkout}>
      <div className={classes.checkout__heading}>
        <h2>Checkout</h2>
      </div>
      <div>
        <img
          className={classes.checkout__ad}
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />
        <div className={classes.checkout__product}>
          {/* <h3>{user ? `Hello ${user.email}` : ""}</h3> */}
          <h2 className={classes.checkout__title}>Your shopping Basket</h2>
        </div>
        <div>
          <div className={classes.checkout__container}>
            <div className={classes.checkout__left}>
              {cartContext.basket?.map((item, index) => (
                <CheckoutProduct i={index} key={index} checkout={item} />
              ))}
            </div>
            {/* <div className={classes.checkout__right}> */}
            <div className={classes.checkout__subtotal}>
              <p>
                Subtotal <span>{cartContext.basket?.length}</span>{" "}
                {cartContext.basket?.length < 2 ? "item" : "items"}
              </p>
              <div className={classes.checkout__btnContainer}>
                <Button
                  classNameBut={classes.checkout__remove}
                  text={"Remove Cart"}
                  type={"button"}
                  onClick={clearHandler}
                />
                <Button
                  text={"Proceed to Order"}
                  type={"button"}
                  onClick={() => {}}
                />
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
