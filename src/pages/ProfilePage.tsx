import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../app/store";
import Cart from "../components/Cart";
import NavBar from "../components/navBar";

const ProfilePage = () => {
  const isOpen = useSelector((state: RootState) => state.cart.isOpen);
  const { user } = useSelector((state: RootState) => state.user);
  const [orders, setOrders] = useState([]);
  const [forceRefresh, setForceRefresh] = useState(false);

  useEffect(() => {
    axios
      .get(
        // @ts-ignore
        `https://book-ordering-system.herokuapp.com/users/${user.id}/orders`
      )
      .then((res) => {
        console.log(res.data.orders);
        setOrders(res.data.orders);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user, forceRefresh]);

  const handleCancelOrder = (orderId: number) => {
    // /users/<id>/orders/<id>/cancel
    axios
      .post(
        // @ts-ignore
        `https://book-ordering-system.herokuapp.com/users/${user.id}/orders/${orderId}/cancel`
      )
      .then((res) => {
        toast.success("Order cancelled successfully");
        setForceRefresh(!forceRefresh);
      })
      .catch((err) => {
        toast.error("Error cancelling order");
      });
  };

  return (
    <div>
      <NavBar />
      <div className=" mt-24 flex flex-col justify-center  w-full items-center gap-2">
        <h1 className=" text-2xl font-bold text-red-600">Personal Info</h1>
        {/** @ts-ignore */}
        <p>Username: {user.user_name}</p>
        {/** @ts-ignore */}
        <p>Address: {user.address}</p>
        {/** @ts-ignore */}
        <p>Phone: {user.phone_number}</p>
      </div>
      <div className=" mt-12">
        <div className=" flex justify-center text-2xl text-red-600 mb-8">
          Orders
        </div>
        <div className=" flex flex-col justify-center gap-12 items-center">
          {orders.length > 0 ? (
            orders.map((order: any) => (
              <div key={order.id} className="flex gap-12">
                <div>
                  <div>
                    <p>Order ID: {order.id}</p>
                  </div>
                  <div>Order Status: {order.status}</div>
                </div>
                <div className=" flex flex-col gap-2">
                  {order.items.map((item: any) => (
                    <div key={item.id}>
                      <p>Book ID: {item.book_id}</p>
                      <p>Book Quantity: {item.quantity}</p>
                    </div>
                  ))}
                </div>
                <div className=" flex justify-center items-center ">
                  <div
                    className="bg-red-600  h-8 px-3 rounded-md text-white shadow-md flex justify-center items-center hover:bg-red-700 hover:cursor-pointer"
                    onClick={() => {
                      handleCancelOrder(order.id);
                    }}
                  >
                    Cancel Order
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center">No orders</div>
          )}
        </div>
      </div>

      {isOpen && <Cart />}
    </div>
  );
};

export default ProfilePage;
