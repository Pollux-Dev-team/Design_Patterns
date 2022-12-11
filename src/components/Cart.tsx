// import React, { useState, useEffect } from "react";
// import NavBar from "./navBar";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import CartItem from "./CartItem";
import { clearCart } from "../app/features/cart/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, cartTotal } = useSelector(
    (state: RootState) => state.cart
  );

  return (
    <div className=" fixed  h-screen w-full bg-white  top-0 z-10 lg:w-[25%] lg:right-0 shadow-lg pt-24 overflow-y-scroll">
      {cartItems.length === 0 ? (
        <h1 className="text-black flex w-full  h-screen justify-center items-center">
          Your cart is empty
        </h1>
      ) : (
        <div>
          <div className=" flex w-full justify-between items-center px-4 mt-2 mb-3  ">
            <h1 className="text-black text-2xl font-bold">Items</h1>
            <div
              className=" py-2 px-4 border border-solid border-black text-[#ED1C24] cursor-pointer hover:bg-[#ED1C24] hover:text-white transition duration-300 ease-in-out"
              onClick={() => {
                dispatch(clearCart());
              }}
            >
              Clear
            </div>
          </div>
          {cartItems.map((item) => {
            return (
              <CartItem
                key={item.id}
                id={item.id!}
                title={item.title!}
                price={item.price!}
                image={item.image!}
              />
            );
          })}
          <div className=" w-full flex justify-center items-center">
            <div className=" w-10/12 border border-black border-solid flex justify-center  py-2 items-center font-bold uppercase mb-7 text-[#ED1C24] cursor-pointer">
              Pay {cartTotal.toFixed(2)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
