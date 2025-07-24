import { ActionFunctionArgs, LoaderFunction } from "@remix-run/node"
import { query } from "../DB"
import { DoResponse } from "~/lib/lib"

export const loader: LoaderFunction = async ({ request, params }) => {


    try {
        const id = params.guid_or_username
        const isFeatured = true

        const rows: any = await query(`SELECT 
            d.gid,
            d.title,
            d.short_description,
            d.phone,
            d.address_one,
            d.address_two,
            d.website,
            d.username
            FROM tbl_dir d
            WHERE 
            d.featured = true
            ORDER BY RAND()
            ASC
            LIMIT 3
            `, [isFeatured])

        if ((rows as any[]).length <= 0) { return DoResponse({}, 200) }

        const listings: any[] = rows.map((listing: any) => { return (listing) })

        return DoResponse(listings, 200)

    } catch (error: any) {
        return DoResponse({ "error": error.message }, 500)
    }

}

