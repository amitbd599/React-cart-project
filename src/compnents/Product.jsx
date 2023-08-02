import { useNavigate } from "react-router-dom";
import addToCart from "../utils/addToCart";

/* eslint-disable react/prop-types */
const Product = ({ product = {} }) => {
  const navigate = useNavigate();
  const handleAddToCart = () => {
    if (localStorage.getItem("token")) {
      addToCart(product.id)
        .then((data) => {
          if (data?.msg === "success") {
            console.log(data.data);
          }
        })
        .catch();
    } else {
      localStorage.setItem("guest-cart-item", product.id);
      navigate("/login");
      console.log("please loging first");
    }
  };
  return (
    <div className="card w-100 bg-white shadow-xl">
      <figure>
        <img src={product.image} alt={product.title} />
      </figure>
      <div className="card-body">
        <h6 className="text-black">{product.title}</h6>
        <p className="text-sm text-gray-400">{product.short_des}</p>
        <h6 className="font-bold">Price: Tk {product.price}</h6>
        <div className="card-actions justify-end">
          <button
            className="btn btn-sm btn-outline btn-primary"
            onClick={handleAddToCart}
          >
            Add Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
