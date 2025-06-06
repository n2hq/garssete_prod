import { useEffect, useRef, useState } from "react"
import { BiChevronLeft, BiChevronRight } from "react-icons/bi"
import SearchBox from "~/components/content/SearchBox"

const heroimgs = [
    {
        img: "https://smartmag.theme-sphere.com/rtl/wp-content/uploads/sites/34/2022/11/Depositphotos_410258952_XL-1.jpg"
    },
    {
        img: "https://smartmag.theme-sphere.com/news/wp-content/uploads/sites/11/2021/02/daniel-korpai-seLBnDRB6_M-unsplash-1-scaled.jpg"
    },
    {
        img: "https://demo.tagdiv.com/newspaper_free_news_pro/wp-content/uploads/2023/12/3.jpg"
    },
    {
        img: "https://demo.tagdiv.com/newspaper_free_news_pro/wp-content/uploads/2023/12/2.jpg"
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
            //startSlide(slides)
        }

    }, [slides])

    return (
        <>
            <div className={`relative`}>
                <div className={` w-full h-screen flex 
          overflow-hidden z-0 bg-black
          `}>
                    {
                        slides?.map((slide: any, index: any) => {

                            return (
                                <img
                                    onClick={() => { alert('here') }}
                                    key={index}
                                    src={slide.img}
                                    alt=""
                                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                                    className={`object-cover w-full h-full 
                      block flex-shrink-0 flex-grow-0 transition-transform
                      ease-in-out duration-1000 z-[10] opacity-[70%] `}
                                />
                            )
                        })
                    }
                </div>

                <div className={`w-full h-[30%]
          absolute z-[200] top-0
          bg-gradient-to-b
     from-black/60 to-transparent`}></div>

                <div className={`z-[300]`}

                >
                    <button onMouseDown={handlePrev} className={`block absolute top-0 bottom-0 
                                                  z-[300] p-[1rem] cursor-pointer left-0 group h-full 
                                                        transition duration-1000 ease-in-out`}>
                        <div className={`w-[50px] h-[50px] bg-white/30 rounded-full 
            place-content-center place-items-center group-hover:bg-white/30
            z-[300] transition duration-500 ease-in-out relative `}>
                            <BiChevronLeft className=' stroke-white fill-black w-[2rem] h-[2rem]' />
                        </div>

                    </button>
                    <button onMouseDown={handleNext} className={`block absolute top-0 bottom-0 
                                                        z-[300]    p-[1rem] cursor-pointer right-0 group 
                                                             transition duration-1000 ease-in-out`}>
                        <div className={`w-[50px] h-[50px] bg-white/30 rounded-full 
            flex place-content-center place-items-center group-hover:bg-white/30
            z-[300]   transition duration-500 ease-in-out
            relative `}>
                            <BiChevronRight className=' stroke-white fill-black w-[2rem] h-[2rem]' />
                        </div>
                    </button>
                </div>

                <div className={`z-[100] absolute top-0 w-full h-full
          flex place-content-center place-items-center px-[15px]`}>
                    <div
                        className={` 
          max-w-[800px] mx-auto w-full z-[300]`}
                    >
                        <div className={`text-center text-5xl text-white
                            font-extralight mb-[0px]`}>
                            Find The Best Businesses
                        </div>
                        <div className={`text-center text-lg text-white
                            font-extralight mb-[20px]`}>
                            Across Different Industries Around the World
                        </div>
                        <SearchBox />
                    </div>
                </div>
            </div>
        </>
    )
}