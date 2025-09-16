import React from 'react'
import ResponsiveNav from '~/components/header/minimal/ResponsiveNav'
import SigninBody from './assets/SigninBody'
import { OperationProvider } from '~/context/OperationContext'

const index = () => {
    return (
        <div>
            {/* <ResponsiveNav theme='light' /> */}
            <OperationProvider>
                <SigninBody />
            </OperationProvider>
        </div>
    )
}

export default index
