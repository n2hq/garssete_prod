// WhereTo.jsx
import React from 'react'
import { appConfig, config } from '~/lib/lib'
import { SearchBar } from './SearchBar'
import CategoryLinks from './CategoryLinks'

const SearchBusiness = () => {
    return (
        <div className={`px-[15px]`}>
            <div className={`max-w-[1100px] mx-auto w-full relative md:mt-0`}>


                <div className={` mt-12 md:mt-24 `}>
                    <div className={`text-lg text-center`}>
                        Business Directory<i>!</i>
                    </div>
                    <div className={`font-poppins text-4xl text-center font-black md:text-5xl tracking-tighter`}>
                        Search Businesses?
                    </div>
                </div>

                <div className={`max-w-[800px] mx-auto w-full mt-10 md:mt-16`}>
                    {/* Updated container for horizontal scrolling on smaller screens */}
                    <div className="w-full overflow-x-auto scroll-container pb-0 scrollbar-hidden">
                        <div className="min-w-max px-4">
                            <CategoryLinks />
                        </div>
                    </div>
                    <div className={`mt-2 md:mt-8`}>
                        <SearchBar />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchBusiness