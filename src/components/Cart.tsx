import NavBar from "./navBar";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import CartItem from "./CartItem";
import { clearCart } from "../app/features/cart/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state: RootState) => state.cart);

  return (
    <div className=" absolute  h-screen w-full bg-white  top-0 z-10">
      <NavBar />
      {cartItems.length === 0 ? (
        <h1 className="text-black flex w-full  h-screen justify-center items-center">
          Your cart is empty
        </h1>
      ) : (
        <div>
          <div className=" flex w-full justify-between items-center px-4 mt-2 ">
            <h1 className="text-black text-2xl font-bold">Items</h1>
            <div
              className=" py-2 px-4 border border-solid border-black"
              onClick={() => {
                dispatch(clearCart());
              }}
            >
              Clear
            </div>
          </div>
          {cartItems.map((item) => {
            return (
              <CartItem
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                image={item.image}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Cart;
