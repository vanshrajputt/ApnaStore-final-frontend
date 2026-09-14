import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSetting } from "../Redux/ActionCreators/SettingActionCreator"
import PageTitle from '../Components/PageTitle'

export default function TermsAndConditionPolicyPage() {
  let SettingStateData = useSelector(state => state.SettingStateData)
    let dispatch = useDispatch()
    let [settingData, setSettingData] = useState({
        termsAndCondition: ""
      })
       useEffect(() => {
          dispatch(getSetting())
      
          if (SettingStateData.length) {
            setSettingData({
              termsAndCondition: SettingStateData[0].termsAndCondition || ""
            })
          }
        }, [SettingStateData.length])
  return (
   <>
   <PageTitle title="Terms And Condition" description="By using ApnaStore, you agree to our terms and conditions. These guidelines ensure a safe, fair, and smooth shopping experience for all users on our platform."/>
   <div className="container">
    <div dangerouslySetInnerHTML={{__html:settingData.termsAndCondition}}></div>
   </div>
   </>
  )
}
