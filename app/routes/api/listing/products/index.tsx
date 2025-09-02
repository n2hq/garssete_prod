import { ActionFunctionArgs, LoaderFunction } from "@remix-run/node"
import { ListingType, ProductType } from "~/lib/types"
import { DoResponse, GenerateRandomHash } from "~/lib/lib"
import { query } from "../../DB"

export const loader: LoaderFunction = async ({ request, params }) => {

    const userGuid = params.user_guid
    const businessGuid = params.business_guid

    try {
        const rawdata: ProductType = await query(`SELECT * FROM tbl_business_gallery_products 
            WHERE
            user_guid = ?
            AND 
            business_guid = ?
            ORDER BY date_created DESC`, [userGuid, businessGuid])

        return DoResponse(rawdata, 200)

    } catch (error: any) {
        return DoResponse({ "error": error.message }, 500)
    }

}

export async function action({ request }: ActionFunctionArgs) {




    return DoResponse({ message: "method not allowed" }, 200)
}