import React, { useEffect, useState } from "react";
import './Login.css';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../context/appAction";
import Loader from "../Loader";
import Notify from "../../utils/toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error, loading, isAuthenticated } = useSelector(
        (state) => state.user
    );

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const redirect = localStorage.getItem('history') ? localStorage.getItem('history') : "/admin/events";

    useEffect(() => {
        if (error) {
            Notify({message: error, type:"error"});
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            Notify({message: 'Login successfully', type:"success"});
            navigate(redirect);
        }
    }, [dispatch, error, isAuthenticated, redirect, navigate]);

    function validateForm() {
        return email.length > 3 && password.length > 7;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(login(email, password));
    };

    return (
        <>{loading ? (
            <Loader />
        ) : (
            <>
                <div className="d-flex justify-content-between app-background">
                    <form onSubmit={handleSubmit} className="loginForm shadow border border-primary rounded col-lg-4 col-md-6 col-sm-8 col-11">
                        <h2 className="text-center mb-2">Login form
                        </h2>
                        <div className="form-group">
                            <label labelfor="email">Email address</label>
                            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" autoFocus value={email} onChange={(e) => setEmail(e.target.value)} />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label labelfor="password">Password</label>
                            <input type="password" className="form-control" id="password" aria-describedby="passwordHelp" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <small id="passwordHelp" className="form-text text-muted">Password length must greater or equal to 8.</small>
                        </div>
                        <div className="row justify-content-around mt-3">
                        <button type="submit" className="btn btn-primary col-6 btn-block mb-3" disabled={!validateForm()}>Login</button>
                        </div>
                    </form>
                </div>
            </>
        )}
        </>
    );
}

export default Login;