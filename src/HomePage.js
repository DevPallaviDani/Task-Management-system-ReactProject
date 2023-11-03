import React, { useState, useEffect } from "react";
import { TaskList } from "./Components/TaskList";
import { Box } from "@mui/material";
import TaskModel from "./Models/TaskModel";
import UseIdGenerate from "./CustomeHook/UseIdGenerate";

export const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [editedTasks, seteditedTasks] = useState([]);
  const taskId = UseIdGenerate("task");

  // add new task
  const addTask = (task, descp, selectedAssignees, selectedStatus) => {
    const newTasks = new TaskModel(
      taskId(),
      task,
      descp,
      selectedStatus,
      selectedAssignees
    );
    setTasks([...tasks, newTasks]);
  };
  // update edited task
  const updatedTask = (editedTasks) => {
    if (editedTasks) {
      const updatedTask = tasks.map((task) =>
        task.id === editedTasks.id
          ? {
              ...task,
              title: editedTasks.title,
              descp: editedTasks.descp,
              status: editedTasks.status,
              assignees: editedTasks.assignees,
            }
          : task
      );
      setTasks(updatedTask);
      seteditedTasks(null);
    }
  };

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div display="flex">
      <Box className="box-page">
        <TaskList tasks={tasks} updatedTask={updatedTask} addTask={addTask} />
      </Box>
    </div>
  );
};
