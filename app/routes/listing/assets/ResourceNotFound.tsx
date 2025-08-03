import React from 'react'

const ResourceNotFound = () => {
    return (
        <div className={`flex place-content-center place-items-center w-full min-h-[700px] text-[13px] flex-col space-y-4`}>
            <div className={`font-bold text-2xl`}>
                Resource Not Found</div>
            <button
                onClick={() => { window.history.back(-1) }}
                className={`border-blue-500 border px-5 py-[3px]
                rounded hover:bg-blue-100`}>
                Go back</button>
        </div>
    )
}

export default ResourceNotFound
