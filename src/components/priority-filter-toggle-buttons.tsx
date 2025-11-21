"use client";

import { Button } from "@/components/ui/button";
import { useQueryState } from "nuqs";

export function PriorityFilterTogglebuttons() {
  const [priority, setPriority] = useQueryState("priority", {
    defaultValue: "",
  });
  const options = ["Low", "Medium", "High"] as const;

  const selectedOptions = priority
    ? (priority.split(",") as ("Low" | "Medium" | "High")[])
    : [];

  const handleClick = (option: (typeof options)[number]) => {
    let updated: ("Low" | "Medium" | "High")[];
    if (selectedOptions.includes(option)) {
      updated = selectedOptions.filter((v) => v !== option);
    } else {
      updated = [...selectedOptions, option];
    }
    setPriority(updated.join(","));
  };

  return (
    <div className="flex items-center gap-2">
      Filter Priority:
      <div className="flex items-center justify-center gap-2">
        {options.map((option) => (
          <Button
            key={option}
            onClick={() => handleClick(option)}
            variant={selectedOptions.includes(option) ? "default" : "outline"}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
}
