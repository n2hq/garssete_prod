import { useEffect, useRef, useState } from "react"
import { BiChevronLeft, BiChevronRight } from "react-icons/bi"
import SearchBox from "~/components/content/SearchBox"

const heroimgs = [

    {
        img: "/images/hero/man_with_reading_glasses.jpg"
    },
    {
        img: "/images/hero/mobile_device.jpg"
    },
    {
        img: "/images/hero/business_man.jpg"
    },
    {
        img: "/images/hero/realtor_in_dark.jpg"
    },
    {
        img: "/images/hero/lady_eating.jpg"
    },
    {
        img: "/images/hero/bedroom_furniture.jpg"
    },
    {
        img: "/images/hero/perfume.jpg"
    }
]
export const HomepageHero = () => {
    const [currentSlide, setCurrentSlide] = useState<any>(0)
    const slideStep = useRef(0)
    const counter = useRef(0)
    let slideIncrement = 0
    const [slides, setSlides] = useState<any | null>(null)

    let timeoutId = useRef<NodeJS.Timeout | null>(null);

    const handleTouchStart = (e: any) => {
        slideStep.current = e.touches[0].clientX;
    }

    const handleTouchEnd = (e: any) => {
        const endX = e.changedTouches[0].clientX;
        const deltaX = slideStep.current - endX;

        if (deltaX > 50) {
            // swipe left
            setCurrentSlide((i: any) => (i + 1) % heroimgs.length);
        } else if (deltaX < -50) {
            // swipe right
            setCurrentSlide((i: any) => (i - 1 + heroimgs.length) % heroimgs.length);
        }
    };


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
            //handleNext(); // Continue the loop if needed
        }, 15000);
    }

    const handlePrev = async () => {


        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
        }

        prev();

        timeoutId.current = setTimeout(() => {
            //next();
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
          overflow-hidden  bg-black z-[20]
          `}>
                    {
                        slides?.map((slide: any, index: any) => {

                            return (
                                <div

                                    key={index}
                                    className={`w-full h-full block 
                                        flex-shrink-0 flex-grow-0 
                                        transition-transform
                                        ease-in-out relative z-[20]
                                        duration-1000 cursor-pointer`
                                    }
                                    onTouchStart={handleTouchStart}
                                    onTouchEnd={handleTouchEnd}

                                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}

                                >
                                    <img

                                        key={index}
                                        src={slide.img}
                                        alt=""

                                        className={`object-cover w-full h-full 
                      block flex-shrink-0 flex-grow-0 transition-transform
                      ease-in-out duration-1000 z-[10] opacity-[70%] `}
                                    />
                                </div>
                            )
                        })
                    }
                </div>

                {/* <div className={`w-full h-[30%]
          absolute z-[200] top-0
          bg-gradient-to-b bg-blue-50
     from-black/60 to-transparent`}
                    onClick={() => { alert('hhe') }}
                ></div> */}

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

                <div className={` absolute top-0 w-full h-full
          flex place-content-center place-items-center px-[15px]`}>
                    <div
                        className={` 
          max-w-[800px] mx-auto w-full z-[100]`}
                    >
                        <div className={`text-center text-5xl text-white
                            font-extralight mb-[0px] tracking-wide font-poppins`}>
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