'use client'
import {createContext, useState} from 'react'

export const UserContext = createContext()

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const values = (data) =>{
        setUser(data)
    }

    return(
        <UserContext.Provider value={{user,values}}>
            {children}
        </UserContext.Provider>
    )
}