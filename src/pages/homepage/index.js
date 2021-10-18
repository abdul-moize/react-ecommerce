import { useEffect, useState } from "react";
import { ErrorField } from "../../components/elements";
import getProducts from "../../services/productService";
import "./homepage.css";
import RowItem from "../../components/rowItem";

function Homepage() {
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    getProducts()
      .then((newData) => {
        console.log(newData);
        setData(newData);
      })
      .catch((errorMsg) => {
        setErrorMessage(errorMsg);
      });
  }, []);
  return (
    <div className="main-container">
      <img src="/homepage_banner.png" width="100%" alt="banner" />
      <div className="products-container">
        {data !== null ? (
          data.map((element, index) => {
            return <RowItem item={element} key={`row_${index}`} />;
          })
        ) : (
          <ErrorField text={errorMessage} />
        )}
      </div>
    </div>
  );
}
export default Homepage;
