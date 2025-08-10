import React, { useEffect, useState } from 'react'
import ContentLayout from '../assets/ContentLayout'
import AccountLayout from '../assets/AccountLayout'
import { useAuth } from '~/context/AuthContext'
import CreatePageForm from './assets/CreatePageForm'
import { getCategories, getCities, getCountries, getStates, IsAuthenticated } from '~/lib/lib'
import CardTitle from '../assets/CardTitle'

const index = () => {
    useEffect(() => {
        IsAuthenticated(localStorage)
    }, [])

    const auth = useAuth()
    if (!auth) { return null }
    const [user, setUser] = useState<any | null>(null)
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<any | null>(null)
    const [countries, setCountries] = useState<any | null>(null)
    const [states, setStates] = useState<any | null>(null)
    const [cities, setCities] = useState<any | null>(null)
    const [categories, setCategories] = useState<any | null>(null)

    useEffect(() => {
        const getAllData = async (user: any) => {
            const countries = await getCountries()
            const states = await getStates("")
            const cities = await getCities("", "")
            const categories = await getCategories()

            setCountries(countries)
            setStates(states)
            setCities(cities)
            setCategories(categories)
            setUser(user)
        }

        if (auth?.user) {
            getAllData(auth?.user)
        }
    }, [auth])

    useEffect(() => {
        if (user && countries && categories) {

            const data = {
                user,
                countries,
                states,
                cities,
                categories
            }
            setData(data)
            setLoading(false)
        }
    }, [countries, user])



    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-lg">Loading...</div>
            </div>
        )
    }


    return (
        <AccountLayout>
            <ContentLayout title={'Create Business'}>
                {
                    data && <div>
                        <CardTitle
                            baseUrl='/web/account/profile'
                            guid={''}>
                            Go to Profile
                        </CardTitle>
                        <CreatePageForm data={data} user={user} />
                    </div>
                }
            </ContentLayout>
        </AccountLayout>
    )
}

export default index
