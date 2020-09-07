import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookie from "js-cookie";
import axios from "axios";
import UpdateAllProducts from "../Redux/Actions.js/UpdateAllProducts";

function CreateProduct() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);

    useEffect(
        () => {
            axios.get("/api/products/").then((response) => {
                if (response) {
                    dispatch(UpdateAllProducts(response.data));
                }
            });
        },
        [ dispatch ]
    );
    const [ updateProduct, setUpdateProduct ] = useState(false);
    const [ identity, setIdentity ] = useState("empty");
    const [ name, setName ] = useState("");
    const [ price, setPrice ] = useState("");
    const [ category, setCategory ] = useState("");
    const [ image, setImage ] = useState("");
    const [ brand, setBrand ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ quantity, setQuantity ] = useState("");
    const [ rating, setRating ] = useState("");
    const [ numOfReviews, setNumOfReviews ] = useState("");

    const [ showProducts, setShowProducts ] = useState(true);
    const token = Cookie.get("token");

    const handleSubmit = (e) => {
        e.preventDefault();
        const productToSend = {
            title        : name,
            price,
            category,
            brand,
            description,
            image,
            quantity,
            rating,
            numOfReviews : numOfReviews
        };
        if (updateProduct) {
            axios
                .put("/api/products/updateproduct", Object.assign({}, productToSend, { identity }), {
                    headers : { authorization: `Bearer ${token}` }
                })
                .then((response) => console.log(response.data))
                .catch((err) => console.log(err));
        }
        else {
            axios
                .post("/api/products/createproduct", productToSend, { headers: { authorization: `Bearer ${token}` } })
                .then((response) => console.log(response.data))
                .catch((err) => console.log(err));
        }

        setShowProducts(true);
        setUpdateProduct(false);
        setTimeout(() => {
            axios.get("/api/products/").then((response) => {
                if (response) {
                    dispatch(UpdateAllProducts(response.data));
                }
            });
        }, 500);
    };

    const editProduct = (item) => {
        setShowProducts(false);
        setIdentity(item._id);
        setName(item.title);
        setPrice(item.price);
        setCategory(item.category);
        setBrand(item.brand);
        setDescription(item.description);
        setImage(item.image);
        setQuantity(item.quantity);
        setRating(item.rating);
        setNumOfReviews(item.numOfReviews);
        setUpdateProduct(true);
    };

    const deleteProduct = (id) => {
        const token = Cookie.get("token");

        axios
            .delete("/api/products/deleteproduct", {
                params  : { id: id },
                headers : { authorization: `Bearer ${token}` }
            })
            .then((responser) => {
                axios.get("/api/products/").then((response) => {
                    if (response) {
                        dispatch(UpdateAllProducts(response.data));
                    }
                });
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="createProduct">
            <div>
                <button
                    style={{ padding: "0.5rem", margin: "0.5rem" }}
                    onClick={() => {
                        setIdentity("");
                        setName("");
                        setPrice("");
                        setCategory("");
                        setBrand("");
                        setDescription("");
                        setImage("");
                        setQuantity("");
                        setRating("");
                        setNumOfReviews("");
                        setShowProducts(!showProducts);
                        axios.get("/api/products/").then((response) => {
                            if (response) {
                                dispatch(UpdateAllProducts(response.data));
                            }
                        });
                    }}
                >
                    {showProducts ? "create product" : "Show Products"}
                </button>
            </div>

            {
                <div>
                    {showProducts ? (
                        <div>
                            <div className="createTableTitle">Products</div>
                            <table className="createProductTable">
                                <thead>
                                    <tr>
                                        <th>id</th>

                                        <th>Name</th>

                                        <th>Price</th>

                                        <th>Category</th>

                                        <th>Brand</th>

                                        <th>Description</th>

                                        <th>Rating</th>

                                        <th>Number of Reviews</th>

                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((val) => {
                                        return (
                                            <tr key={val._id}>
                                                <td>{val._id}</td>
                                                <td>{val.title}</td>
                                                <td>${val.price}</td>
                                                <td>{val.category}</td>
                                                <td>{val.brand}</td>
                                                <td>{val.description}</td>
                                                <td>{val.rating}</td>
                                                <td>{val.numOfReviews}</td>
                                                <td>
                                                    <button onClick={() => editProduct(val)}>Edit</button>{" "}
                                                    <button onClick={() => deleteProduct(val._id)}>Delete</button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <center>
                            <center className="signInDiv">
                                <form onSubmit={handleSubmit}>
                                    <div className="signInHeader">
                                        <b>{updateProduct ? "Update Product" : "Create Product"}</b>
                                    </div>
                                    <div className="inputDiv">
                                        <label htmlFor="Name">
                                            <div>
                                                <b>Name</b>
                                            </div>
                                            <div>
                                                <input
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                            </div>
                                        </label>
                                    </div>
                                    <div className="inputDiv">
                                        <label htmlFor="Price">
                                            <div>
                                                <b>Price</b>
                                            </div>
                                            <div>
                                                <input
                                                    type="number"
                                                    value={price}
                                                    onChange={(e) => setPrice(e.target.value)}
                                                />
                                            </div>
                                        </label>
                                    </div>
                                    <div className="inputDiv">
                                        <label htmlFor="Price">
                                            <div>
                                                <b>Brand</b>
                                            </div>
                                            <div>
                                                <input
                                                    type="text"
                                                    value={brand}
                                                    onChange={(e) => setBrand(e.target.value)}
                                                />
                                            </div>
                                        </label>
                                    </div>
                                    <div className="inputDiv">
                                        <label htmlFor="Image">
                                            <div>
                                                <b>Image</b>
                                            </div>
                                            <div>
                                                <input
                                                    type="text"
                                                    value={image}
                                                    onChange={(e) => setImage(e.target.value)}
                                                />
                                            </div>
                                        </label>
                                    </div>
                                    <div className="inputDiv">
                                        <label htmlFor="Count in stock">
                                            <div>
                                                <b>Count in stock</b>
                                            </div>
                                            <div>
                                                <input
                                                    type="number"
                                                    value={quantity}
                                                    onChange={(e) => setQuantity(e.target.value)}
                                                />
                                            </div>
                                        </label>
                                    </div>
                                    <div className="inputDiv">
                                        <label htmlFor="Description">
                                            <div>
                                                <b>Description</b>
                                            </div>
                                            <div>
                                                <input
                                                    type="text"
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                />
                                            </div>
                                        </label>
                                    </div>
                                    <div className="inputDiv">
                                        <label htmlFor="Category">
                                            <div>
                                                {" "}
                                                <b>Category</b>{" "}
                                            </div>
                                            <div>
                                                <input
                                                    type="text"
                                                    value={category}
                                                    onChange={(e) => setCategory(e.target.value)}
                                                />
                                            </div>
                                        </label>
                                    </div>
                                    <div className="inputDiv">
                                        <label htmlFor="Rating">
                                            <div>
                                                <b>Rating</b>
                                            </div>
                                            <div>
                                                <input
                                                    type="number"
                                                    value={rating}
                                                    onChange={(e) => setRating(e.target.value)}
                                                />
                                            </div>
                                        </label>
                                    </div>
                                    <div className="inputDiv">
                                        <label htmlFor="Number of reviews">
                                            <div>
                                                <b>Number of reviews</b>
                                            </div>
                                            <div>
                                                <input
                                                    type="number"
                                                    value={numOfReviews}
                                                    onChange={(e) => setNumOfReviews(e.target.value)}
                                                />
                                            </div>
                                        </label>
                                    </div>

                                    <div className="inputDiv">
                                        <button type="submit" className="signInBtn" style={{ marginLeft: "-0.2rem" }}>
                                            {updateProduct ? "Update Product" : "Create Product"}
                                        </button>
                                    </div>
                                </form>
                            </center>
                        </center>
                    )}
                </div>
            }
        </div>
    );
}

export default CreateProduct;
