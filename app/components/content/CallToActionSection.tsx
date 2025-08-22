import React from 'react'
import { motion } from 'framer-motion'
import { Link } from '@remix-run/react'

const CallToActionSection = () => {
    return (
        <div className={`relative bg-black h-[300px] min-h-[300px]`}>
            <img src={`/images/landing-call-to-action.jpg`} alt=""
                className={`object-cover w-full h-full`}
            />
            <div className={`absolute inset-0 bg-black bg-opacity-60 flex place-content-center `}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`relative max-w-10xl xl:max-w-12xl
                    px-6 sm:px-8 lg:px-12 xl:px-16 py-12 flex place-items-center`}
                >
                    <div className={`flex flex-col md:flex-row justify-between
                    items-center text-center md:gap-20`}>
                        <div className={`mb-6 md:mb-0 md:mr-10 `}>
                            <h2 className={`text-2xl font-bold text-white`}>
                                Sign up. Get access to global and local businesses.
                            </h2>
                        </div>
                        <div>
                            <p className={`text-white mb-3`}>
                                Explore a wide network of businesses and services tailored to your location and industry needs.
                            </p>
                            <div className={`flex justify-center md:justify-start gap-4`}>
                                <Link

                                    className={`inline-block text-primary-700 bg-white rounded-lg 
                                    px-6 py-3 font-semibold hover:bg-primary-500 hover:text-primary-50`}
                                    to="/web/browse"
                                >
                                    Browse
                                </Link>
                                <Link
                                    to="/web/signup"
                                    className={`inline-block text-white bg-red-700 rounded-lg 
                                    px-6 py-3 font-semibold hover:bg-red-500 hover:text-primary-50`}
                                >
                                    Sign up
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

        </div>
    )
}

export default CallToActionSection
