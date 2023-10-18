'use client'

import { useSession } from 'next-auth/react'
import { ToastContainer, toast } from 'react-toastify'
import {redirect } from 'next/navigation'
import { useState } from 'react'

const CompleteProfileForm = () => {
    const { data: session, update } = useSession()

    async function handleSubmit(formData) {
        const { role, username, firstName, lastName } = Object.fromEntries(formData.entries())
        const email = session?.user?.email
        const response = await fetch(`/api/auth/update?email=${email}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ role, firstName, lastName }),
        });
        const data = await response.json();
        let isUpdateSession = null;
        if (response.status === 200) {
            isUpdateSession = await update({ firstName, lastName, username, role })
            if (isUpdateSession) {
                toast(data.message, {
                    theme: 'dark',
                    type: 'success',
                    autoClose: 2000
                })

                redirect('/')
            }
        }
    }

    return (
        <div className='mt-12 w-2/3 rounded p-8 shadow-lg lg:w-1/2'>
            <h2 className='mb-6 text-lg font-medium'>Update your info</h2>

            <form action={handleSubmit} className='flex  flex-col justify-between gap-3'>
                <input
                    type='text'
                    name='firstName'
                    className='flex-1 border px-2 py-1'
                    placeholder='firstName'
                    defaultValue={session?.user?.firstName}

                />
                <input
                    type='text'
                    name='lastName'
                    className='flex-1 border px-2 py-1'
                    placeholder='lastName'
                    defaultValue={session?.user?.lastName}


                />
                <input
                    type='text'
                    name='username'
                    className='flex-1 border px-2 py-1'
                    defaultValue={session?.user?.name}
                />
                <input
                    type='text'
                    name='role'
                    className='flex-1 border px-2 py-1'
                    defaultValue={session?.user?.role === 'none' ? null : session?.user?.role}
                    placeholder='Enter your role here: admin || user'
                />
                <button className='rounded bg-slate-700 px-3 py-1 text-white'>
                    Update
                </button>
            </form>

            <ToastContainer />
        </div>
    )
}

export default CompleteProfileForm
