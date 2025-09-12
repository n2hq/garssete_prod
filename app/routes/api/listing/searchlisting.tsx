import { LoaderFunction } from "@remix-run/node"


import { DoResponse, escapeRegex } from "~/lib/lib"
import { query } from "../DB"

export const loader: LoaderFunction = async ({ request, params }) => {

    const ITEMS_PER_PAGE = 7;



    try {
        const url = new URL(request.url)
        let criteria = url.searchParams.get("q") as string

        let page = Number(url.searchParams.get("page")) || 1 as number

        const offset = (page - 1) * ITEMS_PER_PAGE




        if (criteria === "" || criteria === null || criteria === undefined) {
            criteria = ""
        } else {
            criteria = escapeRegex(criteria);
        }

        /* let rawdata: any = await query(`SELECT * FROM tbl_dir d
            LEFT JOIN tbl_business_profile_image b ON d.gid = b.business_guid
            WHERE 
            MATCH(d.title, d.short_description, d.category) AGAINST (? IN NATURAL LANGUAGE MODE)
            OR city_id IN (SELECT id FROM tbl_city WHERE name RLIKE ?)
            OR state_code IN (SELECT iso2 FROM tbl_state WHERE name RLIKE ?)
            OR country_code IN (SELECT iso2 FROM tbl_country WHERE name RLIKE ?);
            `, [criteria, criteria, criteria, criteria]) */

        let countRows: any = null

        const sqlWithoutQuery = `SELECT
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
                    (SELECT
                        co.latitude
                    FROM
                    tbl_country co
                    WHERE
                    co.iso2 = d.country_code
                    LIMIT 1
                    ) AS latitude,
                    (SELECT
                        co.longitude
                    FROM
                    tbl_country co
                    WHERE
                    co.iso2 = d.country_code
                    LIMIT 1
                    ) AS longitude,
                    (
                    SELECT NAME
                FROM
                    tbl_country co
                WHERE
                    co.iso2 = d.country_code
                LIMIT 1
                ) AS country_name,(
                    SELECT
                        co.iso2
                    FROM
                        tbl_country co
                    WHERE
                        co.iso2 = d.country_code
                    LIMIT 1
                ) AS country_code,(
                    SELECT NAME
                FROM
                    tbl_state st
                WHERE
                    st.iso2 = d.state_code AND st.country_code = d.country_code
                LIMIT 1
                ) AS state_name,(
                    SELECT
                        st.iso2
                    FROM
                        tbl_state st
                    WHERE
                        st.iso2 = d.state_code AND st.country_code = d.country_code
                    LIMIT 1
                ) AS state_code,(
                    SELECT NAME
                FROM
                    tbl_city ci
                WHERE
                    ci.id = d.city_id
                LIMIT 1
                ) AS city_name,(
                    SELECT
                        GROUP_CONCAT(
                            CONCAT(
                                sm.media_id,
                                '$',
                                sm.user_description,
                                '$',
                                sysm.base_url
                            ) SEPARATOR ', '
                        )
                    FROM
                        tbl_selected_social_media sm,
                        tbl_sys_social_media sysm
                    WHERE
                        d.gid = sm.business_guid AND sm.media_id = sysm.media_id
                ) AS social_media,
                (
                    SELECT
                        GROUP_CONCAT(
                            CONCAT(
                                sf.feature_id,
                                '$',
                                sf.user_description,
                                '$'
                            ) SEPARATOR '& '
                        )
                    FROM
                        tbl_selected_facility_features sf
                    WHERE
                        d.gid = sf.business_guid
                ) AS facility_features,
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
                    d.active_status = true
                `

        const sqlWithQuery = `SELECT
                    d.id,
                    d.username,
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
                    co.name AS country_name,
                    co.iso2 AS country_code,
                    st.name AS state_name,
                    st.iso2 AS state_code,
                    ci.name AS city_name,
                    (SELECT GROUP_CONCAT(CONCAT(sm.media_id, '$', sm.user_description, '$', sysm.base_url) SEPARATOR ', ')
                    FROM tbl_selected_social_media sm
                    JOIN tbl_sys_social_media sysm ON sm.media_id = sysm.media_id
                    WHERE d.gid = sm.business_guid) AS social_media,
                    b.image_url,
                    bg.image_url AS bg_image_url,
                    r.average_rating,
                    r.total_reviews
                FROM tbl_dir d
                LEFT JOIN tbl_country co 
                    ON co.iso2 = d.country_code
                LEFT JOIN tbl_state st 
                    ON st.iso2 = d.state_code AND st.country_code = d.country_code
                LEFT JOIN tbl_city ci 
                    ON ci.id = d.city_id
                LEFT JOIN tbl_business_profile_image b 
                    ON d.gid = b.business_guid
                LEFT JOIN tbl_business_profile_bg bg
                    ON d.gid = bg.business_guid
                LEFT JOIN (
                    SELECT 
                        business_guid,
                        ROUND(AVG(rating), 1) AS average_rating,
                        COUNT(*) AS total_reviews
                    FROM tbl_rating
                    GROUP BY business_guid
                ) r ON d.gid = r.business_guid
                WHERE
                    (
                        d.title RLIKE ?
                        OR d.short_description RLIKE ?
                        OR d.address_one RLIKE ?
                        OR d.address_two RLIKE ?
                        OR d.category RLIKE ?
                        OR co.name RLIKE ?
                        OR st.name RLIKE ?
                        OR ci.name RLIKE ?
                    )
                    AND d.active_status = true
                `

        let sql = ''


        if (!criteria || criteria.trim() === "" || criteria === null || criteria === undefined || criteria === "") {
            {/** without query */ }
            sql = sqlWithoutQuery
            countRows = await query(sqlWithoutQuery)
        } else {
            {/** with query */ }
            sql = sqlWithQuery
            countRows = await query(sqlWithQuery, [criteria, criteria, criteria, criteria, criteria, criteria, criteria, criteria])
        }

        const totalItems = (countRows.length)
        //console.log(totalItems)

        let sql2 = ''
        let rows: any = null

        if (!criteria || criteria.trim() === "" || criteria === null || criteria === undefined || criteria === "") {
            {/** without query */ }
            sql2 = sql + ` ORDER BY date_created DESC LIMIT ? OFFSET ?`
            rows = await query(sql2, [ITEMS_PER_PAGE, offset])
        } else {
            {/** with query */ }
            const sql2 = sql + ` ORDER BY date_created DESC LIMIT ? OFFSET ?`
            rows = await query(sql2, [criteria, criteria, criteria, criteria, criteria, criteria, criteria, criteria, ITEMS_PER_PAGE, offset])
        }

        //console.log(sql2)


        const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)

        const pagination: any = {
            currentPage: page,
            totalPages,
            totalItems,
            itemsPerPage: ITEMS_PER_PAGE,
            hasNext: page < totalPages,
            hasPrev: page > 1,
        }

        /* const listings = rows.map((listing: any) => {
            delete (listing.date_created)
            delete (listing.last_updated)
            return (listing)
        }) */

        //console.log(pagination)

        return DoResponse({
            items: rows as any,
            pagination
        }, 200)

    } catch (error: any) {
        console.log(error.message)
        return DoResponse({ "error": error.message }, 500)
    }

}