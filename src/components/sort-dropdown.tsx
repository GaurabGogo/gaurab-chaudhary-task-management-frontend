"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { useQueryState } from "nuqs";

export function SortDropdown() {
  const [sort, setSort] = useQueryState("sort", {
    defaultValue: "",
  });

  const sortOptions = [
    { id: "", label: "None", icon: null }, // Empty option
    { id: "-created_at", label: "Newest First", icon: ArrowDown },
    { id: "created_at", label: "Oldest First", icon: ArrowUp },
  ];

  const currentOption = sortOptions.find((opt) => opt.id === sort);

  const handleSort = (option: "" | "created_at" | "-created_at") => {
    setSort(option);
  };

  return (
    <div className="flex items-center gap-2">
      Sort Created At:
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <ArrowUpDown className="h-4 w-4" />
            {currentOption?.label || "Sort"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {sortOptions.map((option) => {
            const Icon = option.icon;
            return (
              <DropdownMenuItem
                key={option.id || "none"} // unique key for empty
                onClick={() =>
                  handleSort(option.id as "" | "created_at" | "-created_at")
                }
                className="cursor-pointer gap-2"
              >
                {Icon && <Icon className="h-4 w-4" />}
                {option.label}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
