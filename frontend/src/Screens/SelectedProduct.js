import React, { useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {  updateToCart } from "../Redux/Actions.js/UpdateCartItem";
import UpdateQuantity from "../Redux/Actions.js/UpdateQuantity";

function SelectedProduct() {
    const selectedProduct = useSelector((state) => state.selectedProduct);
    const dispatch = useDispatch();

    const [ initialSelection, setInitialSelection ] = useState(1);
    const addToCart = (item) => {
        dispatch(updateToCart(item));
        dispatch(UpdateQuantity({ [selectedProduct._id]: initialSelection }));
    };

    return (
        <div>
            <div style={{ margin: "3rem 0rem 0rem 0.5rem" }}>
                <Link to="/">Back to results</Link>
            </div>
            <div className="selectedProductBox">
                <div className="selectedImage">
                    {" "}
                    <img src={selectedProduct.image} alt="product logo" />
                </div>
                <div className="selectedDetails">
                    <div>
                        <b>{selectedProduct.title}</b>
                    </div>
                    <div>0 Stars</div>
                    <div>(0 Customer Reviews)</div>
                    <div>
                        <b>Price :</b> <b>${selectedProduct.price}</b>
                    </div>
                    <div>
                        <b>Description:</b> {selectedProduct.description}
                    </div>
                </div>
                <div className="selectToCartDetails">
                    <div>Price ${selectedProduct.price}</div>
                    <div>Status: In Stock</div>
                    <div>
                        Qty :{" "}
                        <select
                            value={initialSelection}
                            onChange={(e) => {
                                setInitialSelection(e.target.value);
                            }}
                        >
                            {Array(selectedProduct.quantity).fill("x").map((v, index) => {
                                return <option key={index}>{index + 1}</option>;
                            })}
                        </select>
                    </div>
                    <Link to="/cart">
                        {" "}
                        <button onClick={() => addToCart(selectedProduct)}>Add to cart</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SelectedProduct;
