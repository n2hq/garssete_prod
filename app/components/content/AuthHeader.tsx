import React from 'react'

const AuthHeader = () => {
    return (
        <div className={`absolute top-0 left-0 right-0 text-white bg-black/10 w-full p-4 flex place-content-center`}>
            <div className={``}>
                <a href="/" className={`underline text-white hover:text-white/50`}>Home</a>
            </div>
        </div>
    )
}

export default AuthHeader
