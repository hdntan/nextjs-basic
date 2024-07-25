'use client'
import authApiRequest from '@/apiRequest/auth'
import { Button } from '@/components/ui/button'
import { handleErrorApi } from '@/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

const ButtonLogout = () => {

    const route = useRouter()
    const pathname = usePathname()

const handleLogout = async () => {
    try {
        await authApiRequest.logoutFromNextClientToNextServer();
        route.push('/login')
    } catch (error) {
        handleErrorApi({error});
        authApiRequest.logoutFromNextClientToNextServer(true).then(() => {
          route.push(`/login?redirectFrom=${pathname}`);
        });
    }
}

  return (
    <Button size={'sm'} onClick={handleLogout}>Logout</Button>
  )
}

export default ButtonLogout