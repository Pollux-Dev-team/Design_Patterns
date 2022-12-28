import NavBar from "./components/navBar";
import ProductsPage from "./pages/ProductsPage";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import Cart from "./components/Cart";
import { useState, useEffect } from "react";

const App = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [showProducts, setShowProducts] = useState<boolean>(true);
  const [isDesktop, setIsDesktop] = useState<boolean>(width > 768);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  const isOpen = useSelector((state: RootState) => state.cart.isOpen);

  useEffect(() => {
    const handleShowProducts = () => {
      if (!isDesktop && isOpen) {
        setShowProducts(false);
        return;
      }
      setShowProducts(true);
    };
    window.addEventListener("resize", handleWindowSizeChange);
    setIsDesktop(width > 1024);
    handleShowProducts();
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, [width, isOpen, isDesktop]);

  return (
    <>
      <NavBar />
      {showProducts && <ProductsPage />}

      {isOpen && <Cart />}
    </>
  );
};

export default App;
