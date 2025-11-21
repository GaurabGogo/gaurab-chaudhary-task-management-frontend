"use client";
import { TaskCard } from "@/components/task-card";
import { useGetMyTasksQuery } from "@/redux/services/task/task-api";
import { Loader } from "lucide-react";
import { useQueryState } from "nuqs";
import PaginationComponent from "./common/Pagination";

const LIMIT = 5;

export function TaskList() {
  const [page] = useQueryState("page");

  const [sort] = useQueryState("sort", {
    defaultValue: "",
  });
  const [priority] = useQueryState("priority", {
    defaultValue: "",
  });

  const {
    data: taskData,
    isLoading: isTaskLoading,
    isError: isTaskError,
  } = useGetMyTasksQuery({
    page: page ? Number(page) : 1,
    limit: LIMIT,
    sort,
    priority,
  });

  if (isTaskLoading) {
    return (
      <div className="flex h-40 w-full flex-col items-center justify-center gap-2">
        <Loader className="animate-spin" />
        Loading...
      </div>
    );
  }

  if (!isTaskLoading && isTaskError) {
    return <div>Something went wrong</div>;
  }

  if (taskData && taskData.data.length === 0) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground text-lg">No tasks yet</p>
          <p className="text-muted-foreground text-sm">
            Create a new task to get started
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {taskData?.data.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
      {taskData?.count && (
        <PaginationComponent
          totalPages={taskData?.count ? Math.ceil(taskData.count / LIMIT) : 0}
        />
      )}
    </div>
  );
}
