import React, { useEffect, useState } from 'react'

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
            <form action="/search" method='get'>
                <div className={`mx-[15px]`}>
                    <div className={`max-w-[800px] mx-auto w-full
                        bg-blue-100 rounded flex gap-x-0 overflow-hidden`}>
                        <input
                            name='q'
                            value={queryParam}
                            onChange={(e) => changeHandler(e)}
                            type="text"
                            className={`grow bg-white p-3 outline-none`}
                            placeholder='Enter an address, city, state or country'
                        />
                        <button
                            type='submit'
                            className={`text-black px-4 bg-gray-200 rounded-r
                                border-none font-bold`}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default SearchBox
