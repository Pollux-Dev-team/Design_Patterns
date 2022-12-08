import NavBar from "./components/navBar";
import ProductsPage from "./pages/ProductsPage";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import Cart from "./components/Card";

const App = () => {
  const isOpen = useSelector((state: RootState) => state.cart.isOpen);
  return (
    <>
      <NavBar />
      <ProductsPage />
      {isOpen && <Cart />}
    </>
  );
};

export default App;
