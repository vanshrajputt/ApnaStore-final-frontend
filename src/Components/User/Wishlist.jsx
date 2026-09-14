import React, { useEffect, useState } from 'react'
import { getWishlist, deleteWishlist } from "../../Redux/ActionCreators/WishlistActionCreator"
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Wishlist() {
  let [data, setData] = useState([])
  let WishlistStateData = useSelector(state => state.WishlistStateData)
  let dispatch = useDispatch()
  function deleteItem(id) {
    if (window.confirm("Are You Sure To Delete Item")) {
      dispatch(deleteWishlist({ _id: id }))
      setData(data.filter(x => x._id !== _id))
    }

  }

  useEffect(() => {
    (() => {
      dispatch(getWishlist())
      if (WishlistStateData.length) {
        // setData(WishlistStateData.filter(x => x.user === localStorage.getItem("userid")))
        setData(WishlistStateData)
      }
    })()

  }, [WishlistStateData.length])
  return (
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
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.map(item => {
                  return <tr key={item._id}>
                    <td>
                      <Link to={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.product?.pic}`} target='_blank'>
                        <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.product?.pic}`} height={70} width={50} alt="" />
                      </Link>
                    </td>
                    <td>{item.product?.name}</td>
                    <td>{item.product?.brand?.name}</td>
                    <td>{item.product?.color.join(" , ")}</td>
                    <td>{item.product?.size.join(" , ")}</td>
                    <td>{item.product?.stockQuantity}</td>
                    <td>&#8377;{item.product?.finalPrice}</td>
                    <td><Link to={`/product/${item.product?._id}`} className='btn btn-primary'><i className='bi bi-cart-check'></i></Link></td>
                    <td> <button className='btn btn-danger' onClick={() => deleteItem(item._id)}> <i className='bi bi-trash '></i></button></td>
                  </tr>
                })}
              </tbody>
            </table>
          </div>
        </> :
        <div className='text-center my-5'>
          <h4>No Item in Wishlist</h4>
          <Link to="/shop" className='btn btn-primary'>Shop Now</Link>
        </div>
      }

    </>
  )
}
