"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertTriangle,
  ArrowLeft,
  Bug,
  CheckCircle,
  Copy,
  Home,
  Mail,
  MessageSquare,
  Phone,
  RefreshCw,
} from "lucide-react";
import { useState } from "react";

interface ErrorDetails {
  errorId: string;
  timestamp: string;
  userAgent: string;
  url: string;
}

export default function UnknownErrorComponent() {
  const [isReporting, setIsReporting] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [errorDescription, setErrorDescription] = useState("");
  const [copied, setCopied] = useState(false);

  // Mock error details - in real app, these would come from error boundary or props
  const errorDetails: ErrorDetails = {
    errorId: "ERR-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href,
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const handleReportError = () => {
    setIsReporting(true);
  };

  const handleSubmitReport = () => {
    // In real app, this would send the error report to your backend
    console.log("Submitting error report:", {
      errorId: errorDetails.errorId,
      description: errorDescription,
      details: errorDetails,
    });

    setReportSubmitted(true);
    setTimeout(() => {
      setIsReporting(false);
      setReportSubmitted(false);
      setErrorDescription("");
    }, 3000);
  };

  const handleCopyErrorId = () => {
    navigator.clipboard.writeText(errorDetails.errorId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleContactSupport = () => {
    // In real app, this would open support chat or redirect to contact page
    console.log("Opening support contact...");
  };

  if (reportSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full shadow-xl border-0">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Report Submitted
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for reporting this issue. Our team will investigate and
              work on a fix.
            </p>
            <Button
              onClick={handleGoHome}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              <Home className="w-4 h-4 mr-2" />
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isReporting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 flex items-center justify-center p-4">
        <Card className="max-w-lg w-full shadow-xl border-0">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Bug className="w-8 h-8 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Report This Error
              </h2>
              <p className="text-gray-600">
                Help us fix this issue by providing more details
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label
                  htmlFor="error-description"
                  className="text-sm font-medium text-gray-700 mb-2 block"
                >
                  What were you trying to do when this error occurred?
                </Label>
                <Textarea
                  id="error-description"
                  placeholder="Please describe what you were doing when the error happened..."
                  value={errorDescription}
                  onChange={(e) => setErrorDescription(e.target.value)}
                  className="min-h-24 resize-none"
                  maxLength={500}
                />
                <div className="text-xs text-gray-500 mt-1 text-right">
                  {errorDescription.length}/500
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">
                  Error Details
                </h4>
                <div className="text-xs text-gray-600 space-y-1">
                  <div className="flex justify-between">
                    <span>Error ID:</span>
                    <code className="bg-white px-2 py-1 rounded">
                      {errorDetails.errorId}
                    </code>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span>
                      {new Date(errorDetails.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setIsReporting(false)}
                  variant="outline"
                  className="flex-1 bg-transparent"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitReport}
                  className="flex-1 bg-orange-600 hover:bg-orange-700"
                  disabled={!errorDescription.trim()}
                >
                  Submit Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        <Card className="shadow-xl border-0">
          <CardContent className="p-8 text-center">
            {/* Error Icon */}
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-10 h-10 text-red-600" />
              </div>
              <Badge
                variant="destructive"
                className="bg-red-500 hover:bg-red-600"
              >
                500 - Internal Server Error
              </Badge>
            </div>

            {/* Error Message */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-3">
                Oops! Something went wrong
              </h1>
              <p className="text-gray-600 leading-relaxed mb-4">
                We encountered an unexpected error while processing your
                request. Our team has been notified and is working to fix this
                issue.
              </p>

              {/* Error ID */}
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">
                      Error ID for reference:
                    </p>
                    <code className="text-sm font-mono text-gray-900 bg-white px-2 py-1 rounded">
                      {errorDetails.errorId}
                    </code>
                  </div>
                  <Button
                    onClick={handleCopyErrorId}
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {copied ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Primary Actions */}
            <div className="space-y-3 mb-6">
              <Button
                onClick={handleRefresh}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                size="lg"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={handleGoBack}
                  variant="outline"
                  className="bg-transparent"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Go Back
                </Button>
                <Button
                  onClick={handleGoHome}
                  variant="outline"
                  className="bg-transparent"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </div>
            </div>

            {/* Secondary Actions */}
            <div className="space-y-3">
              <Button
                onClick={handleReportError}
                variant="ghost"
                className="w-full text-orange-600 hover:text-orange-700 hover:bg-orange-50"
              >
                <Bug className="w-4 h-4 mr-2" />
                Report This Error
              </Button>

              <Button
                onClick={handleContactSupport}
                variant="ghost"
                className="w-full text-gray-600 hover:text-gray-700"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
            </div>

            {/* Timestamp */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Error occurred at{" "}
                {new Date(errorDetails.timestamp).toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Support Information */}
        <Card className="mt-6 bg-white/50 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-3 text-center">
              Need immediate help?
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>support@computerplanet.com</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>+977-21-123456</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 text-center">
                Our support team is available 24/7 to help resolve any issues
              </p>
            </div>
          </CardContent>
        </Card>

        {/* What to expect */}
        <Card className="mt-4 bg-blue-50/50 backdrop-blur-sm border-blue-200/20">
          <CardContent className="p-4">
            <h4 className="font-medium text-gray-900 mb-2 text-center text-sm">
              What happens next?
            </h4>
            <ul className="space-y-1 text-xs text-gray-600">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                <span>Our team has been automatically notified</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                <span>We'll investigate and fix the issue quickly</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                <span>You can try refreshing the page in a few minutes</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
