import { z } from "zod";

export const CreateProductSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(10000),
  image: z.string().url(),
  price: z.coerce.number().positive(),
});

export type CreateProductType = z.infer<typeof CreateProductSchema>;

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
  image: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export const ProductRes = z.object({
  data: ProductSchema,
  message: z.string(),
});

export type ProductResType = z.TypeOf<typeof ProductRes>;

export const ProductListRes = z.object({
  data: z.array(ProductSchema),
  message: z.string(),
});

export type ProductListResType = z.infer<typeof ProductListRes>;

export const UpdateProductBody = CreateProductSchema
export type UpdateProductBodyType = CreateProductType
