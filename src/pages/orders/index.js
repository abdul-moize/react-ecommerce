import { useEffect, useState } from "react";
import { OrderItem } from "../../components/orderItem";
import { getOrders } from "../../services/cartService";
import "./orders.css";

export function Orders() {
  const [orders, setOrders] = useState(null);
  useEffect(() => {
    getOrders()
      .then((data) => {
        setOrders(data);
      })
      .catch((errorMessage) => {
        console.log(errorMessage);
      });
  }, []);
  return (
    <div className="orders-box">
      {orders ? (
        <>
          <h1 className="title-field">Orders</h1>
          {orders.map((order, index) => (
            <OrderItem
              cartItems={order.cart_items}
              key={order.id}
              order={index + 1}
            />
          ))}
        </>
      ) : (
        "You have no previous orders"
      )}
    </div>
  );
}
