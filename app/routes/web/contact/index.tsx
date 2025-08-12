import React from 'react'
import { appConfig } from '~/lib/lib'
import Layout from '~/routes/asset/NormalLayout'
import VerticalHeight from '~/routes/asset/VerticalHeight'
import CallToActionSection from '~/components/content/CallToActionSection'
import FooterSection from '~/routes/landing/assets/FooterSection'

const index = () => {
    return (
        <Layout>
            <div className={`max-w-[1000px] mx-auto w-full mt-[30px]`}>
                <div className={`grid md:grid-cols-12 gap-4 `}>
                    <div className={` md:col-span-7  px-[15px]`}>
                        <InfoContact />
                    </div>
                    <div className={`md:col-span-5`}>

                    </div>
                </div>

            </div>
            <VerticalHeight />
            <CallToActionSection />
            <FooterSection />
        </Layout>
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
                Welcome to <strong data-start="283" data-end="302">Garssete</strong>. We're glad to have you here! To ensure a safe and positive experience for everyone, we kindly ask that you review our terms and privacy policy.
            </p>
            <hr data-start="487" data-end="490" />
            <h3 data-start="492" data-end="522">
                <strong data-start="496" data-end="522">
                    Our contact
                </strong>
            </h3>
            <p data-start="739" data-end="965">
                Please use the following links below to contact us. We will reply within 24 hours of your request. Most times we respond almost immediately.
            </p>
            <hr data-start="709" data-end="712" />
            <ul>
                <li>support@garssete.com</li>
                <li>https://x.com/garssete</li>
                <li>https://facebook.com/garssete</li>
            </ul>

            <hr data-start="709" data-end="712" />
            <h3 data-start="492" data-end="522">
                <strong data-start="496" data-end="522"
                    className={`text-lg text-blue-500 underline`}
                >
                    Claim Your Business
                </strong>
            </h3>
            <p data-start="272" data-end="485">
                Please sign up and then send an email to <strong>support@garssete.com</strong> to claim your business for free!
            </p>
            <ul>
                <li>
                    <strong>Email:</strong>
                    <span className={`underline`}>support@garssete.com</span>
                </li>

            </ul>



        </div>
    )
}
