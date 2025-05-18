import { LoaderFunction } from "@remix-run/node"
import { query } from "../DB"
import { DoResponse } from "~/lib/lib"

export const loader: LoaderFunction = async ({ request, params }) => {

    try {
        const businessGuid = params.business_guid

        const rows: any = await query(`SELECT 
            AVG(a.rating) as rating_average,
            SUM(a.rating) as rating_sum, 
            COUNT(a.rating) AS rating_count 
            FROM 
            tbl_rating a 
            WHERE 
            a.business_guid = ?`,
            [businessGuid])

        return DoResponse(rows[0], 200)

    } catch (error: any) {
        return DoResponse({ "error": error.message }, 500)
    }
}