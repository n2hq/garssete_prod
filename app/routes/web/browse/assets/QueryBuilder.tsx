import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from '@remix-run/react'
import { categories as cats } from '~/lib/json/categories'
import { getCities, getCountries, getStates, getStatesAlt } from '~/lib/lib'
import { City, Country, StateAlt } from '~/lib/types'

interface QueryBuilderProps {
    loading?: boolean
    initialFilters?: {
        q: string
        category: string
        country: string
        state: string
        city: string
    }
}

export interface SearchFilters {
    q: string
    category: string
    country: string
    state: string
    city: string
}

export interface CategoryFilters {
    icon: any
    name: string
    id: string
}

const QueryBuilder: React.FC<QueryBuilderProps> = ({
    loading = false,
    initialFilters = {
        q: '',
        category: '',
        country: '',
        state: '',
        city: ''
    }
}) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [filters, setFilters] = useState<SearchFilters>(initialFilters)

    const [categories, setCategories] = useState<CategoryFilters[]>([])
    const [countries, setCountries] = useState<Country[] | []>([])
    const [states, setStates] = useState<StateAlt[] | []>([])
    const [cities, setCities] = useState<City[] | []>([])

    // Sync with URL search params
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        setFilters({
            q: searchParams.get('q') || '',
            category: searchParams.get('category') || '',
            country: searchParams.get('country') || '',
            state: searchParams.get('state') || '',
            city: searchParams.get('city') || ''
        })
    }, [location.search])

    // Fetch initial data
    useEffect(() => {
        fetchCategories()
        fetchCountries()
    }, [])

    // Fetch states when country changes
    useEffect(() => {
        if (filters.country) {
            fetchStates(filters.country)
        } else {
            setStates([])
        }
    }, [filters.country])

    // Fetch cities when state changes
    useEffect(() => {
        if (filters.country && filters.state) {
            fetchCities(filters.country, filters.state)
        } else {
            setCities([])
        }
    }, [filters.country, filters.state])

    const fetchCategories = async () => {
        const sortedCategories = cats.sort((a, b) =>
            a.name.localeCompare(b.name)
        );
        setCategories(sortedCategories)

        /* try {
            const response = await fetch('/api/categories')
            const data = await response.json()
            setCategories(data.categories || [])
        } catch (error) {
             console.error('Failed to fetch categories:', error)
        }
        */
    }

    const fetchCountries = async () => {

        try {
            const countries = await getCountries()
            //console.log(countries)
            setCountries(countries || [])
        } catch (error) {
            console.error('Failed to fetch countries:', error)
        }
        /*  try {
             const response = await fetch('/api/countries')
             const data = await response.json()
             setCountries(data.countries || [])
         } catch (error) {
             console.error('Failed to fetch countries:', error)
         } */
    }

    const fetchStates = async (countryCode: string) => {

        try {
            const states = await getStatesAlt(countryCode)

            setStates(states || [])
        } catch (error) {
            console.error('Failed to fetch countries:', error)
        }
        /*  try {
             const response = await fetch(`/api/states?country=${countryCode}`)
             const data = await response.json()
             setStates(data.states || [])
         } catch (error) {
             console.error('Failed to fetch states:', error)
         } */
    }

    const fetchCities = async (countryCode: string, stateCode: string) => {

        try {
            const cities = await getCities(countryCode, stateCode)

            setCities(cities || [])
        } catch (error) {
            console.error('Failed to fetch countries:', error)
        }
        /*  try {
             const response = await fetch(`/api/cities?country=${countryCode}&state=${stateCode}`)
             const data = await response.json()
             setCities(data.cities || [])
         } catch (error) {
             console.error('Failed to fetch cities:', error)
         } */
    }

    const handleInputChange = (field: keyof SearchFilters, value: string) => {
        setFilters(prev => ({ ...prev, [field]: value }))
    }

    const handleCountryChange = (countryCode: string) => {
        handleInputChange('country', countryCode)
        fetchStates(countryCode)
    }

    const handleStateChange = (stateCode: string) => {
        handleInputChange('state', stateCode)
        fetchCities(filters.country, stateCode)
    }

    const handleSearch = () => {
        const searchParams = new URLSearchParams()

        if (filters.q) searchParams.set('q', filters.q)
        if (filters.category) searchParams.set('category', filters.category)
        if (filters.country) searchParams.set('country', filters.country)
        if (filters.state) searchParams.set('state', filters.state)
        if (filters.city) searchParams.set('city', filters.city)

        // Reset to page 1 when performing a new search
        searchParams.set('page', '1')

        navigate(`${location.pathname}?${searchParams.toString()}`)
    }

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSearch()
        }
    }

    const clearFilters = () => {
        navigate(location.pathname)
    }

    return (
        <div className="w-full space-y-3 p-4 bg-gray-50 rounded-lg border">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="w-full">
                    <input
                        id="query"
                        type="text"
                        value={filters.q}
                        onChange={(e) => handleInputChange('q', e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Hotel, Restaurant or ABC Inc."
                        className="w-full px-3 border border-gray-300 rounded outline-none h-[35px] focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        disabled={loading}
                    />
                </div>

                <div className="w-full">
                    <select
                        id="category"
                        value={filters.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className="w-full h-[35px] border border-gray-300 rounded px-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        disabled={loading}
                    >
                        <option value="">All Categories</option>
                        {categories.map((category: CategoryFilters, index: number) => (
                            <option key={category?.id} value={category?.id}>
                                {category?.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="w-full">

                    <select
                        id="country"
                        value={filters.country}
                        onChange={(e) => handleCountryChange(e.target.value)}
                        className="w-full h-[35px] border border-gray-300 rounded px-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        disabled={loading}
                    >
                        <option value="">All Countries</option>
                        {countries.map((country: Country) => (
                            <option key={country.id} value={country.id}>
                                {country.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="w-full">
                    <select
                        id="state"
                        value={filters.state}
                        onChange={(e) => handleStateChange(e.target.value)}
                        className="w-full h-[35px] border border-gray-300 rounded px-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        disabled={loading || !filters.country}
                    >
                        <option value="">All States</option>
                        {states.map((state) => (
                            <option key={state.id} value={state.id}>
                                {state.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="w-full">
                    <select
                        id="city"
                        value={filters.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="w-full h-[35px] border border-gray-300 rounded px-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        disabled={loading || !filters.state}
                    >
                        <option value="">All Cities</option>
                        {cities?.map((city: City) => (
                            <option key={city.id} value={city.name}>
                                {city.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="w-full flex gap-2">
                    <button
                        onClick={handleSearch}
                        disabled={loading}
                        className="flex-1 bg-blue-600 text-white h-[35px] px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Searching...' : 'Search'}
                    </button>

                    <button
                        onClick={clearFilters}
                        disabled={loading}
                        className="px-4 h-[35px] border border-gray-300 rounded text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Clear
                    </button>
                </div>
            </div>

            {/* Loading indicator */}
            {loading && (
                <div className="text-center text-blue-600 text-sm">
                    Loading results...
                </div>
            )}
        </div>
    )
}

export default QueryBuilder