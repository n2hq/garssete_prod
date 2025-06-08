import { ActionFunctionArgs, LoaderFunction } from "@remix-run/node"

import { ListingType } from "~/lib/types"
import { DoResponse, GenerateRandomHash } from "~/lib/lib"
import { query } from "../DB"




export const loader: LoaderFunction = async ({ request, params }) => {
    const contentType = request.headers.get("Content-Type")

    /* if (contentType !== "application/json") {
        return new Response(JSON.stringify({ error: "Invalid content type. Expected JSON." }))
    } */

    const businessGuid = params.business_guid


    try {
        const rawdata: any = await query(`SELECT 
            a.feature_id, b.description, a.user_description, 
            a.business_guid, b.name 
            FROM 
            tbl_selected_socials a, tbl_sys_socials b 
            WHERE a.feature_id = b.feature_id 
            AND
            a.business_guid = ?`,
            [
                businessGuid
            ])

        return DoResponse(rawdata, 200)

    } catch (error: any) {
        return DoResponse({ "error": error.message }, 500)
    }

}