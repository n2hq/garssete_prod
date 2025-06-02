import { Link } from "@remix-run/react"


export const WhiteLogo = () => {
    return (
        <Link to={`/`}>
            <div className={`font-black text-[25px]
                cursor-pointer tracking-tight relative
                top-[-1px] `}>

                Gr<i>ü</i>the
            </div>
        </Link>
    )
}