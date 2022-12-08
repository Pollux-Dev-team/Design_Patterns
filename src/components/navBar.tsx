import CartIcon from "./cartIcon";

const NavBar = () => {
  return (
    <div className="flex h-20 justify-between  px-4 shadow-md  items-center">
      <h1 className="uppercase text-2xl" style={{ letterSpacing: "0.4rem" }}>
        Shop
      </h1>
      {/* TODO: implement amount to be dynamic */}
      <CartIcon amount={2} />
    </div>
  );
};

export default NavBar;
