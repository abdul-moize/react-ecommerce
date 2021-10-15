import { useEffect, useState } from "react";
import { ErrorField } from "../../components/elements";
import getProducts from "../../services/productService";
import ProductRow from "../../components/productRow";
import "./homepage.css";

function Homepage() {
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    getProducts()
      .then((newData) => setData(newData))
      .catch((errorMsg) => {
        console.log(errorMsg);
        setErrorMessage(errorMsg);
      });
  }, []);
  return (
    <div className="main-container">
      <img src="/homepage_banner.png" width="100%" alt="banner" />
      <div className="products-container">
        {data !== null ? (
          data.map((element, index) => {
            return <ProductRow elements={element} key={`row_${index}`} />;
          })
        ) : (
          <ErrorField text={errorMessage} />
        )}
      </div>
    </div>
  );
}
export default Homepage;
