import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSetting } from "../Redux/ActionCreators/SettingActionCreator"
import { Link } from 'react-router-dom'

export default function PageTitle({title,description}) {
  let SettingStateData = useSelector(state => state.SettingStateData)
        let dispatch = useDispatch()
        let [settingData, setSettingData] = useState({
          siteName: import.meta.env.VITE_APP_SITE_NAME,
          
        })
        useEffect(() => {
          (() => {
            dispatch(getSetting())
            if (SettingStateData.length) {
              let obj = []
              Object.keys(settingData).forEach((x => {
                obj.push([x, SettingStateData[0][x] ? SettingStateData[0][x] : settingData[x]])
      
      
              }))
              setSettingData(Object.fromEntries(obj))
      
            }
          })()
      
      
        }, [SettingStateData.length])
  return (
    <>
    <div className="page-title">
      <div className="heading">
        <div className="container">
          <div className="row d-flex justify-content-center text-center">
            <div className="col-lg-8">
              <h1 className="heading-title">{title}</h1>
              <p className="mb-0">
               {description.replaceAll("ApnaStore",settingData.siteName)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <nav className="breadcrumbs">
        <div className="container">
          <ol>
            <li><Link to="/">Home</Link></li>
            <li className="current">{title}</li>
          </ol>
        </div>
      </nav>
    </div>
    </>
  )
}
