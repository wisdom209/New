import React from 'react'
import Cookie from "js-cookie"
import {useSelector, useDispatch} from "react-redux"
import { ResetAction } from '../Redux/Actions.js/ResetAction';
import {Link} from "react-router-dom"

function Title(props) {
    const dispatch = useDispatch();

    const signOut = () => {
        Cookie.set("token", "");
        Cookie.set("globalName", "");
        dispatch(ResetAction());

        if (props.history) {
            props.history.push("/");
        }
    };

    const globalName = useSelector((state) => state.globalName);
    return (
        <div className="appHeader">
        <div className="titleBox">
            <span className="appHamburger">
                <button onClick={props.showSideBar}>
                    <b>&#9776;</b>
                </button>
            </span>{" "}
            <span className="title">
                <Link to="/">Shopping Gallery</Link>
            </span>
        </div>
        <div className="cart_signin">
            <div className="cartLink">
                <Link to="/cart">Cart</Link>
            </div>{" "}
            &nbsp;{" "}
            <div className="signInLink">
                {globalName ? (
                    <span>
                        <button onClick={signOut}>Sign out</button>&nbsp; &nbsp;{" "}
                        <Link to="#">
                            <i>Hello {globalName}</i>
                        </Link>
                    </span>
                ) : (
                    <Link to="/signin">Sign in</Link>
                )}
            </div>
        </div>
    </div>
    )
}

export default Title
