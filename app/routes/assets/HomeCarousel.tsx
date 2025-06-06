import { useEffect, useRef, useState } from "react"
import { BiChevronLeft, BiChevronRight } from "react-icons/bi"
import SearchBox from "~/components/content/SearchBox"

const heroimgs = [
    {
        img: "https://mediaoffice.ae/-/media/2025/february/09-02/04/9f895655-09cf-440c-ad2e-d0cd4f8542b0.jpg",
        title: "Discover Businesses Across the Globe",
        topTitle: "Discover. Connect. Grow"
    },
    {
        img: "https://spotlightthe.me/crush/wp-content/uploads/sites/17/demo-image-00015-3840x2048.jpg",
        title: "Connect with potential clients",
        topTitle: "Discover. Connect. Grow"
    },
    {
        img: "https://c0.wallpaperflare.com/path/494/492/40/signage-brand-cyan-yellow-5d1465fafe2d1f3e8deff1bbe07c71ce.jpg",
        title: "Grow Your Business",
        topTitle: "Discover. Connect. Grow"
    }
]
export const HomepageCarousel = () => {
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
                <div

                    className={` w-full h-[280px] md:h-[500px] flex 
          overflow-hidden z-[10]
          `}>
                    {
                        slides?.map((slide: any, index: any) => {

                            return (
                                <div
                                    key={index}
                                    className={`w-full h-full block 
                                        flex-shrink-0 flex-grow-0 
                                        transition-transform
                                        ease-in-out relative
                                        duration-1000 `
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
                                            z-[20]
                                        `}
                                    />

                                    <div className={`z-100 absolute top-0 w-full 
                h-[280px] md:h-[500px] flex place-content-center
                place-items-center px-[15px] bg-black/20`}>

                                    </div>

                                    <div className={`z-[300] absolute 
                                         w-full text-center top-[43%]
                                          text-white  
                                          py-[10px] `}>
                                        <div className={`max-w-[65%] mx-auto w-full
                                            `}>
                                            <div className={`text-[13px]`}>
                                                {slide.topTitle}
                                            </div>
                                            <div className={`text-[22px] mt-[0px]
                                            leading-[1.2em] font-bold`}>
                                                <div>
                                                    {slide.title}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            )
                        })
                    }
                </div>



                <div className={`z-[300]`}>
                    <button onMouseDown={handlePrev} className={`block absolute top-0 bottom-0 
                        z-[300] p-[1rem] cursor-pointer left-0 group h-full 
                            transition duration-1000 ease-in-out`}>
                        <div className={`w-[40px] h-[40px] bg-white/60 
                        rounded-full place-content-center place-items-center 
                        group-hover:bg-white/30z-[300]
                        transition duration-500 ease-in-out relative `}>
                            <BiChevronLeft className=' stroke-white fill-black w-[2rem] h-[2rem]' />
                        </div>

                    </button>
                    <button onMouseDown={handleNext} className={`block absolute top-0 bottom-0 
                                                        z-[300]    p-[1rem] cursor-pointer right-0 group 
                                                             transition duration-1000 ease-in-out`}>
                        <div className={`w-[40px] h-[40px] bg-white/60 rounded-full 
            flex place-content-center place-items-center group-hover:bg-white/30
            z-[300]   transition duration-500 ease-in-out
            relative `}>
                            <BiChevronRight className=' stroke-white fill-black w-[2rem] h-[2rem]' />
                        </div>
                    </button>
                </div>
                {/* <div className={`z-100 absolute top-0 w-full 
                h-[300px] md:h-[500px] flex place-content-center
                place-items-center px-[15px] bg-blue-200`}>
                    <div
                        className={`max-w-[800px] mx-auto w-full 
                            z-[300] text-white flex place-items-center
                            place-content-center font-bold text-[25px]
                            text-center leading-[1.2em]`}
                    >
                        Discover businesses globally.
                    </div>
                </div> */}
            </div>
        </>
    )
}