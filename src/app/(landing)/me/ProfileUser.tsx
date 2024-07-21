'use client'
import { useAppContext } from '@/app/AppProvider'
import React from 'react'

const ProfileUser = () => {

    const {sessionToken} = useAppContext()
   
  return (
    <div>ProfileUser</div>
  )
}

export default ProfileUser