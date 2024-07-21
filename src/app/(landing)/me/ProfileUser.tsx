'use client'
import { useAppContext } from '@/app/AppProvider'
import React from 'react'

const ProfileUser = () => {

    const {sessionToken} = useAppContext()
    console.log("🚀 ~ ProfileUser ~ sessionToken:", sessionToken)
  return (
    <div>ProfileUser</div>
  )
}

export default ProfileUser