interface CartItemProps {
  id: number;
  title: string;
  price: number;
  image: string;
}

const CartItem = ({ id, title, price, image }: CartItemProps) => {
  return (
    <div>
      <h1>Cart Item</h1>
    </div>
  );
};

export default CartItem;
