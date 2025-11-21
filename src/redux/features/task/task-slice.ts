import { Task } from "@/models/tasks/tasks-model";
import { createSlice } from "@reduxjs/toolkit";

export interface TaskStateType {
  tasks: Task[];
}

const initialState: TaskStateType = {
  tasks: [],
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const { setTasks } = taskSlice.actions;

export default taskSlice.reducer;
