import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "../components/navBar";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { addToCart } from "../app/features/cart/cartSlice";
import Cart from "../components/Cart";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState<any>(null);
  const [review, setReview] = useState<any>("");
  const [rating, setRating] = useState<number>(0);
  const [isSpoiler, setIsSpoiler] = useState<boolean>(false);

  const handleReviewChange = (e: any) => {
    setReview(e.target.value);
  };

  const handleRatingChange = (e: any) => {
    // max rating is 5 and min is 0
    if (e.target.value > 5) {
      setRating(5);
    } else if (e.target.value < 0) {
      setRating(0);
    } else {
      setRating(e.target.value);
    }
  };

  const { cartItems } = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: RootState) => state.user);
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

  const handleAddReview = () => {
    if (!user) {
      toast.error("You need to login first");
      return;
    }
    axios
      .post(`https://book-ordering-system.herokuapp.com/book_reviews`, {
        book_id: product.id,
        //@ts-ignore
        user_id: user.id,
        is_spoiler: isSpoiler,
        rating: rating,
        review: review,
      })
      .then((res) => {
        setIsSpoiler(false);
        setRating(0);
        setReview("");
        toast.success("Review added successfully");
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  useEffect(() => {
    // get product id from url

    const productId = window.location.pathname.split("/")[2];

    axios
      .get(`https://book-ordering-system.herokuapp.com/books/${productId}`)
      .then((res) => {
        setProduct(res.data.book);
      });
    axios
      .get(
        `https://book-ordering-system.herokuapp.com/books/${productId}/book_reviews`
      )
      .then((res) => {
        console.log("reviews");
        console.log(res.data);
      });
  }, []);

  return (
    <div>
      <NavBar />
      {product && (
        <div className=" w-full h-screen flex flex-col justify-center items-center gap-4 mt-24">
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
          <div className="flex flex-col justify-center items-center gap-2 ">
            <h4 className=" font-bold text-xl">Add Review</h4>
            <div className=" flex  items-center gap-6">
              <textarea
                className=" pl-4 pt-2 w-80 h-40 border border-solid border-black resize-none rounded-md "
                name=""
                id=""
                value={review}
                onChange={handleReviewChange}
              ></textarea>
              <div className="  flex flex-col gap-4">
                <div className=" flex gap-2">
                  <label htmlFor="isSpoiler">is Spoiler ?</label>
                  <input
                    type="checkbox"
                    name="isSpoiler"
                    id="isSpoiler"
                    onChange={() => setIsSpoiler(!isSpoiler)}
                  />
                </div>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={rating}
                  onChange={handleRatingChange}
                  className=" border border-solid border-black rounded-md pl-2 w-1/2"
                />

                <button
                  className="bg-[#ED1C24] text-white px-4 py-2 rounded-md h-1/4"
                  onClick={handleAddReview}
                >
                  Submit
                </button>
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
