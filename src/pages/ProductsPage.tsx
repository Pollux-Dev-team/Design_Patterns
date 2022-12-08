import ProductCard from "../components/ProductCard";
import { useQuery } from "react-query";
import axios from "axios";
import LoadindIndicator from "../components/LoadingIndicator";

const ProductsPage = () => {
  const getProduct = async () => {
    const res = await axios.get("https://fakestoreapi.com/products");
    console.log(res.data);
    return res.data;
  };

  const { data, isError, isLoading } = useQuery("products", getProduct);

  return (
    <div>
      <div className=" mt-4  mb-16">
        {!isLoading &&
          !isError &&
          data?.map((product: any) => (
            <ProductCard
              key={product.id}
              productName={product.title}
              productPrice={product.price}
              productImage={product.image}
              productId={product.id}
            />
          ))}
      </div>
      {isLoading && (
        <div className=" flex w-full justify-center ">
          <LoadindIndicator />
        </div>
      )}
      {isError && <p>An error has occured, please try again!</p>}
    </div>
  );
};

export default ProductsPage;
