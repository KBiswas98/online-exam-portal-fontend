import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AuthLogout } from "../../../redux/actions/AuthAction";
const data = {
    name: "Eschool",
    options: ["About us", "Blog", "Contact us", "Login", "Signup"],
    path: ["/", "/", "/", "/student", "/signup"],
};

export default function Navbar({ options = data.options, path = data.path }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { token, type } = useSelector((state) => state.AuthReducers);

    if (token.length > 10) {
        options = options.slice(0, 3).concat("Dashboard");
        path = path
            .slice(0, 3)
            .concat(type === "admin" ? "/admin" : "/student");
        // console.log(options.slice(0, 3).concat("Dashboard"), path);
    }

    const logout = () => {
        dispatch(AuthLogout());
        history.push("/");
    };

    return (
        <div className="row-gap full navbar">
            <Link to="/" style={{ textDecoration: "none" }}>
                <h2 className="logo_text">{data.name}</h2>
            </Link>
            <div className="row">
                {options.map((itm, index) => (
                    <Link
                        to={`${path[index]}`}
                        style={{ marginLeft: 25, textDecoration: "none" }}
                    >
                        <h4 className="ah4">{itm}</h4>
                    </Link>
                ))}
                {token.length > 10 && (
                    <h4
                        className="ah4"
                        onClick={() => logout()}
                        style={{ marginLeft: 25, textDecoration: "none" }}
                    >
                        Logout
                    </h4>
                )}
            </div>
        </div>
    );
}
