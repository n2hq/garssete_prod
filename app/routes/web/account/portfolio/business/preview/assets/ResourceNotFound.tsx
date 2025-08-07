import React from 'react'

const ResourceNotFound = () => {
    return (
        <div className={`flex place-content-center place-items-center w-full min-h-[700px] text-[13px] flex-col space-y-4`}>

            <div className={`flex place-content-center place-items-center gap-3
                h-[40px]`}>
                <div className={`text-2xl font-bold text-red-600 h-full
                    flex place-items-center`}>
                    404
                </div>
                <div className={`h-full w-[2px] border-r`}></div>
                <div className={`text-black text-[14px]
                    h-full flex place-items-center space-x-2`}>
                    <span>
                        Resource not found.
                    </span>
                    <button
                        onClick={() => { window.history.back() }}
                        className={`underline`}>
                        Go back
                    </button>
                </div>
            </div>

        </div>
    )
}

export default ResourceNotFound
