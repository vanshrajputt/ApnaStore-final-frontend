import React from 'react'
import PageTitle from '../Components/PageTitle'
import About from '../Components/About'
import Features from '../Components/Features'
import Reviews from '../Components/Reviews'
import FaqQuestions from '../Components/Faq-Questions'


export default function AboutPages() {
    return (
        <>
            <PageTitle title="About Us" description="Welcome to ApnaStore — your trusted destination for quality products at great prices. We bring convenience, variety, and value together to make your shopping simple and enjoyable." />
            <About />
            <Features />
            <Reviews />
            <FaqQuestions />
        </>
    )
}
