import React from 'react'
import SignupForm from './SignupForm'


const SignupBody = () => {
    return (
        <div className={`bg-white w-full 
        md:bg-[url('/images/mobiletab.jpg')]
        bg-cover bg-center min-h-screen flex place-content-center`}>
            <SignupForm />
        </div>
    )
}

export default SignupBody
