import { useEffect, useState } from "react";
import Product from "./Product";
import getProduct from "../utils/fetchProduct";
import Loader from "./Loader";

const ProductList = () => {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    getProduct()
      .then((data) => setProducts(data))
      .catch((error) => setError(error));
  }, []);

  //render condition wise
  let output;
  if (error) {
    output = <div>Something wrong</div>;
  } else if (products?.length > 0) {
    output = products.map((product) => (
      <Product key={product.id} product={product} />
    ));
  } else {
    <div>No Data Found</div>;
  }

  return (
    <div className="container z-10 mx-auto my-12 p-9">
      {products === null ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 mt-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {output}
        </div>
      )}
    </div>
  );
};

export default ProductList;
