import React from 'react'
import { appConfig } from '~/lib/lib'
import SearchLayoutMain from '~/routes/asset/SearchLayoutMain'
import VerticalHeight from '~/routes/asset/VerticalHeight'
import CallToActionSection from '~/components/content/CallToActionSection'
import FooterSection from '~/routes/landing/assets/FooterSection'
import FooterAlt from '~/components/footer/FooterAlt'
import SearchLayout from '~/routes/asset/SearchLayout'

const index = () => {
    return (
        <SearchLayout>
            <div className={`max-w-[1100px] mx-auto w-full mt-[30px]`}>
                <div className={`grid md:grid-cols-12 gap-4 `}>
                    <div className={` md:col-span-7  px-[15px]`}>
                        <InfoContact />
                    </div>
                    <div className={`md:col-span-5 w-full`}>

                    </div>
                </div>

            </div>
            <VerticalHeight />
            <VerticalHeight />
            <VerticalHeight />
            <FooterAlt />
        </SearchLayout>
    )
}

export default index

export const InfoContact = () => {
    return (
        <div className={`markdown prose dark:prose-invert w-full break-words light space-y-4 text-[13px]`}>

            <h2 data-start="208" data-end="235" className={`text-xl`}>
                <strong data-start="211" data-end="235"
                    className={`text-2xl`}
                >
                    Contact Us
                </strong>
            </h2>

            <p data-start="272" data-end="485">
                <strong data-start="283" data-end="302">Garssete.com</strong> Support and Technical team are  available Monday to Sunday, 09:00 to 18:00 Central European Time.
            </p>
            <hr data-start="487" data-end="490" />

            <p className={`text-lg underline`}>
                Garssete Support
            </p>

            <ul>
                <li className={`flex gap-4`}>
                    <span className={`font-bold`}>
                        Email:
                    </span>
                    <span>
                        support@garssete.com
                    </span>
                </li>

            </ul>

            <hr />
            <h3>
                <span
                    className={`text-xl text-blue-500 `}
                >
                    Claim Your Business
                </span>
            </h3>
            <p className={``}>
                To claim your business, please sign up and then send an email to <span>support@garssete.com</span>.
            </p>




        </div>
    )
}
