import { Link } from "@remix-run/react"
import { getSiteLogo } from "~/lib/lib"


export const DarkLogo = () => {
    return (
        <Link to={`/`}>
            <div className={` text-[24px]
                cursor-pointer tracking-tight relative
                top-[-1px] font-poppins`}>
                {/* <img src="/images/gruthe3-lite.png" alt=""
                    className={`h-[20px] `}
                /> */}
                {getSiteLogo()}
            </div>
        </Link>
    )
}