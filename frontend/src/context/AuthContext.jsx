import axios from "axios";

import { createContext, useState, useContext } from "react";

import env from "react-dotenv";

const AuthContext = createContext(null);
export const useAuthProvider = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {

    let localStorageToken = JSON.parse(localStorage.hasOwnProperty("token"));

    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(localStorageToken?.token || null);


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


    // business logic to get list items
    const getListItems = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${env.REACT_APP_API_URI}/list-items`, {
                headers: {
                    authorization: token
                }
            });

            if(response.status === 200) {
                setLoading(false);
                return response.data;
            }
        } catch(err) {
            alert(err.response.data.message);
            setLoading(false);
        }
    };

    // business logic to post list items
    const addItem = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`${env.REACT_APP_API_URI}/list-items/add`, {
                text: "New ToDo Item",
                description: "New ToDo Item Description"
            }, {
                headers: {
                    authorization: token
                }
            });

            if(response.status === 200) {
                const updatedListItems = await getListItems();
                setLoading(false);
                return updatedListItems;
            }
        } catch(err) {
            alert(err.response.data.message);
            setLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{loading, login, token, signup, getListItems, addItem}}>
            { children }
        </AuthContext.Provider>
    )
}

