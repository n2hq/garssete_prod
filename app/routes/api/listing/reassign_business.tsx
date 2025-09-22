import { ActionFunctionArgs, LoaderFunction } from "@remix-run/node"
import { query } from "../DB"
import { ListingType } from "~/lib/types"
import { DoResponse, GenerateRandomHash } from "~/lib/lib"


export async function action({ request, params }: ActionFunctionArgs) {

    if (request.method === "POST") {

        try {
            const contentType = request.headers.get("Content-Type")

            if (contentType !== "application/json") {
                return new Response(JSON.stringify({ error: "Invalid content type. Expected JSON." }))
            }

            const body: any = await request.json()
            const businessGuid = body.business_guid
            const userGuid = body.user_guid
            const previousOwnerGuid = body.previous_owner_guid


            if (!userGuid) {
                return new Response(JSON.stringify({ message: "Missing New Owner" }), { status: 400 })
            }


            if (!previousOwnerGuid) {
                return new Response(JSON.stringify({ message: "Missing Previous Owner" }), { status: 400 })
            }


            if (!businessGuid) {
                return new Response(JSON.stringify({ message: "Missing Business ID" }), { status: 400 })
            }


            await query(`update tbl_dir a SET a.owner = ? WHERE a.owner = ? AND a.gid = ?`, [userGuid, previousOwnerGuid, businessGuid])


            await query(`update tbl_operating_hours b set b.user_guid = ? WHERE b.user_guid = ? AND b.business_guid = ?`, [userGuid, previousOwnerGuid, businessGuid])


            await query(`update tbl_business_gallery_image c set c.user_guid = ? WHERE c.user_guid = ? AND c.business_guid = ?`, [userGuid, previousOwnerGuid, businessGuid])


            await query(`update tbl_business_gallery_products d set d.user_guid = ? WHERE d.user_guid = ? AND d.business_guid = ?`, [userGuid, previousOwnerGuid, businessGuid])


            await query(`update tbl_business_gallery_video e set e.user_guid = ? WHERE e.user_guid = ? AND e.business_guid = ?`, [userGuid, previousOwnerGuid, businessGuid])


            await query(`update tbl_business_profile_image f set f.user_guid = ? WHERE f.user_guid = ? AND f.business_guid = ?`, [userGuid, previousOwnerGuid, businessGuid])


            await query(`update tbl_rating g set g.user_guid = ? WHERE g.user_guid = ? AND g.business_guid = ?`, [userGuid, previousOwnerGuid, businessGuid])


            await query(`update tbl_selected_facility_features i set i.user_guid = ? WHERE i.user_guid = ? AND i.business_guid = ?`, [userGuid, previousOwnerGuid, businessGuid])

            await query(`update tbl_selected_social_media j set j.user_guid = ? WHERE j.user_guid = ? AND j.business_guid = ?`, [userGuid, previousOwnerGuid, businessGuid])





            const data = {
                message: 'Listing assigned',
                newOwner: userGuid,
                oldOwner: previousOwnerGuid,
                businessGuid: businessGuid
            }

            return new Response(JSON.stringify(data), { status: 201 })
        } catch (error: any) {
            console.log(error.message)
            return new Response(JSON.stringify({ error: error.message }), { status: 500 })
        }
    }
}