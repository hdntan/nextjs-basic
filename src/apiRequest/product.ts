import http from "@/lib/http";
import {
  CreateProductType,
  ProductListResType,
  ProductResType,
  UpdateProductBodyType,
} from "@/schemaValidations/product.schema";

const productApiRequest = {
  getList: () => http.get<ProductListResType>("/products"),
  getDetail:(id:number) => http.get<ProductResType>(`/products/${id}`,{
    cache: 'no-store'
  }),
  create: (body: CreateProductType) =>
    http.post<ProductResType>("/products", body),
  update: (id: number, body: UpdateProductBodyType) => http.put<ProductResType>(`/products/${id}`, body),
  uploadImage: (body: FormData) =>
    http.post<{
      message: string;
      data: string;
    }>("/media/upload", body),
};

export default productApiRequest;
