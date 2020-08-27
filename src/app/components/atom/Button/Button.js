import React from "react";
import Loader from "react-loader-spinner";
import "react-responsive-modal/styles.css";

export default function Button({ name, type, onClick, isLoading }) {
     return (
          <div onClick={() => onClick()} className={" button " + type}>
               <div className="row" style={{ justifyContent: "center" }}>
                    {name}
                    {isLoading && (
                         <Loader
                              style={{ marginLeft: 5 }}
                              type="TailSpin"
                              color="#fff"
                              height={20}
                              width={20}
                         />
                    )}
               </div>
          </div>
     );
}
