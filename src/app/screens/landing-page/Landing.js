import React from "react";
import Button from "../../components/atom/Button/Button";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Landing() {
     const history = useHistory();
     const { token } = useSelector((state) => state.AuthReducers);
     return (
          <div className="center_container">
               <div className="card banner">
                    <div className="row-gap">
                         <div
                              style={{
                                   marginLeft: 30,
                                   marginTop: token.length > 10 ? 0 : 50,
                              }}
                         >
                              <h1 className="dh3">
                                   The primary documentation for
                              </h1>
                              <h5 className="dh5" style={{ fontSize: 14 }}>
                                   You can find more examples in the examples
                                   directory, which you can run in a local
                                   development server using npm start or yarn
                                   run start.
                              </h5>
                              {token.length === 0 && (
                                   <div
                                        className="row"
                                        style={{
                                             marginTop: 40,
                                             marginLeft: -10,
                                        }}
                                   >
                                        <Button
                                             type="primary"
                                             name="Create Account"
                                             onClick={() =>
                                                  history.push("/signup")
                                             }
                                        />
                                        <Button
                                             type="secoendary"
                                             name="Login"
                                             onClick={() =>
                                                  history.push("/student-login")
                                             }
                                        />
                                   </div>
                              )}
                         </div>
                         <div>
                              <img
                                   src={require("../../assets/png/undraw_back_to_school_inwc 1.png")}
                              />
                         </div>
                    </div>
               </div>
               <div
                    className="row"
                    style={{
                         margin: "40px 0px",
                         width: "80vw",
                         justifyContent: "space-around",
                    }}
               >
                    <div className="stack">
                         <div className="row">
                              <div
                                   style={{
                                        position: "relative",
                                        top: -27,
                                   }}
                              >
                                   <h1 className="dh1">I</h1>
                                   <div className="circle"></div>
                              </div>
                              <div>
                                   <h2 className="dh2">
                                        loream ipsam loream ipsam
                                   </h2>
                              </div>
                         </div>
                         <p className="dp">
                              loream ipsam loream ipsam loream ipsam loream
                              ipsam loream ipsam loream ipsam loream ipsam
                              loream ipsam
                         </p>
                    </div>
                    <div className="stack">
                         <div className="row">
                              <div
                                   style={{
                                        position: "relative",
                                        top: -27,
                                   }}
                              >
                                   <h1 className="dh1">II</h1>
                                   <div
                                        className="circle"
                                        style={{ backgroundColor: "pink" }}
                                   ></div>
                              </div>
                              <div>
                                   <h2 className="dh2">
                                        loream ipsam loream ipsam
                                   </h2>
                              </div>
                         </div>
                         <p className="dp">
                              loream ipsam loream ipsam loream ipsam loream
                              ipsam loream ipsam loream ipsam loream ipsam
                              loream ipsam
                         </p>
                    </div>
                    <div className="stack">
                         <div className="row">
                              <div
                                   style={{
                                        position: "relative",
                                        top: -27,
                                   }}
                              >
                                   <h1 className="dh1">III</h1>
                                   <div
                                        className="circle"
                                        style={{ backgroundColor: "orange" }}
                                   ></div>
                              </div>
                              <div>
                                   <h2 className="dh2">
                                        loream ipsam loream ipsam
                                   </h2>
                              </div>
                         </div>
                         <p className="dp">
                              loream ipsam loream ipsam loream ipsam loream
                              ipsam loream ipsam loream ipsam loream ipsam
                              loream ipsam
                         </p>
                    </div>
               </div>
               <div className=" banner">
                    <div className="row-gap">
                         <div>
                              <h1 className="dh3">
                                   We provide online examination fecility.
                              </h1>
                              <h5 className="dh5">
                                   Here is a simple example of react-modal being
                                   used in an app with some custom styles and
                                   focusable input elements within the modal
                                   content:Here is a simple example of
                                   react-modal being used in an app with some
                                   custom styles and focusable input elements
                                   within the modal content:
                              </h5>
                         </div>
                         <div>
                              <img
                                   src={require("../../assets/png/undraw_studying_s3l7 1.png")}
                              />
                         </div>
                    </div>
               </div>
               <div className=" banner">
                    <div className="row-gap reverse">
                         <div>
                              <h1 className="dh3">
                                   We provide online examination fecility.
                              </h1>
                              <h5 className="dh5">
                                   Here is a simple example of react-modal being
                                   used in an app with some custom styles and
                                   focusable input elements within the modal
                                   content:Here is a simple example of
                                   react-modal being used in an app with some
                                   custom styles and focusable input elements
                                   within the modal content:
                              </h5>
                         </div>
                         <div>
                              <img
                                   src={require("../../assets/png/undraw_book_lover_mkck 1.png")}
                              />
                         </div>
                    </div>
               </div>
               <div className=" banner">
                    <div className="row-gap">
                         <div>
                              <h1 className="dh3">
                                   We provide online examination fecility.
                              </h1>
                              <h5 className="dh5">
                                   Here is a simple example of react-modal being
                                   used in an app with some custom styles and
                                   focusable input elements within the modal
                                   content:Here is a simple example of
                                   react-modal being used in an app with some
                                   custom styles and focusable input elements
                                   within the modal content:
                              </h5>
                         </div>
                         <div>
                              <img
                                   src={require("../../assets/png/undraw_exams_g4ow 1.png")}
                              />
                         </div>
                    </div>
               </div>
               <div className=" banner">
                    <div className="row-gap reverse">
                         <div>
                              <h1 className="dh3">
                                   We provide online examination fecility.
                              </h1>
                              <h5 className="dh5">
                                   Here is a simple example of react-modal being
                                   used in an app with some custom styles and
                                   focusable input elements within the modal
                                   content:Here is a simple example of
                                   react-modal being used in an app with some
                                   custom styles and focusable input elements
                                   within the modal content:
                              </h5>
                         </div>
                         <div>
                              <img
                                   src={require("../../assets/png/undraw_back_to_school_inwc 1.png")}
                              />
                         </div>
                    </div>
               </div>
               <div
                    className="row_center"
                    style={{
                         width: "100vw",
                         backgroundColor: "rgba(176, 176, 176, 0.1)",
                    }}
               >
                    <p className="xp"> {">_ Kamalesh Biswas"}</p>
                    <p className="xp">{"@ bkamalesh99@gmail.com"}</p>
               </div>
          </div>
     );
}
