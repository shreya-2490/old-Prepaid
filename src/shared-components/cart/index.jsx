import { DeleteOutlined } from "@ant-design/icons";
import { Divider } from "antd";
import visa from "../../assets/Visacartpage.png";
import mastercard from "../../assets/Mastercardcartpage.png";
import { useContext } from "react";
import { CartContext } from "../../components/CartContext";

const Cart = () => {
  const { cartItems, preOwnedCards, removeFromCart, removePreOwnedFromCart } =
    useContext(CartContext);

  const handleDeleteFromCart = (itemId) => {
    removeFromCart(itemId);
  };
  const handleDeletePreOwnedFromCart = (itemId) => {
    removePreOwnedFromCart(itemId);
  };
  return (
    <>
      {cartItems.length === 0 && preOwnedCards?.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cartItems?.map((cartItem) => {
            const { id, usdValue, card, quantity } = cartItem;
            const multipliedValue = usdValue * quantity;

            return (
              <div key={id}>
                {card === "1" ? (
                  <>
                    <div className="visadiv">
                      <img src={visa} alt="Visa" className="visacardtype-img" />
                      <p>Visa</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="visadiv">
                      <img
                        src={mastercard}
                        alt="MasterCard"
                        className="cardtype-img"
                      />
                      <p>MasterCard</p>
                    </div>
                  </>
                )}
                <div className="delete">
                  <p>
                    {quantity} x ${usdValue} = ${multipliedValue}
                  </p>
                  <p>
                    <DeleteOutlined onClick={() => handleDeleteFromCart(id)} />
                  </p>
                </div>
                <Divider />
              </div>
            );
          })}

          {preOwnedCards?.map((preOwnedCard) => {
            const { id, bin, card, price, type } = preOwnedCard;
            const multipliedValue = price * 1;
            console.log(price);

            return (
              <div key={id}>
                {type === "visa" ? (
                  <>
                    <div className="visadiv">
                      <img src={visa} alt="Visa" className="visacardtype-img" />
                      <p>Visa</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="visadiv">
                      <img
                        src={mastercard}
                        alt="MasterCard"
                        className="cardtype-img"
                      />
                      <p>MasterCard</p>
                    </div>
                  </>
                )}
                <div className="delete">
                  <p>
                    {1} x ${price} = ${multipliedValue}
                  </p>
                  <p>
                    <DeleteOutlined
                      onClick={() => handleDeletePreOwnedFromCart(id)}
                    />
                  </p>
                </div>
                <Divider />
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default Cart;
