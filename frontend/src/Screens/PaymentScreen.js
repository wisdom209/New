import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import StepComponent from "../Components/StepComponent";
import UpdateShippingDetails from "../Redux/Actions.js/UpdateShippingDetails";

function PaymentScreen(props) {
    const step1 = { borderTop: "0.5rem solid #ffa500" };
    const step2 = { borderTop: "0.5rem solid #ffa500" };
    const step3 = { borderTop: "0.5rem solid #ffa500" };
    const step4 = { borderTop: "0.5rem solid #c0c0c0" };

    const dispatch = useDispatch();
    const shippingDetails = useSelector((state) => state.shippingDetails);

    const [ paymentMethod, setPaymentMethod ] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        if (paymentMethod) {
            dispatch(UpdateShippingDetails(Object.assign({}, shippingDetails, { paymentMethod: paymentMethod })));
            props.history.push("/placeorder");
        }
        else {
            alert("Please choose a payment method");
        }
    };

    return (
        <center>
            <StepComponent step1={step1} step2={step2} step3={step3} step4={step4} />
            <center className="signInDiv">
                <form onSubmit={handleSubmit}>
                    <div className="signInHeader">
                        <b>Payment</b>
                    </div>
                    <div className="checkBoxDiv">
                        <label htmlFor="Paypal">
                            <input
                                type="checkbox"
                                name="paypal"
                                onChange={(e) => {
                                    if (e.target.checked === true) {
                                        setPaymentMethod(e.target.name);
                                    }
                                    else {
                                        setPaymentMethod("");
                                    }
                                }}
                            />{" "}
                            &nbsp;
                            <b>Paypal</b>
                        </label>
                    </div>

                    <div className="inputDiv">
                        <button className="signInBtn" type="submit">
                            Continue
                        </button>
                    </div>
                </form>
            </center>
        </center>
    );
}

export default PaymentScreen;
