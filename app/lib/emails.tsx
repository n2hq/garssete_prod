import { config } from "./lib"

export const getSignupEmail = (first_name: string, guid: string) => {

    const formattedSitename = config.FORMATTED_SITENAME
    const host = config.BASE_URL
    return (`
        Congratulations ${first_name},

        Thank you for signing up with ${formattedSitename}.

        To complete your signup, please click on the link below.

        ${host}/landing/signedup?guid=${guid}

        Thank you.

        ${formattedSitename} Support`
    )
}

export const getResetPwdEmail = (first_name: string, guid: string, request_id: string) => {

    const formattedSitename = config.FORMATTED_SITENAME
    const host = config.BASE_URL

    return (`
        Dear ${first_name},

        You requested to reset your password.

        To continue to reset your password, click on the link below.

        ${host}/landing/resetpwd?guid=${guid}&request_id=${request_id}

        Thank you.

        ${formattedSitename} Support`
    )
}