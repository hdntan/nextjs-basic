import envConfig from "@/config";
import React from "react";
import { cookies } from "next/headers";
import accountApiRequest from "@/apiRequest/account";
import ProfileUser from "@/app/(landing)/me/ProfileUser";
import ProfileForm from "@/app/(landing)/me/ProfileForm";

export default async function ProfilePage() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");

  const result = await accountApiRequest.me(sessionToken?.value ?? "");

  return <div>
    {/* {result?.payload?.data?.name} */}
  {/* <ProfileUser/> */}
  <ProfileForm profile={result?.payload?.data}/>
  </div>;
}
