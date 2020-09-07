import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";
import UpdateGlobalName from "../Redux/Actions.js/UpdateGlobalName";
import InputDiv from "../Components/InputDiv";

function SignInScreen(props) {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const [ validationError, setValidationError ] = useState("");

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("/api/users/signin", { email, password })
            .then((response) => {
                const token = response.data.token;
                try {
                    if (response.data.msg) {
                        setValidationError(response.data.msg);
                    }
                    else {
                        setValidationError("");
                    }
                } catch (error) {
                    // do nothing
                }

                if (token) {
                    Cookie.set("token", token);
                    Cookie.set("globalName", response.data.name);
                    dispatch(UpdateGlobalName(response.data.name));

                    if (props.location.pathname.includes("redirect")) {
                        props.history.push("/shipping");
                    }
                    else {
                        props.history.push("/");
                    }
                }
            })
            .catch((err) => {
                setValidationError(err.response.data.validationError[0].msg);
                // validationError = err.response.data.validationError[0].msg
                // console.log(validationError)
            });
    };

    return (
        <center>
            <center className="signInDiv">
                <form onSubmit={handleSubmit}>
                    <div className="signInHeader">
                        <b>Sign-in</b>
                    </div>
                    {validationError ? (
                        <div style={{ color: "red" }} className="inputDiv">
                            {validationError}
                        </div>
                    ) : (
                        <span />
                    )}

                    <InputDiv tag="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                    <InputDiv
                        tag="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <div className="inputDiv">
                        <button type="submit" className="signInBtn">
                            S I G N&nbsp; I N
                        </button>
                    </div>
                    <div className="inputDiv">
                        <div>
                            <b>New to Amazona?</b>
                        </div>
                    </div>
                    <div className="inputDiv">
                        <Link to="/createaccount">
                            <div className="createAccBtn">Create your Amazona account</div>
                        </Link>
                    </div>
                </form>
            </center>
        </center>
    );
}

export default SignInScreen;
