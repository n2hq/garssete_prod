import { useEffect, useRef, useState } from "react"
import { BiChevronLeft, BiChevronRight } from "react-icons/bi"
import SearchBox from "~/components/content/SearchBox"

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