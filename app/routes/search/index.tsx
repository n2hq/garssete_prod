import React, { useEffect } from 'react'
import SearchBox from '~/components/content/SearchBox'
import ResponsiveNav from '~/components/header/lite/ResponsiveNav'
import ResultLayout from './assets/ResultLayout'
import SearchPagination from './assets/SearchPagination'
import { LoaderFunction } from '@remix-run/node'
import { getSearch } from '~/lib/lib'
import { useLoaderData } from '@remix-run/react'
import LatestBusinesses from './assets/LatestBusinesses'
import Footer from '~/components/footer/Footer'

export const loader: LoaderFunction = async ({ request, params }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get("q") || "";
    let data = await getSearch(query)

    //let realestate = await getListingByCategory('automotive', 4)


    let res = {
        data: data,
        query: query
    }
    return res;
}


const index = () => {
    const res: any = useLoaderData()
    const data = res.data

    useEffect(() => {
        if (data.length > 0) {
            console.log((data))
        }
    }, [data])
    //const [searchParams] = useSearchParams();

    //const query = data.query
    //const [queryParam, setQueryParam] = useState<string | null>(null)


    return (
        <div>
            <ResponsiveNav theme='light' />

            <div className={` w-full  bg-yellow-400/90
                flex flex-col`}>
                <div className={`mt-[80px] mb-[22px]`}>
                    <SearchBox />
                </div>
            </div>

            <ResultLayout>
                {
                    data.length > 0 ?
                        <SearchPagination
                            data={data}
                            itemsPerPage={20}
                        /> :
                        <div className={`flex place-items-center rounded
                            place-content-center p-5 border capitalize`}>
                            <span>no record</span>
                        </div>
                }

                <LatestBusinesses
                    category={'entertainment'}
                    limit={5}
                    title={"Entertainment"}
                    subtitle={"Entertainment based businesses added in the last 7 days"}
                />
                <LatestBusinesses
                    category={'services'}
                    limit={5}
                    title={"Services"}
                    subtitle={"Services based businesses added in the last 7 days"}
                />
            </ResultLayout>

            <Footer />
        </div>
    )
}

export default index
