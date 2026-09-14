import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';

import SingleProduct from './SingleProduct';
import { Autoplay } from 'swiper/modules';


export default function ProductSlider({ maincategory, data }) {
    let options = {
        slidesPerView: 'auto',
        spaceBetween: 10,
        loop: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        breakpoints: {    // responsive laypout 
            640: {
                slidesPerView: 1,
                spaceBetween: 0,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
        },

        modules: [Autoplay,]



    }
    return (
        <section id="services" className="services section">
            <div className="container">
                {maincategory === "Related Products" ?
                    <h4>Other Related Products</h4> :
                    <h4 className='text-center'>CheckOut Latest Product Of <span className='text-primary'>{maincategory}</span></h4>
                }
                <Swiper {...options} >
                    {

                        data.map((item, index) => {
                            return <SwiperSlide key={index}>
                                <SingleProduct item={item} />
                            </SwiperSlide>

                        })
                    }

                </Swiper>
            </div>
        </section>
    )
}



