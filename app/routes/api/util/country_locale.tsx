import { LoaderFunction } from "@remix-run/node"
import { DoResponse } from "~/lib/lib"
import { query } from "../DB"
import { Country, State } from "~/lib/types"

const getZoneData = (zone: string) => {


    const obj = JSON.parse(zone)

    return obj
}

export const loader: LoaderFunction = async ({ request, params }) => {
    /* const contentType = request.headers.get("Content-Type")

    if (contentType !== "application/json") {
        return DoResponse(
            { error: "Invalid content type. Expected JSON." }
        )
    } */

    if (request.method === "GET") {


        const rows: any = await query(`SELECT * FROM tbl_country`)
        if ((rows as any[]).length <= 0) {
            return DoResponse({}, 200)
        }

        const countries: any = rows.map((country: any) => {
            const zoneData = getZoneData(country?.timezones)
            const zone = zoneData[0]

            return ({
                id: country.iso2,
                countryCode: country.iso2,
                callCode: country.phonecode,
                countryName: country.name,
                gmtOffset: zone?.gmtOffset,
                gmtOffsetName: zone?.gmtOffsetName,
                abbreviation: zone?.abbreviation,
                timezoneName: zone?.tzName,
                zoneName: zone?.zoneName,
                timeZone: "mo",
                lat: zone?.latitude,
                lng: zone?.longitude
            })
        })




        return DoResponse(countries, 200)
    }
}