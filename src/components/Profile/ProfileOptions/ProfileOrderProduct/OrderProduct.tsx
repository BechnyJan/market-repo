import React, { Children, FC, ReactNode, useContext, useState } from "react";
import classes from "./OrderProduct.module.css";
import { Button } from "../../../../reusable-components/Button";
import { CartContext } from "../../../../store/cart-context";
import { higher, OrderedData, RestructedData } from "../ProfileOrders";

type OrderedProps = {
  product: RestructedData;
  photo: string;
  name: string;
  company: string;
  totalAmount: number;
  date: string;
  onReorder: (data: RestructedData) => void;
  index: number;
  setShow: (e: any) => void;
  show: boolean;
};

const OrderProduct: FC<OrderedProps> = ({
  product,
  onReorder,
  index,
  setShow,
  show,
  photo,
  name,
  company,
  date,
  totalAmount,
}) => {
  const [state, setState] = useState(show);
  const cartContext = useContext(CartContext);
  // console.log(product);

  const reorderHandler = (data: RestructedData) => {
    onReorder(data);
  };

  const detailHandler = () => {
    setState((prevState: boolean) => !prevState);
  };

  return (
    <>
      <div className={classes.order__product}>
        <div className={classes.order__information}>
          <div className={classes.order__image}>
            <img src={photo} alt={name} />
          </div>
          <div className={classes.order__title}>
            <h4>
              {`${name} - `}
              <span>{company}</span>
            </h4>
            <p className={classes.order__date}>{date}</p>
          </div>
        </div>
        {/* Arrival,
                List of purchased items,
                Total price,
                Reorder (button || option),
                Detail of order (button to show)
            */}

        <div className={classes.order__reorder}>
          <p>{`${totalAmount} $`}</p>
          <Button
            classNameBut={classes.order__button}
            text={"Reorder"}
            type="button"
            onClick={() => {
              reorderHandler(product);
            }}
          />
        </div>
      </div>
      <div onClick={detailHandler} className={classes.order__view}>
        <p>
          View Details <span>{"6 items"}</span>
        </p>
        <p>{"V"}</p>
      </div>
      {state && <div>Hoj</div>}
    </>
  );
};

export default OrderProduct;
