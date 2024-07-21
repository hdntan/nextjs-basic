import envConfig from '@/config'
import React from 'react'
import { cookies } from 'next/headers'







export default  async function ProfilePage() {
    const cookieStore = cookies()
    const sessionToken = cookieStore.get('sessionToken');
  



 
    const result = await fetch(`${envConfig.NEXT_PUBLIC_API}/account/me`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionToken?.value}`,
        }
        
    }).then(async (res) => {
        const payload = await res.json();
        const data = {
            status: res.status,
            payload,
        }

        if (!res.ok) {
            throw data;
        }
        return data;
    })
    
    console.log("🚀 ~ getData ~ result:", result)
    
   
   
  return (
    <div>
       {result?.payload?.data?.name}
    </div>
  )
}
