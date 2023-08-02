export default function convertPriceStringToNumber(getStringPrice) {
  const stringPrice = getStringPrice.product.price;
  const withoutComaPrice = stringPrice.replace(/,/g, "");
  const price = parseInt(withoutComaPrice);
  return price;
}
