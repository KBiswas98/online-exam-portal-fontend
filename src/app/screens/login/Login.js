import React, { useState } from "react";
import { API_STUDENT_LOGIN } from "../../helper/api";
import { useDispatch } from "react-redux";
import { AddAuthData } from "../../redux/actions/AuthAction";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Login() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [state, setState] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        console.log("From student login: ", state);

        await axios
            .post(
                API_STUDENT_LOGIN,
                { email: state.email, password: state.password },
                { "Content-Type": "application/json" }
            )
            .then((res) => {
                if (!res.data.status) {
                    console.log(res.data.message);
                    setLoading(false);
                } else {
                    dispatch(
                        AddAuthData({ ...res.data.data, type: "student" })
                    );
                    setLoading(false);
                    history.push("/student");
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
            <h2> Login</h2>
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
                <p>{loading ? "Loading..." : "Login"}</p>
            </button>
        </div>
    );
}
