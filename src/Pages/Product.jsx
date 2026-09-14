import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import PageTitle from '../Components/PageTitle'
import ProductSlider from '../Components/ProductSlider'

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCube, Pagination, Autoplay } from 'swiper/modules';

import { getProduct, updateProduct } from "../Redux/ActionCreators/ProductActionCreator"
import { getCart, creatCart } from "../Redux/ActionCreators/CartActionCreator"
import { getWishlist, creatWishlist } from "../Redux/ActionCreators/WishlistActionCreator"
import { getTestimonial } from "../Redux/ActionCreators/TestimonialActionCreator"
import { current } from '@reduxjs/toolkit'
import Reviews from '../Components/Reviews'


export default function Product() {
    let { _id } = useParams()
    let [data, setData] = useState({})
    let [relatedData, setRelatedDtata] = useState([])
    let [selected, setSelected] = useState({
        qty: 1,
        color: "",
        size: ""

    })
    let [reviewStats, setReviewStats] = useState({
        reviews: [],
        total: 0,
        avg: 0,
        stats: [0, 0, 0, 0, 0]
    })

    let ProductStateData = useSelector(state => state.ProductStateData)
    let TestimonialStateData = useSelector(state => state.TestimonialStateData)

    let CartStateData = useSelector(state => state.CartStateData)
    let WishlistStateData = useSelector(state => state.WishlistStateData)

    let dispatch = useDispatch()
    let navigate = useNavigate()
    let options = {
        effect: 'cube',
        grabCursor: true,
        cubeEffect: {
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
        },
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        loop: true,
        pagination: true,
        modules: [EffectCube, Pagination, Autoplay],


    }

    function addToCart() {
        let item = CartStateData.find(
            x => String(x.product?._id || x.product) === String(_id)
        )

        if (!item) {
            let cartItem = {
                user: localStorage.getItem("userid"),
                product: _id,
                quantity: selected.qty,
                color: selected.color,
                size: selected.size,
                total: data.finalPrice * selected.qty
            }

            dispatch(creatCart(cartItem))

            dispatch(updateProduct({
                _id: data._id,
                stockQuantity: data.stockQuantity - selected.qty
            }))
        }

        navigate("/cart")
    }
    function addToWishlist() {
        // let item = WishlistStateData.find(x => x.user === localStorage.getItem("userid") && x.product === _id)
        let item = WishlistStateData.find(x => x.product?._id === _id)
        if (!item) {
            item = {
                user: localStorage.getItem("userid"),
                product: _id,



                //  Remove  all this line after real backend case
                // name: data.name,
                // color: data.color,
                // size: data.size,
                // brand: data.brand,
                // finalPrice: data.finalPrice,
                // stockQuantity: data.stockQuantity,
                // pic: data.pic[0],

            }
            dispatch(creatWishlist({ ...item }))

        }
        navigate("/profile?option=Wishlist")

    }

    useEffect(() => {
        (() => {
            dispatch(getProduct())
            if (ProductStateData.length) {
                let item = ProductStateData.find(x => x._id === _id)
                if (item) {
                    setData(item)
                    setSelected({ ...selected, color: item?.color[0], size: item.size[0] })
                    setRelatedDtata(ProductStateData.filter(x => x.maincategory?.name === item.maincategory?.name))

                }
                else
                    window.history.back()  // pichle url me chla jyga ye 
            }

        })()
    }, [ProductStateData.length, _id])

    useEffect(() => {
        (() => dispatch(getCart()))()
    }, [CartStateData.length])

    useEffect(() => {
        (() => dispatch(getWishlist()))()
    }, [WishlistStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getTestimonial())
            if (TestimonialStateData.length) {
                let reviews = TestimonialStateData.filter(x => x.product?._id === _id)

                let total = 0
                let count = [0, 0, 0, 0, 0]
                reviews.forEach(x => {

                    total = total + parseInt(x.star)
                    count[x.star - 1]++
                })

                let avg = (total / reviews.length).toFixed(1)
                setReviewStats({
                    reviews: reviews,
                    total: reviews.length,
                    avg: avg,
                    stats: count
                })
            }

        })()

    }, [TestimonialStateData.length])


    return (
        <>
            <PageTitle title={data.name} description={`${data.maincategory?.name} -> ${data.subcategory?.name} -> ${data.brand?.name}`} />

            <div className="container">
                <div className="row">
                    <div className="col-lg-6">

                        <Swiper {...options}>
                            {data.pic?.map((item, index) => {
                                return <SwiperSlide key={index}>
                                    <img style={{ width: "100%", height: 400 }} src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item}`} />
                                </SwiperSlide>
                            })}

                        </Swiper>
                    </div>
                    <div className="col-lg-6">
                        <table className='table table-bordered'>
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <td>{data.name}</td>
                                </tr>
                                <tr>
                                    <th>Maincategory</th>
                                    <td>{data.maincategory?.name}</td>
                                </tr>
                                <tr>
                                    <th>Subcategory</th>
                                    <td>{data.subcategory?.name}</td>
                                </tr>
                                <tr>
                                    <th>Brand</th>
                                    <td>{data.brand?.name}</td>
                                </tr>
                                <tr>
                                    <th>Color</th>
                                    <td>
                                        {data.color?.map((item, index) => {
                                            return <button key={index} onClick={() => setSelected({ ...selected, color: item })}
                                                style={{ width: 90 }} className={`btn ${selected.color === item ? 'btn-primary' : 'btn-light'}`}>{item}</button>
                                        })}
                                    </td>
                                </tr>

                                <tr>
                                    <th>Size</th>
                                    <td> {data.size?.map((item, index) => {
                                        return <button key={index} onClick={() => setSelected({ ...selected, size: item })}
                                            style={{ width: 90 }} className={`btn ${selected.size === item ? 'btn-primary' : 'btn-light'}`}>{item}</button>
                                    })}</td>
                                </tr>
                                <tr>
                                    <th>Stock</th>
                                    <td>{data.stockQuantity ? `${data.stockQuantity} Left in Stock` : `Out OF Stock`}</td>

                                </tr>
                                <tr>
                                    {data.stock ?
                                        <th colSpan={2}>
                                            <div className="row">
                                                <div className="col-4">
                                                    <div className="btn-group w-100">
                                                        <button className='btn btn-primary' onClick={() => setSelected({ ...selected, qty: selected.qty > 1 ? selected.qty - 1 : selected.qty })}><i className='bi bi-dash'></i></button>
                                                        <h4 className='w-50 text-center'>{selected.qty}</h4>
                                                        <button className='btn btn-primary' onClick={() => setSelected({ ...selected, qty: selected.qty < data.stockQuantity ? selected.qty + 1 : selected.qty })}><i className='bi bi-plus'></i></button>
                                                    </div>
                                                </div>
                                                <div className="col-8">
                                                    <div className="btn-group w-100">
                                                        <button className='btn btn-primary'><i className='bi bi-cart-plus' onClick={addToCart}></i>Add to cart</button>
                                                        <button className='btn btn-success'><i className='bi bi-heart' onClick={addToWishlist}></i>Add to Wishlist</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </th> :


                                        <th colSpan={2}>
                                            {/* <button className='btn btn-success'><i className='bi bi-heart' onClick={addToWishlist}></i>Add to Wishlist</button> */}
                                            <button className='btn btn-primary' onClick={addToCart}>
                                                <i className='bi bi-cart-plus'></i> Add to cart
                                            </button>
                                        </th>


                                    }
                                </tr>
                                <tr>
                                    <th>Description</th>
                                    <td>
                                        <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
                {reviewStats.total ?
                    <>
                        <h5>Reviews</h5>
                        <div className="row">
                            <div className="col-xl-3 col-sm-6">
                                <div className="card p-5">
                                    <h1>{reviewStats.avg}/{5}</h1>
                                    <p> Total Reviews: {reviewStats.total} </p>
                                </div>
                            </div>
                            <div className="col-xl-9 col-sm-6">
                                <div className="card p-5">
                                    <div className="row">
                                        <div className="col-3">5 Star ({reviewStats.stats[4]})</div>
                                        <div className="col-9">
                                            <div className="progress" role="progressbar" aria-label="Example with label">
                                                <div className="progress-bar"
                                                    style={{ width: ((reviewStats.stats[4] / reviewStats.total) * 100).toFixed(0) + "%" }}>
                                                    {((reviewStats.stats[4] / reviewStats.total) * 100).toFixed(0)}%
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-3">4 Star ({reviewStats.stats[3]})</div>
                                        <div className="col-9">
                                            <div className="progress" role="progressbar" aria-label="Example with label">
                                                <div className="progress-bar"
                                                    style={{ width: ((reviewStats.stats[3] / reviewStats.total) * 100).toFixed(0) + "%" }}>
                                                    {((reviewStats.stats[3] / reviewStats.total) * 100).toFixed(0)}%
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-3">3 Star ({reviewStats.stats[2]})</div>
                                        <div className="col-9">
                                            <div className="progress" role="progressbar" aria-label="Example with label">
                                                <div className="progress-bar"
                                                    style={{ width: ((reviewStats.stats[2] / reviewStats.total) * 100).toFixed(0) + "%" }}>
                                                    {((reviewStats.stats[2] / reviewStats.total) * 100).toFixed(0)}%
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-3">2 Star ({reviewStats.stats[1]})</div>
                                        <div className="col-9">
                                            <div className="progress" role="progressbar" aria-label="Example with label">
                                                <div className="progress-bar"
                                                    style={{ width: ((reviewStats.stats[1] / reviewStats.total) * 100).toFixed(0) + "%" }}>
                                                    {((reviewStats.stats[1] / reviewStats.total) * 100).toFixed(0)}%
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-3">1 Star ({reviewStats.stats[0]})</div>
                                        <div className="col-9">
                                            <div className="progress" role="progressbar" aria-label="Example with label">
                                                <div className="progress-bar"
                                                    style={{ width: ((reviewStats.stats[0] / reviewStats.total) * 100).toFixed(0) + "%" }}>
                                                    {((reviewStats.stats[0] / reviewStats.total) * 100).toFixed(0)}%
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {reviewStats.reviews.length ? <Reviews data={reviewStats.reviews} /> : null}
                    </> : null
                }

            </div>


            <ProductSlider maincategory="Related Products" data={relatedData} />
        </>
    )
}
