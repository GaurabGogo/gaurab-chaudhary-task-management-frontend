export interface TasksResponse {
  success: boolean;
  count: number;
  message: string;
  data: Task[];
}

export interface TaskResponse {
  success: boolean;
  count: number;
  message: string;
  data: Task;
}

export type Task = {
  id: string;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  end_date: string;
  created_at: string;
  updated_at: string;
};
