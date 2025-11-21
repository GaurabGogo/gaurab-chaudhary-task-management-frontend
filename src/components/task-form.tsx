"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Task } from "@/models/tasks/tasks-model";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface TaskFormProps {
  onSubmit: (task: Partial<Task>) => Promise<boolean>;
  initialTask?: Task;
  isLoading: boolean;
}

const taskSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(50, "Title must be less than 50 characters"),
  description: z
    .string()
    .min(2, "Description must be at least 2 characters")
    .max(500, "Description must be less than 500 characters"),
  priority: z.enum(["Low", "Medium", "High"]),
  end_date: z.string().min(1, "End date is required"),
});

type TaskFormValues = z.infer<typeof taskSchema>;

export function TaskForm({ onSubmit, initialTask, isLoading }: TaskFormProps) {
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: initialTask?.title || "",
      description: initialTask?.description || "",
      priority: initialTask?.priority || "Low",
      end_date: initialTask?.end_date || new Date().toISOString(),
    },
  });

  useEffect(() => {
    if (initialTask) {
      form.reset(initialTask);
    }
  }, [initialTask, form]);

  async function handleSubmit(values: TaskFormValues) {
    const submitSuccess = await onSubmit({
      id: initialTask?.id,
      title: values.title,
      description: values.description,
      priority: values.priority,
      end_date: new Date(values.end_date).toISOString(),
    });

    if (submitSuccess) {
      form.reset();
    }
  }

  function handleCancel() {
    form.reset();
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {initialTask ? "Edit Task" : "Create New Task"}
        </DialogTitle>
        <DialogDescription>
          {initialTask
            ? "Edit the form to update the task."
            : "Fill out the form to create a new task."}
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Task title"
                    className="bg-input text-foreground"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <textarea
                    placeholder="Task description"
                    className="border-border bg-input text-foreground focus:ring-ring w-full resize-none rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            {/* Priority */}
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <FormControl>
                    <select
                      className="border-border bg-input text-foreground w-full rounded-md border px-3 py-2 text-sm"
                      {...field}
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* End Date */}
            <FormField
              control={form.control}
              name="end_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date & Time</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      className="bg-input text-foreground"
                      {...field}
                      value={
                        field.value
                          ? new Date(field.value).toISOString().slice(0, 16)
                          : ""
                      }
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 gap-2"
              disabled={!form.formState.isValid}
            >
              {isLoading ? (
                <>
                  <Loader className="animate-spin" />
                  {initialTask ? "Updating Task" : "Creating Task"}
                </>
              ) : initialTask ? (
                "Update Task"
              ) : (
                "Create Task"
              )}
            </Button>

            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="flex-1 bg-transparent"
              >
                Cancel
              </Button>
            </DialogClose>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
}
