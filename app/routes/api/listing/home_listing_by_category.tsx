import { LoaderFunction } from "@remix-run/node";
import { query } from "../DB";
import { DoResponse } from "~/lib/lib";

export const loader: LoaderFunction = async ({ params }) => {
    try {
        const category = params.category;
        const limitRaw = params.limit;

        // Sanitize and validate limit
        const limit = Math.max(parseInt(limitRaw ?? "5", 10), 1);

        const rows: any = await query(`
            SELECT
                    d.id,
                    d.gid,
                    d.title,
                    d.username,
                    d.category,
                    d.date_created,
                    (
                    SELECT NAME
                FROM
                    tbl_country co
                WHERE
                    co.iso2 = d.country_code
                LIMIT 1
                ) AS country_name,
                (
                    SELECT
                        co.iso2
                    FROM
                        tbl_country co
                    WHERE
                        co.iso2 = d.country_code
                    LIMIT 1
                ) AS country_code,
                (
                    SELECT NAME
                FROM
                    tbl_state st
                WHERE
                    st.iso2 = d.state_code AND st.country_code = d.country_code
                LIMIT 1
                ) AS state_name,
                (
                    SELECT
                        st.iso2
                    FROM
                        tbl_state st
                    WHERE
                        st.iso2 = d.state_code AND st.country_code = d.country_code
                    LIMIT 1
                ) AS state_code,
                (
                    SELECT NAME
                FROM
                    tbl_city ci
                WHERE
                    ci.id = d.city_id
                LIMIT 1
                ) AS city_name,
                b.image_url,
                bg.image_url AS bg_image_url,
                r.average_rating,
                r.total_reviews
                FROM
                    tbl_dir d
                LEFT JOIN tbl_business_profile_image b ON
                    d.gid = b.business_guid
                LEFT JOIN tbl_business_profile_bg bg ON
                    d.gid = bg.business_guid
                LEFT JOIN(
                    SELECT business_guid,
                        ROUND(AVG(rating),
                        1) AS average_rating,
                        COUNT(*) AS total_reviews
                    FROM
                        tbl_rating
                    GROUP BY
                        business_guid
                ) r
                ON
                    d.gid = r.business_guid
                WHERE
                    d.active_status = TRUE
                AND
                	d.category RLIKE ?
                ORDER BY
                    d.date_created
                DESC
                LIMIT ?
            `, [category, limit]);

        if (rows.length === 0) {
            return DoResponse([], 200);
        }

        return DoResponse(rows, 200);

    } catch (error: any) {
        return DoResponse({ error: error.message }, 500);
    }
};
