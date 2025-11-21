"use client";

import TaskHeader from "@/components/task-header";
import { TaskList } from "@/components/task-list";
import { TaskSidebar } from "@/components/task-sidebar";

export default function Home() {
  return (
    <div className="bg-background flex h-screen">
      <TaskSidebar />
      <div className="flex h-full flex-1 flex-col overflow-auto p-6">
        <TaskHeader />
        <TaskList />
      </div>
    </div>
  );
}
