import React from 'react'
import { motion } from 'framer-motion'

const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1.5,
            staggerChildren: 0.2
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        
    },
}


const getCardData = () => {
    
    return [
        {
            imageSrc: `/images/landing-icon-wand.png`,
            title: "Verified & Trusted Listings",
            description: "Our directory features only trustworthy, verified businesses—backed by real reviews and community ratings. Build connections with confidence.",
        },
        {
            imageSrc: `/images/landing-icon-calendar.png`,
            title: "Browse with Ease",
            description: "Seamlessly explore a wide range of businesses across industries and locations. Our platform is built to help you navigate and connect effortlessly.",
        },
        {
            imageSrc: `/images/landing-icon-heart.png`,
            title: "Smarter Business Discovery",
            description: "Discover reliable businesses and services with advanced search capabilities and verified insights. We make connecting easier and more secure.",
        },
    ]
}


const DiscoverSection = () => {
  return (
      <motion.div
          initial="hidden"
          whileInView={"visible"}
          viewport={{ once: true}}
          variants={containerVariants}
          className={`py-12 bg-white mb-16 text-black`}
      >
          <div className={`max-w-6xl xl:max-w-[1000px]
            mx-auto px-6 sm:px-8 lg:px-12 xl:px-0 `}>
              <motion.div
                  variants={itemVariants}
                  className={`my-12 text-center`}
              >
                  <h2 className={`text-3xl font-bold
                    leading-tight text-gray-800`}>
                      Quickly Find the Right Business
                  </h2>
                  <p className={`mt-4 text-xl text-gray-600`}>
                      Powerful Filters to Narrow Your Search!
                  </p>
                  <p className={`mt-2 text-gray-500
                    max-w-4xl mx-auto`}>
                      Easily locate the exact type of business or service you need using our intelligent and intuitive filtering system. Save time and connect with the right professionals!
                  </p>
              </motion.div>
              <div className={`grid grid-cols-1 md:grid-cols-3
                gap-8 lg:gap-12 xl:gap-16 text-center`}>
                  {
                      getCardData().map((card:any, index:any) => {
                          return <motion.div key={index}
                          variants={itemVariants}>
                              <DiscoverCard
                                  {...card}
                              />
                          </motion.div>
                      })
                  }
              </div>
          </div>
          
    </motion.div>
  )
}


const DiscoverCard = ({
    imageSrc,
    title,
    description
}: {
    imageSrc: string,
    title: string,
    description: string
    }) => {
    return <div className={`px-4 py-12 shadow-lg rounded-lg bg-gray-50 md:h-72`}>
        <div className={`bg-gray-700 p-[0.6rem] rounded-full mb-4 h-10
            w-10 mx-auto`}>
            <img
                src={imageSrc}
                alt={title}
                width={30}
                height={30}
                className={`w-full h-full`}
            />
        </div>
        <h3 className={`mt-4 text-xl font-mediium text-gray-800`}>
            {title}
        </h3>
        <p className={`mt-2 text-base text-gray-500`}>
            {description}
        </p>
        
    </div>
}


export default DiscoverSection
