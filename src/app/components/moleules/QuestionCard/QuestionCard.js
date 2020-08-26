import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_ANSWER } from "../../../helper/api";

export default function QuestionCard({
     qsName = "question",
     onClick,
     noOfStudent = 0,
     noOfQs = 0,
     remove,
     qid,
}) {
     const { token, email } = useSelector((state) => state.AuthReducers);
     const [myNoOfStudent, setNoOfstudent] = useState(0);

     useEffect(() => {
          getNoOfStudent();
     }, []);

     const getNoOfStudent = async () => {
          await axios
               .get(`${API_ANSWER}/search-by-qid/${qid}`, {
                    headers: { Authorization: "Bearer " + token },
               })
               .then((res) => {
                    console.log(res);
                    setNoOfstudent(res.data.data.length);
               })
               .catch((err) => {
                    console.log(err);
               });
     };

     return (
          <div className="question_card">
               <h2 className="ah2" onClick={() => onClick()}>
                    {qsName}
               </h2>
               <div
                    className="row"
                    style={{ fontSize: 12, justifyContent: "space-between" }}
               >
                    <div className="row">
                         <p>Total question </p>
                         <p>({noOfQs})</p>
                    </div>
                    <div className="row">
                         <p>Total student attempt </p>
                         <p style={{ fontWeight: "bold" }}>({myNoOfStudent})</p>
                    </div>
                    <p className="ap" onClick={() => remove()}>
                         Remove
                    </p>
               </div>
          </div>
     );
}
