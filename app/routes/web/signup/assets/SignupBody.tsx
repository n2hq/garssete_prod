import React from 'react'
import SignupForm from './SignupForm'


const SignupBody = () => {
    return (
        <div className={`bg-white w-full 
        md:bg-[url('https://demo.tagdiv.com/newspaper_downtown_pro/wp-content/uploads/2022/03/19.jpg')]
        bg-cover bg-center min-h-screen flex place-content-center`}>
            <SignupForm />
        </div>
    )
}

export default SignupBody
