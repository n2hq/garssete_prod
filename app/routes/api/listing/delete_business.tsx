import { ActionFunctionArgs, LoaderFunction } from "@remix-run/node"
import { config, DoResponse, generate7DigitNumber, HashPwd, headers, sendEmail } from "~/lib/lib"
import { DeleteType, IUser, LoginType, VerifiedStatus } from "~/lib/types"
import { query } from "../DB"
import jwt from 'jsonwebtoken'
import { getSignupEmail } from "~/lib/emails"


const JWT_SECRET = import.meta.env.VITE_JWT_SECRET as string



export const loader: LoaderFunction = async ({ request, params }) => {
    return DoResponse({
        success: false,
        message: "method not allowed"
    }, 405)
}

export const action = async ({ request, params }: ActionFunctionArgs) => {
    const contentType = request.headers.get("Content-Type")

    if (contentType !== "application/json") {
        return DoResponse({ error: "Invalid content type. Expected JSON." }, 405)
    }

    if (request.method === "PUT") {
        try {
            let business_guid = params.business_guid

            const body: DeleteType = await request.json()

            if (!body.user_guid || !body.password || !body.confirm_delete || !business_guid) {
                return DoResponse({ error: "Missing email or password" }, 400)
            }

            const { user_guid, confirm_delete, password } = body

            const hashedPassword = HashPwd(password)

            const rows: any = await query(`SELECT * FROM tbl_user 
            WHERE
            user_guid = ?
            AND
            password = ?`, [user_guid, hashedPassword])
            const user = rows[0]

            if ((rows as any[]).length <= 0) {
                return DoResponse({
                    success: false,
                    message: "Please check your password and try again!"
                }, 405)
            }


            const businessExists: any = await query(`SELECT * FROM tbl_dir 
            WHERE
            gid = ?
            AND
            owner = ?`, [business_guid, user_guid])
            const business = businessExists[0]

            if ((businessExists as any[]).length <= 0) {
                return DoResponse({
                    success: false,
                    message: "Page does not exist"
                }, 405)
            }

            const deleteBusiness = await query(`DELETE FROM tbl_dir WHERE gid = ?`, [business_guid]);
            const deleteSocialMedia = await query(`DELETE FROM tbl_selected_social_media WHERE business_guid = ?`, [business_guid]);
            const deleteFacilityFeatures = await query(`DELETE FROM tbl_selected_facility_features WHERE business_guid = ?`, [business_guid]);
            const deleteRating = await query(`DELETE FROM tbl_rating WHERE business_guid = ?`, [business_guid]);
            const deleteHours = await query(`DELETE FROM tbl_operating_hours WHERE business_guid = ?`, [business_guid]);
            const deleteProfileImage = await query(`DELETE FROM tbl_business_profile_image WHERE business_guid = ?`, [business_guid]);
            const deleteProfileGallery = await query(`DELETE FROM tbl_business_gallery_image WHERE business_guid = ?`, [business_guid]);

            const data = {
                success: true,
                message: 'BUSINESS_DELETED'
            }



            return DoResponse(data, 200)
        } catch (error: any) {
            return DoResponse({ message: error.message }, 500)
        }
    }
}