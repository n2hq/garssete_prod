import React from 'react'
import SigninForm from './ResetPasswordForm'
import ResetPasswordForm from './ResetPasswordForm'
import ResetPasswordFormAlt from './ResetPasswordFormAlt'

const ResetPasswordBody = ({ userGuid }: any) => {

    return (
        <div className={`bg-white w-full 
        md:bg-[url('https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=1200')]
        bg-cover bg-center min-h-screen flex place-content-center`}>
            <ResetPasswordFormAlt guid={userGuid} />
        </div>
    )
}

export default ResetPasswordBody
