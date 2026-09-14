import React from 'react'
import PageTitle from '../../Components/PageTitle'
import { Link } from 'react-router-dom'


export default function OrderConfirmation() {
    return (
        <>
            <PageTitle title="Order Has Been Placed" description="Your order has been confirmed successfully! Thank you for choosing ApnaStore. We are preparing your items for shipment and will keep you updated on your order status." />
            <div className="container">
                <div className="card p-5 text-center confirmation-card">
                    <h1 className="text-danger display-1">
                        <i className="fa-solid fa-circle-check"></i>
                    </h1>

                    <h1>Thank You...</h1>
                    <h2>Your Order Has Been Placed</h2>
                    <h3>You Can Track Order in Profile Page</h3>

                    <div className="btn-group w-50 m-auto">
                        <Link to="/shop" className="btn btn-success">
                            Shop More
                        </Link>
                        <Link to="/profile?option=Orders" className="btn btn-primary">
                            Profile Page
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
