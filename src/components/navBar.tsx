import CartIcon from "./cartIcon";
import { useDispatch, useSelector } from "react-redux";
import { toggleIsOpen } from "../app/features/cart/cartSlice";
import { RootState } from "../app/store";

const NavBar = () => {
  const dispatch = useDispatch();
  const { numberOfItems } = useSelector((state: RootState) => state.cart);

  return (
    <div className="flex h-20 justify-between  px-6 shadow-md  items-center">
      <h1
        className="uppercase text-2xl"
        style={{ letterSpacing: "0.4rem", color: "#ED1C24" }}
      >
        Shop
      </h1>
      {/* TODO: implement amount to be dynamic */}
      <div
        onClick={() => {
          dispatch(toggleIsOpen());
        }}
      >
        <CartIcon amount={numberOfItems} />
      </div>
    </div>
  );
};

export default NavBar;
