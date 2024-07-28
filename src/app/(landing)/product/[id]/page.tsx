import productApiRequest from "@/apiRequest/product";
import ProductForm from "@/app/(landing)/product/components/ProductFrom";
import React from "react";

const ProductDetail = async ({ params }: { params: { id: string } }) => {
  let product = null;

  try {
    const { payload } = await productApiRequest.getDetail(Number(params.id));
    product = payload.data;
  } catch (error) {
    console.log("🚀 ~ ProductDetail ~ error:", error);
  }

  return <div>
    {!product && <div>Khong tim thay san pham</div>}
    {product && <ProductForm product={product}/>}</div>;
};

export default ProductDetail;
