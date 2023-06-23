import axios from "axios";

import { createContext, useState, useContext } from "react";

import env from "react-dotenv";

const AuthContext = createContext(null);
export const useAuthProvider = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {

    let localStorageToken = JSON.parse(localStorage.hasOwnProperty("token"));

    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(localStorageToken?.token || null);

    const [itemList, setItemList] = useState([]);

    // business logic for signup process
    const signup = async (username, password) => {
        try {
            setLoading(true);
            const response = await axios.post(`${env.REACT_APP_API_URI}/register`, {
                username,
                password
            });

            if(response.status === 201) {
                setToken(response.data.token);

                localStorage.setItem("token", JSON.stringify(token));
                setLoading(false);
            }
        } catch(err) {
            alert(err.response.data.message);
            setLoading(false);
        }
    };


    // business logic for login process
    const login = async (username, password) => {
        try {
            setLoading(true);
            const response = await axios.post(`${env.REACT_APP_API_URI}/login`, {
                username,
                password
            });

            if(response.status === 200) {
                setToken(response.data.token);

                // save token to local storage
                localStorage.setItem("token", JSON.stringify(token));
                setLoading(false);
            }

        } catch(err) {
            alert(err.response.data.message);
            setLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{loading, login, token, signup }}>
            { children }
        </AuthContext.Provider>
    )
}

