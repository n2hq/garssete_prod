import React from 'react'
import SigninForm from './ResetPasswordForm'
import ResetPasswordForm from './ResetPasswordForm'

const ResetPasswordBody = () => {
    return (
        <div className={`bg-white w-full 
        md:bg-[url('https://www.theglasswarehouse.co.uk/wp-content/uploads/2025/07/Modern-open-plan-office-showing-both-glass-partition-walls-and-traditional-drywall-meeting-rooms.jpg')]
        bg-cover bg-center min-h-screen flex place-content-center `}>

            <ResetPasswordForm />
        </div>
    )
}

export default ResetPasswordBody
