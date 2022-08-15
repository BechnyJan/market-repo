import React, { FC, useReducer } from "react";
import { DataType } from "../components/Products/Products";

type InitState = {
  basket: any[];
  amount: number;
};

export type InitAction = {
  type: string;
  payload: DataType;
};

type RemoveAction = {
  type: string;
  id: number;
};

type InitStateContext = {
  basket: DataType[];
  amount: number;
  addToCart: (item: DataType) => void;
  removeFromCart: (id: number) => void;
  remove: () => void;
};

type BasketType = {
  id: number;
  price: number;
};

type Children = { children: React.ReactNode };

let basketT: DataType[] = JSON.parse(localStorage.getItem("cart") || "[]");
console.log(basketT);
let amounT: number = JSON.parse(localStorage.getItem("amount") || "0");
// let recreatedInit = [{basket: [...basketT],amount: basketT.amount}]
let check: void;

const initialState: InitState = { basket: basketT, amount: amounT };
console.log(initialState);

export const CartContext = React.createContext<InitStateContext>({
  basket: [],
  amount: 0,
  addToCart: (item) => {},
  removeFromCart: (id) => {},
  remove: () => {},
});

const reducer = (state: InitState, action: any): InitState => {
  if (action.type === "ADD__TO__CART") {
    // console.log("Hello", action.payload);
    const updatedAmount = state.amount + action.payload.price;
    let amountLocal: void;
    console.log(updatedAmount);
    // let receivedData;
    const existingIndex = state.basket.findIndex(
      (item) => item.id === action.payload.id
    );
    // console.log(existingIndex);
    const existingCartItem = state.basket[existingIndex];
    let receivedData: DataType[];
    if (existingCartItem) {
      let updatedItem = {
        ...existingCartItem,
        amountItem:
          existingCartItem.amountItem < 1
            ? existingCartItem.amountItem + 0
            : existingCartItem.amountItem + action.payload.amountItem,
      };
      receivedData = [...state.basket];
      receivedData[existingIndex] = updatedItem;
    } else {
      receivedData = state.basket.concat(action.payload);
      // check = localStorage.setItem("cart", JSON.stringify(receivedData));
    }
    // if(index !== -1) {
    //   // receivedData
    // }

    // if (action.payload) {
    // for (let i = 0; i < state.basket.length; i++) {
    //   const result = action.payload.id === array[i];
    //   console.log(result);
    // let basketLocal = [{ basket: [...receivedData], amount: updatedAmount }];
    check = localStorage.setItem("cart", JSON.stringify(receivedData));
    amountLocal = localStorage.setItem("amount", JSON.stringify(updatedAmount));
    console.log(check, amountLocal);
    // }
    // }
    return { basket: receivedData, amount: updatedAmount };
  }
  if (action.type === "REMOVE__FROM__CART") {
    console.log("Ahoj jsem tady");
    const existingCartItem = state.basket.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.basket[existingCartItem];
    console.log(existingItem);

    const updatedAmount = state.amount - existingItem.price;
    let updatedItems;
    if (existingItem.amountItem === 1) {
      updatedItems = state.basket.filter((item) => item.id !== action.id);
      // localStorage.setItem("cart", JSON.stringify(updatedItems));
    } else {
      const updatedItem = {
        ...existingItem,
        amountItem: existingItem.amountItem - 1,
      };
      updatedItems = [...state.basket];
      updatedItems[existingCartItem] = updatedItem;
    }
    localStorage.setItem("cart", JSON.stringify(updatedItems));
    localStorage.setItem("amount", JSON.stringify(updatedAmount));

    return { basket: updatedItems, amount: updatedAmount };
  }
  if (action.type === "DISCARD") {
    let updatedItems: any[] = [];
    let totalAmount: number = 0;
    localStorage.setItem("cart", JSON.stringify(updatedItems));
    localStorage.setItem("amount",JSON.stringify(totalAmount));
    // localStorage.removeItem("cart");
    return { basket: updatedItems, amount: totalAmount };
    // return initialState;
  }
  return initialState;
};

const CartContextProvider: FC<Children> = ({ children }) => {
  const [cartState, dispatch] = useReducer(reducer, initialState);

  const addToCartHandler = (item: DataType) => {
    // const obj = { ...item, amount: amount };
    // console.log(obj);

    dispatch({ type: "ADD__TO__CART", payload: item });
  };

  const removeHandler = (id: any) => {
    dispatch({ type: "REMOVE__FROM__CART", id: id });
  };

  const removeAll = () => {
    dispatch({ type: "DISCARD" });
  };

  const CartContextValue: InitStateContext = {
    basket: cartState.basket,
    amount: cartState.amount,
    addToCart: addToCartHandler,
    removeFromCart: removeHandler,
    remove: removeAll,
  };

  return (
    <CartContext.Provider value={CartContextValue}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
