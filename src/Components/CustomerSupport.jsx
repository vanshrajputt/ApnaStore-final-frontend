import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSetting } from "../Redux/ActionCreators/SettingActionCreator"

export default function CustomerSupport() {
  let SettingStateData = useSelector(state => state.SettingStateData)
  let dispatch = useDispatch()
  let [settingData, setSettingData] = useState({
    phone: import.meta.env.VITE_APP_PHONE,
    siteName: import.meta.env.VITE_APP_SITE_NAME,
    whatsapp: import.meta.env.VITE_APP_WHATSAPP,
  })
  useEffect(() => {
    (() => {
      dispatch(getSetting())
      if (SettingStateData.length) {
        setSettingData({
          phone: SettingStateData[0].phone || settingData.phone,
          siteName: SettingStateData[0].siteName || settingData.siteName,
           whatsapp: SettingStateData[0].whatsapp || settingData.whatsapp
        })

      }
    })()


  }, [SettingStateData.length])
  return (
    <>
      <section id="featured-departments" className="featured-departments section">


        <div className="container">
          <div className="emergency-banner" data-aos="fade-up" data-aos-delay="400">
            <div className="row align-items-center">
              <div className="col-lg-8">
                <div className="emergency-content">
                  <h3>Customer Care Services Available 24/7</h3>
                  <p>Customer Care Support in {settingData.siteName} ensures a smooth and reliable shopping experience for users. It provides assistance with orders, payments, returns, and product inquiries. Customers can reach support through chat, email, or phone. The system focuses on quick response, problem resolution,
                    and customer satisfaction to build trust and long-term relationships..</p>
                </div>
              </div>
              <div className="col-lg-4 text-lg-end">
                <a href={`tel:${settingData.phone}`} target='_blank'
                 className="emergency-btn mb-3">
                  <i className="bi bi-telephone-fill"></i>
                  
                 {settingData.phone}
                

                </a>
                <a href={`tel:${settingData.phone}`} target='_blank' className="emergency-btn">
                  <i className="bi bi-whatsapp"></i>
                  
                {settingData.whatsapp}
                

                </a>
                
              </div>
            </div>
          </div>
        </div>

      </section>
    </>
  )
}
