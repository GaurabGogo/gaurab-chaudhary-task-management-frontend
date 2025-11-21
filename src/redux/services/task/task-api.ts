import { baseQueryWithReauth } from "@/lib/baseQuery";
import { Task, TaskResponse, TasksResponse } from "@/models/tasks/tasks-model";

import { createApi } from "@reduxjs/toolkit/query/react";

interface TasksQueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  priority?: string | null;
}

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Task"],

  endpoints: (builder) => ({
    getMyTasks: builder.query<TasksResponse, TasksQueryParams>({
      query: ({ page, limit, sort, priority }) => ({
        url: "tasks",
        method: "GET",
        params: {
          ...(page && { page }),
          ...(limit && { limit }),
          ...(sort && { sort }),
          ...(priority && { priority }),
        },
      }),
      providesTags: ["Task"],
    }),
    createTask: builder.mutation<TaskResponse, Partial<Task>>({
      query: (task: Task) => ({
        url: "tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Task"],
    }),
    updateTask: builder.mutation<TaskResponse, Partial<Task>>({
      query: (task: Task) => ({
        url: `tasks/${task.id}`,
        method: "PUT",
        body: task,
      }),
      invalidatesTags: ["Task"],
    }),
    deleteTask: builder.mutation<TaskResponse, Partial<Task>>({
      query: (task: Task) => ({
        url: `tasks/${task.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useGetMyTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi;
