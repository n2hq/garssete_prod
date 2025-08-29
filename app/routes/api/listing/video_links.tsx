import { ActionFunctionArgs, LoaderFunction } from "@remix-run/node"
import { DoResponse, HashPwd } from "~/lib/lib"
import { AddVideoType, IAddUser } from "~/lib/types"
import { query } from "../DB"


export const loader: LoaderFunction = async ({ request, params }) => {
    const businessGuid = params.business_guid
    const userGuid = params.user_guid


    try {
        const rawdata: AddVideoType[] = await query(`SELECT * FROM tbl_business_gallery_video 
            WHERE 
            business_guid = ? 
            AND 
            user_guid = ?
            ORDER BY date_created DESC`, [businessGuid, userGuid])

        if ((rawdata as AddVideoType[]).length <= 0) { return DoResponse({}, 200) }

        return DoResponse(rawdata, 200)

    } catch (error: any) {
        console.log(error.message)
        return DoResponse({ "error": error.message }, 500)
    }

}


export async function action({ request }: ActionFunctionArgs) {


    if (request.method === "POST") {
        try {


            const body: AddVideoType = await request.json()


            if (!body.video_url || !body.video_title) {
                return DoResponse({ error: "Please enter video link and video title" }, 400)
            }

            if (!body.business_guid) {
                return DoResponse({ error: "Business Id is missing. Contact Admin" }, 400)
            }

            if (!body.user_guid) {
                return DoResponse({ error: "User Id is missing. Contact Admin" }, 400)
            }

            const videoGuid = crypto.randomUUID()
            const videoLink = body.video_url
            const videoTitle = body.video_title
            const videoDescription = body.video_description
            const userGuid = body.user_guid
            const businessGuid = body.business_guid




            {/** insert video link */ }
            const insert: any = await query(`INSERT INTO tbl_business_gallery_video
      (video_title, video_url, video_description, video_guid, user_guid, business_guid)
      VALUES (?, ?, ?, ?, ?, ?)`,
                [videoTitle, videoLink, videoDescription, videoGuid, userGuid, businessGuid]
            )



            const data = {
                success: true,
                message: 'Video added successfully',
                videoInsertId: insert.insertId,
                user_guid: userGuid,
                business_guid: businessGuid,
                videoLink: videoLink,
                videoTitle: videoTitle,
                videoDescription: videoDescription
            }

            return DoResponse({ data }, 200)

        } catch (error: any) {
            return DoResponse({ message: error.message }, 500)
        }
    }

    return DoResponse({ message: "method not allowed" }, 200)
}