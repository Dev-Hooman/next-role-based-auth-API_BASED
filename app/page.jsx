import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'


export default async function Home() {
  const session = await getServerSession(authOptions)

  if (session?.user?.role?.includes('none')) {
    redirect('/complete-registration');
  }

  return (
    <section className='py-24'>
      <div className='container'>
        <h1 className='text-2xl font-semibold tracking-tight'>Home page</h1>
        {session?.user? (<h3>Welcome, {session?.user.firstName} {session?.user.lastName}  </h3>) : <></> }
      </div>
    </section>
  )
}
