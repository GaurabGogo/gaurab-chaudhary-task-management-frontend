"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useLoginMutation } from "@/redux/services/auth/auth-api";
import handleApiError from "@/utils/handleApiError";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as z from "zod";
import FormInput from "../common/FormInput";
import Logo from "../Header/Logo";
import { Separator } from "../ui/separator";

const formSchema = z.object({
  email: z.string().email({
    message: "Email is invalid",
  }),
  password: z.string().min(6, {
    message: "Password is required",
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function AuthForm() {
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [login] = useLoginMutation();

  const onSubmit = async (values: FormData) => {
    try {
      await login({
        email: values.email,
        password: values.password,
      }).unwrap();
      toast.success("Login Successful", {
        description: new Date().toLocaleString(),
      });
      router.push("/");
    } catch (error) {
      const errMessage = handleApiError(error);
      toast.error(errMessage, {
        description: new Date().toLocaleString(),
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="mb-6 ml-[-5px] flex items-center space-x-2">
          <Logo />
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl font-normal text-gray-900">
            Welcome to{" "}
            <span className="font-semibold text-sky-400">Task Manager</span>
          </h1>
          <p className="text-sm text-gray-600">
            Welcome Back. Please login
            <br />
            to your account.
          </p>
        </div>
      </div>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <FormInput {...field} placeholder="email" />
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
                  <FormInput
                    {...field}
                    variant="password"
                    placeholder="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Signing In..." : "Sign In"}
          </Button>
          <Separator />
        </form>
      </Form>

      <div className="flex w-full items-center justify-center">
        <span className="text-center text-xs text-gray-500">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-sky-400 hover:underline">
            Sign Up
          </Link>
        </span>
      </div>
    </div>
  );
}
