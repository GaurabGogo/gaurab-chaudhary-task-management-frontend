"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Home, Lock, RefreshCw, Shield, User } from "lucide-react";
import Link from "next/link";

export default function UnauthorizedErrorComponent() {
  const handleLogin = () => {
    // Redirect to login page
    console.log("Redirecting to login...");
  };

  const handleSignUp = () => {
    // Redirect to signup page
    console.log("Redirecting to signup...");
  };

  const handleGoHome = () => {
    // Redirect to home page
    console.log("Redirecting to home...");
  };

  const handleRefresh = () => {
    // Refresh the page
    window.location.reload();
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            {/* Error Icon */}
            <div className="mb-6">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
                <Lock className="h-10 w-10 text-red-600" />
              </div>
              <Badge
                variant="destructive"
                className="bg-red-500 hover:bg-red-600"
              >
                401 - Unauthorized
              </Badge>
            </div>

            {/* Error Message */}
            <div className="mb-8">
              <h1 className="mb-3 text-2xl font-bold text-gray-900">
                Authentication Required
              </h1>
              <p className="leading-relaxed text-gray-600">
                You need to be logged in to access this page. Please sign in to
                your account or create a new one to continue.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mb-6 space-y-3">
              <Link href={"/login"}>
                <Button
                  className="w-full bg-blue-600 text-white hover:bg-blue-700"
                  size="lg"
                >
                  <User className="mr-2 h-4 w-4" />
                  Sign In to Your Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Alternative Actions */}
            <div className="flex justify-center gap-3">
              <Link href={"/"}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Go Home
                </Button>
              </Link>

              <Button
                onClick={handleRefresh}
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-900"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
            </div>

            {/* Security Note */}
            <div className="mt-8 border-t border-gray-200 pt-6">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <Shield className="h-4 w-4" />
                <span>Your data is protected and secure</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Help */}
        <div className="mt-6 text-center">
          <p className="mb-3 text-sm text-gray-600">
            Need help accessing your account?
          </p>
          <div className="flex justify-center gap-4 text-sm">
            <Link
              href="/login"
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              Forgot Password?
            </Link>
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              Contact Support
            </Link>
          </div>
        </div>

        {/* Features Preview */}
        <Card className="mt-6 border-white/20 bg-white/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <h3 className="mb-3 text-center font-semibold text-gray-900">
              What you'll get with an account:
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <span>Access to exclusive products and deals</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <span>Order tracking and history</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <span>Personalized recommendations</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <span>Faster checkout process</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <span>Wishlist and comparison tools</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
