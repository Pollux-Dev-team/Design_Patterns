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

  const { data, isError } = useQuery("products", getProduct);
  const isLoading = true;
  return (
    <div>
      {data?.map((product: any) => (
        <ProductCard
          key={product.id}
          productName={product.title}
          productPrice={product.price}
          productImage={product.image}
        />
      ))}
      {isLoading && (
        <div className=" flex w-full justify-center ">
          <LoadindIndicator />
        </div>
      )}
      {isError && <p>Error</p>}
      test
    </div>
  );
};

export default ProductsPage;
