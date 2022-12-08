interface ProductCardProps {
  productName: string;
  productPrice: number;
  productImage: string;
}

const ProductCart = ({
  productName,
  productPrice,
  productImage,
}: ProductCardProps) => {
  return (
    <div>
      <img src="" alt="" />
    </div>
  );
};

export default ProductCart;
