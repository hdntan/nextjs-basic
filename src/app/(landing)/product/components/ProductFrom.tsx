"use client";

import React, { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginSchema, LoginType } from "@/schemaValidations/auth.schema";
import { useToast } from "@/components/ui/use-toast";
import authApiRequest from "@/apiRequest/auth";
import { useRouter } from "next/navigation";
import { handleErrorApi } from "@/lib/utils";
import {
  CreateProductSchema,
  CreateProductType,
  ProductResType,
} from "@/schemaValidations/product.schema";
import Image from "next/image";
import productApiRequest from "@/apiRequest/product";

type Product = ProductResType["data"];

const ProductForm = ({ product }: { product?: Product }) => {
  const { toast } = useToast();
  const route = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  const form = useForm<CreateProductType>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      name: product?.name ?? "",
      description: product?.description ?? "",
      image: product?.image ?? "",
      price: product?.price ?? 0,
    },
  });

  const image = form.watch("image");

  const handleCreateProduct = async (values: CreateProductType) => {
    if (loading) return;
    setLoading(true);
    try {
      console.log("🚀 ~ onSubmit ~ values:", values);

      const formData = new FormData();
      formData.append("file", file as Blob);

      const uploadImageResult = await productApiRequest.uploadImage(formData);
      const imgUrl = uploadImageResult.payload?.data;
      const result = await productApiRequest.create({
        ...values,
        image: imgUrl,
      });

      toast({
        description: result.payload.message,
      });
      route.push("/product");
      route.refresh();
    } catch (error: any) {
      handleErrorApi({ error, setError: form.setError });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProduct = async (_values: CreateProductType) => {
    if (!product) return;

    setLoading(true);
    let values = _values;
    try {
      console.log("🚀 ~ onSubmit ~ values:", values);
      if (file) {
        const formData = new FormData();
        formData.append("file", file as Blob);

        const uploadImageResult = await productApiRequest.uploadImage(formData);
        const imgUrl = uploadImageResult.payload?.data;
        values = { ...values, image: imgUrl };
      }

      const result = await productApiRequest.update(product?.id, values);

      toast({
        description: result.payload.message,
      });
      route.refresh();

    } catch (error: any) {
      handleErrorApi({ error, setError: form.setError });
    } finally {
      setLoading(false);
    }
  };

  async function onSubmit(values: CreateProductType) {

    if(product) {
      handleUpdateProduct(values);
    }
    else {
      handleCreateProduct(values);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (error) => {
          console.log(error);
        })}
        className="space-y-3 w-[700px] flex-shrink-0"
        noValidate
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  placeholder="shadcn"
                  onChange={(e) => {
                    const file = e.target?.files?.[0];
                    if (file) {
                      setFile(file);
                      field.onChange(`http://localhost:3000/${file.name}`);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {(file || image) && (
          <div className="mt-3">
            <Image
              src={file ? URL.createObjectURL(file) : image}
              alt={"preview"}
              width="200"
              height="200"
              className="object-cover"
            />
            <Button
              type="button"
              variant={"destructive"}
              size={"sm"}
              onClick={() => {
                setFile(null);
                form.setValue("image", "");
                if (inputRef.current) {
                  inputRef.current.value = "";
                }
              }}
            >
              Delete
            </Button>
          </div>
        )}

        <Button type="submit" disabled={loading}>
          {product ? "Update" : "Create"}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
