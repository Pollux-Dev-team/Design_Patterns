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
    const res = await axios.get(
      "https://book-ordering-system.herokuapp.com/books"
    );

    return res.data.books;
  };

  const getProductCategories = async () => {
    const res = await axios.get(
      "https://book-ordering-system.herokuapp.com/book_categories"
    );
    return res.data.book_categories;
  };

  // @ts-ignore
  const {
    data: productsData,
    isError: productsIsError,
    isLoading: productsIsLoading,
  } = useQuery("products", getProduct);

  const {
    // @ts-ignore
    data: productCategoriesData,
    // @ts-ignore
    isError: productCategoriesIsError,
    // @ts-ignore
    isLoading: productCategoriesIsLoading,
  } = useQuery("productCategories", getProductCategories);

  return (
    <div className="mt-28">
      <div className="flex gap-4 flex-wrap justify-center mb-4">
        {!productCategoriesIsLoading &&
          !productCategoriesIsError &&
          productCategoriesData?.map((category: any) => (
            <div className="  bg-red-600  py-1 px-3 hover:cursor-pointer rounded-md hover:bg-red-700 ">
              <p className="text-2xl font-bold  text-white">
                {category.category}
              </p>
            </div>
          ))}
        {productCategoriesIsLoading && (
          <div>
            <LoadindIndicator />
          </div>
        )}
        {productCategoriesIsError && (
          <p>An error has occured, please try again!</p>
        )}
      </div>
      <div className=" mb-16   lg:flex lg:flex-wrap  lg:gap-6 w-full lg:justify-center  ">
        {!productsIsLoading &&
          !productsIsError &&
          productsData?.map((product: any) => (
            <ProductCard
              key={product.id}
              productName={product.name!}
              productPrice={product.price!}
              productImage={product.cover_url!}
              productId={product.id!}
            />
          ))}
      </div>
      {productsIsLoading && (
        <div className=" flex w-full justify-center  mt-28 ">
          <LoadindIndicator />
        </div>
      )}
      {productsIsError && <p>An error has occured, please try again!</p>}
    </div>
  );
};

export default ProductsPage;
