import { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import React, { useEffect } from 'react'
import ResponsiveNav from '~/components/header/minimal/ResponsiveNav'
import { changeEmail, DoResponse } from '~/lib/lib'
import ChangeEmailFail from './assets/ChangeEmailFail'
import ChangeEmailSuccess from './assets/ChangeEmailSuccess'
import { useAuth } from '~/context/AuthContext'
import ResetPasswordBody from './assets/ChangeEmailBody'
import ChangeEmailBody from './assets/ChangeEmailBody'

export const loader: LoaderFunction = async ({ request, params }) => {

    const url = new URL(request.url)
    let userGuid = url.searchParams.get("guid") as string
    let email = url.searchParams.get("email") as string

    const response = await changeEmail(userGuid, email)
    console.log(response)

    const data = {
        guid: userGuid,
        email: email,
        response: response
    }
    return DoResponse(data, 200);
}

const index = () => {
    const loaderData: any = useLoaderData()
    const auth = useAuth()
    if (!auth) { return null }

    useEffect(() => {
        if (auth?.user) {
            auth?.signoutNoReload()
        }
    }, [auth])

    return (
        <div>
            <div>
                {
                    loaderData?.guid && loaderData?.email && loaderData &&
                    <ChangeEmailBody
                        userGuid={loaderData?.guid}
                        email={loaderData?.email}
                        response={loaderData?.response}
                    />
                }

            </div>
        </div>
    )
}

export default index
