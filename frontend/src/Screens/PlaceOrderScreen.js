import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import StepComponent from "../Components/StepComponent";

function PlaceOrderScreen(props) {
    const step1 = { borderTop: "0.5rem solid #ffa500" };
    const step2 = { borderTop: "0.5rem solid #ffa500" };
    const step3 = { borderTop: "0.5rem solid #ffa500" };
    const step4 = { borderTop: "0.5rem solid #ffa500" };

    const shippingDetails = useSelector((state) => state.shippingDetails);
    const cartItems = useSelector((state) => state.cartItems);
    const selectedQuantity = useSelector((state) => state.selectedQuantity);

    useEffect(
        () => {
            cartItems.length < 1 && props.history.push("/cart");
        },
        [ cartItems, props.history]
    );

    const calculateTotalPrice = () => {
        const PriceArray = cartItems.map((val) => val.price * selectedQuantity[val._id]);
        let sum = 0;
        for (let i of PriceArray) {
            sum = i + sum;
        }
        return sum;
    };

    const calculateTax = () => {
        return calculateTotalPrice() * 0.15;
    };

    const calculateShipping = () => {
       if(cartItems.length < 40){
           return 0
       }else{
           return calculateTotalPrice() * 0.1
       }
    };
    const calculateOrderTotal = () => {
        return calculateTotalPrice() + calculateTax() + calculateShipping();
    };

    return (
        <div className="placeOrderBox">
            <StepComponent step1={step1} step2={step2} step3={step3} step4={step4} />
            <div className="cartBox">
                <div className="cartDetails">
                    <div style={{ marginLeft: "1rem" }}>
                        <b>Shipping</b>
                    </div>
                    <div style={{ marginLeft: "1rem" }}>
                        {shippingDetails.address} {shippingDetails.city}, {shippingDetails.country}
                    </div>
                    <div style={{ marginLeft: "1rem" }}>
                        <b>Payment</b>
                    </div>
                    <div style={{ marginLeft: "1rem" }}>Payment method : {shippingDetails.paymentMethod}</div>
                    <div className="shoppingCartHeaderTop">
                        <div className="cartTitle">Shopping Cart</div>
                        <div>Price</div>
                    </div>

                    {cartItems.map((val) => {
                        return (
                            <div key={val._id} className="shoppingCartHeaderDetails">
                                <div className="cartItemBox">
                                    <div>
                                        <img src={val.image} alt="Product Logo" />
                                    </div>
                                    <div className="cartQuantity">
                                        <div>{val.title}</div>
                                        <div>Qty : {selectedQuantity[val._id]}</div>
                                    </div>
                                </div>
                                <div>
                                    <b>${val.price * selectedQuantity[val._id]}</b>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="cartSubtotalBox">
                    <div>
                        <div>
                            <button onClick={() => alert("Thank you for shopping with us")}>Place order</button>
                        </div>
                        <div
                            style={{
                                display        : "flex",
                                justifyContent : "space-between",
                                fontSize       : "small",
                                flexWrap       : "wrap"
                            }}
                        >
                            <div>Items</div>
                            <div>${calculateTotalPrice().toFixed(2)}</div>
                        </div>
                        <div
                            style={{
                                display        : "flex",
                                justifyContent : "space-between",
                                fontSize       : "small",
                                flexWrap       : "wrap"
                            }}
                        >
                            <div>Shipping</div>
                            <div>${calculateShipping().toFixed(2)}</div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "small" }}>
                            <div>Tax</div>
                            <div>${calculateTax().toFixed(2)}</div>
                        </div>
                        <div
                            style={{
                                display        : "flex",
                                justifyContent : "space-between",
                                fontSize       : "medium",
                                color          : "red",
                                flexWrap       : "wrap"
                            }}
                        >
                            <div>Order Total</div>
                            <div>${calculateOrderTotal().toFixed(2)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlaceOrderScreen;
