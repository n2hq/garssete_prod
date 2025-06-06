import React, { useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi';

const SearchBox = ({ query }: any) => {
    const [queryParam, setQueryParam] = useState('')
    const changeHandler = (e: any) => {
        setQueryParam(e.target.value); // updates the input value
    };

    useEffect(() => {

        if (query !== null && query !== undefined) {
            setQueryParam(query)
        }

    }, [query])

    return (
        <>
            <form action="/web/search" method='get'>
                <div className={`mx-[15px]`}>
                    <div className={`max-w-[800px] mx-auto w-full
                        bg-white rounded-md flex overflow-hidden
                        p-[5px] gap-x-1`}>
                        <input
                            name='q'
                            value={queryParam}
                            onChange={(e) => changeHandler(e)}
                            type="text"
                            className={`w-full p-3 outline-none
                                 rounded`}
                            placeholder='Enter an address, city, state or country'
                        />
                        <button
                            type='submit'
                            className={`text-white bg-blue-500 rounded-md
                                border-none font-bold overflow-hidden min-w-[50px] w-[50px]
                                h-[50px] flex justify-center items-center`}
                        >
                            <BiSearch />
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default SearchBox
