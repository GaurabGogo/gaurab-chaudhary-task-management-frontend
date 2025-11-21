"use client";

import { PriorityFilterTogglebuttons } from "./priority-filter-toggle-buttons";
import { SortDropdown } from "./sort-dropdown";

const TaskHeader = () => {
  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      <h1 className="mb-4 text-2xl font-bold">My Tasks</h1>
      <div className="flex items-center gap-8">
        <SortDropdown />
        <PriorityFilterTogglebuttons />
      </div>
    </div>
  );
};

export default TaskHeader;
