import { config, getDateInTimeZone, getDateInTimeZoneX, getOperatingHours, headers } from "./lib";

import tzLookup from 'tz-lookup';

const getCountriesWithTimezone = async (countryCode: string) => {
    const endpoint = config.BASE_URL + "/api/util/country_locale"
    try {

        const response = await fetch(endpoint, {
            method: "GET",
            headers: headers,
        })

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();
        return data

    } catch (error: any) {
        return ({ "message": error.message })
    }
}

const getCountryTimezoneData = (countryCode: string, countries: any) => {
    return countries.find((country: any) => country?.countryCode === countryCode);
}

const constructDailyHour = (start: string, end: string) => {
    if (start === "Closed" || end == "Closed") {
        return "Closed"
    } else if (start === null || end === null) {
        return "Not Set"
    } else {
        return `${start} - ${end}`
    }
}

const reConstructHours = (operatingHours: any) => {

    const opHours = []
    const openStatus = (operatingHours?.open_status)

    opHours.push({
        day: "Mon",
        hours: constructDailyHour(operatingHours.monday_from, operatingHours.monday_to)
    })
    opHours.push({
        day: "Tue",
        hours: constructDailyHour(operatingHours.tuesday_from, operatingHours.tuesday_to)
    })
    opHours.push({
        day: "Wed",
        hours: constructDailyHour(operatingHours.wednesday_from, operatingHours.wednesday_to)
    })
    opHours.push({
        day: "Thu",
        hours: constructDailyHour(operatingHours.thursday_from, operatingHours.thursday_to)
    })
    opHours.push({
        day: "Fri",
        hours: constructDailyHour(operatingHours.friday_from, operatingHours.friday_to)
    })
    opHours.push({
        day: "Sat",
        hours: constructDailyHour(operatingHours.saturday_from, operatingHours.saturday_to)
    })

    opHours.push({
        day: "Sun",
        hours: constructDailyHour(operatingHours.sunday_from, operatingHours.sunday_to)
    })

    //console.log(opHours)

    return {
        opHours: opHours,
        openStatus: openStatus
    }
}

function formatTime(time24: string): string {
    const [hourStr, minute] = time24.split(':');
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? 'pm' : 'am';
    hour = hour % 12 || 12;
    return `${hour.toString().padStart(2, '0')}:${minute} ${ampm}`;
}

export const getLocationAndBusinessStatus = async (listing: any) => {
    const countryCode: string = listing?.country_code

    const data = await getCountriesWithTimezone(countryCode)
    const country = getCountryTimezoneData(countryCode, data)







    const operatingHours: any = await getOperatingHours(listing?.gid, listing?.owner)
    //console.log(operatingHours)
    const reconstructed = reConstructHours(operatingHours)
    const opHours = reconstructed.opHours
    country["hours"] = opHours
    country["openStatus"] = operatingHours?.open_status


    const dayMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const nowUTC = new Date();
    const offsetMs = (country.gmtOffset) * 1000;
    const localTime = new Date(nowUTC.getTime() + offsetMs);

    const localTimeZone = tzLookup(listing.lat, listing.lng)

    const adjustment = 0;//no adjustment
    const timeObject = new Date(Date.now() - adjustment);

    let localTimeObject: any = getDateInTimeZone(localTimeZone);

    let localTimeText = getDateInTimeZoneX(localTimeZone)

    console.log(localTimeObject)

    //const localTimex = new Date(localTimeFormat.)


    //console.log(format(estDate, "MM/dd/yyyy, hh:mm:ss a 'EST'", { timeZone: estTimeZone }));

    const dayIndex = localTimeObject.getDay(); // 0 = Sunday, ..., 6 = Saturday
    const today = dayMap[dayIndex];
    const todayHoursEntry = country.hours.find((entry: any) => entry.day === today);

    let isOpen = false;
    let todayHoursFormatted: any = <span>Closed Today</span>;

    if (todayHoursEntry && todayHoursEntry.hours.includes('-')) {
        const [openStr, closeStr] = todayHoursEntry.hours.split(' - ');
        const [openHour, openMinute] = openStr.split(':').map(Number);
        const [closeHour, closeMinute] = closeStr.split(':').map(Number);

        const openTime = new Date(localTimeObject);
        openTime.setHours(openHour, openMinute, 0, 0);

        const closeTime = new Date(localTimeObject);
        closeTime.setHours(closeHour, closeMinute, 0, 0);

        isOpen = localTimeObject >= openTime && localTimeObject <= closeTime;

        const formattedLabel = (isOpen: boolean) => {
            return `${isOpen ? 'Open Now' : 'Closed Now'}:`
        }

        //todayHoursFormatted = formattedLabel(isOpen) + ` ${today}, ${formatTime(openStr)} - ${formatTime(closeStr)}`;

        todayHoursFormatted = <div className={`w-full flex gap-1.5 place-items-center flex-wrap`}>
            <span className={`${isOpen ? 'bg-blue-700' : 'bg-red-500'} text-white px-1 py-[2px] rounded-md`}>{formattedLabel(isOpen)}</span>
            <span>{today}, </span>
            <span>{formatTime(openStr)}</span>
            <span> {"-"} </span>
            <span>{formatTime(closeStr)}</span>
        </div>
    }


    if (todayHoursEntry && todayHoursEntry.hours.includes('Not Set')) {
        todayHoursFormatted = <div>
            <span>Operating Hours: </span>
            <span className={`bg-blue-800 rounded text-white px-1 py-[2px]`}>
                open ended
            </span>
        </div>
    }

    const localTimeString = localTimeObject.toString()
    return {
        ...country,
        isOpen,
        todayHoursFormatted,
        today,
        localTimeString,
        localTimeText
    };
}




export const ReportTime = async (listing: any) => {
    const locationDetails = getLocationAndBusinessStatus(listing)
    return locationDetails

}