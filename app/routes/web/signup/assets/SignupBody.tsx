import React from 'react'
import SignupForm from './SignupForm'


const SignupBody = () => {
    return (
        <div className={`bg-white w-full 
        md:bg-[url('https://images.pexels.com/photos/823696/pexels-photo-823696.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')]
        bg-cover bg-center min-h-screen flex place-content-center`}>
            <SignupForm />
        </div>
    )
}

export default SignupBody
