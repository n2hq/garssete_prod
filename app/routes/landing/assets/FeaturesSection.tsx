import React from 'react'
import { motion } from 'framer-motion'
import { Link } from '@remix-run/react'

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

const getFeatures = () => {

    return [
        {
            imageSrc: `/images/landing-search3.png`,
            title: "List Your Business",
            description: "Create a detailed listing with your services, contact details, and branding. Let the world know what makes your business unique.",
            linkText: "Sign In",
            linkHref: "/web/signin"
        },
        {
            imageSrc: `/images/landing-search${2}.png`,
            title: "Connect with Partners",
            description: "Our global directory connects you with international clients, investors, and collaborators who are actively searching for businesses like yours.",
            linkText: "Sign up",
            linkHref: "/web/signup"
        },
        {
            imageSrc: `/images/landing-search${1}.png`,
            title: "Grow Beyond Borders",
            description: "Gain visibility in new markets and watch your business thrive. With more eyes on your listing, the potential for growth is limitless.",
            linkText: "Discover",
            linkHref: "/web/browse"
        }
    ]
}

const FeaturesSection = () => {
    return (
        <motion.div
            initial="hidden"
            whileInView={"visible"}
            viewport={{ once: true }}
            variants={containerVariants}
            className={`py-24 px-6 sm:px-8 lg:px-12
            xl:px-16 bg-white`}
        >
            <div className={`max-w-4xl xl:max-w-[1000px]
            mx-auto`}>
                <motion.div
                    variants={itemVariants}
                    className={`my-12 text-center`}
                >
                    <h2 className={`text-3xl font-bold
                        leading-tight text-gray-800`}>
                        Discover
                    </h2>
                    <p className={`mt-4 text-xl text-gray-600`}>
                        Attract Global Opportunities Today!
                    </p>
                    <p className={`mt-2 text-gray-500
                        max-w-4xl mx-auto`}>
                        Quickly list your business and get discovered by potential clients and partners worldwide. Our intuitive platform helps your business stand out and grow without barriers. Start your journey today!
                    </p>
                </motion.div>
                <div className={`grid grid-cols-1 md:grid-cols-3
                gap-8 lg:gap-12 xl:gap-16`}>
                    {
                        getFeatures().map((feature: any, index: any) => {
                            return <motion.div key={index}
                                variants={itemVariants}>
                                <FeatureCard
                                    imageSrc={feature.imageSrc}
                                    title={feature.title}
                                    description={feature.description}
                                    linkText={feature.linkText}
                                    linkHref={feature.linkHref}
                                />
                            </motion.div>
                        })
                    }
                </div>
            </div>
        </motion.div>
    )
}

export default FeaturesSection


const FeatureCard = ({
    imageSrc,
    title,
    description,
    linkText,
    linkHref
}: {
    imageSrc: string,
    title: string,
    description: string,
    linkText: string,
    linkHref: string
}) => {
    return <div className={`text-center`}>
        <div className={`p-4 rounded-lg mb-4 flex items-center justify-center h-48 `}>
            <img
                src={imageSrc}
                alt={title}
                width={400}
                height={400}
                className={`w-full h-full object-contain`}
            />
        </div>
        <h3 className={`text-xl font-semibold mb-2`}>
            {title}
        </h3>
        <p className={`mb-4 `}>
            {description}
        </p>
        <Link to={linkHref}
            className={`inline-block border border-gray-300 rounded px-4 py-2 hover:bg-gray-100`}
            preventScrollReset
        >
            {linkText}
        </Link>
    </div>
}
