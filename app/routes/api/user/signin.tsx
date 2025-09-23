import { ActionFunctionArgs, LoaderFunction } from "@remix-run/node"
import { config, DoResponse, generate7DigitNumber, HashPwd, headers, sendEmail } from "~/lib/lib"
import { IUser, LoginType, VerifiedStatus } from "~/lib/types"
import { query } from "../DB"
import jwt from 'jsonwebtoken'
import { getSignupEmail } from "~/lib/emails"


const JWT_SECRET = import.meta.env.VITE_JWT_SECRET as string



export const loader: LoaderFunction = async ({ request, params }) => {
    return DoResponse({
        success: false,
        message: "method not allowed"
    }, 405)
}

export const action = async ({ request }: ActionFunctionArgs) => {
    const contentType = request.headers.get("Content-Type")

    if (contentType !== "application/json") {
        return DoResponse({ error: "Invalid content type. Expected JSON." }, 405)
    }

    try {
        const body: LoginType = await request.json()

        if (!body.email || !body.password) {
            return DoResponse({ error: "Missing email or password" }, 400)
        }

        const { email, password } = body

        const hashedPassword = HashPwd(password)

        const rows: any = await query(`SELECT * FROM tbl_user 
            WHERE
            email = ?
            AND
            password = ?`, [email, hashedPassword])
        const user = rows[0]

        if ((rows as any[]).length <= 0) {
            return DoResponse({
                success: false,
                message: "Please check your email and password and try again!"
            }, 405)
        }

        if (Boolean(rows[0].is_verified) === VerifiedStatus.PENDING) {
            const verifyCode = generate7DigitNumber()

            const result = await query(`UPDATE tbl_user 
                SET
                verify_code = ?
                WHERE
                user_hash = ?`,
                [
                    verifyCode,
                    rows[0].user_hash
                ])

            let userInfo = rows[0]
            let firstName = userInfo.first_name
            let userGuid = userInfo.user_guid

            const emailData = {
                subject: `${config.SITENAME} Account Signup`,
                to: body.email,
                msg: getSignupEmail(firstName, userGuid)
            }

            console.log(emailData)

            await sendEmail(emailData)

            return DoResponse({ message: "Please check your email to complete signup." }, 500)
        }

        const JWT_INFO = {
            guid: user.user_guid,
            email: user.email,
            first_name: user.first_name,
            last_name: user.lastname,
            role: user.role
        }

        const accessToken = jwt.sign(JWT_INFO, JWT_SECRET, { expiresIn: "7d" })
        const refreshToken = jwt.sign(JWT_INFO, JWT_SECRET, { expiresIn: "7d" })

        const tokens = {
            accessToken: accessToken,
            refreshToken: refreshToken
        }

        return DoResponse(tokens, 200)
    } catch (error: any) {
        return DoResponse({ message: error.message }, 500)
    }
}