import ProductDetail from "../components/pages/ProductPage/ProductDetail";
import HotBidSection from "../components/pages/HomePage/HotBidSection";

const Product = () => {
  return (
    <div>
      <ProductDetail
        imageUrl="/Product image.png"
        productName="Cryptoguy"
        productDescription="“The Fantasy Flower illustration”"
        price={225}
      />
      <HotBidSection sectionText="More From This Collection" />
    </div>
  );
};

export default Product;
