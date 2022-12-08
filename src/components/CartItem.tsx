interface CartItemProps {
  id: number;
  name: string;
  price: number;
  image: string;
}

const CartItem = ({ id, name, price, image }: CartItemProps) => {
  return (
    <div>
      <h1>Cart Item</h1>
    </div>
  );
};

export default CartItem;
