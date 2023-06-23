import axios from "axios";

import { createContext, useState, useContext } from "react";

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
            const response = await axios.get(`${process.env.REACT_APP_API_URI}/list-items`, {
                headers: {
                    authorization: token
                }
            });

            if(response.status === 200) {
                setLoading(false);
                setItemList(response.data);
            }
        } catch(err) {
            alert(err.response.data.message);
            setLoading(false);
        }
    };

    // business logic to post list items
    const addItem = async (inputText, inputDescription) => {
        try {
            setLoading(true);
            const response = await axios.post(`${process.env.REACT_APP_API_URI}/list-items/add`, {
                text: inputText,
                description: inputDescription
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


    //business logic to update a list item
    const updateItem = async (uuid, updatedText, updatedDescription) => {
        try {
            setLoading(true);
            const response = await axios.put(`${process.env.REACT_APP_API_URI}/list-items/update/${uuid}`, {
                text: updatedText,
                description: updatedDescription
            } , {
                headers: {
                    authorization: token
                }
            });

            if(response.status === 200) {
                getListItems();
                setLoading(false);
            }
        } catch(err) {
            console.log(err);
        }
    }


    // business logic to delete a list item
    const deleteItem = async (uuid) => {
        try {
            setLoading(true);
            const response = await axios.delete(`${process.env.REACT_APP_API_URI}/list-items/delete/${uuid}`, {
                headers: {
                    authorization: token
                }
            });

            if(response.status === 200) {
                getListItems();
                setLoading(false);
            }
        } catch(err) {
            console.log(err);
        }
    } 

    return (
        <ListContext.Provider value={{loading, token, getListItems, addItem, updateItem, deleteItem, itemList}}>
            { children }
        </ListContext.Provider>
    )
}