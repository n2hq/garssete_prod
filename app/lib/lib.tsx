import { Category, City, Country, Rating, State, UserProfile } from "./types"
import CryptoJS from 'crypto-js'

export const config = {
    BASE_URL: import.meta.env.VITE_SITE_BASE_URL,
    IMG_BASE_URL: import.meta.env.VITE_IMG_BASE_URL
}

export const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
    "cache": "no-store"
}

export function DoResponse(json: any, code: number = 500) {
    return new Response(
        JSON.stringify(json),
        {
            status: code,
            headers: headers
        }
    )
}

export const HashPwd = (input: string): any => {
    return CryptoJS.SHA256(input).toString();
}

export const GenerateRandomHash = () => {
    const randomBytes = CryptoJS.lib.WordArray.random(16);
    const hash = CryptoJS.SHA256(randomBytes).toString();
    return hash
};

export const getSearch: any = async (criteria: string) => {

    const endpoint = "/api/listing/search?q=" + criteria
    const url = config.BASE_URL + endpoint



    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        })

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();
        return data
    } catch (error: any) {
        return ({ "message": error.message })
    }
}

export const getFeaturedListing: any = async () => {

    const endpoint = `/api/listing/featured_listing`
    const url = config.BASE_URL + endpoint

    console.log(url)


    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        })

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();
        return data
    } catch (error: any) {
        return ({ "message": error.message })
    }
}

export const getListingByCategory = async (category: string, limit: number) => {

    const endpoint = `/api/listing/listing_by_category/${category}/${limit}`
    const url = config.BASE_URL + endpoint

    console.log(url)

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();
        return data
    } catch (error: any) {
        return ({ "message": error.message })
    }
}

export const getRating = async (userGuid: string | null, businessGuid: string | null) => {

    const endpoint = `/api/rating/${userGuid}/${businessGuid}`
    const url = config.BASE_URL + endpoint


    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();
        return data

    } catch (error: any) {
        return ({ "message": error.message })
    }
}

export const getBusinessProfileImageData = async (guid: string | null): Promise<any | undefined> => {

    const endpoint = "/api/listing/business_profile_image/" + guid
    const url = config.BASE_URL + endpoint

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();

        return new Promise((resolve) => setTimeout(() => {
            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}

export const getBusinessGallery = async (businessGuid: string | null) => {
    const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
    const endpoint = `/api/listing/business_gallery/${businessGuid}`
    const url = BASE_URL + endpoint


    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();
        return data

    } catch (error: any) {
        return ({ "message": error.message })
    }
}

export const getRatingsReviews = async (businessGuid: string | null) => {
    const endpoint = `/api/rating/ratings_reviews/${businessGuid}`
    const url = config.BASE_URL + endpoint


    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();
        return data

    } catch (error: any) {
        return ({ "message": error.message })
    }
}

export const getPage: any = async (criteria: string) => {

    const endpoint = "/api/listing/" + criteria
    const url = config.BASE_URL + endpoint

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        })

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();
        return data
    } catch (error: any) {
        return ({ "message": error.message })
    }
}

export const getBusinessRatings = async (businessGuid: string | null): Promise<any | undefined> => {
    const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
    const endpoint = `/api/rating/business_ratings/${businessGuid}`
    const url = BASE_URL + endpoint


    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();

        return new Promise((resolve) => setTimeout(() => {

            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}

export const getLocalDate = (date: string) => {
    const localDate = new Date(date)
    const formatted = localDate.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    })
    return formatted
}

export const getBusinessFeatures = async (businessGuid: string | null): Promise<any | undefined> => {
    const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
    const endpoint = `/api/listing/business_facility_features/${businessGuid}`
    const url = BASE_URL + endpoint


    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();

        return new Promise((resolve) => setTimeout(() => {

            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}

export const generate7DigitNumber = (): number => {
    return Math.floor(1000000 + Math.random() * 9000000); // Range: 1000000 - 9999999
};

export const getCountries = async (): Promise<Country[] | undefined> => {
    const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
    const endpoint = "/api/util/country"
    const url = BASE_URL + endpoint

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: Country[] = await response.json();
        const finaldata: any = data.map((country) => {
            return {
                name: country.name,
                id: country.id
            }
        })

        console.log(finaldata)

        return new Promise((resolve) => setTimeout(() => {
            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}

export const getStates = async (countryCode: string | null): Promise<State[] | undefined> => {
    const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
    const endpoint = "/api/util/state?country_code=" + countryCode
    const url = BASE_URL + endpoint

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: State[] = await response.json();

        return new Promise((resolve) => setTimeout(() => {
            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}

export const getCities = async (countryCode: string | null, stateCode: string | null): Promise<City[] | undefined> => {
    const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
    const endpoint = "/api/util/city?country_code=" + countryCode + "&state_code=" + stateCode
    const url = BASE_URL + endpoint

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: City[] = await response.json();

        return new Promise((resolve) => setTimeout(() => {
            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}

export const getCategories = async (): Promise<Category[] | undefined> => {
    const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
    const endpoint = "/api/util/category"
    const url = BASE_URL + endpoint

    console.log(url)
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: Category[] = await response.json();

        return new Promise((resolve) => setTimeout(() => {
            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}

export const getUserProfile = async (guid: string | null): Promise<UserProfile[] | undefined> => {
    const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
    const endpoint = "/api/user/" + guid
    const url = BASE_URL + endpoint

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: UserProfile[] = await response.json();

        return new Promise((resolve) => setTimeout(() => {
            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}