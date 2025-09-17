import { Link } from '@remix-run/react'
import React, { useEffect } from 'react'
import { WhiteLogo } from '~/components/header/WhiteLogo'
import { whiteLogoColor } from '~/lib/css'
import ChangeEmailFail from './ChangeEmailFail'
import ChangeEmailSuccess from './ChangeEmailSuccess'
import ChangeEmailSuccessAlt from './ChangeEmailSuccessAlt'
import ChangeEmailFailAlt from './ChangeEmailFailAlt'

const ChangeEmailForm = ({ guid, email, response }: any) => {

    return (
        <div>
            {
                response.success ?
                    <ChangeEmailSuccessAlt email={email} message={response.message} /> :
                    <div>

                        <ChangeEmailFailAlt />
                    </div>
            }
        </div>
    )
}

export default ChangeEmailForm
