import { ActionFunctionArgs, LoaderFunction } from "@remix-run/node"
import { query } from "../DB"
import { DoResponse } from "~/lib/lib"
import { ListingType } from "~/lib/types"



export const loader: LoaderFunction = async ({ request, params }) => {

    try {


        const rows: any = await query(`SELECT 
            d.*, 
            avg_ratings.avg_rating,
            b.image_url
            FROM tbl_dir d
            LEFT JOIN (
                SELECT business_guid, AVG(rating) AS avg_rating
                FROM tbl_rating
                GROUP BY business_guid
            ) AS avg_ratings ON d.gid = avg_ratings.business_guid
            LEFT JOIN tbl_business_profile_image b ON b.business_guid = d.gid
            WHERE d.active_status = true
            ORDER BY 
            date_created
            LIMIT 0, 8
            `, [])

        if ((rows as any[]).length <= 0) { return DoResponse({}, 200) }

        const listings: any[] = rows.map((listing: any) => { return (listing) })

        return DoResponse(listings, 200)

    } catch (error: any) {
        return DoResponse({ "error": error.message }, 500)
    }

}

export const action = async ({ request, params }: ActionFunctionArgs) => {

    return DoResponse({
        success: false,
        message: "method not allowed"
    }, 405)
}