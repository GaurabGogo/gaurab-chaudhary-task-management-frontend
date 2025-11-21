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

import { useRegisterMutation } from "@/redux/services/auth/auth-api";
import handleApiError from "@/utils/handleApiError";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import * as z from "zod";
import FormInput from "../common/FormInput";
import Logo from "../Header/Logo";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Full Name is required",
  }),
  email: z.string().email({
    message: "Email is invalid",
  }),
  password: z.string().min(6, {
    message: "Password is required",
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function SignUpForm() {
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [register] = useRegisterMutation();

  const onSubmit = async (values: FormData) => {
    try {
      await register(values).unwrap();
      setIsMessageDialogOpen(true);
      form.reset();
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage, {
        description: new Date().toLocaleString(),
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="mb-6 flex items-center space-x-2">
          <Logo />
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl font-normal text-gray-900">
            Welcome to{" "}
            <span className="font-semibold text-sky-400">Task Manager</span>
          </h1>
          <p className="text-sm text-gray-600">Create your account</p>
        </div>
      </div>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name*</FormLabel>
                <FormControl>
                  <FormInput {...field} placeholder="John Doe" />
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
                <FormLabel>Email*</FormLabel>
                <FormControl>
                  <FormInput {...field} placeholder="johndoe@example.com" />
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
                <FormLabel>Password*</FormLabel>
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
            className="w-full bg-sky-400 hover:bg-sky-500"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>
      </Form>
      <div className="flex w-full items-center justify-center">
        <span className="text-center text-xs text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="text-sky-400 hover:underline">
            Sign In
          </Link>
        </span>
      </div>

      <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
        <DialogHeader>
          <DialogTitle className="sr-only">Success!</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <div className="flex flex-col gap-6">
            <h2 className="text-center text-xl font-bold">
              Account Created Successfully!
            </h2>
            <Link href="/login">
              <Button
                variant="default"
                size="lg"
                className="mx-auto flex items-center justify-center gap-2"
              >
                <ArrowLeft className="h-5 w-5" />
                Back to Login
              </Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
