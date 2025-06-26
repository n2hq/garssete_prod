import { Link } from "@remix-run/react"
import { useEffect, useState } from "react"
import { DarkLogo } from "~/components/header/DarkLogo"
import Hamburger from "~/components/header/Hamburger"
import MobileNav from "~/components/header/MobileNav"
import UserMenu from "~/components/header/usermenu/UserMenu"
import { WhiteLogo } from "~/components/header/WhiteLogo"

export const HeaderNav = () => {
    const [scrollHeight,] = useState(1)
    const [theme, setTheme] = useState('')
    const [isScroll, setIsScroll] = useState(false)
    const [showNav, setShowNav] = useState(false)
    const [navBg, setNavBg] = useState(false)
    const openNav = () => setShowNav(true)
    const closeNav = () => setShowNav(false)

    useEffect(() => {


        const handler = () => {
            if (window.scrollY >= scrollHeight) { setIsScroll(true) }
            if ((window.scrollY < scrollHeight)) { setIsScroll(false) }
        }
        window.onscroll = () => handler()
    }, [scrollHeight])
    return (
        <div>
            <div className={`z-[400] fixed w-full  h-[60px] 
      px-[15px] 
     transition-all duration-1000 ease-in-out
     flex flex-col place-content-center
     ${isScroll && 'bg-black/90'}
     `}>
                <div className={`max-w-[1100px] 
      mx-auto w-full text-white relative gap-x-8
        flex place-content-between h-full`}>
                    {/** left */}
                    <div className={`font-bold font-sans 
          flex place-items-center text-2xl w-fit
           `}>
                        <DarkLogo />
                    </div>

                    {/** center */}
                    <div className={`hidden place-items-center
                     lg:flex  w-full`}>
                        <Link to={`/web/search`}>
                            Search
                        </Link>
                    </div>

                    {/** right */}
                    <div className={`flex place-items-center `}>
                        <div className={`flex place-items-center gap-4`}>
                            <UserMenu theme={"dark"} />
                            <Hamburger theme={"dark"} openNav={openNav} navBg={navBg} />
                        </div>
                    </div>
                </div>

            </div>
            <MobileNav
                showNav={showNav}
                closeNav={closeNav}
            />
        </div>
    )

}