import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AddAuthData } from "../../redux/actions/AuthAction";
import axios from "axios";
import { API_ADMIN_LOGIN } from "../../helper/api";
import { useHistory } from "react-router-dom";
import TextInputes from "../../components/atom/Form/TextInputes";
import Button from "../../components/atom/Button/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkNonEmpty, validateEmail } from "../../helper/validation";

export default function AdminLogin() {
     const history = useHistory();
     const dispatch = useDispatch();
     const [state, setState] = useState({ email: "", password: "" });
     const [loading, setLoading] = useState(false);

     const onSubmit = async () => {
          // console.log("From Admin login: ", state);

          if (!Object.keys(state).every((itm) => checkNonEmpty(state[itm]))) {
               toast.error("Field can't be empty.");
               return;
          }

          if (!validateEmail(state.email)) {
               toast.error("Please type valid email.");
               return;
          }

          await axios
               .post(
                    API_ADMIN_LOGIN,
                    { email: state.email, password: state.password },
                    { "Content-Type": "application/json" }
               )
               .then((res) => {
                    if (!res.data.status) {
                         // console.log(res.data.message);
                         setLoading(false);
                    } else {
                         dispatch(
                              AddAuthData({ ...res.data.data, type: "admin" })
                         );
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
          <div className="center_container">
               <div className="card" style={{ padding: 20, marginTop: "20vh" }}>
                    <h2>Admin Login</h2>
                    <TextInputes
                         value={state.email}
                         name={"email"}
                         onChange={updateField}
                         title={"Email "}
                         placeholder="email"
                    />

                    <TextInputes
                         placeholder="password"
                         value={state.password}
                         name={"password"}
                         onChange={updateField}
                         title={"Password "}
                         type="password"
                    />
                    <div className="center_container" style={{ marginTop: 30 }}>
                         <Button
                              type={"primary"}
                              name={loading ? "Loading..." : "Login"}
                              onClick={() => onSubmit()}
                         />
                    </div>
               </div>
               <ToastContainer />
          </div>
     );
}
