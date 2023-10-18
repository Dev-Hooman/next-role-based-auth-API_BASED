'use client'
import React from 'react'
import { signOut } from 'next-auth/react'

const Logout = () => {

  const handleSignOut = () => {
    signOut();
    router.push('/');
  }
  return (
    <button onClick={() => handleSignOut()} className='rounded bg-slate-700 px-3 py-1 text-white'>
      SignOut
    </button>
  )
}

export default Logout