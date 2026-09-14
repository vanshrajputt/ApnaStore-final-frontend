import React from 'react'
import PageTitle from '../Components/PageTitle'
import FaqQuestions from '../Components/Faq-Questions'

export default function FaqPage() {
    return (
        <>
            <PageTitle title="Frequenty Asked Questions" description={"Find answers to common questions about ApnaStore — from orders and payments to shipping and returns. Our FAQ section helps you shop with clarity and confidence."} />
            <FaqQuestions />
        </>
    )
}
