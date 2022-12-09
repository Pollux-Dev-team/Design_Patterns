import ProductCard from "../components/ProductCard";
import { useQuery } from "react-query";
import axios from "axios";
import LoadindIndicator from "../components/LoadingIndicator";

// create a Product type
export type ProductType = {
  id?: number;
  title?: string;
  price?: number;
  description?: string;
  category?: string;
  image?: string;
  quantity?: number;
};

const ProductsPage = () => {
  const getProduct = async () => {
    const res = await axios.get("https://fakestoreapi.com/products");
    console.log(res.data);
    return res.data;
  };

  const { data, isError, isLoading } = useQuery("products", getProduct);

  return (
    <div>
      <div className=" mb-16 mt-28 lg:flex lg:flex-wrap  lg:gap-6 w-full lg:justify-center  ">
        {!isLoading &&
          !isError &&
          data?.map((product: ProductType) => (
            <ProductCard
              key={product.id}
              productName={product.title!}
              productPrice={product.price!}
              productImage={product.image!}
              productId={product.id!}
            />
          ))}
      </div>
      {isLoading && (
        <div className=" flex w-full justify-center  mt-28 ">
          <LoadindIndicator />
        </div>
      )}
      {isError && <p>An error has occured, please try again!</p>}
    </div>
  );
};

export default ProductsPage;
