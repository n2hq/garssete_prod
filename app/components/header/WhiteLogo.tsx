import { Link } from "@remix-run/react"
import { whiteLogoColor } from "~/lib/css"
import { getSiteLogo } from "~/lib/lib"


export const WhiteLogo = () => {
    return (
        <Link to={`/`}>
            <div className={`font-[600] text-[24px]
                cursor-pointer tracking-tight relative
                top-[-1px] ${whiteLogoColor}`}>
                {/* <img src="/images/gruthe4.png" alt=""
                    className={`h-[22px] `}
                /> */}
                {getSiteLogo()}
            </div>
        </Link>
    )
}