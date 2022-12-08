import NavBar from "./navBar";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import CartItem from "./CartItem";

const Cart = () => {
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
