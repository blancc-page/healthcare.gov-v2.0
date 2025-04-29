import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import axios from "axios";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    axios.defaults.withCredentials = true;


    const backendUrl = import.meta.env.MODE === 'development' 
        ?  'http://localhost:4000/'
        : 'https://healthcare-gov-backend.onrender.com/';
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);

    const getAuthState = async () => {
        try {
            const { data } = await axios.get(backendUrl + 'api/auth/is-auth');
            if (data.success) {
                setIsLoggedIn(true);
                getUserData();
            }
        } catch (error) {
            console.error('Auth check failed:', error);
        }
    }

    const getUserData = async () => {
        try {
            const { data } = await axios.get(backendUrl + 'api/user/data');
            if (data.success) {
                setUserData(data.userData);
            }
        } catch (error) {
            console.error('Failed to fetch user data:', error);
            toast.error('Failed to load user data');
        }
    }

    useEffect(() => {
        getAuthState();
    }, []);

    const value = {
        backendUrl,
        isLoggedIn, setIsLoggedIn,
        userData, setUserData,
        getUserData
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
}