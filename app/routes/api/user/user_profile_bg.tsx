import { LoaderFunction } from "@remix-run/node";
import { DoResponse } from "~/lib/lib";
import { query } from "../DB";

export const loader: LoaderFunction = async ({ request, params }) => {
    const contentType = request.headers.get("Content-Type")

    if (contentType !== "application/json") {
        return DoResponse(
            { error: "Invalid content type. Expected JSON." }
        )
    }

    if (request.method === "GET") {
        const guid = params.guid

        const rows: any = await query(`SELECT * FROM tbl_user_profile_bg WHERE user_guid = ?`, [guid])
        if ((rows as any[]).length <= 0) {
            return DoResponse([{}], 200)
        }

        return DoResponse(rows[0], 200)
    }
}
