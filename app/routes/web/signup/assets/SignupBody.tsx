import React from 'react'
import SignupForm from './SignupForm'


const SignupBody = () => {
    return (
        <div className={`bg-white w-full 
        md:bg-[url('https://jnews.io/bloomnews/wp-content/uploads/sites/75/2020/05/26.jpg')]
        bg-cover bg-center min-h-screen flex place-content-center`}>
            <SignupForm />
        </div>
    )
}

export default SignupBody
