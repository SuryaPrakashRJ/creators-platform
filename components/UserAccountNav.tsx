'use client'

import {signOut} from 'next-auth/react'

const UserAccountNav = () => {
    return (
     
            <div className='space-x-4'>
            <a href="/admin" className='hover:underline'>Admin</a>
            <button
                onClick={() => signOut(
                    {
                        redirect:true,
                    callbackUrl:`${window.location.origin}`
                    }
                )}
                className="text-md  text-blue-500  hover:underline"
            >
                Logout
            </button>
            </div>
     
    )
}

export default UserAccountNav