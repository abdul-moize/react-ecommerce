import { useContext, useEffect, useState } from "react";
import OrderItem from "../../components/orderItem";
import { getOrders } from "../../services/cartService";
import { UserContext } from "../../store/userContext";
import "./orders.css";

export default function Orders() {
  const [orders, setOrders] = useState(null);

  const userToken = useContext(UserContext).user.token;
  console.log(userToken);
  useEffect(() => {
    getOrders(userToken)
      .then((data) => {
        setOrders(data);
      })
      .catch((errorMessage) => {});
  }, [userToken]);

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
