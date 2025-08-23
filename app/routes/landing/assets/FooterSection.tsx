import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faFacebookSquare,
    faInstagram,
    faTwitterSquare,
    faLinkedin,
    faYoutubeSquare,
    faAudible
} from '@fortawesome/free-brands-svg-icons'
import { Link } from '@remix-run/react'
import { FaBriefcase, FaMap, FaMobile, FaQuestion, FaVoicemail } from 'react-icons/fa'
import { FaBagShopping } from 'react-icons/fa6'

const socials = [
    {
        title: "Facebook",
        url: "http://facebook.com/garssete",
        icon: faFacebookSquare
    },
    {
        title: "Instagram",
        url: "http://instagram.com/garssete",
        icon: faInstagram
    },
    {
        title: "Twitter",
        url: "http://x.com/garssete",
        icon: faTwitterSquare
    },
    {
        title: "Linkedin",
        url: "https://www.linkedin.com/company/garssete",
        icon: faLinkedin
    },
    {
        title: "Youtube",
        url: "https://www.youtube.com/@Garssete",
        icon: faYoutubeSquare
    }
]


const ftrLinks = [
    {
        title: "About Us",
        url: "/web/about",
        icon: faAudible
    },
    {
        title: "Contact Us",
        url: "/web/contact",
        icon: FaMobile
    },
    {
        title: "FAQ",
        url: "/web/faq",
        icon: FaQuestion
    },
    {
        title: "Terms",
        url: "/web/terms",
        icon: FaBagShopping
    },
    {
        title: "Privacy",
        url: "/web/privacy",
        icon: FaBriefcase
    }
]


const FooterSection = () => {
    return (
        <footer className='border-t border-gray-200 py-20'>
            <div className={`max-w-6xl mx-auto px-6 sm:px-8`}>
                <div className='flex flex-col md:flex-row justify-between
              items-center
              '>
                    <div className='mb-8'>
                        <Link to={`/`}
                            className={`text-xl font-bold tracking-tighter`}
                            preventScrollReset
                        >
                            GARSSETE
                        </Link>
                    </div>
                    <nav className={`mb-8`}>
                        <ul className='flex flex-col text-center space-y-6 md:flex-row md:space-x-6 md:space-y-0'>

                            {
                                ftrLinks.map((link: any, index: any) => {
                                    return (
                                        <li key={index}>
                                            <Link to={link.url}>
                                                {link.title}
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </nav>
                    <div className={`flex space-x-4 mb-8`}>
                        {
                            socials.map((media: any, index: any) => {
                                return <a key={index} href={media?.url} target='_blank'
                                    aria-label={media.title}
                                    className='hover:text-primary-600'
                                >
                                    <FontAwesomeIcon icon={media.icon}
                                        className='h-6 w-6'
                                    />
                                </a>
                            })
                        }

                    </div>
                </div>

                <hr />
                <div className={`mt-8 text-center text-sm text-gray-500 flex md:justify-center space-x-4 flex-col md:flex-row`}>
                    <span>
                        @Garssete. All rights reserved.
                    </span>
                    {/* <div className={`md:space-x-4 flex flex-col gap-y-5 mt-6 md:flex-row md:mt-[0px]`}>
                      <Link to={"/privacy"}>
                        Privacy Policy
                    </Link>
                    <Link to={"/terms"}>
                        Terms of  Service
                    </Link>
                    <Link to={"/cookies"}>
                        Cookie Policy
                    </Link>
                  </div> */}
                </div>
            </div>
        </footer>
    )
}

export default FooterSection
