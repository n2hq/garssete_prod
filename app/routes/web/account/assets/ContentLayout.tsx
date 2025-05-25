import React from 'react'

const ContentLayout = ({ children, title }: any) => {
    return (
        <div>
            <div className={`font-semibold text-lg`}>
                {title}
            </div>
            <div className={`mt-4 bg-white px-[15px] py-4 rounded-lg shadow-md `}>
                {children}
            </div>
        </div>
    )
}

export default ContentLayout
