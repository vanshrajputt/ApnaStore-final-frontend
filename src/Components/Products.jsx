import React, { useEffect, useState } from 'react'
import { getMainCategory } from "../Redux/ActionCreators/MainCategoryActionCreators"
import { getProduct } from "../Redux/ActionCreators/ProductActionCreator"
import { useDispatch, useSelector } from 'react-redux'
import SingleProduct from './SingleProduct'
import { useParams } from 'react-router-dom'


export default function Products() {
  let [data, setData] = useState([])
  let [selected, setSelected] = useState("")
  
  let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
  let ProductStateData = useSelector(state => state.ProductStateData)
  let dispatch = useDispatch()
 
  useEffect(() => {
    (() => {
      dispatch(getProduct())
      setData(ProductStateData.filter(x => x.status)) // jinka staus true hoga vhi aayge 
    })()
  }, [ProductStateData.length])

  useEffect(() => {
    (() =>
      dispatch(getMainCategory()))()
  }, [MaincategoryStateData.length])
  return (
    <section id="services" className="services section">

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row">
          <div className="col-xl-12 m-auto mb-3">
            <div className="btn-group w-100">
              <button onClick={() => setSelected("")} className={` w-100 btn ${selected == "" ? 'btn btn-primary' : ''}`}>All</button>
              {MaincategoryStateData.filter(x => x.status && ProductStateData.filter(p=>p.maincategory?.name===x.name).length).map((item, index) => {
                return <button onClick={() => setSelected(item.name)} className={` w-100 btn ${selected === item.name ? 'btn btn-primary' : 'btn-ligth'}`} style={{ width: 150 }} key={index}>{item.name}</button>
              })}
            </div>
          </div>
        </div>

        <div className="row gy-4">
          {data.filter(x => selected === "" || selected === x.maincategory?.name).slice(0, 18).map((item, index) => {
            return  <div key={item._id} className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
              <SingleProduct item={item} />
            </div>
          })}

        </div>

      </div>

    </section>
  )
}


