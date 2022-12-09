import { nLetters } from "../utils/nLetters";
interface CartItemProps {
  id: number;
  title: string;
  price: number;
  image: string;
}

const CartItem = ({ id, title, price, image }: CartItemProps) => {
  return (
    <div className=" flex h-24 justify-between content-end mx-3 mb-6">
      <img src={image} alt="product_image" />
      <div className=" flex flex-col  justify-evenly ">
        <p>{nLetters(title, 15)}</p>
        <p>{price}</p>
      </div>
      <div className="flex gap-6  self-end mb-3">
        <div className=" border border-solid border-black  flex h-6 w-5  justify-center items-center font-bold">
          -
        </div>
        1
        <div className="border border-solid border-black  flex h-6 w-5  justify-center items-center font-bold">
          +
        </div>
      </div>
    </div>
  );
};

export default CartItem;
