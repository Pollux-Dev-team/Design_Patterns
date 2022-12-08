import NavBar from "./components/navBar";
import ProductsPage from "./pages/ProductsPage";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import Cart from "./components/Cart";

/*
(H)ere we are using the useSelector hook to get the state of the cart from the store.
(I)f the cart is open, we render the Cart component.
(R)emember that the Cart component is a modal, so it will be rendered on top of the other components.
(E)ach component is wrapped in a fragment, so we can return multiple components.

(M)ore info about the useSelector hook: https://react-redux.js.org/api/hooks#useselector
(e).g. const isOpen = useSelector((state: RootState) => state.cart.isOpen);
*/

const App = () => {
  const isOpen = useSelector((state: RootState) => state.cart.isOpen);
  return (
    <>
      <NavBar />
      {!isOpen && <ProductsPage />}

      {isOpen && <Cart />}
    </>
  );
};

export default App;
