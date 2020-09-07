import React from "react";

function StepComponent({ step1, step2, step3, step4 }) {
    return (
        <div className="stepStrip">
            <div style={step1}>Sign-in</div>
            <div style={step2}>Shipping</div>
            <div style={step3}>Payment</div>
            <div style={step4}>PlaceOrder</div>
        </div>
    );
}

export default StepComponent;
