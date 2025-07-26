import React from 'react'
import SigninForm from './ResetPasswordForm'
import ResetPasswordForm from './ResetPasswordForm'

const ResetPasswordBody = () => {
    return (
        <div className={`bg-white w-full 
        md:bg-[url('/images/office2.jpg')]
        bg-cover bg-center min-h-screen flex place-content-center relative`}>

            <ResetPasswordForm />
        </div>
    )
}

export default ResetPasswordBody
