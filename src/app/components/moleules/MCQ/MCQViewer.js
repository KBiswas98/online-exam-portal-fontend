import React, {
     useState,
     forwardRef,
     useImperativeHandle,
     useEffect,
} from "react";
import TextInputes from "../../atom/Form/TextInputes";
import Radio from "../../atom/Radio/Radio";

const data = ["option1", "option2", "option3", "option4"];

const MCQViewer = ({ question, setAns, ans }) => {
     const [option, setOption] = useState(-1);
     const MOptions = Object.keys(question).filter((itm) =>
          itm.includes("option")
     );

     //  useEffect(() => {

     //       //   console.log({
     //       //        question: question.qsName,
     //       //        answer: question[MOptions[option]],
     //       //        isCorrect:
     //       //             question[MOptions[option]] ==
     //       //             question[Object.keys(question)[question.trueOption + 1]],
     //       //   });
     //  }, [option]);

     //  useImperativeHandle(ref, () => ({
     //       onSubmit() {
     //            console.log("trigger.");
     //            props.updates({
     //                 question: props.question.qsName,
     //                 answer:
     //                      props.question[
     //                           Object.keys(props.question).slice(0, 4)[option]
     //                      ],
     //            });
     //       },
     //  }));

     const updateRadio = (index) => {
          setAns([
               ...ans,
               {
                    question: question.qsName,
                    answer: question[MOptions[index]],
                    isCorrect:
                         question[MOptions[index]] ==
                         question[
                              Object.keys(question)[question.trueOption + 1]
                         ],
               },
          ]);
          setOption(index);
     };

     return (
          <div
               className="card"
               style={{
                    paddingLeft: 40,
                    paddingBottom: 40,
                    alignItems: "flex-start",
                    width: 700,
               }}
          >
               <div>
                    <h2>{question.qsName}</h2>
               </div>
               <div>
                    {MOptions.map((itm, index) => (
                         <div
                              className="row"
                              style={{
                                   alignItems: "center",
                              }}
                         >
                              <Radio
                                   style={{ marginTop: 0 }}
                                   onClick={() => updateRadio(index)}
                                   isActive={index === option}
                              />
                              <h3 className="ah3">{question[itm]}</h3>
                         </div>
                    ))}
               </div>
          </div>
     );
};

export default MCQViewer;
