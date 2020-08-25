import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "../screens/landing-page/Landing";

export default function AppNavigation() {
    return (
        <>
            <Router>
                <Switch>
                    <Route exact path="/" component={Landing} />
                </Switch>
            </Router>
        </>
    );
}
