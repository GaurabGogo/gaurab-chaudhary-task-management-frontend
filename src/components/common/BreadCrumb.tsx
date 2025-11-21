"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ArrowLeft, LayoutDashboard } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface BreadCrumbProps {
  pageTitle: string;
}

const BreadCrumbComponent: React.FC<BreadCrumbProps> = ({ pageTitle }) => {
  const router = useRouter();
  const pathname = usePathname();
  const paths = pathname.split("/").filter((p) => p);

  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="cursor-pointer" onClick={() => router.back()}>
        <ArrowLeft className="w-5 h-5 text-gray-700" />
      </div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="flex items-center gap-2">
              <LayoutDashboard size={16} />
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          {paths.slice(0, -1).map((path, index) => {
            const href = "/" + paths.slice(0, index + 1).join("/");
            const label = path.split("-").join(" ");

            return (
              <React.Fragment key={href}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink className="capitalize" href={href}>
                    {label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{pageTitle}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadCrumbComponent;
