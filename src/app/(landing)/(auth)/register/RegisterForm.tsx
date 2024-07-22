"use client";

import React from "react";
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
import {
  RegisterSchema,
  RegisterType,
} from "@/schemaValidations/auth.schema";
import { error } from "console";
import envConfig from "@/config";
import authApiRequest from "@/apiRequest/auth";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { clientSessionToken } from "@/lib/http";


const RegisterForm = () => {

  const { toast } = useToast();
  const route = useRouter();


  const form = useForm<RegisterType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // async function onSubmit(values: RegisterType) {
  //   // Do something with the form values.
  //   // ✅ This will be type-safe and validated.
  // const result = await authApiRequest.register(values)

  // toast({
  //   description: result.payload.message,
  // });
  
  // }

  
  async function onSubmit(values: RegisterType) {
    try {
      const result = await authApiRequest.register(values);
      toast({
        description: result.payload.message,
      });

      await authApiRequest.auth({ sessionToken: result.payload.data.token });
      // setSessionToken(result.payload.data.token);
      clientSessionToken.value = result.payload.data.token
      route.push("/me")
    } catch (error: any) {
      const errors = error.payload.errors as {
        field: string;
        message: string;
      }[];
      const status = error.status as number;

      if (status === 422) {
        errors.forEach((error) => {
          form.setError(error.field as "email" | "password", {
            type: "server",
            message: error.message,
          });
        });
      } else {
        toast({
          description: error.payload.message,
        });
      }
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
