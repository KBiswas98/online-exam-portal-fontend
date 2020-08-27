import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table from "../../../components/moleules/Table/Table";
import ReactCardFlip from "react-card-flip";
import Loader from "react-loader-spinner";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import MCQPreview from "../../../components/moleules/MCQ/MCQPreview";
import { API_ANSWER, API_QUESTION, API_STUDENT } from "../../../helper/api";
import axios from "axios";
import Button from "../../../components/atom/Button/Button";

export default function ResultTable(props) {
     const history = useHistory();
     const { token, type, email } = useSelector((state) => state.AuthReducers);
     const [tableLoading, setTableLoading] = useState(false);
     const [tableData, setTableData] = useState([]);
     const [allAns, setAns] = useState([]);
     const [modelState, changeModelState] = useState(false);
     const [selectd, setSelected] = useState(0);

     useEffect(() => {
          getAllAnswers();
     }, []);

     const changeSelect = (indx) => {
          setSelected(indx);
          changeModelState(!modelState);
     };

     const getAllAnswers = async () => {
          setTableLoading(true);
          let x = [];
          await axios
               .get(`${API_ANSWER}/search-by-qid/${props.location.state.id}`, {
                    headers: { Authorization: "Bearer " + token },
               })
               .then((res) => {
                    setAns(res.data.data);
                    //console.log(res);
                    if (res.status === 200) {
                         Promise.all(
                              res.data.data.map((qid) =>
                                   axios.get(`${API_STUDENT}/${qid.semail}`, {
                                        headers: {
                                             Authorization: "Bearer " + token,
                                        },
                                   })
                              )
                         )
                              .then((resp) => {
                                   //console.log(resp);
                                   resp.map((itm, index) => {
                                        x.push({
                                             name: itm.data.data[0].name,
                                             email: itm.data.data[0].email,
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
                                   //    //console.log(resp);
                              })
                              .catch((err) => toast.error(err.message));
                    }
               })
               .catch((err) => toast.error(err.message));
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
                    Header: "Email",
                    accessor: "email",
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
                         //  //console.log(cell);
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
          ) : (
               <Table column={column} _data={tableData} />
          );
     };

     const renderResult = () => {
          //   //console.log(allAns);
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
                              //console.log(itm);
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

     return (
          <div className="center_container">
               <h1 style={{ marginBottom: 30 }}>Results</h1> <ToastContainer />
               <div>{renderTable()}</div>
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
