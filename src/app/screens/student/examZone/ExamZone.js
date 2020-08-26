import React, { useState, useRef, useEffect } from "react";
import Button from "../../../components/atom/Button/Button";
import MCQ from "../../../components/moleules/MCQ/MCQ";
import MCQViewer from "../../../components/moleules/MCQ/MCQViewer";
import axios from "axios";
import {
     API_QUESTION,
     API_STUDENT_LOGIN,
     API_STUDENT,
     API_ANSWER,
} from "../../../helper/api";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import _ from "lodash";

var holder = [];

var data = {
     name: "Math exam",
     description: "This is sample description.",
};

export default function ExamZone(props) {
     const { token, type, email } = useSelector((state) => state.AuthReducers);
     const history = useHistory();
     const [mcqs, setMcqs] = useState([]);
     const childRef = useRef();
     const [ans, setAns] = useState([]);

     const questionUpdater = (e) => {
          holder.push(e);
     };

     const exit = () => {
          console.log("exi");
          history.push("/student");
     };

     useEffect(() => {
          console.log(props.location.state.obj.questions);
          // renderMcq();
     }, []);

     const renderMcq = () =>
          props.location.state.obj.questions.map((itm) => (
               <div className="stack">
                    <MCQViewer ans={ans} setAns={setAns} question={itm} />
               </div>
          ));

     const onSubmit = async () => {
          console.log(
               _.uniqBy(ans.reverse(), "question").filter(
                    (itm) => itm.isCorrect
               )
          );
          const bdy = {
               answer: _.uniqBy(ans.reverse(), "question"),
               mark: _.uniqBy(ans.reverse(), "question")
                    .map((itm) => itm.isCorrect)
                    .filter((_itm) => _itm === true).length,
          };

          console.log(bdy);

          await axios
               .post(
                    `${API_ANSWER}/add`,
                    {
                         qid: props.location.state.obj._id,
                         semail: email,
                         ans: bdy,
                    },
                    {
                         headers: { Authorization: "Bearer " + token },
                    }
               )
               .then((res) => {
                    console.log(res);
                    history.push("/student");
               })
               .catch((err) => {
                    console.log(err);
               });
     };

     return (
          <div className="center_container">
               <h1
                    style={{
                         letterSpacing: 0.9,
                         margin: "50px 0px",
                         marginBottom: 0,
                    }}
               >
                    {props.location.state.obj.name}
               </h1>
               <p style={{ opacity: 0.7, fontSize: 12 }}>{data.description}</p>
               {/* {mcqs} */}
               {renderMcq()}
               <div className="row" style={{ margin: "20px 0px" }}>
                    <Button name="Exit" onClick={() => exit()} />
                    <Button
                         type="primary"
                         name="Finish"
                         onClick={() => onSubmit()}
                    />
               </div>
          </div>
     );
}
