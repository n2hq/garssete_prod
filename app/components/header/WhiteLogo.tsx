import { Link } from "@remix-run/react"
import { whiteLogoColor } from "~/lib/css"
import { getSiteLogo } from "~/lib/lib"


export const WhiteLogo = () => {
    return (
        <Link to={`/`}>
            <div className={` text-[24px]
                cursor-pointer tracking-tighter relative
                top-[-1px] ${whiteLogoColor} font-poppins`}>
                {/* <img src="/images/gruthe4.png" alt=""
                    className={`h-[22px] `}
                /> */}
                {getSiteLogo()}
            </div>
        </Link>
    )
}