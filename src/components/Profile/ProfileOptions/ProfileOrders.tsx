import React, { useState } from "react";
import { DATA_MONTH } from "../../../Data/DataMonth";
import { Button } from "../../../reusable-components/Button";
import classes from "./ProfileOrders.module.css";
import OrderProduct from "./ProfileOrderProduct/OrderProduct";

const DATA_DUMMY = [
  {
    name: "Dragon",
    price: 7000,
    company: "Jelly",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzGZWomcGwUmCwBTYbzedJc_H_INtM9eCf-A&usqp=CAU",

    date: "14945456466",
  },
  {
    name: "Kekler",
    price: 30,
    company: "Yeppers",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzGZWomcGwUmCwBTYbzedJc_H_INtM9eCf-A&usqp=CAU",

    date: "14635456466",
  },
];

const DUMMY = [
  {
    items: [
      {
        amount: 2,
        name: "Kekler",
        price: 50,
        company: "Yeppers",
        photo:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzGZWomcGwUmCwBTYbzedJc_H_INtM9eCf-A&usqp=CAU",
      },
      {
        amount: 2,
        name: "Yeay",
        price: 100,
        company: "Staller",
        photo:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzGZWomcGwUmCwBTYbzedJc_H_INtM9eCf-A&usqp=CAU",
      },
    ],
    date: "11455456466",
    totalAmount: 300,
  },
  {
    items: [
      {
        amount: 6,
        name: "Stalie",
        price: 50,
        company: "Yeppers",
        photo:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzGZWomcGwUmCwBTYbzedJc_H_INtM9eCf-A&usqp=CAU",
      },
      {
        amount: 1,
        name: "Kreps",
        price: 100,
        company: "Tracker",
        photo:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzGZWomcGwUmCwBTYbzedJc_H_INtM9eCf-A&usqp=CAU",
      },
    ],
    date: "12155456466",
    totalAmount: 400,
  },
];

export type OrderedData = {
  name: string;
  price: number;
  company: string;
  photo: string;
  date?: string | number;
};

export type higher = {
  date?: string;
  totalAmount?: number;
  items: RestructedData[];
};

export type RestructedData = {
  amount: number;
  name: string;
  price: number;
  company: string;
  photo: string;
};

const ProfileOrders = () => {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(true);

  let restructedDataArray: higher[] = [];
  for (let i = 0; i < DUMMY.length; i++) {
    let dayDate = new Date(+DUMMY[i].date * 1000).getDate();
    let monthDate = new Date(+DUMMY[i].date * 1000).getMonth();
    let year = new Date(+DUMMY[i].date * 1000).getFullYear();
    let recreatedDate: string[] = [];
    recreatedDate[i] = `${dayDate} ${DATA_MONTH[monthDate]}, ${year}`;
    restructedDataArray = restructedDataArray.concat(DUMMY[i]);
    restructedDataArray[i] = { ...DUMMY[i], date: recreatedDate[i] };
  }
//   console.log(restructedDataArray);

  const reorderPurchaseHandler = (data: RestructedData) => {
    // request to backend
    // setReorder(...data);
    // redirect to cart page!!!
    const newPurchase = { ...data };
    console.log(newPurchase);
  };

  //   console.log(showDetail);

  return (
    <div className={classes.orders}>
      <div className={classes.orders__active}>
        <h4>Active orders</h4>
        {active ? (
          <div className={classes.orders__detail}>
            {
              <div className={classes.orders__product}>
                {/* Arrival,
                List of purchased items,
                Total price,
                Reorder (button || option),
                Detail of order (button to show)
            */}
              </div>
            }
            <p className={classes.orders__delTime}>
              Time of delivery estimated at <span>{"who knows?"}</span>
            </p>
          </div>
        ) : (
          <p>You have no active orders.</p>
        )}
      </div>
      <div className={classes.orders__past}>
        <h4>Past orders</h4>
        {restructedDataArray?.map((item: any, index: number) => (
          <div key={index} className={classes.orders__detail}>
            <OrderProduct
              product={item}
              photo={item.items[index].photo}
              name={item.items[index].name}
              date={item.date}
              company={item.items[index].company}
              totalAmount={item.totalAmount}
              index={index}
              onReorder={reorderPurchaseHandler}
              setShow={setShowDetail}
              show={showDetail}
            />
          </div>
        ))}
        {/* </div> */}
      </div>
    </div>
  );
};

export default ProfileOrders;
