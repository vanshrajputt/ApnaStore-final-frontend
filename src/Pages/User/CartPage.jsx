import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import PageTitle from '../../Components/PageTitle'

import { getCart, deleteCart, updateCart } from "../../Redux/ActionCreators/CartActionCreator"
import { getProduct } from "../../Redux/ActionCreators/ProductActionCreator"
export default function CartPage() {
    let [data, setData] = useState([])
    let [subtotal, setSubtotal] = useState(0)
    let [shipping, setShipping] = useState(0)
    let [total, setTotal] = useState(0)

    let CartStateData = useSelector(state => state.CartStateData)
    let ProductStateData = useSelector(state => state.ProductStateData)
    let dispatch = useDispatch()

    function deleteRecord(_id) {
        if (window.confirm("Are You Sure to Delete That Record : ")) {
            dispatch(deleteCart({ _id: _id }))
            setData(data.filter(x => x._id !== _id))
        }
    }

    function calculate(cart) {
        let subtotal = 0
        cart.forEach(element => subtotal += element.total)
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

    function updateRecord(option, _id) {
        let item = data.find(x => x._id === _id)
        let index = data.findIndex(x => x._id === _id)
        console.log(item)
        if ((item.stockQuantity === 0) || (option === "Dec" && item.quantity === 1) || (option === "Inc" && item.quantity === item.stockQuantity))
            return
        else if (option === "Dec") {
            item['quantity'] = item['quantity'] - 1
            item['total'] = item['total'] - item.product?.finalPrice
        }
        else {
            item['quantity'] = item['quantity'] + 1
            item['total'] = item['total'] + item.product?.finalPrice
        }
        data[index] = { ...item }
        setData(data)
        dispatch(updateCart({ ...item }))
        calculate(data)
    }

    useEffect(() => {
        dispatch(getCart())
        dispatch(getProduct())
    }, [])

    useEffect(() => {
        (() => {
            dispatch(getCart())
            if (CartStateData.length && ProductStateData.length) {
                let cart = CartStateData
                setData(cart)
                calculate(cart)
            }
        })()
    }, [CartStateData.length, ProductStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getProduct())
        })()
    }, [ProductStateData.length])
    return (
        <>
            <PageTitle title="Cart" description="Review your selected items, update quantities, and proceed to secure checkout easily from your Heritage Ally cart. Enjoy a smooth shopping experience with complete order transparency and convenience." />
            <div className="container">
                <>
                    {data.length ?
                        <>
                            <div className="table-responsive">
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Product</th>
                                            <th>Brand</th>
                                            <th>Color</th>
                                            <th>Size</th>
                                            <th>Stock</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map(item => {
                                            return <tr key={item._id}>
                                                <td>
                                                    <Link to={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.product?.pic[0]}`} target='_blank'>
                                                        <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.product?.pic[0]}`} height={70} width={90} alt="" />
                                                    </Link>
                                                </td>
                                                <td>{item.product?.name}</td>
                                                <td>{item.product?.brand?.name}</td>
                                                <td>{item?.color}</td>
                                                <td>{item?.size}</td>
                                                {/* <td>{item.product?.stockQuantity ? `${item.stockQuantity} Left In Stock` : 'Out Of Stock'}</td> */}
                                                <td>
                                                    {Number(item.product?.stockQuantity) > 0
                                                        ? `${item.product.stockQuantity} Left In Stock`
                                                        : 'Out Of Stock'
                                                    }
                                                </td>
                                                <td>&#8377;{item.product?.finalPrice}</td>
                                                <td>
                                                    <div className="btn-group" style={{ width: 130 }}>
                                                        <button className='btn btn-primary' onClick={() => updateRecord('Dec', item._id)}><i className='bi bi-dash'></i></button>
                                                        <h4 className='w-50 text-center'>{item.quantity}</h4>
                                                        <button className='btn btn-primary' onClick={() => updateRecord('Inc', item._id)}><i className='bi bi-plus'></i></button>
                                                    </div>
                                                </td>
                                                <td>&#8377;{item.total}</td>
                                                <td>{localStorage.getItem("role") === "Super Admin" ? <button className='btn btn-danger' onClick={() => deleteRecord(item._id)}><i className='bi bi-trash'></i></button> : null}</td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div className="row">
                                <div className="col-lg-6"></div>
                                <div className="col-lg-6">
                                    <table className='table table-bordered'>
                                        <tbody>
                                            <tr>
                                                <th>Subtotal</th>
                                                <td>&#8377;{subtotal}</td>
                                            </tr>
                                            <tr>
                                                <th>Shipping</th>
                                                <td>&#8377;{shipping}</td>
                                            </tr>
                                            <tr>
                                                <th>Total</th>
                                                <td>&#8377;{total}</td>
                                            </tr>
                                            <tr>
                                                <th colSpan={2}>
                                                    {data.find(x => x.product?.stockQuantity === 0) ?
                                                        <p className='text-danger'>One Or More Products in Your Cart Are Out Of Stock, Please Remove Them to Proceed to Checkout</p> : <Link to="/checkout" className='btn btn-primary w-100'>Proceed to Checkout</Link>}
                                                </th>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </> :
                        <div className='text-center my-5'>
                            <h4>No Items in Cart</h4>
                            <Link to="/shop" className='btn btn-primary'>Shop Now</Link>
                        </div>
                    }
                </>
            </div>
        </>
    )
}
