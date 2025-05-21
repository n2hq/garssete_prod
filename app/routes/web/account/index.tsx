import React from 'react'
import ResponsiveNav from '~/components/header/account/ResponsiveNav'
import AccountLayout from './assets/AccountLayout'
import ContentLayout from './assets/ContentLayout'

const index = () => {
    return (
        <AccountLayout>
            <ContentLayout title={'Account Profile'}>
                Account Profile
            </ContentLayout>
        </AccountLayout>
    )
}

export default index
