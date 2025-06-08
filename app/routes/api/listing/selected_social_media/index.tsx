import { ActionFunctionArgs, LoaderFunction } from "@remix-run/node"
import { query } from "../../DB"
import { ListingType } from "~/lib/types"
import { DoResponse, GenerateRandomHash } from "~/lib/lib"


export const loader: LoaderFunction = async ({ request, params }) => {
    const contentType = request.headers.get("Content-Type")

    /* if (contentType !== "application/json") {
        return new Response(JSON.stringify({ error: "Invalid content type. Expected JSON." }))
    } */

    const buid = params.buid
    const user_guid = params.user_guid

    try {
        const rawdata: any = await query(`SELECT * FROM tbl_selected_socials`)
        return DoResponse(rawdata, 200)

    } catch (error: any) {
        return DoResponse({ "error": error.message }, 500)
    }

}

export async function action({ request, params }: ActionFunctionArgs) {
    const contentType = request.headers.get("Content-Type")

    if (contentType !== "application/json") {
        return new Response(JSON.stringify({ error: "Invalid content type. Expected JSON." }))
    }

    if (request.method === "POST") {

        try {


            const body: any = await request.json()
            const userGuid = body.user_guid
            const businessGuid = body.business_guid
            const selected = body.selected
            console.log(body)
            //return DoResponse(body, 200)


            // Clear old features
            await query(`DELETE FROM tbl_selected_social_media 
                WHERE 
                user_guid = ? 
                AND 
                business_guid = ?
                `, [userGuid, businessGuid])


            if (selected.length > 0) {
                const vals = selected.map(async (media: any) => {
                    try {
                        const guid = crypto.randomUUID()
                        await query(`INSERT INTO tbl_selected_social_media 
                    (user_guid, business_guid, media_id, user_description, guid) VALUES (?, ?, ?, ?, ?)`,
                            [userGuid, businessGuid, media.media_id, media.user_description, guid])
                    } catch (error: any) {

                        return DoResponse({ error: error.message }, 405)
                    }
                })
            }




            const gid = crypto.randomUUID()

            const data = {
                message: 'Social media added successfully',
                data: body,
                user_guid: userGuid,
                business_guid: businessGuid
            }

            return new Response(JSON.stringify(data), { status: 201 })
        } catch (error: any) {
            console.log(error.message)
            return new Response(JSON.stringify({ error: error.message }), { status: 500 })
        }
    }
}