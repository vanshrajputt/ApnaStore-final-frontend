import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSetting } from "../Redux/ActionCreators/SettingActionCreator"
import PageTitle from '../Components/PageTitle'

export default function PrivacyPolicyPage() {
  let SettingStateData = useSelector(state => state.SettingStateData)
  let dispatch = useDispatch()
  // let [settingData, setSettingData] = useState({
  //   privacypolicy: import.meta.env.VITE_APP_SITE_NAME,

  // })
  
  let [settingData, setSettingData] = useState({
    privacyPolicy: ""
  })


  // useEffect(() => {
  //   (() => {
  //     dispatch(getSetting())
  //     if (SettingStateData.length) {
  //       setSettingData({ privacypolicy: SettingStateData[0].privacypolicy || settingData.privacypolicy })
  //       console.log(SettingStateData)
  //     }
  //   })()


  // }, [SettingStateData.length])


  useEffect(() => {
    dispatch(getSetting())

    if (SettingStateData.length) {
      setSettingData({
        privacyPolicy: SettingStateData[0].privacyPolicy || ""
      })
    }
  }, [SettingStateData.length])
  return (
    <>

      <PageTitle title="Privacy Policy" description="Your privacy matters at ApnaStore. We are committed to protecting your personal information and ensuring secure transactions while providing a safe and trustworthy shopping experience." />
      <div className="container">
        <div dangerouslySetInnerHTML={{ __html: settingData.privacyPolicy }}></div>
      </div>

    </>
  )
}
