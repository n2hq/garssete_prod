import React from 'react'

const ContentLayout = ({ children, title }: any) => {
    return (
        <div>
            <div className={`font-bold text-lg`}>
                {title}
            </div>
            <div className={`mt-4 bg-white px-4 py-4 rounded-lg`}>
                {children}
            </div>
        </div>
    )
}

export default ContentLayout
