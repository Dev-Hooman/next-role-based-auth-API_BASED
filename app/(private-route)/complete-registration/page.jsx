import React from 'react'
import CompleteProfileForm from '../../components/CompleteProfileForm'
import Logout from '@/app/components/Logout'

import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'


const CompleteRegistration = async () => {
    const session = await getServerSession(authOptions)

    if (session?.user?.role.includes('user') || session?.user?.role.includes('admin')) {
        redirect('/');
    }

    return (
        <section className='py-24'>
            <div className='container'>
                <div className='flex justify-between'>
                    <h1 className='text-2xl font-bold'>Welcome Please Complete Registration!!</h1>
                    <Logout />
                </div>
                <CompleteProfileForm />
            </div>
        </section>
    )
}

export default CompleteRegistration
