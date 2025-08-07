import { config, getOperatingHours, headers } from "./lib";

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

const reConstructHours = (operatingHours: any) => {

    const opHours = []
    const openStatus = (operatingHours?.open_status)

    opHours.push({
        day: "Mon",
        hours: `${operatingHours.monday_from} - ${operatingHours.monday_to}`
    })
    opHours.push({
        day: "Tue",
        hours: `${operatingHours.tuesday_from} - ${operatingHours.tuesday_to}`
    })
    opHours.push({
        day: "Wed",
        hours: `${operatingHours.wednesday_from} - ${operatingHours.wednesday_to}`
    })
    opHours.push({
        day: "Thu",
        hours: `${operatingHours.thursday_from} - ${operatingHours.thursday_to}`
    })
    opHours.push({
        day: "Fri",
        hours: `${operatingHours.friday_from} - ${operatingHours.friday_to}`
    })
    opHours.push({
        day: "Sat",
        hours: `${operatingHours.saturday_from} - ${operatingHours.saturday_to}`
    })

    opHours.push({
        day: "Sun",
        hours: `${operatingHours.sunday_from} - ${operatingHours.sunday_to}`
    })

    console.log(opHours)

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

    console.log(country)

    const operatingHours: any = await getOperatingHours(listing?.gid, listing?.owner)
    console.log(operatingHours)
    const reconstructed = reConstructHours(operatingHours)
    const opHours = reconstructed.opHours
    country["hours"] = opHours
    country["openStatus"] = operatingHours?.open_status


    const dayMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const nowUTC = new Date();
    const offsetMs = country.gmtOffset * 1000;
    const localTime = new Date(nowUTC.getTime() + offsetMs);

    const dayIndex = localTime.getDay(); // 0 = Sunday, ..., 6 = Saturday
    const today = dayMap[dayIndex];
    const todayHoursEntry = country.hours.find((entry: any) => entry.day === today);

    let isOpen = false;
    let todayHoursFormatted = 'Closed Today';

    if (todayHoursEntry && todayHoursEntry.hours.includes('-')) {
        const [openStr, closeStr] = todayHoursEntry.hours.split(' - ');
        const [openHour, openMinute] = openStr.split(':').map(Number);
        const [closeHour, closeMinute] = closeStr.split(':').map(Number);

        const openTime = new Date(localTime);
        openTime.setHours(openHour, openMinute, 0, 0);

        const closeTime = new Date(localTime);
        closeTime.setHours(closeHour, closeMinute, 0, 0);

        isOpen = localTime >= openTime && localTime <= closeTime;

        todayHoursFormatted = `${isOpen ? 'Open Now' : 'Closed Now'}: ${today}, ${formatTime(openStr)} - ${formatTime(closeStr)}`;
    }

    return {
        ...country,
        isOpen,
        todayHoursFormatted,
        today
    };
}

export const ReportTime = async (listing: any) => {
    const locationDetails = getLocationAndBusinessStatus(listing)
    return locationDetails

}