import CartItem from "./CartItem";
import { useEffect, useState } from "react";
import getCartItem from "../utils/getCartItem";
import Loader from "./Loader";
import removeCart from "../utils/removeCart";
import convertPriceStringToNumber from "../utils/convertPriceStringToNumber";
import addToCart from "../utils/addToCart";

const CartList = () => {
  const [CartItems, setCartItems] = useState([]);

  useEffect(() => {
    getCartItem().then((data) => {
      if (data?.msg === "success") {
        setCartItems(data?.data);
      }
    });
    if (localStorage.getItem("guest-cart-item")?.length > 0) {
      addToCart(localStorage.getItem("guest-cart-item")).then((data) => {
        if (data?.msg === "success") {
          localStorage.removeItem("guest-cart-item");
          getCartItem().then((data) => {
            if (data?.msg === "success") {
              setCartItems(data?.data);
            }
          });
        }
      });
    }
  }, []);

  const handleRemoveCart = (productId) => {
    removeCart(productId)
      .then((data) => {
        if (data?.msg === "success") {
          const reamininglItems = CartItems.filter(
            (item) => item.product.id !== productId
          );
          setCartItems(reamininglItems);
        }
      })
      .catch();
  };

  const calculateTotalAmount = () => {
    const totalPrice = CartItems.reduce((total, currentValue) => {
      const price = convertPriceStringToNumber(currentValue);
      return total + price;
    }, 0);
    return totalPrice.toLocaleString();
  };

  return (
    <div className="container z-10 mx-auto my-12 p-9">
      <div className="grid grid-cols-1 mt-2 md:grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="container col-span-2">
          <div className="grid grid-cols-1  md:grid-cols-1 lg:grid-cols-1 gap-3">
            {CartItems.length <= 0 ? (
              <Loader />
            ) : (
              CartItems.map((item) => {
                return (
                  <CartItem
                    key={item.id}
                    product={item.product}
                    remove={handleRemoveCart}
                  />
                );
              })
            )}
          </div>
        </div>

        <div className="card shadow-xl h-44 w-100 bg-white">
          <div className="card-body">
            <h2 className="card-title">Total Item: {CartItems.length}</h2>
            <h6>Total Price: Tk {calculateTotalAmount()}</h6>
            <div className="card-actions">
              <button className="btn btn-sm my-4 btn-primary btn-outline">
                Check out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartList;
