import React from 'react'
import SignupForm from './SignupForm'
import mobileTab from "/images/mobiletab.jpg";


const SignupBody = () => {
    return (
        <div className={`bg-white w-full 
        md:bg-[url('${mobileTab}')]
        bg-cover bg-center min-h-screen flex place-content-center`}>
            <SignupForm />
        </div>
    )
}

export default SignupBody
