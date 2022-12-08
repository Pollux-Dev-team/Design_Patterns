import { nLetters } from "../utils/nLetters";
import { useDispatch } from "react-redux";
import { addToCart } from "../app/features/cart/cartSlice";
import { useState } from "react";
import LoadindIndicator from "./LoadingIndicator";
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
  const [isAdded, setIsAdded] = useState(false);
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
    setIsAdded(!isAdded);
  };

  return (
    <div>
      <div className="flex justify-center py-3">
        {!imageLoaded ?? <LoadindIndicator />}
        <img
          src={productImage}
          alt="product_image"
          className=" object-contain h-56"
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      <div className="flex  justify-between items-center  border-y-2  border-black border-solid w-full  px-4 py-2">
        <p className="text-md ">{nLetters(productName, 20)}</p>
        {!isAdded && (
          <div
            className=" border text-[#ED1C24] border-solid border-black py-1 px-4"
            onClick={handleAddToCart}
          >
            Add +
          </div>
        )}
        {isAdded && (
          <div className=" border border-solid text-[#ED1C24] border-black py-1 px-4">
            Added
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCart;
