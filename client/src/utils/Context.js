import { createContext, useContext, useEffect, useState } from "react";


export const initUser = {
        firstName:"", 
        lastName:"", 
        username: "", 
        image:"", 
    }

export const initAuth = false;

const LoginContext = createContext()

const initialUserState = () => {
    const user = localStorage.getItem("user")
    // console.log("initial user context", user, typeof user, initUser)
    return user ? JSON.parse(user) : initUser
}

const initialAuthState = () => {
    const auth = localStorage.getItem("isAuthenticated")
    // console.log("context initial auth", typeof auth, auth, initAuth)
    return auth ? JSON.parse(auth) : initAuth
}


const LoginContextProvider = (props) => {
    const [user, setUser] = useState(initialUserState)
    const [isAuthenticated, setIsAuthenticated] = useState(initialAuthState)
    
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user))
        localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated))
    });

    const updateUser = (userInfo) => {
        setUser(userInfo)
    };
    
    const updateAuth = (authInfo) => {
        setIsAuthenticated(authInfo)
    };
    
    return (
        <LoginContext.Provider value={{updateUser, updateAuth, user, isAuthenticated}}>
            {props.children}
        </LoginContext.Provider>
    )
};

export const useUpdate = () => useContext(LoginContext)
export default LoginContextProvider;

