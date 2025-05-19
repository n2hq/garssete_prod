import React from 'react'
import SearchBox from './SearchBox'

const SearchHead = ({ query }: any) => {
    return (
        <div className={` w-full  bg-gray-800/90
                flex flex-col`}>
            <div className={`mt-[80px] mb-[22px]`}>
                <SearchBox query={query} />
            </div>
        </div>
    )
}

export default SearchHead
