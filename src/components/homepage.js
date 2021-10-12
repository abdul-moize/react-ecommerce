import { useEffect, useState } from "react/cjs/react.development"
import { productAPI } from "./constants"
import Row from "./row"


function Homepage() {
  const [data, setData] = useState([])
  useEffect(
    () => {
      fetch(productAPI)
        .then(res => res.json())
        .then(products => {
          const newData = []
          let row = []

          for (let i = 0; i < products.length; i++) {
            row.push(products[i])
            if ((i + 1) % 5 === 0 || i === products.length - 1) {
              newData.push(row)
              row = []
            }

          }
          setData(() => newData)

        })
        .catch(reason => {
          console.log(reason)
        })
    }, []
  )
  return (
    <div className="main-box">
      <img src="/banner.png" width="100%" alt="banner" />
      <div className="products-container">
        {data ? data.map((element, index) => {
          return <Row elements={element} key={`row_${index}`} />
        }) : null}
      </div>
    </div>
  )
}
export default Homepage
