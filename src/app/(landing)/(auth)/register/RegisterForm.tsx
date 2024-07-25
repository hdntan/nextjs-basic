"use client";

import React, { useState } from "react";
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
import { RegisterSchema, RegisterType } from "@/schemaValidations/auth.schema";
import authApiRequest from "@/apiRequest/auth";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { handleErrorApi } from "@/lib/utils";

const RegisterForm = () => {
  const { toast } = useToast();
  const route = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

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
    if (loading) return;
    setLoading(true);
    try {
      const result = await authApiRequest.register(values);

      await authApiRequest.auth({
        sessionToken: result.payload.data.token,
        expiresAt: result.payload.data.expiresAt,
      });
      toast({
        description: result.payload.message,
      });
      route.push("/me");
    } catch (error: any) {
      handleErrorApi({ error, setError: form.setError });
    } finally {
      setLoading(false);
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
        <Button type="submit" disabled={loading}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
