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
            co.name AS country_name,
            st.name AS state_name,
            ci.name AS city_name,
            b.image_url AS image_url 
            FROM tbl_dir d
            LEFT JOIN tbl_country co ON d.country_code = co.iso2
            LEFT JOIN tbl_state st ON d.state_code = st.iso2
            LEFT JOIN tbl_city ci ON d.city_id = ci.id
            LEFT JOIN tbl_business_profile_image b ON d.gid = b.business_guid
            WHERE 
            d.featured = true
            GROUP BY 
            d.gid
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

