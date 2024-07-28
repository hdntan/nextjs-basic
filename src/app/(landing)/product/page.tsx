import productApiRequest from "@/apiRequest/product";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductPage = async () => {
  const { payload } = await productApiRequest.getList();
  const ListProduct = payload?.data;

  return (
    <div>
      <div>
        <Link href={"/product/add"}>
        <Button>Add product</Button>
        </Link>
        <div>List product</div>
        <div className="space-y-5">
          {ListProduct.map((item) => (
            <div key={item.id} className="flex space-x-5">
              <Image
                src={item.image}
                alt={item.name}
                width={180}
                height={180}
                className="w-32 h-32 object-cover"
              />
              <h3>{item.name}</h3>
              <div>{item.price}</div>
              <div className="flex space-x-2">
                <Link href={`product/${item.id}`} key={item.id}>
                  <Button variant={"outline"}>Edit</Button>
                </Link>
                <Button variant={"destructive"}>Delete</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
