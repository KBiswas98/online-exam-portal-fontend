import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AddAuthData } from "../../redux/actions/AuthAction";
import axios from "axios";
import { API_ADMIN_LOGIN } from "../../helper/api";
import { useHistory } from "react-router-dom";

export default function AdminLogin() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [state, setState] = useState({ email: "", password: "" });
    const [loadin, setLoading] = useState(false);

    const onSubmit = async () => {
        console.log("From Admin login: ", state);

        await axios
            .post(
                API_ADMIN_LOGIN,
                { email: state.email, password: state.password },
                { "Content-Type": "application/json" }
            )
            .then((res) => {
                if (!res.data.status) {
                    console.log(res.data.message);
                    setLoading(false);
                } else {
                    dispatch(AddAuthData({ ...res.data.data, type: "admin" }));
                    setLoading(false);
                    history.push("/admin");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const updateField = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div>
            <h2> admin Login</h2>
            <input
                placeholder="email"
                name="email"
                value={state.email}
                onChange={updateField}
            />
            <input
                placeholder="password"
                name="password"
                value={state.password}
                onChange={updateField}
            />
            <button onClick={() => onSubmit()}>
                <p>{loadin ? "Loading..." : "Login"}</p>
            </button>
        </div>
    );
}
