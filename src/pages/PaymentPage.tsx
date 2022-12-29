import NavBar from "../components/navBar";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { toast } from "react-toastify";
import { clearCart } from "../app/features/cart/cartSlice";
import axios from "axios";

const PaymentPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const { cartItems, cartTotal } = useSelector(
    (state: RootState) => state.cart
  );

  const handleSubmitOrder = () => {
    const order = cartItems.map((item) => {
      return {
        book_id: item.id,
        quantity: item.quantity,
      };
    });

    axios
      .post("https://book-ordering-system.herokuapp.com/orders", {
        // @ts-ignore
        user_id: user.id,
        items: order,
      })
      .then(() => {
        dispatch(clearCart());
        toast.success("Order placed successfully");
      })
      .catch((err) => {
        toast.error("Something went wrong, please try again");
      });
  };

  return (
    <div>
      <NavBar />
      {cartItems.length === 0 ? (
        <h1 className="text-black flex w-full  h-screen justify-center items-center">
          Your cart is empty
        </h1>
      ) : (
        <div className=" mt-24 flex flex-col gap-6 ml-12">
          {cartItems.map((item) => {
            return (
              <div
                key={item.id}
                className=" flex justify-start items-center gap-4"
              >
                <img src={item.image} alt="" className=" w-24" />
                <div className=" flex flex-col gap-1">
                  <h1>{item.title}</h1>
                  <h1>EGP {item.price}</h1>
                  <h1>Quantity: {item.quantity}</h1>
                </div>
              </div>
            );
          })}
          <div className="flex  justify-between  items-center gap-4 mr-12">
            <div
              className=" bg-red-600 px-6 py-2 rounded-md text-white hover:cursor-pointer hover:bg-red-700"
              onClick={handleSubmitOrder}
            >
              Order
            </div>
            <div className=" flex gap-2">
              <h1>Total: </h1>
              <h1>{cartTotal.toFixed(2)}</h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
