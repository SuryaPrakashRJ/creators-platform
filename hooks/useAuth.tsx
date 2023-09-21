'use client'
import {useContext} from 'react'
import {UserContext} from '@/context/userContext'

export const useAuth = () => {
    return useContext(UserContext)
}