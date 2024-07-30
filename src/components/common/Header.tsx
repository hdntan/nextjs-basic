import accountApiRequest from "@/apiRequest/account";
import ButtonLogout from "@/components/common/ButtonLogout";
import { ModeToggle } from "@/components/custome/ModeToggle";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

const Header = async () => {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;
  let user = null;

  if (sessionToken) {
    const data = await accountApiRequest.me(sessionToken);
    user = data.payload.data;
    console.log("🚀 ~ Header ~ user:", user);
  }
  return (
    <div className="flex gap-3 items-center justify-end py-3 px-9">
      <ul className="flex gap-3">
        <li>
          <Link href={"/product"}>
            <div className="font-bold"> Product</div>
          </Link>
        </li>

        {user ? (
          <>
            <li>
              <div>Xin chao {user?.name}</div>
            </li>
            <li>
              <ButtonLogout />
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href={"/login"}>
                <p className="font-bold"> Login</p>
              </Link>
            </li>

            <li>
              <Link href={"/register"}>
                <p className="font-bold"> Register</p>
              </Link>
            </li>
          </>
        )}
      </ul>

      <ModeToggle />
    </div>
  );
};

export default Header;
