import React from 'react'
import SearchBox from './SearchBox'

const SearchHead = () => {
    return (
        <div className={` w-full  bg-yellow-400/90
                flex flex-col`}>
            <div className={`mt-[80px] mb-[22px]`}>
                <SearchBox />
            </div>
        </div>
    )
}

export default SearchHead
