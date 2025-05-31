import { ActionFunctionArgs, LoaderFunction } from "@remix-run/node"
import { query } from "../DB"
import { ListingType } from "~/lib/types"
import { DoResponse, GenerateRandomHash } from "~/lib/lib"

export const loader: LoaderFunction = async ({ request, params }) => {
    const contentType = request.headers.get("Content-Type")

    /* if (contentType !== "application/json") {
        return new Response(JSON.stringify({ error: "Invalid content type. Expected JSON." }))
    } */

    const buid = params.business_guid
    const user_guid = params.user_guid
    console.log(user_guid + "|||")

    try {
        const rawdata: any = await query(`SELECT * FROM tbl_business_gallery_image 
            WHERE 
            business_guid = ? 
            AND 
            user_guid = ?
            ORDER BY date_created DESC`, [buid, user_guid])



        return DoResponse(rawdata, 200)

    } catch (error: any) {
        console.log(error.message)
        return DoResponse({ "error": error.message }, 500)
    }

}