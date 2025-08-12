import { config } from "./lib"

export const getSignupEmail = (first_name: string, guid: string) => {

    const formattedSitename = config.FORMATTED_SITENAME
    const host = config.BASE_URL
    return (`
        Congratulations ${first_name},

        Thank you for signing up with ${formattedSitename}.

        To complete your signup, please click on the link below.

        ${host}/web/landing/complete_signup/${guid}

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

        ${host}/web/landing/reset_password/${guid}

        Thank you.

        ${formattedSitename} Support`
    )
}



export const getChangeEmailRequestEmail = (first_name: string, guid: string, request_id: string, email: string) => {

    const formattedSitename = config.FORMATTED_SITENAME
    const host = config.BASE_URL

    return (`
        Dear ${first_name},

        You requested to change your email.

        To continue to change your email, click on the link below.

        ${host}/web/landing/change_email?guid=${guid}&request_id=${request_id}&email=${email}

        Thank you.

        ${formattedSitename} Support`
    )
}


export const getChangePasswordEmail = (first_name: string) => {

    const formattedSitename = config.FORMATTED_SITENAME
    const host = config.BASE_URL

    return (`
        Dear ${first_name},

        You recently changed your password.

        If you didn't initiate this password change, please use the link below to reset your password.

        ${host}/web/reset_password

        Thank you.

        ${formattedSitename} Support`
    )
}


export const getResetPasswordEmailCompleted = (first_name: string) => {

    const formattedSitename = config.FORMATTED_SITENAME
    const host = config.BASE_URL

    return (`
        Dear ${first_name},

        Your password reset was successful!

        Click the link below to signin.

        ${host}/web/signin

        Thank you.

        ${formattedSitename} Support`
    )
}