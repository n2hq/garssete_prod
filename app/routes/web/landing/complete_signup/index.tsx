import { Link, useLoaderData } from '@remix-run/react'
import React from 'react'
import { FaCheck } from 'react-icons/fa'
import ResponsiveNav from '~/components/header/minimal/ResponsiveNav'
import ChangeEmailSuccess from './assets2/ResetPasswordSuccess'
import ChangeEmailFail from './assets2/ResetPasswordFail'
import { LoaderFunction } from '@remix-run/node'
import { changeEmail, DoResponse, getUserProfile } from '~/lib/lib'
import ResetPasswordForm from './assets2/ResetPasswordForm'
import ResetPasswordBody from './assets/ResetPasswordBody'

export const loader: LoaderFunction = async ({ request, params }) => {

    const url = new URL(request.url)
    let userGuid = params.guid as string

    const data = {
        guid: userGuid
    }
    return DoResponse(data, 200);
}

const index = () => {
    const loaderData: any = useLoaderData()
    const userGuid = loaderData.guid
    return (
        <div>

            <ResetPasswordBody userGuid={userGuid} />
            {/* <ResetPasswordForm guid={userGuid} /> */}
        </div>
    )
}

export default index
