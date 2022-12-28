import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "../components/navBar";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { addToCart } from "../app/features/cart/cartSlice";
import Cart from "../components/Cart";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState<any>(null);

  const { cartItems } = useSelector((state: RootState) => state.cart);
  const isOpen = useSelector((state: RootState) => state.cart.isOpen);

  const itemInCart = product
    ? cartItems.find((item) => item.id === product.id)
    : false;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        price: product.price,
        title: product.name,
        image: product.cover_url,
      })
    );
  };

  useEffect(() => {
    // get product id from url

    const productId = window.location.pathname.split("/")[2];

    axios
      .get(`https://book-ordering-system.herokuapp.com/books/${productId}`)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data.book);
      });
  }, []);

  return (
    <div>
      <NavBar />
      {product && (
        <div className=" w-full h-screen flex  justify-center items-center">
          <div className=" flex gap-6 ">
            <img src={product.cover_url} alt="" />
            <div className=" flex flex-col  justify-around">
              <div>
                <h1>{product.name}</h1>
                <div className=" text-red-600">{product.edition}</div>
                <div className=" font-bold">EGP {product.price}</div>
              </div>
              <div className=" flex flex-col gap-2">
                <div>
                  <span className=" text-red-600">Author:</span>{" "}
                  {product.author}
                </div>
                <div>
                  <span className=" text-red-600">Category:</span>{" "}
                  {product.category}
                </div>
                <div>
                  <span className=" text-red-600">Number of pages:</span>{" "}
                  {product.number_of_pages}
                </div>
                {!itemInCart && (
                  <div
                    className="flex justify-center border w-1/3 text-[#ED1C24] border-solid border-black py-1 px-4 cursor-pointer hover:bg-[#ED1C24] hover:text-white transition duration-300 ease-in-out"
                    onClick={handleAddToCart}
                  >
                    Add +
                  </div>
                )}
                {itemInCart && (
                  <div className=" flex justify-center border  w-1/3 border-solid text-white bg-[#ED1C24]  border-black py-1 px-4">
                    Added
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {isOpen && <Cart />}
    </div>
  );
};

export default ProductDetails;
