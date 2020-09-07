import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";
import UpdateGlobalName from "../Redux/Actions.js/UpdateGlobalName";
import InputDiv from "../Components/InputDiv";

function CreateAccount(props) {
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ validationError, setValidationError ] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password === confirmPassword) {
            axios
                .post("api/users/register", { name, email, password })
                .then((response) => {
                    try {
                        if (response.data.msg) {
                            setValidationError(response.data.msg);
                        }
                        else {
                            setValidationError("");
                        }
                    } catch (error) {}

                    Cookie.set("token", response.data.token);
                    dispatch(UpdateGlobalName(response.data.name));
                    Cookie.set("globalName", response.data.name);
                    if (response.data.token) {
                        props.history.push("/");
                    }
                })
                .catch((err) => {
                    try {
                        setValidationError(err.response.data.validationError[0].msg);
                    } catch (error) {}
                });
        }
        else {
            //show user info that passwords do not match
            setValidationError("Passwords do not match");
        }
    };

    return (
        <center>
            <center className="signInDiv">
                <form onSubmit={handleSubmit}>
                    <div className="signInHeader">
                        <b>Create Account</b>
                    </div>
                    {validationError ? (
                        <div style={{ color: "red" }} className="inputDiv">
                            {validationError}
                        </div>
                    ) : (
                        <span />
                    )}

                    <InputDiv tag="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    <InputDiv tag="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <InputDiv tag="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <InputDiv
                        tag="Re-enter Password"
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <div className="inputDiv">
                        <button className="signInBtn" type="submit">
                            Create your amazona account
                        </button>
                    </div>
                    <div className="inputDiv">
                        <div>
                            <b>Already have an account?</b> &nbsp; <Link to="/signin">Sign in</Link>
                        </div>
                    </div>
                </form>
            </center>
        </center>
    );
}

export default CreateAccount;
