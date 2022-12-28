import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import Cart from "../components/Cart";
import NavBar from "../components/navBar";

const ProfilePage = () => {
  const isOpen = useSelector((state: RootState) => state.cart.isOpen);
  return (
    <div>
      <NavBar />
      <h1 className=" flex justify-center w-full h-screen items-center">
        Profile Page
      </h1>
      {isOpen && <Cart />}
    </div>
  );
};

export default ProfilePage;
