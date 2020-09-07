import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import SelectedProduct from "./Screens/SelectedProduct";
import HomeScreen from "./Screens/HomeScreen";
import CartScreen from "./Screens/CartScreen";
import SignInScreen from "./Screens/SignInScreen";
import CreateAccount from "./Screens/CreateAccount";
import CreateProduct from "./Screens/CreateProduct";
import ShippingScreen from "./Screens/ShippingScreen";
import PaymentScreen from "./Screens/PaymentScreen";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen";
import Title from "./Components/Title";
import SideBar from "./Components/SideBar";

function App() {
    const [ sideBarClass, setsideBarClass ] = useState("sideBarGone");

    const isAuthenticated = Cookie.get("token");

    const sideBarRef = useRef();

    useEffect(() => {
        document.addEventListener("mousedown", handleSideBarOutsideClick);
        return () => document.removeEventListener("mousedown", handleSideBarOutsideClick);
    }, []);

    const handleSideBarOutsideClick = (e) => {
        if (sideBarRef.current.contains(e.target)) {
           //inside click
           return;
        }
        else {
            setsideBarClass("sideBarGone"); //outside click
        }
    };

    useEffect(
        () => {
            axios
                .get("api/users/checkuser", { headers: { authorization: `Bearer ${isAuthenticated}` } })
                .then((response) => response.data)
                .catch((err) => Cookie.set("token", ""));

                console.log(isAuthenticated)
        },
        [  ]
    );

    return (
        <BrowserRouter>
            <div className="App">
                <Title showSideBar={() => setsideBarClass("sideBar")} />

                <SideBar
                    sideBarRef={sideBarRef}
                    removeSideBar={() => setsideBarClass("sideBarGone")}
                    sideBarClass={sideBarClass}
                />

                <div className="appBody">
                    <Switch>
                        <Route path="/createaccount" component={CreateAccount} />
                        <Route path="/shipping" component={ShippingScreen} />
                        <Route path="/signin" component={SignInScreen} />
                        <Route path="/cart/:id?" component={CartScreen} />
                        <Route path="/selectedProduct/:id?" component={SelectedProduct} />
                        <Route path="/" exact={true} component={HomeScreen} />
                    </Switch>
                    {isAuthenticated ? (
                        <div>
                            <Route path="/placeorder" component={PlaceOrderScreen} />
                            <Route path="/payment" component={PaymentScreen} />
                            <Route path="/createproduct" component={CreateProduct} />
                        </div>
                    ) : (
                        <Redirect to="/signin" />
                    )}
                </div>

                <div className="appFooter">All Rights Reserved &copy; 2020</div>
            </div>
        </BrowserRouter>
    );
}

export default App;
