'use client'
import accountApiRequest from '@/apiRequest/account'
import { Button } from '@/components/ui/button'
import React, { useEffect } from 'react'

const ProfileUser = () => {

  const fetchProfile = async () => {
    const result = await accountApiRequest.meClient()
    console.log("🚀 ~ fetchProfile ~ result:", result)
  }
  useEffect(() => {
   
    fetchProfile()
  },[])
   
  return (
    <div>ProfileUser

      <Button onClick={fetchProfile}>Fetch profile</Button>
    </div>
  )
}

export default ProfileUser