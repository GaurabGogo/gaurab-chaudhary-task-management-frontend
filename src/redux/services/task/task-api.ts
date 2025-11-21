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
      providesTags: (result) =>
        result
          ? [
              { type: "Task", id: "LIST" } as const,
              ...result.data.map((t) => ({ type: "Task", id: t.id }) as const),
            ]
          : [{ type: "Task", id: "LIST" } as const],
    }),

    createTask: builder.mutation<TaskResponse, Partial<Task>>({
      query: (task) => ({
        url: "tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: [{ type: "Task", id: "LIST" }],
    }),

    updateTask: builder.mutation<TaskResponse, Partial<Task>>({
      query: (task) => ({
        url: `tasks/${task.id}`,
        method: "PUT",
        body: task,
      }),
      invalidatesTags: (result, error, task) => [{ type: "Task", id: task.id }],
    }),

    deleteTask: builder.mutation<TaskResponse, Partial<Task>>({
      query: (task) => ({
        url: `tasks/${task.id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, task) => [
        { type: "Task", id: task.id },
        { type: "Task", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetMyTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi;
