"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { isOverdue } from "@/lib/utils";
import { Task } from "@/models/tasks/tasks-model";
import {
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "@/redux/services/task/task-api";
import formatDate from "@/utils/formatDate";
import handleApiError from "@/utils/handleApiError";
import { Calendar, Edit2, Flag, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import AlertDialogBox from "./common/AlertDialogBox";
import { TaskForm } from "./task-form";
import { Dialog, DialogTrigger } from "./ui/dialog";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const overdue = isOverdue(task.end_date);
  const [open, setOpen] = useState(false);

  const priorityColors = {
    Low: "text-primary bg-primary/10",
    Medium: "text-accent-foreground bg-accent-foreground/10",
    High: "text-destructive bg-destructive/10",
  };

  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();

  const handleDeleteTask = async () => {
    try {
      await deleteTask(task).unwrap();
      toast.success("Task deleted successfully", {
        description: new Date().toLocaleString(),
      });
    } catch (error) {
      const errMessage = handleApiError(error);
      toast.error(errMessage, {
        description: new Date().toLocaleString(),
      });
    }
  };

  const handleUpdateTask = async (task: Partial<Task>): Promise<boolean> => {
    try {
      await updateTask(task).unwrap();
      toast.success("Task updated successfully", {
        description: new Date().toLocaleString(),
      });
      setOpen(false);
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
    <Card
      className={`border p-4 transition-all ${
        overdue
          ? "border-destructive/50 bg-destructive/5 dark:bg-destructive/10"
          : "border-border"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-3">
            <h3 className="text-card-foreground font-semibold">{task.title}</h3>
            {overdue && (
              <span className="bg-destructive text-destructive-foreground rounded px-2 py-1 text-xs font-medium">
                Overdue
              </span>
            )}
          </div>

          {task.description && (
            <p className="text-muted-foreground text-sm">{task.description}</p>
          )}

          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="text-muted-foreground h-4 w-4" />
              <span
                className={
                  overdue
                    ? "text-destructive font-medium"
                    : "text-muted-foreground"
                }
              >
                {formatDate(task.end_date, "Pp")}
              </span>
            </div>

            <div
              className={`inline-flex items-center gap-2 rounded-md px-2 py-1 text-xs font-medium ${priorityColors[task.priority]}`}
            >
              <Flag className="h-3 w-3" />
              <span className="capitalize">{task.priority}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline" className="gap-2">
                <Edit2 className="h-4 w-4" />
                <span className="hidden sm:inline">Edit</span>
              </Button>
            </DialogTrigger>
            <TaskForm
              onSubmit={handleUpdateTask}
              initialTask={task}
              isLoading={isUpdating}
            />
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="text-destructive hover:text-destructive gap-2"
              >
                <Trash2 className="h-4 w-4" />
                <span className="hidden sm:inline">Delete</span>
              </Button>
            </DialogTrigger>
            <AlertDialogBox onAlertContinue={handleDeleteTask}>
              Are you sure you want to delete this task?
            </AlertDialogBox>
          </Dialog>
        </div>
      </div>
    </Card>
  );
}
