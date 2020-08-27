import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "../screens/landing-page/Landing";
import Navbar from "../components/organisams/navbar/Navbar";
import Login from "../screens/login/Login";
import Signup from "../screens/signup/Signup";
import StudentDashboard from "../screens/student/dashboard/StudentDashboard";
import AdminDashboard from "../screens/admin/dashboard/AdminDashboard";
import AdminLogin from "../screens/login/AdminLogin";
import PrivateRoute from "./PrivateRoute";
import QuestionBuilder from "../screens/admin/questionBuilder/QuestionBuilder";
import ResultTable from "../screens/admin/resultTable/ResultTable";
import ExamZone from "../screens/student/examZone/ExamZone";
import ProtectedRoute from "./ProtectedRoute";

export default function AppNavigation() {
     return (
          <>
               <Router>
                    <Navbar />
                    <Switch>
                         <Route exact path="/" component={Landing} />
                         <ProtectedRoute
                              _for={"admin"}
                              exact
                              path="/admin-login"
                              component={AdminLogin}
                         />
                         <ProtectedRoute
                              _for={"student"}
                              exact
                              path="/student-login"
                              component={Login}
                         />
                         <ProtectedRoute
                              _for={"student"}
                              exact
                              path="/signup"
                              component={Signup}
                         />

                         <PrivateRoute
                              _for="student"
                              exact
                              path="/student"
                              component={StudentDashboard}
                         />
                         <PrivateRoute
                              _for="student"
                              exact
                              path="/student/examzone"
                              component={ExamZone}
                         />
                         <PrivateRoute
                              _for="admin"
                              exact
                              path="/admin"
                              component={AdminDashboard}
                         />
                         <PrivateRoute
                              _for="admin"
                              exact
                              path="/admin/question-builder"
                              component={QuestionBuilder}
                         />
                         <PrivateRoute
                              _for="admin"
                              exact
                              path="/admin/result"
                              component={ResultTable}
                         />

                         <Route exact path="*" component={FourOFour} />
                    </Switch>
               </Router>
          </>
     );
}

const FourOFour = () => (
     <h1 style={{ fontSize: 100, textAlign: "center", marginTop: "20%" }}>
          404
     </h1>
);
