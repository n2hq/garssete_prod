import React from 'react'
import SignupForm from './SignupForm'
import SignupFormAlt from './SignupFormAlt'
import AuthHeader from '~/components/content/AuthHeader'



const SignupBody = () => {
    return (
        <div className={`bg-white w-full 
        bg-[url('/images/mobiletab.jpg')]
        bg-cover bg-center min-h-screen flex place-content-center`}>
            <AuthHeader />
            <SignupFormAlt />
        </div>
    )
}

export default SignupBody
