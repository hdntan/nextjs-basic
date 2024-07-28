import ButtonLogout from "@/components/common/ButtonLogout";
import { ModeToggle } from "@/components/custome/ModeToggle";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="flex gap-3 items-center justify-end py-3 px-9">
      <ul className="flex gap-3">

      <li>
          <Link href={"/product"}>
            <p className="font-bold"> Product</p>
          </Link>
        </li>

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
        
        <li>
          <ButtonLogout/>
        </li>
      </ul>

      <ModeToggle />
    </div>
  );
};

export default Header;
