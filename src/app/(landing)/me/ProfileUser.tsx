'use client'
import accountApiRequest from '@/apiRequest/account'
import React, { useEffect } from 'react'

const ProfileUser = () => {


  useEffect(() => {
    const fetchProfile = async () => {
      const result = await accountApiRequest.meClient()
      console.log("🚀 ~ fetchProfile ~ result:", result)
    }
    fetchProfile()
  },[])
   
  return (
    <div>ProfileUser</div>
  )
}

export default ProfileUser