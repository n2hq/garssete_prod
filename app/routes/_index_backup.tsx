import type { MetaFunction } from "@remix-run/node";
import ResponsiveNav from "~/components/header/transparent/ResponsiveNav";
import Home from "./home/Home";
import Hero from "./home/Hero";
import SearchBox from "~/components/content/SearchBox";
import { GiDrippingKnife, GiKnifeFork, GiStarGate } from "react-icons/gi";
import { CgShoppingCart } from "react-icons/cg";
import { BiBullseye, BiChevronLeft, BiChevronRight, BiHome, BiSpa } from "react-icons/bi";
import { FaCarSide } from "react-icons/fa";
import { MdRealEstateAgent } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { RiRestaurantFill } from "react-icons/ri";
import { Link } from "@remix-run/react";
import UserMenu from "~/components/header/usermenu/UserMenu";
import Hamburger from "~/components/header/Hamburger";
import MobileNav from "~/components/header/MobileNav";
import Footer from "~/components/footer/Footer";
import { WhiteLogo } from "~/components/header/WhiteLogo";
import Recents from "./home/Recents";


export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div>
      {/** header nav */}
      <HeaderNav />
      <HomepageHero />
      <Recents
        category={'services'}
        limit={8}
        title={`Recent Listings`}
        subtitle={"Recent businesses or entities added by date."}
      />
      <FrontPageCategories />
      <Footer />
    </div>
  );
}


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
     ${isScroll && 'bg-black/50'}
     `}>
        <div className={`max-w-[1100px] 
      mx-auto w-full text-white 
        flex place-content-between h-full gap-x-8`}>
          {/** left */}
          <div className={`font-bold font-sans 
          flex place-items-center text-2xl`}>
            <WhiteLogo />
          </div>

          {/** center */}
          <div className={`hidden place-items-center
          w-full lg:flex`}>
            <Link to={`/web/search`}>
              Search
            </Link>
          </div>

          {/** right */}
          <div className={`flex place-items-center`}>
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

const heroimgs = [
  {
    img: "images/dubai7star.jpeg"
  },
  {
    img: "https://r4.wallpaperflare.com/wallpaper/791/501/238/new-york-city-buildings-wallpaper-51351344a10dae2b3cd90e3cb71d503d.jpg"
  },
  {
    img: "https://c0.wallpaperflare.com/path/494/492/40/signage-brand-cyan-yellow-5d1465fafe2d1f3e8deff1bbe07c71ce.jpg"
  }
]
export const HomepageHero = () => {
  const [currentSlide, setCurrentSlide] = useState<any>(0)
  const slideStep = useRef(0)
  const counter = useRef(0)
  let slideIncrement = 0
  const [slides, setSlides] = useState<any | null>(null)

  let timeoutId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setSlides(heroimgs)
  }, [])

  const prev = () => {
    setCurrentSlide((currentSlide: any) => {
      return (currentSlide === 0) ? slides.length - 1 : currentSlide - 1
    })
  }

  const next = () => {
    setCurrentSlide((currentSlide: any) => {
      return (currentSlide === slides.length - 1) ? 0 : currentSlide + 1
    })
  }

  const handleNext = async () => {


    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    next();

    timeoutId.current = setTimeout(() => {
      //next();
      handleNext(); // Continue the loop if needed
    }, 15000);
  }

  const handlePrev = async () => {


    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    prev();

    timeoutId.current = setTimeout(() => {
      next();
      //handleNext(); // Continue the loop if needed
    }, 15000);
  }

  useEffect(() => {

    const startSlide = async (slides: any) => {
      if (slides !== null) {
        const cnt = slides.length
        for (let i = 0; i < cnt; i++) {
          timeoutId = await new Promise((resolve) => setTimeout(resolve, 15000));
          next()
          if (i == slides.length - 1) {
            startSlide(slides)
          }
        }
      }
    }

    if (slides) {
      startSlide(slides)
    }

  }, [slides])

  return (
    <>
      <div className={`relative`}>
        <div className={` w-full h-[300px] md:h-[500px] flex 
          overflow-hidden z-0
          `}>
          {
            slides?.map((slide: any, index: any) => {

              return (
                <img
                  key={index}
                  src={slide.img}
                  alt=""
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  className={`object-cover w-full h-full 
                      block flex-shrink-0 flex-grow-0 transition-transform
                      ease-in-out duration-1000`}
                />
              )
            })
          }
        </div>

        <div className={`w-full h-[70%]
          absolute z-[200] top-0
          bg-gradient-to-b
     from-black/60 to-transparent`}></div>

        <div className={`z-[300]`}>
          <button onMouseDown={handlePrev} className={`block absolute top-0 bottom-0 
                                                  z-[300] p-[1rem] cursor-pointer left-0 group h-full 
                                                        transition duration-1000 ease-in-out`}>
            <div className={`w-[50px] h-[50px] bg-white/60 rounded-full 
            place-content-center place-items-center group-hover:bg-white/30
            z-[300] transition duration-500 ease-in-out relative top-[100px]`}>
              <BiChevronLeft className=' stroke-white fill-black w-[2rem] h-[2rem]' />
            </div>

          </button>
          <button onMouseDown={handleNext} className={`block absolute top-0 bottom-0 
                                                        z-[300]    p-[1rem] cursor-pointer right-0 group 
                                                             transition duration-1000 ease-in-out`}>
            <div className={`w-[50px] h-[50px] bg-white/60 rounded-full 
            flex place-content-center place-items-center group-hover:bg-white/30
            z-[300]   transition duration-500 ease-in-out
            relative top-[100px]`}>
              <BiChevronRight className=' stroke-white fill-black w-[2rem] h-[2rem]' />
            </div>
          </button>
        </div>
        <div className={`z-100 absolute top-0 w-full h-[300px] md:h-[500px] 
          flex place-content-center place-items-center px-[15px]`}>
          <div
            className={` 
          max-w-[800px] mx-auto w-full z-[300]`}
          >
            <SearchBox />
          </div>
        </div>
      </div>
    </>
  )
}

const categories = [
  {
    title: "Restaurants",
    link: "/web/search?q=restaurants",
    icon: <RiRestaurantFill />
  },
  {
    title: "Shopping",
    link: "/web/search?q=shopping",
    icon: <CgShoppingCart />
  },
  {
    title: "Nightlife",
    link: "/web/search?q=nightlife",
    icon: <GiStarGate />
  },
  {
    title: "Active Life",
    link: "/web/search?q=nightlife",
    icon: <BiBullseye />
  },
  {
    title: "Beauty & Spa",
    link: "/web/search?q=beauty and spa",
    icon: <BiSpa />
  },
  {
    title: "Automotive",
    link: "/web/search?q=automotive",
    icon: <FaCarSide />
  },
  {
    title: "Home Services",
    link: "/web/search?q=home service",
    icon: <BiHome />
  },
  {
    title: "Real Estate",
    link: "/web/search?q=real estate",
    icon: <MdRealEstateAgent />
  }
]
export const FrontPageCategories = () => {
  return (
    <div className={`w-full relative mt-[50px] px-[15px]`}>
      <div className={`max-w-[1100px] mx-auto w-full`}>
        <div className={`relative font-sans text-2xl
        text-center font-black mb-8 border-b pb-5
        tracking-tight`}>
          Categories
        </div>

        <div className={`grid grid-cols-2 gap-5
          sm:grid-cols-3 sm:gap-8
          lg:grid-cols-4 lg:gap-10`}>
          {categories.map((category, index) => {
            return (
              <div key={index}>
                <Link to={`${category.link}`}>
                  <div className={`border-[1px] h-[140px] md:h-[200px]
                rounded hover:cursor-pointer border-gray-300
                hover:shadow-none flex flex-col
               place-items-center place-content-center
               gap-y-0 shadow-lg`}>
                    <div className={`text-[30px] w-12 h-12 rounded-full
                  flex place-items-center place-content-center
                  bg-gray-100`}>
                      {
                        category.icon
                      }
                    </div>
                    <div className={`text-base font-semibold
                  text-gray-500`}>
                      {
                        category.title
                      }
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
