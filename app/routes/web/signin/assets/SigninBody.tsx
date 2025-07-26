import React from 'react'
import SigninForm from './SigninForm'

const SigninBody = () => {
    return (
        <div className={`bg-white w-full 
        md:bg-[url('/images/dubai7star.jpeg')]
        bg-cover bg-center min-h-screen flex place-content-center`}>
            <SigninForm />
        </div>
    )
}

export default SigninBody
