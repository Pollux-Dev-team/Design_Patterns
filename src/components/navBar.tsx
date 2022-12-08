import CartIcon from "./cartIcon";
import { useDispatch } from "react-redux";
import { toggleIsOpen } from "../app/features/cart/cartSlice";

const NavBar = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex h-20 justify-between  px-4 shadow-md  items-center">
      <h1 className="uppercase text-2xl" style={{ letterSpacing: "0.4rem" }}>
        Shop
      </h1>
      {/* TODO: implement amount to be dynamic */}
      <div
        onClick={() => {
          dispatch(toggleIsOpen());
        }}
      >
        <CartIcon amount={2} />
      </div>
    </div>
  );
};

export default NavBar;
