import React from 'react'
import { motion } from 'framer-motion'
import { useLocation } from '@remix-run/react';

const HeroSection = () => {
  const location = useLocation()
  const params = new URLSearchParams(location.search);
  const query = params.get("q") || "";

  return (
    <div className={`relative h-screen w-full`}>
      <img
        src={`/images/landing-splash.jpg`}
        alt="Garssete Business Directory Platform"
        className={`object-cover object-center w-full h-full`}
      />

      <div className={`absolute inset-0 bg-gradient-to-b from-black/80 to-black/20`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`absolute top-1/3 transform -translate-x-1/2 -tralsate-y-1/2 text-center w-full`}
        >
          <div className={`max-w-5xl mx-auto px-[20px] sm:px-12`}>
            <h1 className={`text-4xl md:text-[35px] font-bold text-white mb-6 leading-[1.2em]`}>
              Garssete Business Directory. Connect Your Business to the World
            </h1>
            <p className={`font-sans text-lg text-white mb-8 font-normal leading-[1.2em] px-[20px]`}>
              Get Discovered Worldwide. List Your Business for Free and Reach Global Partners Instantly!
            </p>
            <form
              action='/web/search'
              className={`flex justify-center`}>
              <input
                type='text'
                defaultValue={query}
                name='q'
                placeholder='Search by city, neighbourhood or address'
                className='w-full max-w-lg rounded-none outline-none
                              rounded-l border-none bg-white h-12 px-4 text-[14px]'
              />
              <button
                onClick={() => { }}
                className={`bg-gray-300 text-black rounded-none px-4
                                rounded-r border-none hover:bg-red-300 h-12`}
              >
                Search
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default HeroSection
