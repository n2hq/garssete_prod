import { Link } from "@remix-run/react"


export const WhiteLogo = () => {
    return (
        <Link to={`/`}>
            <div className={`font-black text-[25px]
                cursor-pointer tracking-tight relative
                top-[-1px] text-red-800`}>

                Gr<i className={``}>ü</i>the
            </div>
        </Link>
    )
}