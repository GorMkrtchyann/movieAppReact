import {createContext, useState} from "react";

export const AllContext = createContext();

export const AllContextFunc = ({ children }) => {

    const [userInfo, setUserInfo] = useState({})
    const [modalShow, setModalShow] = useState(false)

    const checkLogin = (isTrue) => {
        return userInfo.id ? isTrue() : setModalShow(true)
    }

    return(
        <AllContext.Provider value={{userInfo, setUserInfo, modalShow, setModalShow, checkLogin}}>
            {children}
        </AllContext.Provider>
    )
}