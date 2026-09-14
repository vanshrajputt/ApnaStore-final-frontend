import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import PageTitle from '../../Components/PageTitle'

import { Link, useNavigate } from 'react-router-dom'

import { getCart, deleteCart } from "../../Redux/ActionCreators/CartActionCreator"
import { getProduct, updateProduct } from "../../Redux/ActionCreators/ProductActionCreator"
import { creatCheckout, getCheckout } from "../../Redux/ActionCreators/CheckoutActionCreator"



export default function CheckoutPage() {
    let [user, setUser] = useState([])
    let [selected, setSelected] = useState({
        deliveryAddress: {},
        paymentMode: "COD"
    })
    let [data, setData] = useState([])
    let [subtotal, setSubtotal] = useState(0)
    let [shipping, setShipping] = useState(0)
    let [total, setTotal] = useState(0)

    let CartStateData = useSelector(state => state.CartStateData)
    let ProductStateData = useSelector(state => state.ProductStateData)


    let dispatch = useDispatch()
    let navigate = useNavigate()

    // function placeOrder() {
    //     let item = {
    //         user: localStorage.getItem("userid"),
    //         deliveryAddress: selected.deliveryAddress,
    //         paymentMode: selected.paymentMode,
    //         orderStatus: "Order Has Been Placed",
    //         paymentstatus: "Pending",
    //         subtotal: subtotal,
    //         shipping: shipping,
    //         total: total,
    //         date: new Date(),
    //         products: data

    //     }
    //     console.log("FINAL CHECKOUT DATA:", item)
    //     dispatch(creatCheckout(item))
    //     data.forEach(cart => {
    //         let p = ProductStateData.find(x => x._id === cart.product?._id)
    //         p.stockQuantity = p.stockQuantity - cart.quantity
    //         p.stock = p.stockQuantity === 0 ? false : true
    //         dispatch(updateProduct(p))
    //         dispatch(deleteCart(cart))
    //     })
    //     navigate("/order-confirmation")

    // }

    function placeOrder() {
        let item = {
            user: localStorage.getItem("userid"),
            deliveryAddress: selected.deliveryAddress,
            paymentMode: selected.paymentMode,
            orderStatus: "Order Has Been Placed",
            paymentStatus: "Pending",
            subtotal: subtotal,
            shipping: shipping,
            total: total,
            date: new Date(),

            products: data.map(cart => ({
                product: cart.product?._id || cart.product,
                quantity: Number(cart.quantity),
                color: cart.color,
                size: cart.size,
                total: Number(cart.total)
            }))
        }

        console.log("FINAL CHECKOUT DATA:", item)

        dispatch(creatCheckout(item))

        data.forEach(cart => {
            let p = ProductStateData.find(
                x => x._id === (cart.product?._id || cart.product)
            )

            if (p) {
                p.stockQuantity =
                    Number(p.stockQuantity) - Number(cart.quantity)

                p.stock = p.stockQuantity > 0

                dispatch(updateProduct(p))
                dispatch(deleteCart(cart))
            }
        })
        if (selected.paymentMode === "COD")
            navigate("/order-confirmation")
        else
            navigate("/payment/-1")
    }
    function calculate(cartData) {
        let subtotal = 0

        cartData.forEach(element => {
            subtotal += element.total
        })

        if (subtotal > 0 && subtotal < 1000) {
            setShipping(150)
            setTotal(subtotal + 150)
        }
        else {
            setShipping(0)
            setTotal(subtotal)
        }

        setSubtotal(subtotal)
    }



    useEffect(() => {
        (() => {
            dispatch(getCart())
            if (CartStateData.length) {
                let cart = CartStateData
                setData(cart)
                calculate(cart)
            }
        })()

    }, [CartStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getProduct())

        })()

    }, [ProductStateData.length])

    // extraa

    useEffect(() => {
        let subtotal = 0

        data.forEach(item => {
            subtotal += Number(item.total)
        })

        setSubtotal(subtotal)

        if (subtotal > 0 && subtotal < 1000) {
            setShipping(150)
            setTotal(subtotal + 150)
        }
        else {
            setShipping(0)
            setTotal(subtotal)
        }

    }, [data])

    useEffect(() => {
        (async () => {
            let response = await fetch(
                `${import.meta.env.VITE_APP_BACKEND_SERVER}/user/${localStorage.getItem("userid")}`,
                {
                    method: "GET",
                    headers: {
                        "content-type": "application/json",
                        "authorization": localStorage.getItem("token")
                    }
                }
            )

            response = await response.json()

            if (response.result === "Done") {
                setUser(response.data)

                setSelected(prev => ({
                    ...prev,
                    deliveryAddress: response.data.address?.[0] || {}
                }))
            }
        })()
    }, [])

    return (
        <>
            <PageTitle title="Place Order" description="Complete your purchase securely on ApnaStore. Review your order, enter shipping details, choose a payment method, and place your order with confidence and ease." />
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <h5 className='bg-primary text-center p-2 text-light'>
                            Choose Delivery Address
                        </h5>
                        {user.address?.map((item, index) => {
                            return <div key={index} className="card p-2" onClick={() => setSelected({ ...selected, deliveryAddress: item })}>
                                <h6>{item.name},</h6>

                                <h6>{item.phone},{item.email}</h6>
                                <h6>{item.address}</h6>
                                <h6>{item.pin},{item.city},{item.state}</h6>
                                {selected.deliveryAddress.address === item.address ? <i className='bi bi-check fs-4 position-absolute end-0'></i> : null}
                            </div>
                        })}
                        <h5 className='bg-primary text-center p-2 text-light mt-3'>
                            Choose Payment Method
                        </h5>
                        <div>
                            <div className="card p-2" onClick={() => setSelected({ ...selected, paymentMode: "COD" })}>
                                <h5>Cash on delivery</h5>
                                {selected.paymentMode === "COD" ? <i className='bi bi-check fs-4 position-absolute end-0'></i> : null}
                            </div>
                            <div className="card p-2" onClick={() => setSelected({ ...selected, paymentMode: "Net Banking" })}>

                                <h5>Net Banking/Card/UPI</h5>
                                {selected.paymentMode === "Net Banking" ? <i className='bi bi-check fs-4 position-absolute end-0'></i> : null}
                            </div>

                        </div>


                    </div>

                    <div className="col-lg-6">
                        <h5 className='bg-primary text-center p-2 text-light'>
                            Product in Cart
                        </h5>

                        <div className="row">
                            {data.map((item, index) => (
                                <div className="col-md-6 mb-3" key={index}>
                                    <div className="card h-100">
                                        <Link
                                            to={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.product?.pic[0]}`}
                                            target="_blank"
                                        >
                                            <img
                                                src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.product?.pic[0]}`}
                                                className="card-img-top"
                                                style={{ height: "150px", objectFit: "cover" }}
                                                alt=""
                                            />
                                        </Link>

                                        <div className="card-body">
                                            <h5 className="card-title">{item.product?.name}</h5>
                                        </div>

                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item d-flex justify-content-between">
                                                <span>Brand : {item.product?.brand?.name}</span>
                                                <span>Size : {item.size}</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between">
                                                <span>Price : ₹{item.product?.finalPrice}</span>
                                                <span>Total : ₹{item.total}</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between">
                                                <span>Quantity : {item.quantity}</span>
                                                <span>Color : {item.color}</span>
                                            </li>


                                            <li className="list-group-item">
                                                <span>Stock:{item.product?.stockQuantity === 0 ? "Out Of Stock" : item.product?.stockQuantity}</span>

                                            </li>


                                        </ul>
                                    </div>
                                </div>
                            ))
                            }
                            <table className='table table-bordered'>
                                <tbody>
                                    <tr>
                                        <th>Subtotal</th>
                                        <td>₹{subtotal}</td>
                                    </tr>
                                    <tr>
                                        <th>Shipping</th>
                                        <td>₹{shipping}</td>
                                    </tr>
                                    <tr>
                                        <th>Total</th>
                                        <td>₹{total}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            {user.address?.length > 0 ?

                                                data.find(x => x.product?.stockQuantity === 0) ?
                                                    <p className='btn btn-danger text-center w-100'>One Or More Products in Your Cart Are Out Of Stock, Please Remove The Proceed To CheckOut</p>
                                                    : <div>


                                                        <button className='btn btn-primary w-100' onClick={placeOrder}>Place Order</button>

                                                    </div> :

                                                <Link to="/profile?option=Address " className='btn btn-primary w-100'>Create an delivery Address First</Link>

                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )

}
