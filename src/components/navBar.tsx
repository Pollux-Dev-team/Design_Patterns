import CartIcon from "./cartIcon";
import { useDispatch, useSelector } from "react-redux";
import { toggleIsOpen } from "../app/features/cart/cartSlice";
import { RootState } from "../app/store";
import { Link } from "react-router-dom";

const NavBar = () => {
  const dispatch = useDispatch();
  const { numberOfItems } = useSelector((state: RootState) => state.cart);

  return (
    <div className="flex h-20 justify-between  px-6 shadow-md  items-center z-50 fixed  w-full  bg-white top-0">
      <Link
        className="uppercase text-2xl"
        style={{ letterSpacing: "0.4rem", color: "#ED1C24" }}
        to="/"
      >
        Shop
      </Link>
      <div className=" flex justify-center items-center gap-8  ">
        <Link
          to={"/profile"}
          className="  hover:cursor-pointer font-bold tracking-wider uppercase bg-red-600 px-4 py-2 rounded-md text-white shadow-lg hover:bg-red-800"
        >
          My Account
        </Link>
        <div
          onClick={() => {
            dispatch(toggleIsOpen());
          }}
        >
          <CartIcon amount={numberOfItems} />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
