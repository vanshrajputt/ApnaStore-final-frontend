import React from 'react'
import PageTitle from '../Components/PageTitle'
import Features from '../Components/Features'
import FaqQuestions from '../Components/Faq-Questions'

export default function FeaturePage() {
    return (
        <>
            <PageTitle title="Our Features" description="Explore the standout features of ApnaStore — from high-quality products and affordable prices to fast delivery and secure payments, everything is designed to give you a smooth shopping experience." />
            <Features />
            <FaqQuestions />

        </>
    )
}
