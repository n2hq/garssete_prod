import { LoaderFunction } from "@remix-run/node"


import { DoResponse, escapeRegex } from "~/lib/lib"
import { query } from "../DB"

export const loader: LoaderFunction = async ({ request, params }) => {

    try {
        const url = new URL(request.url)
        let criteria = url.searchParams.get("q") as string



        if (criteria === "" || criteria === null || criteria === undefined) {
            criteria = ""
        } else {
            criteria = escapeRegex(criteria);
        }


        let rawdata: any = null

        rawdata = await query(`SELECT * FROM tbl_user WHERE email RLIKE ?`, [criteria])

        const listings = rawdata.map((listing: any) => {
            delete (listing.date_created)
            delete (listing.last_updated)
            return (listing)
        })

        //console.log(listings)

        return DoResponse(listings, 200)

    } catch (error: any) {
        console.log(error.message)
        return DoResponse({ "error": error.message }, 500)
    }

}