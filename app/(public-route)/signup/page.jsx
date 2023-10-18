import Button from '../../components/Button'
import GoogleSignInButton from '../../components/GoogleSignInButton'
import TextField from '../../components/TextField'

import { getServerSession } from 'next-auth'
import { authOptions } from '../../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'


const SignUpPage = async () => {

    const session = await getServerSession(authOptions)

    if (session?.user) {
        redirect('/');
    }

    return (
        <section className='flex min-h-full overflow-hidden pt-16 sm:py-28'>
            <div className='mx-auto flex w-full max-w-2xl flex-col px-4 sm:px-6'>
                <div className='relative mt-12 sm:mt-16'>
                    <h1 className='text-center text-2xl font-medium tracking-tight text-gray-900'>
                        Sign in to your account
                    </h1>
                </div>
                <div className='sm:rounded-5xl -mx-4 mt-10 flex-auto bg-white px-4 py-10 shadow-2xl shadow-gray-900/10 sm:mx-0 sm:flex-none sm:p-24'>
                    <form>
                        <div className='space-y-2'>
                            <TextField
                                id='firstName'
                                name='firstName'
                                type='firstName'
                                label='firstName'
                                required
                            />
                            <TextField
                                id='lastName'
                                name='lastName'
                                type='lastName'
                                label='lastName'
                                required
                            />
                            <TextField
                                id='email'
                                name='email'
                                type='email'
                                label='Email'
                                placeholder='hello@me.com'
                                required
                            />
                            <TextField
                                id='password'
                                name='password'
                                type='password'
                                label='Password'
                                placeholder='hello@me.com'
                                required
                            />

                        </div>
                        <Button
                            type='submit'
                            variant='outline'
                            color='gray'
                            className='mt-3 w-full'
                        >
                            Register
                        </Button>
                    </form>
                    <div className='mx-auto my-10 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
                        or
                    </div>
                    <GoogleSignInButton />
                </div>
            </div>
        </section>
    )
}

export default SignUpPage
