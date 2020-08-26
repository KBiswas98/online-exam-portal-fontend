import axios from "axios";
import { useDispatch } from "react-redux";

export const postProvider = async (params) => {
     return new Promise((resolve, reject) => {
          axios.post(params)
               .then((res) => {
                    switch (res.status) {
                         case 401:
                              reject({ message: "unauthorized." });
                              break;
                         case 403:
                              reject({ message: "forbidden." });
                              break;
                         case 200 || 201:
                              resolve(res);
                              break;
                         default:
                              reject({ message: "unknown" });
                    }
               })
               .catch((err) => {
                    console.log("----- over this ----");
                    reject(err);
               });
     });
};

export const getProvider = async (params) => {
     return new Promise((resolve, reject) => {
          axios.get(params)
               .then((res) => {
                    resolve(res);
               })
               .catch((err) => {
                    console.log(
                         "----- over this ----",
                         err.message.includes("401")
                    );

                    switch (err.status) {
                         case 401:
                              reject({ message: "unauthorized." });
                              break;
                         case 403:
                              reject({ message: "forbidden." });
                              break;
                         default:
                              reject({ message: "unknown" });
                    }
                    reject(err);
               });
     });
};
