import React, { useEffect, useState } from 'react'
import PageTitle from '../Components/PageTitle'
import { getMainCategory } from "../Redux/ActionCreators/MainCategoryActionCreators"
import { getSubCategory } from "../Redux/ActionCreators/SubCategoryActionCreators"
import { getBrand } from "../Redux/ActionCreators/BrandActionCreator"
import { getProduct } from "../Redux/ActionCreators/ProductActionCreator"
import { useDispatch, useSelector } from 'react-redux'
import SingleProduct from '../Components/SingleProduct'
import { spawn } from 'redux-saga/effects'
const color = ["White", "Black", "Blue", "Red", "Orange", "Yellow", "Green", "Purple", "Pink", "Gray", "Navy Blue", "N/A"]
const size = ["XXXL", "XXL", "XL", "L", "MD", "SM", "XS", "NB", "24", "26", "28", "30", "32", "34", "36", "38", "40", "42", "44", "46"]

export default function Shoppage() {
  let [data, setData] = useState([])
  let [selected, setSelected] = useState({
    maincategory: [],
    subcategory: [],
    brand: [],
    color: [],
    size: [],

  })
  let [sortFilter, setsortFilter] = useState("1")
  let [search, setSearch] = useState("")
  let [min, setMin] = useState(-1)
  let [max, setMax] = useState(-1)



  let MaincategoryStateData = useSelector((state) => state.MaincategoryStateData)
  let SubcategoryStateData = useSelector((state) => state.SubcategoryStateData)
  let BrandStateData = useSelector((state) => state.BrandStateData)
  let ProductStateData = useSelector((state) => state.ProductStateData)

  let dispatch = useDispatch()
  function getSelection(key, value) {
    let arr = selected[key]
    if (arr.includes(value))
      arr = arr.filter(x => x !== value)
    else
      arr.push(value)
    setSelected({ ...selected, [key]: arr })
    setSearch("")
    filterData({ ...selected, [key]: arr })
  }
  function filterData(selected) {

    let data = ProductStateData.filter(x => x.status && (
      (selected.maincategory.length === 0 || selected.maincategory.includes(x.maincategory?.name)) &&
      (selected.subcategory.length === 0 || selected.subcategory.includes(x.subcategory?.name)) &&
      (selected.brand.length === 0 || selected.brand.includes(x.brand?.name)) &&
      (selected.size.length === 0 || selected.size.includes(x.size)) &&
      (selected.color.length === 0 || (new Set(selected.color)).intersection(new Set(x.color)).size)
      &&
      (selected.size.length === 0 || (new Set(selected.size)).intersection(new Set(x.size)).size)
    ))
    applySortFilter(sortFilter, data)
  }
  function postSearch() {
    setSelected({
      maincategory: [],
      subcategory: [],
      brand: [],
      color: [],
      size: [],


    })

    let ch = search.toLocaleLowerCase() // small me bhi search krege to result aajyga 
    let data = ProductStateData.filter(x => x.status && (
      x.name?.toLocaleLowerCase().includes(ch) ||
      x.maincategory?.name?.toLowerCase().includes(ch) ||
      x.subcategory?.name?.toLowerCase().includes(ch) ||
      x.brand?.name?.toLowerCase().includes(ch) ||
      x.description?.toLowerCase().includes(ch)
    ))
    applySortFilter(sortFilter, data)
  }
  function postPricefilter(e) {
    e.preventDefault()
    if (search === "")
      postSearch()
    else
      filterData(selected)


  }

  function applySortFilter(sortFilter, data) {
    setsortFilter(sortFilter)
    if (min !== -1) {
      data = data.filter(x => x.finalPrice >= min && x.finalPrice <= max)
    }
    if (sortFilter === "1")
      setData(data.sort((x, y) => y._id.localeCompare(x._id)))

    else if (sortFilter === "2")
      setData(data.sort((x, y) => x.finalPrice - y.finalPrice))
    else
      setData(data.sort((x, y) => y.finalPrice - x.finalPrice))

  }

  useEffect(() => {
    (() => dispatch(getMainCategory()))()
  }, [MaincategoryStateData.length])

  useEffect(() => {
    (() => dispatch(getSubCategory()))()
  }, [SubcategoryStateData.length])

  useEffect(() => {
    (() => dispatch(getBrand()))()
  }, [BrandStateData.length])

  useEffect(() => {
    (() => {
      dispatch(getProduct())
      if (ProductStateData.length) {
        setData(ProductStateData.filter(x => x.status))
      }
    })()

  }, [ProductStateData.length])

  return (
    <>
      <PageTitle title="Shop" description="Discover a wide range of quality products at ApnaStore. Explore trending items, great deals, and everything you need in one place for a smooth and enjoyable shopping experience." />
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3">
            <ul className="list-group">
              <li className="list-group-item active" aria-current="true">Maincategory</li>
              {MaincategoryStateData.filter(x => x.status).map(item => {
                return <li key={item._id} onClick={() => getSelection('maincategory', item.name)} className='list-group-item '>{item.name} {selected.maincategory.includes(item.name) ? <span><i className='bi bi-check float-end'> </i></span> : null}</li>
              })}

            </ul>
            <ul className="list-group">
              <li className="list-group-item active" aria-current="true">Subcategory</li>
              {SubcategoryStateData.filter(x => x.status).map(item => {
                return <li key={item._id} onClick={() => getSelection('subcategory', item.name)} className='list-group-item '>{item.name} {selected.subcategory.includes(item.name) ? <span><i className='bi bi-check float-end'> </i></span> : null}</li>
              })}

            </ul>
            <ul className="list-group">
              <li className="list-group-item active" aria-current="true">Brand</li>
              {BrandStateData.filter(x => x.status).map(item => {
                return <li key={item._id} onClick={() => getSelection('brand', item.name)} className='list-group-item '>{item.name} {selected.brand.includes(item.name) ? <span><i className='bi bi-check float-end'> </i></span> : null}</li>
              })}

            </ul>
            <ul className="list-group">
              <li className="list-group-item active" aria-current="true">color</li>
              {color.map((item, index) => {
                return <li key={index} onClick={() => getSelection('color', item)} className='list-group-item '>{item} {selected.color.includes(item) ? <span><i className='bi bi-check float-end'> </i></span> : null}</li>
              })}

            </ul>
            <ul className="list-group">
              <li className="list-group-item active" aria-current="true">Size</li>
              {size.map((item, index) => {
                return <li key={index} onClick={() => getSelection('size', item)} className='list-group-item '>{item} {selected.size.includes(item) ? <span><i className='bi bi-check float-end'> </i></span> : null}</li>
              })}

            </ul>
            <ul className="list-group">
              <li className="list-group-item active" aria-current="true">Price Range</li>
              <form onSubmit={(e) => {
                e.preventDefault()
                postSearch()
              }}>
                <div className="row">
                  <div className="col-6 my-3">
                    <label>Min. Amoun</label>
                    <input type="text" name="min" onChange={(e) => setMin(e.target.value)} value={min === -1 ? "" : min} className='form-control border-primary' placeholder='Minimum' />
                  </div>
                  <div className="col-6 my-3">
                    <label>Max. Amoun</label>
                    <input type="text" name="max" onChange={(e) => setMax(e.target.value)} value={max === -1 ? "" : max} className='form-control border-primary' placeholder='Maximum' />
                  </div>
                  <div className="col-12 ">
                    <button type='submit' className='btn btn-primary w-100'> Apply</button>
                  </div>
                </div>

              </form>
            </ul>


          </div>

          <div className="col-lg-9">
            <div className="row">
              <div className="col-lg-8">
                <form onSubmit={postSearch}>
                  <div className="btn-group w-100">
                    <input type="search" name="search" onChange={(e) => setSearch(e.target.value)}
                      value={search} placeholder='Search Product By Name, Category, Color, Etc' className='form-control border-primary rounded-0' />
                    <button type='submit' className='btn btn-primary'>Search</button>
                  </div>
                </form>
              </div>
              <div className="col-lg-4">
                <select name="sortFilter" onChange={(e) => applySortFilter(e.target.value, data)} className='form-select border-primary'>
                  <option value="1">Latest</option>
                  <option value="2">Low to high</option>
                  <option value="3">high to Low</option>
                </select>
              </div>
            </div>
            <section id="services" className="services section">
              <div className="row gy-4">
                {data.map((item) => {
                  return <div key={item._id} className="col-lg-4 col-md-6">
                    <SingleProduct item={item} />
                  </div>
                })}
              </div>
            </section>

          </div>

        </div>
      </div>

    </>
  )
}
