'use client';
// Imports
import {decode} from 'base-64';
import {createContext, useReducer} from 'react';





// Initial state
const initialState = {
    user:null
};





// User local storage check
const localStorageCheck = async () => {
    try {

        // User token check
        const token = await localStorage.getItem('token');
        if(token){
            const decodedToken = JSON.parse(decode(token.split('.')[1]));
            if(decodedToken.exp > Date.now()){
                await localStorage.removeItem('token');
            }else{
                initialState.user = decodedToken;
            }
        };

    } catch (err) {
        console.log(err);
    }
};
localStorageCheck();





// Context
const AuthContext = createContext({
    user:null,
    login:userData => {},
    logout:() => {}
});





// Reducer
const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user:action.payload,
            }
        case 'LOGOUT':
            return{
                ...state,
                user:null,
            }
        default:
            return state;
    };
};





// Provider
const AuthProvider = props => {

    // State
    const [state, dispatch] = useReducer(AuthReducer, initialState);


    // login
    const login = async userData => {
        try {
            await localStorage.setItem('token', userData.token);
            dispatch({
                type:'LOGIN',
                payload:userData
            });
        } catch (err) {
            console.log(err);
        }
    };


    // Logout
    const logout = async () => {
        try {
            await localStorage.removeItem('token');
            dispatch({
                type:'LOGOUT'
            });
        } catch (err) {
            console.log(err);
        }
    };


    return(
        <AuthContext.Provider
            value={{user:state.user, login, logout}}
            {...props}
        />
    );
};





// Export
export {AuthContext, AuthProvider};