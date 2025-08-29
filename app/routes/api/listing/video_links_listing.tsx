import { LoaderFunction } from "@remix-run/node"
import { DoResponse } from "~/lib/lib"
import { AddVideoType } from "~/lib/types"
import { query } from "../DB"

export const loader: LoaderFunction = async ({ request, params }) => {
    const businessGuid = params.business_guid



    try {
        const rawdata: AddVideoType[] = await query(`SELECT * FROM tbl_business_gallery_video 
            WHERE 
            business_guid = ? 
            ORDER BY date_created DESC`, [businessGuid])

        if ((rawdata as AddVideoType[]).length <= 0) { return DoResponse({}, 200) }

        return DoResponse(rawdata, 200)

    } catch (error: any) {
        console.log(error.message)
        return DoResponse({ "error": error.message }, 500)
    }

}