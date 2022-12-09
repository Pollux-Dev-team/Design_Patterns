import { BsCart2 } from "react-icons/bs";

interface cartIconPropTypes {
  amount: number;
}
const CartIcon = ({ amount }: cartIconPropTypes) => {
  return (
    <div className="relative cursor-pointer">
      <BsCart2 size={"2rem"} color={"#ED1C24"} />
      <div className=" absolute -right-2  -top-2 bg-black px-2 text-white rounded-full">
        {amount}
      </div>
    </div>
  );
};

export default CartIcon;
