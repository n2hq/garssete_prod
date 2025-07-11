import { LoaderFunction } from "@remix-run/node"


import { DoResponse } from "~/lib/lib"
import { query } from "../DB"

export const loader: LoaderFunction = async ({ request, params }) => {

    try {
        const url = new URL(request.url)
        let criteria = url.searchParams.get("q") as string

        if (criteria === "" || criteria === null || criteria === undefined) {
            criteria = ""
        }

        /* let rawdata: any = await query(`SELECT * FROM tbl_dir d
            LEFT JOIN tbl_business_profile_image b ON d.gid = b.business_guid
            WHERE 
            MATCH(d.title, d.short_description, d.category) AGAINST (? IN NATURAL LANGUAGE MODE)
            OR city_id IN (SELECT id FROM tbl_city WHERE name RLIKE ?)
            OR state_code IN (SELECT iso2 FROM tbl_state WHERE name RLIKE ?)
            OR country_code IN (SELECT iso2 FROM tbl_country WHERE name RLIKE ?);
            `, [criteria, criteria, criteria, criteria]) */

        let rawdata: any = await query(`SELECT
            d.*,
            co.name AS country_name,
            st.name AS state_name,
            ci.name AS city_name,
            b.image_url AS image_url,
            ROUND(AVG(r.rating), 1) AS average_rating,
            COUNT(DISTINCT r.id) AS total_reviews
            FROM tbl_dir d
            LEFT JOIN tbl_country co ON d.country_code = co.iso2
            LEFT JOIN tbl_state st ON d.state_code = st.iso2
            LEFT JOIN tbl_city ci ON d.city_id = ci.id
            LEFT JOIN tbl_business_profile_image b ON d.gid = b.business_guid
            LEFT JOIN tbl_rating r ON d.gid = r.business_guid
            WHERE 
            (d.title RLIKE ?
            OR d.short_description RLIKE ?
            OR d.category RLIKE ?)
            AND 
            d.active_status = true
            GROUP BY 
            d.gid
            ORDER BY
            d.date_created ASC
            LIMIT 0, 50`, [criteria, criteria, criteria])

        if (criteria === "" || criteria === null || criteria === undefined) {
            rawdata = await query(`SELECT
                d.id,
                d.gid,
                d.title,
                d.short_description,
                d.phone,
                d.category,
                d.established,
                d.address_one,
                d.address_two,
                d.website,
                d.date_created,
                (SELECT name FROM tbl_country co WHERE co.iso2 = d.country_code LIMIT 1) AS country_name,
                (SELECT name FROM tbl_state st WHERE st.iso2 = d.state_code LIMIT 1) AS state_name,
                (SELECT name FROM tbl_city ci WHERE ci.id = d.city_id LIMIT 1) AS city_name,
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
                ORDER BY d.date_created ASC
                LIMIT 0, 50`)
        }

        const listings = rawdata.map((listing: any) => {
            delete (listing.date_created)
            delete (listing.last_updated)
            return (listing)
        })

        return DoResponse(listings, 200)

    } catch (error: any) {
        return DoResponse({ "error": error.message }, 500)
    }

}