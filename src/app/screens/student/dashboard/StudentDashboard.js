import React, { useEffect, useState } from "react";
import QuestionCard from "../../../components/moleules/QuestionCard/QuestionCard";
import Button from "../../../components/atom/Button/Button";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { API_QUESTION, API_ANSWER } from "../../../helper/api";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table from "../../../components/moleules/Table/Table";
import ReactCardFlip from "react-card-flip";
import Loader from "react-loader-spinner";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import MCQPreview from "../../../components/moleules/MCQ/MCQPreview";

const data = [
     "Description: Fetch an image of a dog from the [Dog API](https://dog.ceo/dog-api/)",
     "Description: Fetch an image of a dog from the [Dog API](https://dog.ceo/dog-api/)",
     "Description: Fetch an image of a dog from the [Dog API](https://dog.ceo/dog-api/)",
     "Description: Fetch an image of a dog from the [Dog API](https://dog.ceo/dog-api/)",
];

export default function StudentDashboard() {
     const history = useHistory();
     const { token, type, email } = useSelector((state) => state.AuthReducers);
     const [loading, setLoading] = useState(false);
     const [tableLoading, setTableLoading] = useState(false);
     const [tableData, setTableData] = useState([]);
     const [allQuestion, setQuestion] = useState([]);
     const [isFlip, setFlip] = useState(false);
     const [modelState, changeModelState] = useState(false);
     const [allAns, setAns] = useState([]);
     const [selectd, setSelected] = useState(0);

     useEffect(() => {
          getNewQuestion();
          getAllAnswers();
     }, []);

     const getAllAnswers = async () => {
          setTableLoading(true);
          let x = [];
          await axios
               .get(`${API_ANSWER}/search-by-email/${email}`, {
                    headers: { Authorization: "Bearer " + token },
               })
               .then((res) => {
                    setAns(res.data.data);
                    // console.log(res);
                    if (res.status === 200) {
                         Promise.all(
                              res.data.data.map((qid) =>
                                   axios.get(`${API_QUESTION}/${qid.qid}`, {
                                        headers: {
                                             Authorization: "Bearer " + token,
                                        },
                                   })
                              )
                         )
                              .then((resp) => {
                                   // console.log(res.data.data[0].updated_at);
                                   resp.map((itm, index) => {
                                        x.push({
                                             name: itm.data.data.name,
                                             totalQuestion:
                                                  itm.data.data.questions
                                                       .length,
                                             date:
                                                  res.data.data[index]
                                                       .updated_at,
                                             correct:
                                                  res.data.data[index].ans
                                                       .mark || 0,
                                        });
                                   });
                                   setTableData(x.reverse());
                                   setTableLoading(false);
                                   // console.log(resp);
                              })
                              .catch((err) => {
                                   setLoading(false);
                                   setTableLoading(false);
                                   // console.log(err);
                              });
                    }
               })
               .catch((err) => {
                    {
                         setLoading(false);
                         setTableLoading(false);
                         // console.log(err);
                    }
                    toast.error(err.message);
               });
     };

     const flipAndLoad = () => {
          getAllAnswers();
          setFlip(!isFlip);
     };

     const getNewQuestion = async () => {
          setLoading(true);
          await axios
               .get(API_QUESTION, {
                    headers: { Authorization: "Bearer " + token },
               })
               .then((res) => {
                    // console.log(res);
                    setLoading(false);
                    res.status === 200 && setQuestion(res.data.data.reverse());
               })
               .catch((err) => toast.error(err.message));
     };

     const removeTest = async (id) => {
          await axios
               .delete(`${API_QUESTION}/remove/${id}`, {
                    headers: { Authorization: "Bearer " + token },
               })
               .then((res) => {
                    res.status === 200 && getNewQuestion();
               })
               .catch((err) => toast.error(err.message));
     };

     const renderQuestion = () => {
          return loading ? (
               <div style={{ marginTop: "25vh" }}>
                    <Loader
                         type="TailSpin"
                         color="#f1803a"
                         height={50}
                         width={50}
                         // timeout={3000} //3 secs
                    />
               </div>
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

     const renderResult = () => {
          // console.log(allAns);
          return tableLoading ? (
               <div style={{ marginTop: "25vh" }}>
                    <Loader
                         type="TailSpin"
                         color="#f1803a"
                         height={50}
                         width={50}
                         // timeout={3000} //3 secs
                    />
               </div>
          ) : (
               <div className="stack">
                    {allAns.length > 0 &&
                         allAns[selectd].ans.answer.map((itm) => {
                              // console.log(itm);
                              return (
                                   <MCQPreview
                                        correctOption={0}
                                        options={[itm.answer]}
                                        question={itm.question}
                                   />
                              );
                         })}
               </div>
          );
     };

     const changeSelect = (indx) => {
          setSelected(indx);
          changeModelState(!modelState);
     };

     const renderTable = () => {
          let data = [
               {
                    name: "math",
                    totalQuestion: 30,
                    date: new Date().toISOString(),
                    correct: 25,
               },
               {
                    name: "asd",
                    totalQuestion: 10,
                    date: new Date().toISOString(),
                    correct: 5,
               },
          ];
          let column = [
               {
                    Header: "Name",
                    accessor: "name",
               },
               {
                    Header: "Total question",
                    accessor: "totalQuestion",
               },
               {
                    Header: "Exam date",
                    accessor: "date",
               },
               {
                    Header: "Correct ans",
                    accessor: "correct",
               },
               {
                    width: 300,
                    Header: "Show result",
                    accessor: "",
                    Cell: (cell) => {
                         // console.log(cell);
                         return (
                              <Button
                                   type="primary"
                                   style={{ maxWidth: 40 }}
                                   name={"show"}
                                   onClick={() => changeSelect(cell.row.id)}
                              >
                                   {"show"}
                              </Button>
                         );
                    },
               },
          ];
          return tableLoading ? (
               <div style={{ marginTop: "25vh" }}>
                    <Loader
                         type="TailSpin"
                         color="#f1803a"
                         height={50}
                         width={50}
                         // timeout={3000} //3 secs
                    />
               </div>
          ) : tableData.length > 0 ? (
               <Table column={column} _data={tableData} />
          ) : (
               <p>No Result found</p>
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
                         name={
                              isFlip ? "Show all question" : "Show all results"
                         }
                         onClick={() => flipAndLoad()}
                    />
               </div>
               <ReactCardFlip isFlipped={isFlip} flipDirection="vertical">
                    {renderQuestion()}
                    {renderTable()}
               </ReactCardFlip>
               <ToastContainer />
               <Modal
                    open={modelState}
                    onClose={() => changeModelState(!modelState)}
               >
                    <div className="" style={{ marginTop: 20 }}>
                         {renderResult()}
                    </div>
               </Modal>
          </div>
     );
}
