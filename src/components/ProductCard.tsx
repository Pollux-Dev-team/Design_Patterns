import { nLetters } from "../utils/nLetters";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../app/features/cart/cartSlice";
import { useState } from "react";
import LoadindIndicator from "./LoadingIndicator";
import { RootState } from "../app/store";
interface ProductCardProps {
  productName: string;
  productPrice: number;
  productImage: string;
  productId: number;
}

const ProductCart = ({
  productName,
  productPrice,
  productImage,
  productId,
}: ProductCardProps) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const itemInCart = cartItems.find((item) => item.id === productId);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: productId,
        price: productPrice,
        title: productName,
        image: productImage,
      })
    );
  };

  return (
    <div className=" shadow-lg lg:w-[22%] ">
      <div className="flex justify-center py-3 relative">
        {!imageLoaded ?? <LoadindIndicator />}
        <img
          src={productImage}
          alt="product_image"
          className=" object-contain h-56 max-w-[17rem]"
          onLoad={() => setImageLoaded(true)}
        />
        <div className=" absolute right-4 top-6 bg-black text-white font-bold px-4 py-1 shadow-lg border border-solid border-white ">
          {productPrice.toFixed(2)} EGP
        </div>
      </div>
      <div className="flex  justify-between items-center  border-y-2  border-black border-solid w-full  px-4 py-2 lg:border">
        <p className="text-md ">{nLetters(productName, 20)}</p>
        {!itemInCart && (
          <div
            className=" border text-[#ED1C24] border-solid border-black py-1 px-4 cursor-pointer hover:bg-[#ED1C24] hover:text-white transition duration-300 ease-in-out"
            onClick={handleAddToCart}
          >
            Add +
          </div>
        )}
        {itemInCart && (
          <div className=" border border-solid text-white bg-[#ED1C24]  border-black py-1 px-4">
            Added
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCart;
