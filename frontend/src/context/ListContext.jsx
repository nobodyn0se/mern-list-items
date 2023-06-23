import axios from "axios";

import { createContext, useState, useContext } from "react";

import env from "react-dotenv";
import { useAuthProvider } from "./AuthContext";

const ListContext = createContext(null);
export const useListProvider = () => useContext(ListContext);

export const ListContextProvider = ({ children }) => {

    const [loading, setLoading] = useState(false);
    
    const { token } = useAuthProvider();

    const [itemList, setItemList] = useState([]);

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
                setItemList(response.data);
                console.log(itemList);
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
                getListItems();
                setLoading(false);
            }
        } catch(err) {
            alert(err.response.data.message);
            setLoading(false);
        }
    }

    return (
        <ListContext.Provider value={{loading, token, getListItems, addItem, itemList}}>
            { children }
        </ListContext.Provider>
    )
}