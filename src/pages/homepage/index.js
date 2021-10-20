import { useEffect, useState } from "react";
import { ErrorField } from "../../components/elements";
import { getProducts } from "../../services/productService";
import "./homepage.css";
import ProductCard from "../../components/productCard";

function Homepage() {
  const [availableProducts, setAvailableProducts] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    getProducts()
      .then((products) => {
        setAvailableProducts(products);
      })
      .catch((errorMsg) => {
        setErrorMessage(errorMsg);
      });
  }, []);
  return (
    <div className="main-container">
      <img src="/homepage_banner.png" width="100%" alt="banner" />
      <div className="products-container">
        {availableProducts !== null ? (
          availableProducts.map((product) => {
            return <ProductCard product={product} key={product.id} />;
          })
        ) : (
          <ErrorField text={errorMessage} />
        )}
      </div>
    </div>
  );
}
export default Homepage;
