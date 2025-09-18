import React, { useState } from 'react'
import { Country, CountryProp } from '~/lib/types'

const Countries = ({ countries }: CountryProp) => {

    const [searchTerm, setSearchTerm] = useState("")

    // filter countries based on search term
    const filteredCountries = countries
        ?.filter((country: Country) =>
            country.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        ?.sort((a, b) => a.name.localeCompare(b.name))

    return (
        <div className="space-y-3">
            {/* Search Box */}
            <div className="px-3">
                <input
                    type="text"
                    placeholder="Search country..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Scrollable List */}
            <div className="h-[150px] overflow-y-auto scrollbar-hidden">
                {filteredCountries?.map((nav: Country, index: number) => (
                    <div key={index}>
                        <a href={`/web/browse?q=&country=${nav?.id}`}>
                            <div
                                className="flex place-content-start place-items-center gap-2 w-full hover:bg-blue-100 pl-5 py-1.5 hover:cursor-pointer"
                            >
                                <div className="w-[30px] h-[30px] flex place-content-center place-items-center bg-blue-100 rounded-full">
                                    {nav?.id}
                                </div>
                                <div className="text-lg">
                                    {nav?.name}
                                </div>
                            </div>
                        </a>
                    </div>
                ))}
                {filteredCountries?.length === 0 && (
                    <div className="px-5 text-gray-500">No results found</div>
                )}
            </div>
        </div>
    )
}

export default Countries
