import React, {
     useState,
     forwardRef,
     useImperativeHandle,
     useEffect,
} from "react";
import TextInputes from "../../atom/Form/TextInputes";
import Radio from "../../atom/Radio/Radio";

const MCQPreview = ({ question, correctOption, options }) => {
     // console.log(question, options);
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
                    <h2>{question}</h2>
               </div>
               <div>
                    {options.map((itm, index) => (
                         <div
                              className="row"
                              style={{
                                   alignItems: "center",
                              }}
                         >
                              <Radio
                                   onClick={() => console.log()}
                                   style={{ marginTop: 0 }}
                                   isActive={index === correctOption}
                              />
                              <h3 className="ah3">{itm}</h3>
                         </div>
                    ))}
               </div>
          </div>
     );
};

export default MCQPreview;
