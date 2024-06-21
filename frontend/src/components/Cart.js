import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BackToTopButton from "./BackToTopButton";
import { useCart } from "../components/CartContext";
import "../css/Cart.css";

const Cart = () => {
  const TAX_RATE = 0.01;
  const { cart, increaseQuantity, decreaseQuantity, removeItem } = useCart();

  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    phoneNumber: "",
    paymentMethod: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Shipping Information Submitted:", shippingInfo);
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * TAX_RATE;
  };

  const renderItems = () => {
    return cart.map((item) => (
      <div key={item.id} className="cart-card mb-3">
        <div className="cart-card-body">
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-row align-items-center">
              <div>
                <img src={item.image} className="cart-img-fluid rounded-3" alt="Shopping item" style={{ width: "75px" }} />
              </div>
              <div className="ms-3">
                <h5 className="cart-item-title">{item.title}</h5>
                <p className="small mb-0">Quantity: {item.quantity}</p>
              </div>
            </div>
            <div className="d-flex flex-row align-items-center">
              <div className="cart-btn-container">
                <button onClick={() => decreaseQuantity(item.id)} className="btn cart-btn-danger cart-btn-responsive">
                  -
                </button>
              </div>
              <div className="cart-btn-container">
                <button onClick={() => increaseQuantity(item.id)} className="btn cart-btn-primary cart-btn-responsive">
                  +
                </button>
              </div>
              <div className="cart-price-container">
                <h5 className="cart-price">${item.price * item.quantity}</h5>
              </div>
              <a href="#!" className="cart-remove-item" onClick={() => removeItem(item.id)}>
                <i className="fas fa-trash-alt"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <>
      <Navbar />
      <div className="container py-5 h-100 mt-5 cart-container">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <div className="cart-card">
              <div className="cart-card-body p-4">
                <div className="row">
                  <div className="col-lg-7">
                    <h5 className="mb-3">
                      <Link to="/" className="cart-text-body cart-a-none">
                        <i className="fas fa-long-arrow-alt-left me-2"></i>
                        Continue shopping
                      </Link>
                    </h5>
                    <hr />

                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div>
                        <p className="mb-1">Shopping cart</p>
                        <p className="mb-0">You have {cart.length} items in your cart</p>
                      </div>
                    </div>

                    {renderItems()}
                  </div>

                  <div className="col-lg-5">
                    <div className="cart-card cart-bg-green text-white rounded-3 cart-sticky-shipping">
                      <div className="cart-card-body text-end">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <h5 className="mb-0">Shipping Details</h5>
                        </div>

                        <form onSubmit={handleSubmit}>
                          <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Address" name="address" value={shippingInfo.address} onChange={handleInputChange} />
                          </div>
                          <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Phone Number" name="phoneNumber" value={shippingInfo.phoneNumber} onChange={handleInputChange} />
                          </div>
                          <div className="mb-3">
                            <select className="form-select" name="paymentMethod" value={shippingInfo.paymentMethod} onChange={handleInputChange}>
                              <option value="">Select Payment Method</option>
                              <option value="credit_card">Credit Card</option>
                              <option value="paypal">Paypal</option>
                              <option value="bank_transfer">Bank Transfer</option>
                            </select>
                          </div>
                          <button type="submit" className="btn cart-btn-success btn-block">
                            Checkout
                          </button>
                        </form>

                        <hr />

                        <div className="d-flex justify-content-between">
                          <span>Subtotal</span>
                          <span>${calculateSubtotal()}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                          <span>Tax ({TAX_RATE * 100}%)</span>
                          <span>${calculateTax()}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                          <span>Total</span>
                          <span>${calculateSubtotal() + calculateTax()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <BackToTopButton />
    </>
  );
};

export default Cart;
