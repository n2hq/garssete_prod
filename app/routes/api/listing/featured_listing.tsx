import { ActionFunctionArgs, LoaderFunction } from "@remix-run/node"
import { query } from "../DB"
import { DoResponse } from "~/lib/lib"

export const loader: LoaderFunction = async ({ request, params }) => {


    try {
        const id = params.guid_or_username
        const isFeatured = true

        const rows: any = await query(`SELECT
                d.id,
                d.email_address,
                d.gid,
                d.title,
                d.username,
                d.short_description,
                d.phone,
                d.category,
                d.established,
                d.address_one,
                d.address_two,
                d.website,
                d.date_created,
                (SELECT name FROM tbl_country co WHERE co.iso2 = d.country_code LIMIT 1) AS country_name,
                (SELECT name FROM tbl_state st WHERE st.iso2 = d.state_code AND st.country_code = d.country_code LIMIT 1) AS state_name,
                (SELECT name FROM tbl_city ci WHERE ci.id = d.city_id LIMIT 1) AS city_name,
                 (SELECT GROUP_CONCAT(CONCAT(sm.media_id, '$', sm.user_description, '$', sysm.base_url) SEPARATOR ', ')
 FROM tbl_selected_social_media sm, tbl_sys_social_media sysm 
 WHERE d.gid = sm.business_guid AND sm.media_id = sysm.media_id) AS social_media,
                b.image_url,
                r.average_rating,
                r.total_reviews

                FROM tbl_dir d

                LEFT JOIN tbl_business_profile_image b ON d.gid = b.business_guid

                LEFT JOIN (
                    SELECT 
                        business_guid,
                        ROUND(AVG(rating), 1) AS average_rating,
                        COUNT(*) AS total_reviews
                    FROM tbl_rating
                    GROUP BY business_guid
                ) r ON d.gid = r.business_guid

                WHERE d.active_status = true
                AND
                d.featured = true
                ORDER BY RAND()
                ASC
            `, [isFeatured])

        if ((rows as any[]).length <= 0) { return DoResponse({}, 200) }

        const listings: any[] = rows.map((listing: any) => { return (listing) })

        return DoResponse(listings, 200)

    } catch (error: any) {
        return DoResponse({ "error": error.message }, 500)
    }

}

