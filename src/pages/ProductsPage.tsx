import { useState, useEffect } from "react";
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
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [productsData, setProductsData] = useState<any>(null);
  const [productsIsError, setProductsIsError] = useState<any>(false);
  const [productsIsLoading, setProductsIsLoading] = useState<any>(true);

  useEffect(() => {
    const getProduct = () => {
      console.log(selectedCategory);
      axios
        .get(
          !selectedCategory
            ? "https://book-ordering-system.herokuapp.com/books"
            : "https://book-ordering-system.herokuapp.com/books?category_id=" +
                selectedCategory
        )
        .then((res) => {
          console.log(res.data.books);
          setProductsData(res.data.books);
          setProductsIsLoading(false);
        })
        .catch((err) => {
          setProductsIsError(true);
        });
    };
    getProduct();
  }, [selectedCategory]);

  const getProductCategories = async () => {
    const res = await axios.get(
      "https://book-ordering-system.herokuapp.com/book_categories"
    );
    return res.data.book_categories;
  };

  const handleClickOnCategory = (category: any) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
      return;
    }
    setSelectedCategory(category);
  };

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
            <div
              className={`py-1 px-3 hover:cursor-pointer rounded-md  ${
                selectedCategory === category.id
                  ? "bg-black text-white"
                  : "bg-red-600 hover:bg-red-700"
              }}`}
              onClick={() => {
                handleClickOnCategory(category.id);
              }}
              key={category.id}
            >
              <p className="text-2xl font-bold  text-white">
                {category.category}
              </p>
            </div>
          ))}
        {productCategoriesIsLoading && <LoadindIndicator />}
        {productCategoriesIsError && (
          <p>An error has occured, please try again!</p>
        )}
      </div>
      <div className=" mb-16   lg:flex lg:flex-wrap  lg:gap-6 w-full lg:justify-center  ">
        {!productsIsLoading && !productsIsError && productsData.length > 0 ? (
          productsData?.map((product: any) => (
            <ProductCard
              key={product.id}
              productName={product.name!}
              productPrice={product.price!}
              productImage={product.cover_url!}
              productId={product.id!}
            />
          ))
        ) : (
          <p className="text-2xl font-bold text-center">No products found!</p>
        )}
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
