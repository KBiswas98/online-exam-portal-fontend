import React, { useState } from "react";
import { API_STUDENT_LOGIN, API_STUDENT } from "../../helper/api";
import { useDispatch } from "react-redux";
import { AddAuthData } from "../../redux/actions/AuthAction";
import axios from "axios";
import { useHistory } from "react-router-dom";
import TextInputes from "../../components/atom/Form/TextInputes";
import Button from "../../components/atom/Button/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkNonEmpty, validateEmail } from "../../helper/validation";

export default function Signup() {
     const dispatch = useDispatch();
     const history = useHistory();
     const [state, setState] = useState({ name: "", email: "", password: "" });
     const [loading, setLoading] = useState(false);

     const onSubmit = async () => {
          //console.log("From student login: ", state);

          if (!Object.keys(state).every((itm) => checkNonEmpty(state[itm]))) {
               toast.error("Field can't be empty.");
               return;
          }

          if (!validateEmail(state.email)) {
               toast.error("Please type valid email.");
               return;
          }

          if (!state.password.length > 5) {
               toast.error("Password should be more then 6 charcter.");
               return;
          }

          setLoading(true);

          await axios
               .post(
                    `${API_STUDENT}/add`,
                    {
                         name: state.name,
                         email: state.email,
                         password: state.password,
                    },
                    { "Content-Type": "application/json" }
               )
               .then((res) => {
                    //console.log(res);
                    if (!res.data.status) {
                         //console.log(res.data.message);
                         setLoading(false);
                    } else {
                         dispatch(
                              AddAuthData({
                                   ...res.data.data,
                                   type: "student",
                              })
                         );
                         setLoading(false);
                         history.push("/student");
                    }
               })
               .catch((err) => {
                    //console.log(err);
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
                    <h2>Student Signup</h2>
                    <TextInputes
                         value={state.name}
                         name={"name"}
                         onChange={updateField}
                         title={"Name "}
                         placeholder="Name"
                    />

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
                              isLoading={loading}
                              type={"primary"}
                              name={"Signup"}
                              onClick={() => onSubmit()}
                         />
                    </div>
               </div>
               <ToastContainer />
          </div>
     );
}
