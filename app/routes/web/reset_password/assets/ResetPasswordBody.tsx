import React from 'react'
import SigninForm from './ResetPasswordForm'
import ResetPasswordForm from './ResetPasswordForm'
import ResetPasswordFormAlt from './ResetPasswordFormAlt'

const ResetPasswordBody = () => {
    return (
        <div className={`bg-white w-full 
        md:bg-[url('/images/drone.jpg')]
        bg-cover bg-center min-h-screen flex place-content-center `}>

            <ResetPasswordFormAlt />
        </div>
    )
}

export default ResetPasswordBody
