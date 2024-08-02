import { defineStore } from "pinia";
import { type taskType } from "../types";

interface State {
  tasks: taskType[];
  task: {
    taskIndex: null | number;
    data: {} | taskType;
  };
  changeStatus: boolean;
  cells: { id: number }[];
}

export const useStore = defineStore({
  id: "Products",
  state: (): State => ({
    tasks: [],
    task: {
      taskIndex: null,
      data: {},
    },
    changeStatus: false,
    cells: [
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
      { id: 6 },
      { id: 7 },
      { id: 8 },
      { id: 9 },
      { id: 10 },
      { id: 11 },
      { id: 12 },
      { id: 13 },
      { id: 14 },
      { id: 15 },
    ],
  }),
  // getters: {

  // },

  actions: {
    setSaveTasks() {
      const savedTasks = localStorage.getItem("Tasks");

      if (savedTasks) {
        try {
          const parsedTasks: taskType[] = JSON.parse(savedTasks);
          this.tasks = parsedTasks;
        } catch (e) {
          console.error("Error parsing saved tasks:", e);
          this.setDefaultTasks();
        }
      } else {
        this.setDefaultTasks();
      }

      console.log(this.tasks);
    },

    setDefaultTasks() {
      this.tasks = [
        { id: 0, categoryId: 1, count: 1, type: "warning" },
        { id: 1, categoryId: 2, count: 1, type: "info" },
        { id: 2, categoryId: 3, count: 1, type: "primary" },
        { id: 3, categoryId: 4, count: 1, type: "primary" },
        { id: 4, categoryId: 5, count: 1, type: "primary" },
        { id: 1345, categoryId: 6, count: 1, type: "primary" },
        { id: 234, categoryId: 7, count: 1, type: "primary" },
        { id: 1454, categoryId: 8, count: 1, type: "primary" },
      ];
    },
  },
});
