import React, { useState, useRef } from "react";
import Button from "../../../components/atom/Button/Button";
import MCQ from "../../../components/moleules/MCQ/MCQ";
import TextInputes from "../../../components/atom/Form/TextInputes";
import axios from "axios";
import { API_QUESTION } from "../../../helper/api";
import { useSelector, useDispatch } from "react-redux";
import { AuthLogout } from "../../../redux/actions/AuthAction";
import { useHistory } from "react-router-dom";

var holder = [];

export default function QuestionBuilder() {
     const { token, type } = useSelector((state) => state.AuthReducers);
     const dispatch = useDispatch();
     const history = useHistory();
     const [questions, setQuestion] = useState({
          name: "",
          description: "",
          questions: [],
     });
     const [mcqs, setMcqs] = useState([]);
     const childRef = useRef();

     const questionUpdater = (e) => {
          holder.push(e);
     };

     const updateField = (e) => {
          setQuestion({
               ...questions,
               [e.target.name]: e.target.value,
          });
     };

     const addNewQuestion = (dummy = false) => {
          mcqs.length > 0 && childRef.current.onSubmit();
          setMcqs([
               ...mcqs,
               dummy ? null : (
                    <MCQ ref={childRef} updates={(e) => questionUpdater(e)} />
               ),
          ]);
     };

     const onSubmit = async () => {
          mcqs.length > 0 && childRef.current.onSubmit();
          await axios
               .post(
                    `${API_QUESTION}/add`,

                    {
                         name: questions.name,
                         description: questions.description,
                         questions: holder,
                    },
                    {
                         headers: { Authorization: "Bearer " + token },
                    }
               )
               .then((res) => {
                    // console.log(res);
                    history.push("/admin");
               })
               .catch((err) => {
                    console.log(err);
                    // err && dispatch(AuthLogout());
               });
     };

     return (
          <div className="center_container">
               <h1 style={{ letterSpacing: 0.9, margin: "50px 0px" }}>
                    Question Builder
               </h1>
               <div style={{ margin: "40px 0px" }}>
                    <TextInputes
                         value={questions.name}
                         name={"name"}
                         onChange={updateField}
                         title={"Test name "}
                    />
                    <TextInputes
                         value={questions.description}
                         name={"description"}
                         onChange={updateField}
                         title={"Test Description "}
                         style={{ height: 100 }}
                    />
               </div>
               {mcqs}
               <div className="row" style={{ margin: "20px 0px" }}>
                    <Button
                         name="Add new Question"
                         onClick={() => addNewQuestion()}
                    />
                    <Button
                         type="primary"
                         name="Save and exit"
                         onClick={() => onSubmit()}
                    />
               </div>
          </div>
     );
}
