import React, { useState, useEffect } from "react";

const data = [
     {
          type: "error",
          img: "https://img.icons8.com/ios-glyphs/30/ffffff/error.png",
     },
     {
          type: "success",
          img: "https://img.icons8.com/ios-glyphs/30/ffffff/ok.png",
     },
];

export default function Toast({
     message = "something",
     type = "error",
     onChange,
}) {
     const [state, setState] = useState({
          moveBack: false,
          moveDown: false,
     });
     useEffect(() => {
          setState({ ...state, moveDown: true });
          let _ss = setTimeout(() => {
               console.log("_ss");
               setState({ ...state, moveBack: true });
          }, 3000);

          let _ff = setTimeout(() => {
               onChange();
          }, 6000);

          return () => {
               clearTimeout(_ss);
               clearTimeout(_ff);
          };
     }, []);
     return (
          <div
               className={` row toast ${
                    state.moveDown && " move-down "
               } ${type} ${state.moveBack && " move-back"} `}
          >
               <img src={data.find((itm) => itm.type === type).img} />
               <p style={{ margin: 0, marginLeft: 10 }}>{message}</p>
          </div>
     );
}

export const popups = () => {
     document.getElementById("popup").innerHTML = <div>Toasting</div>;
};
