import { nLetters } from "../utils/nLetters";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
} from "../app/features/cart/cartSlice";
import { RootState } from "../app/store";

interface CartItemProps {
  id: number;
  title: string;
  price: number;
  image: string;
}

const CartItem = ({ id, title, price, image }: CartItemProps) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state: RootState) => state.cart);

  const itemInCart = cartItems.find((item) => item.id === id);

  const increment = () => {
    dispatch(incrementQuantity({ id }));
  };

  const decrement = () => {
    dispatch(decrementQuantity({ id }));
  };

  return (
    <div className=" flex h-24 justify-between content-end mx-3 mb-6">
      <img src={image} alt="product_image" />
      <div className=" flex flex-col  justify-evenly ">
        <p>{nLetters(title, 15)}</p>
        <p>{price} EGP</p>
      </div>
      <div className="flex gap-6  self-end mb-3">
        <div
          className=" border border-solid border-black  flex h-6 w-5  justify-center items-center font-bold"
          onClick={decrement}
        >
          -
        </div>
        {itemInCart?.quantity}
        <div
          className="border border-solid border-black  flex h-6 w-5  justify-center items-center font-bold"
          onClick={increment}
        >
          +
        </div>
      </div>
    </div>
  );
};

export default CartItem;
