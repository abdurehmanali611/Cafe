/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import CustomFormField, { formFieldTypes } from "@/components/customFormField";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Login } from "@/lib/actions";
import { login } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function Admin() {
    const router = useRouter()

    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof login>> ({
        resolver: zodResolver(login),
        defaultValues: {
            username: "",
            password: ""
        }
    })

    const onSubmit = async (data: z.infer<typeof login>) => {
      try {
        setLoading(true)
        await Login(data, router)
      } catch (error: any) {
        toast.error(`Error: ${error.message}`)
      }finally {
        form.reset()
        setLoading(false)
      }
    }
        
  return (
    <div className="flex flex-col items-center h-screen justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Authenticate to your account</CardDescription>
        </CardHeader>
        <CardContent>
            <form className="flex flex-col items-center" onSubmit={form.handleSubmit(onSubmit)}>
                <CustomFormField 
                name="username"
                control={form.control}
                fieldType={formFieldTypes.INPUT}
                label="Username:"
                placeholder="username"
                className="h-fit p-2 w-56 rounded-md"
                />
                <CustomFormField 
                name="password"
                control={form.control}
                fieldType={formFieldTypes.INPUT}
                label="Password:"
                type="password"
                placeholder="12345678"
                className="h-fit p-2 w-56 rounded-md"
                />
                <Button className="cursor-pointer mt-4 rounded-md w-full ml-3" type="submit">{loading ? "Loading..." : "Login"}</Button>
            </form>
        </CardContent>
      </Card>
    </div>
  );
}
