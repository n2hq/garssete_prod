import React from 'react'
import SigninForm from './SigninForm'

const SigninBody = () => {
    return (
        <div className={`bg-white w-full 
        md:bg-[url('https://images.pexels.com/photos/823696/pexels-photo-823696.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')]
        bg-cover bg-center min-h-screen flex place-content-center`}>
            <SigninForm />
        </div>
    )
}

export default SigninBody
