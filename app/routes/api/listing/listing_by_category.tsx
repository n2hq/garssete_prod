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
        d.*, 
        avg_ratings.avg_rating,
        b.image_url
      FROM tbl_dir d
      LEFT JOIN (
          SELECT business_guid, AVG(rating) AS avg_rating
          FROM tbl_rating
          GROUP BY business_guid
      ) AS avg_ratings ON d.gid = avg_ratings.business_guid
      LEFT JOIN tbl_business_profile_image b ON b.business_guid = d.gid
      WHERE d.category = ?
      AND
      d.active_status = true
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
