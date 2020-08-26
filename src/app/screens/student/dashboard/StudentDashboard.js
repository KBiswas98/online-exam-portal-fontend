import React, { useEffect, useState } from "react";
import QuestionCard from "../../../components/moleules/QuestionCard/QuestionCard";
import Button from "../../../components/atom/Button/Button";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { API_QUESTION } from "../../../helper/api";
import { useSelector } from "react-redux";

const data = [
     "Description: Fetch an image of a dog from the [Dog API](https://dog.ceo/dog-api/)",
     "Description: Fetch an image of a dog from the [Dog API](https://dog.ceo/dog-api/)",
     "Description: Fetch an image of a dog from the [Dog API](https://dog.ceo/dog-api/)",
     "Description: Fetch an image of a dog from the [Dog API](https://dog.ceo/dog-api/)",
];

export default function StudentDashboard() {
     const history = useHistory();
     const { token, type } = useSelector((state) => state.AuthReducers);
     const [loading, setLoading] = useState(false);
     const [allQuestion, setQuestion] = useState([]);

     useEffect(() => {
          getNewQuestion();
     }, []);

     const getNewQuestion = async () => {
          setLoading(true);
          await axios
               .get(API_QUESTION, {
                    headers: { Authorization: "Bearer " + token },
               })
               .then((res) => {
                    console.log(res);
                    setLoading(false);
                    res.status === 200 && setQuestion(res.data.data.reverse());
               })
               .catch((err) => console.log(err));
     };

     const removeTest = async (id) => {
          await axios
               .delete(`${API_QUESTION}/remove/${id}`, {
                    headers: { Authorization: "Bearer " + token },
               })
               .then((res) => {
                    res.status === 200 && getNewQuestion();
               })
               .catch((err) => console.log(err));
     };

     const renderQuestion = () => {
          return loading ? (
               <p>Loading...</p>
          ) : allQuestion.length > 0 ? (
               allQuestion.map((itm) => (
                    <QuestionCard
                         qid={itm._id}
                         onClick={() =>
                              history.push({
                                   pathname: "/student/examzone",
                                   state: { obj: itm },
                              })
                         }
                         remove={() => removeTest(itm._id)}
                         noOfQs={itm.questions.length}
                         qsName={itm.name}
                    />
               ))
          ) : (
               <p>No Question.</p>
          );
     };

     return (
          <div className="center_container">
               <div
                    className="row-gap"
                    style={{ width: "65%", margin: " 30px 0px" }}
               >
                    <h3>All Tests</h3>
                    <Button
                         type="primary"
                         name="Show all results"
                         onClick={() => history.push("/student/examzone")}
                    />
               </div>
               {renderQuestion()}
          </div>
     );
}
