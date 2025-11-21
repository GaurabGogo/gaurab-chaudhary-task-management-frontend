"use client";

import { Button } from "@/components/ui/button";
import { Task } from "@/models/tasks/tasks-model";
import { useAppSelector } from "@/redux/hooks";
import { useCreateTaskMutation } from "@/redux/services/task/task-api";
import handleApiError from "@/utils/handleApiError";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import LogoutButton from "./auth/LogoutButton";
import Logo from "./Header/Logo";
import { TaskForm } from "./task-form";
import { Dialog, DialogTrigger } from "./ui/dialog";

export function TaskSidebar() {
  const userData = useAppSelector((state) => state.auth.user);

  const [open, setOpen] = useState(false);
  const [createTask, { isLoading }] = useCreateTaskMutation();

  const handleCreateTask = async (task: Partial<Task>): Promise<boolean> => {
    try {
      await createTask(task).unwrap();
      setOpen(false);
      toast.success("Task created successfully", {
        description: new Date().toLocaleString(),
      });
      return true;
    } catch (error) {
      const errMessage = handleApiError(error);
      toast.error(errMessage, {
        description: new Date().toLocaleString(),
      });
    }
    return false;
  };

  return (
    <aside className="bg-sidebar border-sidebar-border flex w-64 flex-col border-r">
      <div>
        <div className="border-sidebar-border flex gap-4 border-b p-6">
          <Logo classNames="h-10 w-10" />
          <h1 className="text-sidebar-foreground text-2xl font-bold">
            Task Manager
          </h1>
        </div>
        <div className="border-sidebar-border border-b px-6 py-2">
          <h2 className="text-sidebar-foreground mb-2 text-lg font-bold">
            Welcome back, <br />
            {userData?.name}
          </h2>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-6 p-6">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground w-full gap-2">
              <Plus className="h-4 w-4" />
              New Task
            </Button>
          </DialogTrigger>
          <TaskForm onSubmit={handleCreateTask} isLoading={isLoading} />
        </Dialog>
      </div>

      <div className="border-sidebar-border text-sidebar-foreground/50 border-b p-4 text-center text-xs">
        Organize your work
      </div>
      <div className="w-full p-4">
        <LogoutButton />
      </div>
    </aside>
  );
}
