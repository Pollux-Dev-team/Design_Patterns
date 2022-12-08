import { BsCart2 } from "react-icons/bs";

interface cartIconPropTypes {
  amount: number;
}
const CartIcon = ({ amount }: cartIconPropTypes) => {
  return (
    <div className="relative">
      <BsCart2 size={"2rem"} />
      <div className=" absolute -right-2  -top-2 bg-black px-2 text-white rounded-full">
        {amount}
      </div>
    </div>
  );
};

export default CartIcon;
