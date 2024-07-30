import productApiRequest from "@/apiRequest/product";
import DeleteProduct from "@/app/(landing)/product/components/DeleteProduct";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductPage = async () => {
  const cookieStore = cookies();

  const isSessionToken = Boolean(cookieStore.get("sessionToken"));

  const { payload } = await productApiRequest.getList();
  const ListProduct = payload?.data;

  return (
    <div>
      <div>
        <Link href={"/product/add"}>
          {isSessionToken && <Button>Add product</Button>}
        </Link>
        <div>List product</div>
        <div className="space-y-5">
          {ListProduct.map((item) => (
            <div key={item.id} className="flex space-x-5">
              <Link href={`product/${item.id}`}>
              <Image
                src={item.image}
                alt={item.name}
                width={180}
                height={180}
                className="w-32 h-32 object-cover"
              />
              </Link>
            
              <h3>{item.name}</h3>
              <div>{item.price}</div>
              {isSessionToken && (
                <div className="flex space-x-2">
                  <Link href={`product/${item.id}/edit`} key={item.id}>
                    <Button variant={"outline"}>Edit</Button>
                  </Link>
                  <DeleteProduct product={item} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
