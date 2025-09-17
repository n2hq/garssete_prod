import React from 'react'
import ChangeEmailForm from './ChangeEmailForm'

const ChangeEmailBody = ({ userGuid, email, response }: any) => {

    return (
        <div className={`w-full bg-gray-500
        bg-[url('/images/liberty.jpg')]
        bg-cover bg-center min-h-screen flex place-content-center`}>
            <ChangeEmailForm
                guid={userGuid}
                email={email}
                response={response}
            />

        </div>
    )
}

export default ChangeEmailBody
